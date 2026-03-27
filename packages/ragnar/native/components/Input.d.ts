import React from "react";
import { TextInput, ViewStyle, TextStyle, TextInputProps } from "react-native";
export interface InputProps extends Omit<TextInputProps, "style"> {
    /** Label text displayed above the input */
    label?: string;
    /** Helper text displayed below the input */
    helperText?: string;
    /** Error message - also sets error state */
    error?: string;
    /** Left icon/element */
    leftElement?: React.ReactNode;
    /** Right icon/element */
    rightElement?: React.ReactNode;
    /** Container style */
    containerStyle?: ViewStyle;
    /** Input style */
    style?: TextStyle;
    /** Label style */
    labelStyle?: TextStyle;
    /** Disabled state */
    disabled?: boolean;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<TextInput>>;
export interface PasswordInputProps extends Omit<InputProps, "secureTextEntry"> {
    /** Show/hide password toggle */
    showToggle?: boolean;
}
export declare const PasswordInput: React.ForwardRefExoticComponent<PasswordInputProps & React.RefAttributes<TextInput>>;
export interface SearchInputProps extends InputProps {
    /** Called when search is submitted */
    onSearch?: (text: string) => void;
    /** Clear button */
    showClear?: boolean;
    /** Current search value for clear functionality */
    value?: string;
    /** Called when clear is pressed */
    onClear?: () => void;
}
export declare const SearchInput: React.ForwardRefExoticComponent<SearchInputProps & React.RefAttributes<TextInput>>;
//# sourceMappingURL=Input.d.ts.map