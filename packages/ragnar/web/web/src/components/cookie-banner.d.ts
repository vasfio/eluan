import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const cookieBannerVariants: (props?: ({
    position?: "bottom" | "top" | "bottom-right" | "bottom-left" | null | undefined;
    variant?: "default" | "dark" | "card" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface CookieBannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cookieBannerVariants> {
    /**
     * Whether the banner is visible
     */
    isVisible?: boolean;
    /**
     * Callback when accepted
     */
    onAccept?: () => void;
    /**
     * Callback when declined
     */
    onDecline?: () => void;
    /**
     * Callback when preferences are opened
     */
    onPreferences?: () => void;
}
declare const CookieBanner: React.ForwardRefExoticComponent<CookieBannerProps & React.RefAttributes<HTMLDivElement>>;
declare const CookieBannerContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CookieBannerText: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CookieBannerTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const CookieBannerDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const CookieBannerActions: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CookieBannerLink: React.ForwardRefExoticComponent<React.AnchorHTMLAttributes<HTMLAnchorElement> & React.RefAttributes<HTMLAnchorElement>>;
export interface CookiePreferencesProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (preferences: CookiePreference[]) => void;
}
export interface CookiePreference {
    id: string;
    name: string;
    description: string;
    required?: boolean;
    enabled: boolean;
}
declare const CookiePreferences: React.ForwardRefExoticComponent<CookiePreferencesProps & React.RefAttributes<HTMLDivElement>>;
declare const CookiePreferencesHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CookiePreferencesTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const CookiePreferencesDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const CookiePreferencesList: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export interface CookiePreferenceItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    name: string;
    description: string;
    required?: boolean;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}
declare const CookiePreferenceItem: React.ForwardRefExoticComponent<CookiePreferenceItemProps & React.RefAttributes<HTMLDivElement>>;
declare const CookiePreferencesFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { CookieBanner, CookieBannerContent, CookieBannerText, CookieBannerTitle, CookieBannerDescription, CookieBannerActions, CookieBannerLink, CookiePreferences, CookiePreferencesHeader, CookiePreferencesTitle, CookiePreferencesDescription, CookiePreferencesList, CookiePreferenceItem, CookiePreferencesFooter, };
