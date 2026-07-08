import type {
  GeneratorConfig,
  PrimitiveTokens,
  ScaleStep,
  ValidatedAccent,
} from '../types.js';
import { DEFAULT_CURVE, validateCurve } from '../color/curves.js';
import { generateScale } from '../color/scale.js';
import { generateSystemScales } from '../color/systemHues.js';
import { generateNeutralScale } from '../color/neutral.js';

export function buildPrimitives(
  accents: ValidatedAccent[],
  config: GeneratorConfig
): PrimitiveTokens {
  const curve: ScaleStep[] = config.curve ?? DEFAULT_CURVE;
  validateCurve(curve);

  const tokens: PrimitiveTokens = {};
  const primary = accents[0];
  const isLowChroma = primary.classification === 'low-chroma';

  tokens.primary = generateScale(primary.oklch.h, primary.oklch.c, curve);

  if (accents.length >= 2) {
    const sec = accents[1];
    tokens.secondary = generateScale(sec.oklch.h, sec.oklch.c, curve);
  }
  if (accents.length >= 3) {
    const ter = accents[2];
    tokens.tertiary = generateScale(ter.oklch.h, ter.oklch.c, curve);
  }

  tokens.neutral = generateNeutralScale(
    primary.oklch.h,
    primary.oklch.c,
    config.neutralTintRatio,
    curve
  );

  const systemScales = generateSystemScales(
    primary.oklch.c,
    isLowChroma,
    curve,
    config.systemHues
  );

  tokens.error = systemScales.error;
  tokens.warning = systemScales.warning;
  tokens.success = systemScales.success;
  tokens.info = systemScales.info;

  return tokens;
}
