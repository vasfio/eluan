import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const appDownloadSectionVariants: (props?: ({
    variant?: "default" | "dark" | "muted" | "gradient" | null | undefined;
    size?: "sm" | "default" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface AppDownloadSectionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof appDownloadSectionVariants> {
}
declare const AppDownloadSection: React.ForwardRefExoticComponent<AppDownloadSectionProps & React.RefAttributes<HTMLDivElement>>;
declare const AppDownloadContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const AppDownloadInfo: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const AppDownloadTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const AppDownloadDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const AppDownloadButtons: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const storeBadgeVariants: (props?: ({
    variant?: "apple" | "google" | "custom" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface AppStoreBadgeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof storeBadgeVariants> {
}
declare const AppStoreBadge: React.ForwardRefExoticComponent<AppStoreBadgeProps & React.RefAttributes<HTMLAnchorElement>>;
declare const GooglePlayBadge: React.ForwardRefExoticComponent<React.AnchorHTMLAttributes<HTMLAnchorElement> & React.RefAttributes<HTMLAnchorElement>>;
declare const AppDownloadMockup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export interface PhoneMockupProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Screenshot image URL
     */
    screenshot?: string;
    /**
     * Alt text for screenshot
     */
    alt?: string;
}
declare const PhoneMockup: React.ForwardRefExoticComponent<PhoneMockupProps & React.RefAttributes<HTMLDivElement>>;
export interface AppQRCodeProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Label text
     */
    label?: string;
}
declare const AppQRCode: React.ForwardRefExoticComponent<AppQRCodeProps & React.RefAttributes<HTMLDivElement>>;
export { AppDownloadSection, AppDownloadContent, AppDownloadInfo, AppDownloadTitle, AppDownloadDescription, AppDownloadButtons, AppStoreBadge, GooglePlayBadge, AppDownloadMockup, PhoneMockup, AppQRCode, };
