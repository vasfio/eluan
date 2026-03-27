import * as React from "react";
export interface Country {
    code: string;
    name: string;
    dialCode: string;
    flag: string;
}
declare const defaultCountries: Country[];
export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
    countries?: Country[];
    defaultCountry?: string;
    value?: string;
    onChange?: (value: string, country: Country) => void;
    onCountryChange?: (country: Country) => void;
}
declare const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps & React.RefAttributes<HTMLInputElement>>;
export { PhoneInput, defaultCountries };
