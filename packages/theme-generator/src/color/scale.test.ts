import { describe, it, expect } from 'vitest';
import { generateScale } from './scale.js';
import { DEFAULT_CURVE } from './curves.js';
import { SCALE_STEPS } from '../types.js';

describe('generateScale', () => {
  const scale = generateScale(30, 0.2, DEFAULT_CURVE);

  it('produces all 11 steps', () => {
    for (const step of SCALE_STEPS) {
      expect(scale[step]).toBeDefined();
      expect(scale[step].hex).toMatch(/^#[0-9a-f]{6}$/);
      expect(scale[step].oklch).toBeDefined();
    }
  });

  it('step 50 is lighter than step 950', () => {
    expect(scale[50].oklch.l).toBeGreaterThan(scale[950].oklch.l);
  });

  it('all hex values are valid 6-digit lowercase hex', () => {
    for (const step of SCALE_STEPS) {
      expect(scale[step].hex).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('all steps are in sRGB gamut (parseable hex)', () => {
    for (const step of SCALE_STEPS) {
      const hex = scale[step].hex;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(255);
      expect(g).toBeGreaterThanOrEqual(0);
      expect(g).toBeLessThanOrEqual(255);
      expect(b).toBeGreaterThanOrEqual(0);
      expect(b).toBeLessThanOrEqual(255);
    }
  });

  it('produces deterministic output', () => {
    const scale2 = generateScale(30, 0.2, DEFAULT_CURVE);
    for (const step of SCALE_STEPS) {
      expect(scale[step].hex).toBe(scale2[step].hex);
    }
  });
});
