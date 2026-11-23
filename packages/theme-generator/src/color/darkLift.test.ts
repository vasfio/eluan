import { describe, it, expect } from 'vitest';
import { buildDarkPrimitives, liftScale, DARK_LIFT_WEIGHTS } from './darkLift.js';
import { generateScale } from './scale.js';
import { DEFAULT_CURVE } from './curves.js';
import { buildPrimitives } from '../tokens/primitives.js';
import { validateAccents } from '../input/validate.js';
import { SCALE_STEPS } from '../types.js';

const scale = generateScale(150, 0.12, DEFAULT_CURVE);

describe('liftScale', () => {
  it('lifts mid steps by the full amount and leaves the ends alone', () => {
    const lifted = liftScale(scale, 0.08);

    expect(lifted[500].oklch.l).toBeCloseTo(scale[500].oklch.l + 0.08, 5);
    expect(lifted[50].oklch.l).toBeCloseTo(scale[50].oklch.l, 5);
    expect(lifted[950].oklch.l).toBeCloseTo(scale[950].oklch.l, 5);
  });

  it('weights each step', () => {
    const lifted = liftScale(scale, 0.1);

    for (const step of [100, 200, 700, 800, 900] as const) {
      expect(lifted[step].oklch.l).toBeCloseTo(scale[step].oklch.l + 0.1 * DARK_LIFT_WEIGHTS[step], 5);
    }
  });

  it('keeps the ramp ordered light to dark', () => {
    const lifted = liftScale(scale, 0.2);

    for (let i = 1; i < SCALE_STEPS.length; i++) {
      expect(lifted[SCALE_STEPS[i]].oklch.l).toBeLessThan(lifted[SCALE_STEPS[i - 1]].oklch.l);
    }
  });
});

describe('buildDarkPrimitives', () => {
  const { accents } = validateAccents(['#2F6F5E']);
  const primitives = buildPrimitives(accents, {
    accents: ['#2F6F5E'],
    themeName: 't',
    minContrast: 4.5,
    neutralTintRatio: 0.04,
  });

  it('returns the light primitives untouched at 0', () => {
    expect(buildDarkPrimitives(primitives, 0)).toBe(primitives);
  });

  it('lifts colour ramps but never neutral', () => {
    const dark = buildDarkPrimitives(primitives, 0.08);

    expect(dark.neutral).toBe(primitives.neutral);
    for (const name of ['primary', 'error', 'warning', 'success', 'info'] as const) {
      expect(dark[name]![500].oklch.l).toBeGreaterThan(primitives[name]![500].oklch.l);
    }
  });
});
