---
name: PhoneInput
use_when: The user enters a phone number and you need its country calling code.
instead_of: Input type="tel" when the country is fixed; Input for any other text.
source: packages/core/src/components/phone-input.tsx
---

# PhoneInput

## 1. Overview

PhoneInput pairs a country calling-code [Select](./select.md) (flag and dial code) with an [Input](./input.md) `type="tel"` for the number. As the user types it removes anything that isn't a digit, space, hyphen or parenthesis, and it reports the number with the selected country. It doesn't format the number or check its length.

## 2. When to use

- Contact, account and checkout forms that accept numbers from more than one country.
- When you need the country (dial code) stored alongside the number.

### When not to use

- A phone number in a product that serves one country → use [Input](./input.md) `type="tel"`, which shows the phone icon and the phone keypad on mobile. <!-- REVIEW: drafted; source doesn't say when to drop the country picker. -->
- Any other text → use [Input](./input.md).
- A verification code sent by SMS → use [InputOTP](./input-otp.md).

PhoneInput earns its place through the country picker and the character filter. It doesn't mask, format or validate numbers; do that on submit.

## 3. Anatomy

1. **Country trigger**: a Select trigger showing the flag and dial code, attached flush to the field.
2. **Country list**: the Select's list of countries, each row showing flag, name and dial code, sorted by name.
3. **Number field**: an Input `type="tel"` with its left edge attached to the trigger.
4. **Leading icon**: Input's phone icon. <!-- REVIEW: source bug, not in the fix plan. phone-input.tsx passes icon={null} to hide it, but input.tsx resolves `icon ?? autoIcon`, which treats null as unset, so the icon still renders. -->

## 4. Variants

No variant prop. `countries` narrows the list; `defaultCountry` picks the starting country.

## 5. Sizes

No size prop. The trigger and field take their heights from Select and Input and follow density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Input surface with the trigger attached on the left | |
| Focus | 1px outline in `--interactive-border` on whichever part has focus | Never remove or restyle the focus ring. |
| Open | Country list below the trigger | Select's own surface and item styles. |
| Disabled | Trigger and field both disabled | `disabled` reaches both parts. |
| Error (`aria-invalid`) | `--destructive-border` border on the number field | Set it on PhoneInput; it reaches the field. Pair with a FormMessage. |

## 7. Content guidelines

- Label the field "Phone number" or "Mobile number".
- Use a placeholder only as an example in the default country's format, or not at all.
- Write errors that name the fix: "Enter a phone number with area code".

| Do | Don't |
| --- | --- |
| Mobile number | Phone (required!!) |
| Enter a number with area code | Invalid phone |

<!-- REVIEW: copy guidance is drafted; source has no content rules for this component. -->

## 8. Rules

1. Keep the accessible name in sync with the visible label. The field defaults to `aria-label="Phone number"`, which overrides a `<label htmlFor>`. Pass `aria-labelledby` with the Label's `id`, or an `aria-label` with the same words.
2. Control the number with `value` and `onValueChange`. Don't pass `defaultValue`; the field is always controlled internally.
3. Store the country with the number: combine `country.dialCode` and `value` yourself. PhoneInput never joins them.
4. Submit the country yourself. Only the number field takes `name`; the country isn't in native form data.
5. Validate length and format on submit. PhoneInput only filters characters.
6. Narrow the list with `countries`, built from `defaultCountries`, when the product serves a known set of countries.
7. Treat `defaultCountry` as initial only. There's no controlled country prop, and changing `defaultCountry` after mount does nothing.
8. Never pass `className` or `style`; they're dropped. Put width on a wrapper.

## 9. Dos and don'ts

**Do:** tie the visible label to the field and keep the country.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
  <Label id="mobile-label" htmlFor="mobile">Mobile number</Label>
  <PhoneInput
    id="mobile"
    name="mobile"
    aria-labelledby="mobile-label"
    value={number}
    onValueChange={(next, country) => {
      setNumber(next);
      setDialCode(country.dialCode);
    }}
  />
</div>
```

**Don't:** rely on `htmlFor` alone, or drop the country.

```tsx
<Label htmlFor="mobile">Mobile number</Label>
<PhoneInput id="mobile" onValueChange={(next) => setPhone(next)} />
```

**Do:** narrow the list from `defaultCountries`.

```tsx
const northAmerica = defaultCountries.filter((c) => ["US", "CA", "MX"].includes(c.code));

<PhoneInput countries={northAmerica} defaultCountry="CA" value={number} onValueChange={setNumber} />
```

**Don't:** hand-write a partial country list with your own flags and codes.

```tsx
<PhoneInput countries={[{ code: "US", name: "USA", dialCode: "1", flag: "US" }]} />
```

## 10. Accessibility

- Roles: the trigger is a `combobox` and the list a `listbox` of `option`s (Radix Select); the number field is a `textbox`.
- Labels: the trigger is named "Country calling code, currently {country} {dial code}" and updates with the selection. The field is named "Phone number" unless you pass `aria-label` or `aria-labelledby`.
- Keyboard: on the trigger, Enter, Space or ArrowDown opens the list; arrows move; typing jumps to a matching country name or dial code; Enter selects; Escape closes. Tab moves from the trigger to the field.
- Focus: the list returns focus to the trigger when it closes.
- The trigger's flag is hidden from assistive tech.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1, and focus swaps the field border to a lighter token than at rest; don't patch either per field. <!-- REVIEW: system-wide focus-ring issue, W1 in the fix plan; see foundations/colour.md. -->

## 11. Behaviour

- Responsive: a row; the field takes the remaining width. Constrain the whole control with a wrapper.
- Filtering: letters, `+` and other symbols are removed as the user types; spaces, hyphens and parentheses stay. The dial code lives in the trigger, so users don't type it.
- `onValueChange` fires on every edit of the number and on every country change (with the current number). `onCountryChange` fires on country changes only.
- Countries: the default list covers every country in `countries-list`, sorted by English name. Countries with several calling codes show only the first.
- Motion: from Select and Input. Don't add your own.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `countries` | `Country[]` | `defaultCountries` | The countries in the picker, in the order given. |
| `defaultCountry` | `string` | `"US"` | ISO 3166-1 alpha-2 code of the starting country. Falls back to the first entry if not found. Read on mount only. |
| `value` | `string` | | Controlled number, without the dial code. |
| `onValueChange` | `(value: string, country: Country) => void` | | Fires when the number or the country changes. |
| `onCountryChange` | `(country: Country) => void` | | Fires when the country changes. |
| `disabled` | `boolean` | | Disables the trigger and the field. |
| `...props` | `InputHTMLAttributes` without `className`, `style`, `size`, `type`, `value`, `onChange` | | Native attributes for the number field: `id`, `name`, `placeholder`, `required`, `autoComplete`, `aria-*`. `ref` reaches the number `<input>`. |
<!-- api:end -->

### Country

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | ISO 3166-1 alpha-2 code, for example `"GB"`. |
| `name` | `string` | English country name. |
| `dialCode` | `string` | Calling code with a leading `+`, for example `"+44"`. |
| `flag` | `string` | Flag emoji. |

`defaultCountries` is the full `Country[]` list PhoneInput uses by default, exported so you can filter or reorder it.

## 13. Examples

```tsx
import { useState } from "react";
import { FormDescription, Label, PhoneInput, defaultCountries, type Country } from "@eluan/core";

const shippingCountries = defaultCountries.filter((country) =>
  ["US", "CA", "GB", "IE", "AU", "NZ"].includes(country.code)
);

export function DeliveryPhoneField({ onChange }: { onChange: (fullNumber: string) => void }) {
  const [number, setNumber] = useState("");

  function handleChange(next: string, country: Country) {
    setNumber(next);
    onChange(`${country.dialCode} ${next}`.trim());
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <Label id="delivery-phone-label" htmlFor="delivery-phone" required>
        Phone number
      </Label>
      <PhoneInput
        id="delivery-phone"
        name="deliveryPhone"
        aria-labelledby="delivery-phone-label"
        aria-describedby="delivery-phone-hint"
        countries={shippingCountries}
        defaultCountry="US"
        value={number}
        onValueChange={handleChange}
      />
      <FormDescription id="delivery-phone-hint">The courier texts this number on delivery day.</FormDescription>
    </div>
  );
}
```

## 14. Related components

- [Input](./input.md): the number field; use it alone for single-country numbers.
- [Select](./select.md): the country picker.
- [Label](./form-label.md): the visible label, plus FormDescription and FormMessage.
- [Forms pattern](../patterns/forms.md): field structure and validation.

## 15. Common agent mistakes

_Filled from evals._
