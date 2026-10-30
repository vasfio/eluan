import { describe, it, expect } from 'vitest';
import { buildDimPrimitives, desaturateScale, warmScale, TEAK_HUE_CHROMA } from './dim.js';
import { generateScale } from './scale.js';
import { DEFAULT_CURVE } from './curves.js';
import { buildPrimitives } from '../tokens/primitives.js';
import { validateAccents } from '../input/validate.js';
import { SCALE_STEPS } from '../types.js';

const scale = generateScale(150, 0.12, DEFAULT_CURVE);
const grey = generateScale(250, 0.004, DEFAULT_CURVE);

describe('desaturateScale', () => {
  it('scales chroma and keeps lightness and hue', () => {
    const toned = desaturateScale(scale, 0.8);

    for (const step of SCALE_STEPS) {
      expect(toned[step].oklch.c).toBeCloseTo(scale[step].oklch.c * 0.8, 3);
      expect(toned[step].oklch.l).toBeCloseTo(scale[step].oklch.l, 5);
      expect(toned[step].oklch.h).toBeCloseTo(scale[step].oklch.h, 1);
    }
  });
});

describe('warmScale', () => {
  it("takes teak's hue and chroma at 1, keeping the curve's lightness", () => {
    const warmed = warmScale(grey, 1);

    for (const step of SCALE_STEPS) {
      expect(warmed[step].oklch.h).toBeCloseTo(TEAK_HUE_CHROMA[step].h, 1);
      expect(warmed[step].oklch.c).toBeCloseTo(TEAK_HUE_CHROMA[step].c, 3);
      expect(warmed[step].oklch.l).toBeCloseTo(grey[step].oklch.l, 5);
    }
  });

  it('leaves the greys alone at 0', () => {
    const warmed = warmScale(grey, 0);

    for (const step of SCALE_STEPS) {
      expect(warmed[step].hex).toBe(grey[step].hex);
    }
  });

  it('turns hue the short way round', () => {
    // 250 → teak's ~103 is 147° back through cyan, not 213° forward through red
    const half = warmScale(grey, 0.5);

    expect(half[100].oklch.h).toBeGreaterThan(103);
    expect(half[100].oklch.h).toBeLessThan(250);
  });
});

describe('buildDimPrimitives', () => {
  const { accents } = validateAccents(['#2F6F5E']);
  const primitives = buildPrimitives(accents, {
    accents: ['#2F6F5E'],
    themeName: 't',
    minContrast: 4.5,
    neutralTintRatio: 0.04,
  });

  it('returns the light primitives untouched with chroma 1 and warmth 0', () => {
    expect(buildDimPrimitives(primitives, 1, 0)).toBe(primitives);
  });

  it('tones down colour ramps and warms neutral', () => {
    const dim = buildDimPrimitives(primitives, 0.8, 1);

    for (const name of ['primary', 'error', 'warning', 'success', 'info'] as const) {
      expect(dim[name]![500].oklch.c).toBeLessThan(primitives[name]![500].oklch.c);
    }
    expect(dim.neutral![100].oklch.c).toBeCloseTo(TEAK_HUE_CHROMA[100].c, 3);
    expect(dim.neutral![100].oklch.l).toBeCloseTo(primitives.neutral![100].oklch.l, 5);
  });

  it('keeps the brand greys at warmth 0', () => {
    const dim = buildDimPrimitives(primitives, 0.8, 0);

    expect(dim.neutral).toBe(primitives.neutral);
  });
});
