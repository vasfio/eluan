import React from "react";
import { ViewStyle, TextStyle } from "react-native";
export interface BadgeProps {
    /** Badge content */
    children: React.ReactNode;
    /** Badge variant */
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
    /** Badge size */
    size?: "sm" | "default" | "lg";
    /** Container style */
    style?: ViewStyle;
    /** Text style */
    textStyle?: TextStyle;
    /** Dot variant (no text, just a dot) */
    dot?: boolean;
}
export declare function Badge({ children, variant, size, style, textStyle, dot, }: BadgeProps): React.JSX.Element;
export interface NotificationBadgeProps {
    /** Count to display */
    count?: number;
    /** Maximum count to display */
    max?: number;
    /** Show dot instead of count */
    dot?: boolean;
    /** Hide when count is 0 */
    hideZero?: boolean;
    /** Badge color */
    color?: "default" | "destructive" | "success";
    /** Children to wrap */
    children: React.ReactNode;
    /** Container style */
    style?: ViewStyle;
}
export declare function NotificationBadge({ count, max, dot, hideZero, color, children, style, }: NotificationBadgeProps): React.JSX.Element;
//# sourceMappingURL=Badge.d.ts.map