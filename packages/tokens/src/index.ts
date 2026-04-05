// Ragnar Design System - Token Exports
// Three-layer architecture: Primitives → Modes → Themes
// For CSS variable usage, import "@vasf/ragnar-tokens/css"

// ============================================
// Available Modes
// ============================================

export const modes = ["light", "dim", "dark"] as const
export type Mode = (typeof modes)[number]

// ============================================
// Available Themes
// ============================================

export const themes = [
  "classic-retro",
  "classic-black",
  "lime",
  "bold",
  "beige",
  "funky",
] as const
export type Theme = (typeof themes)[number]

// ============================================
// Available Spacing Scales
// ============================================

export const spacingScales = ["compact", "standard", "wide"] as const
export type SpacingScale = (typeof spacingScales)[number]

// ============================================
// Available Curve Scales
// ============================================

export const curveScales = ["sharp", "slight", "sweeping", "rounded"] as const
export type CurveScale = (typeof curveScales)[number]

// ============================================
// Color Palette Names
// ============================================

export const colorPalettes = [
  "blazeorange",
  "bluechill",
  "blueribbon",
  "bostonblue",
  "cerise",
  "crimson",
  "electriclime",
  "electricviolet",
  "forestgreen",
  "gossamer",
  "lochmara",
  "maitai",
  "mono",
  "purpleheart",
  "redviolet",
  "rockspray",
  "seagreen",
  "teak",
  "torchred",
  "violeteggplant",
] as const
export type ColorPalette = (typeof colorPalettes)[number]

// ============================================
// Color Shade Scale
// ============================================

export const colorShades = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const
export type ColorShade = (typeof colorShades)[number]

// Mono has an extra "0" shade for pure white
export const monoShades = ["0", ...colorShades] as const
export type MonoShade = (typeof monoShades)[number]

// ============================================
// Primitive Color Values (Layer 1)
// Hex values for cross-platform usage (native, etc.)
// ============================================

export const primitiveColors = {
  blazeorange: {
    50: "#fff6ed",
    100: "#ffead3",
    200: "#ffd1a7",
    300: "#ffaf69",
    400: "#ff7900",
    500: "#ff5100",
    600: "#fd2900",
    700: "#d11600",
    800: "#a61a00",
    900: "#842007",
    950: "#470d04",
  },
  bluechill: {
    50: "#edfefd",
    100: "#cbfbfa",
    200: "#99f6f5",
    300: "#3decef",
    400: "#00d6e0",
    500: "#00bbc9",
    600: "#0096a9",
    700: "#007888",
    800: "#00606e",
    900: "#00505c",
    950: "#00333d",
  },
  blueribbon: {
    50: "#eff6ff",
    100: "#dbeaff",
    200: "#bedaff",
    300: "#8dc4ff",
    400: "#529fff",
    500: "#317aff",
    600: "#2355ff",
    700: "#213eef",
    800: "#2135bf",
    900: "#1f3593",
    950: "#182258",
  },
  bostonblue: {
    50: "#ecfdff",
    100: "#d2f8ff",
    200: "#a6f0ff",
    300: "#57e4ff",
    400: "#00cdfa",
    500: "#00b4e5",
    600: "#008fc2",
    700: "#00729c",
    800: "#005d7e",
    900: "#0a4d69",
    950: "#043247",
  },
  cerise: {
    50: "#fdf2f6",
    100: "#fce7ef",
    200: "#fbcfe0",
    300: "#fba7c7",
    400: "#f76da2",
    500: "#f14285",
    600: "#df2066",
    700: "#bf1751",
    800: "#9d1945",
    900: "#821d3e",
    950: "#4d0c20",
  },
  crimson: {
    50: "#fdf2f2",
    100: "#fde3e4",
    200: "#fcccce",
    300: "#fca5a9",
    400: "#f96c74",
    500: "#f33f4b",
    600: "#df1d30",
    700: "#bb1727",
    800: "#9a1b26",
    900: "#7f1f27",
    950: "#450c10",
  },
  electriclime: {
    50: "#f9fee2",
    100: "#f1fcbf",
    200: "#e2f87e",
    300: "#ccf100",
    400: "#b3e200",
    500: "#98cb00",
    600: "#79a200",
    700: "#5e7a00",
    800: "#4d6100",
    900: "#425100",
    950: "#222d00",
  },
  electricviolet: {
    50: "#f9f5ff",
    100: "#f2e8fe",
    200: "#e7d5ff",
    300: "#d7b4ff",
    400: "#bd7fff",
    500: "#a750ff",
    600: "#9329f4",
    700: "#7d1ad5",
    800: "#6a1eac",
    900: "#561d88",
    950: "#390b63",
  },
  forestgreen: {
    50: "#eeffec",
    100: "#d6ffd5",
    200: "#adffad",
    300: "#60fd6a",
    400: "#00ed00",
    500: "#00d500",
    600: "#00ae00",
    700: "#008700",
    800: "#006a00",
    900: "#005806",
    950: "#003102",
  },
  gossamer: {
    50: "#effefa",
    100: "#c5fdf1",
    200: "#87fae4",
    300: "#00f0d5",
    400: "#00d9be",
    500: "#00bea8",
    600: "#00998a",
    700: "#007a70",
    800: "#00615b",
    900: "#00504b",
    950: "#00302f",
  },
  lochmara: {
    50: "#f0f9ff",
    100: "#def1ff",
    200: "#b8e5ff",
    300: "#77d2ff",
    400: "#00b8ff",
    500: "#00a0fb",
    600: "#007fdb",
    700: "#0066b4",
    800: "#005693",
    900: "#014877",
    950: "#072d4d",
  },
  maitai: {
    50: "#fefaef",
    100: "#fdf1d4",
    200: "#fbe1a6",
    300: "#f9cd75",
    400: "#f4b24b",
    500: "#ef973f",
    600: "#d57634",
    700: "#ae562c",
    800: "#8c4426",
    900: "#713923",
    950: "#3f1d0f",
  },
  mono: {
    0: "#ffffff",
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a1a1a1",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
  purpleheart: {
    50: "#f0f2ff",
    100: "#e4e7ff",
    200: "#ced2ff",
    300: "#aeb3ff",
    400: "#8b85ff",
    500: "#715aff",
    600: "#6032f9",
    700: "#5225dc",
    800: "#4324b2",
    900: "#3a278b",
    950: "#231854",
  },
  redviolet: {
    50: "#fcf4fe",
    100: "#fae8f6",
    200: "#f7d0ee",
    300: "#f5aae2",
    400: "#f06fcc",
    500: "#e944b7",
    600: "#d62098",
    700: "#b7177b",
    800: "#971965",
    900: "#7c1d55",
    950: "#4d0b32",
  },
  rockspray: {
    50: "#fff6ef",
    100: "#feebda",
    200: "#fdd584",
    300: "#fdb782",
    400: "#f88b4a",
    500: "#f66e31",
    600: "#e65527",
    700: "#bd4122",
    800: "#963621",
    900: "#78301f",
    950: "#40160e",
  },
  seagreen: {
    50: "#eafef4",
    100: "#ccfbe3",
    200: "#9cf6cd",
    300: "#44ecb2",
    400: "#00d88d",
    500: "#00c078",
    600: "#009b62",
    700: "#007c53",
    800: "#006243",
    900: "#00503a",
    950: "#002d22",
  },
  teak: {
    50: "#fcfbf3",
    100: "#f9f7e0",
    200: "#f6ecc2",
    300: "#eedda2",
    400: "#e0c787",
    500: "#ceaf78",
    600: "#ac8b5f",
    700: "#876747",
    800: "#6d503a",
    900: "#5a4231",
    950: "#332319",
  },
  torchred: {
    50: "#fff1f1",
    100: "#ffe0e0",
    200: "#ffc5c5",
    300: "#ff999a",
    400: "#ff4855",
    500: "#ff0000",
    600: "#fd0000",
    700: "#d30000",
    800: "#ad0000",
    900: "#8e0002",
    950: "#4d0000",
  },
  violeteggplant: {
    50: "#fcf4fe",
    100: "#f9e9fd",
    200: "#f3d2fa",
    300: "#eeadf9",
    400: "#e578f5",
    500: "#d84aec",
    600: "#bf2bd0",
    700: "#a024ac",
    800: "#84218b",
    900: "#6d2271",
    950: "#470d4a",
  },
} as const

// ============================================
// Radius Tokens (Layer 1)
// ============================================

export const radius = {
  none: "0rem",
  1: "0.0625rem",
  2: "0.125rem",
  4: "0.25rem",
  8: "0.5rem",
  12: "0.75rem",
  16: "1rem",
  20: "1.25rem",
  24: "1.5rem",
  32: "2rem",
  40: "2.5rem",
  80: "5rem",
  full: "62.4375rem",
} as const

// ============================================
// Sizing Tokens (Layer 1)
// ============================================

export const sizing = {
  none: "0rem",
  xxs: "0.5rem",
  xs: "1rem",
  s: "1.5rem",
  m: "2rem",
  l: "2.5rem",
  xl: "3rem",
  xxl: "5rem",
  xxxl: "10rem",
} as const

// ============================================
// Spacing Tokens (Layer 1)
// ============================================

export const spacing = {
  0: "0rem",
  2: "0.125rem",
  4: "0.25rem",
  8: "0.5rem",
  12: "0.75rem",
  16: "1rem",
  20: "1.25rem",
  24: "1.5rem",
  32: "2rem",
  40: "2.5rem",
  48: "3rem",
  56: "3.5rem",
  64: "4rem",
  72: "4.5rem",
  80: "5rem",
  88: "5.5rem",
  96: "6rem",
  104: "6.5rem",
  112: "7rem",
  120: "7.5rem",
  144: "9rem",
  160: "10rem",
  240: "15rem",
  320: "20rem",
} as const

// ============================================
// Viewport Tokens (Layer 1)
// ============================================

export const viewports = {
  xxs: "20rem",
  xs: "25.875rem",
  s: "30rem",
  m: "46.75rem",
  l: "64rem",
  xl: "80rem",
  "2xl": "90rem",
  "3xl": "120rem",
  "4xl": "161.25rem",
} as const

// ============================================
// Typography Tokens
// ============================================

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
  "6xl": 60,
  "7xl": 72,
  "8xl": 96,
  "9xl": 128,
} as const

export const fontWeights = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
} as const

export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const

export const letterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
} as const

export const fontFamilies = {
  heading: "var(--font-heading)",
  body: "var(--font-body)",
  mono: "var(--font-mono)",
} as const

// ============================================
// Theme → Font Mapping (Google Fonts via @fontsource)
// ============================================

export const themeFonts: Record<
  Theme,
  { heading: string; body: string }
> = {
  "classic-retro": {
    heading: "Geist",
    body: "Geist",
  },
  "classic-black": {
    heading: "Inter",
    body: "Inter",
  },
  "lime": {
    heading: "Manrope",
    body: "Manrope",
  },
  "bold": {
    heading: "Bebas Neue",
    body: "Work Sans",
  },
  "beige": {
    heading: "Instrument Serif",
    body: "Plus Jakarta Sans",
  },
  "funky": {
    heading: "Dela Gothic One",
    body: "Plus Jakarta Sans",
  },
}

// ============================================
// Shadow Tokens
// ============================================

export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  default: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "0 0 #0000",
} as const

// ============================================
// Animation Tokens
// ============================================

export const durations = {
  fastest: 50,
  faster: 100,
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 400,
  slowest: 500,
} as const

export const easings = {
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const

// ============================================
// Z-Index Tokens
// ============================================

export const zIndices = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const

// ============================================
// Breakpoints (maps to viewport tokens)
// ============================================

export const breakpoints = {
  xxs: 320,
  xs: 414,
  s: 480,
  m: 748,
  l: 1024,
  xl: 1280,
  "2xl": 1440,
  "3xl": 1920,
  "4xl": 2580,
} as const

// ============================================
// Types
// ============================================

export type PrimitiveColor = typeof primitiveColors
export type RadiusToken = keyof typeof radius
export type SizingToken = keyof typeof sizing
export type SpacingToken = keyof typeof spacing
export type ViewportToken = keyof typeof viewports
export type FontSizeToken = keyof typeof fontSizes
export type FontWeightToken = keyof typeof fontWeights
export type ShadowToken = keyof typeof shadows
export type BreakpointToken = keyof typeof breakpoints
