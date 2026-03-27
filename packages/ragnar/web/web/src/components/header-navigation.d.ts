import * as React from "react";
export interface NavItem {
    label: string;
    href?: string;
    onClick?: () => void;
    children?: NavItem[];
    active?: boolean;
}
export interface HeaderNavigationProps extends React.HTMLAttributes<HTMLElement> {
    logo?: React.ReactNode;
    items?: NavItem[];
    actions?: React.ReactNode;
    sticky?: boolean;
    transparent?: boolean;
    mobileBreakpoint?: "sm" | "md" | "lg";
}
declare const HeaderNavigation: React.ForwardRefExoticComponent<HeaderNavigationProps & React.RefAttributes<HTMLElement>>;
export { HeaderNavigation };
