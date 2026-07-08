export { generateTheme, computeInputHash } from './generate.js';
export { validateAccents, normalizeHex, classifyAccent } from './input/validate.js';
export { hexToOklch, oklchToHex, gamutMap } from './color/convert.js';
export { DEFAULT_CURVE, validateCurve } from './color/curves.js';
export { generateScale } from './color/scale.js';
export { generateSystemScales, DEFAULT_SYSTEM_HUES } from './color/systemHues.js';
export { generateNeutralScale } from './color/neutral.js';
export { buildSemanticMap } from './tokens/semanticMap.js';
export { buildPrimitives } from './tokens/primitives.js';
export { checkContrast, autoCorrect } from './tokens/contrast.js';
export {
  compilePrimitivesJSON,
  compileSemanticJSON,
  compilePrimitivesCSS,
  compileModeCSS,
  compileThemeCSS,
  compileCreateThemeTokens,
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
  SemanticEntry,
  SemanticMap,
  GeneratorConfig,
  AccentClassification,
  ValidatedAccent,
  ContrastCorrection,
  GeneratorResult,
} from './types.js';
