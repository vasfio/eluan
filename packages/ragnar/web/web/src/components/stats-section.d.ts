import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const statsSectionVariants: (props?: ({
    variant?: "default" | "dark" | "muted" | "primary" | null | undefined;
    size?: "sm" | "default" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface StatsSectionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statsSectionVariants> {
}
declare const StatsSection: React.ForwardRefExoticComponent<StatsSectionProps & React.RefAttributes<HTMLDivElement>>;
declare const StatsHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const StatsTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const StatsDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const statsGridVariants: (props?: ({
    columns?: 2 | 3 | 4 | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface StatsGridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statsGridVariants> {
}
declare const StatsGrid: React.ForwardRefExoticComponent<StatsGridProps & React.RefAttributes<HTMLDivElement>>;
declare const statItemVariants: (props?: ({
    variant?: "default" | "bordered" | "card" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface StatItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statItemVariants> {
}
declare const StatItem: React.ForwardRefExoticComponent<StatItemProps & React.RefAttributes<HTMLDivElement>>;
declare const StatValue: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const StatLabel: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const StatTrend: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    direction?: "up" | "down" | "neutral";
} & React.RefAttributes<HTMLDivElement>>;
export { StatsSection, StatsHeader, StatsTitle, StatsDescription, StatsGrid, StatItem, StatValue, StatLabel, StatTrend, };
