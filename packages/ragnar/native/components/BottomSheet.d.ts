import React from "react";
import { ViewStyle } from "react-native";
export interface BottomSheetProps {
    /**
     * Whether the bottom sheet is visible
     */
    visible: boolean;
    /**
     * Callback when the sheet is closed
     */
    onClose: () => void;
    /**
     * Content to render inside the sheet
     */
    children: React.ReactNode;
    /**
     * Height of the sheet as a percentage of screen height (0-1)
     * @default 0.5
     */
    snapPoint?: number;
    /**
     * Whether to show the drag handle
     * @default true
     */
    showHandle?: boolean;
    /**
     * Whether to close when tapping the backdrop
     * @default true
     */
    closeOnBackdropPress?: boolean;
    /**
     * Whether the sheet can be dragged to close
     * @default true
     */
    enableDrag?: boolean;
    /**
     * Style for the sheet container
     */
    style?: ViewStyle;
}
export declare function BottomSheet({ visible, onClose, children, snapPoint, showHandle, closeOnBackdropPress, enableDrag, style, }: BottomSheetProps): React.JSX.Element | null;
//# sourceMappingURL=BottomSheet.d.ts.map