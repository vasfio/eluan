import type { Oklch, Scale, ScaleStep, ScaleStepValue } from '../types.js';
import { gamutMap, oklchToHex } from './convert.js';

export function generateScale(
  hue: number,
  peakChroma: number,
  curve: ScaleStep[]
): Scale {
  const scale = {} as Scale;

  for (const step of curve) {
    const rawOklch: Oklch = {
      mode: 'oklch',
      l: step.lightness,
      c: peakChroma * step.chromaRatio,
      h: hue + step.hueShift,
    };

    const mapped = gamutMap(rawOklch);
    const hex = oklchToHex(rawOklch);

    scale[step.step as ScaleStepValue] = {
      oklch: mapped,
      hex,
    };
  }

  return scale;
}
