import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const newsletterVariants: (props?: ({
    variant?: "default" | "dark" | "muted" | "primary" | "gradient" | "card" | null | undefined;
    size?: "sm" | "default" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface NewsletterProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof newsletterVariants> {
}
declare const Newsletter: React.ForwardRefExoticComponent<NewsletterProps & React.RefAttributes<HTMLDivElement>>;
declare const NewsletterIcon: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const NewsletterTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const NewsletterDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
export interface NewsletterFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
}
declare const NewsletterForm: React.ForwardRefExoticComponent<NewsletterFormProps & React.RefAttributes<HTMLFormElement>>;
export interface NewsletterInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}
declare const NewsletterInput: React.ForwardRefExoticComponent<NewsletterInputProps & React.RefAttributes<HTMLInputElement>>;
declare const NewsletterDisclaimer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const NewsletterSuccess: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { Newsletter, NewsletterIcon, NewsletterTitle, NewsletterDescription, NewsletterForm, NewsletterInput, NewsletterDisclaimer, NewsletterSuccess, };
