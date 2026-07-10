import React, { useEffect, useRef } from "react"
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  Animated,
  useColorScheme,
} from "react-native"
import { fontSizes } from "@eluan/tokens"
import { sp, sz, curves, getSemanticColors } from "../utils/styles"

export type VoiceInputState = "idle" | "listening" | "processing" | "error"

export interface VoiceInputProps {
  /**
   * Current state of the voice input
   */
  state: VoiceInputState
  /**
   * Callback when the microphone button is pressed
   */
  onPress: () => void
  /**
   * Callback when the user wants to stop listening
   */
  onStop?: () => void
  /**
   * Callback when the user wants to cancel
   */
  onCancel?: () => void
  /**
   * Transcript of recognized speech (live or final)
   */
  transcript?: string
  /**
   * Error message if state is "error"
   */
  errorMessage?: string
  /**
   * Helper text shown when idle
   */
  helperText?: string
  /**
   * Size of the microphone button
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * Whether the input is disabled
   */
  disabled?: boolean
  /**
   * Style for the container
   */
  style?: ViewStyle
  /**
   * Custom microphone icon
   */
  micIcon?: React.ReactNode
}

export function VoiceInput({
  state,
  onPress,
  onStop,
  onCancel,
  transcript,
  errorMessage,
  helperText = "Tap to speak",
  size = "default",
  disabled = false,
  style,
  micIcon,
}: VoiceInputProps) {
  const colorScheme = useColorScheme() ?? "light"

  const pulseAnim = useRef(new Animated.Value(1)).current
  const waveAnim = useRef(new Animated.Value(0)).current

  const colors = getSemanticColors(colorScheme)

  const primaryColor = colors.informative.bg
  const backgroundColor = colors.container.bg
  const borderColor = colors.container.borderAlt
  const textColor = colors.container.fg
  const mutedColor = colors.container.fgAlt
  const errorColor = colors.destructive.bg

  const sizes = {
    sm: { button: 48, icon: 20 },
    default: { button: 64, icon: 28 },
    lg: { button: 80, icon: 36 },
  }

  const { button: buttonSize, icon: iconSize } = sizes[size]

  // Pulse animation when listening
  useEffect(() => {
    if (state === "listening") {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      )
      pulse.start()

      const wave = Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      )
      wave.start()

      return () => {
        pulse.stop()
        wave.stop()
        pulseAnim.setValue(1)
        waveAnim.setValue(0)
      }
    }
  }, [state, pulseAnim, waveAnim])

  const handlePress = () => {
    if (disabled) return

    if (state === "listening" && onStop) {
      onStop()
    } else if (state === "idle") {
      onPress()
    }
  }

  const renderStatusText = () => {
    switch (state) {
      case "idle":
        return helperText
      case "listening":
        return "Listening..."
      case "processing":
        return "Processing..."
      case "error":
        return errorMessage ?? "An error occurred"
      default:
        return ""
    }
  }

  const getButtonColor = () => {
    switch (state) {
      case "listening":
        return colors.destructive.bg // Red for recording
      case "processing":
        return mutedColor
      case "error":
        return errorColor
      default:
        return primaryColor
    }
  }

  const waveScale = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.8],
  })

  const waveOpacity = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0],
  })

  return (
    <View style={[styles.container, style]}>
      {/* Transcript display */}
      {transcript && (
        <View style={[styles.transcriptContainer, { backgroundColor, borderColor }]}>
          <Text style={[styles.transcript, { color: textColor }]}>
            {transcript}
          </Text>
        </View>
      )}

      {/* Microphone button with waves */}
      <View style={styles.buttonContainer}>
        {state === "listening" && (
          <Animated.View
            style={[
              styles.wave,
              {
                width: buttonSize,
                height: buttonSize,
                borderRadius: buttonSize / 2,
                backgroundColor: colors.destructive.bg,
                transform: [{ scale: waveScale }],
                opacity: waveOpacity,
              },
            ]}
          />
        )}
        <Animated.View
          style={{
            transform: [{ scale: state === "listening" ? pulseAnim : 1 }],
          }}
        >
          <Pressable
            style={[
              styles.button,
              {
                width: buttonSize,
                height: buttonSize,
                borderRadius: buttonSize / 2,
                backgroundColor: getButtonColor(),
              },
              disabled && styles.buttonDisabled,
            ]}
            onPress={handlePress}
            disabled={disabled || state === "processing"}
          >
            {micIcon ?? (
              <Text style={[styles.micIcon, { fontSize: iconSize }]}>
                {state === "listening" ? "◼" : "🎤"}
              </Text>
            )}
          </Pressable>
        </Animated.View>
      </View>

      {/* Status text */}
      <Text
        style={[
          styles.statusText,
          { color: state === "error" ? errorColor : mutedColor },
        ]}
      >
        {renderStatusText()}
      </Text>

      {/* Cancel button when listening */}
      {(state === "listening" || state === "processing") && onCancel && (
        <Pressable style={styles.cancelButton} onPress={onCancel}>
          <Text style={[styles.cancelText, { color: mutedColor }]}>Cancel</Text>
        </Pressable>
      )}
    </View>
  )
}

// ============================================
// VoiceInputInline (for text input integration)
// ============================================

export interface VoiceInputInlineProps {
  /**
   * Current state of the voice input
   */
  state: VoiceInputState
  /**
   * Callback when the microphone button is pressed
   */
  onPress: () => void
  /**
   * Whether the input is disabled
   */
  disabled?: boolean
  /**
   * Style for the button
   */
  style?: ViewStyle
}

export function VoiceInputInline({
  state,
  onPress,
  disabled = false,
  style,
}: VoiceInputInlineProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const mutedColor = colors.container.fgAlt

  const isActive = state === "listening" || state === "processing"

  return (
    <Pressable
      style={[
        styles.inlineButton,
        { backgroundColor: isActive ? colors.destructive.bg : "transparent" },
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || state === "processing"}
    >
      <Text
        style={[
          styles.inlineIcon,
          { color: isActive ? colors.destructive.fg : mutedColor },
        ]}
      >
        {state === "listening" ? "◼" : "🎤"}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: sp.xs,
  },
  transcriptContainer: {
    width: "100%",
    padding: sp.xs,
    borderWidth: 1,
    borderRadius: curves.xs,
    minHeight: 60,
  },
  transcript: {
    fontSize: fontSizes.base,
    lineHeight: 22,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  wave: {
    position: "absolute",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  micIcon: {
    color: "#ffffff",
  },
  statusText: {
    fontSize: fontSizes.sm,
    textAlign: "center",
  },
  cancelButton: {
    paddingVertical: sp.xxs,
    paddingHorizontal: sp.xs,
  },
  cancelText: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
  },
  inlineButton: {
    width: sz.lg,
    height: sz.lg,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  inlineIcon: {
    fontSize: 18,
  },
})
