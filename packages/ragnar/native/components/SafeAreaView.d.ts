import React from "react";
import { ViewProps, ViewStyle } from "react-native";
export interface SafeAreaViewProps extends ViewProps {
    /**
     * Content to render
     */
    children: React.ReactNode;
    /**
     * Which edges to apply safe area insets
     * @default ["top", "bottom", "left", "right"]
     */
    edges?: ("top" | "bottom" | "left" | "right")[];
    /**
     * Background color (defaults to theme background)
     */
    backgroundColor?: string;
    /**
     * Style for the container
     */
    style?: ViewStyle;
    /**
     * Mode for the safe area
     * - "padding": applies safe area as padding
     * - "margin": applies safe area as margin
     * @default "padding"
     */
    mode?: "padding" | "margin";
}
export declare function SafeAreaView({ children, edges, backgroundColor, style, mode, ...props }: SafeAreaViewProps): React.JSX.Element;
interface SafeAreaInsets {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export interface SafeAreaProviderProps {
    children: React.ReactNode;
    /**
     * Override insets (useful for testing or custom layouts)
     */
    insets?: Partial<SafeAreaInsets>;
}
export declare function SafeAreaProvider({ children, insets }: SafeAreaProviderProps): React.JSX.Element;
/**
 * Hook to access safe area insets
 */
export declare function useSafeAreaInsets(): SafeAreaInsets;
/**
 * Component to render content with safe area awareness
 */
export interface SafeAreaInsetsConsumerProps {
    children: (insets: SafeAreaInsets) => React.ReactNode;
}
export declare function SafeAreaInsetsConsumer({ children }: SafeAreaInsetsConsumerProps): React.JSX.Element;
export {};
//# sourceMappingURL=SafeAreaView.d.ts.map