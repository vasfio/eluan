import React from "react";
import { RefreshControl, ScrollView, FlatList, SectionList, StyleSheet, useColorScheme, } from "react-native";
/**
 * Hook to create a RefreshControl with consistent styling
 */
export function usePullToRefresh({ refreshing, onRefresh, color, backgroundColor, title, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const defaultColor = color ?? (isDark ? "#60a5fa" : "#3b82f6");
    const defaultBackgroundColor = backgroundColor ?? (isDark ? "#18181b" : "#ffffff");
    return (<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[defaultColor]} // Android
     tintColor={defaultColor} // iOS
     progressBackgroundColor={defaultBackgroundColor} // Android
     title={title} // iOS
     titleColor={isDark ? "#a1a1aa" : "#71717a"} // iOS
    />);
}
export function RefreshableScrollView({ refreshing, onRefresh, color, backgroundColor, title, children, style, contentContainerStyle, ...props }) {
    const refreshControl = usePullToRefresh({
        refreshing,
        onRefresh,
        color,
        backgroundColor,
        title,
    });
    return (<ScrollView style={style} contentContainerStyle={[styles.scrollContent, contentContainerStyle]} refreshControl={refreshControl} {...props}>
      {children}
    </ScrollView>);
}
export function RefreshableFlatList({ refreshing, onRefresh, color, backgroundColor, title, style, contentContainerStyle, ...props }) {
    const refreshControl = usePullToRefresh({
        refreshing,
        onRefresh,
        color,
        backgroundColor,
        title,
    });
    return (<FlatList style={style} contentContainerStyle={[styles.listContent, contentContainerStyle]} refreshControl={refreshControl} {...props}/>);
}
export function RefreshableSectionList({ refreshing, onRefresh, color, backgroundColor, title, style, contentContainerStyle, ...props }) {
    const refreshControl = usePullToRefresh({
        refreshing,
        onRefresh,
        color,
        backgroundColor,
        title,
    });
    return (<SectionList style={style} contentContainerStyle={[styles.listContent, contentContainerStyle]} refreshControl={refreshControl} {...props}/>);
}
const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
    },
    listContent: {
        flexGrow: 1,
    },
});
//# sourceMappingURL=PullToRefresh.js.map