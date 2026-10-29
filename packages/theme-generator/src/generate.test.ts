import { describe, it, expect } from 'vitest';
import { generateTheme, computeInputHash } from './generate.js';
import { compileCreateThemeTokens } from './compile/css.js';
import { checkContrast } from './tokens/contrast.js';
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

describe('dark lift', () => {
  const ACCENTS = ['#2F6F5E', '#FF4A2C', '#FFD60A', '#1D4ED8', '#7C3AED'];

  it('brightens dark-mode colours by default', () => {
    const flat = generateTheme({ ...ORANGE_CONFIG, darkLift: 0 });
    const lifted = generateTheme(ORANGE_CONFIG);
    const l = (hex: string) => checkContrast(hex, '#000000');

    const flatDark = compileCreateThemeTokens(flat.semanticMap, flat.primitivesDark, 'dark');
    const liftedDark = compileCreateThemeTokens(lifted.semanticMap, lifted.primitivesDark, 'dark');
    expect(l(liftedDark['--action-primary-bg'])).toBeGreaterThan(l(flatDark['--action-primary-bg']));
    expect(l(liftedDark['--destructive-border'])).toBeGreaterThan(l(flatDark['--destructive-border']));
    expect(l(liftedDark['--dataviz-1-main'])).toBeGreaterThan(l(flatDark['--dataviz-1-main']));
  });

  it('leaves light mode alone', () => {
    const flat = generateTheme({ ...ORANGE_CONFIG, darkLift: 0 });
    const lifted = generateTheme(ORANGE_CONFIG);

    expect(lifted.css.lightMode).toBe(flat.css.lightMode);
    expect(lifted.createThemeTokens).toEqual(flat.createThemeTokens);
  });

  it('resolves dark mode against the light primitives at 0', () => {
    const flat = generateTheme({ ...ORANGE_CONFIG, darkLift: 0 });

    expect(flat.primitivesDark).toBe(flat.primitives);
  });

  it('keeps every checked pair at its minimum in both modes', () => {
    for (const accent of ACCENTS) {
      const r = generateTheme({ ...ORANGE_CONFIG, accents: [accent] });
      const modes = {
        light: compileCreateThemeTokens(r.semanticMap, r.primitives, 'light'),
        dark: compileCreateThemeTokens(r.semanticMap, r.primitivesDark, 'dark'),
      };
      for (const [token, entry] of Object.entries(r.semanticMap)) {
        if (!entry.contrastAgainst) continue;
        const floor = entry.allowBelowDefault ? entry.minContrast! : Math.max(entry.minContrast ?? 0, 4.5);
        for (const map of Object.values(modes)) {
          const ratio = checkContrast(map[`--${token}`], map[`--${entry.contrastAgainst}`]);
          expect(ratio, `${accent} ${token}`).toBeGreaterThanOrEqual(floor - 1e-6);
        }
      }
    }
  });

  it('rejects a lift out of range', () => {
    expect(() => generateTheme({ ...ORANGE_CONFIG, darkLift: -0.1 })).toThrow(/darkLift/);
    expect(() => generateTheme({ ...ORANGE_CONFIG, darkLift: 0.5 })).toThrow(/darkLift/);
  });

  it('fingerprints an explicit lift and reports the one used', () => {
    expect(computeInputHash(ORANGE_CONFIG)).not.toBe(computeInputHash({ ...ORANGE_CONFIG, darkLift: 0.12 }));
    expect(generateTheme(ORANGE_CONFIG).report).toContain('**Dark lift:** 0.08');
  });
});

describe('dual-mode consumer outputs', () => {
  it('returns createTheme options with light tokens and dark overrides', () => {
    const r = generateTheme(ORANGE_CONFIG);

    expect(r.createThemeOptions.tokens).toEqual(r.createThemeTokens);
    expect(r.createThemeOptions.modes.dark).toEqual(
      compileCreateThemeTokens(r.semanticMap, r.primitivesDark, 'dark'),
    );
    expect(r.createThemeOptions.modes.dark['--action-primary-bg']).not.toBe(r.createThemeTokens['--action-primary-bg']);
  });

  it('returns a ready custom theme layered on minimal', () => {
    const r = generateTheme(ORANGE_CONFIG);
    const { css } = r.customTheme;
    const dark = css.indexOf('[data-theme-custom="test-orange"][data-mode="dark"],');

    expect(r.customTheme.name).toBe('test-orange');
    expect(r.customTheme.extends).toBe('minimal');
    expect(css.startsWith('[data-theme-custom="test-orange"] {')).toBe(true);
    expect(dark).toBeGreaterThan(0);
    expect(css).toContain('[data-theme-custom="test-orange"][data-mode="Dark"] {');
    expect(css.slice(0, dark)).toContain(`--action-primary-bg: ${r.createThemeTokens['--action-primary-bg']};`);
    expect(css.slice(dark)).toContain(`--action-primary-bg: ${r.createThemeOptions.modes.dark['--action-primary-bg']};`);
    expect(css).not.toContain('[data-theme=');
  });

  it('escapes quotes in the theme name', () => {
    const r = generateTheme({ ...ORANGE_CONFIG, themeName: 'say "hi"' });

    expect(r.customTheme.css).toContain('[data-theme-custom="say \\"hi\\""]');
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
