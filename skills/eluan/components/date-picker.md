---
name: DatePicker
use_when: The user picks one date (DatePicker) or a start and end date (DateRangePicker) in a form or filter bar.
instead_of: Input type=date or a hand-built Popover and Calendar; DateTimePicker when a time is needed; TimeInput for a time alone; Calendar for an always-visible grid.
source: packages/core/src/components/date-picker.tsx
---

# DatePicker

## 1. Overview

DatePicker is a field-style trigger that opens a Calendar in a Popover. The module exports two components: `DatePicker` for one date and `DateRangePicker` for a start and end date. The trigger shows the formatted value, or a placeholder when empty.

This file is also where to choose between Eluan's date and time components.

## 2. When to use

Pick the component by what the user is choosing:

| The user picks… | Use |
| --- | --- |
| One date in a form or filter: due date, start date | `DatePicker` |
| A start and end date: report period, booking, a date filter in a toolbar | `DateRangePicker` |
| One moment with a time of day: scheduled send, meeting start | [DateTimePicker](./date-time-picker.md) |
| A time of day with no date: opening hours, daily reminder | [TimeInput](./time-input.md) |
| A date on an always-visible month grid, or several separate dates | [Calendar](./calendar.md) |

<!-- REVIEW: chooser drafted from each component's props and the docs-site descriptions; source gives no cross-component guidance. -->

- A filter bar with a date range uses `DateRangePicker`, next to Select filters and an `outline` reset Button.

### When not to use

- The time of day matters → use [DateTimePicker](./date-time-picker.md).
- Only a time → use [TimeInput](./time-input.md).
- The grid should stay visible, or the user picks several separate dates → use [Calendar](./calendar.md) inline.
- A birth date or any date many years away → use an [Input](./input.md) with a format hint. The year Select inside the calendar only lists ten years around the current one. <!-- REVIEW: alternative drafted; calendar.tsx limits the year Select to the current year -5 to +4. -->

## 3. Anatomy

1. **Trigger**: a full-width Button in the `input` variant (`inputMuted` while empty), with a leading calendar icon and the value or placeholder text.
2. **Popover**: opens below the trigger, aligned to its start edge.
3. **Calendar**: one month for `DatePicker`, two months side by side for `DateRangePicker`. See [Calendar](./calendar.md).

## 4. Variants

There's no `variant` prop. Choose the component:

| Component | Use for |
| --- | --- |
| `DatePicker` | One date. Closes as soon as a date is picked. |
| `DateRangePicker` | A start and end date. Shows two months and stays open until the user presses Escape or clicks outside. |

## 5. Sizes

No size prop. The trigger is a default-size Button (`--size-lg` tall) and always fills its container's width. Set the width on a wrapper.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Empty | Placeholder in `--interactive-fg-alt` next to the calendar icon | |
| Filled | Formatted value in `--interactive-fg` | Range shows "from - to"; after the first click both ends are the same day. |
| Hover | Trigger background fills | |
| Focus | 1px outline in `--interactive-border`, 1px offset | Never remove or restyle the focus ring. |
| Open | Popover below the trigger; focus moves into the calendar | |
| Disabled | `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text; skipped by Tab | |
| Error | No built-in error state | Put a FormMessage under the picker and reference it with `aria-describedby` on the group wrapper (see Rules). <!-- REVIEW: composition drafted; the pickers accept no aria-invalid or aria-describedby. --> |
| Range across months | A selected day from the adjacent month is close to invisible | DateRangePicker always shows outside days and has no prop to hide them; don't patch it. <!-- REVIEW: known source bug W2 #3 in the fix plan (calendar.tsx `.day-outside[aria-selected]`). --> |

## 7. Content guidelines

- Write the placeholder as what to pick: "Pick a due date", "Any date". It is not a label; add one anyway.
- Keep the year in `dateFormat`. The defaults are `"PPP"` ("October 27th, 2026") for DatePicker and `"LLL dd, y"` ("Oct 27, 2026") for each end of a range.
- Prefer formats with a month name over all-number formats such as `"MM/dd/yyyy"`, which read differently by region. <!-- REVIEW: drafted; source only sets the defaults. -->
- Trigger text is English: `dateFormat` uses date-fns without a locale.

| Do | Don't |
| --- | --- |
| Pick a due date | Click to select |
| Any date | dd/mm/yyyy |

## 8. Rules

1. Control the value: pass `value` and `onValueChange`. The pickers keep no value of their own, so without `value` the trigger keeps showing the placeholder.
2. Label every picker. The trigger accepts no `id` or `aria-label`, so `Label htmlFor` can't reach it: give the Label an `id` and wrap the picker in `<div role="group" aria-labelledby="…">`. Add `aria-describedby` there for a hint or error. <!-- REVIEW: workaround drafted; the props interfaces have no id or aria props, which conflicts with patterns/forms.md rule 1. -->
3. Handle `undefined` from `DateRangePicker`. Its `onValueChange` is typed as always passing a range, but clicking the single selected day again clears it and passes `undefined`. Fall back to an empty range.
4. Set width on a wrapper; the trigger always stretches to fill it.
5. Use `DateRangePicker` for a period, not two DatePickers. <!-- REVIEW: drafted guidance; source doesn't compare them. -->
6. For native form submission, add your own `<input type="hidden">` with the date as an ISO string; the pickers have no `name`. <!-- REVIEW: composition drafted; date-picker.tsx renders no form input. -->
7. Never pass `className` or `style`; the props don't accept them.

## 9. Dos and don'ts

**Do:** control the value and name the field.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
  <Label id="due-date-label" required>Due date</Label>
  <div role="group" aria-labelledby="due-date-label">
    <DatePicker value={dueDate} onValueChange={setDueDate} placeholder="Pick a due date" />
  </div>
</div>
```

**Don't:** leave it uncontrolled or rely on the placeholder as the label.

```tsx
<DatePicker placeholder="Due date" />
```

**Do:** guard against a cleared range.

```tsx
<DateRangePicker value={range} onValueChange={(next) => setRange(next ?? { from: undefined, to: undefined })} />
```

**Don't:** build your own Popover and Calendar for a plain date field.

```tsx
<Popover>
  <PopoverTrigger asChild><Button variant="input">{label}</Button></PopoverTrigger>
  <PopoverContent><Calendar mode="single" selected={day} onSelect={setDay} /></PopoverContent>
</Popover>
```

## 10. Accessibility

- Role: the trigger is a `button` with `aria-haspopup="dialog"` and `aria-expanded` (Radix Popover); the open panel is a `dialog`. The calendar inside is a `grid` (see [Calendar](./calendar.md)).
- Label: the trigger's name is its text, the formatted date or the placeholder. Name the field with a visible label and a `role="group"` wrapper (Rules 2).
- Keyboard: Enter or Space opens the popover. Inside, the calendar's arrow, Page Up/Down and Home/End keys apply, and Enter or Space picks. Escape closes.
- Focus: on open, focus moves to the selected day, or today. The popover doesn't trap focus. On close, focus returns to the trigger.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per picker. <!-- REVIEW: system-wide focus-ring contrast issue W1, see foundations/colour.md. -->

## 11. Behaviour

- Responsive: the trigger fills its container. DatePicker's popover matches the trigger's width (never narrower than the calendar), so a wider trigger stretches the grid. DateRangePicker's popover sizes to its two months, which stack below a 640px viewport.
- Picking a range: the first click selects a one-day range; the next click before or after it extends the range.
- Opening month: DateRangePicker opens on the month of `value.from`. DatePicker always opens on the current month, even when its value is in another month. <!-- REVIEW: source oddity, not in the fix plan; DatePicker passes no defaultMonth, so Calendar falls back to today. -->
- Clearing: clicking the selected date again clears it. DatePicker then calls `onValueChange(undefined)` and closes.
- Overflow and truncation: the trigger text doesn't wrap. Give a range picker room for both dates.
- Motion: none of its own. Don't add any.

## 12. API

<!-- api:start -->
### DatePicker

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Date` | | The selected date. |
| `onValueChange` | `(date: Date \| undefined) => void` | | Called when a date is picked, with `undefined` when it's cleared. |
| `placeholder` | `string` | `"Pick a date"` | Trigger text while empty. |
| `dateFormat` | `string` | `"PPP"` | date-fns format for the trigger text. |
| `disabled` | `boolean` | `false` | Disables the trigger. |
| `ref` | `Ref<HTMLButtonElement>` | | Forwarded to the trigger button. |

### DateRangePicker

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `{ from: Date \| undefined; to: Date \| undefined }` | | The selected range. |
| `onValueChange` | `(range: { from: Date \| undefined; to: Date \| undefined }) => void` | | Called on every pick. Receives `undefined` when the range is cleared, despite the type. |
| `placeholder` | `string` | `"Pick a date range"` | Trigger text while empty. |
| `dateFormat` | `string` | `"LLL dd, y"` | date-fns format for each end of the range. |
| `disabled` | `boolean` | `false` | Disables the trigger. |
| `ref` | `Ref<HTMLButtonElement>` | | Forwarded to the trigger button. |

Neither component accepts other props: no `id`, `name`, `aria-*`, `className` or `style`.
<!-- api:end -->

## 13. Examples

A filter bar with a date range, a status filter and a reset action.

```tsx
import * as React from "react";
import {
  Button,
  DateRangePicker,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@eluan/core";

type Range = { from: Date | undefined; to: Date | undefined };
const anyDate: Range = { from: undefined, to: undefined };

export function OrderFilters() {
  const [range, setRange] = React.useState<Range>(anyDate);
  const [status, setStatus] = React.useState("all");

  const field = { display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" } as const;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr auto",
        alignItems: "end",
        gap: "var(--spacing-md)",
      }}
    >
      <div style={field}>
        <Label id="order-date-label">Order date</Label>
        <div role="group" aria-labelledby="order-date-label">
          <DateRangePicker
            value={range}
            onValueChange={(next) => setRange(next ?? anyDate)}
            placeholder="Any date"
          />
        </div>
      </div>
      <div style={field}>
        <Label htmlFor="order-status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger id="order-status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setRange(anyDate);
          setStatus("all");
        }}
      >
        Reset filters
      </Button>
    </div>
  );
}
```

## 14. Related components

- [Calendar](./calendar.md): the grid inside both pickers; use it inline when the grid should stay visible.
- [DateTimePicker](./date-time-picker.md): the same trigger and popover with a time row.
- [TimeInput](./time-input.md): a time of day without a date.
- [Popover](./popover.md): the surface the pickers open in.
- [Label](./form-label.md): the visible label for each picker; see also [forms](../patterns/forms.md).
- [Select](./select.md): the other common control in a filter bar.

## 15. Common agent mistakes

_Filled from evals._
