import React, { forwardRef, useState } from "react";
import { TextInput, View, Text, StyleSheet, useColorScheme, Pressable, } from "react-native";
import { spacing, radii, fontSizes } from "@ragnar/tokens";
export const Input = forwardRef(({ label, helperText, error, leftElement, rightElement, containerStyle, style, labelStyle, disabled, onFocus, onBlur, ...props }, ref) => {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = (e) => {
        setIsFocused(true);
        onFocus?.(e);
    };
    const handleBlur = (e) => {
        setIsFocused(false);
        onBlur?.(e);
    };
    const themedStyles = {
        label: {
            color: isDark ? "#fafafa" : "#18181b",
        },
        input: {
            backgroundColor: isDark ? "#09090b" : "#ffffff",
            borderColor: error
                ? "#ef4444"
                : isFocused
                    ? isDark
                        ? "#fafafa"
                        : "#18181b"
                    : isDark
                        ? "#27272a"
                        : "#e4e4e7",
            color: isDark ? "#fafafa" : "#18181b",
        },
        placeholder: isDark ? "#71717a" : "#a1a1aa",
        helperText: {
            color: isDark ? "#a1a1aa" : "#71717a",
        },
        error: {
            color: "#ef4444",
        },
    };
    return (<View style={[styles.container, containerStyle]}>
        {label && (<Text style={[styles.label, themedStyles.label, labelStyle]}>
            {label}
          </Text>)}
        <View style={[
            styles.inputContainer,
            themedStyles.input,
            disabled && styles.disabled,
        ]}>
          {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
          <TextInput ref={ref} style={[
            styles.input,
            { color: themedStyles.input.color },
            leftElement ? styles.inputWithLeft : null,
            rightElement ? styles.inputWithRight : null,
            style,
        ]} placeholderTextColor={themedStyles.placeholder} editable={!disabled} onFocus={handleFocus} onBlur={handleBlur} {...props}/>
          {rightElement && (<View style={styles.rightElement}>{rightElement}</View>)}
        </View>
        {(helperText || error) && (<Text style={[
                styles.helperText,
                error ? themedStyles.error : themedStyles.helperText,
            ]}>
            {error || helperText}
          </Text>)}
      </View>);
});
Input.displayName = "Input";
export const PasswordInput = forwardRef(({ showToggle = true, rightElement, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const toggleElement = showToggle ? (<Pressable onPress={() => setVisible(!visible)} style={styles.toggleButton}>
        <Text style={{ color: isDark ? "#a1a1aa" : "#71717a", fontSize: 12 }}>
          {visible ? "Hide" : "Show"}
        </Text>
      </Pressable>) : (rightElement);
    return (<Input ref={ref} secureTextEntry={!visible} rightElement={toggleElement} {...props}/>);
});
PasswordInput.displayName = "PasswordInput";
export const SearchInput = forwardRef(({ onSearch, showClear = true, value, onClear, onSubmitEditing, ...props }, ref) => {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const handleSubmit = (e) => {
        onSearch?.(e.nativeEvent.text);
        onSubmitEditing?.(e);
    };
    const clearButton = showClear && value ? (<Pressable onPress={onClear} style={styles.clearButton}>
          <Text style={{ color: isDark ? "#71717a" : "#a1a1aa", fontSize: 16 }}>
            ×
          </Text>
        </Pressable>) : null;
    return (<Input ref={ref} value={value} placeholder="Search..." returnKeyType="search" onSubmitEditing={handleSubmit} rightElement={clearButton} {...props}/>);
});
SearchInput.displayName = "SearchInput";
const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    label: {
        fontSize: fontSizes.sm,
        fontWeight: "500",
        marginBottom: spacing[1],
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: radii.md,
        minHeight: 44,
    },
    input: {
        flex: 1,
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        fontSize: fontSizes.base,
    },
    inputWithLeft: {
        paddingLeft: 0,
    },
    inputWithRight: {
        paddingRight: 0,
    },
    leftElement: {
        paddingLeft: spacing[3],
    },
    rightElement: {
        paddingRight: spacing[3],
    },
    helperText: {
        fontSize: fontSizes.xs,
        marginTop: spacing[1],
    },
    disabled: {
        opacity: 0.5,
    },
    toggleButton: {
        paddingHorizontal: spacing[2],
        paddingVertical: spacing[1],
    },
    clearButton: {
        paddingHorizontal: spacing[2],
        paddingVertical: spacing[1],
    },
});
//# sourceMappingURL=Input.js.map