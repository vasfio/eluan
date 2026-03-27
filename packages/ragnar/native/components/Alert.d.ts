import React from "react";
import { ViewStyle, TextStyle } from "react-native";
export interface AlertProps {
    /** Alert title */
    title?: string;
    /** Alert description/message */
    children: React.ReactNode;
    /** Alert variant */
    variant?: "default" | "info" | "success" | "warning" | "destructive";
    /** Icon element */
    icon?: React.ReactNode;
    /** Show close button */
    closable?: boolean;
    /** Called when close button is pressed */
    onClose?: () => void;
    /** Action button */
    action?: {
        label: string;
        onPress: () => void;
    };
    /** Container style */
    style?: ViewStyle;
    /** Title style */
    titleStyle?: TextStyle;
}
export declare function Alert({ title, children, variant, icon, closable, onClose, action, style, titleStyle, }: AlertProps): React.JSX.Element;
export interface InlineAlertProps {
    /** Alert message */
    children: React.ReactNode;
    /** Alert variant */
    variant?: "info" | "success" | "warning" | "error";
    /** Container style */
    style?: ViewStyle;
}
export declare function InlineAlert({ children, variant, style, }: InlineAlertProps): React.JSX.Element;
export interface AlertBannerProps {
    /** Banner message */
    children: React.ReactNode;
    /** Banner variant */
    variant?: "info" | "success" | "warning" | "destructive";
    /** Icon element */
    icon?: React.ReactNode;
    /** Show close button */
    closable?: boolean;
    /** Called when close button is pressed */
    onClose?: () => void;
    /** Action button */
    action?: {
        label: string;
        onPress: () => void;
    };
    /** Container style */
    style?: ViewStyle;
}
export declare function AlertBanner({ children, variant, icon, closable, onClose, action, style, }: AlertBannerProps): React.JSX.Element;
//# sourceMappingURL=Alert.d.ts.map