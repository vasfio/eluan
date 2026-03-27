import React from "react";
import { TextInput, ViewStyle, TextStyle, TextInputProps } from "react-native";
export interface TextAreaProps extends Omit<TextInputProps, "style" | "multiline"> {
    /** Label text displayed above the textarea */
    label?: string;
    /** Helper text displayed below the textarea */
    helperText?: string;
    /** Error message - also sets error state */
    error?: string;
    /** Number of visible lines (affects height) */
    rows?: number;
    /** Maximum character count */
    maxLength?: number;
    /** Show character count */
    showCount?: boolean;
    /** Container style */
    containerStyle?: ViewStyle;
    /** TextArea style */
    style?: TextStyle;
    /** Label style */
    labelStyle?: TextStyle;
    /** Disabled state */
    disabled?: boolean;
    /** Auto-grow height based on content */
    autoGrow?: boolean;
    /** Maximum height when autoGrow is enabled */
    maxHeight?: number;
}
export declare const TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<TextInput>>;
//# sourceMappingURL=TextArea.d.ts.map