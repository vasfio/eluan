import { describe, it, expect } from 'vitest';
import { generateNeutralScale } from './neutral.js';
import { DEFAULT_CURVE } from './curves.js';
import { SCALE_STEPS } from '../types.js';

describe('generateNeutralScale', () => {
  it('produces all 11 steps', () => {
    const scale = generateNeutralScale(30, 0.2, 0.04, DEFAULT_CURVE);
    for (const step of SCALE_STEPS) {
      expect(scale[step]).toBeDefined();
    }
  });

  it('chroma stays below absolute ceiling', () => {
    const scale = generateNeutralScale(30, 0.5, 0.04, DEFAULT_CURVE);
    for (const step of SCALE_STEPS) {
      expect(scale[step].oklch.c).toBeLessThanOrEqual(0.025);
    }
  });

  it('very low tint ratio produces near-zero chroma', () => {
    const scale = generateNeutralScale(30, 0.1, 0.01, DEFAULT_CURVE);
    for (const step of SCALE_STEPS) {
      expect(scale[step].oklch.c).toBeLessThanOrEqual(0.005);
    }
  });
});
