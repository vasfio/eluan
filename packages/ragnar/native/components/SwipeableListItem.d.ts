import React from "react";
import { ViewStyle } from "react-native";
export interface SwipeAction {
    /**
     * Unique key for the action
     */
    key: string;
    /**
     * Label to display
     */
    label: string;
    /**
     * Icon component
     */
    icon?: React.ReactNode;
    /**
     * Background color for the action
     */
    color: string;
    /**
     * Text color
     * @default "#ffffff"
     */
    textColor?: string;
    /**
     * Callback when action is triggered
     */
    onPress: () => void;
}
export interface SwipeableListItemProps {
    /**
     * Content to render in the list item
     */
    children: React.ReactNode;
    /**
     * Actions shown when swiping left (revealed on right side)
     */
    leftActions?: SwipeAction[];
    /**
     * Actions shown when swiping right (revealed on left side)
     */
    rightActions?: SwipeAction[];
    /**
     * Width of each action button
     * @default 80
     */
    actionWidth?: number;
    /**
     * Callback when item is pressed (not swiped)
     */
    onPress?: () => void;
    /**
     * Whether swipe is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Style for the container
     */
    style?: ViewStyle;
    /**
     * Threshold (0-1) to trigger full swipe action
     * @default 0.5
     */
    swipeThreshold?: number;
    /**
     * Whether to auto-close after action press
     * @default true
     */
    autoClose?: boolean;
}
export declare function SwipeableListItem({ children, leftActions, rightActions, actionWidth, onPress, disabled, style, swipeThreshold, autoClose, }: SwipeableListItemProps): React.JSX.Element;
//# sourceMappingURL=SwipeableListItem.d.ts.map