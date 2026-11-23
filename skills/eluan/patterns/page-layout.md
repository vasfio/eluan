---
name: page-layout
---

# Page layout

## When this applies

Laying out a page, a settings screen or a dashboard, and choosing how to show a collection of items. The router sends "Lay out a page or show a collection" here.

Lay out with the layout primitives: [Stack](../components/stack.md) for vertical flow, [Row](../components/row.md) for a line, [Grid](../components/grid.md) for columns and [Box](../components/box.md) for padding or a child that takes the remaining space. Their `gap` and `pad` props take `--spacing-*` steps by name, so the page re-flows with `data-spacing` along with its components. Positioning, overflow and fixed widths aren't props: put those on a wrapper element you own.

## Choosing components

| Situation | Use | Not |
| --- | --- | --- |
| Sections, fields or items one above another | [Stack](../components/stack.md) with a `gap` | margins on the children |
| A title with its actions, a row of buttons | [Row](../components/row.md), `justify="between"` for the ends | a flex spacer `div` |
| Cards or tiles in columns; a main and side column | [Grid](../components/grid.md) with `cols={{ base: 1, m: 2, l: 4 }}` | a Row that wraps: items don't line up |
| Items compared across the same attributes (users, invoices) | [Table](../components/table.md) | a grid of Cards: hard to scan across |
| Items that stand alone and are browsed (projects, plans, articles) | [Card](../components/card.md) in a grid | Table: crams rich content into cells |
| A few plans or options side by side with one recommended | Cards in a row, one primary Button in the recommended Card, the others `outline` | a Table with Buttons in cells |
| Long secondary content the user may skip (FAQ, advanced settings) | [Accordion](../components/accordion.md) | many headings on one long page |
| One collapsible region | [Collapsible](../components/collapsible.md) | Accordion with one item |
| Settings grouped into sections | headings with [Typography](../components/typography.md), groups in [Fieldset](../components/fieldset.md) or [Card](../components/card.md), [Separator](../components/separator.md) between sections | nested Cards |
| Hierarchical data | [TreeView](../components/tree-view.md) | nested lists you build |
| Scrollable region inside a fixed panel | [ScrollArea](../components/scroll-area.md) | `overflow: auto` with custom scrollbars |
| Media at a fixed ratio | [AspectRatio](../components/aspect-ratio.md) or Image from [Media](../components/media.md) | padding-top hacks |
| Nothing to show yet | [empty-states.md](./empty-states.md) | an empty Table |

## Structure

A content page, top to bottom:

1. Header or NavigationDrawer (see [navigation.md](./navigation.md)).
2. Optional page Banner.
3. Page heading: Breadcrumb, then `Typography variant="title" as="h1"`, then an optional `lead` line, with page actions aligned to the end of the title row.
4. Sections, each with a `heading` (`as="h2"`) and its content.

Spacing: the page is `<Stack as="main" pad="xl" gap="3xl">`; each section is `<Stack as="section" gap="md">` (heading to content); Cards in a grid are `<Grid gap="lg">`; a page header is `<Row justify="between" wrap gap="lg">`.

A settings page (eval t03): one column, sections for Profile, Notifications and Billing, each a heading plus a Fieldset or Card; Switches for notification toggles that save immediately; a Separator between sections.

## Rules

1. Use Stack, Row and Grid for every gap and Box or `pad` for padding, with `--spacing-*` steps. Never put margins on children.
2. Limit reading width for text-heavy pages with a max width on your wrapper. <!-- REVIEW: no max-width token exists; agents will reach for a px value. Consider a container width token. -->
3. Use one `h1` per page and keep heading levels in order.
4. Don't nest Cards inside Cards. Use Separator or headings to divide a Card.
5. Use Table when users compare rows; use Cards when each item is looked at on its own.
6. Put one primary action per section at most.

## Example

```tsx
import { Card, CardContent, CardHeader, CardTitle, Label, Row, Separator, Stack, Switch, Typography } from "@eluan/core";

export function SettingsPage() {
  return (
    <Stack as="main" pad="xl" gap="3xl">
      <Typography variant="title" as="h1">Settings</Typography>

      <Stack as="section" gap="md" aria-labelledby="notifications-heading">
        <Typography variant="heading" as="h2" id="notifications-heading">Notifications</Typography>
        <Card elevation="none">
          <CardHeader>
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack gap="md">
              <Row justify="between">
                <Label htmlFor="product-updates">Product updates</Label>
                <Switch id="product-updates" defaultChecked />
              </Row>
              <Separator />
              <Row justify="between">
                <Label htmlFor="weekly-digest">Weekly digest</Label>
                <Switch id="weekly-digest" />
              </Row>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}
```

## Dos and don'ts

**Do:** pick Table or Card by whether users compare or browse.

**Don't:** build a pricing comparison as three Cards each with a primary Button; give only the recommended plan the primary Button.

**Do:** lay out with Stack, Row and Grid, and wrap them in your own element only for position, overflow or width.

**Don't:** pass `className` or `style` to Card or other components for layout; they're dropped.

## Common agent mistakes

_Filled from evals._
