import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const socialProofVariants: (props?: ({
    size?: "sm" | "default" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface SocialProofProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof socialProofVariants> {
}
declare const SocialProof: React.ForwardRefExoticComponent<SocialProofProps & React.RefAttributes<HTMLDivElement>>;
export interface AvatarStackProps extends React.HTMLAttributes<HTMLDivElement> {
    max?: number;
    total?: number;
    size?: "sm" | "default" | "lg";
}
declare const AvatarStack: React.ForwardRefExoticComponent<AvatarStackProps & React.RefAttributes<HTMLDivElement>>;
export interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
    rating: number;
    reviewCount?: number;
    size?: "sm" | "default" | "lg";
    showValue?: boolean;
}
declare const StarRating: React.ForwardRefExoticComponent<StarRatingProps & React.RefAttributes<HTMLDivElement>>;
declare const TrustBadges: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export interface TrustBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    label: string;
}
declare const TrustBadge: React.ForwardRefExoticComponent<TrustBadgeProps & React.RefAttributes<HTMLDivElement>>;
export interface CustomerCountProps extends React.HTMLAttributes<HTMLDivElement> {
    count: number;
    label?: string;
    size?: "sm" | "default" | "lg";
}
declare const CustomerCount: React.ForwardRefExoticComponent<CustomerCountProps & React.RefAttributes<HTMLDivElement>>;
declare const SocialProofBanner: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export interface FeaturedInProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
}
declare const FeaturedIn: React.ForwardRefExoticComponent<FeaturedInProps & React.RefAttributes<HTMLDivElement>>;
export { SocialProof, AvatarStack, StarRating, TrustBadges, TrustBadge, CustomerCount, SocialProofBanner, FeaturedIn, };
