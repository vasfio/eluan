import { describe, it, expect } from 'vitest';
import { generateSystemScales, DEFAULT_SYSTEM_HUES } from './systemHues.js';
import { DEFAULT_CURVE } from './curves.js';
import { SCALE_STEPS } from '../types.js';

describe('generateSystemScales', () => {
  it('produces all four system scales', () => {
    const result = generateSystemScales(0.2, false, DEFAULT_CURVE);
    expect(result.error).toBeDefined();
    expect(result.warning).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.info).toBeDefined();
  });

  it('each scale has all 11 steps', () => {
    const result = generateSystemScales(0.2, false, DEFAULT_CURVE);
    for (const scaleName of ['error', 'warning', 'success', 'info'] as const) {
      for (const step of SCALE_STEPS) {
        expect(result[scaleName][step]).toBeDefined();
        expect(result[scaleName][step].hex).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });

  it('uses fallback hue when accent is low-chroma', () => {
    const normal = generateSystemScales(0.2, false, DEFAULT_CURVE);
    const lowChroma = generateSystemScales(0.02, true, DEFAULT_CURVE);
    expect(lowChroma.error[500].hex).not.toBe(normal.error[500].hex);
  });

  it('respects hue overrides', () => {
    const standard = generateSystemScales(0.2, false, DEFAULT_CURVE);
    const custom = generateSystemScales(0.2, false, DEFAULT_CURVE, { error: 0 });
    expect(custom.error[500].hex).not.toBe(standard.error[500].hex);
  });
});
