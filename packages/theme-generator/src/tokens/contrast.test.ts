import { describe, it, expect } from 'vitest';
import { checkContrast, autoCorrect } from './contrast.js';
import { buildSemanticMap } from './semanticMap.js';
import { buildPrimitives } from './primitives.js';
import { validateAccents } from '../input/validate.js';
import type { GeneratorConfig, PrimitiveTokens, SemanticMap } from '../types.js';

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

  // For the orange primitives, neutral.600 on neutral.50 sits at ~5.5:1 —
  // above the 4.5 per-entry floor, below a 7:1 (AAA) config floor. That gap
  // is what makes these pairings discriminate the floor semantics.
  describe('config minContrast floor', () => {
    const primitives = makePrimitives('#FF4A2C');
    const makeMidPair = (): SemanticMap => ({
      bg: { light: 'neutral.50', dark: 'neutral.800', role: 'bg' },
      fg: { light: 'neutral.600', dark: 'neutral.300', role: 'fg', contrastAgainst: 'bg', minContrast: 4.5 },
    });

    it('a stricter config floor raises per-entry minimums', () => {
      const { corrections } = autoCorrect(makeMidPair(), primitives, 'light', 7);
      expect(corrections.map(c => c.token)).toContain('fg');
      expect(corrections[0].correctedContrast).toBeGreaterThanOrEqual(7);
    });

    it('a lax config floor cannot lower per-entry minimums', () => {
      const map = makeMidPair();
      map.fg.light = 'neutral.500'; // ~4:1, below the entry's own 4.5 floor
      const { corrections } = autoCorrect(map, primitives, 'light', 1);
      expect(corrections.map(c => c.token)).toContain('fg');
      expect(corrections[0].correctedContrast).toBeGreaterThanOrEqual(4.5);
    });

    it('allowBelowDefault keeps an entry at its own tier under a stricter floor', () => {
      const map = makeMidPair();
      map.fg.allowBelowDefault = true;
      const { corrections } = autoCorrect(map, primitives, 'light', 7);
      expect(corrections).toHaveLength(0);
    });

    it('interactive-fg-alt stays at its 3:1 tier when the config asks for AAA', () => {
      const map = buildSemanticMap();
      const { corrections } = autoCorrect(map, primitives, 'light', 7);
      expect(corrections.map(c => c.token)).not.toContain('interactive-fg-alt');
    });
  });
});
