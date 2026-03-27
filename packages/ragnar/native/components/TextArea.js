import React, { forwardRef, useState } from "react";
import { TextInput, View, Text, StyleSheet, useColorScheme, } from "react-native";
import { spacing, radii, fontSizes } from "@ragnar/tokens";
export const TextArea = forwardRef(({ label, helperText, error, rows = 4, maxLength, showCount = false, containerStyle, style, labelStyle, disabled, autoGrow = false, maxHeight = 200, value, onFocus, onBlur, onContentSizeChange, ...props }, ref) => {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const [isFocused, setIsFocused] = useState(false);
    const [height, setHeight] = useState(undefined);
    const handleFocus = (e) => {
        setIsFocused(true);
        onFocus?.(e);
    };
    const handleBlur = (e) => {
        setIsFocused(false);
        onBlur?.(e);
    };
    const handleContentSizeChange = (e) => {
        if (autoGrow) {
            const newHeight = Math.min(e.nativeEvent.contentSize.height, maxHeight);
            setHeight(newHeight);
        }
        onContentSizeChange?.(e);
    };
    const lineHeight = 20; // approximate line height
    const minHeight = rows * lineHeight + spacing[4];
    const computedHeight = autoGrow ? height : undefined;
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
        count: {
            color: isDark ? "#71717a" : "#a1a1aa",
        },
    };
    const charCount = value?.length ?? 0;
    return (<View style={[styles.container, containerStyle]}>
        {label && (<Text style={[styles.label, themedStyles.label, labelStyle]}>
            {label}
          </Text>)}
        <TextInput ref={ref} multiline textAlignVertical="top" value={value} maxLength={maxLength} style={[
            styles.input,
            themedStyles.input,
            { minHeight, height: computedHeight },
            disabled && styles.disabled,
            style,
        ]} placeholderTextColor={themedStyles.placeholder} editable={!disabled} onFocus={handleFocus} onBlur={handleBlur} onContentSizeChange={handleContentSizeChange} {...props}/>
        <View style={styles.footer}>
          {(helperText || error) && (<Text style={[
                styles.helperText,
                error ? themedStyles.error : themedStyles.helperText,
            ]}>
              {error || helperText}
            </Text>)}
          {showCount && (<Text style={[styles.count, themedStyles.count]}>
              {charCount}
              {maxLength ? `/${maxLength}` : ""}
            </Text>)}
        </View>
      </View>);
});
TextArea.displayName = "TextArea";
const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    label: {
        fontSize: fontSizes.sm,
        fontWeight: "500",
        marginBottom: spacing[1],
    },
    input: {
        borderWidth: 1,
        borderRadius: radii.md,
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        fontSize: fontSizes.base,
    },
    helperText: {
        fontSize: fontSizes.xs,
        flex: 1,
    },
    disabled: {
        opacity: 0.5,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: spacing[1],
    },
    count: {
        fontSize: fontSizes.xs,
    },
});
//# sourceMappingURL=TextArea.js.map