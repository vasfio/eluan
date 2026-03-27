import React from "react";
import { ViewStyle, TextStyle, ImageSourcePropType } from "react-native";
export interface AvatarProps {
    /** Image source (uri or require) */
    source?: ImageSourcePropType;
    /** Image URI string (alternative to source) */
    uri?: string;
    /** Alt text for accessibility */
    alt?: string;
    /** Fallback text (usually initials) */
    fallback?: string;
    /** Size of the avatar */
    size?: "xs" | "sm" | "default" | "lg" | "xl" | number;
    /** Shape of the avatar */
    shape?: "circle" | "square";
    /** Container style */
    style?: ViewStyle;
    /** Text style for fallback */
    textStyle?: TextStyle;
    /** Online status indicator */
    status?: "online" | "offline" | "busy" | "away";
    /** Show border */
    bordered?: boolean;
}
export declare function Avatar({ source, uri, alt, fallback, size, shape, style, textStyle, status, bordered, }: AvatarProps): React.JSX.Element;
export interface AvatarGroupProps {
    /** Avatars to display */
    children: React.ReactNode;
    /** Maximum number of avatars to show */
    max?: number;
    /** Size of avatars */
    size?: AvatarProps["size"];
    /** Overlap amount (negative spacing) */
    overlap?: number;
    /** Container style */
    style?: ViewStyle;
}
export declare function AvatarGroup({ children, max, size, overlap, style, }: AvatarGroupProps): React.JSX.Element;
//# sourceMappingURL=Avatar.d.ts.map