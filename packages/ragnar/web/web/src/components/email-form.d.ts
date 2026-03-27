import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const emailFormVariants: (props?: ({
    layout?: "inline" | "stacked" | null | undefined;
    size?: "sm" | "default" | "lg" | "full" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface EmailFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit">, VariantProps<typeof emailFormVariants> {
    onSubmit?: (email: string) => void | Promise<void>;
    placeholder?: string;
    buttonText?: string;
    loading?: boolean;
    disabled?: boolean;
    helperText?: string;
    successMessage?: string;
    errorMessage?: string;
}
declare const EmailForm: React.ForwardRefExoticComponent<EmailFormProps & React.RefAttributes<HTMLFormElement>>;
export { EmailForm };
