import { describe, it, expect } from 'vitest';
import { buildSemanticMap, dimRef, modeRef, withDimRefs } from './semanticMap.js';

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
