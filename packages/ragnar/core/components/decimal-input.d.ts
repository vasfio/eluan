import * as React from "react";
type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "CNY" | "KRW" | "INR" | "BRL" | "CAD" | "AUD" | "CHF";
interface CurrencyInfo {
    code: CurrencyCode;
    symbol: string;
    name: string;
    decimals: number;
}
declare const currencies: Record<CurrencyCode, CurrencyInfo>;
export interface DecimalInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
    value?: number;
    onChange?: (value: number | undefined) => void;
    decimals?: number;
    min?: number;
    max?: number;
    prefix?: string;
    suffix?: string;
    currency?: CurrencyCode;
    unit?: string;
    unitPosition?: "prefix" | "suffix";
    thousandsSeparator?: string;
    decimalSeparator?: string;
    allowNegative?: boolean;
}
declare const DecimalInput: React.ForwardRefExoticComponent<DecimalInputProps & React.RefAttributes<HTMLInputElement>>;
export interface CurrencyInputProps extends Omit<DecimalInputProps, "currency"> {
    currency: CurrencyCode;
}
declare const CurrencyInput: React.ForwardRefExoticComponent<CurrencyInputProps & React.RefAttributes<HTMLInputElement>>;
export interface PercentageInputProps extends Omit<DecimalInputProps, "suffix" | "min" | "max"> {
    min?: number;
    max?: number;
}
declare const PercentageInput: React.ForwardRefExoticComponent<PercentageInputProps & React.RefAttributes<HTMLInputElement>>;
export interface UnitInputProps extends Omit<DecimalInputProps, "unit" | "unitPosition"> {
    unit: string;
    unitPosition?: "prefix" | "suffix";
}
declare const UnitInput: React.ForwardRefExoticComponent<UnitInputProps & React.RefAttributes<HTMLInputElement>>;
export { DecimalInput, CurrencyInput, PercentageInput, UnitInput, currencies };
export type { CurrencyCode, CurrencyInfo };
