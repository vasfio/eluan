import React from "react";
import { ViewStyle, TextStyle } from "react-native";
export interface PickerOption<T = string> {
    /**
     * Display label
     */
    label: string;
    /**
     * Value for this option
     */
    value: T;
    /**
     * Whether this option is disabled
     */
    disabled?: boolean;
    /**
     * Icon to show (render prop)
     */
    icon?: React.ReactNode;
}
export interface NativePickerProps<T = string> {
    /**
     * Available options
     */
    options: PickerOption<T>[];
    /**
     * Currently selected value
     */
    value?: T;
    /**
     * Callback when selection changes
     */
    onChange: (value: T) => void;
    /**
     * Placeholder when no value selected
     */
    placeholder?: string;
    /**
     * Title for the picker modal
     */
    title?: string;
    /**
     * Whether the picker is disabled
     */
    disabled?: boolean;
    /**
     * Style for the trigger container
     */
    style?: ViewStyle;
    /**
     * Style for the trigger text
     */
    textStyle?: TextStyle;
    /**
     * Custom trigger component
     */
    renderTrigger?: (props: {
        selectedOption?: PickerOption<T>;
        onPress: () => void;
        disabled: boolean;
    }) => React.ReactNode;
}
export declare function NativePicker<T = string>({ options, value, onChange, placeholder, title, disabled, style, textStyle, renderTrigger, }: NativePickerProps<T>): React.JSX.Element;
//# sourceMappingURL=NativePicker.d.ts.map