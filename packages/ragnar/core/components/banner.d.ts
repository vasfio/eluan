import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const bannerVariants: (props?: ({
    variant?: "default" | "destructive" | "warning" | "success" | "info" | "neutral" | null | undefined;
    position?: "inline" | "top" | "bottom" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface BannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
    icon?: React.ReactNode;
    action?: React.ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
}
declare const Banner: React.ForwardRefExoticComponent<BannerProps & React.RefAttributes<HTMLDivElement>>;
export { Banner, bannerVariants };
