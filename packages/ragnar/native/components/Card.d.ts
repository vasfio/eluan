import React from "react";
import { ViewProps, TextProps } from "react-native";
export interface CardProps extends ViewProps {
    children: React.ReactNode;
}
export declare function Card({ children, style, ...props }: CardProps): React.JSX.Element;
export interface CardHeaderProps extends ViewProps {
    children: React.ReactNode;
}
export declare function CardHeader({ children, style, ...props }: CardHeaderProps): React.JSX.Element;
export interface CardTitleProps extends TextProps {
    children: React.ReactNode;
}
export declare function CardTitle({ children, style, ...props }: CardTitleProps): React.JSX.Element;
export interface CardDescriptionProps extends TextProps {
    children: React.ReactNode;
}
export declare function CardDescription({ children, style, ...props }: CardDescriptionProps): React.JSX.Element;
export interface CardContentProps extends ViewProps {
    children: React.ReactNode;
}
export declare function CardContent({ children, style, ...props }: CardContentProps): React.JSX.Element;
export interface CardFooterProps extends ViewProps {
    children: React.ReactNode;
}
export declare function CardFooter({ children, style, ...props }: CardFooterProps): React.JSX.Element;
//# sourceMappingURL=Card.d.ts.map