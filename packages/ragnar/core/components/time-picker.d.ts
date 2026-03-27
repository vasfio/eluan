import * as React from "react";
export interface TimePickerProps {
    value?: string;
    onChange?: (value: string) => void;
    format?: "12" | "24";
    disabled?: boolean;
    className?: string;
    placeholder?: string;
}
export declare function TimePicker({ value, onChange, format, disabled, className }: TimePickerProps): import("react/jsx-runtime").JSX.Element;
export interface TimeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}
export declare const TimeInput: React.ForwardRefExoticComponent<TimeInputProps & React.RefAttributes<HTMLInputElement>>;
