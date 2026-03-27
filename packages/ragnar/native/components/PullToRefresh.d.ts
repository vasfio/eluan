import React from "react";
import { ViewStyle, ScrollViewProps, FlatListProps, SectionListProps } from "react-native";
export interface PullToRefreshProps {
    /**
     * Whether the refresh is currently in progress
     */
    refreshing: boolean;
    /**
     * Callback when refresh is triggered
     */
    onRefresh: () => void;
    /**
     * Color of the refresh indicator
     */
    color?: string;
    /**
     * Background color of the refresh indicator (iOS only)
     */
    backgroundColor?: string;
    /**
     * Title shown below the refresh indicator (iOS only)
     */
    title?: string;
}
/**
 * Hook to create a RefreshControl with consistent styling
 */
export declare function usePullToRefresh({ refreshing, onRefresh, color, backgroundColor, title, }: PullToRefreshProps): React.JSX.Element;
export interface RefreshableScrollViewProps extends Omit<ScrollViewProps, "refreshControl">, PullToRefreshProps {
    /**
     * Content container style
     */
    contentContainerStyle?: ViewStyle;
}
export declare function RefreshableScrollView({ refreshing, onRefresh, color, backgroundColor, title, children, style, contentContainerStyle, ...props }: RefreshableScrollViewProps): React.JSX.Element;
export interface RefreshableFlatListProps<T> extends Omit<FlatListProps<T>, "refreshControl" | "refreshing" | "onRefresh"> {
    /**
     * Whether the refresh is currently in progress
     */
    refreshing: boolean;
    /**
     * Callback when refresh is triggered
     */
    onRefresh: () => void;
    /**
     * Color of the refresh indicator
     */
    color?: string;
    /**
     * Background color of the refresh indicator (iOS only)
     */
    backgroundColor?: string;
    /**
     * Title shown below the refresh indicator (iOS only)
     */
    title?: string;
}
export declare function RefreshableFlatList<T>({ refreshing, onRefresh, color, backgroundColor, title, style, contentContainerStyle, ...props }: RefreshableFlatListProps<T>): React.JSX.Element;
export interface RefreshableSectionListProps<T, S> extends Omit<SectionListProps<T, S>, "refreshControl" | "refreshing" | "onRefresh"> {
    /**
     * Whether the refresh is currently in progress
     */
    refreshing: boolean;
    /**
     * Callback when refresh is triggered
     */
    onRefresh: () => void;
    /**
     * Color of the refresh indicator
     */
    color?: string;
    /**
     * Background color of the refresh indicator (iOS only)
     */
    backgroundColor?: string;
    /**
     * Title shown below the refresh indicator (iOS only)
     */
    title?: string;
}
export declare function RefreshableSectionList<T, S>({ refreshing, onRefresh, color, backgroundColor, title, style, contentContainerStyle, ...props }: RefreshableSectionListProps<T, S>): React.JSX.Element;
//# sourceMappingURL=PullToRefresh.d.ts.map