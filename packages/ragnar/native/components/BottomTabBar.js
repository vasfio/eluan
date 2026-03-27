import React from "react";
import { View, Text, Pressable, StyleSheet, useColorScheme, } from "react-native";
import { spacing, fontSizes } from "@ragnar/tokens";
export function BottomTabBar({ tabs, activeTab, onTabPress, showLabels = true, style, tabStyle, labelStyle, }) {
    const colorScheme = useColorScheme() ?? "light";
    const isDark = colorScheme === "dark";
    const activeColor = isDark ? "#60a5fa" : "#3b82f6";
    const inactiveColor = isDark ? "#71717a" : "#a1a1aa";
    const backgroundColor = isDark ? "#18181b" : "#ffffff";
    const borderColor = isDark ? "#27272a" : "#e4e4e7";
    return (<View style={[
            styles.container,
            { backgroundColor, borderTopColor: borderColor },
            style,
        ]}>
      {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            const color = isActive ? activeColor : inactiveColor;
            return (<Pressable key={tab.key} style={({ pressed }) => [
                    styles.tab,
                    pressed && styles.tabPressed,
                    tabStyle,
                ]} onPress={() => onTabPress(tab.key)} accessibilityRole="tab" accessibilityState={{ selected: isActive }} accessibilityLabel={tab.label}>
            <View style={styles.iconContainer}>
              {tab.icon?.({ focused: isActive, color, size: 24 })}
              {tab.badge !== undefined && tab.badge > 0 && (<View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {tab.badge > 99 ? "99+" : tab.badge}
                  </Text>
                </View>)}
            </View>
            {showLabels && (<Text style={[
                        styles.label,
                        { color },
                        isActive && styles.labelActive,
                        labelStyle,
                    ]} numberOfLines={1}>
                {tab.label}
              </Text>)}
          </Pressable>);
        })}
    </View>);
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingBottom: spacing[4], // Safe area padding
        paddingTop: spacing[2],
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing[1],
    },
    tabPressed: {
        opacity: 0.7,
    },
    iconContainer: {
        position: "relative",
        marginBottom: spacing[1],
    },
    label: {
        fontSize: fontSizes.xs,
        fontWeight: "500",
    },
    labelActive: {
        fontWeight: "600",
    },
    badge: {
        position: "absolute",
        top: -4,
        right: -8,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "#ef4444",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4,
    },
    badgeText: {
        color: "#ffffff",
        fontSize: 10,
        fontWeight: "700",
    },
});
//# sourceMappingURL=BottomTabBar.js.map