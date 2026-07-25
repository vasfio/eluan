import { describe, it, expect } from 'vitest';
import { checkContrast, autoCorrect } from './contrast.js';
import { buildSemanticMap } from './semanticMap.js';
import { buildPrimitives } from './primitives.js';
import { validateAccents } from '../input/validate.js';
import type { GeneratorConfig, PrimitiveTokens } from '../types.js';

describe('checkContrast', () => {
  it('returns 21 for black on white', () => {
    const ratio = checkContrast('#000000', '#ffffff');
    expect(ratio).toBeCloseTo(21, 0);
  });

  it('returns 1 for same color', () => {
    const ratio = checkContrast('#ff0000', '#ff0000');
    expect(ratio).toBeCloseTo(1, 1);
  });

  it('returns expected ratio for known pair', () => {
    const ratio = checkContrast('#767676', '#ffffff');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});

describe('autoCorrect', () => {
  function makePrimitives(accent: string): PrimitiveTokens {
    const { accents } = validateAccents([accent]);
    const config: GeneratorConfig = {
      accents: [accent],
      themeName: 'test',
      minContrast: 4.5,
      neutralTintRatio: 0.04,
    };
    return buildPrimitives(accents, config);
  }

  it('does not modify decorative tokens', () => {
    const primitives = makePrimitives('#FF4A2C');
    const map = buildSemanticMap();
    const { corrections } = autoCorrect(map, primitives, 'light', 4.5);
    const decorativeCorrections = corrections.filter(c =>
      c.token.startsWith('dataviz-')
    );
    expect(decorativeCorrections).toHaveLength(0);
  });

  it('never moves bg tokens', () => {
    const primitives = makePrimitives('#FF4A2C');
    const map = buildSemanticMap();
    const { corrections } = autoCorrect(map, primitives, 'light', 4.5);
    for (const c of corrections) {
      const entry = map[c.token];
      expect(entry.role).not.toBe('bg');
    }
  });

  it('corrections use step-shift or hard-fallback', () => {
    const primitives = makePrimitives('#FF4A2C');
    const map = buildSemanticMap();
    const { corrections } = autoCorrect(map, primitives, 'light', 4.5);
    for (const c of corrections) {
      expect(['step-shift', 'hard-fallback']).toContain(c.kind);
    }
  });

  it('produces identical results for identical inputs', () => {
    const primitives = makePrimitives('#FF4A2C');
    const map = buildSemanticMap();
    const result1 = autoCorrect(map, primitives, 'light', 4.5);
    const result2 = autoCorrect(map, primitives, 'light', 4.5);
    expect(result1.corrections).toEqual(result2.corrections);
  });
});
