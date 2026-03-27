import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const contentSpotVariants: (props?: ({
    layout?: "default" | "left" | "right" | null | undefined;
    size?: "sm" | "default" | "lg" | "full" | "xl" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ContentSpotProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof contentSpotVariants> {
    container?: boolean;
}
declare const ContentSpot: React.ForwardRefExoticComponent<ContentSpotProps & React.RefAttributes<HTMLDivElement>>;
declare const ContentSpotEyebrow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
declare const ContentSpotTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & {
    as?: "h1" | "h2" | "h3" | "h4";
} & React.RefAttributes<HTMLHeadingElement>>;
declare const ContentSpotDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const ContentSpotActions: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { ContentSpot, ContentSpotEyebrow, ContentSpotTitle, ContentSpotDescription, ContentSpotActions, };
