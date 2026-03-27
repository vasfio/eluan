import React from "react";
import { View, StyleSheet, Platform, StatusBar, useColorScheme, } from "react-native";
// Approximate safe area insets for common devices
// In production, use react-native-safe-area-context for accurate values
const getApproximateInsets = () => {
    const statusBarHeight = StatusBar.currentHeight ?? (Platform.OS === "ios" ? 44 : 0);
    const bottomInset = Platform.OS === "ios" ? 34 : 0; // iPhone X+ home indicator
    return {
        top: statusBarHeight,
        bottom: bottomInset,
        left: 0,
        right: 0,
    };
};
export function SafeAreaView({ children, edges = ["top", "bottom", "left", "right"], backgroundColor, style, mode = "padding", ...props }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const defaultBackgroundColor = backgroundColor ?? (isDark ? "#09090b" : "#ffffff");
    const insets = getApproximateInsets();
    const safeAreaStyle = {};
    const prefix = mode === "padding" ? "padding" : "margin";
    if (edges.includes("top")) {
        safeAreaStyle[`${prefix}Top`] = insets.top;
    }
    if (edges.includes("bottom")) {
        safeAreaStyle[`${prefix}Bottom`] = insets.bottom;
    }
    if (edges.includes("left")) {
        safeAreaStyle[`${prefix}Left`] = insets.left;
    }
    if (edges.includes("right")) {
        safeAreaStyle[`${prefix}Right`] = insets.right;
    }
    return (<View style={[
            styles.container,
            { backgroundColor: defaultBackgroundColor },
            safeAreaStyle,
            style,
        ]} {...props}>
      {children}
    </View>);
}
const SafeAreaContext = React.createContext(getApproximateInsets());
export function SafeAreaProvider({ children, insets }) {
    const defaultInsets = getApproximateInsets();
    const value = {
        ...defaultInsets,
        ...insets,
    };
    return (<SafeAreaContext.Provider value={value}>
      {children}
    </SafeAreaContext.Provider>);
}
/**
 * Hook to access safe area insets
 */
export function useSafeAreaInsets() {
    return React.useContext(SafeAreaContext);
}
export function SafeAreaInsetsConsumer({ children }) {
    const insets = useSafeAreaInsets();
    return <>{children(insets)}</>;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
//# sourceMappingURL=SafeAreaView.js.map