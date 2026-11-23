import { wcagContrast } from 'culori';
import type {
  ContrastCorrection,
  Mode,
  PrimitiveTokens,
  ScaleName,
  ScaleStepValue,
  SemanticMap,
  TokenRef,
} from '../types.js';
import { contrastGrounds, modeRef } from './semanticMap.js';

const ORDERED_STEPS: ScaleStepValue[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function checkContrast(fgHex: string, bgHex: string): number {
  return wcagContrast(fgHex, bgHex);
}

/** Contrast against the hardest of several grounds. */
function worstContrast(fgHex: string, bgHexes: string[]): number {
  return Math.min(...bgHexes.map((bgHex) => checkContrast(fgHex, bgHex)));
}

function resolveTokenRef(
  ref: TokenRef,
  primitives: PrimitiveTokens
): string | null {
  if (ref === 'white') return '#ffffff';
  if (ref === 'black') return '#000000';

  const [scaleName, stepStr] = ref.split('.') as [ScaleName, string];
  const step = Number(stepStr) as ScaleStepValue;
  const scale = primitives[scaleName];
  if (!scale) return null;
  const entry = scale[step];
  if (!entry) return null;
  return entry.hex;
}

function parseRef(ref: TokenRef): { scaleName: ScaleName; step: ScaleStepValue } | null {
  if (ref === 'white' || ref === 'black') return null;
  const [scaleName, stepStr] = ref.split('.') as [ScaleName, string];
  return { scaleName, step: Number(stepStr) as ScaleStepValue };
}

/**
 * Walks the fg's ramp one step at a time from `originalRef` in `direction`
 * ('light' toward the dark steps, for text on a light ground; 'dark' toward
 * the light steps) and takes the first step that passes: the smallest change
 * that fixes the pair, so brand-coloured text stays as close to its brand
 * step as contrast allows. Falls back to neutral, white or black when no step
 * on the ramp passes.
 */
function shiftFgTowardsContrast(
  originalRef: TokenRef,
  bgHexes: string[],
  primitives: PrimitiveTokens,
  minContrast: number,
  direction: 'light' | 'dark'
): { ref: TokenRef; contrast: number; kind: 'step-shift' | 'hard-fallback' } | null {
  const parsed = parseRef(originalRef);
  if (!parsed) return null;

  const { scaleName, step: originalStep } = parsed;
  const scale = primitives[scaleName];
  if (!scale) return null;

  const index = ORDERED_STEPS.indexOf(originalStep);
  const stepsToTry = direction === 'light'
    ? ORDERED_STEPS.slice(index + 1)
    : ORDERED_STEPS.slice(0, index).reverse();

  for (const step of stepsToTry) {
    const entry = scale[step];
    if (!entry) continue;
    const ratio = worstContrast(entry.hex, bgHexes);
    if (ratio >= minContrast) {
      return {
        ref: `${scaleName}.${step}` as TokenRef,
        contrast: ratio,
        kind: 'step-shift',
      };
    }
  }

  const hardFallbacks: { ref: TokenRef; hex: string }[] = direction === 'light'
    ? [
        { ref: 'neutral.950' as TokenRef, hex: resolveTokenRef('neutral.950' as TokenRef, primitives) ?? '#000000' },
        { ref: 'white', hex: '#ffffff' },
        { ref: 'black', hex: '#000000' },
      ]
    : [
        { ref: 'neutral.50' as TokenRef, hex: resolveTokenRef('neutral.50' as TokenRef, primitives) ?? '#ffffff' },
        { ref: 'white', hex: '#ffffff' },
        { ref: 'black', hex: '#000000' },
      ];

  let bestFallback: { ref: TokenRef; contrast: number } | null = null;
  for (const fb of hardFallbacks) {
    const ratio = worstContrast(fb.hex, bgHexes);
    if (ratio >= minContrast && (!bestFallback || ratio > bestFallback.contrast)) {
      bestFallback = { ref: fb.ref, contrast: ratio };
    }
  }

  if (bestFallback) {
    return { ref: bestFallback.ref, contrast: bestFallback.contrast, kind: 'hard-fallback' };
  }

  const whiteRatio = worstContrast('#ffffff', bgHexes);
  const blackRatio = worstContrast('#000000', bgHexes);
  const best = whiteRatio >= blackRatio ? { ref: 'white' as TokenRef, contrast: whiteRatio } : { ref: 'black' as TokenRef, contrast: blackRatio };
  return { ref: best.ref, contrast: best.contrast, kind: 'hard-fallback' };
}

export function autoCorrect(
  map: SemanticMap,
  primitives: PrimitiveTokens,
  mode: Mode,
  defaultMinContrast: number
): { correctedMap: SemanticMap; corrections: ContrastCorrection[] } {
  const corrections: ContrastCorrection[] = [];
  const corrected = { ...map };

  for (const [tokenName, entry] of Object.entries(map)) {
    if (entry.role === 'decorative') continue;
    if (entry.role !== 'fg' && entry.role !== 'border') continue;
    const bgHexes = contrastGrounds(entry)
      .flatMap((ground) => (map[ground] ? [resolveTokenRef(modeRef(map[ground], mode), primitives)] : []))
      .filter((hex): hex is string => hex !== null);
    if (bgHexes.length === 0) continue;

    const fgRef = modeRef(entry, mode);
    const fgHex = resolveTokenRef(fgRef, primitives);
    if (!fgHex) continue;

    // The config-wide minimum is a floor: per-entry values can raise it but
    // not lower it, except for entries that opt into a lower WCAG tier.
    const minContrast = entry.allowBelowDefault && entry.minContrast !== undefined
      ? entry.minContrast
      : Math.max(entry.minContrast ?? 0, defaultMinContrast);
    const ratio = worstContrast(fgHex, bgHexes);

    if (ratio >= minContrast) continue;

    // Dim grounds run from near-white pages to mid-tone buttons, so its search
    // follows the ground: toward dark text where black reads better, else light.
    const direction = mode === 'dim'
      ? (worstContrast('#000000', bgHexes) >= worstContrast('#ffffff', bgHexes) ? 'light' : 'dark')
      : mode;

    const correction = shiftFgTowardsContrast(
      fgRef,
      bgHexes,
      primitives,
      minContrast,
      direction
    );

    if (correction) {
      corrected[tokenName] = { ...corrected[tokenName], [mode]: correction.ref };

      corrections.push({
        token: tokenName,
        mode,
        originalRef: fgRef,
        correctedRef: correction.ref,
        originalContrast: ratio,
        correctedContrast: correction.contrast,
        kind: correction.kind,
      });
    }
  }

  return { correctedMap: corrected, corrections };
}
