---
name: Tabs
use_when: One area of a page switches between a few peer views of the same subject, such as Overview, Activity and Settings for one project.
instead_of: SegmentedControl to switch a value or filter without separate panels; NavigationMenu, NavigationDrawer or links to go to another page; Accordion to stack sections the user can open together.
source: packages/core/src/components/tabs.tsx
---

# Tabs

## 1. Overview

Tabs show one panel at a time from a set of peer views on the same page, chosen from a row of tab triggers. It wraps Radix Tabs: a pill-shaped list on `--interactive-bg-alt` with the active tab raised on `--container-bg`, and panels that swap in place without changing the URL.

## 2. When to use

- Splitting one object's details into peer views: a project's Overview, Activity and Settings.
- Settings or profile pages with a few sections the user visits one at a time: Account, Password, Notifications.
- Alternate presentations of the same content: Preview and Code.

### When not to use

- Going to another page or URL → use links: [NavigationMenu](./navigation-menu.md), [NavigationDrawer](./navigation-drawer.md), [Header](./header.md), or [Button](./button.md) `variant="link"` with `asChild` around an `<a>`. Never style links or buttons to look like tabs.
- Switching a value, filter or mode that changes the same content (List / Board, Day / Week / Month) → use [SegmentedControl](./segmented-control.md).
- Sections the user may want open at the same time, or long content to scan → use [Accordion](./accordion.md).
- Steps that must happen in order → use [Stepper](./stepper.md).
- A pressed/unpressed option → use [ToggleGroup](./toggle-group.md).

<!-- REVIEW: boundaries against SegmentedControl and links drafted; both are built on Radix Tabs and source doesn't state when to pick which. -->

## 3. Anatomy

1. **Root** (`Tabs`): holds the selected value. Renders a `<div>`.
2. **List** (`TabsList`): the row of triggers. An inline pill on `--interactive-bg-alt` with `--curves-md` radius and `--spacing-xs` padding. It sizes to its triggers; it doesn't stretch.
3. **Trigger** (`TabsTrigger`): one tab, `--font-size-sm` at weight 500, `--interactive-fg-alt` text. The active trigger sits on a `--container-bg` cap with `--interactive-fg` text.
4. **Content** (`TabsContent`): the panel for one trigger, `--spacing-sm` below the list. Only the active panel is rendered.

## 4. Variants

Tabs has no variants. The list always draws as a pill with a raised active tab.

## 5. Sizes

Tabs has no size prop. Triggers use `--font-size-sm` and `--spacing-sm` padding, so they follow the density axis.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Inactive trigger, `--interactive-fg-alt` text on the list | |
| Hover | No visible change | The hover rule repeats the resting colour, so inactive tabs give no hover feedback. Don't add your own. <!-- REVIEW: W3 (fix/dead-rules): tabs.tsx trigger :hover sets the resting colour; needs a real hover treatment (design call). --> |
| Focus | 1px outline in `--focus-ring`, 1px offset, on triggers and panels | Never remove or restyle the focus ring. |
| Active | `--container-bg` cap, `--interactive-fg` text, a faint shadow | Exactly one trigger is active. |
| Disabled | `--interactive-fg-disabled` text, no pointer events | Arrow keys skip disabled triggers. |

## 7. Content guidelines

- Label tabs with one or two nouns naming the view: "Overview", "Activity", "Billing".
- Use sentence case. No icons-only tabs; if you add an icon, keep the text.
- Keep labels about the same length and the set small, two to six tabs. Triggers don't wrap. <!-- REVIEW: count drafted; stories show two to four tabs. -->
- Order tabs by how often they are used, most used first, and make the first tab the default.
- Don't put counts or status in the label unless they change what the user does: "Issues 3" is fine; "Settings (new!)" isn't.

| Do | Don't |
| --- | --- |
| Overview | Click for overview |
| Activity | Recent activity log and history |
| Billing | Billing info ⚡ |

## 8. Rules

1. Use Tabs only for views inside the same page. If choosing an option changes the URL to another page, it's navigation; use links.
2. Give every `TabsTrigger` a `value` that matches exactly one `TabsContent`.
3. Set `defaultValue` (or control `value` with `onValueChange`) so one tab is always selected.
4. Put the content in `TabsContent`. Don't show and hide your own panels from a SegmentedControl or Buttons to fake tabs.
5. Keep the list horizontal. `orientation="vertical"` changes only the arrow keys; the list still lays out as a row.
6. Never pass `className` or `style` to any part, including the `Tabs` root. Put width and spacing on a wrapper you own.

## 9. Dos and don'ts

**Do:** switch peer views of one project with Tabs.

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

**Don't:** build tabs out of buttons or links.

```tsx
<div style={{ display: "flex" }}>
  <Button variant={view === "overview" ? "secondary" : "ghost"} onClick={() => setView("overview")}>Overview</Button>
  <Button variant={view === "activity" ? "secondary" : "ghost"} onClick={() => setView("activity")}>Activity</Button>
</div>
{view === "overview" ? overview : activity}
```

**Do:** use links when each option is a separate page.

```tsx
<NavigationMenu aria-label="Project">
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <a href="/projects/apollo" className={navigationMenuTriggerStyle()} aria-current="page">Overview</a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

**Don't:** make Tabs navigate.

```tsx
<Tabs value="overview" onValueChange={(value) => router.push(`/projects/apollo/${value}`)}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
</Tabs>
```

**Do:** use SegmentedControl to switch how the same content is shown.

```tsx
<SegmentedControl value={layout} onValueChange={setLayout} aria-label="Layout">
  <SegmentedControlItem value="list">List</SegmentedControlItem>
  <SegmentedControlItem value="board">Board</SegmentedControlItem>
</SegmentedControl>
```

**Don't:** use Tabs with empty panels as a filter switch.

```tsx
<Tabs value={layout} onValueChange={setLayout}>
  <TabsList>
    <TabsTrigger value="list">List</TabsTrigger>
    <TabsTrigger value="board">Board</TabsTrigger>
  </TabsList>
</Tabs>
```

## 10. Accessibility

- Role: the list is `tablist`; triggers are `tab` with `aria-selected` and `aria-controls`; panels are `tabpanel`, labelled by their trigger.
- Label: each tab is named by its text. Give the list an `aria-label` when the tabs need context ("Project sections").
- Keyboard: Tab moves focus to the active tab, then into the panel. ArrowLeft and ArrowRight move between tabs and select them as focus moves (`activationMode="automatic"`); Home and End jump to the first and last tab. Use `activationMode="manual"` when a panel is slow to render, so Enter or Space selects instead.
- Focus: panels are focusable (`tabIndex` 0) and show the focus outline, so keyboard users can reach panels with no focusable content.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: the list is `inline-flex` and sizes to its triggers; it doesn't scroll or wrap. Keep the set short enough to fit the narrowest screen, or switch to a [Select](./select.md) on phones. <!-- REVIEW: small-screen fallback drafted; source has no overflow handling. -->
- Overflow and truncation: trigger labels don't wrap (`white-space: nowrap`).
- Mounting: inactive panels unmount. Lift state you need to keep (form drafts, scroll position) above `Tabs`, or pass `forceMount` on `TabsContent`.
- URL: Tabs don't change the URL. If a tab must be linkable, control `value` from a query parameter.
- Motion: trigger colour, background and shadow transition over 150ms. Panels swap without animation. Don't add any.

## 12. API

<!-- api:start -->
### Tabs

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultValue` | `string` | | Selected tab when uncontrolled. |
| `value` | `string` | | Controlled selected tab. |
| `onValueChange` | `(value: string) => void` | | Called when the selected tab changes. |
| `activationMode` | `"automatic" \| "manual"` | `"automatic"` | Whether arrow keys select tabs as they move focus. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Arrow-key direction only; the list always lays out as a row. |
| `...props` | Radix `Tabs.Root` props | | `dir`. Re-exported Radix part; it forwards `className` and `style`, but don't pass them. |

### TabsList

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `loop` | `boolean` | `true` | Wraps arrow-key focus from the last tab to the first. |
| `...props` | Radix `Tabs.List` props without `className`, `style` | | `aria-label`. |

### TabsTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | | Required. Matches a `TabsContent` `value`. |
| `disabled` | `boolean` | `false` | Not selectable; skipped by arrow keys. |
| `...props` | Radix `Tabs.Trigger` props without `className`, `style` | | |

### TabsContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | | Required. Matches a `TabsTrigger` `value`. |
| `forceMount` | `true` | | Keeps the panel mounted while inactive. |
| `...props` | Radix `Tabs.Content` props without `className`, `style` | | |
<!-- api:end -->

## 13. Examples

```tsx
import * as React from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from "@eluan/core";

export function ProjectDetails({
  summary,
  openIssues,
  onArchive,
}: {
  summary: string;
  openIssues: number;
  onArchive: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
      <Typography variant="title" as="h1">Apollo redesign</Typography>
      <Tabs defaultValue="overview">
        <TabsList aria-label="Project sections">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Typography variant="body">{summary}</Typography>
        </TabsContent>
        <TabsContent value="issues">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
            <Typography variant="body">Open issues</Typography>
            <Badge>{openIssues}</Badge>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Archive project</CardTitle>
              <CardDescription>Archived projects are read-only and hidden from the dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <Typography variant="caption" tone="muted">You can restore it from the archive at any time.</Typography>
            </CardContent>
            <CardFooter>
              <Button type="button" variant="outline" onClick={onArchive}>Archive project</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

## 14. Related components

- [SegmentedControl](./segmented-control.md): switches a value or layout with no panels; also built on Radix Tabs.
- [Accordion](./accordion.md): sections that can be open together.
- [NavigationMenu](./navigation-menu.md) and [NavigationDrawer](./navigation-drawer.md): navigation between pages.
- [ToggleGroup](./toggle-group.md): pressable options.
- See [navigation patterns](../patterns/navigation.md).

## 15. Common agent mistakes

_Filled from evals._
