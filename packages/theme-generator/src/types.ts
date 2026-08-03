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

export type SemanticEntry = {
  light: TokenRef;
  dark: TokenRef;
  contrastAgainst?: string;
  minContrast?: number;
  /**
   * Honor `minContrast` as-is even when it is below the config-wide minimum.
   * For entries that deliberately target a lower WCAG tier (e.g. the 3:1
   * large-text/UI tier for secondary text) and must not be raised by a
   * stricter `GeneratorConfig.minContrast`.
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
};

export type AccentClassification = 'normal' | 'low-chroma' | 'extreme-lightness';

export type ValidatedAccent = {
  hex: string;
  oklch: Oklch;
  classification: AccentClassification;
};

export type ContrastCorrection = {
  token: string;
  mode: 'light' | 'dark';
  originalRef: TokenRef;
  correctedRef: TokenRef;
  originalContrast: number;
  correctedContrast: number;
  kind: 'step-shift' | 'hard-fallback';
};

export type GeneratorResult = {
  primitives: PrimitiveTokens;
  semanticMap: SemanticMap;
  corrections: ContrastCorrection[];
  css: {
    primitives: string;
    lightMode: string;
    darkMode: string;
    theme: string;
  };
  createThemeTokens: Record<string, string>;
  report: string;
};
