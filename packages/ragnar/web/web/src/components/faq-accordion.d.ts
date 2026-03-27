import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const faqSectionVariants: (props?: ({
    size?: "sm" | "default" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface FAQSectionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof faqSectionVariants> {
}
declare const FAQSection: React.ForwardRefExoticComponent<FAQSectionProps & React.RefAttributes<HTMLDivElement>>;
declare const FAQHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const FAQTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const FAQDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const faqListVariants: (props?: ({
    variant?: "default" | "separated" | "cards" | null | undefined;
    maxWidth?: "sm" | "lg" | "full" | "md" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface FAQListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof faqListVariants> {
}
declare const FAQList: React.ForwardRefExoticComponent<FAQListProps & React.RefAttributes<HTMLDivElement>>;
export interface FAQItemProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultOpen?: boolean;
}
declare const FAQItem: React.ForwardRefExoticComponent<FAQItemProps & React.RefAttributes<HTMLDivElement>>;
export interface FAQItemCardProps extends FAQItemProps {
}
declare const FAQItemCard: React.ForwardRefExoticComponent<FAQItemCardProps & React.RefAttributes<HTMLDivElement>>;
interface FAQQuestionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen?: boolean;
    onToggle?: () => void;
}
declare const FAQQuestion: React.ForwardRefExoticComponent<FAQQuestionProps & React.RefAttributes<HTMLButtonElement>>;
interface FAQAnswerProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean;
}
declare const FAQAnswer: React.ForwardRefExoticComponent<FAQAnswerProps & React.RefAttributes<HTMLDivElement>>;
declare const FAQContact: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { FAQSection, FAQHeader, FAQTitle, FAQDescription, FAQList, FAQItem, FAQItemCard, FAQQuestion, FAQAnswer, FAQContact, };
