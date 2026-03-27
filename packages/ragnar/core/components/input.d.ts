import * as React from "react";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Show a leading icon. Overrides the auto-icon for the input type. */
    icon?: React.ReactNode;
    /** Show a trailing element (e.g. a button) */
    trailing?: React.ReactNode;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input };
