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
import { spacing, radii, fontSizes, fontWeights } from "@ragnar/tokens"

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
  const isDark = colorScheme === "dark"

  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    const variants = {
      default: {
        container: {
          backgroundColor: isDark ? "#fafafa" : "#18181b",
        },
        text: {
          color: isDark ? "#18181b" : "#fafafa",
        },
      },
      destructive: {
        container: {
          backgroundColor: isDark ? "#7f1d1d" : "#ef4444",
        },
        text: {
          color: "#fafafa",
        },
      },
      outline: {
        container: {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: isDark ? "#27272a" : "#e4e4e7",
        },
        text: {
          color: isDark ? "#fafafa" : "#18181b",
        },
      },
      secondary: {
        container: {
          backgroundColor: isDark ? "#27272a" : "#f4f4f5",
        },
        text: {
          color: isDark ? "#fafafa" : "#18181b",
        },
      },
      ghost: {
        container: {
          backgroundColor: "transparent",
        },
        text: {
          color: isDark ? "#fafafa" : "#18181b",
        },
      },
      link: {
        container: {
          backgroundColor: "transparent",
        },
        text: {
          color: isDark ? "#fafafa" : "#18181b",
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
          height: 40,
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[2],
        },
        text: {
          fontSize: fontSizes.sm,
        },
      },
      sm: {
        container: {
          height: 36,
          paddingHorizontal: spacing[3],
        },
        text: {
          fontSize: fontSizes.sm,
        },
      },
      lg: {
        container: {
          height: 44,
          paddingHorizontal: spacing[8],
        },
        text: {
          fontSize: fontSizes.base,
        },
      },
      icon: {
        container: {
          height: 40,
          width: 40,
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
    borderRadius: radii.md,
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
