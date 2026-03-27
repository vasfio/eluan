import React from "react";
import { Pressable, Text, StyleSheet, useColorScheme, Platform, } from "react-native";
import { spacing, radii, fontSizes } from "@ragnar/tokens";
export function BackButton({ label = "Back", showLabel = Platform.OS === "ios", icon, style, labelStyle, disabled, ...props }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const primaryColor = isDark ? "#60a5fa" : "#3b82f6";
    const disabledColor = isDark ? "#52525b" : "#a1a1aa";
    const renderIcon = () => {
        if (icon)
            return icon;
        // Default chevron left icon
        return (<Text style={[
                styles.icon,
                { color: disabled ? disabledColor : primaryColor },
            ]}>
        ‹
      </Text>);
    };
    return (<Pressable disabled={disabled} style={({ pressed }) => [
            styles.container,
            pressed && styles.pressed,
            disabled && styles.disabled,
            style,
        ]} accessibilityRole="button" accessibilityLabel={label || "Go back"} {...props}>
      {renderIcon()}
      {showLabel && label && (<Text style={[
                styles.label,
                { color: disabled ? disabledColor : primaryColor },
                labelStyle,
            ]}>
          {label}
        </Text>)}
    </Pressable>);
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: spacing[2],
        paddingHorizontal: spacing[1],
        borderRadius: radii.sm,
    },
    pressed: {
        opacity: 0.7,
    },
    disabled: {
        opacity: 0.5,
    },
    icon: {
        fontSize: 28,
        fontWeight: "300",
        marginRight: spacing[0.5],
        marginTop: -2,
    },
    label: {
        fontSize: fontSizes.base,
        fontWeight: "400",
    },
});
//# sourceMappingURL=BackButton.js.map