import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const teamSectionVariants: (props?: ({
    size?: "sm" | "default" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TeamSectionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof teamSectionVariants> {
}
declare const TeamSection: React.ForwardRefExoticComponent<TeamSectionProps & React.RefAttributes<HTMLDivElement>>;
declare const TeamHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const TeamTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const TeamDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const teamGridVariants: (props?: ({
    columns?: 2 | 3 | 4 | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TeamGridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof teamGridVariants> {
}
declare const TeamGrid: React.ForwardRefExoticComponent<TeamGridProps & React.RefAttributes<HTMLDivElement>>;
declare const teamMemberVariants: (props?: ({
    variant?: "default" | "card" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TeamMemberProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof teamMemberVariants> {
}
declare const TeamMember: React.ForwardRefExoticComponent<TeamMemberProps & React.RefAttributes<HTMLDivElement>>;
export interface TeamMemberImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string;
}
declare const TeamMemberImage: React.ForwardRefExoticComponent<TeamMemberImageProps & React.RefAttributes<HTMLImageElement>>;
declare const TeamMemberName: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const TeamMemberRole: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const TeamMemberBio: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const TeamMemberLinks: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export interface TeamMemberLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    label: string;
}
declare const TeamMemberLink: React.ForwardRefExoticComponent<TeamMemberLinkProps & React.RefAttributes<HTMLAnchorElement>>;
export { TeamSection, TeamHeader, TeamTitle, TeamDescription, TeamGrid, TeamMember, TeamMemberImage, TeamMemberName, TeamMemberRole, TeamMemberBio, TeamMemberLinks, TeamMemberLink, };
