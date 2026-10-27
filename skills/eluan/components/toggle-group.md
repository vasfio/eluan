---
name: ToggleGroup
use_when: A row of related pressable tool options in a toolbar, pressing one (text alignment) or several (bold, italic, underline).
instead_of: SegmentedControl for a mode or filter of the same view; RadioGroup or CheckboxGroup for a form value; Toggle for a single on/off; Tabs to switch panels.
source: packages/core/src/components/toggle-group.tsx
---

# ToggleGroup

## 1. Overview

ToggleGroup is a row of Toggle-style buttons that act as one control. With `type="single"` at most one item is pressed, like radio buttons; with `type="multiple"` any set of items can be pressed. It wraps Radix ToggleGroup, and items take their size from the group.

## 2. When to use

- Editor and canvas toolbars: Bold, Italic, Underline (`multiple`); Align left, Center, Right (`single`).
- Icon-only tool options that sit together, such as drawing tools or list and grid density.
- A few related on/off filters shown as pressable buttons (`multiple`).

### When not to use

- Exactly one of two to five text options that sets the mode or filter of a view (Day, Week, Month; List, Board) → use [SegmentedControl](./segmented-control.md). It always keeps one option selected and draws the options as one recessed track. <!-- REVIEW: ToggleGroup vs SegmentedControl split (tool options vs view mode) is drafted from what each renders; source doesn't state it. -->
- One value in a form → use [RadioGroup](./radio-group.md) for a few options or [Select](./select.md) for many. ToggleGroup submits nothing.
- Several values in a form → use [CheckboxGroup](./checkbox-group.md) or [MultiSelect](./multi-select.md).
- A single on/off button → use [Toggle](./toggle.md).
- Switching between content panels → use [Tabs](./tabs.md).

## 3. Anatomy

1. **Group** (`ToggleGroup`): a flex row with a `--spacing-xs` gap between items. Carries `role="group"` and the shared `type`, `size` and `disabled`.
2. **Item** (`ToggleGroupItem`): a Toggle-style button with its own `value`. Transparent at rest; filled while pressed. Holds a short label, a Lucide icon, or both.

## 4. Variants

ToggleGroup has one look. Its `variant` prop accepts only `"default"`; the standalone Toggle's `outline` variant is deliberately not supported in a group.

## 5. Sizes

Set `size` on the group; every item inherits it. An item's own `size` overrides the group's.

| Size | Use in |
| --- | --- |
| `default` | Toolbars next to default-size controls (`--size-lg` tall). |
| `sm` | Dense toolbars and filter rows (`--size-sm` tall, `--font-size-xs`). |
| `iconSm` | Icon-only items in compact toolbars (`--size-md` square). |

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Transparent items; text and icons inherit the surrounding colour | |
| Hover | `--interactive-bg-hover` fill, `--interactive-fg` text | |
| Focus | 1px outline in `--interactive-border`, 1px offset | Never remove or restyle the focus ring. |
| Pressed | `--interactive-bg-selected` fill, `--interactive-fg-selected` text | `data-state="on"`. |
| Disabled | `--interactive-fg-disabled` text on a transparent background, no pointer events | Set `disabled` on the group for all items or on one item. A standalone Toggle fills its disabled background with `--interactive-bg-disabled`, so the two won't match side by side. <!-- REVIEW: toggle.tsx and toggle-group.tsx style :disabled differently; not in the fix plan. Don't restyle either. --> |

## 7. Content guidelines

- Name the group by what it sets: "Text alignment", "Text formatting".
- Name each item by its feature, not an action: "Bold", "Align left". The pressed state is announced for you.
- Keep item labels to one word, or use icons with an `aria-label` per item. Don't mix icon-only and text items in one group.

| Do | Don't |
| --- | --- |
| Align left | L |
| Bold | Toggle bold |

<!-- REVIEW: content guidance drafted; stories use single letters with aria-labels such as "Toggle bold". -->

## 8. Rules

1. Always set `type`: `"single"` or `"multiple"`. Radix requires it, and it decides whether `value` is a `string` or a `string[]`.
2. Give the group an `aria-label` naming the set, and every icon-only item its own `aria-label`.
3. In `type="single"` the user can unpress the pressed item, which sends `""`. When one option must always stay selected, ignore the empty value: `onValueChange={(next) => next && setAlign(next)}`.
4. Set `size` once on the group, not on every item.
5. Don't pass `variant="outline"`; groups only support `"default"`.
6. Put the group in a flex row you own (see Behaviour) to control its alignment.
7. Never pass `className` or `style`; they're dropped.

## 9. Dos and don'ts

**Do:** name the group and keep one alignment selected.

```tsx
<ToggleGroup
  type="single"
  aria-label="Text alignment"
  value={align}
  onValueChange={(next: string) => next && setAlign(next)}
>
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    <AlignCenter aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
  </ToggleGroupItem>
</ToggleGroup>
```

**Don't:** leave out `type`, labels, or the empty-value guard.

```tsx
<ToggleGroup value={align} onValueChange={setAlign}>
  <ToggleGroupItem value="left"><AlignLeft size={16} /></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenter size={16} /></ToggleGroupItem>
</ToggleGroup>
```

**Do:** use SegmentedControl for the mode of a view.

```tsx
<SegmentedControl value={range} onValueChange={setRange}>
  <SegmentedControlItem value="day">Day</SegmentedControlItem>
  <SegmentedControlItem value="week">Week</SegmentedControlItem>
  <SegmentedControlItem value="month">Month</SegmentedControlItem>
</SegmentedControl>
```

**Don't:** build a calendar range switcher from a ToggleGroup.

```tsx
<ToggleGroup type="single" value={range} onValueChange={setRange}>
  <ToggleGroupItem value="day">Day</ToggleGroupItem>
  <ToggleGroupItem value="week">Week</ToggleGroupItem>
  <ToggleGroupItem value="month">Month</ToggleGroupItem>
</ToggleGroup>
```

## 10. Accessibility

- Role: the group is a `group`. With `type="single"`, items are `radio`s with `aria-checked`; with `type="multiple"`, items are `button`s with `aria-pressed`.
- Label: `aria-label` (or `aria-labelledby`) on the group; text content or `aria-label` on each item.
- Keyboard: Tab moves into the group, onto the pressed item if there is one, and Tab again leaves it. Arrow keys move focus between items and wrap at the ends. Enter and Space press the focused item. Unlike RadioGroup, arrows only move focus; they don't change the value.
- Focus: visible outline on the focused item. Disabled items use the native `disabled` attribute and are skipped.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per item. <!-- REVIEW: system-wide focus-ring contrast issue (W1), see foundations/colour.md. -->

## 11. Behaviour

- Layout: the group is a block-level flex row that centres its items. On its own line it stretches to the container's width with the items in the middle. Place it inside a flex row you own to keep it at its content width.
- Orientation: items always lay out in a row. Leave `orientation` unset. <!-- REVIEW: inferred from toggle-group.tsx (fixed row layout); Radix's orientation prop only changes arrow-key direction. -->
- Overflow and truncation: items don't wrap or truncate. Keep groups to a handful of short items.
- Forms: ToggleGroup submits nothing. Keep its value in your own state.
- Motion: colour transitions over 150ms. Don't add your own.

## 12. API

<!-- api:start -->
### ToggleGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"single" \| "multiple"` | | Required. One pressed item at most, or any set. |
| `value` | `string` (single) \| `string[]` (multiple) | | Controlled value. `""` or `[]` means nothing pressed. |
| `defaultValue` | `string` (single) \| `string[]` (multiple) | | Initial value when uncontrolled. |
| `onValueChange` | `(value: string) => void` (single) \| `(value: string[]) => void` (multiple) | | Called with the new value. |
| `size` | `"default" \| "sm" \| "iconSm"` | `"default"` | Size inherited by every item. |
| `variant` | `"default"` | `"default"` | The only supported value. |
| `disabled` | `boolean` | `false` | Disables every item. |
| `loop` | `boolean` | `true` | Arrow keys wrap from the last item to the first. |
| `rovingFocus` | `boolean` | `true` | Arrow-key focus movement; `false` puts every item in the Tab order. |
| `...props` | Radix `ToggleGroup.Root` props without `className`, `style` | | `aria-label`, `aria-labelledby`, `dir`. |

### ToggleGroupItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | | Required. The value this item adds to the group's value. |
| `size` | `"default" \| "sm" \| "iconSm"` | the group's `size` | Per-item override. |
| `variant` | `"default"` | the group's `variant` | The only supported value. |
| `disabled` | `boolean` | | Disables this item. |
| `...props` | Radix `ToggleGroup.Item` props without `className`, `style` | | `aria-label`, `id`. |
<!-- api:end -->

`className` and `style` are omitted from both parts; Eluan components are styling-closed.

## 13. Examples

```tsx
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@eluan/core";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react";

const iconStyle = { width: "var(--size-xxs)", height: "var(--size-xxs)" };

export function EditorToolbar() {
  const [marks, setMarks] = useState<string[]>(["bold"]);
  const [align, setAlign] = useState("left");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-md)",
        padding: "var(--spacing-xs)",
        backgroundColor: "var(--container-bg-alt)",
      }}
    >
      <ToggleGroup type="multiple" size="iconSm" aria-label="Text formatting" value={marks} onValueChange={setMarks}>
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold aria-hidden="true" style={iconStyle} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic aria-hidden="true" style={iconStyle} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline aria-hidden="true" style={iconStyle} />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        type="single"
        size="iconSm"
        aria-label="Text alignment"
        value={align}
        onValueChange={(next: string) => next && setAlign(next)}
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft aria-hidden="true" style={iconStyle} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter aria-hidden="true" style={iconStyle} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight aria-hidden="true" style={iconStyle} />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
```

## 14. Related components

- [Toggle](./toggle.md): one pressable on/off button.
- [SegmentedControl](./segmented-control.md): exactly one mode or filter of a view, always selected.
- [RadioGroup](./radio-group.md): one value in a form, with labels.
- [CheckboxGroup](./checkbox-group.md): several values in a form, with labels.
- [Tabs](./tabs.md): switches content panels.
- [Button](./button.md): a one-off action in the same toolbar.

## 15. Common agent mistakes

_Filled from evals._
