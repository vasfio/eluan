---
name: NumberInput
use_when: The user sets a count or small number with a known step, such as a quantity, with optional minus and plus buttons.
instead_of: DecimalInput for money, percentages and formatted decimals; Slider for approximate values on a range; Input for digits that aren't quantities.
source: packages/core/src/components/number-input.tsx
---

# NumberInput

## 1. Overview

NumberInput is a numeric field: an [Input](./input.md) (`type="text"`, `inputMode="decimal"`, monospaced) between a minus and a plus stepper button. It accepts only an optional leading minus, digits and one decimal point, steps with the buttons or ArrowUp and ArrowDown, and clamps to `min` and `max` on blur. It emits a `number`.

## 2. When to use

- Quantities and counts: items in a cart, seats on a plan, retry attempts.
- Small bounded settings where the exact value matters: page size, number of columns.
- A free numeric field without steppers (`showControls={false}`) that still filters characters and clamps on blur.

### When not to use

- Plain text → use [Input](./input.md).
- Money, percentages, measurements, or anything that needs thousands separators or fixed decimals → use [DecimalInput](./decimal-input.md).
- A value on a continuous range where close enough is fine → use [Slider](./slider.md).
- Digits that aren't quantities (postcodes, account numbers) → use [Input](./input.md) with `inputMode="numeric"`; card numbers → [CreditCardInput](./credit-card-input.md); one-time codes → [InputOTP](./input-otp.md). <!-- REVIEW: drafted; source doesn't name these cases. -->

NumberInput earns its place through character filtering, stepping and clamping. It doesn't format numbers or limit decimal places.

## 3. Anatomy

1. **Decrease button**: a minus icon button on the left, named "Decrease".
2. **Field**: Input with centred, monospaced text.
3. **Increase button**: a plus icon button on the right, named "Increase".

The buttons and field share one outline: the borders between them are removed so the group reads as one control. With `showControls={false}` only the field renders, with left-aligned text.

## 4. Variants

No variant prop. `showControls` shows or hides the stepper buttons.

## 5. Sizes

No size prop. The field and the square stepper buttons are `--size-lg` and follow density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | `--interactive-bg` surface, `--interactive-border-alt` outline around the group | |
| Hover (stepper) | `--interactive-bg-hover` on the button | |
| Focus | Field: border and 1px outline in `--interactive-border`, 1px offset | Never remove or restyle the focus ring. The steppers are out of the Tab order and keep the browser's default focus ring; don't add a focus style to them. |
| At a limit | The stepper toward the limit is disabled | When the value reaches `min` or `max`. |
| Disabled | Field in `--interactive-bg-disabled` and `--interactive-fg-disabled`; steppers go transparent with `--interactive-fg-disabled` and ignore hover | The transparent disabled steppers are deliberate; don't restyle them. |
| Error (`aria-invalid`) | `--destructive-border` border on the field | Set it yourself, with a FormMessage. |

## 7. Content guidelines

- Label with the thing being counted, with units if any: "Seats", "Retry attempts".
- State the range in a description: "Between 1 and 50".
- Use a placeholder only for an example value, or not at all.

| Do | Don't |
| --- | --- |
| Seats | Number |
| Between 1 and 50 | Enter a valid number |

<!-- REVIEW: copy guidance is drafted; source has no content rules for this component. -->

## 8. Rules

1. Give the field a visible [Label](./form-label.md) tied with `htmlFor` and `id`.
2. Control it with `value` (a `number`) and `onValueChange`. Expect `undefined` when the field is empty or holds only a minus sign.
3. Set `min` and `max` for bounded values. The steppers stop at the bounds and blur clamps, but typing can go out of range until blur, and `onValueChange` reports the typed value meanwhile. Validate on submit.
4. Don't rely on native `min`, `max` or `step` validation. NumberInput doesn't pass `min` or `max` to the `<input>`.
5. Use whole-number steps. Fractional steps add without rounding, so `step={0.1}` can show values like `0.30000000000000004`; use DecimalInput for decimals. <!-- REVIEW: source oddity, not in the fix plan; increment adds `step` with no rounding. -->
6. Put the allowed range in a FormDescription linked with `aria-describedby`; the field doesn't expose it to assistive tech. <!-- REVIEW: drafted; follows from the field having no aria-valuemin/aria-valuemax. -->
7. Never pass `className` or `style`; they're dropped. Put width on a wrapper.

## 9. Dos and don'ts

**Do:** bound the value and describe the range.

```tsx
<NumberInput
  id="seats"
  min={1}
  max={50}
  value={seats}
  onValueChange={(next) => setSeats(next ?? 1)}
  aria-describedby="seats-range"
/>
```

**Don't:** use NumberInput for prices with a fractional step.

```tsx
<NumberInput step={0.01} value={price} onValueChange={setPrice} />
```

**Do:** keep the stepper group as it is.

```tsx
<NumberInput id="retries" min={0} max={10} value={retries} onValueChange={setRetries} />
```

**Don't:** split the group with gaps or extra borders, or build your own steppers.

```tsx
<div style={{ display: "flex", gap: 8 }}>
  <Button onClick={() => setRetries(retries - 1)}>-</Button>
  <NumberInput showControls={false} value={retries} onValueChange={setRetries} />
  <Button onClick={() => setRetries(retries + 1)}>+</Button>
</div>
```

## 10. Accessibility

- Role: `textbox` (`type="text"` with `inputMode="decimal"`), not `spinbutton`. It has no `aria-valuemin`, `aria-valuemax` or `aria-valuenow`.
- Label: a Label tied by `htmlFor`/`id`. The steppers are named "Decrease" and "Increase".
- Keyboard: type digits; ArrowUp and ArrowDown step by `step`, clamped to `min` and `max`. Tab skips the stepper buttons (`tabIndex={-1}`).
- Focus: stays on the field; stepping with the arrows doesn't move it.
- Contrast: handled by the theme. Don't override colours. The field's focus outline token currently measures below 3:1, and focus swaps the border to a lighter token than at rest; don't patch either per field. The stepper buttons keep the browser's own ring, which currently has better contrast; leave them alone. <!-- REVIEW: system-wide focus-ring issue, W1 in the fix plan; the fix plan's "Worth keeping" says not to add :focus-visible to the steppers until W1 lands. -->

## 11. Behaviour

- Responsive: the group fills its container's width and the field stretches between the buttons. Constrain it with a wrapper.
- Stepping from an empty field starts at 0.
- With `clampOnBlur={false}`, an out-of-range typed value stays after blur.
- `allowNegative={false}` strips the minus sign as the user types.
- Setting `value` back to `undefined` doesn't clear the field; the component only syncs defined values. Set a number, or remount with a new `key` to reset. <!-- REVIEW: source oddity, not in the fix plan. -->
- Motion: colour transitions over 150ms. Don't add your own.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | | Controlled value. |
| `onValueChange` | `(value: number \| undefined) => void` | | Fires on typing, stepping and blur clamping; `undefined` when empty or `-`. |
| `min` | `number` | | Lower bound for stepping and blur clamping. Not passed to the `<input>`. |
| `max` | `number` | | Upper bound for stepping and blur clamping. Not passed to the `<input>`. |
| `step` | `number` | `1` | Amount the buttons and arrow keys add or subtract. |
| `showControls` | `boolean` | `true` | Shows the minus and plus buttons. |
| `allowNegative` | `boolean` | `true` | Allows a leading minus sign. |
| `clampOnBlur` | `boolean` | `true` | Clamps the value to `min` and `max` when the field loses focus. |
| `disabled` | `boolean` | | Disables the field and both buttons. |
| `...props` | `InputHTMLAttributes` without `className`, `style`, `size`, `type`, `value`, `onChange` | | Native input attributes: `id`, `name`, `placeholder`, `required`, `aria-*`. `ref` reaches the `<input>`. |
<!-- api:end -->

## 13. Examples

```tsx
import { useState } from "react";
import { FormDescription, Label, NumberInput } from "@eluan/core";

export function SeatCountField({ onChange }: { onChange: (seats: number) => void }) {
  const [seats, setSeats] = useState<number | undefined>(5);

  function handleChange(next: number | undefined) {
    setSeats(next);
    if (next !== undefined) onChange(next);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <Label htmlFor="plan-seats" required>Seats</Label>
      <NumberInput
        id="plan-seats"
        name="seats"
        min={1}
        max={50}
        allowNegative={false}
        value={seats}
        onValueChange={handleChange}
        aria-describedby="plan-seats-range"
      />
      <FormDescription id="plan-seats-range">Between 1 and 50. You can add more later.</FormDescription>
    </div>
  );
}
```

## 14. Related components

- [DecimalInput](./decimal-input.md): formatted decimals, money, percentages and units.
- [Slider](./slider.md): a value on a range where approximate is fine.
- [Input](./input.md): the base field.
- [Forms pattern](../patterns/forms.md): field structure and validation.

## 15. Common agent mistakes

_Filled from evals._
