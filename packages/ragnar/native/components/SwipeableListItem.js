import React, { useRef } from "react";
import { Animated, PanResponder, Pressable, StyleSheet, View, Text, useColorScheme, } from "react-native";
import { spacing, fontSizes } from "@ragnar/tokens";
export function SwipeableListItem({ children, leftActions = [], rightActions = [], actionWidth = 80, onPress, disabled = false, style, swipeThreshold = 0.5, autoClose = true, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const translateX = useRef(new Animated.Value(0)).current;
    const itemWidth = useRef(0);
    const leftActionsWidth = leftActions.length * actionWidth;
    const rightActionsWidth = rightActions.length * actionWidth;
    const handleLayout = (e) => {
        itemWidth.current = e.nativeEvent.layout.width;
    };
    const closeSwipe = () => {
        Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            damping: 20,
            stiffness: 200,
        }).start();
    };
    const handleActionPress = (action) => {
        action.onPress();
        if (autoClose) {
            closeSwipe();
        }
    };
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gestureState) => {
            // Only respond to horizontal swipes
            return !disabled && Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
        },
        onPanResponderMove: (_, gestureState) => {
            let newX = gestureState.dx;
            // Limit swipe distance
            if (newX > 0 && rightActions.length > 0) {
                // Swiping right (revealing left actions)
                newX = Math.min(newX, rightActionsWidth);
            }
            else if (newX < 0 && leftActions.length > 0) {
                // Swiping left (revealing right actions)
                newX = Math.max(newX, -leftActionsWidth);
            }
            else {
                // No actions on this side
                newX = 0;
            }
            translateX.setValue(newX);
        },
        onPanResponderRelease: (_, gestureState) => {
            const { dx, vx } = gestureState;
            // Determine if we should snap open or closed
            let targetX = 0;
            if (dx > 0 && rightActions.length > 0) {
                // Swiping right
                if (dx > rightActionsWidth * swipeThreshold || vx > 0.5) {
                    targetX = rightActionsWidth;
                }
            }
            else if (dx < 0 && leftActions.length > 0) {
                // Swiping left
                if (Math.abs(dx) > leftActionsWidth * swipeThreshold || vx < -0.5) {
                    targetX = -leftActionsWidth;
                }
            }
            Animated.spring(translateX, {
                toValue: targetX,
                useNativeDriver: true,
                damping: 20,
                stiffness: 200,
            }).start();
        },
    })).current;
    const renderActions = (actions, side) => {
        return (<View style={[
                styles.actionsContainer,
                side === "left" ? styles.leftActions : styles.rightActions,
                { width: actions.length * actionWidth },
            ]}>
        {actions.map((action) => (<Pressable key={action.key} style={[
                    styles.action,
                    { backgroundColor: action.color, width: actionWidth },
                ]} onPress={() => handleActionPress(action)}>
            {action.icon && <View style={styles.actionIcon}>{action.icon}</View>}
            <Text style={[
                    styles.actionLabel,
                    { color: action.textColor ?? "#ffffff" },
                ]} numberOfLines={1}>
              {action.label}
            </Text>
          </Pressable>))}
      </View>);
    };
    return (<View style={[styles.container, style]} onLayout={handleLayout}>
      {/* Background actions */}
      {rightActions.length > 0 && renderActions(rightActions, "left")}
      {leftActions.length > 0 && renderActions(leftActions, "right")}

      {/* Main content */}
      <Animated.View style={[
            styles.content,
            {
                backgroundColor: isDark ? "#18181b" : "#ffffff",
                transform: [{ translateX }],
            },
        ]} {...panResponder.panHandlers}>
        {onPress ? (<Pressable onPress={onPress} style={styles.pressable}>
            {children}
          </Pressable>) : (children)}
      </Animated.View>
    </View>);
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
        paddingHorizontal: spacing[2],
    },
    actionIcon: {
        marginBottom: spacing[1],
    },
    actionLabel: {
        fontSize: fontSizes.xs,
        fontWeight: "600",
        textAlign: "center",
    },
});
//# sourceMappingURL=SwipeableListItem.js.map