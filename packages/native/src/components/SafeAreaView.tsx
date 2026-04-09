import React from "react"
import {
  View,
  StyleSheet,
  ViewProps,
  ViewStyle,
  Platform,
  StatusBar,
  useColorScheme,
} from "react-native"
import { getSemanticColors } from "../utils/styles"
// Note: For production, consider using react-native-safe-area-context
// This is a simplified implementation that works for basic cases

export interface SafeAreaViewProps extends ViewProps {
  /**
   * Content to render
   */
  children: React.ReactNode
  /**
   * Which edges to apply safe area insets
   * @default ["top", "bottom", "left", "right"]
   */
  edges?: ("top" | "bottom" | "left" | "right")[]
  /**
   * Background color (defaults to theme background)
   */
  backgroundColor?: string
  /**
   * Style for the container
   */
  style?: ViewStyle
  /**
   * Mode for the safe area
   * - "padding": applies safe area as padding
   * - "margin": applies safe area as margin
   * @default "padding"
   */
  mode?: "padding" | "margin"
}

// Approximate safe area insets for common devices
// In production, use react-native-safe-area-context for accurate values
const getApproximateInsets = () => {
  const statusBarHeight = StatusBar.currentHeight ?? (Platform.OS === "ios" ? 44 : 0)
  const bottomInset = Platform.OS === "ios" ? 34 : 0 // iPhone X+ home indicator

  return {
    top: statusBarHeight,
    bottom: bottomInset,
    left: 0,
    right: 0,
  }
}

export function SafeAreaView({
  children,
  edges = ["top", "bottom", "left", "right"],
  backgroundColor,
  style,
  mode = "padding",
  ...props
}: SafeAreaViewProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const defaultBackgroundColor = backgroundColor ?? colors.container.bg
  const insets = getApproximateInsets()

  const safeAreaStyle: ViewStyle = {}
  const prefix = mode === "padding" ? "padding" : "margin"

  if (edges.includes("top")) {
    safeAreaStyle[`${prefix}Top`] = insets.top
  }
  if (edges.includes("bottom")) {
    safeAreaStyle[`${prefix}Bottom`] = insets.bottom
  }
  if (edges.includes("left")) {
    safeAreaStyle[`${prefix}Left`] = insets.left
  }
  if (edges.includes("right")) {
    safeAreaStyle[`${prefix}Right`] = insets.right
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: defaultBackgroundColor },
        safeAreaStyle,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  )
}

// ============================================
// SafeAreaProvider (context for nested components)
// ============================================

interface SafeAreaInsets {
  top: number
  bottom: number
  left: number
  right: number
}

const SafeAreaContext = React.createContext<SafeAreaInsets>(getApproximateInsets())

export interface SafeAreaProviderProps {
  children: React.ReactNode
  /**
   * Override insets (useful for testing or custom layouts)
   */
  insets?: Partial<SafeAreaInsets>
}

export function SafeAreaProvider({ children, insets }: SafeAreaProviderProps) {
  const defaultInsets = getApproximateInsets()

  const value: SafeAreaInsets = {
    ...defaultInsets,
    ...insets,
  }

  return (
    <SafeAreaContext.Provider value={value}>
      {children}
    </SafeAreaContext.Provider>
  )
}

/**
 * Hook to access safe area insets
 */
export function useSafeAreaInsets(): SafeAreaInsets {
  return React.useContext(SafeAreaContext)
}

/**
 * Component to render content with safe area awareness
 */
export interface SafeAreaInsetsConsumerProps {
  children: (insets: SafeAreaInsets) => React.ReactNode
}

export function SafeAreaInsetsConsumer({ children }: SafeAreaInsetsConsumerProps) {
  const insets = useSafeAreaInsets()
  return <>{children(insets)}</>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
