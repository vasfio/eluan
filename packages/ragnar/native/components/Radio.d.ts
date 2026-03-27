import React from "react";
import { ViewStyle, TextStyle } from "react-native";
export interface RadioOption {
    /** Unique value for this option */
    value: string;
    /** Display label */
    label: string;
    /** Optional description */
    description?: string;
    /** Disabled state for this option */
    disabled?: boolean;
}
export interface RadioGroupProps {
    /** Currently selected value */
    value?: string;
    /** Called when selection changes */
    onValueChange?: (value: string) => void;
    /** Available options */
    options: RadioOption[];
    /** Disabled state for all options */
    disabled?: boolean;
    /** Size of the radio buttons */
    size?: "sm" | "default" | "lg";
    /** Layout direction */
    direction?: "vertical" | "horizontal";
    /** Container style */
    style?: ViewStyle;
    /** Radio button position */
    radioPosition?: "left" | "right";
}
export declare function RadioGroup({ value, onValueChange, options, disabled, size, direction, style, radioPosition, }: RadioGroupProps): React.JSX.Element;
export interface RadioProps {
    /** Whether the radio is selected */
    selected?: boolean;
    /** Called when pressed */
    onPress?: () => void;
    /** Label text */
    label?: string;
    /** Description text */
    description?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Size */
    size?: "sm" | "default" | "lg";
    /** Container style */
    style?: ViewStyle;
    /** Label style */
    labelStyle?: TextStyle;
}
export declare function Radio({ selected, onPress, label, description, disabled, size, style, labelStyle, }: RadioProps): React.JSX.Element;
//# sourceMappingURL=Radio.d.ts.map