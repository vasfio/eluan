import React from "react";
import { View, Text, StyleSheet, useColorScheme, } from "react-native";
import { spacing, radii, fontSizes } from "@ragnar/tokens";
export function Badge({ children, variant = "default", size = "default", style, textStyle, dot = false, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const variantStyles = {
        default: {
            container: {
                backgroundColor: isDark ? "#fafafa" : "#18181b",
            },
            text: {
                color: isDark ? "#18181b" : "#fafafa",
            },
        },
        secondary: {
            container: {
                backgroundColor: isDark ? "#27272a" : "#f4f4f5",
            },
            text: {
                color: isDark ? "#fafafa" : "#18181b",
            },
        },
        destructive: {
            container: {
                backgroundColor: isDark ? "#7f1d1d" : "#ef4444",
            },
            text: {
                color: "#fafafa",
            },
        },
        outline: {
            container: {
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: isDark ? "#27272a" : "#e4e4e7",
            },
            text: {
                color: isDark ? "#fafafa" : "#18181b",
            },
        },
        success: {
            container: {
                backgroundColor: isDark ? "#14532d" : "#22c55e",
            },
            text: {
                color: "#fafafa",
            },
        },
        warning: {
            container: {
                backgroundColor: isDark ? "#78350f" : "#f59e0b",
            },
            text: {
                color: isDark ? "#fafafa" : "#18181b",
            },
        },
    };
    const sizeStyles = {
        sm: {
            container: {
                paddingHorizontal: spacing[1.5] || 6,
                paddingVertical: 2,
                borderRadius: radii.sm,
            },
            text: {
                fontSize: fontSizes.xs,
            },
            dot: 6,
        },
        default: {
            container: {
                paddingHorizontal: spacing[2],
                paddingVertical: spacing[0.5] || 2,
                borderRadius: radii.full,
            },
            text: {
                fontSize: fontSizes.xs,
            },
            dot: 8,
        },
        lg: {
            container: {
                paddingHorizontal: spacing[3],
                paddingVertical: spacing[1],
                borderRadius: radii.full,
            },
            text: {
                fontSize: fontSizes.sm,
            },
            dot: 10,
        },
    };
    const currentVariant = variantStyles[variant];
    const currentSize = sizeStyles[size];
    if (dot) {
        return (<View style={[
                styles.dot,
                currentVariant.container,
                {
                    width: currentSize.dot,
                    height: currentSize.dot,
                    borderRadius: currentSize.dot / 2,
                },
                style,
            ]}/>);
    }
    return (<View style={[
            styles.container,
            currentVariant.container,
            currentSize.container,
            style,
        ]}>
      {typeof children === "string" ? (<Text style={[
                styles.text,
                currentVariant.text,
                currentSize.text,
                textStyle,
            ]}>
          {children}
        </Text>) : (children)}
    </View>);
}
export function NotificationBadge({ count = 0, max = 99, dot = false, hideZero = true, color = "destructive", children, style, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const colorStyles = {
        default: isDark ? "#fafafa" : "#18181b",
        destructive: "#ef4444",
        success: "#22c55e",
    };
    const shouldShow = dot || (hideZero ? count > 0 : true);
    const displayCount = count > max ? `${max}+` : count.toString();
    return (<View style={[styles.wrapper, style]}>
      {children}
      {shouldShow && (<View style={[
                styles.notification,
                { backgroundColor: colorStyles[color] },
                dot && styles.notificationDot,
            ]}>
          {!dot && (<Text style={styles.notificationText}>{displayCount}</Text>)}
        </View>)}
    </View>);
}
const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontWeight: "500",
    },
    dot: {
    // Just a dot
    },
    wrapper: {
        position: "relative",
    },
    notification: {
        position: "absolute",
        top: -4,
        right: -4,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4,
        borderWidth: 2,
        borderColor: "#ffffff",
    },
    notificationDot: {
        minWidth: 10,
        height: 10,
        borderRadius: 5,
        paddingHorizontal: 0,
    },
    notificationText: {
        color: "#ffffff",
        fontSize: 10,
        fontWeight: "bold",
    },
});
//# sourceMappingURL=Badge.js.map