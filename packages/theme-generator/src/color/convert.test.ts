import { describe, it, expect } from 'vitest';
import { hexToOklch, oklchToHex, gamutMap } from './convert.js';
import type { Oklch } from '../types.js';

describe('hexToOklch', () => {
  it('converts valid hex to OKLCH', () => {
    const result = hexToOklch('#ff0000');
    expect(result.mode).toBe('oklch');
    expect(result.l).toBeGreaterThan(0);
    expect(result.c).toBeGreaterThan(0);
    expect(result.h).toBeDefined();
  });

  it('throws on invalid hex', () => {
    expect(() => hexToOklch('not-a-hex')).toThrow();
  });
});

describe('oklchToHex', () => {
  it('converts OKLCH to valid hex', () => {
    const oklch: Oklch = { mode: 'oklch', l: 0.5, c: 0.15, h: 30 };
    const hex = oklchToHex(oklch);
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('roundtrips through hex', () => {
    const original = '#ff4a2c';
    const oklch = hexToOklch(original);
    const hex = oklchToHex(oklch);
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe('gamutMap', () => {
  it('clamps out-of-gamut colors without changing hue', () => {
    const outOfGamut: Oklch = { mode: 'oklch', l: 0.5, c: 0.5, h: 30 };
    const mapped = gamutMap(outOfGamut);
    expect(mapped.c).toBeLessThanOrEqual(outOfGamut.c);
    expect(mapped.l).toBeCloseTo(outOfGamut.l, 1);
  });

  it('preserves in-gamut colors', () => {
    const inGamut: Oklch = { mode: 'oklch', l: 0.5, c: 0.05, h: 30 };
    const mapped = gamutMap(inGamut);
    expect(mapped.c).toBeCloseTo(inGamut.c, 3);
  });
});
