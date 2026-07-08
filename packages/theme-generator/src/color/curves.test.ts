import { describe, it, expect } from 'vitest';
import { DEFAULT_CURVE, validateCurve } from './curves.js';

describe('DEFAULT_CURVE', () => {
  it('has exactly 11 steps', () => {
    expect(DEFAULT_CURVE).toHaveLength(11);
  });

  it('has strictly monotonically decreasing lightness', () => {
    for (let i = 1; i < DEFAULT_CURVE.length; i++) {
      expect(DEFAULT_CURVE[i].lightness).toBeLessThan(DEFAULT_CURVE[i - 1].lightness);
    }
  });

  it('has all chromaRatio values in [0, 1]', () => {
    for (const step of DEFAULT_CURVE) {
      expect(step.chromaRatio).toBeGreaterThanOrEqual(0);
      expect(step.chromaRatio).toBeLessThanOrEqual(1);
    }
  });

  it('peaks chromaRatio around step 500', () => {
    const step500 = DEFAULT_CURVE.find(s => s.step === 500);
    expect(step500!.chromaRatio).toBe(1.0);
  });

  it('passes validateCurve', () => {
    expect(() => validateCurve(DEFAULT_CURVE)).not.toThrow();
  });
});

describe('validateCurve', () => {
  it('rejects non-11-step curves', () => {
    expect(() => validateCurve(DEFAULT_CURVE.slice(0, 5))).toThrow('exactly 11 steps');
  });

  it('rejects non-monotonic lightness', () => {
    const bad = DEFAULT_CURVE.map(s => ({ ...s }));
    bad[3].lightness = bad[2].lightness + 0.01;
    expect(() => validateCurve(bad)).toThrow('monotonically decreasing');
  });

  it('rejects chromaRatio out of range', () => {
    const bad = DEFAULT_CURVE.map(s => ({ ...s }));
    bad[5].chromaRatio = 1.5;
    expect(() => validateCurve(bad)).toThrow('chromaRatio must be in');
  });
});
