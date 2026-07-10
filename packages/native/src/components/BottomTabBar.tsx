import React from "react"
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from "react-native"
import { fontSizes } from "@eluan/tokens"
import { sp, getSemanticColors } from "../utils/styles"

export interface TabItem {
  /**
   * Unique key for the tab
   */
  key: string
  /**
   * Label to display
   */
  label: string
  /**
   * Icon component (receives { focused, color, size })
   */
  icon?: (props: { focused: boolean; color: string; size: number }) => React.ReactNode
  /**
   * Badge count to show
   */
  badge?: number
}

export interface BottomTabBarProps {
  /**
   * Array of tab items
   */
  tabs: TabItem[]
  /**
   * Currently active tab key
   */
  activeTab: string
  /**
   * Callback when a tab is pressed
   */
  onTabPress: (key: string) => void
  /**
   * Whether to show labels
   * @default true
   */
  showLabels?: boolean
  /**
   * Style for the container
   */
  style?: ViewStyle
  /**
   * Style for each tab
   */
  tabStyle?: ViewStyle
  /**
   * Style for the label
   */
  labelStyle?: TextStyle
}

export function BottomTabBar({
  tabs,
  activeTab,
  onTabPress,
  showLabels = true,
  style,
  tabStyle,
  labelStyle,
}: BottomTabBarProps) {
  const colorScheme = useColorScheme() ?? "light"
  const colors = getSemanticColors(colorScheme)

  const activeColor = colors.informative.bg
  const inactiveColor = colors.container.fgAlt
  const backgroundColor = colors.container.bg
  const borderColor = colors.container.borderAlt

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, borderTopColor: borderColor },
        style,
      ]}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab
        const color = isActive ? activeColor : inactiveColor

        return (
          <Pressable
            key={tab.key}
            style={({ pressed }) => [
              styles.tab,
              pressed && styles.tabPressed,
              tabStyle,
            ]}
            onPress={() => onTabPress(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
          >
            <View style={styles.iconContainer}>
              {tab.icon?.({ focused: isActive, color, size: 24 })}
              {tab.badge !== undefined && tab.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={[styles.badgeText, { color: colors.destructive.fg }]}>
                    {tab.badge > 99 ? "99+" : tab.badge}
                  </Text>
                </View>
              )}
            </View>
            {showLabels && (
              <Text
                style={[
                  styles.label,
                  { color },
                  isActive && styles.labelActive,
                  labelStyle,
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            )}
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: sp.xs, // Safe area padding
    paddingTop: sp.xxs,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: sp.xxs,
  },
  tabPressed: {
    opacity: 0.7,
  },
  iconContainer: {
    position: "relative",
    marginBottom: sp.xxs,
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
    paddingHorizontal: sp.xs,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
})
