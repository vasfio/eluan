import React from "react";
import { ViewStyle } from "react-native";
import type { DimensionValue } from "react-native";
export interface SkeletonProps {
    /** Width of the skeleton */
    width?: DimensionValue;
    /** Height of the skeleton */
    height?: DimensionValue;
    /** Border radius */
    radius?: number | "sm" | "md" | "lg" | "full";
    /** Shape variant */
    variant?: "text" | "circular" | "rectangular" | "rounded";
    /** Disable animation */
    disableAnimation?: boolean;
    /** Container style */
    style?: ViewStyle;
}
export declare function Skeleton({ width, height, radius, variant, disableAnimation, style, }: SkeletonProps): React.JSX.Element;
export interface SkeletonTextProps {
    /** Number of lines */
    lines?: number;
    /** Line height */
    lineHeight?: number;
    /** Gap between lines */
    gap?: number;
    /** Last line width (percentage or number) */
    lastLineWidth?: DimensionValue;
    /** Container style */
    style?: ViewStyle;
}
export declare function SkeletonText({ lines, lineHeight, gap, lastLineWidth, style, }: SkeletonTextProps): React.JSX.Element;
export interface SkeletonAvatarProps {
    /** Size of the avatar */
    size?: number;
    /** Container style */
    style?: ViewStyle;
}
export declare function SkeletonAvatar({ size, style }: SkeletonAvatarProps): React.JSX.Element;
export interface SkeletonCardProps {
    /** Show image placeholder */
    hasImage?: boolean;
    /** Image height */
    imageHeight?: number;
    /** Number of text lines */
    lines?: number;
    /** Container style */
    style?: ViewStyle;
}
export declare function SkeletonCard({ hasImage, imageHeight, lines, style, }: SkeletonCardProps): React.JSX.Element;
export interface SkeletonListItemProps {
    /** Show avatar */
    hasAvatar?: boolean;
    /** Avatar size */
    avatarSize?: number;
    /** Number of text lines */
    lines?: number;
    /** Show trailing element */
    hasTrailing?: boolean;
    /** Container style */
    style?: ViewStyle;
}
export declare function SkeletonListItem({ hasAvatar, avatarSize, lines, hasTrailing, style, }: SkeletonListItemProps): React.JSX.Element;
export interface SkeletonGroupProps {
    /** Number of items */
    count?: number;
    /** Gap between items */
    gap?: number;
    /** Item renderer */
    children: React.ReactNode;
    /** Container style */
    style?: ViewStyle;
}
export declare function SkeletonGroup({ count, gap, children, style, }: SkeletonGroupProps): React.JSX.Element;
//# sourceMappingURL=Skeleton.d.ts.map