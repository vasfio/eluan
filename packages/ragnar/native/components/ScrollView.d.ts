import React from "react";
import { ScrollViewProps as RNScrollViewProps } from "react-native";
export interface ScrollViewProps extends RNScrollViewProps {
    /**
     * Background color (defaults to theme background)
     */
    backgroundColor?: string;
    /**
     * Whether to show scroll indicators
     * @default true
     */
    showsIndicators?: boolean;
    /**
     * Padding for the content
     */
    padding?: number;
    /**
     * Horizontal padding for the content
     */
    paddingHorizontal?: number;
    /**
     * Vertical padding for the content
     */
    paddingVertical?: number;
}
export declare function ScrollView({ backgroundColor, showsIndicators, padding, paddingHorizontal, paddingVertical, children, style, contentContainerStyle, ...props }: ScrollViewProps): React.JSX.Element;
export interface KeyboardAwareScrollViewProps extends ScrollViewProps {
    /**
     * Extra height to add when keyboard is visible
     * @default 20
     */
    extraScrollHeight?: number;
}
export declare function KeyboardAwareScrollView({ extraScrollHeight, ...props }: KeyboardAwareScrollViewProps): React.JSX.Element;
export interface ScrollViewWithHeaderProps extends ScrollViewProps {
    /**
     * Header component to render
     */
    header: React.ReactNode;
    /**
     * Height at which the header becomes sticky
     * @default 100
     */
    stickyHeaderHeight?: number;
    /**
     * Whether the header should fade as user scrolls
     * @default false
     */
    fadeHeader?: boolean;
}
export declare function ScrollViewWithHeader({ header, stickyHeaderHeight, fadeHeader, children, style, ...props }: ScrollViewWithHeaderProps): React.JSX.Element;
export interface HorizontalScrollViewProps extends Omit<ScrollViewProps, "horizontal"> {
    /**
     * Gap between items
     * @default 16
     */
    itemGap?: number;
    /**
     * Whether to snap to items
     * @default false
     */
    snapToItems?: boolean;
    /**
     * Width of each item (required for snapping)
     */
    itemWidth?: number;
}
export declare function HorizontalScrollView({ itemGap, snapToItems, itemWidth, children, contentContainerStyle, ...props }: HorizontalScrollViewProps): React.JSX.Element;
export interface EmptyScrollViewProps extends ScrollViewProps {
    /**
     * Content to show when there are no children
     */
    emptyTitle?: string;
    /**
     * Description for empty state
     */
    emptyDescription?: string;
    /**
     * Custom empty component
     */
    emptyComponent?: React.ReactNode;
    /**
     * Whether the scroll view is empty
     */
    isEmpty?: boolean;
}
export declare function EmptyScrollView({ emptyTitle, emptyDescription, emptyComponent, isEmpty, children, contentContainerStyle, ...props }: EmptyScrollViewProps): React.JSX.Element;
//# sourceMappingURL=ScrollView.d.ts.map