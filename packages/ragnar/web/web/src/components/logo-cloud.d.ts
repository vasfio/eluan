import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const logoCloudVariants: (props?: ({
    variant?: "default" | "muted" | "bordered" | null | undefined;
    size?: "sm" | "default" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface LogoCloudProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof logoCloudVariants> {
    title?: string;
    /** Layout mode: flex row, responsive grid, or auto-scrolling marquee */
    layout?: "flex" | "grid" | "marquee";
    columns?: 3 | 4 | 5 | 6 | 8;
}
declare const LogoCloud: React.ForwardRefExoticComponent<LogoCloudProps & React.RefAttributes<HTMLDivElement>>;
declare const logoItemVariants: (props?: ({
    grayscale?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface LogoCloudItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof logoItemVariants> {
    href?: string;
    name: string;
}
declare const LogoCloudItem: React.ForwardRefExoticComponent<LogoCloudItemProps & React.RefAttributes<HTMLDivElement>>;
export { LogoCloud, LogoCloudItem };
