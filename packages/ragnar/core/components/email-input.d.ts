import * as React from "react";
export interface EmailInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    showValidation?: boolean;
    onValidationChange?: (isValid: boolean) => void;
}
declare const EmailInput: React.ForwardRefExoticComponent<EmailInputProps & React.RefAttributes<HTMLInputElement>>;
export { EmailInput };
