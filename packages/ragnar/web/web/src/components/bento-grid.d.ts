import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const bentoGridVariants: (props?: ({
    columns?: "auto" | 2 | 3 | 4 | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bentoGridVariants> {
}
declare const BentoGrid: React.ForwardRefExoticComponent<BentoGridProps & React.RefAttributes<HTMLDivElement>>;
declare const bentoCardVariants: (props?: ({
    variant?: "default" | "dotted" | "grid" | "ghost" | null | undefined;
    size?: "default" | "lg" | null | undefined;
    span?: "full" | 1 | 2 | 3 | null | undefined;
    rowSpan?: 1 | 2 | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bentoCardVariants> {
    href?: string;
}
declare const BentoCard: React.ForwardRefExoticComponent<BentoCardProps & React.RefAttributes<HTMLDivElement>>;
declare const BentoCardIcon: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const BentoCardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const BentoCardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const BentoCardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const BentoCardImage: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    src?: string;
    alt?: string;
} & React.RefAttributes<HTMLDivElement>>;
declare const BentoCardBadge: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
declare const BentoCardLink: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const BentoGridPreset: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    layout?: "default" | "asymmetric" | "featured";
} & React.RefAttributes<HTMLDivElement>>;
export { BentoGrid, BentoCard, BentoCardIcon, BentoCardTitle, BentoCardDescription, BentoCardContent, BentoCardImage, BentoCardBadge, BentoCardLink, BentoGridPreset, };
