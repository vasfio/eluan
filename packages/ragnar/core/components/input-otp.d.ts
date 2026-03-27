import * as React from "react";
export interface InputOTPProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    /** Number of OTP slots */
    length?: number;
    /** Called when OTP value changes */
    onChange?: (value: string) => void;
    /** Called when all slots are filled */
    onComplete?: (value: string) => void;
    /** Render as password/hidden */
    mask?: boolean;
    /** Auto focus first input */
    autoFocus?: boolean;
}
declare const InputOTP: React.ForwardRefExoticComponent<InputOTPProps & React.RefAttributes<HTMLDivElement>>;
declare const InputOTPSlot: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & {
    index: number;
    char?: string;
    hasFakeCaret?: boolean;
    isActive?: boolean;
} & React.RefAttributes<HTMLInputElement>>;
declare const InputOTPGroup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const InputOTPSeparator: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
