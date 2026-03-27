import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const footerVariants: (props?: ({
    size?: "sm" | "default" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface FooterProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof footerVariants> {
}
declare const Footer: React.ForwardRefExoticComponent<FooterProps & React.RefAttributes<HTMLElement>>;
declare const FooterContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const FooterSection: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const FooterTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const FooterLinks: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLUListElement> & React.RefAttributes<HTMLUListElement>>;
export interface FooterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
}
declare const FooterLink: React.ForwardRefExoticComponent<FooterLinkProps & React.RefAttributes<HTMLAnchorElement>>;
declare const FooterBottom: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const FooterCopyright: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const FooterSocial: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export interface FooterSocialLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    label: string;
}
declare const FooterSocialLink: React.ForwardRefExoticComponent<FooterSocialLinkProps & React.RefAttributes<HTMLAnchorElement>>;
export { Footer, FooterContent, FooterSection, FooterTitle, FooterLinks, FooterLink, FooterBottom, FooterCopyright, FooterSocial, FooterSocialLink, };
