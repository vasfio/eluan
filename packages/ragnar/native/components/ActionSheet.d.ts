import React from "react";
import { ViewStyle } from "react-native";
export interface ActionSheetOption {
    /** Unique key for the option */
    key: string;
    /** Display label */
    label: string;
    /** Optional description */
    description?: string;
    /** Icon element */
    icon?: React.ReactNode;
    /** Destructive style (red) */
    destructive?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Called when option is pressed */
    onPress?: () => void;
}
export interface ActionSheetProps {
    /** Whether the action sheet is visible */
    visible: boolean;
    /** Called when action sheet should close */
    onClose: () => void;
    /** Title of the action sheet */
    title?: string;
    /** Description/message */
    message?: string;
    /** Available options */
    options: ActionSheetOption[];
    /** Cancel button label */
    cancelLabel?: string;
    /** Container style */
    style?: ViewStyle;
}
export declare function ActionSheet({ visible, onClose, title, message, options, cancelLabel, style, }: ActionSheetProps): React.JSX.Element;
export declare function useActionSheet(): {
    show: (props: Omit<ActionSheetProps, "visible" | "onClose">) => void;
    hide: () => void;
    ActionSheet: () => React.JSX.Element;
};
//# sourceMappingURL=ActionSheet.d.ts.map