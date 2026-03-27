import React from "react";
import { ViewStyle } from "react-native";
export type VoiceInputState = "idle" | "listening" | "processing" | "error";
export interface VoiceInputProps {
    /**
     * Current state of the voice input
     */
    state: VoiceInputState;
    /**
     * Callback when the microphone button is pressed
     */
    onPress: () => void;
    /**
     * Callback when the user wants to stop listening
     */
    onStop?: () => void;
    /**
     * Callback when the user wants to cancel
     */
    onCancel?: () => void;
    /**
     * Transcript of recognized speech (live or final)
     */
    transcript?: string;
    /**
     * Error message if state is "error"
     */
    errorMessage?: string;
    /**
     * Helper text shown when idle
     */
    helperText?: string;
    /**
     * Size of the microphone button
     * @default "default"
     */
    size?: "sm" | "default" | "lg";
    /**
     * Whether the input is disabled
     */
    disabled?: boolean;
    /**
     * Style for the container
     */
    style?: ViewStyle;
    /**
     * Custom microphone icon
     */
    micIcon?: React.ReactNode;
}
export declare function VoiceInput({ state, onPress, onStop, onCancel, transcript, errorMessage, helperText, size, disabled, style, micIcon, }: VoiceInputProps): React.JSX.Element;
export interface VoiceInputInlineProps {
    /**
     * Current state of the voice input
     */
    state: VoiceInputState;
    /**
     * Callback when the microphone button is pressed
     */
    onPress: () => void;
    /**
     * Whether the input is disabled
     */
    disabled?: boolean;
    /**
     * Style for the button
     */
    style?: ViewStyle;
}
export declare function VoiceInputInline({ state, onPress, disabled, style, }: VoiceInputInlineProps): React.JSX.Element;
//# sourceMappingURL=VoiceInput.d.ts.map