---
name: DecimalInput
use_when: The user enters money, a percentage, a measurement or another decimal that should display with fixed decimals and thousands separators.
instead_of: NumberInput for counts with steppers; Slider for approximate values on a range; Input for text that isn't a number.
source: packages/core/src/components/decimal-input.tsx
---

# DecimalInput

## 1. Overview

DecimalInput is a right-aligned, monospaced field for decimal amounts. While the user types it keeps only digits, one decimal separator and, if allowed, a leading minus, and caps the number of decimal places. On blur it shows the controlled value with thousands separators and fixed decimals. Prefix and suffix text (a currency symbol, `%`, a unit) sit inside the field. Three presets ship with it: CurrencyInput, PercentageInput and UnitInput.

## 2. When to use

- Money: prices, budgets, invoice lines (CurrencyInput).
- Rates and shares: discount, tax rate, allocation (PercentageInput).
- Measurements: weight, length, duration (UnitInput).
- Any decimal with a fixed precision (DecimalInput).

### When not to use

- Plain text → use [Input](./input.md).
- A whole-number count with minus and plus buttons → use [NumberInput](./number-input.md).
- A value on a continuous range where close enough is fine → use [Slider](./slider.md).

DecimalInput earns its place through formatting: separators and fixed decimals on blur, the decimal-place cap while typing, and the currency, percent and unit affixes. It only formats when controlled.

## 3. Anatomy

1. **Field**: a native `<input type="text" inputMode="decimal">`, right-aligned in `--font-mono`.
2. **Prefix** (optional): the currency symbol, `prefix`, or a prefix `unit`, in `--interactive-fg-alt` at the leading edge.
3. **Suffix** (optional): `suffix`, `%`, or a suffix `unit`, at the trailing edge.

The field's padding grows to fit the affixes. Affixes are visual text; they aren't part of the field's accessible name.

## 4. Variants

| Export | Use for |
| --- | --- |
| `DecimalInput` | Any decimal; you set decimals, affixes, separators and bounds. |
| `CurrencyInput` | Money. `currency` is required and sets the symbol prefix and the decimal places. |
| `PercentageInput` | Percentages. Fixed `%` suffix; defaults to `min={0}`, `max={100}`, `decimals={1}`. |
| `UnitInput` | Measurements. `unit` is required and shows as a suffix by default. |

## 5. Sizes

No size prop. The field is `--size-lg` tall and follows density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | `--container-bg` surface, `--interactive-border-alt` border, affixes and placeholder in `--interactive-fg-alt` | DecimalInput draws its own field rather than using Input; the surface token differs from Input's `--interactive-bg` but looks the same in the default theme. <!-- REVIEW: latent token drift, W5 in the fix plan. --> |
| Focus | Border and 1px outline in `--interactive-border`, 1px offset; value shown unformatted | Never remove or restyle the focus ring. |
| Disabled | `--interactive-bg-disabled` surface, `--interactive-fg-disabled` text, not-allowed cursor | |
| Error | No visual change | `aria-invalid` has no style here, unlike Input. Show a FormMessage and still set `aria-invalid` for assistive tech. <!-- REVIEW: follows from W5 (decimal-input.tsx re-implements Input); not listed as its own fix-plan item. --> |

## 7. Content guidelines

- Put the currency or unit in the label when the affix carries meaning: "Price (USD)", "Weight (kg)". Screen readers don't hear the affix.
- Use a placeholder that shows the expected precision, such as "0.00", or none.
- State bounds in a description: "Up to 100%".

| Do | Don't |
| --- | --- |
| Monthly budget (USD) | Amount |
| Discount, up to 100% | Enter a percentage value |

<!-- REVIEW: copy guidance is drafted; source has no content rules for this component. -->

## 8. Rules

1. Always control it: pass `value` and update it from `onValueChange`. Uncontrolled, it never formats; with a `value` that doesn't update, the field snaps back to that value on blur.
2. Give the field a visible [Label](./form-label.md) tied with `htmlFor` and `id`, including the currency or unit.
3. Use CurrencyInput for money rather than a hand-written `prefix="$"` with `decimals={2}`. It takes the symbol and decimal places from `currencies`.
4. Set separators yourself; nothing is locale-aware. CurrencyInput doesn't change separators: pass `thousandsSeparator="."` and `decimalSeparator=","` where that's the convention.
5. Expect `currency` to win over `decimals`. To show a currency with other precision, use DecimalInput with `prefix`.
6. Validate bounds on submit. `min` and `max` clamp the number sent to `onValueChange` as the user types, but the field shows what they typed until blur.
7. Set `allowNegative` for refunds and adjustments; it's off by default.
8. Never pass `className` or `style`; they're dropped. Put width on a wrapper.

## 9. Dos and don'ts

**Do:** control the value and name the currency in the label.

```tsx
<Label htmlFor="budget">Monthly budget (USD)</Label>
<CurrencyInput id="budget" currency="USD" value={budget} onValueChange={setBudget} />
```

**Don't:** leave it uncontrolled, or pin a value without updating it.

```tsx
<CurrencyInput currency="USD" />
<CurrencyInput currency="USD" value={99.99} />
```

**Do:** set separators for the format your users expect.

```tsx
<CurrencyInput currency="EUR" thousandsSeparator="." decimalSeparator="," value={amount} onValueChange={setAmount} />
```

**Don't:** fake a unit with an icon or text outside the field.

```tsx
<div style={{ display: "flex" }}>
  <DecimalInput value={weight} onValueChange={setWeight} />
  <span>kg</span>
</div>
```

## 10. Accessibility

- Role: `textbox` (`type="text"` with `inputMode="decimal"`, so mobile shows a decimal keypad).
- Label: a Label tied by `htmlFor`/`id`. Include the currency or unit in it; the prefix and suffix text isn't part of the name.
- Keyboard: standard text input. There's no arrow-key stepping.
- Focus: native focus. On focus the value switches to its raw form (for example `1234.5`) for editing.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1, and focus swaps the border to a lighter token than at rest; don't patch either per field. <!-- REVIEW: system-wide focus-ring issue, W1 in the fix plan; decimal-input.tsx is one of the six fields it lists. -->

## 11. Behaviour

- Typing: anything other than digits, the decimal separator and (with `allowNegative`) one leading minus is removed. Extra decimal separators are dropped, and digits past the allowed decimal places are cut off. Thousands separators can't be typed; they're added on blur.
- Focus and blur: with a controlled `value`, focus shows the raw number and blur shows it formatted, for example `1,234.50`.
- `onValueChange` sends a JS `number` on every change, clamped to `min` and `max`, or `undefined` when the field can't be parsed.
- Setting `value` back to `undefined` doesn't clear the field. Set a number, or remount with a new `key` to reset. <!-- REVIEW: source oddity, not in the fix plan; the sync effect skips undefined. -->
- Responsive: fills its container's width. Constrain it with a wrapper.
- Motion: colour transitions over 150ms. Don't add your own.

## 12. API

<!-- api:start -->
### DecimalInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | | Controlled value. Required for formatting. |
| `onValueChange` | `(value: number \| undefined) => void` | | Fires on every change with the clamped number, or `undefined`. |
| `decimals` | `number` | `2` | Decimal places allowed while typing and shown on blur. Ignored when `currency` is set. |
| `min` | `number` | | Lower bound for the emitted value. |
| `max` | `number` | | Upper bound for the emitted value. |
| `prefix` | `string` | | Text at the leading edge. Overrides the currency symbol. |
| `suffix` | `string` | | Text at the trailing edge. |
| `currency` | `CurrencyCode` | | One of `currencies`' keys; sets the symbol prefix and decimal places. |
| `unit` | `string` | | Unit text, placed by `unitPosition`. |
| `unitPosition` | `"prefix" \| "suffix"` | `"prefix"` | Where `unit` shows. |
| `thousandsSeparator` | `string` | `","` | Inserted between groups of three digits on blur. |
| `decimalSeparator` | `string` | `"."` | Separates whole and fractional parts, typed and displayed. |
| `allowNegative` | `boolean` | `false` | Allows one leading minus sign. |
| `disabled` | `boolean` | | Disables the field. |
| `...props` | `InputHTMLAttributes` without `className`, `style`, `size`, `type`, `value`, `onChange` | | Native input attributes: `id`, `name`, `placeholder`, `required`, `aria-*`. `ref` reaches the `<input>`. |

### CurrencyInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `currency` | `CurrencyCode` | required | Sets the symbol prefix and decimal places. |
| `...props` | DecimalInput props | | Everything else as DecimalInput. |

### PercentageInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `min` | `number` | `0` | Lower bound. |
| `max` | `number` | `100` | Upper bound. |
| `decimals` | `number` | `1` | Decimal places. |
| `...props` | DecimalInput props without `suffix` | | The `%` suffix is fixed. |

### UnitInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `unit` | `string` | required | Unit text, for example `"kg"`. |
| `unitPosition` | `"prefix" \| "suffix"` | `"suffix"` | Where the unit shows. |
| `...props` | DecimalInput props | | Everything else as DecimalInput. |

### currencies

`Record<CurrencyCode, { code, symbol, name, decimals }>` for the eleven supported currencies: USD, EUR, GBP, JPY, CNY, KRW, INR, BRL, CAD, AUD, CHF. JPY and KRW have 0 decimals; the rest have 2. The `CurrencyCode` and `CurrencyInfo` types are exported too.
<!-- api:end -->

## 13. Examples

```tsx
import { useState } from "react";
import { CurrencyInput, FormDescription, Label, PercentageInput } from "@eluan/core";

export function PricingFields() {
  const [price, setPrice] = useState<number | undefined>(49);
  const [discount, setDiscount] = useState<number | undefined>(10);

  const field = { display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" } as const;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--spacing-lg)" }}>
      <div style={field}>
        <Label htmlFor="plan-price" required>Price per month (USD)</Label>
        <CurrencyInput
          id="plan-price"
          name="price"
          currency="USD"
          min={0}
          placeholder="0.00"
          value={price}
          onValueChange={setPrice}
        />
      </div>
      <div style={field}>
        <Label htmlFor="plan-discount">Annual discount</Label>
        <PercentageInput
          id="plan-discount"
          name="discount"
          value={discount}
          onValueChange={setDiscount}
          aria-describedby="plan-discount-hint"
        />
        <FormDescription id="plan-discount-hint">Up to 100%. Applied when billed yearly.</FormDescription>
      </div>
    </div>
  );
}
```

## 14. Related components

- [NumberInput](./number-input.md): whole-number counts with steppers.
- [Slider](./slider.md): approximate values on a range.
- [Input](./input.md): the field family DecimalInput is styled to match.
- [Forms pattern](../patterns/forms.md): field structure and validation.

## 15. Common agent mistakes

_Filled from evals._
