declare module 'culori' {
  interface OklchColor {
    mode: 'oklch';
    l: number;
    c: number;
    h?: number;
  }

  interface RgbColor {
    mode: 'rgb';
    r: number;
    g: number;
    b: number;
  }

  export function converter(mode: 'oklch'): (color: string | object) => OklchColor | undefined;
  export function formatHex(color: object): string;
  export function clampChroma(color: object, mode: string): OklchColor;
  export function wcagContrast(color1: string, color2: string): number;
}
