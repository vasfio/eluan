// Shader Components for @vasf/ragnar-web
// Supports both OGL (lightweight) and Three.js/R3F (powerful) renderers

// Core OGL Canvas (lightweight, ~25kb)
export { ShaderCanvasOGL } from "./shader-canvas-ogl"
export type { ShaderCanvasOGLProps } from "./shader-canvas-ogl"

// R3F Canvas (powerful, requires three.js)
export { ShaderCanvasR3F } from "./shader-canvas-r3f"
export type { ShaderCanvasR3FProps } from "./shader-canvas-r3f"

// Preset Components (easy to use)
export {
  ShaderBackground,
  ShaderGradient,
  ShaderAurora,
  ShaderBlob,
  ShaderNoise,
  ShaderWave,
  ShaderMesh,
  ShaderParticles,
  ShaderHero,
  ShaderCard,
} from "./shader-presets"

export type {
  ShaderBackgroundProps,
  ShaderGradientProps,
  ShaderAuroraProps,
  ShaderBlobProps,
  ShaderNoiseProps,
  ShaderWaveProps,
  ShaderMeshProps,
  ShaderParticlesProps,
  ShaderHeroProps,
  ShaderCardProps,
} from "./shader-presets"

// Types and utilities
export {
  // Shader presets
  SHADER_PRESETS,
  PRESET_COLORS,
  // Individual shader code
  VERTEX_SHADER_DEFAULT,
  FRAGMENT_SHADER_GRADIENT,
  FRAGMENT_SHADER_AURORA,
  FRAGMENT_SHADER_BLOB,
  FRAGMENT_SHADER_NOISE,
  FRAGMENT_SHADER_WAVE,
  FRAGMENT_SHADER_MESH_GRADIENT,
  FRAGMENT_SHADER_PARTICLES,
  // Utilities
  hexToVec3,
} from "./types"

export type {
  ShaderPreset,
  ShaderConfig,
  ShaderUniforms,
  BaseShaderProps,
} from "./types"
