import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const counterVariants: (props?: ({
    size?: "sm" | "default" | "lg" | "xl" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface AnimatedCounterProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof counterVariants> {
    /**
     * Target value to count to
     */
    value: number;
    /**
     * Starting value
     * @default 0
     */
    from?: number;
    /**
     * Duration in milliseconds
     * @default 2000
     */
    duration?: number;
    /**
     * Prefix (e.g., "$")
     */
    prefix?: string;
    /**
     * Suffix (e.g., "%", "+")
     */
    suffix?: string;
    /**
     * Number of decimal places
     * @default 0
     */
    decimals?: number;
    /**
     * Thousand separator
     * @default ","
     */
    separator?: string;
    /**
     * Decimal separator
     * @default "."
     */
    decimalSeparator?: string;
    /**
     * Easing function
     * @default "easeOut"
     */
    easing?: "linear" | "easeOut" | "easeInOut";
    /**
     * Delay before starting in milliseconds
     * @default 0
     */
    delay?: number;
    /**
     * Whether to trigger animation when in viewport
     * @default true
     */
    triggerOnView?: boolean;
    /**
     * Callback when animation completes
     */
    onComplete?: () => void;
}
declare const AnimatedCounter: React.ForwardRefExoticComponent<AnimatedCounterProps & React.RefAttributes<HTMLSpanElement>>;
export interface CounterWithLabelProps extends AnimatedCounterProps {
    label: string;
    labelClassName?: string;
}
declare const CounterWithLabel: React.ForwardRefExoticComponent<CounterWithLabelProps & React.RefAttributes<HTMLDivElement>>;
export interface CounterGridProps extends React.HTMLAttributes<HTMLDivElement> {
    columns?: 2 | 3 | 4;
}
declare const CounterGrid: React.ForwardRefExoticComponent<CounterGridProps & React.RefAttributes<HTMLDivElement>>;
export interface CountdownTimerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * Target date/time
     */
    targetDate: Date;
    /**
     * Callback when countdown reaches zero
     */
    onComplete?: () => void;
    /**
     * Labels for time units
     */
    labels?: {
        days?: string;
        hours?: string;
        minutes?: string;
        seconds?: string;
    };
    /**
     * Size variant
     */
    size?: "sm" | "default" | "lg";
}
declare const CountdownTimer: React.ForwardRefExoticComponent<CountdownTimerProps & React.RefAttributes<HTMLDivElement>>;
export { AnimatedCounter, CounterWithLabel, CounterGrid, CountdownTimer, };
