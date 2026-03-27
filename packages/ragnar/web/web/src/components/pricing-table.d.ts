import * as React from "react";
export interface PricingPlan {
    id: string;
    name: string;
    price: string | number;
    period?: string;
    description?: string;
    highlighted?: boolean;
    buttonText?: string;
    onSelect?: () => void;
}
export interface PricingFeature {
    name: string;
    tooltip?: string;
    values: Record<string, boolean | string>;
}
export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
    plans: PricingPlan[];
    features: PricingFeature[];
    featureGroupTitle?: string;
}
declare const PricingTable: React.ForwardRefExoticComponent<PricingTableProps & React.RefAttributes<HTMLDivElement>>;
export { PricingTable };
