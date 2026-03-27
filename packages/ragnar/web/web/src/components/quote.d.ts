import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const quoteVariants: (props?: ({
    variant?: "default" | "card" | "minimal" | "centered" | null | undefined;
    size?: "sm" | "default" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface QuoteProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof quoteVariants> {
    showIcon?: boolean;
}
declare const QuoteComponent: React.ForwardRefExoticComponent<QuoteProps & React.RefAttributes<HTMLQuoteElement>>;
declare const QuoteText: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & {
    size?: "sm" | "default" | "lg";
} & React.RefAttributes<HTMLParagraphElement>>;
declare const QuoteAuthor: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const QuoteAuthorAvatar: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    src?: string;
    alt?: string;
} & React.RefAttributes<HTMLDivElement>>;
declare const QuoteAuthorInfo: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const QuoteAuthorName: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
declare const QuoteAuthorTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
export { QuoteComponent as Quote, QuoteText, QuoteAuthor, QuoteAuthorAvatar, QuoteAuthorInfo, QuoteAuthorName, QuoteAuthorTitle, };
