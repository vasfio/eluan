---
name: RadioGroup
use_when: The user picks exactly one option from a short list that should stay visible, such as a plan, density or delivery speed.
instead_of: Select for long lists or tight space; CheckboxGroup when several options can be chosen; SegmentedControl or Tabs to switch between views.
source: packages/core/src/components/radio-group.tsx
---

# RadioGroup

## 1. Overview

RadioGroup is a set of mutually exclusive options built on Radix RadioGroup. RadioGroup renders the `role="radiogroup"` container and each RadioGroupItem renders a round `<button role="radio">` with a dot. Items have no label of their own: pair each one with a Label.

## 2. When to use

- One choice from a few options the user should compare at a glance: Default, Comfortable, Compact.
- Options that each need a short description.
- A short set of options on one line, such as sizes Small, Medium, Large, with `orientation="horizontal"`.

### When not to use

- Many options, or not enough room to show them all → use [Select](./select.md).
- Several options can be chosen → use [CheckboxGroup](./checkbox-group.md).
- A single on/off choice → use [Switch](./switch.md) or [Checkbox](./checkbox.md).
- Switching what's shown on the page → use [SegmentedControl](./segmented-control.md) or [Tabs](./tabs.md).

<!-- REVIEW: the thresholds between RadioGroup, Select and SegmentedControl are drafted; source gives no guidance. -->

## 3. Anatomy

1. **Group**: RadioGroup, a `<div role="radiogroup">`. A grid with a `--spacing-sm` gap, or a wrapping row with a `--spacing-lg` gap when `orientation="horizontal"`.
2. **Item**: RadioGroupItem, a round `--size-xxs` `<button role="radio">` with a 1px `--interactive-border-alt` border.
3. **Dot**: always mounted and faded in when checked. Half the ring's size, in `--interactive-bg` on the `--interactive-bg-selected` fill.
4. **Row** (yours): a flex row with a `--spacing-sm` gap holding the item and its Label. With a description, align to the top and wrap the Label in a box with a `--size-xxs` minimum height so it stays centred on the radio.
5. **Label** (yours): a Label with `htmlFor` matching the item's `id`, plus an optional description under it.

## 4. Variants

RadioGroup has no variants. `orientation` sets the layout and the arrow keys:

| Orientation | Use for |
| --- | --- |
| unset or `vertical` | Most lists, and any list with descriptions. |
| `horizontal` | A few short options that fit on one line. |

<!-- REVIEW: "Use for" is drafted from the stories; source gives no usage guidance. -->

## 5. Sizes

RadioGroup has no `size` prop. Items are `--size-xxs` and follow density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Unchecked | Transparent circle, `--interactive-border-alt` border | |
| Hover | `--interactive-bg-hover` fill | |
| Focus | 1px outline in `--focus-ring`, 1px offset, on keyboard focus only | Never remove or restyle the focus ring. |
| Checked | `--interactive-bg-selected` fill and border, `--interactive-bg` dot | |
| Disabled | `--interactive-bg-disabled` fill, not-allowed cursor | `disabled` on RadioGroup disables every item; on an item, only that one. Disable its Label too. |
| Checked and disabled | Reads as empty: the fill turns pale and the light dot disappears into it | Don't rely on it to show a fixed choice; say it in the label or show the value as text. <!-- REVIEW: known source bug W2 #4 (radio-group.tsx :disabled overrides the checked fill). --> |
| Error | No error style | Show a FormMessage under the group and point the RadioGroup's `aria-describedby` at it. <!-- REVIEW: drafted; no error handling in source. --> |

## 7. Content guidelines

- Name the group with a visible heading that asks or states the choice: "Delivery speed", "Interface density".
- Label each option with a short, parallel phrase: "Default", "Comfortable", "Compact".
- Use a description for one short sentence on the difference: "More spacing for readability."
- Order options logically (by size, speed or price) and preselect a sensible default when one exists.

| Do | Don't |
| --- | --- |
| Standard · Express · Overnight | Standard · Faster option · OVERNIGHT!! |
| More spacing for readability. | This option gives you more spacing, which some people find easier to read. |

<!-- REVIEW: content rules drafted from the story labels and descriptions. -->

## 8. Rules

1. Put every RadioGroupItem inside a RadioGroup.
2. Give each item an `id` and a Label with a matching `htmlFor`, or an `aria-label`.
3. Name the group with `aria-labelledby` pointing at a visible heading, or `aria-label`.
4. Read changes with `onValueChange`, which receives the selected `value` string. Control it with `value`, or leave it uncontrolled with `defaultValue`.
5. Use `orientation="horizontal"` for a row instead of your own flex wrapper. The layout keys off it, and it limits arrow keys to Left and Right.
6. Give every item a unique `value`, and set `name` on RadioGroup when the form submits natively.
7. Never pass `className` or `style`; they're dropped.

## 9. Dos and don'ts

**Do:** pair each item with a Label in a row.

```tsx
<RadioGroup aria-labelledby="density-heading" defaultValue="comfortable">
  <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
    <RadioGroupItem id="density-default" value="default" />
    <Label htmlFor="density-default">Default</Label>
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
    <RadioGroupItem id="density-comfortable" value="comfortable" />
    <Label htmlFor="density-comfortable">Comfortable</Label>
  </div>
</RadioGroup>
```

**Don't:** leave items unlabelled or the group unnamed.

```tsx
<RadioGroup>
  <RadioGroupItem value="default" /> Default
  <RadioGroupItem value="comfortable" /> Comfortable
</RadioGroup>
```

**Do:** set the orientation on the group.

```tsx
<RadioGroup aria-label="Size" orientation="horizontal" defaultValue="medium">
  {/* rows */}
</RadioGroup>
```

**Don't:** wrap the group in your own row layout.

```tsx
<div style={{ display: "flex", gap: 24 }}>
  <RadioGroup aria-label="Size">{/* rows */}</RadioGroup>
</div>
```

## 10. Accessibility

- Role: `radiogroup` on RadioGroup (with `aria-orientation` when set) and `radio` with `aria-checked` on each item.
- Label: each item through a Label with `htmlFor`, or `aria-label`; the group through `aria-labelledby` or `aria-label`.
- Keyboard: Tab moves into the group, onto the checked item (or the first), and Tab again leaves it. Arrow keys move focus and select, wrapping at the ends; with `orientation` set, only that axis's arrows work. Space selects the focused item. Enter does nothing.
- Focus: visible outline on `:focus-visible` only. Disabled items use the native `disabled` attribute and are skipped.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: the vertical layout stacks rows; the horizontal layout wraps them when they don't fit.
- Overflow and truncation: labels and descriptions wrap. Items don't shrink.
- Motion: colours change and the dot fades over 150ms. Don't add your own.
- Forms: inside a `<form>`, Radix adds hidden native radio inputs so the selected `value` submits under `name`.

## 12. API

<!-- api:start -->
### RadioGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | | Controlled selection. Pair with `onValueChange`. |
| `defaultValue` | `string` | | Uncontrolled starting selection. |
| `onValueChange` | `(value: string) => void` | | Called with the newly selected value. |
| `disabled` | `boolean` | `false` | Disables every item. |
| `orientation` | `"horizontal" \| "vertical"` | unset (vertical layout, all arrow keys) | Layout and arrow-key axis. |
| `name` | `string` | | Field name for form submission. |
| `required` | `boolean` | `false` | Marks the group required. |
| `loop` | `boolean` | `true` | Arrow keys wrap from last to first. |
| `...props` | Radix `RadioGroup.Root` props without `className`, `style` | | `aria-labelledby`, `aria-label`, `aria-describedby`, `dir`, `id`. `ref` goes to the group `<div>`. |

### RadioGroupItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | required | The value this item selects. |
| `id` | `string` | | Match it with the Label's `htmlFor`. |
| `disabled` | `boolean` | `false` | Disables this item. |
| `...props` | Radix `RadioGroup.Item` props without `className`, `style` | | `aria-label`, `aria-describedby`. `ref` goes to the `<button>`. |
<!-- api:end -->

## 13. Examples

```tsx
import { Label, RadioGroup, RadioGroupItem, Typography } from "@eluan/core";
import * as React from "react";

const options = [
  { value: "standard", label: "Standard", description: "Arrives in 3 to 5 working days. Free." },
  { value: "express", label: "Express", description: "Arrives in 1 to 2 working days. $9.00." },
  { value: "overnight", label: "Overnight", description: "Arrives the next working day. $24.00." },
];

const row = { display: "flex", alignItems: "flex-start", gap: "var(--spacing-sm)" } as const;
const copy = { display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)" } as const;
const labelLine = { display: "flex", alignItems: "center", minHeight: "var(--size-xxs)" } as const;

export function DeliverySpeed({ onChange }: { onChange: (speed: string) => void }) {
  const [speed, setSpeed] = React.useState("standard");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <Typography id="delivery-heading" variant="label" weight="medium">
        Delivery speed
      </Typography>
      <RadioGroup
        aria-labelledby="delivery-heading"
        name="deliverySpeed"
        value={speed}
        onValueChange={(next) => {
          setSpeed(next);
          onChange(next);
        }}
      >
        {options.map((option) => (
          <div key={option.value} style={row}>
            <RadioGroupItem
              id={`delivery-${option.value}`}
              value={option.value}
              aria-describedby={`delivery-${option.value}-description`}
            />
            <div style={copy}>
              <span style={labelLine}>
                <Label htmlFor={`delivery-${option.value}`}>{option.label}</Label>
              </span>
              <Typography id={`delivery-${option.value}-description`} variant="caption" tone="muted">
                {option.description}
              </Typography>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
```

## 14. Related components

- [CheckboxGroup](./checkbox-group.md): the multiple-choice equivalent.
- [Select](./select.md): one choice from a longer list, in less space.
- [SegmentedControl](./segmented-control.md): one choice that switches a view.
- [Label](./form-label.md): the Label for each item.
- See [../patterns/forms.md](../patterns/forms.md) for choosing between option controls.

## 15. Common agent mistakes

_Filled from evals._
