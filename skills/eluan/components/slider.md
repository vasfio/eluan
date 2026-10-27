---
name: Slider
use_when: The user sets a value or a range on a bounded scale where the position matters more than the exact number, such as volume, opacity or a price range.
instead_of: NumberInput or DecimalInput when the exact value matters; SegmentedControl or RadioGroup for a few named steps; Progress to show progress.
source: packages/core/src/components/slider.tsx
---

# Slider

## 1. Overview

Slider lets the user set a number, or a range with two thumbs, by dragging along a track or using the arrow keys. It wraps Radix Slider and renders the track, the filled range and one thumb per value for you. It renders no label and no value text.

## 2. When to use

- A value on a bounded scale where position is the point: volume, opacity, zoom, brightness.
- A range with two thumbs: a price filter, a minimum and maximum size.
- A setting the user adjusts while watching the result update.

### When not to use

- An exact number the user knows (quantity, age, amount) → use [NumberInput](./number-input.md) or [DecimalInput](./decimal-input.md).
- A few named steps (Low, Medium, High) → use [SegmentedControl](./segmented-control.md) or [RadioGroup](./radio-group.md).
- Showing how far a task has got → use [Progress](./progress.md). Slider is an input.
- Turning something on or off → use [Switch](./switch.md).

## 3. Anatomy

1. **Root**: a full-width row that holds the track and thumbs.
2. **Track**: a thin pill in `--interactive-bg-alt`.
3. **Range**: the filled part of the track in `--interactive-bg-selected`, from the start to the thumb (or between two thumbs).
4. **Thumb**: one per value, `--size-xxs` square, `--interactive-bg` fill with a 1px `--interactive-bg-selected` border. Each thumb is the focusable `slider` element.

Slider renders one thumb per entry in `value` (when it's an array), else per entry in `defaultValue`, else one thumb. Compose the label and the value readout yourself.

## 4. Variants

Slider has no variants.

## 5. Sizes

Slider has no size prop. It fills its container's width; the track and thumb sizes come from `--spacing-*` and `--size-xxs`, so they follow density. Set width on a wrapper.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Pale track, dark range, light thumb with a dark border | The thumb renders as a circle on the `slight` and `sweeping` corner styles and as a square on `sharp`. <!-- REVIEW: W6 in the fix plan; the source comment promises a rounded-rect fader cap that can't render at --size-xxs on any curves setting. --> |
| Focus | 1px outline in `--interactive-border`, 1px offset, on the focused thumb | Never remove or restyle the focus ring. |
| Disabled | Range turns `--interactive-fg-disabled`; thumb fills with `--interactive-bg-disabled` and its border turns `--interactive-fg-disabled` | Set `disabled`. Thumbs get `data-disabled`, not the native attribute, and leave the Tab order. |

## 7. Content guidelines

- Put a visible label above the slider that names the setting: "Volume", "Price".
- Show the current value as text next to the label, formatted the way users think of it: "60%", "$40 – $120", "1.5×".
- Show the minimum and maximum as text under the ends when the scale isn't obvious.

| Do | Don't |
| --- | --- |
| Volume · 60% | Slider |
| Price · $40 – $120 | Range: 40,120 |

<!-- REVIEW: content guidance drafted; stories and docs show sliders with no label or readout. -->

## 8. Rules

1. Pass values as arrays, one entry per thumb: `defaultValue={[50]}`, `value={[20, 80]}`.
2. When controlled, update `value` from `onValueChange`. Run expensive work (saving, fetching) in `onValueCommit`, which fires once the user lets go.
3. Set `min`, `max` and `step` explicitly. They default to 0, 100 and 1.
4. Always show a visible label and the current value as text; Slider renders neither, and screen readers get no name from it (see Accessibility).
5. Keep `orientation="horizontal"`. Eluan's track and root styles are horizontal only. <!-- REVIEW: inferred from slider.tsx (fixed track height, full width, no vertical styles); docs list orientation as a prop. -->
6. Use `name` to submit with a native form. Radix adds a hidden input per thumb and appends `[]` to the name for ranges.
7. Never pass `className` or `style`; they're dropped. Set width on a wrapper.

## 9. Dos and don'ts

**Do:** label the slider and show its value.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <Typography variant="label" weight="medium">Volume</Typography>
    <Typography variant="label" tone="muted">{volume[0]}%</Typography>
  </div>
  <Slider value={volume} onValueChange={setVolume} max={100} step={5} />
</div>
```

**Don't:** drop a bare slider with no label, value or array.

```tsx
<Slider value={volume} onChange={setVolume} />
```

**Do:** save once the user lets go.

```tsx
<Slider defaultValue={[70]} onValueCommit={([next]) => saveBrightness(next)} />
```

**Don't:** save on every move.

```tsx
<Slider defaultValue={[70]} onValueChange={([next]) => saveBrightness(next)} />
```

## 10. Accessibility

- Role: each thumb is a `slider` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and `aria-orientation`.
- Label: Slider passes `aria-label` and `aria-labelledby` to its root, which has no role, not to the thumbs it renders, and you can't pass props to the thumbs. A single-thumb Slider therefore has no accessible name; a two-thumb Slider's thumbs are named "Minimum" and "Maximum" by Radix. Screen readers announce the bare number, with no unit. Show a visible label and the value with its unit as text next to it. <!-- REVIEW: API gap found while writing, not in the fix plan; the thumb needs aria-label / aria-valuetext pass-through. -->
- Keyboard: arrow keys move the focused thumb by `step`; Shift with an arrow, PageUp and PageDown move by 10 steps; Home and End jump to `min` and `max`. Tab moves between thumbs.
- Focus: every enabled thumb is in the Tab order; disabled thumbs aren't.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per Slider. <!-- REVIEW: system-wide focus-ring contrast issue (W1), see foundations/colour.md. -->

## 11. Behaviour

- Responsive: fills its container's width.
- Pointer: clicking the track moves the nearest thumb there. Touch dragging doesn't scroll the page (`touch-action: none`).
- Ranges: with two thumbs the range fills between them. Use `minStepsBetweenThumbs` to keep them apart.
- Overflow and truncation: not applicable; there's no text.
- Motion: thumb colours transition over 150ms. The thumb doesn't animate between positions. Don't add motion.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number[]` | | Controlled values, one per thumb. Also sets the thumb count. |
| `defaultValue` | `number[]` | one thumb at `min` | Initial values when uncontrolled; sets the thumb count. |
| `onValueChange` | `(value: number[]) => void` | | Called on every change while dragging or pressing keys. |
| `onValueCommit` | `(value: number[]) => void` | | Called once when the user releases the thumb or finishes a key press. |
| `min` | `number` | `0` | Lowest value. |
| `max` | `number` | `100` | Highest value. |
| `step` | `number` | `1` | Increment for dragging and arrow keys. |
| `minStepsBetweenThumbs` | `number` | `0` | Minimum gap between thumbs, in steps. |
| `disabled` | `boolean` | `false` | Disables every thumb. |
| `name` | `string` | | Submits each value through a hidden input. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Keep horizontal; Eluan's styles don't support vertical. |
| `inverted` | `boolean` | `false` | Reverses the direction of the track. |
| `...props` | Radix `Slider.Root` props without `className`, `style` | | `dir`, `form`. Land on the root element, not the thumbs. |
<!-- api:end -->

`className` and `style` are omitted; Eluan components are styling-closed.

## 13. Examples

```tsx
import { useState } from "react";
import { Slider, Typography } from "@eluan/core";

export function PriceFilter({ onApply }: { onApply: (range: number[]) => void }) {
  const [price, setPrice] = useState([40, 120]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="label" weight="medium">
          Price
        </Typography>
        <Typography variant="label" tone="muted">
          ${price[0]} – ${price[1]}
        </Typography>
      </div>
      <Slider
        min={0}
        max={200}
        step={10}
        minStepsBetweenThumbs={1}
        value={price}
        onValueChange={setPrice}
        onValueCommit={onApply}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="caption" tone="muted">
          $0
        </Typography>
        <Typography variant="caption" tone="muted">
          $200
        </Typography>
      </div>
    </div>
  );
}
```

## 14. Related components

- [NumberInput](./number-input.md): exact whole numbers.
- [DecimalInput](./decimal-input.md): exact decimal numbers and amounts.
- [SegmentedControl](./segmented-control.md): a few named steps.
- [Progress](./progress.md): shows progress; not an input.
- [Label](./form-label.md): `Label` for the visible label above a Slider.
- See [forms](../patterns/forms.md) for choosing an input.

## 15. Common agent mistakes

_Filled from evals._
