import React, { useState } from "react"
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from "react-native"
import { spacing, radii, fontSizes } from "@ragnar/tokens"

export interface PickerOption<T = string> {
  /**
   * Display label
   */
  label: string
  /**
   * Value for this option
   */
  value: T
  /**
   * Whether this option is disabled
   */
  disabled?: boolean
  /**
   * Icon to show (render prop)
   */
  icon?: React.ReactNode
}

export interface NativePickerProps<T = string> {
  /**
   * Available options
   */
  options: PickerOption<T>[]
  /**
   * Currently selected value
   */
  value?: T
  /**
   * Callback when selection changes
   */
  onChange: (value: T) => void
  /**
   * Placeholder when no value selected
   */
  placeholder?: string
  /**
   * Title for the picker modal
   */
  title?: string
  /**
   * Whether the picker is disabled
   */
  disabled?: boolean
  /**
   * Style for the trigger container
   */
  style?: ViewStyle
  /**
   * Style for the trigger text
   */
  textStyle?: TextStyle
  /**
   * Custom trigger component
   */
  renderTrigger?: (props: {
    selectedOption?: PickerOption<T>
    onPress: () => void
    disabled: boolean
  }) => React.ReactNode
}

export function NativePicker<T = string>({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  title,
  disabled = false,
  style,
  textStyle,
  renderTrigger,
}: NativePickerProps<T>) {
  const [visible, setVisible] = useState(false)
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"

  const backgroundColor = isDark ? "#18181b" : "#ffffff"
  const borderColor = isDark ? "#27272a" : "#e4e4e7"
  const textColor = isDark ? "#fafafa" : "#18181b"
  const mutedColor = isDark ? "#a1a1aa" : "#71717a"
  const primaryColor = isDark ? "#60a5fa" : "#3b82f6"

  const selectedOption = options.find((opt) => opt.value === value)

  const handleSelect = (option: PickerOption<T>) => {
    if (option.disabled) return
    onChange(option.value)
    setVisible(false)
  }

  const openPicker = () => {
    if (!disabled) setVisible(true)
  }

  if (renderTrigger) {
    return (
      <>
        {renderTrigger({ selectedOption, onPress: openPicker, disabled })}
        <PickerModal />
      </>
    )
  }

  function PickerModal() {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor }]}>
            {title && (
              <View style={[styles.modalHeader, { borderBottomColor: borderColor }]}>
                <Text style={[styles.modalTitle, { color: textColor }]}>
                  {title}
                </Text>
              </View>
            )}
            <FlatList
              data={options}
              keyExtractor={(item, index) => `${item.value}-${index}`}
              renderItem={({ item }) => {
                const isSelected = item.value === value

                return (
                  <Pressable
                    style={[
                      styles.option,
                      isSelected && { backgroundColor: isDark ? "#27272a" : "#f4f4f5" },
                      item.disabled && styles.optionDisabled,
                    ]}
                    onPress={() => handleSelect(item)}
                    disabled={item.disabled}
                  >
                    {item.icon && (
                      <View style={styles.optionIcon}>{item.icon}</View>
                    )}
                    <Text
                      style={[
                        styles.optionLabel,
                        { color: item.disabled ? mutedColor : textColor },
                        isSelected && { color: primaryColor, fontWeight: "600" },
                      ]}
                    >
                      {item.label}
                    </Text>
                    {isSelected && (
                      <Text style={[styles.checkmark, { color: primaryColor }]}>
                        ✓
                      </Text>
                    )}
                  </Pressable>
                )
              }}
              ItemSeparatorComponent={() => (
                <View style={[styles.separator, { backgroundColor: borderColor }]} />
              )}
            />
            <Pressable
              style={[styles.cancelButton, { borderTopColor: borderColor }]}
              onPress={() => setVisible(false)}
            >
              <Text style={[styles.cancelText, { color: primaryColor }]}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    )
  }

  return (
    <>
      <Pressable
        style={[
          styles.trigger,
          { backgroundColor, borderColor },
          disabled && styles.triggerDisabled,
          style,
        ]}
        onPress={openPicker}
        disabled={disabled}
      >
        <Text
          style={[
            styles.triggerText,
            { color: selectedOption ? textColor : mutedColor },
            textStyle,
          ]}
          numberOfLines={1}
        >
          {selectedOption?.label ?? placeholder}
        </Text>
        <Text style={[styles.chevron, { color: mutedColor }]}>›</Text>
      </Pressable>
      <PickerModal />
    </>
  )
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    paddingHorizontal: spacing[4],
    borderWidth: 1,
    borderRadius: radii.lg,
  },
  triggerDisabled: {
    opacity: 0.5,
  },
  triggerText: {
    flex: 1,
    fontSize: fontSizes.base,
  },
  chevron: {
    fontSize: 20,
    fontWeight: "300",
    transform: [{ rotate: "90deg" }],
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing[4],
  },
  modalContent: {
    width: "100%",
    maxHeight: "70%",
    borderRadius: radii.xl,
    overflow: "hidden",
  },
  modalHeader: {
    padding: spacing[4],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    minHeight: 52,
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionIcon: {
    marginRight: spacing[3],
  },
  optionLabel: {
    flex: 1,
    fontSize: fontSizes.base,
  },
  checkmark: {
    fontSize: 18,
    fontWeight: "600",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
  cancelButton: {
    paddingVertical: spacing[4],
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  cancelText: {
    fontSize: fontSizes.base,
    fontWeight: "600",
    textAlign: "center",
  },
})
