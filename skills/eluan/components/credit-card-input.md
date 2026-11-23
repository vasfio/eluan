---
name: CreditCardInput
use_when: Your app collects card number, expiry and security code in its own fields and needs formatting and brand detection.
instead_of: Your payment provider's hosted card fields when it offers them; Input for any other text; NumberInput for quantities.
source: packages/core/src/components/credit-card-input.tsx
---

# CreditCardInput

## 1. Overview

CreditCardInput is a labelled group of three [Input](./input.md)-based fields: card number (grouped by brand, with the detected brand's logo), expiry (MM/YY) and security code (3 digits, 4 for American Express). It reports all three, the brand and a length-based `isValid` through `onCardChange`. The three fields are also exported on their own for custom layouts.

## 2. When to use

- A checkout or billing form where your app collects card details in its own fields.
- A custom layout of the same fields, with visible labels, using CreditCardNumberInput, CreditCardExpiryInput and CreditCardCVVInput.

### When not to use

- Your payment provider offers hosted or embedded card fields → use those, so raw card data never passes through your app. <!-- REVIEW: drafted; source doesn't discuss hosted fields or PCI scope. -->
- Any other text → use [Input](./input.md).
- A numeric amount to charge → use [DecimalInput](./decimal-input.md) (`CurrencyInput`).

CreditCardInput earns its place through masking and formatting: brand-specific digit groups, the MM/YY slash, brand detection and per-brand length limits. Its validation only checks lengths.

## 3. Anatomy

1. **Group**: a `role="group"` container named "Credit card details". The number field spans the full width; expiry and security code share a two-column row below. Gaps are `--spacing-md`.
2. **Card number field**: leading card icon, digits in groups, trailing brand logo (or a generic card icon until a brand is detected).
3. **Expiry field**: leading calendar icon, MM/YY.
4. **Security code field**: leading lock icon, 3 or 4 digits.
5. **Error messages**: one visually hidden `role="alert"` message per field ("Enter a valid card number", "Enter a valid expiration date", "Enter a valid security code").

The composite shows no visible labels; each field is named with `aria-label` and shows a placeholder.

## 4. Variants

| Export | Use for |
| --- | --- |
| `CreditCardInput` | The complete group, with validation and one `onCardChange`. |
| `CreditCardNumberInput` | Card number on its own: formatting, brand detection and logo. |
| `CreditCardExpiryInput` | Expiry on its own: MM/YY formatting. |
| `CreditCardCVVInput` | Security code on its own; pass `cardType` so its length follows the brand. |

## 5. Sizes

No size prop. Each field is `--size-lg` tall, from Input, and follows density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Three Input fields with icons and placeholders | |
| Focus | Border and 1px outline in `--focus-ring`, 1px offset | Never remove or restyle the focus ring. |
| Brand detected | The trailing icon becomes the brand logo, drawn in `currentColor` | Visa, Mastercard, American Express, Discover, Diners Club, JCB, UnionPay. |
| Invalid (composite) | `--destructive-border` border, `aria-invalid`, hidden message announced | Only after the user leaves a field that has content failing its length check. Sighted users see only the border colour. <!-- REVIEW: drafted observation; the composite has no visible error text, and the fix plan doesn't cover it. --> |
| Disabled | All three fields disabled | `disabled` on the composite reaches every field. |

## 7. Content guidelines

- Introduce the group with a heading or a Fieldset legend: "Payment details" or "Card".
- In a custom layout, label the fields "Card number", "Expiry date" and "Security code".
- Write card errors that say what to check: "Check the card number".

| Do | Don't |
| --- | --- |
| Card number | CC # |
| Security code | CVV2/CVC2/CID |
| Check the expiry date | Payment error |

<!-- REVIEW: copy guidance is drafted; source fixes the composite's aria-labels and messages but gives no other content rules. -->

## 8. Rules

1. Never log card data or send it anywhere but your payment provider. `onCardChange` carries the full number and security code.
2. Don't trust `isValid` for payment. It checks lengths only: no Luhn checksum, no month range, no past-date check. Let the provider validate.
3. Read card data from `onCardChange` (or each part's `onValueChange`). The fields have no `name`, so native form submission doesn't include them.
4. Put the composite under a heading or in a [Fieldset](./fieldset.md) with a legend. When you need visible field labels, compose the parts with Label instead. <!-- REVIEW: drafted; follows from the composite showing placeholders only. -->
5. When composing parts, pass the brand from the number field's `onValueChange` to CreditCardCVVInput's `cardType`.
6. Treat the parts as uncontrolled. They ignore `value`; don't pass `defaultValue`.
7. Keep the default `autoComplete` values (`cc-number`, `cc-exp`, `cc-csc`) so browsers and password managers can fill the card.
8. Never pass `className` or `style`; they're dropped. Put width on a wrapper.

## 9. Dos and don'ts

**Do:** keep card data in memory and hand it to the provider on submit.

```tsx
<CreditCardInput onCardChange={(card) => { cardRef.current = card; }} />
```

**Don't:** log or persist the payload.

```tsx
<CreditCardInput onCardChange={(card) => console.log(card)} />
<CreditCardInput onCardChange={(card) => localStorage.setItem("card", JSON.stringify(card))} />
```

**Do:** link the brand to the security code when composing parts.

```tsx
<CreditCardNumberInput id="card-number" onValueChange={(digits, type) => { setNumber(digits); setCardType(type); }} />
<CreditCardCVVInput id="card-cvc" cardType={cardType} onValueChange={setCvc} />
```

**Don't:** use a plain Input for card numbers.

```tsx
<Input placeholder="Card number" maxLength={19} />
```

## 10. Accessibility

- Role: the composite is a `group` named "Credit card details"; each field is a `textbox` with `inputMode="numeric"`.
- Labels: the fields are named "Card number", "Expiration date (MM/YY)" and "Security code (CVV)" by default. A passed `aria-label` or `aria-labelledby` replaces the default. Because the default `aria-label` outranks `<label htmlFor>`, pass `aria-labelledby` pointing at your Label's `id` when composing parts with visible labels.
- Errors (composite): after blur, an invalid field gets `aria-invalid` and `aria-describedby` pointing at its message, which is announced through `role="alert"`.
- Keyboard: standard text input; Tab moves number, expiry, security code.
- Brand logos and field icons are `aria-hidden`.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Card number: non-digits are removed. Digits are grouped 4-4-4-4, or 4-6-5 for American Express and 4-6-4 for Diners Club, and capped at the brand's longest length (19 when unknown).
- Expiry: non-digits are removed and a slash is added after the month. Backspacing from just after the slash puts it straight back, so the user has to move the caret or select to delete the month. <!-- REVIEW: source bug, not in the fix plan; formatExpiry re-adds the slash whenever two or more digits remain. -->
- Security code: digits only, capped at 4 for American Express and 3 otherwise.
- Values reported are digits only: the number without spaces, the expiry as `MMYY`.
- `onCardChange` fires on each edit, never on mount.
- Responsive: the expiry and security code row stays two columns at every width.
- Motion: colour transitions over 150ms, from Input. Don't add your own.

## 12. API

<!-- api:start -->
### CreditCardInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onCardChange` | `(data: { number: string; expiry: string; cvv: string; cardType: CardType; isValid: boolean }) => void` | | Fires on every edit with digits-only values, the brand and length-based validity. |
| `disabled` | `boolean` | | Disables all three fields. |

Takes no other props. `ref` reaches the group `<div>`. `CardType` is `"visa" \| "mastercard" \| "amex" \| "discover" \| "diners" \| "jcb" \| "unionpay" \| "unknown"`.

### CreditCardNumberInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onValueChange` | `(value: string, cardType: CardType) => void` | | Digits without spaces, and the detected brand. |
| `...props` | `InputHTMLAttributes` without `className`, `style`, `size`, `type`, `onChange` | | Native attributes: `id`, `onBlur`, `required`, `aria-*`. Defaults `aria-label="Card number"`, `autoComplete="cc-number"`, a sample placeholder. `value` is ignored. |

### CreditCardExpiryInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onValueChange` | `(value: string) => void` | | Digits only, as `MMYY`. |
| `...props` | `InputHTMLAttributes` without `className`, `style`, `size`, `type`, `onChange` | | Defaults `aria-label="Expiration date (MM/YY)"`, `autoComplete="cc-exp"`, placeholder `MM/YY`. `value` is ignored. |

### CreditCardCVVInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `cardType` | `CardType` | `"unknown"` | `"amex"` allows 4 digits; anything else allows 3. |
| `onValueChange` | `(value: string) => void` | | Digits only. |
| `...props` | `InputHTMLAttributes` without `className`, `style`, `size`, `type`, `onChange` | | Defaults `aria-label="Security code (CVV)"`, `autoComplete="cc-csc"`, `maxLength` from `cardType`. `value` is ignored. |
<!-- api:end -->

## 13. Examples

```tsx
import { useRef, useState, type FormEvent } from "react";
import { Banner, Button, CreditCardInput, Fieldset, FieldsetLegend } from "@eluan/core";

type Card = { number: string; expiry: string; cvv: string; cardType: string; isValid: boolean };

export function PaymentForm({ onPay }: { onPay: (card: Card) => Promise<string | null> }) {
  const cardRef = useRef<Card | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const card = cardRef.current;
    if (!card?.isValid) return setError("Check the card number, expiry date and security code.");
    setError(await onPay(card));
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
      {error && (
        <Banner variant="destructive" position="inline" role="alert">
          {error}
        </Banner>
      )}
      <Fieldset>
        <FieldsetLegend>Payment details</FieldsetLegend>
        <CreditCardInput
          onCardChange={(card) => {
            cardRef.current = card;
          }}
        />
      </Fieldset>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit">Pay $49.00</Button>
      </div>
    </form>
  );
}
```

## 14. Related components

- [Input](./input.md): the base field for all three parts.
- [Fieldset](./fieldset.md): groups the card fields under a legend.
- [Banner](./banner.md): a payment error for the whole form.
- [DecimalInput](./decimal-input.md): amounts, with CurrencyInput.
- [Forms pattern](../patterns/forms.md): field structure, errors and submit.

## 15. Common agent mistakes

_Filled from evals._
