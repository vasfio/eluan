import { createHash } from 'node:crypto';
import type {
  ContrastCorrection,
  GeneratorConfig,
  GeneratorResult,
  PrimitiveTokens,
  SemanticMap,
} from './types.js';
import { validateAccents, type ValidationWarning } from './input/validate.js';
import { buildPrimitives } from './tokens/primitives.js';
import { buildSemanticMap } from './tokens/semanticMap.js';
import { autoCorrect, checkContrast } from './tokens/contrast.js';
import {
  compilePrimitivesJSON,
  compileSemanticJSON,
  compilePrimitivesCSS,
  compileModeCSS,
  compileThemeCSS,
  compileCreateThemeTokens,
} from './compile/css.js';
import { generateSmokeHTML } from './preview/smoke.js';

export function computeInputHash(config: GeneratorConfig): string {
  const input = JSON.stringify({
    accents: config.accents,
    minContrast: config.minContrast,
    neutralTintRatio: config.neutralTintRatio,
    systemHues: config.systemHues,
    curve: config.curve,
  });
  return createHash('sha256').update(input).digest('hex').slice(0, 12);
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
  lines.push(`- \`semantic.json\` — Semantic map with light/dark refs`);
  lines.push(`- \`theme.css\` — Drop-in CSS for Eluan`);
  lines.push(`- \`preview.html\` — Visual smoke test`);

  return lines.join('\n');
}

export function generateTheme(config: GeneratorConfig): GeneratorResult {
  const { accents: accentInputs, warnings } = validateAccents(config.accents);
  const inputHash = computeInputHash(config);

  const primitives = buildPrimitives(accentInputs, config);

  let semanticMap = buildSemanticMap();

  const lightResult = autoCorrect(semanticMap, primitives, 'light', config.minContrast);
  semanticMap = lightResult.correctedMap;
  const lightCorrections = lightResult.corrections;

  const darkResult = autoCorrect(semanticMap, primitives, 'dark', config.minContrast);
  semanticMap = darkResult.correctedMap;
  const darkCorrections = darkResult.corrections;

  const allCorrections = [...lightCorrections, ...darkCorrections];

  const primitivesCSS = compilePrimitivesCSS(primitives, config.themeName);
  const lightModeCSS = compileModeCSS(semanticMap, primitives, 'light', config.themeName);
  const darkModeCSS = compileModeCSS(semanticMap, primitives, 'dark', config.themeName);
  const themeCSS = compileThemeCSS(semanticMap, primitives, config.themeName, inputHash);

  const createThemeTokens: Record<string, string> = {};
  const lightTokens = compileCreateThemeTokens(semanticMap, primitives, 'light');
  for (const [k, v] of Object.entries(lightTokens)) {
    createThemeTokens[k] = v;
  }

  const report = buildReport(config, warnings, allCorrections, primitives, inputHash);

  return {
    primitives,
    semanticMap,
    corrections: allCorrections,
    css: {
      primitives: primitivesCSS,
      lightMode: lightModeCSS,
      darkMode: darkModeCSS,
      theme: themeCSS,
    },
    createThemeTokens,
    report,
  };
}
