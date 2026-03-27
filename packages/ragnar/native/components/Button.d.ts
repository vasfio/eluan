import React from "react";
import { ViewStyle, TextStyle, PressableProps } from "react-native";
export interface ButtonProps extends Omit<PressableProps, "style"> {
    children: React.ReactNode;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    style?: ViewStyle;
    textStyle?: TextStyle;
}
export declare function Button({ children, variant, size, disabled, style, textStyle, ...props }: ButtonProps): React.JSX.Element;
//# sourceMappingURL=Button.d.ts.map