import React from "react";
import { ViewStyle, TextStyle, PressableProps } from "react-native";
export interface BackButtonProps extends Omit<PressableProps, "style"> {
    /**
     * The label to display next to the back arrow
     * @default "Back"
     */
    label?: string;
    /**
     * Whether to show the label
     * @default true on iOS, false on Android
     */
    showLabel?: boolean;
    /**
     * Custom back icon (render prop)
     */
    icon?: React.ReactNode;
    /**
     * Style for the container
     */
    style?: ViewStyle;
    /**
     * Style for the label text
     */
    labelStyle?: TextStyle;
}
export declare function BackButton({ label, showLabel, icon, style, labelStyle, disabled, ...props }: BackButtonProps): React.JSX.Element;
//# sourceMappingURL=BackButton.d.ts.map