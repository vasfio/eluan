import React, { useEffect, useRef } from "react"
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  useColorScheme,
  Animated,
} from "react-native"
import { spacing, fontSizes } from "@frolda/ragnar-tokens"

export interface SwitchProps {
  /** Whether the switch is on */
  checked?: boolean
  /** Called when the switch is toggled */
  onCheckedChange?: (checked: boolean) => void
  /** Label text */
  label?: string
  /** Description text below label */
  description?: string
  /** Disabled state */
  disabled?: boolean
  /** Size of the switch */
  size?: "sm" | "default" | "lg"
  /** Container style */
  style?: ViewStyle
  /** Label style */
  labelStyle?: TextStyle
  /** Label position */
  labelPosition?: "left" | "right"
}

export function Switch({
  checked = false,
  onCheckedChange,
  label,
  description,
  disabled = false,
  size = "default",
  style,
  labelStyle,
  labelPosition = "left",
}: SwitchProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"
  const translateX = useRef(new Animated.Value(checked ? 1 : 0)).current

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: checked ? 1 : 0,
      useNativeDriver: true,
      tension: 60,
      friction: 8,
    }).start()
  }, [checked, translateX])

  const handlePress = () => {
    if (!disabled) {
      onCheckedChange?.(!checked)
    }
  }

  const sizeStyles = {
    sm: { track: { width: 36, height: 20 }, thumb: 16, travel: 16 },
    default: { track: { width: 44, height: 24 }, thumb: 20, travel: 20 },
    lg: { track: { width: 52, height: 28 }, thumb: 24, travel: 24 },
  }

  const currentSize = sizeStyles[size]

  const themedStyles = {
    track: {
      backgroundColor: checked
        ? isDark
          ? "#fafafa"
          : "#18181b"
        : isDark
        ? "#27272a"
        : "#e4e4e7",
    },
    thumb: {
      backgroundColor: checked
        ? isDark
          ? "#18181b"
          : "#fafafa"
        : isDark
        ? "#71717a"
        : "#ffffff",
    },
    label: {
      color: isDark ? "#fafafa" : "#18181b",
    },
    description: {
      color: isDark ? "#a1a1aa" : "#71717a",
    },
  }

  const thumbTranslate = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [2, currentSize.travel],
  })

  const switchElement = (
    <View
      style={[
        styles.track,
        themedStyles.track,
        currentSize.track,
        disabled && styles.disabled,
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          themedStyles.thumb,
          {
            width: currentSize.thumb,
            height: currentSize.thumb,
            transform: [{ translateX: thumbTranslate }],
          },
        ]}
      />
    </View>
  )

  const labelElement = (label || description) && (
    <View
      style={[
        styles.labelContainer,
        labelPosition === "right" ? styles.labelRight : styles.labelLeft,
      ]}
    >
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
      style={[styles.container, style]}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
    >
      {labelPosition === "left" ? (
        <>
          {labelElement}
          {switchElement}
        </>
      ) : (
        <>
          {switchElement}
          {labelElement}
        </>
      )}
    </Pressable>
  )
}

// Switch with additional on/off text labels
export interface LabeledSwitchProps extends Omit<SwitchProps, "label" | "description"> {
  /** Text shown when switch is off */
  offLabel?: string
  /** Text shown when switch is on */
  onLabel?: string
}

export function LabeledSwitch({
  offLabel = "Off",
  onLabel = "On",
  checked = false,
  ...props
}: LabeledSwitchProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"

  return (
    <View style={styles.labeledContainer}>
      <Text
        style={[
          styles.stateLabel,
          { color: isDark ? "#a1a1aa" : "#71717a" },
          !checked && styles.stateLabelActive,
        ]}
      >
        {offLabel}
      </Text>
      <Switch checked={checked} {...props} />
      <Text
        style={[
          styles.stateLabel,
          { color: isDark ? "#a1a1aa" : "#71717a" },
          checked && styles.stateLabelActive,
        ]}
      >
        {onLabel}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  track: {
    borderRadius: 999,
    justifyContent: "center",
  },
  thumb: {
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  labelContainer: {
    flex: 1,
  },
  labelLeft: {
    marginRight: spacing[3],
  },
  labelRight: {
    marginLeft: spacing[3],
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
  labeledContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  stateLabel: {
    fontSize: fontSizes.sm,
  },
  stateLabelActive: {
    fontWeight: "600",
  },
})
