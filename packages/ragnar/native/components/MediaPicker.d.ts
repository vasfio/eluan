import React from "react";
import { ViewStyle } from "react-native";
export interface MediaItem {
    /**
     * Unique identifier for the media
     */
    id: string;
    /**
     * URI of the media
     */
    uri: string;
    /**
     * Type of media
     */
    type: "image" | "video";
    /**
     * Duration in seconds (for video)
     */
    duration?: number;
    /**
     * File name
     */
    fileName?: string;
}
export interface MediaPickerProps {
    /**
     * Currently selected media items
     */
    selectedMedia: MediaItem[];
    /**
     * Callback when media selection changes
     */
    onSelectionChange: (media: MediaItem[]) => void;
    /**
     * Maximum number of items that can be selected
     * @default 1
     */
    maxSelection?: number;
    /**
     * Allowed media types
     * @default ["image", "video"]
     */
    allowedTypes?: ("image" | "video")[];
    /**
     * Callback to trigger native picker
     */
    onPickerPress: () => void;
    /**
     * Callback to trigger camera
     */
    onCameraPress?: () => void;
    /**
     * Placeholder text when no media selected
     */
    placeholder?: string;
    /**
     * Style for the container
     */
    style?: ViewStyle;
    /**
     * Whether the picker is disabled
     */
    disabled?: boolean;
}
export declare function MediaPicker({ selectedMedia, onSelectionChange, maxSelection, onPickerPress, onCameraPress, placeholder, style, disabled, }: MediaPickerProps): React.JSX.Element;
//# sourceMappingURL=MediaPicker.d.ts.map