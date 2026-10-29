import type { Oklch, PrimitiveTokens, Scale, ScaleName, ScaleStepValue } from '../types.js';
import { SCALE_STEPS } from '../types.js';
import { gamutMap, oklchToHex } from './convert.js';

/**
 * Default OKLCH lightness added to the dark-mode colour ramps. Dark grounds
 * swallow mid-tone colour, so the same step reads dimmer than it does on a
 * light page; lifting the ramp keeps accents and status colours as vivid in
 * dark mode as they look in light mode.
 */
export const DEFAULT_DARK_LIFT = 0.08;

/** Largest lift accepted; beyond this mid steps start to read as pastels. */
export const MAX_DARK_LIFT = 0.2;

/**
 * Share of the lift each step gets: full on the mid steps people notice
 * (buttons, borders, chart series), tapering to nothing at both ends so dark
 * surfaces and tints (900–950) stay dark and the lightest steps don't clip
 * to white.
 */
export const DARK_LIFT_WEIGHTS: Record<ScaleStepValue, number> = {
  50: 0,
  100: 0.25,
  200: 0.5,
  300: 1,
  400: 1,
  500: 1,
  600: 1,
  700: 0.75,
  800: 0.5,
  900: 0.25,
  950: 0,
};

/** The colour ramps that get lifted. Neutral stays put: it draws the dark grounds. */
const LIFTED: ScaleName[] = ['primary', 'secondary', 'tertiary', 'error', 'warning', 'success', 'info'];

/** Smallest lightness gap kept between neighbouring steps, so the ramp stays ordered. */
const MIN_STEP_GAP = 0.005;

export function liftScale(scale: Scale, lift: number): Scale {
  const lifted = {} as Scale;
  let previous = Infinity;
  for (const step of SCALE_STEPS) {
    const { oklch } = scale[step];
    const l = Math.min(oklch.l + lift * DARK_LIFT_WEIGHTS[step], 0.98, previous - MIN_STEP_GAP);
    const raw: Oklch = { ...oklch, l };
    lifted[step] = { oklch: gamutMap(raw), hex: oklchToHex(raw) };
    previous = l;
  }
  return lifted;
}

/**
 * The primitives dark mode resolves against: every colour ramp lifted by
 * `lift`, neutral unchanged. A lift of 0 returns the light primitives as-is.
 */
export function buildDarkPrimitives(primitives: PrimitiveTokens, lift: number): PrimitiveTokens {
  if (lift === 0) return primitives;
  const dark: PrimitiveTokens = { ...primitives };
  for (const name of LIFTED) {
    const scale = primitives[name];
    if (scale) dark[name] = liftScale(scale, lift);
  }
  return dark;
}
