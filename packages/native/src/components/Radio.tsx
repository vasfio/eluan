import React from "react"
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from "react-native"
import { fontSizes } from "@eluan/tokens"
import { sp, getSemanticColors } from "../utils/styles"

export interface RadioOption {
  /** Unique value for this option */
  value: string
  /** Display label */
  label: string
  /** Optional description */
  description?: string
  /** Disabled state for this option */
  disabled?: boolean
}

export interface RadioGroupProps {
  /** Currently selected value */
  value?: string
  /** Called when selection changes */
  onValueChange?: (value: string) => void
  /** Available options */
  options: RadioOption[]
  /** Disabled state for all options */
  disabled?: boolean
  /** Size of the radio buttons */
  size?: "sm" | "default" | "lg"
  /** Layout direction */
  direction?: "vertical" | "horizontal"
  /** Container style */
  style?: ViewStyle
  /** Radio button position */
  radioPosition?: "left" | "right"
}

export function RadioGroup({
  value,
  onValueChange,
  options,
  disabled = false,
  size = "default",
  direction = "vertical",
  style,
  radioPosition = "left",
}: RadioGroupProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const sizeStyles = {
    sm: { outer: 16, inner: 8 },
    default: { outer: 20, inner: 10 },
    lg: { outer: 24, inner: 12 },
  }

  const currentSize = sizeStyles[size]

  const themedStyles = {
    outer: {
      borderColor: colors.container.fgAlt,
    },
    outerSelected: {
      borderColor: colors.actionPrimary.bg,
    },
    inner: {
      backgroundColor: colors.actionPrimary.bg,
    },
    label: {
      color: colors.container.fg,
    },
    description: {
      color: colors.container.fgAlt,
    },
  }

  const handlePress = (optionValue: string) => {
    if (!disabled) {
      onValueChange?.(optionValue)
    }
  }

  return (
    <View
      style={[
        styles.group,
        direction === "horizontal" && styles.groupHorizontal,
        style,
      ]}
      accessibilityRole="radiogroup"
    >
      {options.map((option) => {
        const isSelected = value === option.value
        const isDisabled = disabled || option.disabled

        const radioElement = (
          <View
            style={[
              styles.outer,
              themedStyles.outer,
              isSelected && themedStyles.outerSelected,
              { width: currentSize.outer, height: currentSize.outer },
              isDisabled && styles.disabled,
            ]}
          >
            {isSelected && (
              <View
                style={[
                  styles.inner,
                  themedStyles.inner,
                  { width: currentSize.inner, height: currentSize.inner },
                ]}
              />
            )}
          </View>
        )

        const labelElement = (
          <View
            style={[
              styles.labelContainer,
              radioPosition === "left"
                ? styles.labelContainerLeft
                : styles.labelContainerRight,
            ]}
          >
            <Text
              style={[
                styles.label,
                themedStyles.label,
                isDisabled && styles.labelDisabled,
              ]}
            >
              {option.label}
            </Text>
            {option.description && (
              <Text
                style={[
                  styles.description,
                  themedStyles.description,
                  isDisabled && styles.labelDisabled,
                ]}
              >
                {option.description}
              </Text>
            )}
          </View>
        )

        return (
          <Pressable
            key={option.value}
            onPress={() => handlePress(option.value)}
            disabled={isDisabled}
            style={[
              styles.item,
              radioPosition === "right" && styles.itemReverse,
            ]}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected, disabled: isDisabled }}
          >
            {radioPosition === "left" ? (
              <>
                {radioElement}
                {labelElement}
              </>
            ) : (
              <>
                {labelElement}
                {radioElement}
              </>
            )}
          </Pressable>
        )
      })}
    </View>
  )
}

// Individual Radio component for more control
export interface RadioProps {
  /** Whether the radio is selected */
  selected?: boolean
  /** Called when pressed */
  onPress?: () => void
  /** Label text */
  label?: string
  /** Description text */
  description?: string
  /** Disabled state */
  disabled?: boolean
  /** Size */
  size?: "sm" | "default" | "lg"
  /** Container style */
  style?: ViewStyle
  /** Label style */
  labelStyle?: TextStyle
}

export function Radio({
  selected = false,
  onPress,
  label,
  description,
  disabled = false,
  size = "default",
  style,
  labelStyle,
}: RadioProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const sizeStyles = {
    sm: { outer: 16, inner: 8 },
    default: { outer: 20, inner: 10 },
    lg: { outer: 24, inner: 12 },
  }

  const currentSize = sizeStyles[size]

  const themedStyles = {
    outer: {
      borderColor: selected
        ? colors.actionPrimary.bg
        : colors.container.fgAlt,
    },
    inner: {
      backgroundColor: colors.actionPrimary.bg,
    },
    label: {
      color: colors.container.fg,
    },
    description: {
      color: colors.container.fgAlt,
    },
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.item, style]}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
    >
      <View
        style={[
          styles.outer,
          themedStyles.outer,
          { width: currentSize.outer, height: currentSize.outer },
          disabled && styles.disabled,
        ]}
      >
        {selected && (
          <View
            style={[
              styles.inner,
              themedStyles.inner,
              { width: currentSize.inner, height: currentSize.inner },
            ]}
          />
        )}
      </View>
      {(label || description) && (
        <View style={styles.labelContainer}>
          {label && (
            <Text
              style={[
                styles.label,
                themedStyles.label,
                disabled && styles.labelDisabled,
                labelStyle,
              ]}
            >
              {label}
            </Text>
          )}
          {description && (
            <Text
              style={[
                styles.description,
                themedStyles.description,
                disabled && styles.labelDisabled,
              ]}
            >
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  group: {
    gap: sp.xs,
  },
  groupHorizontal: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  itemReverse: {
    justifyContent: "space-between",
  },
  outer: {
    borderWidth: 2,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    borderRadius: 999,
  },
  labelContainer: {
    flex: 1,
  },
  labelContainerLeft: {
    marginLeft: sp.xxs,
  },
  labelContainerRight: {
    marginRight: sp.xxs,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
  },
  description: {
    fontSize: fontSizes.xs,
    marginTop: sp.xxs,
  },
  disabled: {
    opacity: 0.5,
  },
  labelDisabled: {
    opacity: 0.5,
  },
})
