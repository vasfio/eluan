import React, { useRef, useState, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  useColorScheme,
  Animated,
  PanResponder,
  LayoutChangeEvent,
} from "react-native"
import { fontSizes } from "@vasf/ragnar-tokens"
import { sp, getSemanticColors } from "../utils/styles"

export interface SliderProps {
  /** Current value */
  value?: number
  /** Default value (uncontrolled) */
  defaultValue?: number
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Called when value changes */
  onValueChange?: (value: number) => void
  /** Called when sliding ends */
  onSlidingComplete?: (value: number) => void
  /** Label text */
  label?: string
  /** Show current value */
  showValue?: boolean
  /** Format value for display */
  formatValue?: (value: number) => string
  /** Disabled state */
  disabled?: boolean
  /** Size variant */
  size?: "sm" | "default" | "lg"
  /** Container style */
  style?: ViewStyle
  /** Track style */
  trackStyle?: ViewStyle
  /** Thumb style */
  thumbStyle?: ViewStyle
  /** Label style */
  labelStyle?: TextStyle
}

export function Slider({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  onSlidingComplete,
  label,
  showValue = false,
  formatValue,
  disabled = false,
  size = "default",
  style,
  trackStyle,
  thumbStyle,
  labelStyle,
}: SliderProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = isControlled ? controlledValue : internalValue

  const [trackWidth, setTrackWidth] = useState(0)
  const thumbPosition = useRef(new Animated.Value(0)).current

  const sizeStyles = {
    sm: { track: 4, thumb: 16 },
    default: { track: 6, thumb: 20 },
    lg: { track: 8, thumb: 24 },
  }

  const currentSize = sizeStyles[size]

  const themedStyles = {
    track: {
      backgroundColor: colors.container.borderAlt,
    },
    activeTrack: {
      backgroundColor: colors.actionPrimary.bg,
    },
    thumb: {
      backgroundColor: colorScheme === "dark" ? colors.actionPrimary.bg : colors.container.bg,
      borderColor: colors.interactive.border,
    },
    label: {
      color: colors.container.fg,
    },
    value: {
      color: colors.container.fgAlt,
    },
  }

  const valueToPosition = useCallback(
    (val: number) => {
      if (trackWidth === 0) return 0
      const percentage = (val - min) / (max - min)
      return percentage * trackWidth
    },
    [trackWidth, min, max]
  )

  const positionToValue = useCallback(
    (pos: number) => {
      if (trackWidth === 0) return min
      const percentage = Math.max(0, Math.min(1, pos / trackWidth))
      const rawValue = percentage * (max - min) + min
      const steppedValue = Math.round(rawValue / step) * step
      return Math.max(min, Math.min(max, steppedValue))
    },
    [trackWidth, min, max, step]
  )

  // Update thumb position when value changes
  React.useEffect(() => {
    const position = valueToPosition(currentValue)
    thumbPosition.setValue(position)
  }, [currentValue, valueToPosition, thumbPosition])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {
        // Thumb touched
      },
      onPanResponderMove: (_, gestureState) => {
        const currentPosition = valueToPosition(currentValue)
        const newPosition = currentPosition + gestureState.dx
        const newValue = positionToValue(newPosition)

        if (!isControlled) {
          setInternalValue(newValue)
        }
        onValueChange?.(newValue)
      },
      onPanResponderRelease: (_, gestureState) => {
        const currentPosition = valueToPosition(currentValue)
        const newPosition = currentPosition + gestureState.dx
        const finalValue = positionToValue(newPosition)

        if (!isControlled) {
          setInternalValue(finalValue)
        }
        onSlidingComplete?.(finalValue)
      },
    })
  ).current

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setTrackWidth(width - currentSize.thumb)
  }

  const handleTrackPress = (event: any) => {
    if (disabled) return

    const { locationX } = event.nativeEvent
    const newValue = positionToValue(locationX - currentSize.thumb / 2)

    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
    onSlidingComplete?.(newValue)
  }

  const displayValue = formatValue
    ? formatValue(currentValue)
    : currentValue.toString()

  const percentage = ((currentValue - min) / (max - min)) * 100

  return (
    <View style={[styles.container, style]}>
      {(label || showValue) && (
        <View style={styles.header}>
          {label && (
            <Text style={[styles.label, themedStyles.label, labelStyle]}>
              {label}
            </Text>
          )}
          {showValue && (
            <Text style={[styles.value, themedStyles.value]}>
              {displayValue}
            </Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.trackContainer,
          { height: currentSize.thumb },
        ]}
        onLayout={handleTrackLayout}
        onTouchEnd={handleTrackPress}
      >
        <View
          style={[
            styles.track,
            themedStyles.track,
            { height: currentSize.track, borderRadius: currentSize.track / 2 },
            disabled && styles.disabled,
            trackStyle,
          ]}
        >
          <View
            style={[
              styles.activeTrack,
              themedStyles.activeTrack,
              {
                width: `${percentage}%`,
                height: currentSize.track,
                borderRadius: currentSize.track / 2,
              },
            ]}
          />
        </View>
        <Animated.View
          style={[
            styles.thumb,
            themedStyles.thumb,
            {
              width: currentSize.thumb,
              height: currentSize.thumb,
              borderRadius: currentSize.thumb / 2,
              transform: [{ translateX: thumbPosition }],
            },
            disabled && styles.disabled,
            thumbStyle,
          ]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  )
}

// Range slider with two thumbs
export interface RangeSliderProps {
  /** Current value range [min, max] */
  value?: [number, number]
  /** Default value range (uncontrolled) */
  defaultValue?: [number, number]
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Minimum gap between values */
  minGap?: number
  /** Called when value changes */
  onValueChange?: (value: [number, number]) => void
  /** Called when sliding ends */
  onSlidingComplete?: (value: [number, number]) => void
  /** Label text */
  label?: string
  /** Show current values */
  showValue?: boolean
  /** Format value for display */
  formatValue?: (value: number) => string
  /** Disabled state */
  disabled?: boolean
  /** Size variant */
  size?: "sm" | "default" | "lg"
  /** Container style */
  style?: ViewStyle
}

export function RangeSlider({
  value: controlledValue,
  defaultValue = [25, 75],
  min = 0,
  max = 100,
  step: _step = 1,
  minGap: _minGap = 0,
  onValueChange: _onValueChange,
  onSlidingComplete: _onSlidingComplete,
  label,
  showValue = false,
  formatValue,
  disabled = false,
  size = "default",
  style,
}: RangeSliderProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const isControlled = controlledValue !== undefined
  const [internalValue, _setInternalValue] = useState(defaultValue)
  const currentValue = isControlled ? controlledValue : internalValue

  const [_trackWidth, setTrackWidth] = useState(0)

  const sizeStyles = {
    sm: { track: 4, thumb: 16 },
    default: { track: 6, thumb: 20 },
    lg: { track: 8, thumb: 24 },
  }

  const currentSize = sizeStyles[size]

  const themedStyles = {
    track: {
      backgroundColor: colors.container.borderAlt,
    },
    activeTrack: {
      backgroundColor: colors.actionPrimary.bg,
    },
    thumb: {
      backgroundColor: colorScheme === "dark" ? colors.actionPrimary.bg : colors.container.bg,
      borderColor: colors.interactive.border,
    },
    label: {
      color: colors.container.fg,
    },
    value: {
      color: colors.container.fgAlt,
    },
  }

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setTrackWidth(width - currentSize.thumb * 2)
  }

  const leftPercentage = ((currentValue[0] - min) / (max - min)) * 100
  const rightPercentage = ((currentValue[1] - min) / (max - min)) * 100

  const displayValue = formatValue
    ? `${formatValue(currentValue[0])} - ${formatValue(currentValue[1])}`
    : `${currentValue[0]} - ${currentValue[1]}`

  return (
    <View style={[styles.container, style]}>
      {(label || showValue) && (
        <View style={styles.header}>
          {label && (
            <Text style={[styles.label, themedStyles.label]}>
              {label}
            </Text>
          )}
          {showValue && (
            <Text style={[styles.value, themedStyles.value]}>
              {displayValue}
            </Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.trackContainer,
          { height: currentSize.thumb },
        ]}
        onLayout={handleTrackLayout}
      >
        <View
          style={[
            styles.track,
            themedStyles.track,
            { height: currentSize.track, borderRadius: currentSize.track / 2 },
            disabled && styles.disabled,
          ]}
        >
          <View
            style={[
              styles.rangeTrack,
              themedStyles.activeTrack,
              {
                left: `${leftPercentage}%`,
                width: `${rightPercentage - leftPercentage}%`,
                height: currentSize.track,
              },
            ]}
          />
        </View>
        {/* Left thumb */}
        <View
          style={[
            styles.thumb,
            themedStyles.thumb,
            {
              width: currentSize.thumb,
              height: currentSize.thumb,
              borderRadius: currentSize.thumb / 2,
              left: `${leftPercentage}%`,
            },
            disabled && styles.disabled,
          ]}
        />
        {/* Right thumb */}
        <View
          style={[
            styles.thumb,
            themedStyles.thumb,
            {
              width: currentSize.thumb,
              height: currentSize.thumb,
              borderRadius: currentSize.thumb / 2,
              left: `${rightPercentage}%`,
            },
            disabled && styles.disabled,
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: sp.xxs,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
  },
  value: {
    fontSize: fontSizes.sm,
  },
  trackContainer: {
    justifyContent: "center",
  },
  track: {
    width: "100%",
    position: "absolute",
  },
  activeTrack: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  rangeTrack: {
    position: "absolute",
    top: 0,
  },
  thumb: {
    position: "absolute",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabled: {
    opacity: 0.5,
  },
})
