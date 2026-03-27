import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const contactSectionVariants: (props?: ({
    size?: "sm" | "default" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ContactSectionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof contactSectionVariants> {
}
declare const ContactSection: React.ForwardRefExoticComponent<ContactSectionProps & React.RefAttributes<HTMLDivElement>>;
declare const ContactContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ContactInfo: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ContactHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ContactTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const ContactDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const ContactDetails: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export interface ContactDetailItemProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    label: string;
    value: string;
    href?: string;
}
declare const ContactDetailItem: React.ForwardRefExoticComponent<ContactDetailItemProps & React.RefAttributes<HTMLDivElement>>;
declare const ContactSocials: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export interface ContactSocialLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    label: string;
}
declare const ContactSocialLink: React.ForwardRefExoticComponent<ContactSocialLinkProps & React.RefAttributes<HTMLAnchorElement>>;
declare const contactFormVariants: (props?: ({
    variant?: "default" | "card" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ContactFormProps extends React.FormHTMLAttributes<HTMLFormElement>, VariantProps<typeof contactFormVariants> {
}
declare const ContactForm: React.ForwardRefExoticComponent<ContactFormProps & React.RefAttributes<HTMLFormElement>>;
declare const ContactFormRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ContactFormField: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ContactFormLabel: React.ForwardRefExoticComponent<React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
} & React.RefAttributes<HTMLLabelElement>>;
declare const ContactFormInput: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>;
declare const ContactFormTextarea: React.ForwardRefExoticComponent<React.TextareaHTMLAttributes<HTMLTextAreaElement> & React.RefAttributes<HTMLTextAreaElement>>;
declare const ContactFormSelect: React.ForwardRefExoticComponent<React.SelectHTMLAttributes<HTMLSelectElement> & React.RefAttributes<HTMLSelectElement>>;
declare const ContactFormError: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const ContactFormSuccess: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { ContactSection, ContactContent, ContactInfo, ContactHeader, ContactTitle, ContactDescription, ContactDetails, ContactDetailItem, ContactSocials, ContactSocialLink, ContactForm, ContactFormRow, ContactFormField, ContactFormLabel, ContactFormInput, ContactFormTextarea, ContactFormSelect, ContactFormError, ContactFormSuccess, };
