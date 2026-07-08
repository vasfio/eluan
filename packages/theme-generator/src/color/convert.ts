import { converter, formatHex, clampChroma } from 'culori';
import type { Oklch } from '../types.js';

const toOklch = converter('oklch');

export function hexToOklch(hex: string): Oklch {
  const parsed = toOklch(hex);
  if (!parsed) {
    throw new Error(`Failed to convert "${hex}" to OKLCH.`);
  }
  return {
    mode: 'oklch',
    l: parsed.l,
    c: parsed.c,
    h: parsed.h ?? 0,
  };
}

export function oklchToHex(color: Oklch): string {
  const mapped = gamutMap(color);
  const hex = formatHex({ mode: 'oklch', l: mapped.l, c: mapped.c, h: mapped.h });
  return hex;
}

export function gamutMap(color: Oklch): Oklch {
  const clamped = clampChroma({ mode: 'oklch', l: color.l, c: color.c, h: color.h }, 'oklch');
  return {
    mode: 'oklch',
    l: clamped.l,
    c: clamped.c,
    h: clamped.h ?? color.h,
  };
}
