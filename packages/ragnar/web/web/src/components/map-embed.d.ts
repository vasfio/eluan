import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const mapContainerVariants: (props?: ({
    rounded?: "sm" | "lg" | "none" | "xl" | "md" | "2xl" | null | undefined;
    aspectRatio?: "auto" | "square" | "video" | "4/3" | "3/2" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface GoogleMapEmbedProps extends React.IframeHTMLAttributes<HTMLIFrameElement>, VariantProps<typeof mapContainerVariants> {
    /**
     * Google Maps embed API key
     */
    apiKey?: string;
    /**
     * Place query (address or place name)
     */
    query: string;
    /**
     * Zoom level (1-21)
     * @default 15
     */
    zoom?: number;
    /**
     * Map type
     * @default "roadmap"
     */
    mapType?: "roadmap" | "satellite";
    /**
     * Container className
     */
    containerClassName?: string;
}
declare const GoogleMapEmbed: React.ForwardRefExoticComponent<GoogleMapEmbedProps & React.RefAttributes<HTMLIFrameElement>>;
export interface OpenStreetMapEmbedProps extends React.IframeHTMLAttributes<HTMLIFrameElement>, VariantProps<typeof mapContainerVariants> {
    /**
     * Latitude
     */
    lat: number;
    /**
     * Longitude
     */
    lng: number;
    /**
     * Zoom level (1-19)
     * @default 15
     */
    zoom?: number;
    /**
     * Marker label
     */
    marker?: string;
    /**
     * Container className
     */
    containerClassName?: string;
}
declare const OpenStreetMapEmbed: React.ForwardRefExoticComponent<OpenStreetMapEmbedProps & React.RefAttributes<HTMLIFrameElement>>;
export interface MapWithInfoProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Address or location name
     */
    address: string;
    /**
     * Phone number
     */
    phone?: string;
    /**
     * Email
     */
    email?: string;
    /**
     * Hours of operation
     */
    hours?: string;
    /**
     * Direction link
     */
    directionsUrl?: string;
}
declare const MapWithInfo: React.ForwardRefExoticComponent<MapWithInfoProps & React.RefAttributes<HTMLDivElement>>;
export { GoogleMapEmbed, OpenStreetMapEmbed, MapWithInfo, };
