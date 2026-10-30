export { generateTheme, computeInputHash } from './generate.js';
export { validateAccents, normalizeHex, classifyAccent } from './input/validate.js';
export { hexToOklch, oklchToHex, gamutMap } from './color/convert.js';
export { DEFAULT_CURVE, validateCurve } from './color/curves.js';
export { generateScale } from './color/scale.js';
export { buildDarkPrimitives, liftScale, DEFAULT_DARK_LIFT, MAX_DARK_LIFT, DARK_LIFT_WEIGHTS } from './color/darkLift.js';
export {
  buildDimPrimitives,
  desaturateScale,
  warmScale,
  DEFAULT_DIM_CHROMA,
  MIN_DIM_CHROMA,
  DEFAULT_DIM_WARMTH,
  TEAK_HUE_CHROMA,
} from './color/dim.js';
export { generateSystemScales, DEFAULT_SYSTEM_HUES } from './color/systemHues.js';
export { generateNeutralScale } from './color/neutral.js';
export { buildSemanticMap, dimRef, modeRef, withDimRefs } from './tokens/semanticMap.js';
export { buildPrimitives } from './tokens/primitives.js';
export { checkContrast, autoCorrect } from './tokens/contrast.js';
export {
  compilePrimitivesJSON,
  compileSemanticJSON,
  compilePrimitivesCSS,
  compileModeCSS,
  compileThemeCSS,
  compileCreateThemeTokens,
  compileCustomThemeCSS,
} from './compile/css.js';
export { generateSmokeHTML } from './preview/smoke.js';

export type {
  Oklch,
  ScaleStep,
  ScaleEntry,
  Scale,
  ScaleName,
  SystemHueName,
  PrimitiveTokens,
  TokenRef,
  SemanticRole,
  Mode,
  SemanticEntry,
  SemanticMap,
  GeneratorConfig,
  AccentClassification,
  ValidatedAccent,
  ContrastCorrection,
  GeneratorResult,
  GeneratedCustomTheme,
} from './types.js';
