import { describe, it, expect } from 'vitest';
import { buildSemanticMap, contrastGrounds, dimRef, modeRef, withDimRefs } from './semanticMap.js';

describe('dimRef', () => {
  it('moves one step deeper on the same ramp', () => {
    expect(dimRef('neutral.50')).toBe('neutral.100');
    expect(dimRef('primary.500')).toBe('primary.600');
    expect(dimRef('error.900')).toBe('error.950');
  });

  it('leaves 950, white and black where they are', () => {
    expect(dimRef('neutral.950')).toBe('neutral.950');
    expect(dimRef('white')).toBe('white');
    expect(dimRef('black')).toBe('black');
  });
});

describe('modeRef', () => {
  it('prefers an explicit dim ref', () => {
    const entry = { light: 'neutral.50', dark: 'neutral.800', dim: 'neutral.200', role: 'bg' } as const;

    expect(modeRef(entry, 'dim')).toBe('neutral.200');
    expect(modeRef(entry, 'light')).toBe('neutral.50');
    expect(modeRef(entry, 'dark')).toBe('neutral.800');
  });

  it('derives dim from light when none is set', () => {
    expect(modeRef({ light: 'primary.500', dark: 'primary.400', role: 'bg' }, 'dim')).toBe('primary.600');
  });
});

describe('contrastGrounds', () => {
  it('lists one, several or no grounds', () => {
    expect(contrastGrounds({ light: 'neutral.950', dark: 'neutral.50', role: 'fg', contrastAgainst: 'bg' })).toEqual(['bg']);
    expect(contrastGrounds({ light: 'neutral.950', dark: 'neutral.50', role: 'fg', contrastAgainst: ['bg', 'bg-alt'] })).toEqual(['bg', 'bg-alt']);
    expect(contrastGrounds({ light: 'neutral.50', dark: 'neutral.800', role: 'bg' })).toEqual([]);
  });

  it('checks Outline and Ghost text against the page and the panel', () => {
    const map = buildSemanticMap();

    expect(contrastGrounds(map['action-secondary-fg'])).toEqual(['container-bg', 'container-bg-alt']);
    expect(contrastGrounds(map['action-tertiary-fg'])).toEqual(['action-tertiary-bg', 'action-tertiary-bg-alt']);
  });

  it('holds muted text to the text floor on page and panel', () => {
    const map = buildSemanticMap();

    expect(contrastGrounds(map['interactive-fg-alt'])).toEqual(['interactive-bg', 'interactive-bg-alt', 'container-bg', 'container-bg-alt']);
    expect(map['interactive-fg-alt'].minContrast).toBe(4.5);
    expect(map['interactive-fg-alt'].allowBelowDefault).toBeUndefined();
  });
});

describe('base grey aliases', () => {
  const map = buildSemanticMap();

  it("mirrors minimal's ramp aliases, one step deeper in dim", () => {
    expect(map['backgrounds-primary']).toMatchObject({ light: 'neutral.50', dim: 'neutral.100', dark: 'neutral.800' });
    expect(map['backgrounds-tertiary']).toMatchObject({ light: 'neutral.200', dim: 'neutral.300', dark: 'neutral.950' });
    expect(map['foregrounds-primary']).toMatchObject({ light: 'neutral.950', dim: 'neutral.950', dark: 'neutral.50' });
    expect(map['foregrounds-secondary']).toMatchObject({ light: 'neutral.800', dim: 'neutral.900', dark: 'neutral.100' });
  });

  it('checks the text aliases on the grounds they sit on', () => {
    expect(contrastGrounds(map['foregrounds-primary'])).toEqual(['backgrounds-primary', 'backgrounds-secondary', 'backgrounds-tertiary']);
    expect(contrastGrounds(map['foregrounds-secondary'])).toEqual(['backgrounds-primary', 'backgrounds-secondary']);
    expect(map['foregrounds-quaternary']).toMatchObject({ minContrast: 3.0, allowBelowDefault: true });
    expect(contrastGrounds(map['foregrounds-quinary'])).toEqual([]);
  });
});

describe('action-neutral (the Secondary button)', () => {
  const map = buildSemanticMap();

  it('sits on the same steps as backgrounds-tertiary and -quaternary', () => {
    for (const mode of ['light', 'dim', 'dark'] as const) {
      expect(modeRef(map['action-neutral-bg'], mode), mode).toBe(modeRef(map['backgrounds-tertiary'], mode));
      expect(modeRef(map['action-neutral-bg-hover'], mode), mode).toBe(modeRef(map['backgrounds-quaternary'], mode));
    }
  });

  it('checks its text against the fill and the hover fill', () => {
    expect(contrastGrounds(map['action-neutral-fg'])).toEqual(['action-neutral-bg', 'action-neutral-bg-hover']);
  });
});

describe('buildSemanticMap', () => {
  it('pins a dim ref on every entry', () => {
    for (const [token, entry] of Object.entries(buildSemanticMap())) {
      expect(entry.dim, token).toBe(dimRef(entry.light));
    }
  });

  it('keeps explicit dim refs when pinning', () => {
    const map = withDimRefs({ bg: { light: 'neutral.50', dark: 'neutral.800', dim: 'neutral.300', role: 'bg' } });

    expect(map.bg.dim).toBe('neutral.300');
  });
});
