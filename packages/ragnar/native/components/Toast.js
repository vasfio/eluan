import React, { useEffect, useRef, createContext, useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet, useColorScheme, Animated, Pressable, Dimensions, } from "react-native";
import { spacing, radii, fontSizes } from "@ragnar/tokens";
export function Toast({ id: _id, title, description, variant = "default", duration = 4000, action, onDismiss, style, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        // Animate in
        Animated.parallel([
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                tension: 60,
                friction: 10,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
        // Auto dismiss
        if (duration > 0) {
            const timer = setTimeout(() => {
                dismiss();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration]);
    const dismiss = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onDismiss?.();
        });
    };
    const variantStyles = {
        default: {
            container: {
                backgroundColor: isDark ? "#27272a" : "#ffffff",
                borderColor: isDark ? "#3f3f46" : "#e4e4e7",
            },
            icon: "ℹ️",
            iconColor: isDark ? "#fafafa" : "#18181b",
        },
        success: {
            container: {
                backgroundColor: isDark ? "#14532d" : "#dcfce7",
                borderColor: isDark ? "#166534" : "#bbf7d0",
            },
            icon: "✓",
            iconColor: "#22c55e",
        },
        warning: {
            container: {
                backgroundColor: isDark ? "#78350f" : "#fef3c7",
                borderColor: isDark ? "#92400e" : "#fde68a",
            },
            icon: "⚠",
            iconColor: "#f59e0b",
        },
        destructive: {
            container: {
                backgroundColor: isDark ? "#7f1d1d" : "#fee2e2",
                borderColor: isDark ? "#991b1b" : "#fecaca",
            },
            icon: "✕",
            iconColor: "#ef4444",
        },
        info: {
            container: {
                backgroundColor: isDark ? "#1e3a5f" : "#dbeafe",
                borderColor: isDark ? "#1e40af" : "#bfdbfe",
            },
            icon: "ℹ",
            iconColor: "#3b82f6",
        },
    };
    const currentVariant = variantStyles[variant];
    return (<Animated.View style={[
            styles.toast,
            currentVariant.container,
            { transform: [{ translateY }], opacity },
            style,
        ]}>
      <View style={styles.toastContent}>
        <Text style={[styles.icon, { color: currentVariant.iconColor }]}>
          {currentVariant.icon}
        </Text>
        <View style={styles.textContainer}>
          <Text style={[
            styles.title,
            { color: isDark ? "#fafafa" : "#18181b" },
        ]}>
            {title}
          </Text>
          {description && (<Text style={[
                styles.description,
                { color: isDark ? "#a1a1aa" : "#71717a" },
            ]}>
              {description}
            </Text>)}
        </View>
        {action && (<Pressable onPress={action.onPress} style={styles.action}>
            <Text style={[
                styles.actionText,
                { color: isDark ? "#fafafa" : "#18181b" },
            ]}>
              {action.label}
            </Text>
          </Pressable>)}
        <Pressable onPress={dismiss} style={styles.close}>
          <Text style={{ color: isDark ? "#71717a" : "#a1a1aa", fontSize: 18 }}>
            ×
          </Text>
        </Pressable>
      </View>
    </Animated.View>);
}
const ToastContext = createContext(null);
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
// Convenience methods
export function useToastActions() {
    const { addToast, removeAllToasts } = useToast();
    return {
        toast: (props) => addToast(props),
        success: (title, description) => addToast({ title, description, variant: "success" }),
        error: (title, description) => addToast({ title, description, variant: "destructive" }),
        warning: (title, description) => addToast({ title, description, variant: "warning" }),
        info: (title, description) => addToast({ title, description, variant: "info" }),
        dismiss: removeAllToasts,
    };
}
export function ToastProvider({ children, position = "top", maxToasts = 3, }) {
    const [toasts, setToasts] = useState([]);
    const addToast = useCallback((toast) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        setToasts((prev) => {
            const newToasts = [{ ...toast, id }, ...prev];
            return newToasts.slice(0, maxToasts);
        });
        return id;
    }, [maxToasts]);
    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);
    const removeAllToasts = useCallback(() => {
        setToasts([]);
    }, []);
    return (<ToastContext.Provider value={{ toasts, addToast, removeToast, removeAllToasts }}>
      {children}
      <ToastContainer position={position} toasts={toasts} onDismiss={removeToast}/>
    </ToastContext.Provider>);
}
function ToastContainer({ position, toasts, onDismiss }) {
    if (toasts.length === 0)
        return null;
    const { width } = Dimensions.get("window");
    return (<View style={[
            styles.container,
            position === "top" ? styles.containerTop : styles.containerBottom,
            { width },
        ]} pointerEvents="box-none">
      {toasts.map((toast) => (<Toast key={toast.id} {...toast} onDismiss={() => onDismiss(toast.id)}/>))}
    </View>);
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
        paddingHorizontal: spacing[4],
        gap: spacing[2],
        zIndex: 9999,
    },
    containerTop: {
        top: 60, // Account for status bar
    },
    containerBottom: {
        bottom: 40,
    },
    toast: {
        width: "100%",
        maxWidth: 400,
        borderRadius: radii.lg,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },
    toastContent: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: spacing[3],
        gap: spacing[2],
    },
    icon: {
        fontSize: 16,
        marginTop: 2,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: fontSizes.sm,
        fontWeight: "600",
    },
    description: {
        fontSize: fontSizes.xs,
        marginTop: 2,
    },
    action: {
        paddingHorizontal: spacing[2],
        paddingVertical: spacing[1],
        borderRadius: radii.sm,
    },
    actionText: {
        fontSize: fontSizes.xs,
        fontWeight: "600",
    },
    close: {
        padding: spacing[1],
    },
});
//# sourceMappingURL=Toast.js.map