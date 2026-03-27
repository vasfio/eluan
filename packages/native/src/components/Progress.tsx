import React, { useEffect, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  useColorScheme,
  Animated,
} from "react-native"
import { spacing, fontSizes } from "@vasf/ragnar-tokens"

export interface ProgressProps {
  /** Progress value (0-100) */
  value?: number
  /** Maximum value */
  max?: number
  /** Show percentage text */
  showValue?: boolean
  /** Custom format for value display */
  formatValue?: (value: number, max: number) => string
  /** Size variant */
  size?: "sm" | "default" | "lg"
  /** Color variant */
  variant?: "default" | "success" | "warning" | "destructive"
  /** Animate value changes */
  animated?: boolean
  /** Container style */
  style?: ViewStyle
  /** Label text */
  label?: string
  /** Label style */
  labelStyle?: TextStyle
}

export function Progress({
  value = 0,
  max = 100,
  showValue = false,
  formatValue,
  size = "default",
  variant = "default",
  animated = true,
  style,
  label,
  labelStyle,
}: ProgressProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"
  const animatedWidth = useRef(new Animated.Value(0)).current

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  useEffect(() => {
    if (animated) {
      Animated.spring(animatedWidth, {
        toValue: percentage,
        useNativeDriver: false,
        tension: 40,
        friction: 8,
      }).start()
    } else {
      animatedWidth.setValue(percentage)
    }
  }, [percentage, animated, animatedWidth])

  const sizeStyles = {
    sm: { height: 4, borderRadius: 2 },
    default: { height: 8, borderRadius: 4 },
    lg: { height: 12, borderRadius: 6 },
  }

  const variantColors = {
    default: isDark ? "#fafafa" : "#18181b",
    success: "#22c55e",
    warning: "#f59e0b",
    destructive: "#ef4444",
  }

  const currentSize = sizeStyles[size]

  const themedStyles = {
    track: {
      backgroundColor: isDark ? "#27272a" : "#e4e4e7",
    },
    fill: {
      backgroundColor: variantColors[variant],
    },
    label: {
      color: isDark ? "#fafafa" : "#18181b",
    },
    value: {
      color: isDark ? "#a1a1aa" : "#71717a",
    },
  }

  const displayValue = formatValue
    ? formatValue(value, max)
    : `${Math.round(percentage)}%`

  const widthInterpolate = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  })

  return (
    <View style={[styles.container, style]}>
      {(label || showValue) && (
        <View style={styles.header}>
          {label && (
            <Text style={[styles.label, themedStyles.label, labelStyle]}>
              {label}
            </Text>
          )}
          {showValue && (
            <Text style={[styles.value, themedStyles.value]}>
              {displayValue}
            </Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.track,
          themedStyles.track,
          { height: currentSize.height, borderRadius: currentSize.borderRadius },
        ]}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max, now: value }}
      >
        <Animated.View
          style={[
            styles.fill,
            themedStyles.fill,
            {
              width: widthInterpolate,
              height: currentSize.height,
              borderRadius: currentSize.borderRadius,
            },
          ]}
        />
      </View>
    </View>
  )
}

// Circular progress indicator
export interface CircularProgressProps {
  /** Progress value (0-100) */
  value?: number
  /** Size of the circle */
  size?: number
  /** Stroke width */
  strokeWidth?: number
  /** Show percentage text in center */
  showValue?: boolean
  /** Color variant */
  variant?: "default" | "success" | "warning" | "destructive"
  /** Container style */
  style?: ViewStyle
  /** Children to render in center */
  children?: React.ReactNode
}

export function CircularProgress({
  value = 0,
  size = 64,
  strokeWidth = 4,
  showValue = true,
  variant = "default",
  style,
  children,
}: CircularProgressProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"

  const percentage = Math.min(Math.max(value, 0), 100)

  const variantColors = {
    default: isDark ? "#fafafa" : "#18181b",
    success: "#22c55e",
    warning: "#f59e0b",
    destructive: "#ef4444",
  }

  const themedStyles = {
    track: isDark ? "#27272a" : "#e4e4e7",
    fill: variantColors[variant],
    text: {
      color: isDark ? "#fafafa" : "#18181b",
    },
  }

  // Since React Native doesn't have SVG by default, we'll create a simplified version
  // For full circular progress, you'd use react-native-svg
  // This is a simplified circular indicator using rotation

  return (
    <View
      style={[
        styles.circular,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: themedStyles.track,
        },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: value }}
    >
      {/* Simplified progress arc using a rotated view */}
      <View
        style={[
          styles.circularFill,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: themedStyles.fill,
            borderTopColor: "transparent",
            borderRightColor: percentage > 25 ? themedStyles.fill : "transparent",
            borderBottomColor: percentage > 50 ? themedStyles.fill : "transparent",
            borderLeftColor: percentage > 75 ? themedStyles.fill : "transparent",
            transform: [{ rotate: `${(percentage / 100) * 360 - 90}deg` }],
          },
        ]}
      />
      <View style={styles.circularContent}>
        {children || (showValue && (
          <Text style={[styles.circularText, themedStyles.text]}>
            {Math.round(percentage)}%
          </Text>
        ))}
      </View>
    </View>
  )
}

// Indeterminate loading bar
export interface IndeterminateProgressProps {
  /** Size variant */
  size?: "sm" | "default" | "lg"
  /** Color variant */
  variant?: "default" | "success" | "warning" | "destructive"
  /** Container style */
  style?: ViewStyle
}

export function IndeterminateProgress({
  size = "default",
  variant = "default",
  style,
}: IndeterminateProgressProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"
  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    )
    loop.start()
    return () => loop.stop()
  }, [animation])

  const sizeStyles = {
    sm: { height: 4, borderRadius: 2 },
    default: { height: 8, borderRadius: 4 },
    lg: { height: 12, borderRadius: 6 },
  }

  const variantColors = {
    default: isDark ? "#fafafa" : "#18181b",
    success: "#22c55e",
    warning: "#f59e0b",
    destructive: "#ef4444",
  }

  const currentSize = sizeStyles[size]

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 300],
  })

  return (
    <View
      style={[
        styles.track,
        {
          backgroundColor: isDark ? "#27272a" : "#e4e4e7",
          height: currentSize.height,
          borderRadius: currentSize.borderRadius,
          overflow: "hidden",
        },
        style,
      ]}
      accessibilityRole="progressbar"
    >
      <Animated.View
        style={[
          styles.indeterminateFill,
          {
            backgroundColor: variantColors[variant],
            height: currentSize.height,
            borderRadius: currentSize.borderRadius,
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
  },
  value: {
    fontSize: fontSizes.sm,
  },
  track: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  circular: {
    alignItems: "center",
    justifyContent: "center",
  },
  circularFill: {
    position: "absolute",
  },
  circularContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  circularText: {
    fontSize: fontSizes.sm,
    fontWeight: "600",
  },
  indeterminateFill: {
    width: "30%",
  },
})
