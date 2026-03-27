import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const useNavigationDrawer: () => {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    isMobile: boolean;
};
interface NavigationDrawerProviderProps {
    children: React.ReactNode;
    defaultCollapsed?: boolean;
}
declare const NavigationDrawerProvider: ({ children, defaultCollapsed, }: NavigationDrawerProviderProps) => import("react/jsx-runtime").JSX.Element;
declare const NavigationDrawer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const NavigationDrawerHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const NavigationDrawerContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const NavigationDrawerFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const NavigationDrawerToggle: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
declare const navigationDrawerItemVariants: (props?: ({
    active?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface NavigationDrawerItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof navigationDrawerItemVariants> {
    icon?: React.ReactNode;
    asChild?: boolean;
}
declare const NavigationDrawerItem: React.ForwardRefExoticComponent<NavigationDrawerItemProps & React.RefAttributes<HTMLAnchorElement>>;
declare const NavigationDrawerGroup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    label?: string;
} & React.RefAttributes<HTMLDivElement>>;
export { NavigationDrawerProvider, NavigationDrawer, NavigationDrawerHeader, NavigationDrawerContent, NavigationDrawerFooter, NavigationDrawerToggle, NavigationDrawerItem, NavigationDrawerGroup, useNavigationDrawer, };
