import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { primitiveColors, radius, spacing, fontSizes, fontWeights } from "@frolda/ragnar-tokens"

// Alias tokens to the names expected by createThemedStyles
const colors = primitiveColors
const darkColors = primitiveColors
const radii = radius

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export type ColorScheme = "light" | "dark"

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
