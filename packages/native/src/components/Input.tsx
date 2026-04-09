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
  Pressable,
} from "react-native"
import { fontSizes } from "@vasf/ragnar-tokens"
import { sp, sz, curves, getSemanticColors } from "../utils/styles"

export interface InputProps extends Omit<TextInputProps, "style"> {
  /** Label text displayed above the input */
  label?: string
  /** Helper text displayed below the input */
  helperText?: string
  /** Error message - also sets error state */
  error?: string
  /** Left icon/element */
  leftElement?: React.ReactNode
  /** Right icon/element */
  rightElement?: React.ReactNode
  /** Container style */
  containerStyle?: ViewStyle
  /** Input style */
  style?: TextStyle
  /** Label style */
  labelStyle?: TextStyle
  /** Disabled state */
  disabled?: boolean
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftElement,
      rightElement,
      containerStyle,
      style,
      labelStyle,
      disabled,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const colorScheme = useColorScheme() ?? "light"
    const colors = getSemanticColors(colorScheme)
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = (e: any) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: any) => {
      setIsFocused(false)
      onBlur?.(e)
    }

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
    }

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text style={[styles.label, themedStyles.label, labelStyle]}>
            {label}
          </Text>
        )}
        <View
          style={[
            styles.inputContainer,
            themedStyles.input,
            disabled && styles.disabled,
          ]}
        >
          {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
          <TextInput
            ref={ref}
            style={[
              styles.input,
              { color: themedStyles.input.color },
              leftElement ? styles.inputWithLeft : null,
              rightElement ? styles.inputWithRight : null,
              style,
            ]}
            placeholderTextColor={themedStyles.placeholder}
            editable={!disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {rightElement && (
            <View style={styles.rightElement}>{rightElement}</View>
          )}
        </View>
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
      </View>
    )
  }
)

Input.displayName = "Input"

// Password input variant
export interface PasswordInputProps extends Omit<InputProps, "secureTextEntry"> {
  /** Show/hide password toggle */
  showToggle?: boolean
}

export const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  ({ showToggle = true, rightElement, ...props }, ref) => {
    const [visible, setVisible] = useState(false)
    const colorScheme = useColorScheme() ?? "light"
    const colors = getSemanticColors(colorScheme)

    const toggleElement = showToggle ? (
      <Pressable onPress={() => setVisible(!visible)} style={styles.toggleButton}>
        <Text style={{ color: colors.container.fgAlt, fontSize: 12 }}>
          {visible ? "Hide" : "Show"}
        </Text>
      </Pressable>
    ) : (
      rightElement
    )

    return (
      <Input
        ref={ref}
        secureTextEntry={!visible}
        rightElement={toggleElement}
        {...props}
      />
    )
  }
)

PasswordInput.displayName = "PasswordInput"

// Search input variant
export interface SearchInputProps extends InputProps {
  /** Called when search is submitted */
  onSearch?: (text: string) => void
  /** Clear button */
  showClear?: boolean
  /** Current search value for clear functionality */
  value?: string
  /** Called when clear is pressed */
  onClear?: () => void
}

export const SearchInput = forwardRef<TextInput, SearchInputProps>(
  ({ onSearch, showClear = true, value, onClear, onSubmitEditing, ...props }, ref) => {
    const colorScheme = useColorScheme() ?? "light"
    const colors = getSemanticColors(colorScheme)

    const handleSubmit = (e: any) => {
      onSearch?.(e.nativeEvent.text)
      onSubmitEditing?.(e)
    }

    const clearButton =
      showClear && value ? (
        <Pressable onPress={onClear} style={styles.clearButton}>
          <Text style={{ color: colors.interactive.fgAlt, fontSize: 16 }}>
            ×
          </Text>
        </Pressable>
      ) : null

    return (
      <Input
        ref={ref}
        value={value}
        placeholder="Search..."
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
        rightElement={clearButton}
        {...props}
      />
    )
  }
)

SearchInput.displayName = "SearchInput"

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
    marginBottom: sp.xxs,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: curves.xxs,
    minHeight: sz.xl,
  },
  input: {
    flex: 1,
    paddingHorizontal: sp.xs,
    paddingVertical: sp.xxs,
    fontSize: fontSizes.base,
  },
  inputWithLeft: {
    paddingLeft: 0,
  },
  inputWithRight: {
    paddingRight: 0,
  },
  leftElement: {
    paddingLeft: sp.xs,
  },
  rightElement: {
    paddingRight: sp.xs,
  },
  helperText: {
    fontSize: fontSizes.xs,
    marginTop: sp.xxs,
  },
  disabled: {
    opacity: 0.5,
  },
  toggleButton: {
    paddingHorizontal: sp.xxs,
    paddingVertical: sp.xxs,
  },
  clearButton: {
    paddingHorizontal: sp.xxs,
    paddingVertical: sp.xxs,
  },
})
