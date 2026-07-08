import type { Scale, ScaleStep, SystemHueName } from '../types.js';
import { generateScale } from './scale.js';

export const DEFAULT_SYSTEM_HUES: Record<SystemHueName, number> = {
  error: 27,
  warning: 75,
  success: 147,
  info: 255,
};

const LOW_CHROMA_FALLBACK_HUE = 250;

export function generateSystemScales(
  accentPeakChroma: number,
  accentIsLowChroma: boolean,
  curve: ScaleStep[],
  overrides?: Partial<Record<SystemHueName, number>>
): Record<SystemHueName, Scale> {
  const hues: Record<SystemHueName, number> = {
    ...DEFAULT_SYSTEM_HUES,
    ...overrides,
  };

  if (accentIsLowChroma) {
    for (const key of Object.keys(hues) as SystemHueName[]) {
      if (!overrides?.[key]) {
        hues[key] = LOW_CHROMA_FALLBACK_HUE;
      }
    }
  }

  const systemChroma = accentIsLowChroma ? 0.14 : accentPeakChroma * 0.9;

  return {
    error: generateScale(hues.error, systemChroma, curve),
    warning: generateScale(hues.warning, systemChroma, curve),
    success: generateScale(hues.success, systemChroma, curve),
    info: generateScale(hues.info, systemChroma, curve),
  };
}
