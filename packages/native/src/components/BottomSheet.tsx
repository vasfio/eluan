import React, { useCallback, useEffect, useRef } from "react"
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { spacing, radii } from "@vasf/ragnar-tokens"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

export interface BottomSheetProps {
  /**
   * Whether the bottom sheet is visible
   */
  visible: boolean
  /**
   * Callback when the sheet is closed
   */
  onClose: () => void
  /**
   * Content to render inside the sheet
   */
  children: React.ReactNode
  /**
   * Height of the sheet as a percentage of screen height (0-1)
   * @default 0.5
   */
  snapPoint?: number
  /**
   * Whether to show the drag handle
   * @default true
   */
  showHandle?: boolean
  /**
   * Whether to close when tapping the backdrop
   * @default true
   */
  closeOnBackdropPress?: boolean
  /**
   * Whether the sheet can be dragged to close
   * @default true
   */
  enableDrag?: boolean
  /**
   * Style for the sheet container
   */
  style?: ViewStyle
}

export function BottomSheet({
  visible,
  onClose,
  children,
  snapPoint = 0.5,
  showHandle = true,
  closeOnBackdropPress = true,
  enableDrag = true,
  style,
}: BottomSheetProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current
  const sheetHeight = SCREEN_HEIGHT * snapPoint

  const openSheet = useCallback(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 150,
    }).start()
  }, [translateY])

  const closeSheet = useCallback(() => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose()
    })
  }, [translateY, onClose])

  useEffect(() => {
    if (visible) {
      openSheet()
    }
  }, [visible, openSheet])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => enableDrag,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return enableDrag && Math.abs(gestureState.dy) > 5
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > sheetHeight * 0.3 || gestureState.vy > 0.5) {
          closeSheet()
        } else {
          openSheet()
        }
      },
    })
  ).current

  const backdropOpacity = translateY.interpolate({
    inputRange: [0, sheetHeight],
    outputRange: [0.5, 0],
    extrapolate: "clamp",
  })

  if (!visible) return null

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeSheet}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.wrapper}
      >
        <Animated.View
          style={[
            styles.backdrop,
            { opacity: backdropOpacity },
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeOnBackdropPress ? closeSheet : undefined}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            {
              height: sheetHeight,
              backgroundColor: isDark ? "#18181b" : "#ffffff",
              transform: [{ translateY }],
            },
            style,
          ]}
          {...panResponder.panHandlers}
        >
          {showHandle && (
            <View style={styles.handleContainer}>
              <View
                style={[
                  styles.handle,
                  { backgroundColor: isDark ? "#3f3f46" : "#d4d4d8" },
                ]}
              />
            </View>
          )}
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
  },
  sheet: {
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 16,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: spacing[3],
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[4],
  },
})
