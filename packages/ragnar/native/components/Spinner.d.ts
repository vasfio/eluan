import React from "react";
import { ViewStyle } from "react-native";
export interface SpinnerProps {
    /** Size of the spinner */
    size?: "sm" | "default" | "lg" | number;
    /** Color variant */
    variant?: "default" | "primary" | "secondary" | "destructive";
    /** Custom color override */
    color?: string;
    /** Container style */
    style?: ViewStyle;
    /** Use native ActivityIndicator */
    native?: boolean;
}
export declare function Spinner({ size, variant, color, style, native, }: SpinnerProps): React.JSX.Element;
export interface DotsLoaderProps {
    /** Size of dots */
    size?: "sm" | "default" | "lg";
    /** Color variant */
    variant?: "default" | "primary" | "secondary";
    /** Custom color */
    color?: string;
    /** Container style */
    style?: ViewStyle;
}
export declare function DotsLoader({ size, variant, color, style, }: DotsLoaderProps): React.JSX.Element;
export interface PulseLoaderProps {
    /** Size of pulse */
    size?: number;
    /** Color */
    color?: string;
    /** Container style */
    style?: ViewStyle;
}
export declare function PulseLoader({ size, color, style, }: PulseLoaderProps): React.JSX.Element;
//# sourceMappingURL=Spinner.d.ts.map