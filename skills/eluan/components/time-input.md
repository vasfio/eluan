---
name: TimeInput
use_when: The user enters a time of day with no date, such as opening hours or a daily reminder.
instead_of: Input type=time or a Select of times; DateTimePicker when a date is needed too.
source: packages/core/src/components/time-input.tsx
---

# TimeInput

## 1. Overview

TimeInput is a segmented time field: separate hours and minutes inputs, an optional seconds input, and AM/PM toggles in 12-hour mode. Its value is a string such as `"14:30"` or `"02:30 PM"`. DateTimePicker uses it for its time row.

## 2. When to use

- A time of day on its own: opening hours, quiet hours, a daily digest time, a recurring reminder.
- The time half of a composed control, next to an inline [Calendar](./calendar.md).

### When not to use

- One moment with a date → use [DateTimePicker](./date-time-picker.md).
- A date only → use [DatePicker](./date-picker.md).
- A duration or count (minutes of a call, number of hours) → use [NumberInput](./number-input.md). <!-- REVIEW: alternative drafted; source doesn't mention durations. -->
- Choosing from a few fixed slots (9:00, 9:30, 10:00) → use [Select](./select.md) or [SegmentedControl](./segmented-control.md). <!-- REVIEW: alternative drafted; no source guidance. -->

## 3. Anatomy

1. **Field**: the bordered container, `--size-lg` tall, with `--curves-md` corners.
2. **Clock icon** (optional): leading, in `--interactive-fg-alt`. Hide it with `showIcon={false}`.
3. **Segments**: hours, minutes and optional seconds inputs in `--font-mono` with tabular figures, separated by colons.
4. **Period toggles** (12-hour only): AM and PM Toggles behind a hairline divider.

## 4. Variants

TimeInput has no `variant` prop. `timeInputVariants` is exported for compatibility and returns an empty string. `format` and `showSeconds` decide the segments:

| Props | Segments | Value |
| --- | --- | --- |
| `format="24"` (default) | Hours (0 to 23), minutes | `"14:30"` |
| `format="12"` | Hours (1 to 12), minutes, AM/PM | `"02:30 PM"` |
| `showSeconds` | Adds seconds | `"14:30:45"` or `"02:30:45 PM"` |

## 5. Sizes

`size` accepts only `"default"` and has no effect. The field is `--size-lg` tall, matching default Input and Button heights, and as wide as its segments.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | `--interactive-border-alt` border, digits in `--interactive-fg` | |
| Focus | The focused segment fills with `--interactive-bg-hover`; the field gets a 1px outline in `--interactive-border`, 1px offset | Never remove or restyle the focus ring. The field's border gets lighter on focus. <!-- REVIEW: known source issue W1 in the fix plan (rest border --interactive-border-alt swaps to the paler --interactive-border on focus); the segment fill keeps focus visible. --> |
| Empty | No empty state: an empty `value` shows 00:00 (24-hour) or 12:00 AM (12-hour) | `placeholder` is accepted and ignored. |
| Period | The active period is a pressed Toggle | 12-hour only. |
| Disabled | `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text, no pointer events | Segments and toggles are disabled. |
| Error | No built-in error state | Put a FormMessage under the field and reference it with `aria-describedby` on TimeInput. <!-- REVIEW: composition drafted; TimeInput has no invalid styling. --> |

## 7. Content guidelines

- Name what the time is for in the label: "Opens at", "Send digest at".
- Add the time zone to the label or hint when it isn't the user's own: "Quiet hours start (UTC)". <!-- REVIEW: drafted; source holds no time-zone information. -->
- Pass values in the shape `format` emits: `"HH:MM"` for 24-hour, `"HH:MM AM"` or `"HH:MM PM"` (with a space) for 12-hour, plus `":SS"` with `showSeconds`. In 12-hour mode a 24-hour string is also read and converted.

| Do | Don't |
| --- | --- |
| Opens at | Time |
| Send digest at | Enter a time |

## 8. Rules

1. Pass `value` and `onValueChange`, using the string shapes above.
2. Label it. TimeInput renders a `div`, which `Label htmlFor` can't target: pass `role="group"` and `aria-labelledby` pointing at the Label's `id`. <!-- REVIEW: workaround drafted; time-input.tsx sets no role, and its segments are named only Hours, Minutes and Seconds. -->
3. Don't use `placeholder`; it does nothing. TimeInput can't show "no time", so for an optional time pair it with a [Switch](./switch.md) or [Checkbox](./checkbox.md) ("Set a time") and render TimeInput only when it's on. <!-- REVIEW: composition drafted; source ignores placeholder and always displays a time. -->
4. With `name`, a hidden input submits the displayed time, 00:00 included, even if the user never touched the field. Only render it when a time is meant to be sent.
5. Keep `format` and the value shape in step. `onValueChange` always emits the shape of the current `format`.
6. Never pass `className` or `style`; they're omitted. Use a wrapper for layout.

## 9. Dos and don'ts

**Do:** name the group and control the value.

```tsx
<Label id="opens-at-label">Opens at</Label>
<TimeInput role="group" aria-labelledby="opens-at-label" value={opensAt} onValueChange={setOpensAt} />
```

**Don't:** rely on a placeholder or an unlabelled field.

```tsx
<TimeInput placeholder="Opening time" />
```

**Do:** hide the field until an optional time is wanted.

```tsx
<Switch id="set-reminder" checked={hasReminder} onCheckedChange={setHasReminder} />
<Label htmlFor="set-reminder">Remind me at a set time</Label>
{hasReminder && (
  <TimeInput role="group" aria-label="Reminder time" name="reminderTime" value={time} onValueChange={setTime} />
)}
```

**Don't:** treat 00:00 as "not set".

```tsx
const hasTime = value !== "00:00";
```

## 10. Accessibility

- Role: no role on the field by default; add `role="group"`. The segments are text inputs with `inputMode="numeric"`, named "Hours", "Minutes" and "Seconds". AM and PM are Toggle buttons with `aria-pressed`.
- Label: `aria-labelledby` on the field pointing at a visible Label, or `aria-label` when the context already shows the meaning.
- Keyboard: type digits; hours move on to minutes once two digits are typed, or one digit that can't start a two-digit hour. Up and Down step the focused segment and wrap. `:` jumps to the next segment. Tab moves through segments, then the AM and PM toggles; Enter or Space presses a toggle.
- Focus: a segment selects its digits on focus, so typing replaces them. Out-of-range numbers are clamped when the segment loses focus.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per field. <!-- REVIEW: system-wide focus-ring contrast issue W1, see foundations/colour.md. -->

## 11. Behaviour

- Responsive: TimeInput sizes to its content and doesn't stretch to the container. Align it to the start of its column.
- Updates: `onValueChange` fires on every valid digit, step and period change, not only on blur.
- Ranges: hours run 0 to 23 (24-hour) or 1 to 12 (12-hour); minutes and seconds 0 to 59.
- Motion: border and colour transitions over 150ms. Don't add your own.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `""` | `"HH:MM"`, `"HH:MM AM/PM"`, or with `:SS` when `showSeconds` is set. |
| `onValueChange` | `(value: string) => void` | | Called with the new time string. |
| `format` | `"12" \| "24"` | `"24"` | Clock format; `"12"` adds AM/PM toggles. |
| `showSeconds` | `boolean` | `false` | Adds a seconds segment. |
| `showIcon` | `boolean` | `true` | Shows the leading clock icon. |
| `disabled` | `boolean` | `false` | Disables segments and toggles. |
| `name` | `string` | | Renders a hidden input with the current time for native form submission. |
| `placeholder` | `string` | | Accepted and ignored. |
| `size` | `"default"` | | No effect. |
| `ref` | `Ref<HTMLDivElement>` | | Forwarded to the field `div`. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style`, `onChange` | | Spread on the field: `role`, `aria-labelledby`, `aria-describedby`, `id`. |
<!-- api:end -->

`timeInputVariants()` returns `""`. Don't use it.

## 13. Examples

```tsx
import * as React from "react";
import { FormDescription, Label, TimeInput } from "@eluan/core";

export function DigestTimeField() {
  const [sendAt, setSendAt] = React.useState("08:00 AM");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "var(--spacing-sm)" }}>
      <Label id="digest-time-label">Send digest at</Label>
      <TimeInput
        role="group"
        aria-labelledby="digest-time-label"
        aria-describedby="digest-time-hint"
        format="12"
        name="digestTime"
        value={sendAt}
        onValueChange={setSendAt}
      />
      <FormDescription id="digest-time-hint">Sent every weekday in your local time.</FormDescription>
    </div>
  );
}
```

## 14. Related components

- [DateTimePicker](./date-time-picker.md): a date and a time in one control; it uses TimeInput for its time row.
- [DatePicker](./date-picker.md): the chooser for all date and time components.
- [Toggle](./toggle.md): the AM and PM controls.
- [Label](./form-label.md): the visible label; see also [forms](../patterns/forms.md).
- [Input](./input.md): for free text; don't use `type="time"`.

## 15. Common agent mistakes

_Filled from evals._
