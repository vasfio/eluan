---
name: SegmentedControl
use_when: The user picks exactly one of two to five short options that set the mode or filter of the current view, such as Day, Week, Month or List, Board.
instead_of: Tabs when each option has its own content panel; ToggleGroup for toolbar tool options or several values; RadioGroup for a value submitted with a form; Select for longer lists.
source: packages/core/src/components/segmented-control.tsx
---

# SegmentedControl

## 1. Overview

SegmentedControl shows a few options as segments in a recessed track, with the selected segment raised. It is built on Radix Tabs, the list only: exactly one segment is selected once a value is set, and you render whatever the selection controls yourself.

## 2. When to use

- The mode or range of the same view: Day, Week, Month; List, Board, Calendar.
- A filter over the same list: All, Active, Archived.
- A short exclusive choice that takes effect immediately, such as a delivery speed.

### When not to use

- Each option shows its own content panel (Overview, Activity, Settings) → use [Tabs](./tabs.md). Tabs render the panels and link each tab to its panel.
- Tool options in a toolbar, icon-only options, or several options pressed at once → use [ToggleGroup](./toggle-group.md).
- A value submitted with a form, or options that need a description each → use [RadioGroup](./radio-group.md). SegmentedControl submits nothing.
- More than five options, or labels longer than a couple of words → use [Select](./select.md). <!-- REVIEW: the five-option limit and the Tabs / ToggleGroup / RadioGroup splits are drafted from what each component renders; source doesn't state them. -->
- An on/off setting → use [Switch](./switch.md).

## 3. Anatomy

1. **Root** (`SegmentedControl`): holds the value. Inline by default; stretches to its container with `fullWidth`.
2. **Track**: the recessed background behind the segments, with `--spacing-xs` padding and gap and `--curves-md` corners.
3. **Segment** (`SegmentedControlItem`): a button with a short label. Unselected segments show `--interactive-fg-alt` text on the track; the selected segment is raised on `--interactive-bg` with `--interactive-fg` text. Segment corners are inset to sit inside the track's.

## 4. Variants

SegmentedControl has no variants. `size` and `fullWidth` control its look.

## 5. Sizes

| Size | Use in |
| --- | --- |
| `default` | Page and panel headers, next to default controls (`--size-md` tall segments, `--font-size-sm`). |
| `sm` | Dense headers, cards and toolbars (`--size-sm` tall, `--font-size-xs`). |

`fullWidth` stretches the control to its container and splits the width equally between segments. Use it in narrow panels and on mobile.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Muted labels on the recessed track | |
| Hover | An unselected segment's text darkens to `--interactive-fg` | No fill change. |
| Focus | 1px outline in `--interactive-border`, 1px offset, on the segment | Never remove or restyle the focus ring. |
| Selected | Raised segment on `--interactive-bg`, `--interactive-fg` text | `data-state="active"`. |
| Disabled | `--interactive-fg-disabled` text, no pointer events | `disabled` on the root disables every segment; `disabled` on an item disables one. |

## 7. Content guidelines

- Use one or two words per segment, in sentence case, in the same grammatical form: "Day, Week, Month", not "Daily, This week, Month view".
- Order segments the way the values run: smallest to largest, shortest to longest time.
- Keep segment labels similar in length; with `fullWidth` every segment gets the same width.

| Do | Don't |
| --- | --- |
| Day · Week · Month | Today's view · 7 days · Monthly calendar |
| All · Active · Archived | Show all items · Active only · Archive |

<!-- REVIEW: content guidance drafted; stories show Day/Week/Month, List/Board/Calendar, All/Active/Archived. -->

## 8. Rules

1. Always set `defaultValue` or `value`. With neither, no segment is selected until the user clicks one.
2. Give every segment a unique `value`, and read the selection from `onValueChange` to render your content.
3. Don't add Tabs panels (`TabsContent`) or mix SegmentedControl parts with Tabs parts. If options have panels, use [Tabs](./tabs.md).
4. Put a visible label or heading next to the control; it can't name its own tab list (see Accessibility).
5. Use two to five segments with text labels. For icon-only options use [ToggleGroup](./toggle-group.md). <!-- REVIEW: drafted limit, see When not to use. -->
6. Use `fullWidth` to stretch it. Never pass `className` or `style`; they're dropped.
7. Keep the value in your own state if a form needs it; SegmentedControl submits nothing.

## 9. Dos and don'ts

**Do:** switch the mode of one view and render it from the value.

```tsx
<SegmentedControl value={view} onValueChange={setView}>
  <SegmentedControlItem value="list">List</SegmentedControlItem>
  <SegmentedControlItem value="board">Board</SegmentedControlItem>
</SegmentedControl>
{view === "list" ? <TaskList tasks={tasks} /> : <TaskBoard tasks={tasks} />}
```

**Don't:** leave it without a value, or use it for pages with their own content.

```tsx
<SegmentedControl>
  <SegmentedControlItem value="overview">Overview</SegmentedControlItem>
  <SegmentedControlItem value="activity">Activity</SegmentedControlItem>
  <SegmentedControlItem value="settings">Settings and permissions</SegmentedControlItem>
</SegmentedControl>
```

**Do:** use Tabs when each option has a panel.

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">{overview}</TabsContent>
  <TabsContent value="activity">{activity}</TabsContent>
</Tabs>
```

## 10. Accessibility

- Role: the track is a `tablist` and each segment a `tab` with `aria-selected`, because SegmentedControl is built on Radix Tabs. Each tab also points `aria-controls` at a panel that doesn't exist, since SegmentedControl renders none. Screen readers announce segments as tabs ("Week, tab, 2 of 3"). <!-- REVIEW: role mismatch for a value picker, found while writing; not in the fix plan. -->
- Label: each segment is named by its text. `aria-label` on SegmentedControl lands on the root wrapper, not the tab list, so the list itself can't be named. Place a visible heading or label next to it. <!-- REVIEW: API gap found while writing; not in the fix plan. -->
- Keyboard: Tab moves to the selected segment. Left and Right arrows move between segments and select as they go; Home and End jump to the first and last. Tab again leaves the control. With `activationMode="manual"`, arrows only move focus and Enter or Space selects.
- Focus: visible outline on the focused segment. Disabled segments use the native `disabled` attribute and are skipped.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per segment. <!-- REVIEW: system-wide focus-ring contrast issue (W1), see foundations/colour.md. -->

## 11. Behaviour

- Responsive: inline and as wide as its segments by default, so it sits in a row with a heading. `fullWidth` fills the container with equal segments.
- Overflow and truncation: labels never wrap. Too many or too-long segments overflow the container; keep labels short.
- Motion: text and background colours transition over 150ms. The raised segment doesn't slide between positions. Don't add motion.

## 12. API

<!-- api:start -->
### SegmentedControl

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | | Controlled selected value. |
| `defaultValue` | `string` | | Initial value when uncontrolled. |
| `onValueChange` | `(value: string) => void` | | Called when the selection changes. |
| `size` | `"default" \| "sm"` | `"default"` | Height and type size of every segment. |
| `fullWidth` | `boolean` | `false` | Fills the container with equal-width segments. |
| `disabled` | `boolean` | `false` | Disables every segment. |
| `activationMode` | `"automatic" \| "manual"` | `"automatic"` | Whether arrow keys select as they move focus. |
| `...props` | Radix `Tabs.Root` props without `className`, `style`, `orientation`, `asChild` | | `dir`, `id`. Land on the root wrapper, not the tab list. |

### SegmentedControlItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | | Required. The value this segment selects. |
| `disabled` | `boolean` | `false` | Disables this segment. |
| `...props` | Radix `Tabs.Trigger` props without `className`, `style`, `asChild` | | `id`, `onFocus`. |
<!-- api:end -->

`className` and `style` are omitted from both parts; Eluan components are styling-closed.

## 13. Examples

```tsx
import { useState } from "react";
import { SegmentedControl, SegmentedControlItem, Typography } from "@eluan/core";

type View = "list" | "board" | "calendar";

const descriptions: Record<View, string> = {
  list: "A flat, sortable list of every task.",
  board: "Tasks grouped into columns by status.",
  calendar: "Tasks placed on their due dates.",
};

export function TasksHeader() {
  const [view, setView] = useState<View>("list");

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-md)" }}>
        <Typography variant="heading" as="h2">
          Tasks
        </Typography>
        <SegmentedControl size="sm" value={view} onValueChange={(next) => setView(next as View)}>
          <SegmentedControlItem value="list">List</SegmentedControlItem>
          <SegmentedControlItem value="board">Board</SegmentedControlItem>
          <SegmentedControlItem value="calendar">Calendar</SegmentedControlItem>
        </SegmentedControl>
      </div>
      <Typography variant="body" tone="muted">
        {descriptions[view]}
      </Typography>
    </section>
  );
}
```

## 14. Related components

- [Tabs](./tabs.md): switches between content panels.
- [ToggleGroup](./toggle-group.md): pressable tool options, single or multiple, often icon-only.
- [RadioGroup](./radio-group.md): one value in a form, with room for descriptions.
- [Select](./select.md): one value from a longer list.
- See [navigation](../patterns/navigation.md) for Tabs vs SegmentedControl.

## 15. Common agent mistakes

_Filled from evals._
