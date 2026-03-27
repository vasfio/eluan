import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const mediaVariants: (props?: ({
    ratio?: "video" | "auto" | "square" | "portrait" | "wide" | null | undefined;
    rounded?: "none" | "sm" | "lg" | "md" | "xl" | "full" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, VariantProps<typeof mediaVariants> {
    fallback?: React.ReactNode;
}
declare const Image: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLImageElement>>;
export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement>, VariantProps<typeof mediaVariants> {
    showControls?: boolean;
}
declare const Video: React.ForwardRefExoticComponent<VideoProps & React.RefAttributes<HTMLVideoElement>>;
export { Image, Video, mediaVariants };
