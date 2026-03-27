import * as React from "react";
export interface DatePickerProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    dateFormat?: string;
}
declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLButtonElement>>;
export interface DateRangePickerProps {
    value?: {
        from: Date | undefined;
        to: Date | undefined;
    };
    onChange?: (range: {
        from: Date | undefined;
        to: Date | undefined;
    }) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    dateFormat?: string;
}
declare const DateRangePicker: React.ForwardRefExoticComponent<DateRangePickerProps & React.RefAttributes<HTMLButtonElement>>;
export { DatePicker, DateRangePicker };
