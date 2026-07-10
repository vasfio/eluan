import React, { useEffect, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  useColorScheme,
  Animated,
  Pressable,
  Modal,
  Dimensions,
} from "react-native"
import { fontSizes } from "@eluan/tokens"
import { sp, curves, getSemanticColors } from "../utils/styles"

export interface ActionSheetOption {
  /** Unique key for the option */
  key: string
  /** Display label */
  label: string
  /** Optional description */
  description?: string
  /** Icon element */
  icon?: React.ReactNode
  /** Destructive style (red) */
  destructive?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Called when option is pressed */
  onPress?: () => void
}

export interface ActionSheetProps {
  /** Whether the action sheet is visible */
  visible: boolean
  /** Called when action sheet should close */
  onClose: () => void
  /** Title of the action sheet */
  title?: string
  /** Description/message */
  message?: string
  /** Available options */
  options: ActionSheetOption[]
  /** Cancel button label */
  cancelLabel?: string
  /** Container style */
  style?: ViewStyle
}

export function ActionSheet({
  visible,
  onClose,
  title,
  message,
  options,
  cancelLabel = "Cancel",
  style,
}: ActionSheetProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"
  const colors = getSemanticColors(colorScheme)
  const translateY = useRef(new Animated.Value(400)).current
  const backdropOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 400,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible, translateY, backdropOpacity])

  const handleOptionPress = (option: ActionSheetOption) => {
    if (!option.disabled) {
      option.onPress?.()
      onClose()
    }
  }

  const themedStyles = {
    backdrop: {
      backgroundColor: isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.5)",
    },
    container: {
      backgroundColor: colors.container.bg,
    },
    title: {
      color: colors.container.fg,
    },
    message: {
      color: colors.container.fgAlt,
    },
    option: {
      backgroundColor: colors.actionSecondary.bg,
    },
    optionLabel: {
      color: colors.container.fg,
    },
    optionDescription: {
      color: colors.container.fgAlt,
    },
    destructive: {
      color: colors.destructive.bg,
    },
    disabled: {
      opacity: 0.5,
    },
    cancel: {
      backgroundColor: colors.actionSecondary.bg,
    },
    cancelText: {
      color: colors.container.fg,
    },
    separator: {
      backgroundColor: colors.container.border,
    },
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.backdrop,
            themedStyles.backdrop,
            { opacity: backdropOpacity },
          ]}
        >
          <Pressable style={styles.backdropPressable} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            themedStyles.container,
            { transform: [{ translateY }] },
            style,
          ]}
        >
          {(title || message) && (
            <View style={styles.header}>
              {title && (
                <Text style={[styles.title, themedStyles.title]}>{title}</Text>
              )}
              {message && (
                <Text style={[styles.message, themedStyles.message]}>
                  {message}
                </Text>
              )}
            </View>
          )}

          <View style={styles.options}>
            {options.map((option, index) => (
              <React.Fragment key={option.key}>
                {index > 0 && (
                  <View style={[styles.separator, themedStyles.separator]} />
                )}
                <Pressable
                  style={[
                    styles.option,
                    option.disabled && themedStyles.disabled,
                  ]}
                  onPress={() => handleOptionPress(option)}
                  disabled={option.disabled}
                >
                  {option.icon && (
                    <View style={styles.optionIcon}>{option.icon}</View>
                  )}
                  <View style={styles.optionText}>
                    <Text
                      style={[
                        styles.optionLabel,
                        option.destructive
                          ? themedStyles.destructive
                          : themedStyles.optionLabel,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {option.description && (
                      <Text
                        style={[
                          styles.optionDescription,
                          themedStyles.optionDescription,
                        ]}
                      >
                        {option.description}
                      </Text>
                    )}
                  </View>
                </Pressable>
              </React.Fragment>
            ))}
          </View>

          <View style={styles.cancelContainer}>
            <Pressable
              style={[styles.cancel, themedStyles.cancel]}
              onPress={onClose}
            >
              <Text style={[styles.cancelText, themedStyles.cancelText]}>
                {cancelLabel}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

// Hook for imperative action sheet usage
export function useActionSheet() {
  const [state, setState] = React.useState<{
    visible: boolean
    props: Omit<ActionSheetProps, "visible" | "onClose">
  }>({
    visible: false,
    props: { options: [] },
  })

  const show = React.useCallback(
    (props: Omit<ActionSheetProps, "visible" | "onClose">) => {
      setState({ visible: true, props })
    },
    []
  )

  const hide = React.useCallback(() => {
    setState((prev) => ({ ...prev, visible: false }))
  }, [])

  const ActionSheetComponent = React.useCallback(
    () => (
      <ActionSheet
        visible={state.visible}
        onClose={hide}
        {...state.props}
      />
    ),
    [state.visible, state.props, hide]
  )

  return {
    show,
    hide,
    ActionSheet: ActionSheetComponent,
  }
}

const { height: screenHeight } = Dimensions.get("window")

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropPressable: {
    flex: 1,
  },
  sheet: {
    borderTopLeftRadius: curves.sm,
    borderTopRightRadius: curves.sm,
    paddingTop: sp.xxs,
    paddingBottom: sp.sm,
    maxHeight: screenHeight * 0.8,
  },
  header: {
    paddingHorizontal: sp.xs,
    paddingVertical: sp.xs,
    alignItems: "center",
  },
  title: {
    fontSize: fontSizes.base,
    fontWeight: "600",
    textAlign: "center",
  },
  message: {
    fontSize: fontSizes.sm,
    textAlign: "center",
    marginTop: sp.xxs,
  },
  options: {
    paddingHorizontal: sp.xs,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: sp.xs,
    paddingHorizontal: sp.xs,
  },
  optionIcon: {
    marginRight: sp.xs,
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: fontSizes.base,
    fontWeight: "500",
  },
  optionDescription: {
    fontSize: fontSizes.sm,
    marginTop: sp.xxs,
  },
  separator: {
    height: 1,
    marginHorizontal: sp.xs,
  },
  cancelContainer: {
    paddingHorizontal: sp.xs,
    paddingTop: sp.xs,
    marginTop: sp.xxs,
  },
  cancel: {
    paddingVertical: sp.xs,
    borderRadius: curves.xs,
    alignItems: "center",
  },
  cancelText: {
    fontSize: fontSizes.base,
    fontWeight: "600",
  },
})
