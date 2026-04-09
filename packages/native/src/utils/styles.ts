import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { primitiveColors, radius, spacing, fontSizes, fontWeights } from "@vasf/ragnar-tokens"

// Alias tokens to the names expected by createThemedStyles
const colors = primitiveColors
const darkColors = primitiveColors
const radii = radius

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export type ColorScheme = "light" | "dark"

// ============================================
// Semantic Spacing Tokens
// Maps to --spacing-* CSS variables (standard mode)
// ============================================

export const sp = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 40,
  "4xl": 80,
} as const

export type SemanticSpacing = typeof sp

// ============================================
// Semantic Size Tokens
// Maps to --size-* CSS variables (standard mode)
// Used for component heights/widths (buttons, inputs, avatars, etc.)
// ============================================

export const sz = {
  xxs: 16,
  xs: 20,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
  "2xl": 64,
  "3xl": 96,
  "4xl": 160,
} as const

export type SemanticSizes = typeof sz

// ============================================
// Semantic Font Size Tokens
// Maps to --font-size-* CSS variables (standard mode)
// ============================================

export const fs = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
} as const

export type SemanticFontSizes = typeof fs

// ============================================
// Semantic Curves Tokens
// Maps to --curves-* CSS variables (sweeping mode)
// ============================================

export const curves = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 40,
} as const

export type SemanticCurves = typeof curves

// ============================================
// Semantic Color Tokens
// Maps to theme CSS variables (container-*, interactive-*, etc.)
// Uses primitiveColors.mono palette for consistent token usage
// ============================================

export function getSemanticColors(scheme: ColorScheme) {
  const isDark = scheme === "dark"

  return {
    container: {
      bg: isDark ? primitiveColors.mono[950] : primitiveColors.mono[0],
      bgAlt: isDark ? primitiveColors.mono[800] : primitiveColors.mono[100],
      fg: isDark ? primitiveColors.mono[50] : primitiveColors.mono[900],
      fgAlt: isDark ? primitiveColors.mono[400] : primitiveColors.mono[500],
      border: isDark ? primitiveColors.mono[700] : primitiveColors.mono[200],
      borderAlt: isDark ? primitiveColors.mono[800] : primitiveColors.mono[200],
    },
    interactive: {
      bg: isDark ? primitiveColors.mono[950] : primitiveColors.mono[0],
      bgHover: isDark ? primitiveColors.mono[800] : primitiveColors.mono[100],
      fg: isDark ? primitiveColors.mono[50] : primitiveColors.mono[900],
      fgAlt: isDark ? primitiveColors.mono[400] : primitiveColors.mono[400],
      border: isDark ? primitiveColors.mono[50] : primitiveColors.mono[900],
      borderAlt: isDark ? primitiveColors.mono[800] : primitiveColors.mono[200],
    },
    actionPrimary: {
      bg: isDark ? primitiveColors.mono[50] : primitiveColors.mono[900],
      fg: isDark ? primitiveColors.mono[900] : primitiveColors.mono[50],
    },
    actionSecondary: {
      bg: isDark ? primitiveColors.mono[800] : primitiveColors.mono[100],
      fg: isDark ? primitiveColors.mono[50] : primitiveColors.mono[900],
      border: isDark ? primitiveColors.mono[800] : primitiveColors.mono[200],
    },
    destructive: {
      bg: "#ef4444",
      bgSubtle: isDark ? "#7f1d1d" : "#fee2e2",
      fg: "#fafafa",
      fgStrong: isDark ? "#fca5a5" : "#991b1b",
      border: isDark ? "#991b1b" : "#fca5a5",
    },
    positive: {
      bg: "#22c55e",
      bgSubtle: isDark ? "#14532d" : "#dcfce7",
      fg: "#fafafa",
      fgStrong: isDark ? "#86efac" : "#166534",
      border: isDark ? "#166534" : "#86efac",
    },
    cautionary: {
      bg: "#f59e0b",
      bgSubtle: isDark ? "#78350f" : "#fef3c7",
      fg: isDark ? "#fafafa" : "#18181b",
      fgStrong: isDark ? "#fcd34d" : "#92400e",
      border: isDark ? "#92400e" : "#fcd34d",
    },
    informative: {
      bg: "#3b82f6",
      bgSubtle: isDark ? "#1e3a5f" : "#dbeafe",
      fg: "#ffffff",
      fgStrong: isDark ? "#93c5fd" : "#1e40af",
      border: isDark ? "#1e40af" : "#93c5fd",
    },
  }
}

export type SemanticColors = ReturnType<typeof getSemanticColors>

// ============================================
// useSemanticTokens hook helper
// Convenience for component usage
// ============================================

/**
 * Get all semantic tokens for a given color scheme.
 * Use in components with `useColorScheme()`.
 *
 * @example
 * const colorScheme = useColorScheme() ?? "light"
 * const { colors, sp, curves } = getSemanticTokens(colorScheme)
 *
 * <View style={{ backgroundColor: colors.container.bg, padding: sp.md, borderRadius: curves.lg }}>
 */
export function getSemanticTokens(scheme: ColorScheme) {
  return {
    colors: getSemanticColors(scheme),
    sp,
    sz,
    fs,
    curves,
  }
}

// ============================================
// createThemedStyles (legacy helper)
// ============================================

/**
 * Creates themed styles using Ragnar design tokens
 *
 * @example
 * const styles = createThemedStyles((tokens, scheme) => ({
 *   container: {
 *     backgroundColor: tokens.colors.background,
 *     padding: tokens.spacing[4],
 *     borderRadius: tokens.radii.lg,
 *   },
 *   text: {
 *     color: tokens.colors.foreground,
 *     fontSize: tokens.fontSizes.base,
 *   },
 * }))
 *
 * // In component:
 * const colorScheme = useColorScheme()
 * <View style={styles(colorScheme).container}>
 */
export function createThemedStyles<T extends NamedStyles<T>>(
  styleCreator: (
    tokens: {
      colors: typeof colors | typeof darkColors
      spacing: typeof spacing
      radii: typeof radii
      fontSizes: typeof fontSizes
      fontWeights: typeof fontWeights
    },
    scheme: ColorScheme
  ) => T
) {
  // Cache styles for each color scheme
  const lightStyles = StyleSheet.create(
    styleCreator(
      { colors, spacing, radii, fontSizes, fontWeights },
      "light"
    )
  )

  const darkStyles = StyleSheet.create(
    styleCreator(
      { colors: darkColors, spacing, radii, fontSizes, fontWeights },
      "dark"
    )
  )

  return (scheme: ColorScheme = "light") => {
    return scheme === "dark" ? darkStyles : lightStyles
  }
}

/**
 * Helper to convert HSL string to RGB for React Native
 * Since RN doesn't support HSL, we need to convert
 */
export function hslToRgb(hsl: string): string {
  const [h, s, l] = hsl.split(" ").map((v) => parseFloat(v.replace("%", "")))

  const sNorm = s / 100
  const lNorm = l / 100

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lNorm - c / 2

  let r = 0, g = 0, b = 0

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x
  }

  const rFinal = Math.round((r + m) * 255)
  const gFinal = Math.round((g + m) * 255)
  const bFinal = Math.round((b + m) * 255)

  return `rgb(${rFinal}, ${gFinal}, ${bFinal})`
}
