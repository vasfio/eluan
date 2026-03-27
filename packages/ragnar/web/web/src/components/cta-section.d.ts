import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const ctaSectionVariants: (props?: ({
    variant?: "default" | "dark" | "muted" | "primary" | "gradient" | "bordered" | null | undefined;
    size?: "sm" | "default" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface CTASectionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ctaSectionVariants> {
}
declare const CTASection: React.ForwardRefExoticComponent<CTASectionProps & React.RefAttributes<HTMLDivElement>>;
declare const ctaContentVariants: (props?: ({
    align?: "left" | "center" | "split" | null | undefined;
    maxWidth?: "sm" | "lg" | "full" | "md" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface CTAContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ctaContentVariants> {
}
declare const CTAContent: React.ForwardRefExoticComponent<CTAContentProps & React.RefAttributes<HTMLDivElement>>;
declare const CTATitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const CTADescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const CTAActions: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CTACard: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { CTASection, CTAContent, CTATitle, CTADescription, CTAActions, CTACard, };
