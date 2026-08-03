# @eluan/core

## 0.3.0

### Minor Changes

- 0dd7768: Remove the `industrial-retro` theme. `minimal` is now the only built-in theme, and consumer themeability via `createTheme()` is the story for every other look.

  **Breaking changes**

  - `EluanProvider`'s `defaultTheme` now defaults to `"minimal"` instead of `"industrial-retro"`. Apps that relied on the default get the minimal look.
  - `createTheme`'s `extends` now defaults to `"minimal"`, so custom themes inherit minimal's tokens unless told otherwise.
  - `"industrial-retro"` is no longer a valid theme name: it is rejected by the provider's theme validation (`setTheme("industrial-retro")` is ignored with a dev-mode warning) and `data-theme="industrial-retro"` no longer resolves any tokens. A persisted `eluan:theme` value of `"industrial-retro"` in `localStorage` is ignored, and the provider falls back to `defaultTheme`.
  - The re-exported `themes` array is now `["minimal"]` and the `Theme` type narrows accordingly.

  **Migration**

  - Pass `theme="minimal"` / `defaultTheme="minimal"`, or omit the prop entirely.
  - To keep the old look, recreate it as a custom theme with `createTheme({ name: "…", tokens: { … } })` and register it via `<EluanProvider customThemes={[…]} defaultTheme="…">`; `@eluan/theme-generator` can generate the token set from your accent colors.

### Patch Changes

- Updated dependencies [0dd7768]
  - @eluan/tokens@0.2.0

## 0.2.0

### Minor Changes

- 58cbff9: Unify callback, tone, and size vocabularies across components (breaking).

  These conventions are now applied consistently across every component, batched
  into a single release while adoption is zero. Migrate as follows.

  **Callbacks — value-emitting callbacks are now `onValueChange`**

  Every callback that emits a parsed value (rather than a raw DOM event) is now
  named `onValueChange`. Components that expose a native element still forward the
  raw event via `onChange` (`EmailInput`, `PasswordInput` — unchanged).

  | Component                                                              | Old prop   | New prop                                                 |
  | ---------------------------------------------------------------------- | ---------- | -------------------------------------------------------- |
  | `NumberInput`                                                          | `onChange` | `onValueChange`                                          |
  | `DecimalInput` (and `CurrencyInput` / `PercentageInput` / `UnitInput`) | `onChange` | `onValueChange`                                          |
  | `TimeInput`                                                            | `onChange` | `onValueChange`                                          |
  | `DatePicker`                                                           | `onChange` | `onValueChange`                                          |
  | `DateRangePicker`                                                      | `onChange` | `onValueChange`                                          |
  | `DateTimePicker`                                                       | `onChange` | `onValueChange`                                          |
  | `PhoneInput`                                                           | `onChange` | `onValueChange` (`onCountryChange` unchanged)            |
  | `FileInput` (and `ImageInput` / `DocumentInput`)                       | `onChange` | `onValueChange`                                          |
  | `MultiSelect`                                                          | `onChange` | `onValueChange` (also gains uncontrolled `defaultValue`) |
  | `InputOTP`                                                             | `onChange` | `onValueChange` (`onComplete` unchanged)                 |
  | `RichText`                                                             | `onChange` | `onValueChange`                                          |
  | `SearchInput`                                                          | `onChange` | `onValueChange` (`onSearch` / `onClear` unchanged)       |
  | `AutocompleteSearch`                                                   | `onChange` | `onValueChange` (`onSelect` unchanged)                   |
  | `CreditCardNumberInput`                                                | `onChange` | `onValueChange`                                          |
  | `CreditCardExpiryInput`                                                | `onChange` | `onValueChange`                                          |
  | `CreditCardCVVInput`                                                   | `onChange` | `onValueChange`                                          |

  `CreditCardInput`'s composite `onCardChange` report is unchanged. `CheckboxGroup`
  already used `onValueChange`.

  **Tones — intent-based names `informative / positive / caution / destructive`**

  | Component | Old `variant` | New `variant` |
  | --------- | ------------- | ------------- |
  | `Badge`   | `cautionary`  | `caution`     |
  | `Banner`  | `warning`     | `caution`     |
  | `Banner`  | `success`     | `positive`    |
  | `Banner`  | `info`        | `informative` |

  `Banner`'s default `variant` changed from `info` to `informative`. Token names
  (`--cautionary-*`, `--positive-*`, `--informative-*`) are unchanged.

  **Sizes — normalized to the shared `xs / sm / md / lg / xl` scale plus `icon`
  sizes**

  Icon sizes use a single camelCase `icon`-prefixed scheme (`icon`, `iconSm`,
  `iconXs`, `iconInline`), mirroring the unsuffixed base of the text scale.

  | Component                | Old `size`    | New `size`   |
  | ------------------------ | ------------- | ------------ |
  | `Select` (`SelectItem`)  | `compact`     | `sm`         |
  | `Toggle` / `ToggleGroup` | `iconMd`      | `iconSm`     |
  | `Button`                 | `compactIcon` | `iconSm`     |
  | `Button`                 | `xsIcon`      | `iconXs`     |
  | `Button`                 | `inlineIcon`  | `iconInline` |

  `Button`'s `icon` size and all other size values (`default` / `sm` / `lg`, plus
  `Spinner`'s `xl`) are unchanged.

## 0.1.0

### Minor Changes

- f9fd64d: Initial public release of the Eluan design system under the `@eluan` npm scope.

### Patch Changes

- Updated dependencies [f9fd64d]
  - @eluan/tokens@0.1.0

---

_Earlier `1.0.x`–`2.0.0` entries in this file's history were published under the
former `@frolda` scope, before the rebrand to `@eluan`. They belong to a
different, now-unpublished versioning line and have been removed to avoid
confusion — the `@eluan/core` line starts at `0.1.0`._
