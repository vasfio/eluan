import type {
  ContrastCorrection,
  GeneratorConfig,
  GeneratorResult,
  PrimitiveTokens,
} from './types.js';
import { validateAccents, type ValidationWarning } from './input/validate.js';
import { buildPrimitives } from './tokens/primitives.js';
import { buildSemanticMap } from './tokens/semanticMap.js';
import { autoCorrect } from './tokens/contrast.js';
import { buildDarkPrimitives, DEFAULT_DARK_LIFT, MAX_DARK_LIFT } from './color/darkLift.js';
import { buildDimPrimitives, DEFAULT_DIM_CHROMA, DEFAULT_DIM_WARMTH, MIN_DIM_CHROMA } from './color/dim.js';
import {
  compilePrimitivesCSS,
  compileModeCSS,
  compileThemeCSS,
  compileCreateThemeTokens,
  compileCustomThemeCSS,
} from './compile/css.js';

/*
 * FNV-1a (64-bit) constants.
 *
 * This is a *fingerprint*, not a cryptographic digest. It exists so a generated
 * theme carries a short, stable marker of the inputs it came from — enough to
 * cache-bust and to tell "regenerated from the same config" apart from
 * "regenerated from a different config" at a glance. It is NOT collision
 * resistant and must never be used for integrity, authentication, or any other
 * security purpose.
 *
 * FNV-1a is used here instead of a `node:crypto` SHA-256 digest so that the
 * programmatic entry point of this package stays free of Node built-ins and can
 * run unchanged in the browser.
 */
const FNV_OFFSET_BASIS_64 = 0xcbf29ce484222325n;
const FNV_PRIME_64 = 0x100000001b3n;
const U64_MASK = 0xffffffffffffffffn;

function fnv1a64(input: string): bigint {
  let hash = FNV_OFFSET_BASIS_64;
  for (let i = 0; i < input.length; i++) {
    // Hash UTF-16 code units. Inputs here are hex colors and numbers, so this is
    // effectively ASCII, but code-unit iteration keeps the result deterministic
    // for any string.
    hash ^= BigInt(input.charCodeAt(i));
    hash = (hash * FNV_PRIME_64) & U64_MASK;
  }
  return hash;
}

/**
 * Short, deterministic fingerprint of the inputs that shape a generated theme.
 *
 * Same config in, same 12-character lowercase hex string out. Used to stamp
 * generated CSS and the generation report. Not a security primitive — see the
 * note on the FNV-1a constants above.
 */
export function computeInputHash(config: GeneratorConfig): string {
  const input = JSON.stringify({
    accents: config.accents,
    minContrast: config.minContrast,
    neutralTintRatio: config.neutralTintRatio,
    systemHues: config.systemHues,
    curve: config.curve,
    // Only when set, so configs that predate these options keep their fingerprint
    darkLift: config.darkLift,
    dimChroma: config.dimChroma,
    dimWarmth: config.dimWarmth,
  });
  // Take the high 48 bits: FNV-1a mixes upward through the multiply, so the high
  // nibbles are the better-distributed end of the digest.
  return fnv1a64(input).toString(16).padStart(16, '0').slice(0, 12);
}

function buildReport(
  config: GeneratorConfig,
  warnings: ValidationWarning[],
  corrections: ContrastCorrection[],
  primitives: PrimitiveTokens,
  inputHash: string
): string {
  const lines: string[] = [];

  lines.push(`# Theme Generation Report`);
  lines.push('');
  lines.push(`**Theme:** ${config.themeName}`);
  lines.push(`**Input hash:** ${inputHash}`);
  lines.push(`**Accents:** ${config.accents.join(', ')}`);
  lines.push(`**Min contrast:** ${config.minContrast}:1`);
  lines.push(`**Neutral tint ratio:** ${config.neutralTintRatio}`);
  lines.push(`**Dark lift:** ${config.darkLift ?? DEFAULT_DARK_LIFT}`);
  lines.push(`**Dim chroma:** ${config.dimChroma ?? DEFAULT_DIM_CHROMA}`);
  lines.push(`**Dim warmth:** ${config.dimWarmth ?? DEFAULT_DIM_WARMTH}`);
  lines.push('');

  if (warnings.length > 0) {
    lines.push(`## Warnings`);
    lines.push('');
    for (const w of warnings) {
      lines.push(`- ${w.message}`);
    }
    lines.push('');
  }

  if (corrections.length > 0) {
    lines.push(`## Contrast Corrections (${corrections.length})`);
    lines.push('');
    lines.push(`| Token | Mode | Original | Corrected | Before | After | Kind |`);
    lines.push(`|-------|------|----------|-----------|--------|-------|------|`);
    for (const c of corrections) {
      lines.push(
        `| ${c.token} | ${c.mode} | ${c.originalRef} | ${c.correctedRef} | ${c.originalContrast.toFixed(2)} | ${c.correctedContrast.toFixed(2)} | ${c.kind} |`
      );
    }
    lines.push('');
  } else {
    lines.push(`## Contrast`);
    lines.push('');
    lines.push('All fg/border pairings meet the configured minimum contrast ratio. No corrections needed.');
    lines.push('');
  }

  const chromaClampedSteps: string[] = [];
  for (const [scaleName, scale] of Object.entries(primitives)) {
    if (!scale) continue;
    for (const [stepStr, entry] of Object.entries(scale)) {
      const rawC = entry.oklch.c;
      if (rawC > 0 && entry.oklch.c / rawC < 0.8) {
        chromaClampedSteps.push(`${scaleName}.${stepStr}`);
      }
    }
  }

  if (chromaClampedSteps.length > 0) {
    lines.push(`## Gamut Mapping`);
    lines.push('');
    lines.push(`${chromaClampedSteps.length} steps had chroma clamped by >20%:`);
    for (const s of chromaClampedSteps) {
      lines.push(`- ${s}`);
    }
    lines.push('');
  }

  lines.push(`## Output Files`);
  lines.push('');
  lines.push(`- \`primitives.json\` — W3C Design Tokens format`);
  lines.push(`- \`semantic.json\` — Semantic map with light/dim/dark refs`);
  lines.push(`- \`theme.css\` — Drop-in CSS for Eluan`);
  lines.push(`- \`preview.html\` — Visual smoke test`);

  return lines.join('\n');
}

export function generateTheme(config: GeneratorConfig): GeneratorResult {
  const { accents: accentInputs, warnings } = validateAccents(config.accents);
  const inputHash = computeInputHash(config);

  const primitives = buildPrimitives(accentInputs, config);

  const darkLift = config.darkLift ?? DEFAULT_DARK_LIFT;
  if (!Number.isFinite(darkLift) || darkLift < 0 || darkLift > MAX_DARK_LIFT) {
    throw new Error(`darkLift must be between 0 and ${MAX_DARK_LIFT}, got ${config.darkLift}.`);
  }
  const primitivesDark = buildDarkPrimitives(primitives, darkLift);

  const dimChroma = config.dimChroma ?? DEFAULT_DIM_CHROMA;
  if (!Number.isFinite(dimChroma) || dimChroma < MIN_DIM_CHROMA || dimChroma > 1) {
    throw new Error(`dimChroma must be between ${MIN_DIM_CHROMA} and 1, got ${config.dimChroma}.`);
  }
  const dimWarmth = config.dimWarmth ?? DEFAULT_DIM_WARMTH;
  if (!Number.isFinite(dimWarmth) || dimWarmth < 0 || dimWarmth > 1) {
    throw new Error(`dimWarmth must be between 0 and 1, got ${config.dimWarmth}.`);
  }
  const primitivesDim = buildDimPrimitives(primitives, dimChroma, dimWarmth);

  let semanticMap = buildSemanticMap();

  const lightResult = autoCorrect(semanticMap, primitives, 'light', config.minContrast);
  semanticMap = lightResult.correctedMap;
  const lightCorrections = lightResult.corrections;

  const dimResult = autoCorrect(semanticMap, primitivesDim, 'dim', config.minContrast);
  semanticMap = dimResult.correctedMap;
  const dimCorrections = dimResult.corrections;

  const darkResult = autoCorrect(semanticMap, primitivesDark, 'dark', config.minContrast);
  semanticMap = darkResult.correctedMap;
  const darkCorrections = darkResult.corrections;

  const allCorrections = [...lightCorrections, ...dimCorrections, ...darkCorrections];

  const primitivesCSS = compilePrimitivesCSS(primitives, config.themeName);
  const lightModeCSS = compileModeCSS(semanticMap, primitives, 'light', config.themeName);
  const dimModeCSS = compileModeCSS(semanticMap, primitivesDim, 'dim', config.themeName);
  const darkModeCSS = compileModeCSS(semanticMap, primitivesDark, 'dark', config.themeName);
  const themeCSS = compileThemeCSS(
    semanticMap,
    primitives,
    config.themeName,
    inputHash,
    primitivesDark,
    primitivesDim
  );

  const createThemeTokens: Record<string, string> = {};
  const lightTokens = compileCreateThemeTokens(semanticMap, primitives, 'light');
  for (const [k, v] of Object.entries(lightTokens)) {
    createThemeTokens[k] = v;
  }

  const dimTokens = compileCreateThemeTokens(semanticMap, primitivesDim, 'dim');
  const darkTokens = compileCreateThemeTokens(semanticMap, primitivesDark, 'dark');
  const createThemeOptions = { tokens: createThemeTokens, modes: { dim: dimTokens, dark: darkTokens } };
  const customTheme = {
    name: config.themeName,
    extends: 'minimal' as const,
    css: compileCustomThemeCSS(config.themeName, createThemeTokens, darkTokens, dimTokens),
  };

  const report = buildReport(config, warnings, allCorrections, primitives, inputHash);

  return {
    primitives,
    primitivesDark,
    primitivesDim,
    semanticMap,
    corrections: allCorrections,
    css: {
      primitives: primitivesCSS,
      lightMode: lightModeCSS,
      dimMode: dimModeCSS,
      darkMode: darkModeCSS,
      theme: themeCSS,
    },
    createThemeTokens,
    createThemeOptions,
    customTheme,
    report,
  };
}
