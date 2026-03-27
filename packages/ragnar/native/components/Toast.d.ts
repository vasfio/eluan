import React from "react";
import { ViewStyle } from "react-native";
export interface ToastProps {
    /** Toast ID */
    id: string;
    /** Toast title */
    title: string;
    /** Toast description */
    description?: string;
    /** Toast variant */
    variant?: "default" | "success" | "warning" | "destructive" | "info";
    /** Duration in ms (0 for persistent) */
    duration?: number;
    /** Action button */
    action?: {
        label: string;
        onPress: () => void;
    };
    /** Called when toast is dismissed */
    onDismiss?: () => void;
    /** Container style */
    style?: ViewStyle;
}
export declare function Toast({ id: _id, title, description, variant, duration, action, onDismiss, style, }: ToastProps): React.JSX.Element;
interface ToastContextValue {
    toasts: ToastProps[];
    addToast: (toast: Omit<ToastProps, "id" | "onDismiss">) => string;
    removeToast: (id: string) => void;
    removeAllToasts: () => void;
}
export declare function useToast(): ToastContextValue;
export declare function useToastActions(): {
    toast: (props: Omit<ToastProps, "id" | "onDismiss">) => string;
    success: (title: string, description?: string) => string;
    error: (title: string, description?: string) => string;
    warning: (title: string, description?: string) => string;
    info: (title: string, description?: string) => string;
    dismiss: () => void;
};
export interface ToastProviderProps {
    children: React.ReactNode;
    /** Position of toasts */
    position?: "top" | "bottom";
    /** Maximum number of visible toasts */
    maxToasts?: number;
}
export declare function ToastProvider({ children, position, maxToasts, }: ToastProviderProps): React.JSX.Element;
export {};
//# sourceMappingURL=Toast.d.ts.map