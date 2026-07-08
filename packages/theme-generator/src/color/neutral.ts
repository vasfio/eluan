import type { Scale, ScaleStep } from '../types.js';
import { generateScale } from './scale.js';

const ABSOLUTE_CHROMA_CEILING = 0.02;

export function generateNeutralScale(
  accentHue: number,
  accentPeakChroma: number,
  tintRatio: number,
  curve: ScaleStep[]
): Scale {
  const rawChroma = accentPeakChroma * tintRatio;
  const clampedChroma = Math.min(rawChroma, ABSOLUTE_CHROMA_CEILING);

  return generateScale(accentHue, clampedChroma, curve);
}
