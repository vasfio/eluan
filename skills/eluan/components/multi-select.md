---
name: MultiSelect
use_when: The user picks several values from a list long enough to need search, such as labels, tags, assignees or filter values.
instead_of: CheckboxGroup for a short list that should stay visible; Select for one value; ToggleGroup type="multiple" for toolbar states.
source: packages/core/src/components/multi-select.tsx
---

# MultiSelect

## 1. Overview

MultiSelect lets the user pick several values from a searchable list. The trigger shows each selected value as a removable chip; clicking it opens a Popover with a search field and a Command list. It is one component driven by an `options` array and takes no children.

## 2. When to use

- Several values from a list of about eight or more options, or any list the user will want to search. <!-- REVIEW: the eight-option threshold is drafted; source and docs give no count. -->
- Labels, tags, assignees, technologies, or the values of a filter.
- A multi-value field where vertical space is tight and a column of checkboxes would be too tall.

### When not to use

- A short list where every option should stay visible → use [CheckboxGroup](./checkbox-group.md). It renders each option as a labelled checkbox with an optional description.
- One value → use [Select](./select.md).
- Several states that apply to content in a toolbar (bold and italic) → use [ToggleGroup](./toggle-group.md) with `type="multiple"`.
- Values the user types that aren't in a fixed list (free-form tags) → compose [Input](./input.md) with [Badge](./badge.md) chips. MultiSelect only picks from `options`. <!-- REVIEW: composition drafted; no source covers free-form tags. -->
- A command palette or search that runs actions → use [Command](./command.md).

## 3. Anatomy

1. **Trigger**: a `<div role="combobox">` styled like a field: `--interactive-bg`, 1px `--interactive-border-alt` border, at least `--size-lg` tall, growing as chips wrap. It's a div, not a button, because it contains buttons.
2. **Placeholder**: muted text (`--interactive-fg-alt`) shown when nothing is selected.
3. **Chips**: a `secondary` [Badge](./badge.md) per selected option, in selection order, each with a remove button named "Remove {label}". After `maxDisplayedItems` chips, one more chip shows "+N".
4. **Clear-all button**: appears at the end once anything is selected; named "Clear all selections".
5. **Chevron**: at the end, at 50% opacity; turns 180° while open.
6. **Panel**: a [Popover](./popover.md) as wide as the trigger. Holds a compact search field (`searchPlaceholder`) and the option list. Selected options sort to the top and show a check mark. When the search matches nothing, `emptyMessage` shows in muted text.

## 4. Variants

MultiSelect has no variants. Its look comes from the field tokens it shares with Select and Input.

## 5. Sizes

MultiSelect has no size prop. The trigger is at least `--size-lg` tall with `--font-size-sm` text and grows to fit wrapped chips; it fills its container's width, and the panel matches that width. Set width on a wrapper.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Field surface with the placeholder | |
| Hover | Chip remove buttons go from 60% to full opacity; clear-all fills with `--interactive-bg-hover` | The trigger itself has no hover style. |
| Focus | 1px outline in `--focus-ring`, 1px offset; the border also switches to `--focus-ring` | Never remove or restyle the focus ring. |
| Open | Chevron turned; panel below the trigger with the search field focused | The panel stays open while the user picks. |
| Selected | Chips in the trigger; the same options at the top of the list, weight 500, with a check mark | |
| Overflow | A "+N" chip after `maxDisplayedItems` chips | The hidden values stay selected and appear at the top of the list. |
| No results | `emptyMessage` in muted text | |
| Disabled | `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text, not-allowed cursor | Set `disabled`. The trigger leaves the Tab order and won't open; chip remove and clear-all buttons are disabled. |
| Disabled option | The option fills with `--interactive-bg-disabled` and can't be picked | Set `disabled: true` on the option. |
| Error | No built-in error style | Put a [FormMessage](./form-label.md) under the field. MultiSelect accepts no `aria-*` props, so you can't set `aria-invalid` on it. <!-- REVIEW: composition drafted; MultiSelect has no error prop. --> |

## 7. Content guidelines

- Override the generic defaults with words from your domain. The defaults are "Select items…", "Search…" and "No items found.".
- Write the placeholder as a prompt ("Add labels"), the search placeholder as what to search ("Search labels"), and the empty message as what didn't match ("No labels match").
- Keep option labels to one to three words. Chips don't truncate, so long labels push the trigger onto more lines.
- Use the same label text the user will see in the chip; `label` is shown in both places.

| Do | Don't |
| --- | --- |
| Add labels | Select items… |
| Search teammates | Search… |
| No teammates match | No items found. |
| Bug, Feature, Design debt | bug_report, FEATURE-REQ |

<!-- REVIEW: content guidance and table drafted; stories only show framework names. -->

## 8. Rules

1. Control MultiSelect with `value` and `onValueChange`, or seed it with `defaultValue`. It always emits the full array.
2. Give every option a unique `value` and a human-readable `label`. Search matches both.
3. Put a visible label directly above every MultiSelect. It accepts no `id`, `aria-label` or `aria-labelledby`, so a `htmlFor` link can't reach it (see Accessibility).
4. Submit the value yourself. MultiSelect has no `name` and renders no form input.
5. Pass `options` as a flat array. There's no grouping or custom option rendering.
6. Never pass children, `className` or `style`. Set width on a wrapper.
7. Don't put MultiSelect inside a `<button>` or a `<label>`; its trigger already contains buttons.

## 9. Dos and don'ts

**Do:** label the field and use domain words for every string.

```tsx
<div role="group" aria-labelledby="labels-heading" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
  <Typography id="labels-heading" variant="label" weight="medium">Labels</Typography>
  <MultiSelect
    options={labelOptions}
    value={labels}
    onValueChange={setLabels}
    placeholder="Add labels"
    searchPlaceholder="Search labels"
    emptyMessage="No labels match"
  />
</div>
```

**Don't:** leave it unlabelled with generic text, or try to name it with props it drops.

```tsx
<MultiSelect aria-label="Labels" options={labelOptions} onValueChange={setLabels} />
```

**Do:** use CheckboxGroup when there are only a few options.

```tsx
<CheckboxGroup value={channels} onValueChange={setChannels}>
  <CheckboxGroupItem value="email" label="Email" />
  <CheckboxGroupItem value="sms" label="SMS" />
  <CheckboxGroupItem value="push" label="Push" />
</CheckboxGroup>
```

**Don't:** hide three options behind a searchable popover.

```tsx
<MultiSelect
  options={[
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "push", label: "Push" },
  ]}
  value={channels}
  onValueChange={setChannels}
/>
```

## 10. Accessibility

- Role: the trigger is a `combobox` with `aria-expanded` (and `aria-disabled` when disabled). Chip remove and clear-all controls are `button`s inside it. The panel's search field is a `combobox`, the list a `listbox`, and each option an `option`.
- Label: MultiSelect accepts no `id`, `aria-label` or `aria-labelledby`, so its combobox has no accessible name. Put a visible label right above it and wrap both in an element with `role="group"` and `aria-labelledby` pointing at the label. <!-- REVIEW: API gap found while writing, not in the fix plan; the workaround names the group, not the combobox. -->
- Selected state: chosen options show a check mark (hidden from assistive tech) and a heavier weight; `aria-selected` on an option marks the keyboard highlight, not the selection. Screen-reader users hear the selection through the chips' "Remove {label}" buttons. <!-- REVIEW: cmdk sets aria-selected for the highlighted item; MultiSelect adds no selected state. Not in the fix plan. -->
- Keyboard: on the trigger, Enter or Space toggles the panel and ArrowDown opens it. Tab moves from the trigger to each chip's remove button, then to clear-all. In the panel, typing filters, ArrowUp and ArrowDown move, Enter toggles the highlighted option, and Escape closes.
- Focus: opening moves focus into the panel's search field. The panel doesn't trap focus. Closing returns focus to the trigger. The chip remove and clear-all buttons show the same focus outline, at full opacity.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: the trigger fills its container and wraps chips onto new lines. The panel matches the trigger's width and opens below it, aligned to the start.
- Overflow and truncation: only the first `maxDisplayedItems` chips render (default 4); the rest collapse into "+N". Chips don't truncate long labels.
- Ordering: selected options sort to the top of the list each time it renders.
- Removing: a chip's remove button and clear-all change the value without opening the panel.
- Motion: field colours transition over 150ms and the chevron turns on open. Don't add your own.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `MultiSelectOption[]` (`{ value: string; label: string; disabled?: boolean }`) | | Required. The selectable options, in display order. |
| `value` | `string[]` | | Controlled selection. |
| `defaultValue` | `string[]` | `[]` | Initial selection when uncontrolled. |
| `onValueChange` | `(value: string[]) => void` | | Called with the full new selection. |
| `placeholder` | `string` | `"Select items…"` | Trigger text when nothing is selected. |
| `searchPlaceholder` | `string` | `"Search…"` | Placeholder in the panel's search field. |
| `emptyMessage` | `string` | `"No items found."` | Shown when the search matches nothing. |
| `maxDisplayedItems` | `number` | `4` | Chips shown before the "+N" chip. |
| `disabled` | `boolean` | `false` | Disables the whole control. |
<!-- api:end -->

MultiSelect takes only these props: no `children`, `id`, `name` or `aria-*`. `className` and `style` are omitted; Eluan components are styling-closed. The ref points at the trigger `<div>`.

## 13. Examples

```tsx
import { useState } from "react";
import { MultiSelect, Typography, type MultiSelectOption } from "@eluan/core";

const labelOptions: MultiSelectOption[] = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "design-debt", label: "Design debt" },
  { value: "docs", label: "Documentation" },
  { value: "performance", label: "Performance" },
  { value: "security", label: "Security" },
  { value: "accessibility", label: "Accessibility" },
  { value: "wontfix", label: "Won't fix", disabled: true },
];

export function IssueLabelsField() {
  const [labels, setLabels] = useState<string[]>(["bug"]);

  return (
    <div
      role="group"
      aria-labelledby="issue-labels-label"
      style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}
    >
      <Typography id="issue-labels-label" variant="label" weight="medium">
        Labels
      </Typography>
      <MultiSelect
        options={labelOptions}
        value={labels}
        onValueChange={setLabels}
        placeholder="Add labels"
        searchPlaceholder="Search labels"
        emptyMessage="No labels match"
        maxDisplayedItems={3}
      />
    </div>
  );
}
```

## 14. Related components

- [CheckboxGroup](./checkbox-group.md): several values from a short list, all visible.
- [Select](./select.md): one value from a list.
- [ToggleGroup](./toggle-group.md): several pressable tool states in a toolbar.
- [Command](./command.md) and [Popover](./popover.md): the parts MultiSelect is built from.
- [Badge](./badge.md): the chip used for each selected value.
- See [forms](../patterns/forms.md) for choosing between selection controls.

## 15. Common agent mistakes

_Filled from evals._
