import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const testimonialVariants: (props?: ({
    variant?: "default" | "card" | "minimal" | "featured" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof testimonialVariants> {
    author: {
        name: string;
        title?: string;
        company?: string;
        avatar?: string;
    };
    rating?: number;
    showQuoteIcon?: boolean;
}
declare const Testimonial: React.ForwardRefExoticComponent<TestimonialProps & React.RefAttributes<HTMLDivElement>>;
export interface TestimonialGridProps extends React.HTMLAttributes<HTMLDivElement> {
    columns?: 1 | 2 | 3;
}
declare const TestimonialGrid: React.ForwardRefExoticComponent<TestimonialGridProps & React.RefAttributes<HTMLDivElement>>;
export interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    testimonials: Array<{
        content: React.ReactNode;
        author: TestimonialProps["author"];
        rating?: number;
    }>;
    autoPlay?: boolean;
    interval?: number;
}
declare const TestimonialCarousel: React.ForwardRefExoticComponent<TestimonialCarouselProps & React.RefAttributes<HTMLDivElement>>;
export { Testimonial, TestimonialGrid, TestimonialCarousel };
