import React from "react";
import { ViewStyle, TextStyle } from "react-native";
export interface SliderProps {
    /** Current value */
    value?: number;
    /** Default value (uncontrolled) */
    defaultValue?: number;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Step increment */
    step?: number;
    /** Called when value changes */
    onValueChange?: (value: number) => void;
    /** Called when sliding ends */
    onSlidingComplete?: (value: number) => void;
    /** Label text */
    label?: string;
    /** Show current value */
    showValue?: boolean;
    /** Format value for display */
    formatValue?: (value: number) => string;
    /** Disabled state */
    disabled?: boolean;
    /** Size variant */
    size?: "sm" | "default" | "lg";
    /** Container style */
    style?: ViewStyle;
    /** Track style */
    trackStyle?: ViewStyle;
    /** Thumb style */
    thumbStyle?: ViewStyle;
    /** Label style */
    labelStyle?: TextStyle;
}
export declare function Slider({ value: controlledValue, defaultValue, min, max, step, onValueChange, onSlidingComplete, label, showValue, formatValue, disabled, size, style, trackStyle, thumbStyle, labelStyle, }: SliderProps): React.JSX.Element;
export interface RangeSliderProps {
    /** Current value range [min, max] */
    value?: [number, number];
    /** Default value range (uncontrolled) */
    defaultValue?: [number, number];
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Step increment */
    step?: number;
    /** Minimum gap between values */
    minGap?: number;
    /** Called when value changes */
    onValueChange?: (value: [number, number]) => void;
    /** Called when sliding ends */
    onSlidingComplete?: (value: [number, number]) => void;
    /** Label text */
    label?: string;
    /** Show current values */
    showValue?: boolean;
    /** Format value for display */
    formatValue?: (value: number) => string;
    /** Disabled state */
    disabled?: boolean;
    /** Size variant */
    size?: "sm" | "default" | "lg";
    /** Container style */
    style?: ViewStyle;
}
export declare function RangeSlider({ value: controlledValue, defaultValue, min, max, step: _step, minGap: _minGap, onValueChange: _onValueChange, onSlidingComplete: _onSlidingComplete, label, showValue, formatValue, disabled, size, style, }: RangeSliderProps): React.JSX.Element;
//# sourceMappingURL=Slider.d.ts.map