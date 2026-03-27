import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const videoContainerVariants: (props?: ({
    rounded?: "sm" | "lg" | "none" | "xl" | "md" | "2xl" | null | undefined;
    aspectRatio?: "auto" | "square" | "video" | "4/3" | "21/9" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement>, VariantProps<typeof videoContainerVariants> {
    /**
     * Video source URL
     */
    src: string;
    /**
     * Poster image URL
     */
    poster?: string;
    /**
     * Whether to show custom controls
     * @default true
     */
    showControls?: boolean;
    /**
     * Whether to show a play button overlay
     * @default true
     */
    showPlayButton?: boolean;
    /**
     * Container className
     */
    containerClassName?: string;
}
declare const VideoPlayer: React.ForwardRefExoticComponent<VideoPlayerProps & React.RefAttributes<HTMLVideoElement>>;
export interface YouTubeEmbedProps extends React.IframeHTMLAttributes<HTMLIFrameElement>, VariantProps<typeof videoContainerVariants> {
    /**
     * YouTube video ID
     */
    videoId: string;
    /**
     * Whether to autoplay
     * @default false
     */
    autoPlay?: boolean;
    /**
     * Container className
     */
    containerClassName?: string;
}
declare const YouTubeEmbed: React.ForwardRefExoticComponent<YouTubeEmbedProps & React.RefAttributes<HTMLIFrameElement>>;
export interface VimeoEmbedProps extends React.IframeHTMLAttributes<HTMLIFrameElement>, VariantProps<typeof videoContainerVariants> {
    /**
     * Vimeo video ID
     */
    videoId: string;
    /**
     * Whether to autoplay
     * @default false
     */
    autoPlay?: boolean;
    /**
     * Container className
     */
    containerClassName?: string;
}
declare const VimeoEmbed: React.ForwardRefExoticComponent<VimeoEmbedProps & React.RefAttributes<HTMLIFrameElement>>;
export interface VideoModalProps {
    /**
     * Video source URL
     */
    src: string;
    /**
     * Whether the modal is open
     */
    isOpen: boolean;
    /**
     * Callback when modal closes
     */
    onClose: () => void;
    /**
     * Video title
     */
    title?: string;
}
declare const VideoModal: React.ForwardRefExoticComponent<VideoModalProps & React.RefAttributes<HTMLDivElement>>;
export { VideoPlayer, YouTubeEmbed, VimeoEmbed, VideoModal, };
