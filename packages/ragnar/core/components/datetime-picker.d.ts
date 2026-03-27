import * as React from "react";
export interface DateTimePickerProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    showSeconds?: boolean;
    use24Hour?: boolean;
}
declare const DateTimePicker: React.ForwardRefExoticComponent<DateTimePickerProps & React.RefAttributes<HTMLButtonElement>>;
export { DateTimePicker };
