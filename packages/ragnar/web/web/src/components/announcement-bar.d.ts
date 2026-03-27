import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const announcementBarVariants: (props?: ({
    variant?: "default" | "dark" | "muted" | "gradient" | "secondary" | "warning" | "success" | "error" | null | undefined;
    size?: "sm" | "default" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof announcementBarVariants> {
    /**
     * Whether the bar can be dismissed
     * @default true
     */
    dismissible?: boolean;
    /**
     * Callback when dismissed
     */
    onDismiss?: () => void;
    /**
     * Whether the bar is visible
     * @default true
     */
    isVisible?: boolean;
    /**
     * Link URL (makes the entire bar clickable)
     */
    href?: string;
    /**
     * Icon to display before the text
     */
    icon?: React.ReactNode;
}
declare const AnnouncementBar: React.ForwardRefExoticComponent<AnnouncementBarProps & React.RefAttributes<HTMLDivElement>>;
export interface RotatingAnnouncementBarProps extends Omit<AnnouncementBarProps, "children"> {
    /**
     * Array of announcement messages
     */
    messages: Array<{
        text: string;
        href?: string;
    }>;
    /**
     * Rotation interval in milliseconds
     * @default 5000
     */
    interval?: number;
}
declare const RotatingAnnouncementBar: React.ForwardRefExoticComponent<RotatingAnnouncementBarProps & React.RefAttributes<HTMLDivElement>>;
export interface CountdownAnnouncementBarProps extends Omit<AnnouncementBarProps, "children"> {
    /**
     * Target date for countdown
     */
    targetDate: Date;
    /**
     * Text before countdown
     */
    prefix?: string;
    /**
     * Text after countdown
     */
    suffix?: string;
    /**
     * Callback when countdown reaches zero
     */
    onComplete?: () => void;
}
declare const CountdownAnnouncementBar: React.ForwardRefExoticComponent<CountdownAnnouncementBarProps & React.RefAttributes<HTMLDivElement>>;
export { AnnouncementBar, RotatingAnnouncementBar, CountdownAnnouncementBar, };
