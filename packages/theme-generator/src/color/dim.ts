import type { Oklch, PrimitiveTokens, Scale, ScaleName, ScaleStepValue } from '../types.js';
import { SCALE_STEPS } from '../types.js';
import { gamutMap, oklchToHex } from './convert.js';

/**
 * Default chroma multiplier for the dim-mode colour ramps. Dim is light mode
 * toned down: the same steps, one deeper, with accents and status colours
 * pulled back so nothing shouts on the softer ground.
 */
export const DEFAULT_DIM_CHROMA = 0.8;

/** Lowest chroma multiplier accepted; below this accents turn muddy. */
export const MIN_DIM_CHROMA = 0.5;

/** Default pull of the dim greys toward teak. 1 matches `minimal`'s dim; 0 keeps the brand-tinted greys. */
export const DEFAULT_DIM_WARMTH = 1;

/**
 * Hue and chroma of `minimal`'s teak ramp (packages/tokens/src/primitives.css),
 * the warm greys its dim mode draws on. Only hue and chroma are borrowed:
 * lightness stays on the theme's curve so step contrast is unchanged.
 */
export const TEAK_HUE_CHROMA: Record<ScaleStepValue, { h: number; c: number }> = {
  50: { h: 100.82, c: 0.0106 },
  100: { h: 102.89, c: 0.0302 },
  200: { h: 96.16, c: 0.0556 },
  300: { h: 93.94, c: 0.0781 },
  400: { h: 89.04, c: 0.0868 },
  500: { h: 81.36, c: 0.0805 },
  600: { h: 74.01, c: 0.0721 },
  700: { h: 65.88, c: 0.0617 },
  800: { h: 58.2, c: 0.0515 },
  900: { h: 56.46, c: 0.043 },
  950: { h: 53.07, c: 0.0303 },
};

/** The colour ramps that get toned down. Neutral is warmed instead. */
const TONED: ScaleName[] = ['primary', 'secondary', 'tertiary', 'error', 'warning', 'success', 'info'];

function entry(raw: Oklch) {
  return { oklch: gamutMap(raw), hex: oklchToHex(raw) };
}

/** Hue `t` of the way from `from` to `to`, along the shorter arc. */
function mixHue(from: number, to: number, t: number): number {
  const delta = ((to - from + 540) % 360) - 180;
  return (from + delta * t + 360) % 360;
}

export function desaturateScale(scale: Scale, factor: number): Scale {
  const toned = {} as Scale;
  for (const step of SCALE_STEPS) {
    const { oklch } = scale[step];
    toned[step] = entry({ ...oklch, c: oklch.c * factor });
  }
  return toned;
}

export function warmScale(scale: Scale, warmth: number): Scale {
  const warmed = {} as Scale;
  for (const step of SCALE_STEPS) {
    const { oklch } = scale[step];
    const teak = TEAK_HUE_CHROMA[step];
    warmed[step] = entry({
      ...oklch,
      h: mixHue(oklch.h, teak.h, warmth),
      c: oklch.c + (teak.c - oklch.c) * warmth,
    });
  }
  return warmed;
}

/**
 * The primitives dim mode resolves against: every colour ramp's chroma scaled
 * by `chroma`, and neutral pulled `warmth` of the way toward teak's hue and
 * chroma. With chroma 1 and warmth 0 it returns the light primitives as-is.
 */
export function buildDimPrimitives(
  primitives: PrimitiveTokens,
  chroma: number,
  warmth: number
): PrimitiveTokens {
  if (chroma === 1 && warmth === 0) return primitives;
  const dim: PrimitiveTokens = { ...primitives };
  if (chroma !== 1) {
    for (const name of TONED) {
      const scale = primitives[name];
      if (scale) dim[name] = desaturateScale(scale, chroma);
    }
  }
  if (warmth !== 0 && primitives.neutral) {
    dim.neutral = warmScale(primitives.neutral, warmth);
  }
  return dim;
}
