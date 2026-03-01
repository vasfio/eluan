// Shader component types and utilities

export interface ShaderUniforms {
  [key: string]: {
    value: number | number[] | Float32Array
    type?: "float" | "vec2" | "vec3" | "vec4" | "mat4"
  }
}

export interface ShaderConfig {
  /** Fragment shader GLSL code */
  fragmentShader: string
  /** Vertex shader GLSL code (optional, uses default) */
  vertexShader?: string
  /** Uniform values */
  uniforms?: ShaderUniforms
}

export interface BaseShaderProps {
  /** Animation speed multiplier */
  speed?: number
  /** Mouse interaction */
  interactive?: boolean
  /** Effect intensity (0-1) */
  intensity?: number
  /** Primary colors */
  colors?: string[]
  /** Whether the shader is paused */
  paused?: boolean
  /** Pixel ratio (default: window.devicePixelRatio) */
  pixelRatio?: number
  /** Quality preset */
  quality?: "low" | "medium" | "high"
  /** Callback when shader is ready */
  onReady?: () => void
  /** Callback on each frame */
  onFrame?: (time: number) => void
}

// GLSL shader presets
export const VERTEX_SHADER_DEFAULT = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`

export const FRAGMENT_SHADER_GRADIENT = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Animated gradient
    float t = uTime * 0.3;
    float noise = sin(uv.x * 3.0 + t) * sin(uv.y * 3.0 + t) * 0.5 + 0.5;

    vec3 color = mix(uColor1, uColor2, uv.x + sin(t) * 0.2);
    color = mix(color, uColor3, uv.y + cos(t) * 0.2);
    color = mix(color, uColor1, noise * uIntensity);

    gl_FragColor = vec4(color, 1.0);
  }
`

export const FRAGMENT_SHADER_AURORA = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec2 vUv;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.2;

    // Multiple layers of noise for aurora effect
    float n1 = snoise(vec2(uv.x * 2.0, uv.y * 0.5 + t));
    float n2 = snoise(vec2(uv.x * 4.0 + t * 0.5, uv.y * 1.0));
    float n3 = snoise(vec2(uv.x * 1.0, uv.y * 2.0 - t * 0.3));

    float aurora = (n1 + n2 * 0.5 + n3 * 0.25) * 0.5 + 0.5;
    aurora = pow(aurora, 2.0) * uIntensity;

    // Vertical fade
    float fade = smoothstep(0.0, 0.6, uv.y) * smoothstep(1.0, 0.4, uv.y);
    aurora *= fade;

    // Color mixing
    vec3 color = mix(uColor1, uColor2, aurora);
    color = mix(color, uColor3, pow(aurora, 2.0));

    // Add glow
    color += uColor2 * aurora * 0.5;

    gl_FragColor = vec4(color, aurora * 0.8 + 0.2);
  }
`

export const FRAGMENT_SHADER_BLOB = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec2 vUv;

  float sdCircle(vec2 p, float r) {
    return length(p) - r;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.5;

    // Morphing blob
    float blob = 0.0;
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      vec2 offset = vec2(
        sin(t + fi * 1.2) * 0.3,
        cos(t + fi * 0.8) * 0.3
      );
      float size = 0.3 + sin(t + fi) * 0.1;
      blob += smoothstep(size, size - 0.1, length(uv - offset));
    }

    blob = clamp(blob, 0.0, 1.0) * uIntensity;

    // Color gradient
    vec3 color = mix(uColor1, uColor2, blob);
    color = mix(color, uColor3, pow(blob, 2.0));

    gl_FragColor = vec4(color, blob);
  }
`

export const FRAGMENT_SHADER_NOISE = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uIntensity;
  uniform vec3 uColor1;

  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    // Animated noise
    float noise = random(uv + uTime * 0.1);
    noise = mix(0.5, noise, uIntensity);

    vec3 color = uColor1 * noise;

    gl_FragColor = vec4(color, uIntensity * 0.5);
  }
`

export const FRAGMENT_SHADER_WAVE = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.5;

    // Wave distortion
    float wave1 = sin(uv.x * 10.0 + t) * 0.1;
    float wave2 = sin(uv.x * 5.0 - t * 0.5) * 0.15;
    float wave3 = cos(uv.x * 15.0 + t * 0.7) * 0.05;

    float y = uv.y + (wave1 + wave2 + wave3) * uIntensity;

    // Gradient with waves
    vec3 color = mix(uColor1, uColor2, smoothstep(0.3, 0.7, y));

    gl_FragColor = vec4(color, 1.0);
  }
`

export const FRAGMENT_SHADER_MESH_GRADIENT = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;

  varying vec2 vUv;

  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.15;

    // Animated mesh gradient using noise
    float n1 = snoise(uv * 2.0 + t) * 0.5 + 0.5;
    float n2 = snoise(uv * 3.0 - t * 0.5) * 0.5 + 0.5;
    float n3 = snoise(uv * 1.5 + vec2(t, -t)) * 0.5 + 0.5;

    // Four-corner gradient with noise displacement
    vec3 tl = uColor1;
    vec3 tr = uColor2;
    vec3 bl = uColor3;
    vec3 br = uColor4;

    vec2 nuv = uv + vec2(n1 - 0.5, n2 - 0.5) * 0.2 * uIntensity;
    nuv = clamp(nuv, 0.0, 1.0);

    vec3 top = mix(tl, tr, nuv.x);
    vec3 bottom = mix(bl, br, nuv.x);
    vec3 color = mix(bottom, top, nuv.y);

    // Add subtle glow
    color += (uColor1 + uColor2) * 0.1 * n3 * uIntensity;

    gl_FragColor = vec4(color, 1.0);
  }
`

export const FRAGMENT_SHADER_PARTICLES = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.2;

    vec3 color = vec3(0.0);

    // Multiple particle layers
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      vec2 grid = uv * (20.0 + fi * 10.0);
      vec2 id = floor(grid);
      vec2 gv = fract(grid) - 0.5;

      float n = random(id + fi);
      float size = n * 0.3 + 0.1;

      // Animated position
      vec2 offset = vec2(
        sin(t + n * 6.28) * 0.2,
        cos(t * 0.7 + n * 6.28) * 0.3 - t * 0.5
      );
      offset.y = mod(offset.y, 1.0) - 0.5;

      float d = length(gv - offset);
      float particle = smoothstep(size, size - 0.05, d);

      vec3 pColor = mix(uColor1, uColor2, n);
      color += pColor * particle * (1.0 - fi * 0.2);
    }

    color *= uIntensity;

    gl_FragColor = vec4(color, length(color) * 0.5);
  }
`

// Utility to convert hex color to vec3
export function hexToVec3(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return [1, 1, 1]
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ]
}

// Shader presets
export type ShaderPreset =
  | "gradient"
  | "aurora"
  | "blob"
  | "noise"
  | "wave"
  | "mesh"
  | "particles"

export const SHADER_PRESETS: Record<ShaderPreset, string> = {
  gradient: FRAGMENT_SHADER_GRADIENT,
  aurora: FRAGMENT_SHADER_AURORA,
  blob: FRAGMENT_SHADER_BLOB,
  noise: FRAGMENT_SHADER_NOISE,
  wave: FRAGMENT_SHADER_WAVE,
  mesh: FRAGMENT_SHADER_MESH_GRADIENT,
  particles: FRAGMENT_SHADER_PARTICLES,
}

// Default colors for presets
export const PRESET_COLORS: Record<ShaderPreset, string[]> = {
  gradient: ["#ff0080", "#7928ca", "#0070f3"],
  aurora: ["#00ff87", "#60efff", "#7b2dff"],
  blob: ["#ff6b6b", "#feca57", "#48dbfb"],
  noise: ["#ffffff"],
  wave: ["#667eea", "#764ba2"],
  mesh: ["#f093fb", "#f5576c", "#4facfe", "#00f2fe"],
  particles: ["#ffffff", "#60efff"],
}
