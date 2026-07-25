---
"@eluan/core": minor
---

Unify callback, tone, and size vocabularies across components (breaking).

These conventions are now applied consistently across every component, batched
into a single release while adoption is zero. Migrate as follows.

**Callbacks — value-emitting callbacks are now `onValueChange`**

Every callback that emits a parsed value (rather than a raw DOM event) is now
named `onValueChange`. Components that expose a native element still forward the
raw event via `onChange` (`EmailInput`, `PasswordInput` — unchanged).

| Component | Old prop | New prop |
| --- | --- | --- |
| `NumberInput` | `onChange` | `onValueChange` |
| `DecimalInput` (and `CurrencyInput` / `PercentageInput` / `UnitInput`) | `onChange` | `onValueChange` |
| `TimeInput` | `onChange` | `onValueChange` |
| `DatePicker` | `onChange` | `onValueChange` |
| `DateRangePicker` | `onChange` | `onValueChange` |
| `DateTimePicker` | `onChange` | `onValueChange` |
| `PhoneInput` | `onChange` | `onValueChange` (`onCountryChange` unchanged) |
| `FileInput` (and `ImageInput` / `DocumentInput`) | `onChange` | `onValueChange` |
| `MultiSelect` | `onChange` | `onValueChange` (also gains uncontrolled `defaultValue`) |
| `InputOTP` | `onChange` | `onValueChange` (`onComplete` unchanged) |
| `RichText` | `onChange` | `onValueChange` |
| `SearchInput` | `onChange` | `onValueChange` (`onSearch` / `onClear` unchanged) |
| `AutocompleteSearch` | `onChange` | `onValueChange` (`onSelect` unchanged) |
| `CreditCardNumberInput` | `onChange` | `onValueChange` |
| `CreditCardExpiryInput` | `onChange` | `onValueChange` |
| `CreditCardCVVInput` | `onChange` | `onValueChange` |

`CreditCardInput`'s composite `onCardChange` report is unchanged. `CheckboxGroup`
already used `onValueChange`.

**Tones — intent-based names `informative / positive / caution / destructive`**

| Component | Old `variant` | New `variant` |
| --- | --- | --- |
| `Badge` | `cautionary` | `caution` |
| `Banner` | `warning` | `caution` |
| `Banner` | `success` | `positive` |
| `Banner` | `info` | `informative` |

`Banner`'s default `variant` changed from `info` to `informative`. Token names
(`--cautionary-*`, `--positive-*`, `--informative-*`) are unchanged.

**Sizes — normalized to the shared `xs / sm / md / lg / xl` scale plus `icon`
sizes**

Icon sizes use a single camelCase `icon`-prefixed scheme (`icon`, `iconSm`,
`iconXs`, `iconInline`), mirroring the unsuffixed base of the text scale.

| Component | Old `size` | New `size` |
| --- | --- | --- |
| `Select` (`SelectItem`) | `compact` | `sm` |
| `Toggle` / `ToggleGroup` | `iconMd` | `iconSm` |
| `Button` | `compactIcon` | `iconSm` |
| `Button` | `xsIcon` | `iconXs` |
| `Button` | `inlineIcon` | `iconInline` |

`Button`'s `icon` size and all other size values (`default` / `sm` / `lg`, plus
`Spinner`'s `xl`) are unchanged.
