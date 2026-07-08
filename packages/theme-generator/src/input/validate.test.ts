import { describe, it, expect } from 'vitest';
import { validateAccents, normalizeHex, classifyAccent } from './validate.js';
import type { Oklch } from '../types.js';

describe('normalizeHex', () => {
  it('expands 3-digit hex to 6-digit', () => {
    expect(normalizeHex('#abc')).toEqual({ hex: '#aabbcc' });
  });

  it('lowercases 6-digit hex', () => {
    expect(normalizeHex('#FF4A2C')).toEqual({ hex: '#ff4a2c' });
  });

  it('strips alpha from 8-digit hex with warning', () => {
    const result = normalizeHex('#FF4A2CFF');
    expect(result.hex).toBe('#ff4a2c');
    expect(result.warning).toContain('Alpha channel stripped');
  });

  it('rejects invalid formats', () => {
    expect(() => normalizeHex('red')).toThrow('Invalid hex color');
    expect(() => normalizeHex('#GG0000')).toThrow('Invalid hex color');
    expect(() => normalizeHex('FF4A2C')).toThrow('Invalid hex color');
    expect(() => normalizeHex('#12345')).toThrow('Invalid hex color');
  });

  it('handles whitespace', () => {
    expect(normalizeHex('  #FF4A2C  ')).toEqual({ hex: '#ff4a2c' });
  });
});

describe('classifyAccent', () => {
  it('classifies normal chroma/lightness as normal', () => {
    const oklch: Oklch = { mode: 'oklch', l: 0.5, c: 0.15, h: 30 };
    expect(classifyAccent(oklch)).toBe('normal');
  });

  it('classifies low chroma as low-chroma', () => {
    const oklch: Oklch = { mode: 'oklch', l: 0.5, c: 0.02, h: 30 };
    expect(classifyAccent(oklch)).toBe('low-chroma');
  });

  it('classifies very light color as extreme-lightness', () => {
    const oklch: Oklch = { mode: 'oklch', l: 0.95, c: 0.1, h: 30 };
    expect(classifyAccent(oklch)).toBe('extreme-lightness');
  });

  it('classifies very dark color as extreme-lightness', () => {
    const oklch: Oklch = { mode: 'oklch', l: 0.1, c: 0.1, h: 30 };
    expect(classifyAccent(oklch)).toBe('extreme-lightness');
  });
});

describe('validateAccents', () => {
  it('validates single accent', () => {
    const result = validateAccents(['#FF4A2C']);
    expect(result.accents).toHaveLength(1);
    expect(result.accents[0].hex).toBe('#ff4a2c');
    expect(result.accents[0].classification).toBe('normal');
  });

  it('validates multiple accents', () => {
    const result = validateAccents(['#FF4A2C', '#0F3D3E', '#6032F9']);
    expect(result.accents).toHaveLength(3);
  });

  it('rejects empty accents', () => {
    expect(() => validateAccents([])).toThrow('At least one accent');
  });

  it('rejects more than 3 accents', () => {
    expect(() => validateAccents(['#a', '#b', '#c', '#d'])).toThrow('At most 3');
  });

  it('warns on near-duplicate hues', () => {
    const result = validateAccents(['#FF4A2C', '#FF5522']);
    const dupWarning = result.warnings.find(w => w.message.includes('similar hues'));
    expect(dupWarning).toBeDefined();
  });

  it('warns on near-achromatic input', () => {
    const result = validateAccents(['#888888']);
    const chromaWarning = result.warnings.find(w => w.message.includes('near-achromatic'));
    expect(chromaWarning).toBeDefined();
  });

  it('warns on extreme lightness input', () => {
    const result = validateAccents(['#FAFAFA']);
    const lightnessWarning = result.warnings.find(w =>
      w.message.includes('extreme lightness') || w.message.includes('near-achromatic')
    );
    expect(lightnessWarning).toBeDefined();
  });
});
