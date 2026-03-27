import React from "react";
import { Pressable, View, Text, StyleSheet, useColorScheme, } from "react-native";
import { spacing, fontSizes } from "@ragnar/tokens";
export function RadioGroup({ value, onValueChange, options, disabled = false, size = "default", direction = "vertical", style, radioPosition = "left", }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const sizeStyles = {
        sm: { outer: 16, inner: 8 },
        default: { outer: 20, inner: 10 },
        lg: { outer: 24, inner: 12 },
    };
    const currentSize = sizeStyles[size];
    const themedStyles = {
        outer: {
            borderColor: isDark ? "#71717a" : "#a1a1aa",
        },
        outerSelected: {
            borderColor: isDark ? "#fafafa" : "#18181b",
        },
        inner: {
            backgroundColor: isDark ? "#fafafa" : "#18181b",
        },
        label: {
            color: isDark ? "#fafafa" : "#18181b",
        },
        description: {
            color: isDark ? "#a1a1aa" : "#71717a",
        },
    };
    const handlePress = (optionValue) => {
        if (!disabled) {
            onValueChange?.(optionValue);
        }
    };
    return (<View style={[
            styles.group,
            direction === "horizontal" && styles.groupHorizontal,
            style,
        ]} accessibilityRole="radiogroup">
      {options.map((option) => {
            const isSelected = value === option.value;
            const isDisabled = disabled || option.disabled;
            const radioElement = (<View style={[
                    styles.outer,
                    themedStyles.outer,
                    isSelected && themedStyles.outerSelected,
                    { width: currentSize.outer, height: currentSize.outer },
                    isDisabled && styles.disabled,
                ]}>
            {isSelected && (<View style={[
                        styles.inner,
                        themedStyles.inner,
                        { width: currentSize.inner, height: currentSize.inner },
                    ]}/>)}
          </View>);
            const labelElement = (<View style={[
                    styles.labelContainer,
                    radioPosition === "left"
                        ? styles.labelContainerLeft
                        : styles.labelContainerRight,
                ]}>
            <Text style={[
                    styles.label,
                    themedStyles.label,
                    isDisabled && styles.labelDisabled,
                ]}>
              {option.label}
            </Text>
            {option.description && (<Text style={[
                        styles.description,
                        themedStyles.description,
                        isDisabled && styles.labelDisabled,
                    ]}>
                {option.description}
              </Text>)}
          </View>);
            return (<Pressable key={option.value} onPress={() => handlePress(option.value)} disabled={isDisabled} style={[
                    styles.item,
                    radioPosition === "right" && styles.itemReverse,
                ]} accessibilityRole="radio" accessibilityState={{ checked: isSelected, disabled: isDisabled }}>
            {radioPosition === "left" ? (<>
                {radioElement}
                {labelElement}
              </>) : (<>
                {labelElement}
                {radioElement}
              </>)}
          </Pressable>);
        })}
    </View>);
}
export function Radio({ selected = false, onPress, label, description, disabled = false, size = "default", style, labelStyle, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const sizeStyles = {
        sm: { outer: 16, inner: 8 },
        default: { outer: 20, inner: 10 },
        lg: { outer: 24, inner: 12 },
    };
    const currentSize = sizeStyles[size];
    const themedStyles = {
        outer: {
            borderColor: selected
                ? isDark
                    ? "#fafafa"
                    : "#18181b"
                : isDark
                    ? "#71717a"
                    : "#a1a1aa",
        },
        inner: {
            backgroundColor: isDark ? "#fafafa" : "#18181b",
        },
        label: {
            color: isDark ? "#fafafa" : "#18181b",
        },
        description: {
            color: isDark ? "#a1a1aa" : "#71717a",
        },
    };
    return (<Pressable onPress={onPress} disabled={disabled} style={[styles.item, style]} accessibilityRole="radio" accessibilityState={{ checked: selected, disabled }}>
      <View style={[
            styles.outer,
            themedStyles.outer,
            { width: currentSize.outer, height: currentSize.outer },
            disabled && styles.disabled,
        ]}>
        {selected && (<View style={[
                styles.inner,
                themedStyles.inner,
                { width: currentSize.inner, height: currentSize.inner },
            ]}/>)}
      </View>
      {(label || description) && (<View style={styles.labelContainer}>
          {label && (<Text style={[
                    styles.label,
                    themedStyles.label,
                    disabled && styles.labelDisabled,
                    labelStyle,
                ]}>
              {label}
            </Text>)}
          {description && (<Text style={[
                    styles.description,
                    themedStyles.description,
                    disabled && styles.labelDisabled,
                ]}>
              {description}
            </Text>)}
        </View>)}
    </Pressable>);
}
const styles = StyleSheet.create({
    group: {
        gap: spacing[3],
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
        marginLeft: spacing[2],
    },
    labelContainerRight: {
        marginRight: spacing[2],
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
});
//# sourceMappingURL=Radio.js.map