import { wcagContrast } from 'culori';
import type {
  ContrastCorrection,
  PrimitiveTokens,
  ScaleName,
  ScaleStepValue,
  SemanticMap,
  TokenRef,
} from '../types.js';

const ORDERED_STEPS: ScaleStepValue[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function checkContrast(fgHex: string, bgHex: string): number {
  return wcagContrast(fgHex, bgHex);
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

function shiftFgTowardsContrast(
  originalRef: TokenRef,
  bgHex: string,
  primitives: PrimitiveTokens,
  minContrast: number,
  mode: 'light' | 'dark'
): { ref: TokenRef; contrast: number; kind: 'step-shift' | 'hard-fallback' } | null {
  const parsed = parseRef(originalRef);
  if (!parsed) return null;

  const { scaleName } = parsed;
  const scale = primitives[scaleName];
  if (!scale) return null;

  const stepsToTry = mode === 'light'
    ? [...ORDERED_STEPS].reverse()
    : [...ORDERED_STEPS];

  let attempts = 0;
  for (const step of stepsToTry) {
    if (attempts >= 3) break;
    const entry = scale[step];
    if (!entry) continue;
    const ratio = checkContrast(entry.hex, bgHex);
    if (ratio >= minContrast) {
      return {
        ref: `${scaleName}.${step}` as TokenRef,
        contrast: ratio,
        kind: 'step-shift',
      };
    }
    attempts++;
  }

  const hardFallbacks: { ref: TokenRef; hex: string }[] = mode === 'light'
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
    const ratio = checkContrast(fb.hex, bgHex);
    if (ratio >= minContrast && (!bestFallback || ratio > bestFallback.contrast)) {
      bestFallback = { ref: fb.ref, contrast: ratio };
    }
  }

  if (bestFallback) {
    return { ref: bestFallback.ref, contrast: bestFallback.contrast, kind: 'hard-fallback' };
  }

  const whiteRatio = checkContrast('#ffffff', bgHex);
  const blackRatio = checkContrast('#000000', bgHex);
  const best = whiteRatio >= blackRatio ? { ref: 'white' as TokenRef, contrast: whiteRatio } : { ref: 'black' as TokenRef, contrast: blackRatio };
  return { ref: best.ref, contrast: best.contrast, kind: 'hard-fallback' };
}

export function autoCorrect(
  map: SemanticMap,
  primitives: PrimitiveTokens,
  mode: 'light' | 'dark',
  defaultMinContrast: number
): { correctedMap: SemanticMap; corrections: ContrastCorrection[] } {
  const corrections: ContrastCorrection[] = [];
  const corrected = { ...map };

  for (const [tokenName, entry] of Object.entries(map)) {
    if (entry.role === 'decorative') continue;
    if (entry.role !== 'fg' && entry.role !== 'border') continue;
    if (!entry.contrastAgainst) continue;

    const bgEntry = map[entry.contrastAgainst];
    if (!bgEntry) continue;

    const bgRef = mode === 'light' ? bgEntry.light : bgEntry.dark;
    const fgRef = mode === 'light' ? entry.light : entry.dark;

    const bgHex = resolveTokenRef(bgRef, primitives);
    const fgHex = resolveTokenRef(fgRef, primitives);
    if (!bgHex || !fgHex) continue;

    const minContrast = entry.minContrast ?? defaultMinContrast;
    const ratio = checkContrast(fgHex, bgHex);

    if (ratio >= minContrast) continue;

    const correction = shiftFgTowardsContrast(
      fgRef,
      bgHex,
      primitives,
      minContrast,
      mode
    );

    if (correction) {
      const newEntry = { ...corrected[tokenName] };
      if (mode === 'light') {
        newEntry.light = correction.ref;
      } else {
        newEntry.dark = correction.ref;
      }
      corrected[tokenName] = newEntry;

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
