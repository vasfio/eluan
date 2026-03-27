import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const drawerVariants: (props?: ({
    side?: "top" | "bottom" | "right" | "left" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
interface DrawerProps {
    children: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
declare function Drawer({ children, open: controlledOpen, defaultOpen, onOpenChange, }: DrawerProps): import("react/jsx-runtime").JSX.Element;
declare const DrawerTrigger: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerClose: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerPortal: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element | null;
declare const DrawerOverlay: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof drawerVariants> {
}
declare const DrawerContent: React.ForwardRefExoticComponent<DrawerContentProps & React.RefAttributes<HTMLDivElement>>;
declare const DrawerHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawerFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawerTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const DrawerDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const DrawerHandle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface DrawerPushLayoutProps {
    children: React.ReactNode;
    side?: "left" | "right";
    width?: string;
    className?: string;
}
declare const DrawerPushLayout: {
    ({ children, side, width, className }: DrawerPushLayoutProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { Drawer, DrawerPushLayout, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerHandle, };
