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
import { spacing, radii, fontSizes } from "@ragnar/tokens"

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean
  /** Called when the checkbox is pressed */
  onCheckedChange?: (checked: boolean) => void
  /** Label text */
  label?: string
  /** Description text below label */
  description?: string
  /** Disabled state */
  disabled?: boolean
  /** Indeterminate state (partially checked) */
  indeterminate?: boolean
  /** Size of the checkbox */
  size?: "sm" | "default" | "lg"
  /** Container style */
  style?: ViewStyle
  /** Label style */
  labelStyle?: TextStyle
  /** Checkbox position */
  position?: "left" | "right"
}

export function Checkbox({
  checked = false,
  onCheckedChange,
  label,
  description,
  disabled = false,
  indeterminate = false,
  size = "default",
  style,
  labelStyle,
  position = "left",
}: CheckboxProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"

  const handlePress = () => {
    if (!disabled) {
      onCheckedChange?.(!checked)
    }
  }

  const sizeStyles = {
    sm: { box: 16, icon: 10 },
    default: { box: 20, icon: 12 },
    lg: { box: 24, icon: 14 },
  }

  const currentSize = sizeStyles[size]

  const themedStyles = {
    box: {
      backgroundColor: checked || indeterminate
        ? isDark
          ? "#fafafa"
          : "#18181b"
        : "transparent",
      borderColor: checked || indeterminate
        ? isDark
          ? "#fafafa"
          : "#18181b"
        : isDark
        ? "#71717a"
        : "#a1a1aa",
    },
    icon: {
      color: checked || indeterminate
        ? isDark
          ? "#18181b"
          : "#fafafa"
        : "transparent",
    },
    label: {
      color: isDark ? "#fafafa" : "#18181b",
    },
    description: {
      color: isDark ? "#a1a1aa" : "#71717a",
    },
  }

  const checkIcon = indeterminate ? "−" : "✓"

  const checkboxElement = (
    <View
      style={[
        styles.box,
        themedStyles.box,
        { width: currentSize.box, height: currentSize.box },
        disabled && styles.disabled,
      ]}
    >
      {(checked || indeterminate) && (
        <Text
          style={[
            styles.icon,
            themedStyles.icon,
            { fontSize: currentSize.icon },
          ]}
        >
          {checkIcon}
        </Text>
      )}
    </View>
  )

  const labelElement = (label || description) && (
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
  )

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.container,
        position === "right" && styles.containerReverse,
        style,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
    >
      {position === "left" ? (
        <>
          {checkboxElement}
          {labelElement}
        </>
      ) : (
        <>
          {labelElement}
          {checkboxElement}
        </>
      )}
    </Pressable>
  )
}

// Checkbox group for multiple selections
export interface CheckboxGroupProps {
  /** Currently selected values */
  value?: string[]
  /** Called when selection changes */
  onValueChange?: (value: string[]) => void
  /** Checkbox options */
  options: Array<{
    value: string
    label: string
    description?: string
    disabled?: boolean
  }>
  /** Disabled state for all checkboxes */
  disabled?: boolean
  /** Container style */
  style?: ViewStyle
  /** Direction of the group */
  direction?: "vertical" | "horizontal"
}

export function CheckboxGroup({
  value = [],
  onValueChange,
  options,
  disabled = false,
  style,
  direction = "vertical",
}: CheckboxGroupProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onValueChange?.([...value, optionValue])
    } else {
      onValueChange?.(value.filter((v) => v !== optionValue))
    }
  }

  return (
    <View
      style={[
        styles.group,
        direction === "horizontal" && styles.groupHorizontal,
        style,
      ]}
    >
      {options.map((option) => (
        <Checkbox
          key={option.value}
          checked={value.includes(option.value)}
          onCheckedChange={(checked) => handleChange(option.value, checked)}
          label={option.label}
          description={option.description}
          disabled={disabled || option.disabled}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  containerReverse: {
    justifyContent: "space-between",
  },
  box: {
    borderWidth: 2,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontWeight: "bold",
  },
  labelContainer: {
    flex: 1,
    marginLeft: spacing[2],
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
  },
  description: {
    fontSize: fontSizes.xs,
    marginTop: 2,
  },
  disabled: {
    opacity: 0.5,
  },
  labelDisabled: {
    opacity: 0.5,
  },
  group: {
    gap: spacing[3],
  },
  groupHorizontal: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
})
