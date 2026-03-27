import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const heroVariants: (props?: ({
    size?: "sm" | "default" | "lg" | "full" | null | undefined;
    align?: "left" | "center" | "right" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface HeroProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof heroVariants> {
    backgroundImage?: string;
    backgroundOverlay?: boolean;
    overlayOpacity?: number;
}
declare const Hero: React.ForwardRefExoticComponent<HeroProps & React.RefAttributes<HTMLDivElement>>;
declare const HeroBadge: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
declare const HeroTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const HeroSubtitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const HeroActions: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const HeroImage: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { Hero, HeroBadge, HeroTitle, HeroSubtitle, HeroActions, HeroImage, };
