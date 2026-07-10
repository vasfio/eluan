import React from "react"
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  PressableProps,
  useColorScheme,
} from "react-native"
import { fontSizes, fontWeights } from "@eluan/tokens"
import { sp, sz, curves, getSemanticColors } from "../utils/styles"

export interface ButtonProps extends Omit<PressableProps, "style"> {
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  style?: ViewStyle
  textStyle?: TextStyle
}

export function Button({
  children,
  variant = "default",
  size = "default",
  disabled,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    const variants = {
      default: {
        container: {
          backgroundColor: colors.actionPrimary.bg,
        },
        text: {
          color: colors.actionPrimary.fg,
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
      secondary: {
        container: {
          backgroundColor: colors.actionSecondary.bg,
        },
        text: {
          color: colors.actionSecondary.fg,
        },
      },
      ghost: {
        container: {
          backgroundColor: "transparent",
        },
        text: {
          color: colors.container.fg,
        },
      },
      link: {
        container: {
          backgroundColor: "transparent",
        },
        text: {
          color: colors.container.fg,
          textDecorationLine: "underline" as const,
        },
      },
    }

    return variants[variant]
  }

  const getSizeStyles = (): { container: ViewStyle; text: TextStyle } => {
    const sizes = {
      default: {
        container: {
          height: sz.lg,
          paddingHorizontal: sp.xs,
          paddingVertical: sp.xxs,
        },
        text: {
          fontSize: fontSizes.sm,
        },
      },
      sm: {
        container: {
          height: sz.lg,
          paddingHorizontal: sp.xs,
        },
        text: {
          fontSize: fontSizes.sm,
        },
      },
      lg: {
        container: {
          height: sz.xl,
          paddingHorizontal: sp.sm,
        },
        text: {
          fontSize: fontSizes.base,
        },
      },
      icon: {
        container: {
          height: sz.lg,
          width: sz.lg,
          paddingHorizontal: 0,
        },
        text: {
          fontSize: fontSizes.sm,
        },
      },
    }

    return sizes[size]
  }

  const variantStyles = getVariantStyles()
  const sizeStyles = getSizeStyles()

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles.container,
        sizeStyles.container,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          style={[
            styles.text,
            variantStyles.text,
            sizeStyles.text,
            disabled && styles.textDisabled,
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: curves.xxs,
  },
  text: {
    fontWeight: fontWeights.medium as TextStyle["fontWeight"],
    textAlign: "center",
  },
  pressed: {
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.5,
  },
  textDisabled: {
    opacity: 0.5,
  },
})
