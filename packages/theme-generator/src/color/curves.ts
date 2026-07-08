import type { ScaleStep } from '../types.js';

export const DEFAULT_CURVE: ScaleStep[] = [
  { step: 50,  lightness: 0.97, chromaRatio: 0.10, hueShift: 0 },
  { step: 100, lightness: 0.93, chromaRatio: 0.18, hueShift: 0 },
  { step: 200, lightness: 0.87, chromaRatio: 0.35, hueShift: 0 },
  { step: 300, lightness: 0.78, chromaRatio: 0.60, hueShift: 0 },
  { step: 400, lightness: 0.68, chromaRatio: 0.85, hueShift: 0 },
  { step: 500, lightness: 0.58, chromaRatio: 1.00, hueShift: 0 },
  { step: 600, lightness: 0.50, chromaRatio: 0.95, hueShift: 0 },
  { step: 700, lightness: 0.42, chromaRatio: 0.80, hueShift: 0 },
  { step: 800, lightness: 0.35, chromaRatio: 0.60, hueShift: 0 },
  { step: 900, lightness: 0.27, chromaRatio: 0.40, hueShift: 0 },
  { step: 950, lightness: 0.18, chromaRatio: 0.25, hueShift: 0 },
];

export function validateCurve(curve: ScaleStep[]): void {
  if (curve.length !== 11) {
    throw new Error(`Curve must have exactly 11 steps, got ${curve.length}.`);
  }

  for (let i = 1; i < curve.length; i++) {
    if (curve[i].lightness >= curve[i - 1].lightness) {
      throw new Error(
        `Lightness must be strictly monotonically decreasing. ` +
        `Step ${curve[i].step} (L=${curve[i].lightness}) >= step ${curve[i - 1].step} (L=${curve[i - 1].lightness}).`
      );
    }
  }

  for (const step of curve) {
    if (step.chromaRatio < 0 || step.chromaRatio > 1) {
      throw new Error(
        `chromaRatio must be in [0, 1]. Step ${step.step} has chromaRatio=${step.chromaRatio}.`
      );
    }
  }
}
