import React from "react";
import { ViewStyle, TextStyle } from "react-native";
export interface ProgressProps {
    /** Progress value (0-100) */
    value?: number;
    /** Maximum value */
    max?: number;
    /** Show percentage text */
    showValue?: boolean;
    /** Custom format for value display */
    formatValue?: (value: number, max: number) => string;
    /** Size variant */
    size?: "sm" | "default" | "lg";
    /** Color variant */
    variant?: "default" | "success" | "warning" | "destructive";
    /** Animate value changes */
    animated?: boolean;
    /** Container style */
    style?: ViewStyle;
    /** Label text */
    label?: string;
    /** Label style */
    labelStyle?: TextStyle;
}
export declare function Progress({ value, max, showValue, formatValue, size, variant, animated, style, label, labelStyle, }: ProgressProps): React.JSX.Element;
export interface CircularProgressProps {
    /** Progress value (0-100) */
    value?: number;
    /** Size of the circle */
    size?: number;
    /** Stroke width */
    strokeWidth?: number;
    /** Show percentage text in center */
    showValue?: boolean;
    /** Color variant */
    variant?: "default" | "success" | "warning" | "destructive";
    /** Container style */
    style?: ViewStyle;
    /** Children to render in center */
    children?: React.ReactNode;
}
export declare function CircularProgress({ value, size, strokeWidth, showValue, variant, style, children, }: CircularProgressProps): React.JSX.Element;
export interface IndeterminateProgressProps {
    /** Size variant */
    size?: "sm" | "default" | "lg";
    /** Color variant */
    variant?: "default" | "success" | "warning" | "destructive";
    /** Container style */
    style?: ViewStyle;
}
export declare function IndeterminateProgress({ size, variant, style, }: IndeterminateProgressProps): React.JSX.Element;
//# sourceMappingURL=Progress.d.ts.map