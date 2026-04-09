import React, { useRef } from "react"
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  useColorScheme,
  LayoutChangeEvent,
} from "react-native"
import { fontSizes } from "@vasf/ragnar-tokens"
import { sp, getSemanticColors } from "../utils/styles"

export interface SwipeAction {
  /**
   * Unique key for the action
   */
  key: string
  /**
   * Label to display
   */
  label: string
  /**
   * Icon component
   */
  icon?: React.ReactNode
  /**
   * Background color for the action
   */
  color: string
  /**
   * Text color
   * @default "#ffffff"
   */
  textColor?: string
  /**
   * Callback when action is triggered
   */
  onPress: () => void
}

export interface SwipeableListItemProps {
  /**
   * Content to render in the list item
   */
  children: React.ReactNode
  /**
   * Actions shown when swiping left (revealed on right side)
   */
  leftActions?: SwipeAction[]
  /**
   * Actions shown when swiping right (revealed on left side)
   */
  rightActions?: SwipeAction[]
  /**
   * Width of each action button
   * @default 80
   */
  actionWidth?: number
  /**
   * Callback when item is pressed (not swiped)
   */
  onPress?: () => void
  /**
   * Whether swipe is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Style for the container
   */
  style?: ViewStyle
  /**
   * Threshold (0-1) to trigger full swipe action
   * @default 0.5
   */
  swipeThreshold?: number
  /**
   * Whether to auto-close after action press
   * @default true
   */
  autoClose?: boolean
}

export function SwipeableListItem({
  children,
  leftActions = [],
  rightActions = [],
  actionWidth = 80,
  onPress,
  disabled = false,
  style,
  swipeThreshold = 0.5,
  autoClose = true,
}: SwipeableListItemProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const translateX = useRef(new Animated.Value(0)).current
  const itemWidth = useRef(0)

  const leftActionsWidth = leftActions.length * actionWidth
  const rightActionsWidth = rightActions.length * actionWidth

  const handleLayout = (e: LayoutChangeEvent) => {
    itemWidth.current = e.nativeEvent.layout.width
  }

  const closeSwipe = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start()
  }

  const handleActionPress = (action: SwipeAction) => {
    action.onPress()
    if (autoClose) {
      closeSwipe()
    }
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal swipes
        return !disabled && Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10
      },
      onPanResponderMove: (_, gestureState) => {
        let newX = gestureState.dx

        // Limit swipe distance
        if (newX > 0 && rightActions.length > 0) {
          // Swiping right (revealing left actions)
          newX = Math.min(newX, rightActionsWidth)
        } else if (newX < 0 && leftActions.length > 0) {
          // Swiping left (revealing right actions)
          newX = Math.max(newX, -leftActionsWidth)
        } else {
          // No actions on this side
          newX = 0
        }

        translateX.setValue(newX)
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx, vx } = gestureState

        // Determine if we should snap open or closed
        let targetX = 0

        if (dx > 0 && rightActions.length > 0) {
          // Swiping right
          if (dx > rightActionsWidth * swipeThreshold || vx > 0.5) {
            targetX = rightActionsWidth
          }
        } else if (dx < 0 && leftActions.length > 0) {
          // Swiping left
          if (Math.abs(dx) > leftActionsWidth * swipeThreshold || vx < -0.5) {
            targetX = -leftActionsWidth
          }
        }

        Animated.spring(translateX, {
          toValue: targetX,
          useNativeDriver: true,
          damping: 20,
          stiffness: 200,
        }).start()
      },
    })
  ).current

  const renderActions = (actions: SwipeAction[], side: "left" | "right") => {
    return (
      <View
        style={[
          styles.actionsContainer,
          side === "left" ? styles.leftActions : styles.rightActions,
          { width: actions.length * actionWidth },
        ]}
      >
        {actions.map((action) => (
          <Pressable
            key={action.key}
            style={[
              styles.action,
              { backgroundColor: action.color, width: actionWidth },
            ]}
            onPress={() => handleActionPress(action)}
          >
            {action.icon && <View style={styles.actionIcon}>{action.icon}</View>}
            <Text
              style={[
                styles.actionLabel,
                { color: action.textColor ?? "#ffffff" },
              ]}
              numberOfLines={1}
            >
              {action.label}
            </Text>
          </Pressable>
        ))}
      </View>
    )
  }

  return (
    <View
      style={[styles.container, style]}
      onLayout={handleLayout}
    >
      {/* Background actions */}
      {rightActions.length > 0 && renderActions(rightActions, "left")}
      {leftActions.length > 0 && renderActions(leftActions, "right")}

      {/* Main content */}
      <Animated.View
        style={[
          styles.content,
          {
            backgroundColor: colors.container.bg,
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {onPress ? (
          <Pressable onPress={onPress} style={styles.pressable}>
            {children}
          </Pressable>
        ) : (
          children
        )}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
  },
  content: {
    zIndex: 1,
  },
  pressable: {
    flex: 1,
  },
  actionsContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    flexDirection: "row",
  },
  leftActions: {
    left: 0,
  },
  rightActions: {
    right: 0,
  },
  action: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: sp.xxs,
  },
  actionIcon: {
    marginBottom: sp.xxs,
  },
  actionLabel: {
    fontSize: fontSizes.xs,
    fontWeight: "600",
    textAlign: "center",
  },
})
