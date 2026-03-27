import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const blogGridVariants: (props?: ({
    columns?: 1 | 2 | 3 | 4 | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface BlogGridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof blogGridVariants> {
}
declare const BlogGrid: React.ForwardRefExoticComponent<BlogGridProps & React.RefAttributes<HTMLDivElement>>;
declare const blogCardVariants: (props?: ({
    variant?: "default" | "bordered" | "minimal" | "elevated" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface BlogCardProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof blogCardVariants> {
    href?: string;
}
declare const BlogCard: React.ForwardRefExoticComponent<BlogCardProps & React.RefAttributes<HTMLElement>>;
export interface BlogCardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    aspectRatio?: "video" | "square" | "wide";
}
declare const BlogCardImage: React.ForwardRefExoticComponent<BlogCardImageProps & React.RefAttributes<HTMLDivElement>>;
declare const BlogCardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const BlogCardMeta: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const BlogCardCategory: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
declare const BlogCardDate: React.ForwardRefExoticComponent<React.TimeHTMLAttributes<HTMLTimeElement> & React.RefAttributes<HTMLTimeElement>>;
declare const BlogCardReadTime: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
declare const BlogCardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const BlogCardExcerpt: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const BlogCardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export interface BlogCardAuthorProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const BlogCardAuthor: React.ForwardRefExoticComponent<BlogCardAuthorProps & React.RefAttributes<HTMLDivElement>>;
export interface BlogCardAuthorAvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string;
}
declare const BlogCardAuthorAvatar: React.ForwardRefExoticComponent<BlogCardAuthorAvatarProps & React.RefAttributes<HTMLDivElement>>;
declare const BlogCardAuthorName: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
declare const BlogCardLink: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
declare const BlogCardFeatured: React.ForwardRefExoticComponent<BlogCardProps & React.RefAttributes<HTMLElement>>;
export { BlogGrid, BlogCard, BlogCardImage, BlogCardContent, BlogCardMeta, BlogCardCategory, BlogCardDate, BlogCardReadTime, BlogCardTitle, BlogCardExcerpt, BlogCardFooter, BlogCardAuthor, BlogCardAuthorAvatar, BlogCardAuthorName, BlogCardLink, BlogCardFeatured, };
