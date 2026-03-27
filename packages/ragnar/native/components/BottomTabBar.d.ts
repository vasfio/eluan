import React from "react";
import { ViewStyle, TextStyle } from "react-native";
export interface TabItem {
    /**
     * Unique key for the tab
     */
    key: string;
    /**
     * Label to display
     */
    label: string;
    /**
     * Icon component (receives { focused, color, size })
     */
    icon?: (props: {
        focused: boolean;
        color: string;
        size: number;
    }) => React.ReactNode;
    /**
     * Badge count to show
     */
    badge?: number;
}
export interface BottomTabBarProps {
    /**
     * Array of tab items
     */
    tabs: TabItem[];
    /**
     * Currently active tab key
     */
    activeTab: string;
    /**
     * Callback when a tab is pressed
     */
    onTabPress: (key: string) => void;
    /**
     * Whether to show labels
     * @default true
     */
    showLabels?: boolean;
    /**
     * Style for the container
     */
    style?: ViewStyle;
    /**
     * Style for each tab
     */
    tabStyle?: ViewStyle;
    /**
     * Style for the label
     */
    labelStyle?: TextStyle;
}
export declare function BottomTabBar({ tabs, activeTab, onTabPress, showLabels, style, tabStyle, labelStyle, }: BottomTabBarProps): React.JSX.Element;
//# sourceMappingURL=BottomTabBar.d.ts.map