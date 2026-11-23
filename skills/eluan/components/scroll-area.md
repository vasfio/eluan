---
name: ScrollArea
use_when: A bounded box needs its own scrolling region with themed scrollbars, such as a long list in a fixed-height panel.
instead_of: Letting the page scroll for page-length content; Accordion or Collapsible to shorten secondary content; the built-in scrolling of Command lists and Select menus.
source: packages/core/src/components/scroll-area.tsx
---

# ScrollArea

## 1. Overview

ScrollArea is a scroll container with themed scrollbars. It wraps Radix Scroll Area: native scrolling stays (wheel, touch, keyboard), and the browser's scrollbars are replaced with a thin pill thumb. It fills its parent, so the parent must have a bounded height or width. It renders one vertical scrollbar; add `ScrollBar orientation="horizontal"` as a child for horizontal scrolling.

## 2. When to use

- A long list inside a fixed-height panel, sidebar section or popover body: activity feeds, tag lists, file lists.
- A horizontal row of cards or chips that's wider than its container.
- Content that scrolls in both directions inside a fixed box (add the horizontal ScrollBar).

### When not to use

- Page-length content → let the document scroll; don't wrap the page in a ScrollArea. <!-- REVIEW: drafted; source doesn't say. -->
- Secondary content you could collapse instead → use [Accordion](./accordion.md) or [Collapsible](./collapsible.md).
- A searchable list of options → use [Command](./command.md); its list already scrolls.
- A long option list in a field → use [Select](./select.md); its menu has its own viewport and scroll buttons.
- Sidebar navigation → use [NavigationDrawer](./navigation-drawer.md); its content area already scrolls.
- Tabular data → use [Table](./table.md).

## 3. Anatomy

1. **Root**: the Radix Scroll Area root, sized to fill its parent (`height` and `width` 100%), with hidden overflow. Your props go here.
2. **Viewport**: the native scrolling element. Your children render inside it.
3. **Vertical scrollbar**: always rendered by ScrollArea. A track of `--spacing-sm` + `--spacing-xxs` width holding the thumb.
4. **Thumb**: a pill (`--radius-radius-full`) in `--interactive-border-alt`. Drag it with a pointer.
5. **Horizontal scrollbar** (optional): add `<ScrollBar orientation="horizontal" />` as the last child.
6. **Corner**: the square where both scrollbars meet. Rendered automatically.

## 4. Variants

ScrollArea has no variant prop. Radix's `type` prop controls when the scrollbars show.

| `type` | Use for |
| --- | --- |
| `hover` (Radix default) | Most cases. Scrollbars appear while the pointer is over the area or while scrolling. |
| `scroll` | Quiet surfaces. Scrollbars appear only while scrolling. |
| `auto` | Scrollbars show whenever the content overflows. |
| `always` | Scrollbars always show, so the region visibly reads as scrollable. |

<!-- REVIEW: `type` values come from Radix Scroll Area; Eluan's source, stories and docs never set it, so the "Use for" text is drafted. -->

## 5. Sizes

ScrollArea has no size prop. It takes the size of its parent. The scrollbar width follows `--spacing-sm` + `--spacing-xxs`, so it narrows in compact density and widens in wide.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Content clipped to the box; scrollbars per `type` | Without a bounded parent the box grows with its content and never scrolls. |
| Scrolling | Thumb visible in `--interactive-border-alt` | Radix sets `data-state="visible"` on the scrollbar. |
| No overflow | No scrollbar | Radix hides the scrollbar when content fits, except with `type="always"`. |

## 7. Content guidelines

- Keep the heading or label for the region outside the ScrollArea, so it stays visible while the content scrolls. <!-- REVIEW: drafted; the stories put the heading inside. -->
- Pad content with a wrapper inside the ScrollArea (`padding: var(--spacing-md)`, as the stories do), not on the bounded parent, so the scrollbar sits at the edge.
- For a horizontal row, give the content wrapper `display: flex` and `width: max-content`, and stop its items from shrinking.

## 8. Rules

1. Give ScrollArea a bounded parent: a wrapper with a fixed `height` (or `width` for horizontal), or a flex item with `flex: 1` and `minHeight: 0` inside a parent of fixed height. `maxHeight` alone doesn't work.
2. Add horizontal scrolling with `<ScrollBar orientation="horizontal" />` as the last child of ScrollArea. Don't add a second vertical ScrollBar; one is built in.
3. Put borders, radius and background on the wrapper you own. ScrollArea drops `className` and `style`.
4. Don't wrap components that already scroll: Command lists, Select menus, NavigationDrawer content.
5. When the content has no focusable elements, make it reachable by keyboard: wrap it in a `<div tabIndex={0} role="region" aria-label="…">` inside the ScrollArea. <!-- REVIEW: drafted. Radix doesn't make the viewport focusable and ScrollArea passes props to the root, not the viewport. -->

## 9. Dos and don'ts

**Do:** bound the parent and style it yourself.

```tsx
<div style={{ height: "40dvh", borderWidth: 1, borderStyle: "solid", borderColor: "var(--container-border)", borderRadius: "var(--curves-md)", overflow: "hidden" }}>
  <ScrollArea>
    <div style={{ padding: "var(--spacing-md)" }}>{tagList}</div>
  </ScrollArea>
</div>
```

**Don't:** leave the height unbounded or try to size the component directly.

```tsx
<ScrollArea style={{ height: 300 }}>
  <div>{tagList}</div>
</ScrollArea>
```

**Do:** add the horizontal scrollbar as a child.

```tsx
<div style={{ width: "100%" }}>
  <ScrollArea>
    <div style={{ display: "flex", width: "max-content", gap: "var(--spacing-md)", padding: "var(--spacing-md)" }}>
      {cards}
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</div>
```

**Don't:** set `overflow` on your content and expect ScrollArea's scrollbars.

```tsx
<ScrollArea>
  <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>{cards}</div>
</ScrollArea>
```

## 10. Accessibility

- Role: none. The root and viewport are plain `<div>`s. Add `role="region"` and an `aria-label` on an inner wrapper when the region needs a name.
- Label: none built in.
- Keyboard: arrow keys, Page Up, Page Down, Home, End and Space scroll the viewport when focus is inside it. Tab moves through focusable content in DOM order. Scrollbar thumbs are pointer-only.
- Focus: ScrollArea adds no focus stop and doesn't trap focus. See Rule 5 for content with nothing focusable.
- Contrast: handled by the theme. Don't override colours. The thumb uses `--interactive-border-alt`.

## 11. Behaviour

- Responsive: fills its parent in both directions; resize the parent, not the ScrollArea.
- Overflow and truncation: content wider or taller than the box is clipped and scrolls. Without a horizontal ScrollBar, horizontal overflow stays clipped.
- Motion: scrollbars appear and hide per `type` (Radix, `scrollHideDelay` 600ms by default), with no animation. Don't add your own.
- Right-to-left: pass `dir="rtl"` to move the vertical scrollbar to the left.

## 12. API

<!-- api:start -->
### ScrollArea

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | | Content, rendered inside the viewport. Add `<ScrollBar orientation="horizontal" />` here for horizontal scrolling. |
| `type` | `"auto" \| "always" \| "scroll" \| "hover"` | `"hover"` | When the scrollbars show (Radix). |
| `scrollHideDelay` | `number` | `600` | Milliseconds before scrollbars hide, for `hover` and `scroll` (Radix). |
| `dir` | `"ltr" \| "rtl"` | | Reading direction; moves the vertical scrollbar (Radix). |
| `...props` | Radix `ScrollArea.Root` props without `className`, `style` | | Applied to the root: `id`, `aria-*`, `data-*`. `className` and `style` are omitted. |

### ScrollBar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Which scrollbar. ScrollArea already renders the vertical one. |
| `forceMount` | `true` | | Keeps the scrollbar mounted when hidden (Radix). |
| `...props` | Radix `ScrollArea.Scrollbar` props without `className`, `style` | | `className` and `style` are omitted. |
<!-- api:end -->

## 13. Examples

```tsx
import { ScrollArea, Separator, Typography } from "@eluan/core";

const activity = [
  { id: "evt-2041", who: "Priya Raman", what: "approved invoice INV-2041", when: "2 minutes ago" },
  { id: "evt-2040", who: "Tomás Ortega", what: "added 3 seats to the Design team", when: "18 minutes ago" },
  { id: "evt-2039", who: "Mei Lin", what: "exported the Q3 revenue report", when: "1 hour ago" },
  { id: "evt-2038", who: "Jonah Adeyemi", what: "changed the billing email", when: "Yesterday" },
];

export function ActivitySidebar() {
  return (
    <aside style={{ display: "flex", flexDirection: "column", height: "100dvh", gap: "var(--spacing-md)" }}>
      <div style={{ paddingInline: "var(--spacing-md)", paddingTop: "var(--spacing-md)" }}>
        <Typography variant="subheading" as="h2">Recent activity</Typography>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ScrollArea type="auto">
          <div tabIndex={0} role="region" aria-label="Recent activity" style={{ padding: "var(--spacing-md)" }}>
            <ul style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)", listStyle: "none", margin: 0, padding: 0 }}>
              {activity.map((event, index) => (
                <li key={event.id} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
                  {index > 0 && <Separator />}
                  <Typography>
                    {event.who} {event.what}
                  </Typography>
                  <Typography variant="caption" tone="muted">{event.when}</Typography>
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
```

## 14. Related components

- [Separator](./separator.md): divides rows inside a scrolling list.
- [Command](./command.md): a filterable list that scrolls on its own.
- [Accordion](./accordion.md): shortens long secondary content instead of scrolling it.
- [NavigationDrawer](./navigation-drawer.md): its content area already scrolls; don't wrap it.
- [Table](./table.md): for tabular data.

## 15. Common agent mistakes

_Filled from evals._
