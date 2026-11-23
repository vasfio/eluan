export type Oklch = { mode: 'oklch'; l: number; c: number; h: number };

export const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export type ScaleStepValue = (typeof SCALE_STEPS)[number];

export type ScaleStep = {
  step: ScaleStepValue;
  lightness: number;
  chromaRatio: number;
  hueShift: number;
};

export type ScaleEntry = { oklch: Oklch; hex: string };
export type Scale = Record<ScaleStepValue, ScaleEntry>;

export type ScaleName =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type SystemHueName = 'error' | 'warning' | 'success' | 'info';

export type PrimitiveTokens = Partial<Record<ScaleName, Scale>>;

export type TokenRef = `${ScaleName}.${ScaleStepValue}` | 'white' | 'black';

export type SemanticRole = 'bg' | 'fg' | 'border' | 'overlay' | 'decorative';

export type Mode = 'light' | 'dim' | 'dark';

export type SemanticEntry = {
  light: TokenRef;
  dark: TokenRef;
  /**
   * Dim-mode ref. When omitted, dim uses the light ref one step deeper on its
   * ramp (950 stays put), so dim reads as light mode toned down.
   */
  dim?: TokenRef;
  /**
   * The ground token(s) this fg/border must clear `minContrast` on. With
   * several, the hardest of them decides, for text that sits on more than one
   * surface (page and panel, say).
   */
  contrastAgainst?: string | string[];
  minContrast?: number;
  /**
   * Honor `minContrast` as-is even when it is below the config-wide minimum.
   * For entries that deliberately target a lower WCAG tier (e.g. the 3:1
   * UI tier for the focus ring) and must not be raised by a stricter
   * `GeneratorConfig.minContrast`.
   */
  allowBelowDefault?: boolean;
  role: SemanticRole;
};

export type SemanticMap = Record<string, SemanticEntry>;

export type GeneratorConfig = {
  accents: string[];
  themeName: string;
  /**
   * Contrast floor for every checked fg/border pairing (4.5 = WCAG AA,
   * 7 = AAA). Per-entry `minContrast` values can raise the floor for a token
   * but never lower it, unless the entry sets `allowBelowDefault`.
   */
  minContrast: number;
  neutralTintRatio: number;
  curve?: ScaleStep[];
  systemHues?: Partial<Record<SystemHueName, number>>;
  /**
   * OKLCH lightness added to the colour ramps dark mode uses, so accents and
   * status colours read as vivid on a dark ground as they do on a light one.
   * Full on the mid steps, tapering to 0 at 50 and 950; neutral is never
   * lifted. 0 turns it off. Default 0.08, maximum 0.2.
   */
  darkLift?: number;
  /**
   * Chroma multiplier for the colour ramps dim mode uses, so accents and
   * status colours sit back on the softer ground. 1 turns it off. Default 0.8,
   * minimum 0.5.
   */
  dimChroma?: number;
  /**
   * How far dim mode's greys move toward the warm teak ramp `minimal`'s dim
   * uses: 1 takes teak's hue and chroma, 0 keeps the brand-tinted greys.
   * Default 1.
   */
  dimWarmth?: number;
};

export type AccentClassification = 'normal' | 'low-chroma' | 'extreme-lightness';

export type ValidatedAccent = {
  hex: string;
  oklch: Oklch;
  classification: AccentClassification;
};

export type ContrastCorrection = {
  token: string;
  mode: Mode;
  originalRef: TokenRef;
  correctedRef: TokenRef;
  originalContrast: number;
  correctedContrast: number;
  kind: 'step-shift' | 'hard-fallback';
};

export type GeneratorResult = {
  primitives: PrimitiveTokens;
  /** The primitives dark mode resolves against: `primitives` with the colour ramps lifted by `darkLift`. */
  primitivesDark: PrimitiveTokens;
  /** The primitives dim mode resolves against: colour ramps toned down by `dimChroma`, neutral warmed by `dimWarmth`. */
  primitivesDim: PrimitiveTokens;
  semanticMap: SemanticMap;
  corrections: ContrastCorrection[];
  css: {
    primitives: string;
    lightMode: string;
    dimMode: string;
    darkMode: string;
    theme: string;
  };
  /** Light-mode token map for `createTheme({ tokens })`. Kept for compatibility; prefer `createThemeOptions`. */
  createThemeTokens: Record<string, string>;
  /** Light, dim and dark token maps for `createTheme({ name, ...createThemeOptions })` from @eluan/core. */
  createThemeOptions: {
    tokens: Record<string, string>;
    modes: { dim: Record<string, string>; dark: Record<string, string> };
  };
  /**
   * A ready custom theme, the same shape `createTheme()` returns: pass it to
   * `<EluanProvider customThemes={[customTheme]} />`. Covers light, dim and dark mode.
   */
  customTheme: GeneratedCustomTheme;
  report: string;
};

/** Structurally identical to @eluan/core's `CustomTheme`. */
export type GeneratedCustomTheme = {
  name: string;
  extends: 'minimal';
  css: string;
};
