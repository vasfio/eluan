import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const marqueeVariants: (props?: ({
    variant?: "default" | "fade" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof marqueeVariants> {
    /**
     * Duration of one complete loop in seconds
     * @default 40
     */
    duration?: number;
    /**
     * Direction of the marquee
     * @default "left"
     */
    direction?: "left" | "right";
    /**
     * Whether to pause on hover
     * @default true
     */
    pauseOnHover?: boolean;
    /**
     * Gap between items
     * @default 16
     */
    gap?: number;
}
declare const Marquee: React.ForwardRefExoticComponent<MarqueeProps & React.RefAttributes<HTMLDivElement>>;
declare const MarqueeItem: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const verticalMarqueeVariants: (props?: ({
    variant?: "default" | "fade" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface VerticalMarqueeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof verticalMarqueeVariants> {
    duration?: number;
    direction?: "up" | "down";
    pauseOnHover?: boolean;
    gap?: number;
}
declare const VerticalMarquee: React.ForwardRefExoticComponent<VerticalMarqueeProps & React.RefAttributes<HTMLDivElement>>;
declare const MarqueeTestimonial: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const MarqueeTestimonialContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const MarqueeTestimonialAuthor: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const MarqueeTestimonialAvatar: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    src?: string;
    alt?: string;
    fallback?: string;
} & React.RefAttributes<HTMLDivElement>>;
declare const MarqueeTestimonialInfo: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const MarqueeTestimonialName: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const MarqueeTestimonialRole: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { Marquee, MarqueeItem, VerticalMarquee, MarqueeTestimonial, MarqueeTestimonialContent, MarqueeTestimonialAuthor, MarqueeTestimonialAvatar, MarqueeTestimonialInfo, MarqueeTestimonialName, MarqueeTestimonialRole, };
