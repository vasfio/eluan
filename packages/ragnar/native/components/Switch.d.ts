import React from "react";
import { ViewStyle, TextStyle } from "react-native";
export interface SwitchProps {
    /** Whether the switch is on */
    checked?: boolean;
    /** Called when the switch is toggled */
    onCheckedChange?: (checked: boolean) => void;
    /** Label text */
    label?: string;
    /** Description text below label */
    description?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Size of the switch */
    size?: "sm" | "default" | "lg";
    /** Container style */
    style?: ViewStyle;
    /** Label style */
    labelStyle?: TextStyle;
    /** Label position */
    labelPosition?: "left" | "right";
}
export declare function Switch({ checked, onCheckedChange, label, description, disabled, size, style, labelStyle, labelPosition, }: SwitchProps): React.JSX.Element;
export interface LabeledSwitchProps extends Omit<SwitchProps, "label" | "description"> {
    /** Text shown when switch is off */
    offLabel?: string;
    /** Text shown when switch is on */
    onLabel?: string;
}
export declare function LabeledSwitch({ offLabel, onLabel, checked, ...props }: LabeledSwitchProps): React.JSX.Element;
//# sourceMappingURL=Switch.d.ts.map