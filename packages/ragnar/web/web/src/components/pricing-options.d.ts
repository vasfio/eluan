import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const pricingOptionsVariants: (props?: ({
    columns?: 2 | 3 | 4 | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface PricingOption {
    id: string;
    name: string;
    description?: string;
    price: string | number;
    originalPrice?: string | number;
    period?: string;
    features: string[];
    highlighted?: boolean;
    highlightLabel?: string;
    buttonText?: string;
    buttonVariant?: "default" | "outline" | "secondary";
    disabled?: boolean;
    onSelect?: () => void;
}
export interface PricingOptionsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pricingOptionsVariants> {
    options: PricingOption[];
}
declare const PricingOptions: React.ForwardRefExoticComponent<PricingOptionsProps & React.RefAttributes<HTMLDivElement>>;
interface PricingCardProps {
    option: PricingOption;
}
declare const PricingCard: React.ForwardRefExoticComponent<PricingCardProps & React.RefAttributes<HTMLDivElement>>;
export { PricingOptions, PricingCard };
