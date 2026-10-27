---
name: DateTimePicker
use_when: The user picks one moment, a date plus a time of day, such as a scheduled send or a meeting start.
instead_of: A DatePicker next to a separate TimeInput; DatePicker when the time doesn't matter; TimeInput for a time with no date.
source: packages/core/src/components/datetime-picker.tsx
---

# DateTimePicker

## 1. Overview

DateTimePicker is a field-style trigger that opens a Popover holding a Calendar and, below a divider, a TimeInput. It emits one `Date` that carries both the day and the time. The module and docs slug are `datetime-picker`; the export is `DateTimePicker`.

## 2. When to use

- Scheduling something for an exact moment: publish at, send at, starts at, reminder at.
- Editing an existing timestamp where both parts can change.

### When not to use

- Only the day matters → use [DatePicker](./date-picker.md).
- A start and end date → use DateRangePicker, documented in [DatePicker](./date-picker.md).
- A time of day with no date (opening hours, a daily digest) → use [TimeInput](./time-input.md).
- The date should stay visible on the page → use [Calendar](./calendar.md) with a [TimeInput](./time-input.md) beside it. <!-- REVIEW: composition drafted; no source example. -->

## 3. Anatomy

1. **Trigger**: a full-width Button in the `input` variant (`inputMuted` while empty), with a leading calendar icon and the formatted date and time.
2. **Popover**: opens below the trigger, aligned to its start edge, as wide as the trigger.
3. **Calendar**: one month in single mode. See [Calendar](./calendar.md).
4. **Time row**: a [TimeInput](./time-input.md) under a `--container-border` divider, with hours, minutes, optional seconds and AM/PM toggles in 12-hour mode.

## 4. Variants

No `variant` prop. Two booleans set the time format:

| Props | Trigger shows | Time row |
| --- | --- | --- |
| default | October 27th, 2026 02:30 PM | Hours, minutes, AM/PM |
| `use24Hour` | October 27th, 2026 14:30 | Hours, minutes |
| `showSeconds` | October 27th, 2026 02:30:45 PM | Adds a seconds segment |

## 5. Sizes

No size prop. The trigger is a default-size Button (`--size-lg` tall) and always fills its container's width. Set the width on a wrapper.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Empty | Placeholder in `--interactive-fg-alt` next to the calendar icon | |
| Filled | Formatted date and time in `--interactive-fg` | |
| Hover | Trigger background fills | |
| Focus | 1px outline in `--interactive-border`, 1px offset | Never remove or restyle the focus ring. |
| Open | Popover with the calendar and time row; focus moves into the calendar | |
| Disabled | `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text; skipped by Tab | |
| Error | No built-in error state | Put a FormMessage under the picker and reference it with `aria-describedby` on the group wrapper. <!-- REVIEW: composition drafted; the picker accepts no aria props. --> |

## 7. Content guidelines

- Name what the moment is for in the label: "Publish at", "Reminder".
- Say which time zone applies when it isn't obviously the user's own; the value is built in the browser's local time. <!-- REVIEW: drafted; source only shows the value is local (Date.setHours). -->
- Use `use24Hour` where your audience expects a 24-hour clock. <!-- REVIEW: drafted; source gives no guidance on which format to default to. -->
- The trigger format is fixed (`PPP` plus the time) and English; there is no `dateFormat` prop.

| Do | Don't |
| --- | --- |
| Publish at (UTC) | Date/time |
| Pick a send time | Select… |

## 8. Rules

1. Control the value: pass `value` and `onValueChange`, and keep the `Date` you receive.
2. Label every picker. The trigger accepts no `id` or `aria-label`: give the Label an `id` and wrap the picker in `<div role="group" aria-labelledby="…">`. <!-- REVIEW: workaround drafted; datetime-picker.tsx has no id or aria props, which conflicts with patterns/forms.md rule 1. -->
3. Expect frequent updates. `onValueChange` fires on every date pick and on every change in the time segments, so validate on blur or submit, not on each call.
4. Clear the value from outside. Clicking the selected date again does nothing, so offer your own Clear button that sets `value` to `undefined` when the field is optional. <!-- REVIEW: Clear button drafted; source ignores undefined from the calendar. -->
5. Convert to the time zone your backend expects before sending; the `Date` is local.
6. Set width on a wrapper; the trigger always stretches to fill it.
7. Never pass `className` or `style`; the props don't accept them.

## 9. Dos and don'ts

**Do:** use one DateTimePicker for one moment.

```tsx
<div role="group" aria-labelledby="publish-at-label">
  <DateTimePicker value={publishAt} onValueChange={setPublishAt} placeholder="Pick a publish time" />
</div>
```

**Don't:** split one moment into a DatePicker and a separate TimeInput.

```tsx
<DatePicker value={day} onValueChange={setDay} />
<TimeInput value={time} onValueChange={setTime} />
```

**Do:** offer a clear action when the field is optional.

```tsx
<Button type="button" variant="ghost" size="sm" onClick={() => setRemindAt(undefined)}>
  Remove reminder
</Button>
```

**Don't:** expect clicking the selected day to clear it.

```tsx
<DateTimePicker value={remindAt} onValueChange={(next) => setRemindAt(next)} />
// next is never undefined from the popover
```

## 10. Accessibility

- Role: the trigger is a `button` with `aria-haspopup="dialog"` and `aria-expanded` (Radix Popover); the panel is a `dialog` holding a calendar `grid` and the time inputs.
- Label: the trigger's name is its text, the formatted value or the placeholder. Name the field with a visible label and a `role="group"` wrapper (Rules 2). The time segments are named "Hours", "Minutes" and "Seconds"; the period toggles "AM" and "PM".
- Keyboard: Enter or Space opens. In the calendar, arrow keys, Page Up/Down and Home/End move and Enter picks. Tab moves on to the time segments, where digits type, Up and Down step, and `:` jumps to the next segment. Escape closes.
- Focus: on open, focus moves to the selected day, or today. Picking a date keeps the popover open so the user can go on to the time. The popover doesn't trap focus. On close, focus returns to the trigger.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per picker. <!-- REVIEW: system-wide focus-ring contrast issue W1, see foundations/colour.md. -->

## 11. Behaviour

- Picking a date keeps the time already chosen. With no earlier value, the time starts at midnight.
- Changing the time before picking a date applies it to today.
- The popover stays open after a date pick; it closes on Escape or a click outside.
- The calendar always opens on the current month, even when the value is in another month. <!-- REVIEW: source oddity, not in the fix plan; datetime-picker.tsx passes no defaultMonth, so Calendar falls back to today. -->
- Responsive: the trigger fills its container; the popover matches the trigger's width (never narrower than the calendar), so a wider trigger stretches the grid.
- Overflow and truncation: the trigger text doesn't wrap. Leave room for the full date and time.
- Motion: none of its own. Don't add any.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Date` | | The selected date and time. |
| `onValueChange` | `(date: Date \| undefined) => void` | | Called with a new `Date` on every date or time change. |
| `placeholder` | `string` | `"Pick date and time"` | Trigger text while empty. |
| `use24Hour` | `boolean` | `false` | 24-hour clock; otherwise 12-hour with AM/PM toggles. |
| `showSeconds` | `boolean` | `false` | Adds a seconds segment and shows seconds in the trigger. |
| `disabled` | `boolean` | `false` | Disables the trigger. |
| `ref` | `Ref<HTMLButtonElement>` | | Forwarded to the trigger button. |

No other props are accepted: no `id`, `name`, `aria-*`, `dateFormat`, `className` or `style`.
<!-- api:end -->

## 13. Examples

```tsx
import * as React from "react";
import { Button, DateTimePicker, FormDescription, Label } from "@eluan/core";

export function SchedulePost({ onSchedule }: { onSchedule: (when: Date) => void }) {
  const [publishAt, setPublishAt] = React.useState<Date | undefined>();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (publishAt) onSchedule(publishAt);
      }}
      style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <Label id="publish-at-label" required>
          Publish at
        </Label>
        <div role="group" aria-labelledby="publish-at-label" aria-describedby="publish-at-hint">
          <DateTimePicker value={publishAt} onValueChange={setPublishAt} placeholder="Pick a publish time" />
        </div>
        <FormDescription id="publish-at-hint">Uses your computer's time zone.</FormDescription>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--spacing-sm)" }}>
        <Button type="button" variant="outline" onClick={() => setPublishAt(undefined)}>
          Clear
        </Button>
        <Button type="submit" disabled={!publishAt}>
          Schedule post
        </Button>
      </div>
    </form>
  );
}
```

## 14. Related components

- [DatePicker](./date-picker.md): the same trigger without a time; also the chooser for all date and time components.
- [TimeInput](./time-input.md): the time row inside the popover; use it alone for a time with no date.
- [Calendar](./calendar.md): the grid inside the popover.
- [Popover](./popover.md): the surface the picker opens in.
- [Label](./form-label.md): the visible label; see also [forms](../patterns/forms.md).

## 15. Common agent mistakes

_Filled from evals._
