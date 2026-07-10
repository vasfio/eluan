import React from "react"
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from "react-native"
import { fontSizes } from "@eluan/tokens"
import { sp, curves, getSemanticColors } from "../utils/styles"

export interface BadgeProps {
  /** Badge content */
  children?: React.ReactNode
  /** Badge variant */
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
  /** Badge size */
  size?: "sm" | "default" | "lg"
  /** Container style */
  style?: ViewStyle
  /** Text style */
  textStyle?: TextStyle
  /** Dot variant (no text, just a dot) */
  dot?: boolean
}

export function Badge({
  children,
  variant = "default",
  size = "default",
  style,
  textStyle,
  dot = false,
}: BadgeProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const variantStyles = {
    default: {
      container: {
        backgroundColor: colors.actionPrimary.bg,
      },
      text: {
        color: colors.actionPrimary.fg,
      },
    },
    secondary: {
      container: {
        backgroundColor: colors.actionSecondary.bg,
      },
      text: {
        color: colors.actionSecondary.fg,
      },
    },
    destructive: {
      container: {
        backgroundColor: colorScheme === "dark" ? colors.destructive.bgSubtle : colors.destructive.bg,
      },
      text: {
        color: colors.destructive.fg,
      },
    },
    outline: {
      container: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.container.borderAlt,
      },
      text: {
        color: colors.container.fg,
      },
    },
    success: {
      container: {
        backgroundColor: colorScheme === "dark" ? colors.positive.bgSubtle : colors.positive.bg,
      },
      text: {
        color: colors.positive.fg,
      },
    },
    warning: {
      container: {
        backgroundColor: colorScheme === "dark" ? colors.cautionary.bgSubtle : colors.cautionary.bg,
      },
      text: {
        color: colors.cautionary.fg,
      },
    },
  }

  const sizeStyles = {
    sm: {
      container: {
        paddingHorizontal: 6,
        paddingVertical: sp.xxs,
        borderRadius: curves.xxs,
      },
      text: {
        fontSize: fontSizes.xs,
      },
      dot: 6,
    },
    default: {
      container: {
        paddingHorizontal: sp.xxs,
        paddingVertical: sp.xxs,
        borderRadius: 9999,
      },
      text: {
        fontSize: fontSizes.xs,
      },
      dot: 8,
    },
    lg: {
      container: {
        paddingHorizontal: sp.xs,
        paddingVertical: sp.xxs,
        borderRadius: 9999,
      },
      text: {
        fontSize: fontSizes.sm,
      },
      dot: 10,
    },
  }

  const currentVariant = variantStyles[variant]
  const currentSize = sizeStyles[size]

  if (dot) {
    return (
      <View
        style={[
          styles.dot,
          currentVariant.container,
          {
            width: currentSize.dot,
            height: currentSize.dot,
            borderRadius: currentSize.dot / 2,
          },
          style,
        ]}
      />
    )
  }

  return (
    <View
      style={[
        styles.container,
        currentVariant.container,
        currentSize.container,
        style,
      ]}
    >
      {typeof children === "string" ? (
        <Text
          style={[
            styles.text,
            currentVariant.text,
            currentSize.text,
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  )
}

// Notification badge (positioned on corner of parent)
export interface NotificationBadgeProps {
  /** Count to display */
  count?: number
  /** Maximum count to display */
  max?: number
  /** Show dot instead of count */
  dot?: boolean
  /** Hide when count is 0 */
  hideZero?: boolean
  /** Badge color */
  color?: "default" | "destructive" | "success"
  /** Children to wrap */
  children: React.ReactNode
  /** Container style */
  style?: ViewStyle
}

export function NotificationBadge({
  count = 0,
  max = 99,
  dot = false,
  hideZero = true,
  color = "destructive",
  children,
  style,
}: NotificationBadgeProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const colorStyles = {
    default: colors.actionPrimary.bg,
    destructive: colors.destructive.bg,
    success: colors.positive.bg,
  }

  const shouldShow = dot || (hideZero ? count > 0 : true)
  const displayCount = count > max ? `${max}+` : count.toString()

  return (
    <View style={[styles.wrapper, style]}>
      {children}
      {shouldShow && (
        <View
          style={[
            styles.notification,
            { backgroundColor: colorStyles[color] },
            dot && styles.notificationDot,
          ]}
        >
          {!dot && (
            <Text style={styles.notificationText}>{displayCount}</Text>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
  },
  dot: {
    // Just a dot
  },
  wrapper: {
    position: "relative",
  },
  notification: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: sp.xs,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  notificationDot: {
    minWidth: 10,
    height: 10,
    borderRadius: 5,
    paddingHorizontal: 0,
  },
  notificationText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
})
