import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const timelineVariants: (props?: ({
    variant?: "default" | "alternating" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof timelineVariants> {
}
declare const Timeline: React.ForwardRefExoticComponent<TimelineProps & React.RefAttributes<HTMLDivElement>>;
declare const timelineItemVariants: (props?: ({
    variant?: "default" | "warning" | "success" | "info" | "error" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof timelineItemVariants> {
}
declare const TimelineItem: React.ForwardRefExoticComponent<TimelineItemProps & React.RefAttributes<HTMLDivElement>>;
declare const timelineLineVariants: (props?: ({
    variant?: "default" | "dashed" | "dotted" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TimelineLineProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof timelineLineVariants> {
}
declare const TimelineLine: React.ForwardRefExoticComponent<TimelineLineProps & React.RefAttributes<HTMLDivElement>>;
declare const timelineDotVariants: (props?: ({
    variant?: "default" | "outline" | "icon" | "filled" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TimelineDotProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof timelineDotVariants> {
    icon?: React.ReactNode;
}
declare const TimelineDot: React.ForwardRefExoticComponent<TimelineDotProps & React.RefAttributes<HTMLDivElement>>;
declare const TimelineContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const TimelineHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const TimelineTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const TimelineTime: React.ForwardRefExoticComponent<React.TimeHTMLAttributes<HTMLTimeElement> & React.RefAttributes<HTMLTimeElement>>;
declare const TimelineDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const TimelineHorizontal: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const TimelineHorizontalItem: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const TimelineHorizontalLine: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { Timeline, TimelineItem, TimelineLine, TimelineDot, TimelineContent, TimelineHeader, TimelineTitle, TimelineTime, TimelineDescription, TimelineHorizontal, TimelineHorizontalItem, TimelineHorizontalLine, };
