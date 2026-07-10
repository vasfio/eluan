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
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  TextInputFocusEventData,
} from "react-native"
import { fontSizes } from "@eluan/tokens"
import { sp, curves, getSemanticColors } from "../utils/styles"

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
    const colors = getSemanticColors(colorScheme)
    const [isFocused, setIsFocused] = useState(false)
    const [height, setHeight] = useState<number | undefined>(undefined)

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    const handleContentSizeChange = (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      if (autoGrow) {
        const newHeight = Math.min(e.nativeEvent.contentSize.height, maxHeight)
        setHeight(newHeight)
      }
      onContentSizeChange?.(e)
    }

    const lineHeight = 20 // approximate line height
    const minHeight = rows * lineHeight + 4
    const computedHeight = autoGrow ? height : undefined

    const themedStyles = {
      label: {
        color: colors.container.fg,
      },
      input: {
        backgroundColor: colors.interactive.bg,
        borderColor: error
          ? colors.destructive.bg
          : isFocused
          ? colors.interactive.border
          : colors.interactive.borderAlt,
        color: colors.interactive.fg,
      },
      placeholder: colors.interactive.fgAlt,
      helperText: {
        color: colors.container.fgAlt,
      },
      error: {
        color: colors.destructive.bg,
      },
      count: {
        color: colors.interactive.fgAlt,
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
    marginBottom: sp.xxs,
  },
  input: {
    borderWidth: 1,
    borderRadius: curves.xxs,
    paddingHorizontal: sp.xs,
    paddingVertical: sp.xxs,
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
    marginTop: sp.xxs,
  },
  count: {
    fontSize: fontSizes.xs,
  },
})
