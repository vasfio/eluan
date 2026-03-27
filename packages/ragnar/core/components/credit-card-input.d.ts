import * as React from "react";
type CardType = "visa" | "mastercard" | "amex" | "discover" | "diners" | "jcb" | "unionpay" | "unknown";
export interface CreditCardInputProps {
    onCardChange?: (data: {
        number: string;
        expiry: string;
        cvv: string;
        cardType: CardType;
        isValid: boolean;
    }) => void;
    className?: string;
    disabled?: boolean;
}
export interface CreditCardNumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    onChange?: (value: string, cardType: CardType) => void;
}
export interface CreditCardExpiryInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    onChange?: (value: string) => void;
}
export interface CreditCardCVVInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    cardType?: CardType;
    onChange?: (value: string) => void;
}
declare const CreditCardNumberInput: React.ForwardRefExoticComponent<CreditCardNumberInputProps & React.RefAttributes<HTMLInputElement>>;
declare const CreditCardExpiryInput: React.ForwardRefExoticComponent<CreditCardExpiryInputProps & React.RefAttributes<HTMLInputElement>>;
declare const CreditCardCVVInput: React.ForwardRefExoticComponent<CreditCardCVVInputProps & React.RefAttributes<HTMLInputElement>>;
declare const CreditCardInput: React.ForwardRefExoticComponent<CreditCardInputProps & React.RefAttributes<HTMLDivElement>>;
export { CreditCardInput, CreditCardNumberInput, CreditCardExpiryInput, CreditCardCVVInput, };
