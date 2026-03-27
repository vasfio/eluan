import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const comparisonSectionVariants: (props?: ({
    size?: "sm" | "default" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ComparisonSectionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof comparisonSectionVariants> {
}
declare const ComparisonSection: React.ForwardRefExoticComponent<ComparisonSectionProps & React.RefAttributes<HTMLDivElement>>;
declare const ComparisonHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ComparisonTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const ComparisonDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const ComparisonTable: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ComparisonTableInner: React.ForwardRefExoticComponent<React.TableHTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>>;
declare const ComparisonTableHead: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const ComparisonTableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const ComparisonTableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
declare const comparisonHeaderCellVariants: (props?: ({
    highlight?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ComparisonHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement>, VariantProps<typeof comparisonHeaderCellVariants> {
}
declare const ComparisonHeaderCell: React.ForwardRefExoticComponent<ComparisonHeaderCellProps & React.RefAttributes<HTMLTableCellElement>>;
declare const comparisonCellVariants: (props?: ({
    highlight?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ComparisonCellProps extends React.TdHTMLAttributes<HTMLTableCellElement>, VariantProps<typeof comparisonCellVariants> {
}
declare const ComparisonCell: React.ForwardRefExoticComponent<ComparisonCellProps & React.RefAttributes<HTMLTableCellElement>>;
declare const ComparisonFeatureCell: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const ComparisonCheck: React.ForwardRefExoticComponent<React.SVGAttributes<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>;
declare const ComparisonX: React.ForwardRefExoticComponent<React.SVGAttributes<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>;
declare const ComparisonMinus: React.ForwardRefExoticComponent<React.SVGAttributes<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>;
declare const ComparisonPlanHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ComparisonPlanName: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ComparisonPlanPrice: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ComparisonCategory: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
export { ComparisonSection, ComparisonHeader, ComparisonTitle, ComparisonDescription, ComparisonTable, ComparisonTableInner, ComparisonTableHead, ComparisonTableBody, ComparisonTableRow, ComparisonHeaderCell, ComparisonCell, ComparisonFeatureCell, ComparisonCheck, ComparisonX, ComparisonMinus, ComparisonPlanHeader, ComparisonPlanName, ComparisonPlanPrice, ComparisonCategory, };
