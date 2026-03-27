import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const featureSpotVariants: (props?: ({
    layout?: "grid" | "imageLeft" | "imageRight" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface FeatureSpotProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof featureSpotVariants> {
    container?: boolean;
}
declare const FeatureSpot: React.ForwardRefExoticComponent<FeatureSpotProps & React.RefAttributes<HTMLDivElement>>;
declare const FeatureSpotEyebrow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
declare const FeatureSpotHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const FeatureSpotTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & {
    as?: "h1" | "h2" | "h3";
} & React.RefAttributes<HTMLHeadingElement>>;
declare const FeatureSpotDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
export interface FeatureSpotGridProps extends React.HTMLAttributes<HTMLDivElement> {
    columns?: 2 | 3 | 4;
}
declare const FeatureSpotGrid: React.ForwardRefExoticComponent<FeatureSpotGridProps & React.RefAttributes<HTMLDivElement>>;
export interface FeatureSpotItemProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
}
declare const FeatureSpotItem: React.ForwardRefExoticComponent<FeatureSpotItemProps & React.RefAttributes<HTMLDivElement>>;
declare const FeatureSpotItemTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const FeatureSpotItemDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
export interface FeatureSpotSplitProps extends React.HTMLAttributes<HTMLDivElement> {
    reverse?: boolean;
}
declare const FeatureSpotSplit: React.ForwardRefExoticComponent<FeatureSpotSplitProps & React.RefAttributes<HTMLDivElement>>;
declare const FeatureSpotContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const FeatureSpotMedia: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { FeatureSpot, FeatureSpotEyebrow, FeatureSpotHeader, FeatureSpotTitle, FeatureSpotDescription, FeatureSpotGrid, FeatureSpotItem, FeatureSpotItemTitle, FeatureSpotItemDescription, FeatureSpotSplit, FeatureSpotContent, FeatureSpotMedia, };
