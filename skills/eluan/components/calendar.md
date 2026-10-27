---
name: Calendar
use_when: A month grid stays visible on the page for picking one date, several dates or a range.
instead_of: DatePicker or DateRangePicker for a date field in a form or filter bar; DateTimePicker when the time matters too.
source: packages/core/src/components/calendar.tsx
---

# Calendar

## 1. Overview

Calendar is an inline month grid built on react-day-picker v9. It replaces the library's caption with month and year Selects, puts previous and next month buttons on either side, and supports single, multiple and range selection. DatePicker, DateRangePicker and DateTimePicker all render it inside a Popover.

## 2. When to use

- A date choice that stays on the page: a booking or availability view, a side panel that filters by day.
- Picking several separate dates (`mode="multiple"`). No picker wraps this mode.
- A custom panel or popover around a month grid that the pickers don't cover.

### When not to use

- A date field in a form → use [DatePicker](./date-picker.md).
- A start and end date in a form or filter bar → use DateRangePicker, documented in [DatePicker](./date-picker.md).
- A date plus a time of day → use [DateTimePicker](./date-time-picker.md).
- A time of day on its own → use [TimeInput](./time-input.md).
- A birth date or any date many years from today → use an [Input](./input.md) with a format hint. The year Select only lists ten years around the current one. <!-- REVIEW: alternative drafted; source limits YEAR_OPTIONS to the current year -5 to +4 and gives no guidance for distant dates. -->

## 3. Anatomy

1. **Previous and next buttons**: ghost icon Buttons on the left and right edges, named "Go to previous month" and "Go to next month".
2. **Caption**: a month Select and a year Select for each month shown.
3. **Weekday row**: short weekday names in `--interactive-fg-alt`.
4. **Day grid**: one grid per month. Each day is a button with its number in `--font-mono`.
5. **Outside days** (optional): trailing and leading days of the adjacent months, shown by default.

Calendar draws no border or background of its own. Put it on a surface you own: a Card, a Popover, or a bordered wrapper.

## 4. Variants

Calendar has no `variant` prop. `mode` sets how selection works:

| Mode | Use for |
| --- | --- |
| `single` | One date. Clicking the selected date again clears it unless `required` is set. |
| `multiple` | Several separate dates, each toggled on click. |
| `range` | A start and end date. The first click selects that day as a one-day range; the next click before or after it extends the range. Use `numberOfMonths={2}`. |

## 5. Sizes

Calendar has no size prop. Day cells are `--size-md` tall and the grid stretches to fill its container, so the wrapper's width sets the cell width.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Day numbers in `--font-mono`, `--font-size-sm` | |
| Hover | Day fills with `--interactive-bg-hover` and rounds to `--curves-lg` | |
| Focus | 1px outline in `--interactive-border`, 1px offset, on the focused day | Never remove or restyle the focus ring. |
| Selected | `--interactive-bg-selected` fill with `--interactive-fg-selected` text; hovering it uses `--action-primary-bg-hover` | |
| Range | Start and end days take the selected fill with rounded outer corners; days between use `--interactive-bg-alt2` with `--interactive-fg-alt` text and square corners | The start day squares its inner corner once both ends are chosen. This is deliberate; don't restyle it. |
| Today | Bold number with a short keyline under it | The keyline offset is in `em` on purpose so it tracks density. |
| Outside day | `--interactive-fg-disabled` text | A selected outside day (a range that crosses a month boundary) renders pale text on a pale fill and is close to invisible. In `mode="range"`, set `showOutsideDays={false}` to avoid it. <!-- REVIEW: known source bug W2 #3 in the fix plan (calendar.tsx `.day-outside[aria-selected]` pairs --interactive-bg-alt2 with --interactive-fg-selected). --> |
| Disabled | Whole calendar at 50% opacity, no pointer events, `aria-disabled` on the root | Set with `disabled`. |

## 7. Content guidelines

- Calendar has no text props. Name what the date is for in a heading or label right above it: "Delivery day", "Out of office".
- Show the chosen date in words near an inline calendar when it drives the rest of the page ("Arrives Thursday, 30 October").
- Month names in the caption are English whatever `locale` you pass.

| Do | Don't |
| --- | --- |
| Delivery day | Select |
| Days off | Calendar |

## 8. Rules

1. Always pass `mode`. Without it, days render as plain text, not buttons, and nothing can be selected.
2. Pass `selected` and `onSelect` together. The shape follows `mode`: a `Date`, a `Date[]`, or `{ from, to }`.
3. Give Calendar a container. It fills the width it's given, so constrain it with a wrapper (`width: "fit-content"` or a fixed column) and put it on a Card, a Popover or a bordered wrapper.
4. Use `disabled` only as a boolean for the whole calendar. Any truthy value, including a date matcher, disables every day. To restrict dates, check the date in `onSelect` and explain with a [Label](./form-label.md) hint or FormMessage. <!-- REVIEW: source narrows `disabled` to boolean and applies the whole-calendar style to any truthy value; the docs site says `boolean | Matcher`. Workaround drafted. -->
5. Use `numberOfMonths={2}` for ranges, as DateRangePicker does.
6. Declare the range type yourself (`{ from: Date | undefined; to?: Date | undefined }`) instead of importing `DateRange` from `react-day-picker`, which is Eluan's dependency, not your app's. <!-- REVIEW: follows router rule 9; the docs site and stories import the type from react-day-picker. -->
7. Never pass `className`, `classNames`, `style` or a `MonthCaption` component. Calendar overwrites `className`, `classNames` and the caption.

## 9. Dos and don'ts

**Do:** set a mode and control the selection.

```tsx
const [day, setDay] = React.useState<Date | undefined>();

<Calendar mode="single" selected={day} onSelect={setDay} />
```

**Don't:** leave out `mode`, or restyle the grid.

```tsx
<Calendar selected={day} className="my-calendar" />
```

**Do:** hide outside days on an inline range calendar.

```tsx
<Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} showOutsideDays={false} />
```

**Don't:** pass a date matcher to `disabled`; it disables the whole calendar.

```tsx
<Calendar mode="single" selected={day} onSelect={setDay} disabled={{ before: new Date() }} />
```

## 10. Accessibility

- Role: each month is a `grid` named by its month and year ("October 2026"); in `multiple` and `range` modes it is `aria-multiselectable`. Days are `gridcell`s holding buttons.
- Label: each day button is named with the full date ("Monday, October 27th, 2026"), with "Today, " before it and ", selected" after it where they apply. Name the calendar as a whole by wrapping it in `role="group"` with `aria-labelledby` pointing at your visible heading. The month and year Selects are named only by their current value ("October", "2026"). <!-- REVIEW: the caption SelectTriggers have no aria-label in calendar.tsx; not in the fix plan. -->
- Keyboard: Arrow keys move one day or one week; Shift with Left or Right moves a month, with Up or Down a year. Page Up and Page Down move a month (with Shift, a year). Home and End go to the start and end of the week. Enter or Space selects the focused day. Tab moves through the previous button, the month and year Selects, the grid and the next button.
- Focus: only one day is in the tab order at a time (roving focus); arrow keys move it, and the displayed month follows. Calendar doesn't trap focus.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per calendar. <!-- REVIEW: system-wide focus-ring contrast issue W1, see foundations/colour.md. -->
- Text size: the weekday row uses a fixed size that doesn't follow the fluid type scale or density. Don't compensate per calendar. <!-- REVIEW: known source issue W7 in the fix plan (calendar.tsx weekday fontSize is the only hardcoded font size in the library). -->

## 11. Behaviour

- Responsive: the grid fills its container. With `numberOfMonths={2}`, months sit side by side from a 640px viewport and stack below it, with a divider between them.
- Navigation: the arrows step one month. The month Select lists all twelve months; the year Select lists ten years, from five before the current year to four after. Dates outside that window are still reachable with the arrows, but the year Select then shows no matching year.
- Month state: uncontrolled by default (starts at `defaultMonth` or today). Pass `month` and `onMonthChange` to control it; the arrows, Selects and keyboard all report through `onMonthChange`.
- Motion: day colours and corners transition over 150ms. Don't add your own.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `"single" \| "multiple" \| "range"` | | Selection mode. Required in practice: without it days aren't selectable. |
| `selected` | `Date \| Date[] \| { from: Date \| undefined; to?: Date \| undefined }` | | Controlled selection; the shape follows `mode`. |
| `onSelect` | `(selected) => void` | | Called with the new selection, or `undefined` when the user clears it. |
| `required` | `boolean` | `false` | Stops the user clearing the selection by clicking the selected day again. |
| `numberOfMonths` | `number` | `1` | Months shown together. |
| `month` | `Date` | | Controlled displayed month. Pair with `onMonthChange`. |
| `defaultMonth` | `Date` | today | Initial month when uncontrolled. |
| `onMonthChange` | `(month: Date) => void` | | Called when the displayed month changes. |
| `showOutsideDays` | `boolean` | `true` | Shows days from the adjacent months. |
| `disabled` | `boolean` | `false` | Disables the whole calendar. Date matchers aren't supported. |
| `min` / `max` | `number` | | `multiple` mode: fewest and most dates; `range` mode: shortest and longest range, in days. |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | from `locale` | First day of the week; `0` is Sunday. |
| `locale` | react-day-picker locale | en-US | Weekday names and day labels. The month Select stays in English. |
| `...props` | react-day-picker `DayPicker` props | | Passed through, for example `footer`, `fixedWeeks`, `aria-labelledby`. `className` and `classNames` are overwritten, and `components.MonthCaption` is replaced. |
<!-- api:end -->

## 13. Examples

```tsx
import * as React from "react";
import { Calendar, Card, CardContent, CardHeader, CardTitle, Typography } from "@eluan/core";

export function DeliveryDayCard() {
  const [day, setDay] = React.useState<Date | undefined>();

  return (
    <div style={{ width: "fit-content" }}>
      <Card>
        <CardHeader>
          <CardTitle id="delivery-day-title">Delivery day</CardTitle>
        </CardHeader>
        <CardContent>
          <div role="group" aria-labelledby="delivery-day-title">
            <Calendar mode="single" required selected={day} onSelect={setDay} />
          </div>
          <Typography variant="caption" tone="muted" aria-live="polite">
            {day
              ? `Arrives ${day.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}`
              : "Pick a day to see when your order arrives."}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
```

## 14. Related components

- [DatePicker](./date-picker.md): Calendar in a Popover behind a field-style trigger; also covers DateRangePicker.
- [DateTimePicker](./date-time-picker.md): Calendar plus a TimeInput in one Popover.
- [Popover](./popover.md): the surface to use if you build your own calendar popover.
- [Select](./select.md): the caption's month and year controls.
- [Card](./card.md): a surface for an inline calendar.

## 15. Common agent mistakes

_Filled from evals._
