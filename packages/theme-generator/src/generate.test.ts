import { describe, it, expect } from 'vitest';
import { generateTheme, computeInputHash } from './generate.js';
import type { GeneratorConfig } from './types.js';

const ORANGE_CONFIG: GeneratorConfig = {
  accents: ['#FF4A2C'],
  themeName: 'test-orange',
  minContrast: 4.5,
  neutralTintRatio: 0.04,
};

const DUAL_CONFIG: GeneratorConfig = {
  accents: ['#FF4A2C', '#0F3D3E'],
  themeName: 'test-dual',
  minContrast: 4.5,
  neutralTintRatio: 0.04,
};

describe('computeInputHash', () => {
  it('is deterministic', () => {
    const hash1 = computeInputHash(ORANGE_CONFIG);
    const hash2 = computeInputHash(ORANGE_CONFIG);
    expect(hash1).toBe(hash2);
  });

  it('differs for different inputs', () => {
    const hash1 = computeInputHash(ORANGE_CONFIG);
    const hash2 = computeInputHash(DUAL_CONFIG);
    expect(hash1).not.toBe(hash2);
  });

  it('is a 12-character lowercase hex fingerprint', () => {
    expect(computeInputHash(ORANGE_CONFIG)).toMatch(/^[0-9a-f]{12}$/);
  });

  it('ignores the theme name', () => {
    const renamed = { ...ORANGE_CONFIG, themeName: 'something-else' };
    expect(computeInputHash(renamed)).toBe(computeInputHash(ORANGE_CONFIG));
  });

  // Golden vectors: the fingerprint is part of generated output, so an
  // unintended change to the hashing algorithm should fail loudly rather than
  // silently churn every generated theme.
  it('matches known fingerprints', () => {
    expect(computeInputHash(ORANGE_CONFIG)).toBe('3fb5aafa8cc9');
    expect(computeInputHash(DUAL_CONFIG)).toBe('d63881b946f3');
  });
});

describe('generateTheme', () => {
  it('produces complete result for single accent', () => {
    const result = generateTheme(ORANGE_CONFIG);

    expect(result.primitives.primary).toBeDefined();
    expect(result.primitives.neutral).toBeDefined();
    expect(result.primitives.error).toBeDefined();
    expect(result.primitives.warning).toBeDefined();
    expect(result.primitives.success).toBeDefined();
    expect(result.primitives.info).toBeDefined();

    expect(result.semanticMap).toBeDefined();
    expect(Object.keys(result.semanticMap).length).toBeGreaterThan(100);

    expect(result.css.primitives).toContain('data-theme="test-orange"');
    expect(result.css.theme).toContain('data-theme="test-orange"');

    expect(result.createThemeTokens['--container-bg']).toMatch(/^#[0-9a-f]{6}$/);
    expect(result.createThemeTokens['--action-primary-bg']).toMatch(/^#[0-9a-f]{6}$/);

    expect(result.report).toContain('test-orange');
  });

  it('produces secondary scale for dual accents', () => {
    const result = generateTheme(DUAL_CONFIG);
    expect(result.primitives.secondary).toBeDefined();
  });

  it('is deterministic (byte-identical output)', () => {
    const result1 = generateTheme(ORANGE_CONFIG);
    const result2 = generateTheme(ORANGE_CONFIG);

    expect(result1.css.primitives).toBe(result2.css.primitives);
    expect(result1.css.theme).toBe(result2.css.theme);
    expect(result1.css.lightMode).toBe(result2.css.lightMode);
    expect(result1.css.darkMode).toBe(result2.css.darkMode);
    expect(result1.report).toBe(result2.report);
  });

  it('includes all required semantic tokens', () => {
    const result = generateTheme(ORANGE_CONFIG);
    const requiredTokens = [
      'container-bg', 'container-fg',
      'interactive-bg', 'interactive-fg',
      'action-primary-bg', 'action-primary-fg',
      'action-secondary-fg', 'action-secondary-border',
      'action-tertiary-bg', 'action-tertiary-fg',
      'destructive-bg', 'destructive-fg',
      'positive-bg', 'positive-fg',
      'cautionary-bg', 'cautionary-fg',
      'informative-bg', 'informative-fg',
      'important-bg', 'important-fg',
      'dataviz-1-main', 'dataviz-8-shade',
    ];
    for (const token of requiredTokens) {
      expect(result.semanticMap[token]).toBeDefined();
      expect(result.createThemeTokens[`--${token}`]).toBeDefined();
    }
  });

  it('CSS contains both light and dark mode blocks', () => {
    const result = generateTheme(ORANGE_CONFIG);
    expect(result.css.theme).toContain('data-mode="light"');
    expect(result.css.theme).toContain('data-mode="dark"');
  });

  it('handles near-achromatic input', () => {
    const config: GeneratorConfig = {
      accents: ['#888888'],
      themeName: 'gray',
      minContrast: 4.5,
      neutralTintRatio: 0.04,
    };
    const result = generateTheme(config);
    expect(result.primitives.primary).toBeDefined();
    expect(result.css.theme).toBeTruthy();
  });

  it('handles extreme-lightness input', () => {
    const config: GeneratorConfig = {
      accents: ['#FAFAFA'],
      themeName: 'white',
      minContrast: 4.5,
      neutralTintRatio: 0.04,
    };
    const result = generateTheme(config);
    expect(result.primitives.primary).toBeDefined();
  });

  it('handles three accents', () => {
    const config: GeneratorConfig = {
      accents: ['#FF4A2C', '#0F3D3E', '#6032F9'],
      themeName: 'triple',
      minContrast: 4.5,
      neutralTintRatio: 0.04,
    };
    const result = generateTheme(config);
    expect(result.primitives.primary).toBeDefined();
    expect(result.primitives.secondary).toBeDefined();
    expect(result.primitives.tertiary).toBeDefined();
  });
});

describe('minContrast floor semantics', () => {
  it('step-shift corrections honor the raised config floor', () => {
    const aaa = generateTheme({ ...ORANGE_CONFIG, minContrast: 7 });
    for (const c of aaa.corrections) {
      if (c.kind === 'step-shift') {
        expect(c.correctedContrast).toBeGreaterThanOrEqual(7);
      }
    }
  });

  it('a lax config floor cannot lower per-entry minimums', () => {
    const aa = generateTheme(ORANGE_CONFIG);
    const lax = generateTheme({ ...ORANGE_CONFIG, minContrast: 1 });
    expect(lax.corrections).toEqual(aa.corrections);
  });

  it('allowBelowDefault entries keep their own tier under a stricter floor', () => {
    const aa = generateTheme(ORANGE_CONFIG);
    const aaa = generateTheme({ ...ORANGE_CONFIG, minContrast: 7 });
    expect(aaa.semanticMap['interactive-fg-alt'].allowBelowDefault).toBe(true);
    expect(aaa.corrections.map((c) => c.token)).not.toContain('interactive-fg-alt');
    expect(aaa.semanticMap['interactive-fg-alt']).toEqual(aa.semanticMap['interactive-fg-alt']);
  });
});

describe('snapshot: orange theme', () => {
  const result = generateTheme(ORANGE_CONFIG);

  it('primary.500 hex is stable', () => {
    expect(result.primitives.primary![500].hex).toMatchInlineSnapshot(`"#de2700"`);
  });

  it('neutral.50 hex is stable', () => {
    expect(result.primitives.neutral![50].hex).toMatchInlineSnapshot(`"#f6f5f5"`);
  });

  it('error.500 hex is stable', () => {
    expect(result.primitives.error![500].hex).toMatchInlineSnapshot(`"#d73531"`);
  });
});

describe('snapshot: dual accent theme', () => {
  const result = generateTheme(DUAL_CONFIG);

  it('primary.500 hex is stable', () => {
    expect(result.primitives.primary![500].hex).toMatchInlineSnapshot(`"#de2700"`);
  });

  it('secondary.500 hex is stable', () => {
    expect(result.primitives.secondary![500].hex).toMatchInlineSnapshot(`"#578384"`);
  });
});
