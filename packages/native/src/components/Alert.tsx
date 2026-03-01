import React from "react"
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  useColorScheme,
  Pressable,
} from "react-native"
import { spacing, radii, fontSizes } from "@ragnar/tokens"

export interface AlertProps {
  /** Alert title */
  title?: string
  /** Alert description/message */
  children: React.ReactNode
  /** Alert variant */
  variant?: "default" | "info" | "success" | "warning" | "destructive"
  /** Icon element */
  icon?: React.ReactNode
  /** Show close button */
  closable?: boolean
  /** Called when close button is pressed */
  onClose?: () => void
  /** Action button */
  action?: {
    label: string
    onPress: () => void
  }
  /** Container style */
  style?: ViewStyle
  /** Title style */
  titleStyle?: TextStyle
}

export function Alert({
  title,
  children,
  variant = "default",
  icon,
  closable = false,
  onClose,
  action,
  style,
  titleStyle,
}: AlertProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"

  const variantStyles = {
    default: {
      container: {
        backgroundColor: isDark ? "#27272a" : "#f4f4f5",
        borderColor: isDark ? "#3f3f46" : "#e4e4e7",
      },
      icon: isDark ? "#fafafa" : "#18181b",
      title: {
        color: isDark ? "#fafafa" : "#18181b",
      },
      description: {
        color: isDark ? "#a1a1aa" : "#71717a",
      },
    },
    info: {
      container: {
        backgroundColor: isDark ? "#1e3a5f" : "#dbeafe",
        borderColor: isDark ? "#1e40af" : "#93c5fd",
      },
      icon: "#3b82f6",
      title: {
        color: isDark ? "#93c5fd" : "#1e40af",
      },
      description: {
        color: isDark ? "#bfdbfe" : "#1e3a8a",
      },
    },
    success: {
      container: {
        backgroundColor: isDark ? "#14532d" : "#dcfce7",
        borderColor: isDark ? "#166534" : "#86efac",
      },
      icon: "#22c55e",
      title: {
        color: isDark ? "#86efac" : "#166534",
      },
      description: {
        color: isDark ? "#bbf7d0" : "#14532d",
      },
    },
    warning: {
      container: {
        backgroundColor: isDark ? "#78350f" : "#fef3c7",
        borderColor: isDark ? "#92400e" : "#fcd34d",
      },
      icon: "#f59e0b",
      title: {
        color: isDark ? "#fcd34d" : "#92400e",
      },
      description: {
        color: isDark ? "#fde68a" : "#78350f",
      },
    },
    destructive: {
      container: {
        backgroundColor: isDark ? "#7f1d1d" : "#fee2e2",
        borderColor: isDark ? "#991b1b" : "#fca5a5",
      },
      icon: "#ef4444",
      title: {
        color: isDark ? "#fca5a5" : "#991b1b",
      },
      description: {
        color: isDark ? "#fecaca" : "#7f1d1d",
      },
    },
  }

  const currentVariant = variantStyles[variant]

  const defaultIcons: Record<string, string> = {
    default: "ℹ",
    info: "ℹ",
    success: "✓",
    warning: "⚠",
    destructive: "✕",
  }

  return (
    <View
      style={[
        styles.container,
        currentVariant.container,
        style,
      ]}
      accessibilityRole="alert"
    >
      <View style={styles.content}>
        {(icon !== null) && (
          <View style={styles.iconContainer}>
            {icon || (
              <Text style={[styles.defaultIcon, { color: currentVariant.icon }]}>
                {defaultIcons[variant]}
              </Text>
            )}
          </View>
        )}
        <View style={styles.textContainer}>
          {title && (
            <Text style={[styles.title, currentVariant.title, titleStyle]}>
              {title}
            </Text>
          )}
          {typeof children === "string" ? (
            <Text style={[styles.description, currentVariant.description]}>
              {children}
            </Text>
          ) : (
            children
          )}
          {action && (
            <Pressable onPress={action.onPress} style={styles.action}>
              <Text style={[styles.actionText, currentVariant.title]}>
                {action.label}
              </Text>
            </Pressable>
          )}
        </View>
        {closable && (
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={[styles.closeIcon, { color: currentVariant.icon }]}>
              ×
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}

// Inline alert for form validation, etc.
export interface InlineAlertProps {
  /** Alert message */
  children: React.ReactNode
  /** Alert variant */
  variant?: "info" | "success" | "warning" | "error"
  /** Container style */
  style?: ViewStyle
}

export function InlineAlert({
  children,
  variant = "info",
  style,
}: InlineAlertProps) {
  const variantColors = {
    info: "#3b82f6",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
  }

  const variantIcons = {
    info: "ℹ",
    success: "✓",
    warning: "⚠",
    error: "✕",
  }

  const color = variantColors[variant]

  return (
    <View style={[styles.inline, style]}>
      <Text style={[styles.inlineIcon, { color }]}>
        {variantIcons[variant]}
      </Text>
      {typeof children === "string" ? (
        <Text style={[styles.inlineText, { color }]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  )
}

// Banner alert (full width, for page-level notifications)
export interface AlertBannerProps {
  /** Banner message */
  children: React.ReactNode
  /** Banner variant */
  variant?: "info" | "success" | "warning" | "destructive"
  /** Icon element */
  icon?: React.ReactNode
  /** Show close button */
  closable?: boolean
  /** Called when close button is pressed */
  onClose?: () => void
  /** Action button */
  action?: {
    label: string
    onPress: () => void
  }
  /** Container style */
  style?: ViewStyle
}

export function AlertBanner({
  children,
  variant = "info",
  icon,
  closable = false,
  onClose,
  action,
  style,
}: AlertBannerProps) {
  const variantStyles = {
    info: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
    },
    success: {
      backgroundColor: "#22c55e",
      color: "#ffffff",
    },
    warning: {
      backgroundColor: "#f59e0b",
      color: "#18181b",
    },
    destructive: {
      backgroundColor: "#ef4444",
      color: "#ffffff",
    },
  }

  const currentVariant = variantStyles[variant]

  return (
    <View
      style={[
        styles.banner,
        { backgroundColor: currentVariant.backgroundColor },
        style,
      ]}
    >
      {icon && <View style={styles.bannerIcon}>{icon}</View>}
      <View style={styles.bannerContent}>
        {typeof children === "string" ? (
          <Text style={[styles.bannerText, { color: currentVariant.color }]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
      {action && (
        <Pressable onPress={action.onPress} style={styles.bannerAction}>
          <Text
            style={[
              styles.bannerActionText,
              { color: currentVariant.color },
            ]}
          >
            {action.label}
          </Text>
        </Pressable>
      )}
      {closable && (
        <Pressable onPress={onClose} style={styles.bannerClose}>
          <Text style={[styles.closeIcon, { color: currentVariant.color }]}>
            ×
          </Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing[3],
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    marginRight: spacing[3],
    marginTop: 2,
  },
  defaultIcon: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: fontSizes.sm,
    fontWeight: "600",
    marginBottom: spacing[1],
  },
  description: {
    fontSize: fontSizes.sm,
  },
  action: {
    marginTop: spacing[2],
  },
  actionText: {
    fontSize: fontSizes.sm,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  closeButton: {
    marginLeft: spacing[2],
    padding: spacing[1],
  },
  closeIcon: {
    fontSize: 20,
    lineHeight: 20,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  inlineIcon: {
    fontSize: 12,
    marginRight: spacing[1],
  },
  inlineText: {
    fontSize: fontSizes.sm,
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  bannerIcon: {
    marginRight: spacing[2],
  },
  bannerContent: {
    flex: 1,
  },
  bannerText: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
  },
  bannerAction: {
    marginLeft: spacing[3],
  },
  bannerActionText: {
    fontSize: fontSizes.sm,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  bannerClose: {
    marginLeft: spacing[2],
    padding: spacing[1],
  },
})
