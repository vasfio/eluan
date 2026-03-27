import * as React from "react";
export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: number;
    max?: number;
    onChange?: (value: number) => void;
    readonly?: boolean;
    size?: "sm" | "default" | "lg";
    showValue?: boolean;
    precision?: 0.5 | 1;
}
declare const Rating: React.ForwardRefExoticComponent<RatingProps & React.RefAttributes<HTMLDivElement>>;
export { Rating };
