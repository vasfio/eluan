import { converter, formatHex } from 'culori';
import type { AccentClassification, ValidatedAccent, Oklch } from '../types.js';

const toOklch = converter('oklch');

const HEX3 = /^#[0-9a-fA-F]{3}$/;
const HEX6 = /^#[0-9a-fA-F]{6}$/;
const HEX8 = /^#[0-9a-fA-F]{8}$/;

export type ValidationWarning = {
  value: string;
  message: string;
};

export type ValidationResult = {
  accents: ValidatedAccent[];
  warnings: ValidationWarning[];
};

function expandHex3(hex: string): string {
  const r = hex[1], g = hex[2], b = hex[3];
  return `#${r}${r}${g}${g}${b}${b}`;
}

function stripAlpha(hex: string): string {
  return hex.slice(0, 7);
}

export function classifyAccent(oklch: Oklch): AccentClassification {
  if (oklch.c < 0.03) return 'low-chroma';
  if (oklch.l > 0.93 || oklch.l < 0.15) return 'extreme-lightness';
  return 'normal';
}

export function normalizeHex(input: string): { hex: string; warning?: string } {
  const trimmed = input.trim();

  if (HEX3.test(trimmed)) {
    return { hex: expandHex3(trimmed).toLowerCase() };
  }

  if (HEX6.test(trimmed)) {
    return { hex: trimmed.toLowerCase() };
  }

  if (HEX8.test(trimmed)) {
    return {
      hex: stripAlpha(trimmed).toLowerCase(),
      warning: `Alpha channel stripped from "${trimmed}" — only RGB channels used.`,
    };
  }

  throw new Error(
    `Invalid hex color "${trimmed}". Expected #RGB, #RRGGBB, or #RRGGBBAA format.`
  );
}

export function detectNearDuplicates(
  accents: ValidatedAccent[]
): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];
  for (let i = 0; i < accents.length; i++) {
    for (let j = i + 1; j < accents.length; j++) {
      const hDiff = Math.abs(accents[i].oklch.h - accents[j].oklch.h);
      const normalizedDiff = Math.min(hDiff, 360 - hDiff);
      if (normalizedDiff < 10) {
        warnings.push({
          value: `${accents[i].hex}, ${accents[j].hex}`,
          message: `Accents ${accents[i].hex} and ${accents[j].hex} have similar hues (ΔH = ${normalizedDiff.toFixed(1)}°). Consider using more distinct hues.`,
        });
      }
    }
  }
  return warnings;
}

export function validateAccents(inputs: string[]): ValidationResult {
  if (inputs.length === 0) {
    throw new Error('At least one accent color is required.');
  }
  if (inputs.length > 3) {
    throw new Error('At most 3 accent colors are supported.');
  }

  const warnings: ValidationWarning[] = [];
  const accents: ValidatedAccent[] = [];

  for (const input of inputs) {
    const { hex, warning } = normalizeHex(input);
    if (warning) {
      warnings.push({ value: input, message: warning });
    }

    const parsed = toOklch(hex);
    if (!parsed) {
      throw new Error(`Failed to parse color "${hex}" to OKLCH.`);
    }

    const oklch: Oklch = {
      mode: 'oklch',
      l: parsed.l,
      c: parsed.c,
      h: parsed.h ?? 0,
    };

    const classification = classifyAccent(oklch);
    if (classification === 'low-chroma') {
      warnings.push({
        value: hex,
        message: `"${hex}" is near-achromatic (chroma ${oklch.c.toFixed(4)}). Scale will have minimal color. System hues will use a fixed fallback hue.`,
      });
    }
    if (classification === 'extreme-lightness') {
      warnings.push({
        value: hex,
        message: `"${hex}" has extreme lightness (L=${oklch.l.toFixed(3)}). Only hue and chroma will be used; lightness follows the standard curve.`,
      });
    }

    accents.push({ hex, oklch, classification });
  }

  warnings.push(...detectNearDuplicates(accents));

  return { accents, warnings };
}
