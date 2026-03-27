import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const formLabelVariants: (props?: ({
    required?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof formLabelVariants> {
    optional?: boolean;
    hint?: string;
}
declare const FormLabel: React.ForwardRefExoticComponent<FormLabelProps & React.RefAttributes<HTMLLabelElement>>;
declare const FormDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const FormMessage: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & {
    error?: boolean;
} & React.RefAttributes<HTMLParagraphElement>>;
export { FormLabel, FormDescription, FormMessage, formLabelVariants };
