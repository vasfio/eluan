import React from "react";
import { ViewStyle, TextStyle } from "react-native";
export interface SeparatorProps {
    /** Orientation of the separator */
    orientation?: "horizontal" | "vertical";
    /** Decorative (no semantic meaning) */
    decorative?: boolean;
    /** Container style */
    style?: ViewStyle;
}
export declare function Separator({ orientation, decorative, style, }: SeparatorProps): React.JSX.Element;
export interface LabeledSeparatorProps {
    /** Label text */
    label: string;
    /** Label position */
    labelPosition?: "left" | "center" | "right";
    /** Label style */
    labelStyle?: TextStyle;
    /** Container style */
    style?: ViewStyle;
}
export declare function LabeledSeparator({ label, labelPosition, labelStyle, style, }: LabeledSeparatorProps): React.JSX.Element;
export interface DividerProps extends SeparatorProps {
    /** Inset from left side */
    inset?: boolean | number;
    /** Inset from right side */
    insetRight?: boolean | number;
}
export declare function Divider({ inset, insetRight, style, ...props }: DividerProps): React.JSX.Element;
export interface SpacerProps {
    /** Size of the spacer */
    size?: number | "xs" | "sm" | "md" | "lg" | "xl";
    /** Direction (for flex layouts) */
    flex?: boolean;
    /** Container style */
    style?: ViewStyle;
}
export declare function Spacer({ size, flex, style, }: SpacerProps): React.JSX.Element;
//# sourceMappingURL=Separator.d.ts.map