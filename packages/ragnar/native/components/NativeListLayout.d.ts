import React from "react";
import { ViewStyle, TextStyle, ListRenderItem, SectionListData } from "react-native";
export interface ListItemProps {
    /**
     * Primary text/title
     */
    title: string;
    /**
     * Secondary text/subtitle
     */
    subtitle?: string;
    /**
     * Left element (icon, avatar, etc.)
     */
    left?: React.ReactNode;
    /**
     * Right element (icon, badge, etc.)
     */
    right?: React.ReactNode;
    /**
     * Callback when item is pressed
     */
    onPress?: () => void;
    /**
     * Whether to show a separator
     * @default true
     */
    showSeparator?: boolean;
    /**
     * Style for the container
     */
    style?: ViewStyle;
    /**
     * Style for the title
     */
    titleStyle?: TextStyle;
    /**
     * Style for the subtitle
     */
    subtitleStyle?: TextStyle;
}
export declare function ListItem({ title, subtitle, left, right, onPress, showSeparator, style, titleStyle, subtitleStyle, }: ListItemProps): React.JSX.Element;
export interface SectionHeaderProps {
    /**
     * Section title
     */
    title: string;
    /**
     * Style for the container
     */
    style?: ViewStyle;
    /**
     * Style for the title
     */
    titleStyle?: TextStyle;
}
export declare function SectionHeader({ title, style, titleStyle }: SectionHeaderProps): React.JSX.Element;
export interface NativeListProps<T> {
    /**
     * Data array
     */
    data: T[];
    /**
     * Render function for each item
     */
    renderItem: ListRenderItem<T>;
    /**
     * Key extractor function
     */
    keyExtractor: (item: T, index: number) => string;
    /**
     * Component to render when list is empty
     */
    emptyComponent?: React.ReactNode;
    /**
     * Header component
     */
    header?: React.ReactNode;
    /**
     * Footer component
     */
    footer?: React.ReactNode;
    /**
     * Whether to show separators
     * @default true
     */
    showSeparators?: boolean;
    /**
     * Style for the container
     */
    style?: ViewStyle;
    /**
     * Style for the content container
     */
    contentContainerStyle?: ViewStyle;
    /**
     * Callback when end is reached (for pagination)
     */
    onEndReached?: () => void;
    /**
     * Threshold for onEndReached
     */
    onEndReachedThreshold?: number;
}
export declare function NativeList<T>({ data, renderItem, keyExtractor, emptyComponent, header, footer, showSeparators, style, contentContainerStyle, onEndReached, onEndReachedThreshold, }: NativeListProps<T>): React.JSX.Element;
export interface NativeSectionListProps<T> {
    /**
     * Sections array
     */
    sections: SectionListData<T>[];
    /**
     * Render function for each item
     */
    renderItem: ListRenderItem<T>;
    /**
     * Key extractor function
     */
    keyExtractor: (item: T, index: number) => string;
    /**
     * Component to render when list is empty
     */
    emptyComponent?: React.ReactNode;
    /**
     * Whether to make section headers sticky
     * @default true
     */
    stickySectionHeaders?: boolean;
    /**
     * Style for the container
     */
    style?: ViewStyle;
    /**
     * Style for the content container
     */
    contentContainerStyle?: ViewStyle;
}
export declare function NativeSectionList<T>({ sections, renderItem, keyExtractor, emptyComponent, stickySectionHeaders, style, contentContainerStyle, }: NativeSectionListProps<T>): React.JSX.Element;
//# sourceMappingURL=NativeListLayout.d.ts.map