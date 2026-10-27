---
name: Drawer
use_when: A side panel opens beside the main content and pushes it aside, so the user can keep working in the page while it's open.
instead_of: Sheet for a modal panel that covers the page (and on small screens); NavigationDrawer for app navigation; Popover for small anchored content.
source: packages/core/src/components/drawer.tsx
---

# Drawer

## 1. Overview

Drawer is an inline side panel that lives in the page layout. Inside a `DrawerLayout` row, opening it widens the panel from zero to its full width and the main content shrinks to make room; closing it gives the space back. It isn't a Sheet variant: it isn't built on Radix Dialog or any other overlay primitive, and has no scrim, no portal, no focus trap and no built-in close button.

## 2. When to use

- An inspector or properties panel for the item selected in the main content.
- Filters the user tweaks while watching the results update.
- Settings or detail views where the page must stay visible and usable.

### When not to use

- The panel should block the page until the user is done, or the screen is narrow → use [Sheet](./sheet.md).
- App-level navigation with a collapsible sidebar → use [NavigationDrawer](./navigation-drawer.md).
- A short confirmation → use [Dialog](./dialog.md).
- A small panel anchored to one control → use [Popover](./popover.md).
- Extra detail revealed in the page flow → use [Collapsible](./collapsible.md) or [Accordion](./accordion.md).

### Sheet or Drawer

| | Drawer | [Sheet](./sheet.md) |
| --- | --- | --- |
| Built on | Its own React context | Radix Dialog |
| Position | In the layout, next to the main content | Fixed over the page, from an edge |
| Page while open | Usable; it shrinks to make room | Covered by a scrim and inert |
| Sides | `left`, `right` | `top`, `right`, `bottom`, `left` |
| Focus | Stays where it was; no trap | Moves in and is trapped |
| Close button | None; add a DrawerClose | Built in |
| Mounted when closed | Yes, collapsed and hidden | No |

## 3. Anatomy

1. **Drawer**: the root. Holds open state; renders nothing itself.
2. **DrawerLayout**: a flex row, full width and height of its parent, holding the main content and the panel.
3. **Main content**: your own element next to the panel. Give it `flex: 1` and `minWidth: 0` so it shrinks.
4. **DrawerTrigger**: a button that toggles the panel open and closed. Wrap a Button with `asChild`.
5. **DrawerContent**: the panel. `--container-bg`, a `--container-border` line on its inner edge, 320px wide by default, full height, clipped.
6. **DrawerHeader**: a column holding the title and description, `--spacing-md` padding, `--spacing-xs` gap.
7. **DrawerTitle**: an `h2` in `--font-size-lg`, weight 600, `--container-fg`.
8. **DrawerDescription**: a `p` in `--font-size-sm`, `--container-fg-alt`.
9. **Body**: your content between header and footer. DrawerContent adds no padding; add your own.
10. **DrawerFooter**: a column pinned to the bottom of the panel, `--spacing-md` padding, `--spacing-xs` gap.
11. **DrawerClose**: a button that closes the panel. Wrap a Button with `asChild`.

## 4. Variants

No `variant` prop. `side` on DrawerContent puts the panel on the `right` (default) or `left` of the main content.

## 5. Sizes

No size prop. `width` on DrawerContent sets the open width: 320px by default, a number is read as px, a string is used as written. Keep the default unless the content needs a different width. <!-- REVIEW: the width prop takes raw lengths, which the router's "no raw px or rem" rule forbids elsewhere; no width tokens exist. -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Closed | Zero width, no border | Contents stay mounted but hidden and `aria-hidden`, so they're out of the tab order. |
| Open | Panel at full width beside the main content | DrawerTrigger has `aria-expanded="true"`. |
| Focus | Drawer draws no focus styles | Its Button trigger and controls bring their own. Never remove or restyle the focus ring. |

DrawerTitle and DrawerDescription use the `--container-*` pair, where Sheet uses `--interactive-*` and Dialog's title inherits. They match in the default theme; don't recolour them. <!-- REVIEW: W5, three title colours for one slot across dialog, sheet and drawer. -->

## 7. Content guidelines

- Title: name the panel's subject: "Order details", "Filters", "Layer properties".
- Description: one short line, or leave it out.
- Footer: the main action first and Close or Cancel after it, as the stacked buttons in the stories do.
- Sentence case.

| Do | Don't |
| --- | --- |
| Order details | Details Panel |
| Close | X |

## 8. Rules

1. Put DrawerLayout inside an element with a set height; DrawerLayout fills its parent.
2. Give the main content `flex: 1` and `minWidth: 0`.
3. Use `DrawerTrigger asChild` and `DrawerClose asChild` around Buttons. Without `asChild` they render unstyled native buttons.
4. Always put a DrawerClose inside the panel. Drawer has no close button of its own.
5. Match DOM order to what users see: a `left` panel before the main content, a `right` panel after it. The panel moves visually with CSS `order`, but Tab follows the DOM. <!-- REVIEW: drafted from drawer.tsx's order rules and the stories' markup. -->
6. Pad the body yourself with a wrapper, using `--spacing-md` to line up with the header and footer.
7. Don't use Drawer for flows that must block the page. Use Sheet.
8. Never pass `className` or `style` to any Drawer part; they're dropped.

## 9. Dos and don'ts

**Do:** compose the layout so the panel pushes the main content.

```tsx
<Drawer>
  <DrawerLayout>
    <main style={{ flex: 1, minWidth: 0, padding: "var(--spacing-xl)" }}>
      <DrawerTrigger asChild>
        <Button type="button" variant="outline">Filters</Button>
      </DrawerTrigger>
    </main>
    <DrawerContent side="right">{/* filters */}</DrawerContent>
  </DrawerLayout>
</Drawer>
```

**Don't:** render DrawerContent outside DrawerLayout or float it over the page.

```tsx
<Drawer>
  <DrawerTrigger>Filters</DrawerTrigger>
  <div style={{ position: "fixed", right: 0, top: 0 }}>
    <DrawerContent>{/* filters */}</DrawerContent>
  </div>
</Drawer>
```

**Do:** give the panel a way to close from inside.

```tsx
<DrawerFooter>
  <Button type="button" fullWidth onClick={applyFilters}>Apply filters</Button>
  <DrawerClose asChild>
    <Button type="button" variant="ghost" fullWidth>Close</Button>
  </DrawerClose>
</DrawerFooter>
```

**Don't:** expect Drawer to add a close button like Sheet does.

```tsx
<DrawerContent>
  <DrawerHeader>
    <DrawerTitle>Filters</DrawerTitle>
  </DrawerHeader>
  {/* filters, and no DrawerClose anywhere */}
</DrawerContent>
```

## 10. Accessibility

- Role: DrawerContent is a plain `div` with no role. Give it `role="region"` and `aria-labelledby` pointing at the DrawerTitle's `id`, so it's announced as a named landmark.
- Label: DrawerTrigger gets `aria-expanded` but no `aria-controls`; pass `aria-controls` with the DrawerContent's `id`. <!-- REVIEW: role, name and aria-controls guidance drafted; drawer.tsx forwards these props but sets none of them itself. -->
- Keyboard: Enter and Space on DrawerTrigger toggle the panel. Escape anywhere in the document closes an open drawer.
- Focus: opening doesn't move focus; the user tabs into the panel. Focus isn't trapped. When the panel closes with focus inside it, focus returns to the element that had focus before it opened. A closed panel's contents can't receive focus.
- Escape also closes the drawer when it was meant for something else: closing a Select, Popover or Dialog with Escape collapses an open drawer at the same time. <!-- REVIEW: source issue not in the fix plan; drawer.tsx's document keydown listener doesn't check whether another layer already handled Escape. -->
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per component. <!-- REVIEW: system-wide focus-ring contrast issue (W1), see foundations/colour.md. -->

## 11. Behaviour

- Responsive: no breakpoint behaviour. The drawer stays inline at every width and never becomes an overlay. On narrow screens, use a [Sheet](./sheet.md) instead. <!-- REVIEW: the docs site says the drawer overlays below 1024px; drawer.tsx has no such code. -->
- Overflow and truncation: the panel clips its content and the inner column is fixed to the panel width. Long content doesn't scroll; wrap the body in a [ScrollArea](./scroll-area.md). <!-- REVIEW: scroll composition drafted; drawer.tsx sets overflow hidden and no scroll region. -->
- Motion: the panel's width animates over 300ms. The transition isn't reduced for `prefers-reduced-motion`. Don't add your own. <!-- REVIEW: drawer.tsx doesn't gate this width transition on reduced motion. -->
- Controlled or uncontrolled: pass `open` and `onOpenChange` to control it, or `defaultOpen` to start open.

## 12. API

<!-- api:start -->
### Drawer

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | | Called when the trigger, a DrawerClose or Escape changes the state. |
| `children` | `ReactNode` | | DrawerLayout, or the trigger and content. |

### DrawerLayout, DrawerHeader, DrawerFooter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | Layout wrappers. |

### DrawerTrigger, DrawerClose

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders the child (a Button) instead of a bare `<button type="button">`. |
| `...props` | `ButtonHTMLAttributes` without `className`, `style` | | `onClick` runs after the state change. DrawerTrigger toggles; DrawerClose only closes. |

### DrawerContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"left" \| "right"` | `"right"` | Which side of the main content the panel sits on. |
| `width` | `number \| string` | `320` (px) | Open width. Numbers are px; strings are used as written. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | `id`, `role`, `aria-labelledby`. |

### DrawerTitle

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLHeadingElement>` without `className`, `style` | | Renders an `h2`. |

### DrawerDescription

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLParagraphElement>` without `className`, `style` | | Renders a `p`. |
<!-- api:end -->

## 13. Examples

An order details panel beside an orders list. Place it inside a region with a set height, such as your app shell's content area.

```tsx
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerLayout,
  DrawerTitle,
  DrawerTrigger,
  Typography,
} from "@eluan/core";
import { PanelRight } from "lucide-react";

export function OrdersWithDetails({ orderNumber }: { orderNumber: string }) {
  return (
    <Drawer>
      <DrawerLayout>
        <main
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-lg)",
            padding: "var(--spacing-xl)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="title" as="h1">
              Orders
            </Typography>
            <DrawerTrigger asChild aria-controls="order-details">
              <Button type="button" variant="outline">
                <PanelRight aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
                Details
              </Button>
            </DrawerTrigger>
          </div>
          {/* orders table */}
        </main>

        <DrawerContent side="right" id="order-details" role="region" aria-labelledby="order-details-title">
          <DrawerHeader>
            <DrawerTitle id="order-details-title">Order {orderNumber}</DrawerTitle>
            <DrawerDescription>Placed 12 March, paid by card.</DrawerDescription>
          </DrawerHeader>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)", padding: "var(--spacing-md)" }}>
            <Typography variant="label" tone="muted">
              Shipping to
            </Typography>
            <Typography variant="body">Maya Chen, 14 Harbour Street, Leith</Typography>
          </div>
          <DrawerFooter>
            <Button type="button" fullWidth>
              Print packing slip
            </Button>
            <DrawerClose asChild>
              <Button type="button" variant="ghost" fullWidth>
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </DrawerLayout>
    </Drawer>
  );
}
```

## 14. Related components

- [Sheet](./sheet.md): the modal alternative that covers the page.
- [NavigationDrawer](./navigation-drawer.md): a navigation sidebar with its own collapse behaviour.
- [ScrollArea](./scroll-area.md): scroll long panel content.
- [Button](./button.md): the trigger and footer actions.

## 15. Common agent mistakes

_Filled from evals._
