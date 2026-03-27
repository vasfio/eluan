import React from "react";
import { ViewStyle, TextStyle } from "react-native";
export interface CheckboxProps {
    /** Whether the checkbox is checked */
    checked?: boolean;
    /** Called when the checkbox is pressed */
    onCheckedChange?: (checked: boolean) => void;
    /** Label text */
    label?: string;
    /** Description text below label */
    description?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Indeterminate state (partially checked) */
    indeterminate?: boolean;
    /** Size of the checkbox */
    size?: "sm" | "default" | "lg";
    /** Container style */
    style?: ViewStyle;
    /** Label style */
    labelStyle?: TextStyle;
    /** Checkbox position */
    position?: "left" | "right";
}
export declare function Checkbox({ checked, onCheckedChange, label, description, disabled, indeterminate, size, style, labelStyle, position, }: CheckboxProps): React.JSX.Element;
export interface CheckboxGroupProps {
    /** Currently selected values */
    value?: string[];
    /** Called when selection changes */
    onValueChange?: (value: string[]) => void;
    /** Checkbox options */
    options: Array<{
        value: string;
        label: string;
        description?: string;
        disabled?: boolean;
    }>;
    /** Disabled state for all checkboxes */
    disabled?: boolean;
    /** Container style */
    style?: ViewStyle;
    /** Direction of the group */
    direction?: "vertical" | "horizontal";
}
export declare function CheckboxGroup({ value, onValueChange, options, disabled, style, direction, }: CheckboxGroupProps): React.JSX.Element;
//# sourceMappingURL=Checkbox.d.ts.map