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
import { fontSizes } from "@eluan/tokens"
import { sp, curves, getSemanticColors } from "../utils/styles"

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
  const colors = getSemanticColors(colorScheme)

  const variantStyles = {
    default: {
      container: {
        backgroundColor: colors.actionSecondary.bg,
        borderColor: colors.container.border,
      },
      icon: colors.container.fg,
      title: {
        color: colors.container.fg,
      },
      description: {
        color: colors.container.fgAlt,
      },
    },
    info: {
      container: {
        backgroundColor: colors.informative.bgSubtle,
        borderColor: colors.informative.border,
      },
      icon: colors.informative.bg,
      title: {
        color: colors.informative.fgStrong,
      },
      description: {
        color: colorScheme === "dark" ? "#bfdbfe" : "#1e3a8a",
      },
    },
    success: {
      container: {
        backgroundColor: colors.positive.bgSubtle,
        borderColor: colors.positive.border,
      },
      icon: colors.positive.bg,
      title: {
        color: colors.positive.fgStrong,
      },
      description: {
        color: colorScheme === "dark" ? "#bbf7d0" : "#14532d",
      },
    },
    warning: {
      container: {
        backgroundColor: colors.cautionary.bgSubtle,
        borderColor: colors.cautionary.border,
      },
      icon: colors.cautionary.bg,
      title: {
        color: colors.cautionary.fgStrong,
      },
      description: {
        color: colorScheme === "dark" ? "#fde68a" : "#78350f",
      },
    },
    destructive: {
      container: {
        backgroundColor: colors.destructive.bgSubtle,
        borderColor: colors.destructive.border,
      },
      icon: colors.destructive.bg,
      title: {
        color: colors.destructive.fgStrong,
      },
      description: {
        color: colorScheme === "dark" ? "#fecaca" : "#7f1d1d",
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
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const variantColors = {
    info: colors.informative.bg,
    success: colors.positive.bg,
    warning: colors.cautionary.bg,
    error: colors.destructive.bg,
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
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const variantStyles = {
    info: {
      backgroundColor: colors.informative.bg,
      color: colors.informative.fg,
    },
    success: {
      backgroundColor: colors.positive.bg,
      color: colors.positive.fg,
    },
    warning: {
      backgroundColor: colors.cautionary.bg,
      color: colors.cautionary.fg,
    },
    destructive: {
      backgroundColor: colors.destructive.bg,
      color: colors.destructive.fg,
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
    borderRadius: curves.xs,
    borderWidth: 1,
    padding: sp.xs,
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    marginRight: sp.xs,
    marginTop: sp.xxs,
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
    marginBottom: sp.xxs,
  },
  description: {
    fontSize: fontSizes.sm,
  },
  action: {
    marginTop: sp.xxs,
  },
  actionText: {
    fontSize: fontSizes.sm,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  closeButton: {
    marginLeft: sp.xxs,
    padding: sp.xxs,
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
    marginRight: sp.xxs,
  },
  inlineText: {
    fontSize: fontSizes.sm,
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: sp.xs,
    paddingHorizontal: sp.xs,
  },
  bannerIcon: {
    marginRight: sp.xxs,
  },
  bannerContent: {
    flex: 1,
  },
  bannerText: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
  },
  bannerAction: {
    marginLeft: sp.xs,
  },
  bannerActionText: {
    fontSize: fontSizes.sm,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  bannerClose: {
    marginLeft: sp.xxs,
    padding: sp.xxs,
  },
})
