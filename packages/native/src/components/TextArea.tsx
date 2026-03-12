import React, { forwardRef, useState } from "react"
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  useColorScheme,
} from "react-native"
import { spacing, radii, fontSizes } from "@frolda/ragnar-tokens"

export interface TextAreaProps extends Omit<TextInputProps, "style" | "multiline"> {
  /** Label text displayed above the textarea */
  label?: string
  /** Helper text displayed below the textarea */
  helperText?: string
  /** Error message - also sets error state */
  error?: string
  /** Number of visible lines (affects height) */
  rows?: number
  /** Maximum character count */
  maxLength?: number
  /** Show character count */
  showCount?: boolean
  /** Container style */
  containerStyle?: ViewStyle
  /** TextArea style */
  style?: TextStyle
  /** Label style */
  labelStyle?: TextStyle
  /** Disabled state */
  disabled?: boolean
  /** Auto-grow height based on content */
  autoGrow?: boolean
  /** Maximum height when autoGrow is enabled */
  maxHeight?: number
}

export const TextArea = forwardRef<TextInput, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      rows = 4,
      maxLength,
      showCount = false,
      containerStyle,
      style,
      labelStyle,
      disabled,
      autoGrow = false,
      maxHeight = 200,
      value,
      onFocus,
      onBlur,
      onContentSizeChange,
      ...props
    },
    ref
  ) => {
    const colorScheme = useColorScheme() ?? "light"
    const isDark = colorScheme === "dark"
    const [isFocused, setIsFocused] = useState(false)
    const [height, setHeight] = useState<number | undefined>(undefined)

    const handleFocus = (e: any) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: any) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    const handleContentSizeChange = (e: any) => {
      if (autoGrow) {
        const newHeight = Math.min(e.nativeEvent.contentSize.height, maxHeight)
        setHeight(newHeight)
      }
      onContentSizeChange?.(e)
    }

    const lineHeight = 20 // approximate line height
    const minHeight = rows * lineHeight + spacing[4]
    const computedHeight = autoGrow ? height : undefined

    const themedStyles = {
      label: {
        color: isDark ? "#fafafa" : "#18181b",
      },
      input: {
        backgroundColor: isDark ? "#09090b" : "#ffffff",
        borderColor: error
          ? "#ef4444"
          : isFocused
          ? isDark
            ? "#fafafa"
            : "#18181b"
          : isDark
          ? "#27272a"
          : "#e4e4e7",
        color: isDark ? "#fafafa" : "#18181b",
      },
      placeholder: isDark ? "#71717a" : "#a1a1aa",
      helperText: {
        color: isDark ? "#a1a1aa" : "#71717a",
      },
      error: {
        color: "#ef4444",
      },
      count: {
        color: isDark ? "#71717a" : "#a1a1aa",
      },
    }

    const charCount = value?.length ?? 0

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text style={[styles.label, themedStyles.label, labelStyle]}>
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          multiline
          textAlignVertical="top"
          value={value}
          maxLength={maxLength}
          style={[
            styles.input,
            themedStyles.input,
            { minHeight, height: computedHeight },
            disabled && styles.disabled,
            style,
          ]}
          placeholderTextColor={themedStyles.placeholder}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onContentSizeChange={handleContentSizeChange}
          {...props}
        />
        <View style={styles.footer}>
          {(helperText || error) && (
            <Text
              style={[
                styles.helperText,
                error ? themedStyles.error : themedStyles.helperText,
              ]}
            >
              {error || helperText}
            </Text>
          )}
          {showCount && (
            <Text style={[styles.count, themedStyles.count]}>
              {charCount}
              {maxLength ? `/${maxLength}` : ""}
            </Text>
          )}
        </View>
      </View>
    )
  }
)

TextArea.displayName = "TextArea"

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
    marginBottom: spacing[1],
  },
  input: {
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    fontSize: fontSizes.base,
  },
  helperText: {
    fontSize: fontSizes.xs,
    flex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing[1],
  },
  count: {
    fontSize: fontSizes.xs,
  },
})
