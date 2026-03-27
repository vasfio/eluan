import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const linkVariants: (props?: ({
    variant?: "nav" | "muted" | "default" | "destructive" | "unstyled" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
    asChild?: boolean;
    external?: boolean;
    showExternalIcon?: boolean;
}
declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
export { Link, linkVariants };
