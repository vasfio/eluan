---
name: Select
use_when: The user picks one value from a list too long to show as radio buttons, such as country, time zone or role.
instead_of: RadioGroup for a few options that fit on screen; SegmentedControl for a mode of the same view; MultiSelect for several values; DropdownMenu for actions.
source: packages/core/src/components/select.tsx
---

# Select

## 1. Overview

Select lets the user pick one value from a list that opens in a floating panel. It wraps Radix Select: the trigger is a `<button role="combobox">` that shows the chosen value, and the list renders in a portal. You compose it from `Select`, `SelectTrigger`, `SelectValue`, `SelectContent` and `SelectItem`, with optional groups, labels and separators.

## 2. When to use

- One choice from a list of about six or more options, or a shorter list where vertical space is tight. <!-- REVIEW: the six-option threshold is drafted; source and docs give no count. -->
- Form fields with a known set of values: country, time zone, role, currency.
- A sort order or page-size picker in a toolbar.

### When not to use

- Two to five options the user should compare at a glance → use [RadioGroup](./radio-group.md). It shows every option without a click.
- A mode or filter of the same view (Day, Week, Month) → use [SegmentedControl](./segmented-control.md).
- Tool states in a toolbar (alignment, bold, italic) → use [ToggleGroup](./toggle-group.md).
- Switching between content panels on the page → use [Tabs](./tabs.md).
- Several values at once → use [MultiSelect](./multi-select.md) for long lists or [CheckboxGroup](./checkbox-group.md) for short ones.
- A list of actions (Export, Duplicate, Delete) → use [DropdownMenu](./dropdown-menu.md). Select stores a value; it doesn't run commands.
- One value from a list so long the user needs to search it → compose [Command](./command.md) inside a [Popover](./popover.md). Select only has typeahead. <!-- REVIEW: drafted; no source states when Select stops being enough. -->
- A phone country code → use [PhoneInput](./phone-input.md), which already contains its own Select.
- A date → use [DatePicker](./date-picker.md).

## 3. Anatomy

1. **Select** (root): holds the value and open state. Renders no element of its own.
2. **SelectTrigger**: the `<button role="combobox">`. Fills its container's width, `--size-lg` tall, with a chevron at the end that Eluan renders for you.
3. **SelectValue**: goes inside the trigger. Shows the selected item's text, or its `placeholder` when nothing is selected.
4. **SelectContent**: the floating panel, portalled out of the page flow. `--container-bg` surface, `--container-border` border, at least as wide as the trigger and at most 24rem tall. It renders the scroll buttons and the scrolling viewport for you.
5. **SelectItem**: one option. A check mark appears on the trailing edge of the selected item.
6. **SelectGroup** and **SelectLabel** (optional): a labelled group of items. SelectLabel renders small, uppercase, muted text (`--font-size-xs`, `--container-fg-alt`). <!-- REVIEW: "Decide before coding" in the fix plan: Select, DropdownMenu, Menubar, ContextMenu, Command and SearchInput use five different group-label designs. Open design question; don't restyle SelectLabel to match another menu. -->
7. **SelectSeparator** (optional): a 1px line between groups.
8. **SelectScrollUpButton** and **SelectScrollDownButton**: chevrons that appear when the list overflows. SelectContent already renders them; you never place them yourself.

## 4. Variants

SelectTrigger has a `variant` prop and SelectContent has a `layout` prop. Use the defaults; the other values exist for Calendar and PhoneInput.

| Variant | Use for |
| --- | --- |
| SelectTrigger `default` | Every Select you build. |
| SelectTrigger `calendarCaption` | Calendar's month and year pickers only. It removes the border and the focus outline. |
| SelectTrigger `countryCode` | PhoneInput's dial-code picker only. It squares the end edge to sit against the number field. |
| SelectContent `layout="default"` | Every Select you build: the panel is at least as wide as the trigger (min 8rem). |
| SelectContent `layout="auto"` | A panel that shrinks to its items, as Calendar uses. |
| SelectContent `layout="country"` | PhoneInput's country list (min 17.5rem). |

<!-- REVIEW: "only" for calendarCaption, countryCode, auto and country is inferred from their sole call sites in calendar.tsx and phone-input.tsx; source doesn't mark them internal. -->

## 5. Sizes

SelectTrigger has no size prop. It is `--size-lg` tall with `--font-size-sm` text and stretches to its container; set width on a wrapper. SelectItem has a `size` prop:

| Size | Use in |
| --- | --- |
| SelectItem `default` | Every list (`--font-size-sm`). |
| SelectItem `sm` | Dense lists inside a small picker (`--font-size-xs`), as Calendar's month and year lists use. |

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | `--interactive-bg` fill, 1px `--interactive-border-alt` border, chevron at 50% opacity | |
| Placeholder | SelectValue's `placeholder` text | Renders in the same colour as a chosen value. <!-- REVIEW: select.tsx sets a `::placeholder` colour on the trigger, but a `<button>` has no placeholder pseudo-element, so the rule never applies. Not in the fix plan. --> |
| Focus | 1px outline in `--focus-ring`, 1px offset; the border also switches to `--focus-ring` | Never remove or restyle the focus ring. |
| Open | Panel below the trigger; the item under the pointer or keyboard fills with `--interactive-bg-hover` | Page scroll is locked while open. |
| Selected | Check mark on the trailing edge of the selected item; the trigger shows its text | |
| Grouped | SelectSeparator draws a 1px line in `--container-bg-alt` | Close to invisible on `--container-bg` in the default theme. Separate groups with SelectGroup and SelectLabel, not the separator alone. <!-- REVIEW: W4 in the fix plan (divider convergence); the menu separators should move to the shared Separator. --> |
| Disabled | Trigger fills with `--interactive-bg-disabled`, text `--interactive-fg-disabled`, not-allowed cursor | Set `disabled` on `Select`. A disabled SelectItem gets the same fill and is skipped by the keyboard. |
| Error | No built-in error style | Put a [FormMessage](./form-label.md) under the field and set `aria-invalid` and `aria-describedby` on SelectTrigger. <!-- REVIEW: composition drafted; Select has no error prop or tone. --> |

## 7. Content guidelines

- Label the field with a noun ("Time zone"). Use the placeholder as a prompt: "Select a time zone".
- Keep option text short, in sentence case, with no end punctuation. Put the distinguishing word first.
- Order options the way users expect to scan them: alphabetical for names, numeric or chronological for sizes and dates.
- Name groups with short nouns ("North America", "Europe").

| Do | Don't |
| --- | --- |
| Select a time zone | Choose one... |
| Central European Time (CET) | CET - central europe time. |
| Admin, Editor, Viewer | Option 1, Option 2, Option 3 |

<!-- REVIEW: content guidance and table drafted; stories only show the timezone and fruit examples. -->

## 8. Rules

1. Give every Select a label: a [Label](./form-label.md) whose `htmlFor` matches SelectTrigger's `id`, or `aria-label` on SelectTrigger when no visible label fits.
2. Put `placeholder` on `SelectValue`, not on `Select`.
3. Give every SelectItem a unique, non-empty `value`. Radix throws on `value=""`. To clear a controlled Select, set its `value` to `""`.
4. Use `name` (and `required`) on `Select` when the value must submit with a native form; Radix renders a hidden `<select>` for it.
5. Never place SelectScrollUpButton or SelectScrollDownButton yourself; SelectContent already renders both.
6. Use only the `default` trigger variant and content layout in app code. `calendarCaption` removes the focus outline.
7. Never pass `className` or `style`; they're dropped. The trigger fills its container, so set width on a wrapper.
8. Inside a scoped theme, give overlays a portal target: `container` on SelectContent, or `PortalContainerProvider` around the region. Otherwise the panel mounts in `document.body` with the page theme.

## 9. Dos and don'ts

**Do:** tie a visible label to the trigger and prompt with the placeholder.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
  <Label htmlFor="timezone">Time zone</Label>
  <Select name="timezone">
    <SelectTrigger id="timezone">
      <SelectValue placeholder="Select a time zone" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="cet">Central European Time (CET)</SelectItem>
      <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
    </SelectContent>
  </Select>
</div>
```

**Don't:** use the placeholder as the only label, put it on the root, or use an empty value.

```tsx
<Select placeholder="Time zone">
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="">None</SelectItem>
    <SelectItem value="cet">CET</SelectItem>
  </SelectContent>
</Select>
```

**Do:** structure long lists with groups and labels.

```tsx
<SelectContent>
  <SelectGroup>
    <SelectLabel>North America</SelectLabel>
    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
  </SelectGroup>
  <SelectGroup>
    <SelectLabel>Europe</SelectLabel>
    <SelectItem value="cet">Central European Time (CET)</SelectItem>
  </SelectGroup>
</SelectContent>
```

**Don't:** fake headings with disabled items or rely on the separator alone.

```tsx
<SelectContent>
  <SelectItem value="na" disabled>— North America —</SelectItem>
  <SelectItem value="est">EST</SelectItem>
  <SelectSeparator />
  <SelectItem value="cet">CET</SelectItem>
</SelectContent>
```

## 10. Accessibility

- Role: the trigger is a `combobox` button with `aria-expanded`; the panel is a `listbox`; items are `option`s; each SelectGroup is a `group` named by its SelectLabel.
- Label: Label via `htmlFor`/`id` on SelectTrigger, or `aria-label` on SelectTrigger.
- Keyboard: on the trigger, Space, Enter, ArrowDown and ArrowUp open the list, and typing jumps to a matching item. In the list, arrows move, Home and End jump to the ends, Enter or Space selects and closes, Escape closes, and typing jumps to a match.
- Focus: focus moves into the list on open and is trapped there; the rest of the page is hidden from assistive tech and scroll is locked. Focus returns to the trigger on close. A disabled Select uses the native `disabled` attribute, so Tab skips it.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: the trigger fills its container. The panel is at least the trigger's width, at most 24rem tall, and scrolls with chevron buttons when it overflows.
- Position: Eluan defaults SelectContent to `position="popper"`, so the panel opens below the trigger with a small offset and flips when there's no room. Eluan's offset and sizing styles only apply in popper mode; keep the default.
- Overflow and truncation: the trigger doesn't truncate long values. Keep option text short.
- Motion: none. The panel opens and closes without a transition. Don't add one.
- Portal: the panel mounts into the nearest `PortalContainerProvider` container, else `document.body`. `container` on SelectContent overrides both.

## 12. API

<!-- api:start -->
### Select

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | | Controlled value. `""` clears the selection and shows the placeholder. |
| `defaultValue` | `string` | | Initial value when uncontrolled. |
| `onValueChange` | `(value: string) => void` | | Called when the user picks an item. |
| `open` / `defaultOpen` / `onOpenChange` | `boolean` / `boolean` / `(open: boolean) => void` | | Control the open state. |
| `name` | `string` | | Submits the value with a native form through a hidden `<select>`. |
| `required` | `boolean` | | Native required validation on the hidden `<select>`. |
| `disabled` | `boolean` | | Disables the trigger. |
| `...props` | Radix `Select.Root` props | | `dir`, `autoComplete`, `form`. Root renders no element. |

### SelectTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "calendarCaption" \| "countryCode"` | `"default"` | Trigger style. Use `"default"`; the others serve Calendar and PhoneInput. |
| `...props` | Radix `Select.Trigger` props without `className`, `style` | | `id`, `aria-label`, `aria-invalid`, `aria-describedby`. Children: a `SelectValue`. |

### SelectValue

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `ReactNode` | | Shown when no value is selected. |
| `...props` | Radix `Select.Value` props | | |

### SelectContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `layout` | `"default" \| "auto" \| "country"` | `"default"` | Panel width rule. |
| `position` | `"popper" \| "item-aligned"` | `"popper"` | Placement. Eluan's styles assume `"popper"`. |
| `container` | `HTMLElement \| null` | nearest `PortalContainerProvider`, then `document.body` | Element to portal into. |
| `side` / `sideOffset` / `align` | Radix popper props | | Placement in popper mode. |
| `...props` | Radix `Select.Content` props without `className`, `style` | | `onCloseAutoFocus`, `onEscapeKeyDown`. |

### SelectItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | | Required. Unique and non-empty. |
| `size` | `"default" \| "sm"` | `"default"` | Item text size. |
| `disabled` | `boolean` | | Skipped by the keyboard and not selectable. |
| `textValue` | `string` | | Text used for typeahead when the children aren't plain text. |
| `...props` | Radix `Select.Item` props without `className`, `style` | | |

### SelectGroup, SelectLabel, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | The matching Radix `Select` part's props without `className`, `style` | | No Eluan props. SelectGroup is Radix `Select.Group` re-exported as is. |
<!-- api:end -->

`className` and `style` are omitted from every part; Eluan components are styling-closed.

## 13. Examples

```tsx
import { useState } from "react";
import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@eluan/core";

export function TimezoneField() {
  const [timezone, setTimezone] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <Label htmlFor="workspace-timezone" required>
        Time zone
      </Label>
      <Select name="timezone" required value={timezone} onValueChange={setTimezone}>
        <SelectTrigger id="workspace-timezone">
          <SelectValue placeholder="Select a time zone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
```

## 14. Related components

- [RadioGroup](./radio-group.md): one choice with every option visible; better for a few options.
- [SegmentedControl](./segmented-control.md): one mode or filter from two to five short options, always visible.
- [ToggleGroup](./toggle-group.md): pressable tool options, single or multiple.
- [Tabs](./tabs.md): switches content panels, not a stored value.
- [MultiSelect](./multi-select.md): several values from a searchable list.
- [DropdownMenu](./dropdown-menu.md): a list of actions behind a trigger.
- [Label](./form-label.md): `Label`, `FormDescription` and `FormMessage` for the field around a Select.
- See [forms](../patterns/forms.md) for choosing between selection controls.

## 15. Common agent mistakes

_Filled from evals._
