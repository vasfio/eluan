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

  describe('several grounds', () => {
    const primitives = makePrimitives('#FF4A2C');
    const hex = (step: 50 | 300 | 600) => primitives.neutral![step].hex;

    it('corrects against the hardest ground', () => {
      const map: SemanticMap = {
        page: { light: 'neutral.50', dark: 'neutral.800', role: 'bg' },
        panel: { light: 'neutral.300', dark: 'neutral.900', role: 'bg' },
        fg: { light: 'neutral.600', dark: 'neutral.300', role: 'fg', contrastAgainst: ['page', 'panel'], minContrast: 4.5 },
      };
      // Passes on the page, fails on the panel
      expect(checkContrast(hex(600), hex(50))).toBeGreaterThanOrEqual(4.5);
      expect(checkContrast(hex(600), hex(300))).toBeLessThan(4.5);

      const { correctedMap, corrections } = autoCorrect(map, primitives, 'light', 4.5);
      const fixed = primitives.neutral![Number(correctedMap.fg.light.split('.')[1]) as 600].hex;

      expect(corrections).toHaveLength(1);
      expect(corrections[0].originalContrast).toBeCloseTo(checkContrast(hex(600), hex(300)), 5);
      expect(checkContrast(fixed, hex(50))).toBeGreaterThanOrEqual(4.5);
      expect(checkContrast(fixed, hex(300))).toBeGreaterThanOrEqual(4.5);
    });

    it('leaves a single ground alone when only that one is listed', () => {
      const map: SemanticMap = {
        page: { light: 'neutral.50', dark: 'neutral.800', role: 'bg' },
        fg: { light: 'neutral.600', dark: 'neutral.300', role: 'fg', contrastAgainst: 'page', minContrast: 4.5 },
      };

      expect(autoCorrect(map, primitives, 'light', 4.5).corrections).toHaveLength(0);
    });
  });

  describe('nearest passing step', () => {
    const primitives = makePrimitives('#FF4A2C');
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
    const hex = (ref: string) => {
      const [scale, step] = ref.split('.');
      return primitives[scale as 'primary']![Number(step) as 500].hex;
    };

    it('moves brand text the fewest steps that pass, not to the end of the ramp', () => {
      const map: SemanticMap = {
        bg: { light: 'neutral.50', dark: 'neutral.800', role: 'bg' },
        fg: { light: 'primary.500', dark: 'primary.400', role: 'fg', contrastAgainst: 'bg', minContrast: 4.5 },
      };
      const [c] = autoCorrect(map, primitives, 'light', 4.5).corrections;
      const step = Number(c.correctedRef.split('.')[1]);
      const lighter = steps[steps.indexOf(step as 500) - 1];

      expect(c.kind).toBe('step-shift');
      expect(c.correctedRef).not.toBe('primary.950');
      expect(step).toBeGreaterThan(500);
      expect(c.correctedContrast).toBeGreaterThanOrEqual(4.5);
      // Every step between the original and the correction fails
      if (lighter > 500) expect(checkContrast(hex(`primary.${lighter}`), hex('neutral.50'))).toBeLessThan(4.5);
    });

    it('walks toward the light steps in dark mode', () => {
      const map: SemanticMap = {
        bg: { light: 'neutral.50', dark: 'neutral.800', role: 'bg' },
        fg: { light: 'primary.500', dark: 'primary.600', role: 'fg', contrastAgainst: 'bg', minContrast: 4.5 },
      };
      const [c] = autoCorrect(map, primitives, 'dark', 4.5).corrections;
      const step = Number(c.correctedRef.split('.')[1]);
      const darker = steps[steps.indexOf(step as 500) + 1];

      expect(step).toBeLessThan(600);
      expect(c.correctedRef).not.toBe('primary.50');
      if (darker < 600) expect(checkContrast(hex(`primary.${darker}`), hex('neutral.800'))).toBeLessThan(4.5);
    });
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

    it('the 3:1 UI tier stays put when the config asks for AAA', () => {
      const map = buildSemanticMap();
      const { corrections } = autoCorrect(map, primitives, 'light', 7);
      expect(corrections.map(c => c.token)).not.toContain('focus-ring');
      expect(corrections.map(c => c.token)).not.toContain('foregrounds-quaternary');
    });

    it('muted text follows the config floor up to AAA', () => {
      const map = buildSemanticMap();
      const { corrections } = autoCorrect(map, primitives, 'light', 7);
      const fix = corrections.find(c => c.token === 'interactive-fg-alt');
      expect(fix?.correctedContrast).toBeGreaterThanOrEqual(7);
    });
  });

  describe('dim mode', () => {
    const primitives = makePrimitives('#FF4A2C');

    it('corrects only the dim ref and records the mode', () => {
      const map: SemanticMap = {
        bg: { light: 'neutral.50', dark: 'neutral.800', dim: 'neutral.100', role: 'bg' },
        fg: { light: 'neutral.950', dark: 'neutral.50', dim: 'neutral.400', role: 'fg', contrastAgainst: 'bg', minContrast: 4.5 },
      };
      const { correctedMap, corrections } = autoCorrect(map, primitives, 'dim', 4.5);

      expect(corrections).toHaveLength(1);
      expect(corrections[0].mode).toBe('dim');
      expect(corrections[0].correctedContrast).toBeGreaterThanOrEqual(4.5);
      expect(correctedMap.fg.dim).toBe(corrections[0].correctedRef);
      expect(correctedMap.fg.light).toBe('neutral.950');
      expect(correctedMap.fg.dark).toBe('neutral.50');
    });

    it('walks toward the end that suits the ground, stopping at the nearest pass', () => {
      const onLight: SemanticMap = {
        bg: { light: 'neutral.50', dark: 'neutral.800', dim: 'neutral.100', role: 'bg' },
        fg: { light: 'neutral.950', dark: 'neutral.50', dim: 'neutral.400', role: 'fg', contrastAgainst: 'bg', minContrast: 4.5 },
      };
      const onDark: SemanticMap = {
        bg: { light: 'neutral.50', dark: 'neutral.800', dim: 'neutral.900', role: 'bg' },
        fg: { light: 'neutral.950', dark: 'neutral.50', dim: 'neutral.600', role: 'fg', contrastAgainst: 'bg', minContrast: 4.5 },
      };

      expect(autoCorrect(onLight, primitives, 'dim', 4.5).corrections[0].correctedRef).toBe('neutral.600');
      expect(autoCorrect(onDark, primitives, 'dim', 4.5).corrections[0].correctedRef).toBe('neutral.400');
    });

    it('derives dim from light when an entry has no dim ref', () => {
      const map: SemanticMap = {
        bg: { light: 'neutral.50', dark: 'neutral.800', role: 'bg' },
        fg: { light: 'neutral.300', dark: 'neutral.50', role: 'fg', contrastAgainst: 'bg', minContrast: 4.5 },
      };
      const { corrections } = autoCorrect(map, primitives, 'dim', 4.5);

      expect(corrections[0].originalRef).toBe('neutral.400');
    });
  });
});
