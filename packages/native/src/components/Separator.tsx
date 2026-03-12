import React from "react"
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from "react-native"
import { spacing, fontSizes } from "@vasf/ragnar-tokens"

export interface SeparatorProps {
  /** Orientation of the separator */
  orientation?: "horizontal" | "vertical"
  /** Decorative (no semantic meaning) */
  decorative?: boolean
  /** Container style */
  style?: ViewStyle
}

export function Separator({
  orientation = "horizontal",
  decorative = true,
  style,
}: SeparatorProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"

  const themedStyles = {
    separator: {
      backgroundColor: isDark ? "#27272a" : "#e4e4e7",
    },
  }

  return (
    <View
      style={[
        orientation === "horizontal"
          ? styles.horizontal
          : styles.vertical,
        themedStyles.separator,
        style,
      ]}
      accessibilityRole={decorative ? "none" : undefined}
    />
  )
}

// Separator with text/label in the middle
export interface LabeledSeparatorProps {
  /** Label text */
  label: string
  /** Label position */
  labelPosition?: "left" | "center" | "right"
  /** Label style */
  labelStyle?: TextStyle
  /** Container style */
  style?: ViewStyle
}

export function LabeledSeparator({
  label,
  labelPosition = "center",
  labelStyle,
  style,
}: LabeledSeparatorProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"

  const themedStyles = {
    line: {
      backgroundColor: isDark ? "#27272a" : "#e4e4e7",
    },
    label: {
      color: isDark ? "#71717a" : "#a1a1aa",
      backgroundColor: isDark ? "#09090b" : "#ffffff",
    },
  }

  return (
    <View style={[styles.labeledContainer, style]}>
      {labelPosition !== "left" && (
        <View style={[styles.line, themedStyles.line, styles.lineFlex]} />
      )}
      <Text
        style={[
          styles.label,
          themedStyles.label,
          labelPosition === "left" && styles.labelLeft,
          labelPosition === "right" && styles.labelRight,
          labelStyle,
        ]}
      >
        {label}
      </Text>
      {labelPosition !== "right" && (
        <View style={[styles.line, themedStyles.line, styles.lineFlex]} />
      )}
    </View>
  )
}

// Divider component (alias with more semantic meaning for lists)
export interface DividerProps extends SeparatorProps {
  /** Inset from left side */
  inset?: boolean | number
  /** Inset from right side */
  insetRight?: boolean | number
}

export function Divider({
  inset,
  insetRight,
  style,
  ...props
}: DividerProps) {
  const getInsetValue = (value: boolean | number | undefined) => {
    if (value === true) return spacing[4]
    if (typeof value === "number") return value
    return 0
  }

  const marginLeft = getInsetValue(inset)
  const marginRight = getInsetValue(insetRight)

  return (
    <Separator
      {...props}
      style={{ marginLeft, marginRight, ...(style as object) }}
    />
  )
}

// Spacer component for flexible spacing
export interface SpacerProps {
  /** Size of the spacer */
  size?: number | "xs" | "sm" | "md" | "lg" | "xl"
  /** Direction (for flex layouts) */
  flex?: boolean
  /** Container style */
  style?: ViewStyle
}

export function Spacer({
  size = "md",
  flex = false,
  style,
}: SpacerProps) {
  const sizeMap = {
    xs: spacing[1],
    sm: spacing[2],
    md: spacing[4],
    lg: spacing[6],
    xl: spacing[8],
  }

  const numericSize = typeof size === "number" ? size : sizeMap[size]

  if (flex) {
    return <View style={[{ flex: 1 }, style]} />
  }

  return (
    <View
      style={[
        { width: numericSize, height: numericSize },
        style,
      ]}
    />
  )
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: "100%",
  },
  vertical: {
    width: 1,
    height: "100%",
  },
  labeledContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  line: {
    height: 1,
  },
  lineFlex: {
    flex: 1,
  },
  label: {
    fontSize: fontSizes.sm,
    paddingHorizontal: spacing[3],
  },
  labelLeft: {
    paddingLeft: 0,
    paddingRight: spacing[3],
  },
  labelRight: {
    paddingLeft: spacing[3],
    paddingRight: 0,
  },
})
