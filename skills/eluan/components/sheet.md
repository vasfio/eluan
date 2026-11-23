---
name: Sheet
use_when: Secondary content or a longer task (edit a record, filters, details) opens in a modal panel from the edge of the screen.
instead_of: Drawer for a non-modal panel that pushes the page; Dialog for a short confirmation; Popover, HoverCard or Tooltip for small content anchored to a control.
source: packages/core/src/components/sheet.tsx
---

# Sheet

## 1. Overview

Sheet is a modal panel that slides in from one edge of the screen. It's built on Radix Dialog, so it behaves like [Dialog](./dialog.md): it portals, covers the page with a scrim, traps focus, has a built-in close button and returns focus to its trigger. Use it when the content needs more room than a Dialog, and the page can wait until the user is done.

## 2. When to use

- Editing a record without leaving the list: customer details, a ticket, a product.
- A filter panel for a table or search results.
- Detail or help content that's too long for a Popover.
- A mobile navigation menu (Header and NavigationDrawer already use Sheet for this).

### When not to use

- The user must keep working in the page while the panel is open → use [Drawer](./drawer.md).
- A short confirmation or decision → use [Dialog](./dialog.md).
- A small panel anchored to the control that opened it → use [Popover](./popover.md).
- A preview on hover → use [HoverCard](./hover-card.md); a short label → use [Tooltip](./tooltip.md).
- Content revealed in place in the page flow → use [Collapsible](./collapsible.md) or [Accordion](./accordion.md).
- App navigation with a persistent sidebar → use [NavigationDrawer](./navigation-drawer.md), which switches to a Sheet on mobile for you.

### Choosing a surface for more content

| You need to show… | Use | Because |
| --- | --- | --- |
| A long form, record details or filters; the page can wait | Sheet | Modal: scrim, focus trap, close button, slides in from any edge. |
| A panel the user works beside, with the page still usable | [Drawer](./drawer.md) | Inline: pushes the page content aside; no scrim, no focus trap, no portal. Left or right only. |
| A short question that must be answered first | [Dialog](./dialog.md) | Modal and centred, up to 32rem wide. |
| A small form or set of options tied to one control | [Popover](./popover.md) | Non-modal, anchored to its trigger; Escape or a click outside closes it. |
| A preview of a linked item, for pointer users | [HoverCard](./hover-card.md) | Opens on hover or focus; its content can't be reached by keyboard and it never opens on touch. |
| A short text hint for a control | [Tooltip](./tooltip.md) | Text only; describes the control, never names it; never opens on touch. |
| Extra detail in the page flow | [Collapsible](./collapsible.md) or [Accordion](./accordion.md) | Expands in place; nothing floats. |

<!-- REVIEW: the "You need to show" situations are drafted; the "Because" facts come from each component's source. -->

## 3. Anatomy

1. **Sheet**: the root. Holds open state; renders nothing itself.
2. **SheetTrigger**: opens the sheet. Wrap a Button with `asChild`. Focus returns here on close.
3. **SheetContent**: the panel. Renders the portal, the scrim (`--overlay-bg` at 80% opacity) and the panel (`--container-bg`, a `--container-border` edge on the inner side, `--spacing-lg` padding, `--spacing-md` gap between children). Adds a close button (X icon, "Close" for screen readers) in the top-right corner, first in the DOM.
4. **SheetHeader**: a column holding the title and description, `--spacing-xs` apart.
5. **SheetTitle**: required. Renders an `h2` and names the sheet.
6. **SheetDescription**: a `p` in `--font-size-sm` that describes the sheet to screen readers.
7. **Body**: your content.
8. **SheetFooter**: the button row.
9. **SheetClose**: closes the sheet. Wrap the Cancel Button with `asChild`.
10. **SheetOverlay**, **SheetPortal**: exported, but SheetContent already renders both. Don't add them yourself.

## 4. Variants

No `variant` prop. `side` on SheetContent picks the edge:

| Side | Use for |
| --- | --- |
| `right` (default) | Editing and detail panels. |
| `left` | Navigation, or panels tied to content on the left. |
| `bottom` | Short sets of options on small screens, such as share targets. |
| `top` | Rarely; content that drops from a top toolbar. |

<!-- REVIEW: "Use for" is drafted; source gives no per-side guidance. -->

`layout` on SheetContent exists for Eluan's own components:

| Layout | Use for |
| --- | --- |
| `default` | Every sheet you build. |
| `headerNavigation` | Header's mobile menu. Fixed widths and a different border token. <!-- REVIEW: W5; this layout overrides the border to --container-border-alt, unlike every other sheet. --> |
| `navigationDrawer` | NavigationDrawer's mobile menu. No padding, fixed width. |

## 5. Sizes

No size prop. `left` and `right` sheets are full height and 75% of the viewport wide, up to 24rem from 640px. `top` and `bottom` sheets are full width and as tall as their content.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Closed | Only the trigger renders | SheetContent is unmounted. |
| Open | Scrim over the page; panel against its edge | The page behind is inert: hidden from screen readers, not clickable, not scrollable. |
| Hover (close button) | Close icon goes from 70% to full opacity | No background change. <!-- REVIEW: W3; sheet.tsx puts a [data-state=open] rule on the close button, which Radix's Close never carries, so it never applies. --> |
| Focus (close button) | 1px outline in `--focus-ring`, 1px offset | Never remove or restyle the focus ring. |

SheetTitle uses `--interactive-fg` and SheetDescription `--interactive-fg-alt`, where Drawer uses the `--container-*` pair and Dialog's title inherits. They match in the default theme; don't recolour them. <!-- REVIEW: W5, three title colours for one slot across dialog, sheet and drawer. -->

## 7. Content guidelines

- Title: name the object or the task: "Edit customer", "Filters", "Invoice INV-2041".
- Description: one sentence on what the sheet is for, or leave it out and pass `aria-describedby={undefined}`.
- Footer: the primary action names the result ("Save changes", "Apply filters"); the dismiss action is "Cancel".
- Sentence case everywhere.

| Do | Don't |
| --- | --- |
| Edit customer | Customer Editor |
| Apply filters | Submit |
| Cancel | Close window |

## 8. Rules

1. Always render a SheetTitle. Radix logs an error without one.
2. Render a SheetDescription, or pass `aria-describedby={undefined}` to SheetContent.
3. Open the sheet from a `SheetTrigger asChild` wrapping a Button, so focus returns to it on close.
4. Put Cancel in `SheetClose asChild` and the primary action last in SheetFooter.
5. Use `layout="default"`. The other layouts belong to Header and NavigationDrawer. <!-- REVIEW: drafted from where the layouts are used; source doesn't restrict them. -->
6. Use Drawer, not Sheet, when the user must interact with the page while the panel is open.
7. Never pass `className` or `style` to any Sheet part; they're dropped. Lay out the body with your own wrapper element.

## 9. Dos and don'ts

**Do:** title the sheet and pair a Cancel with one primary action.

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button type="button" variant="outline">Filters</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Filters</SheetTitle>
      <SheetDescription>Narrow the order list by status and date.</SheetDescription>
    </SheetHeader>
    {/* filter fields */}
    <SheetFooter>
      <SheetClose asChild>
        <Button type="button" variant="outline">Cancel</Button>
      </SheetClose>
      <Button type="button" onClick={applyFilters}>Apply filters</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

**Don't:** build a slide-in panel from a fixed `div`, or leave the sheet untitled.

```tsx
<div style={{ position: "fixed", right: 0, top: 0, height: "100vh", width: 400 }}>
  {/* filter fields */}
</div>

<SheetContent>
  {/* filter fields, no SheetTitle */}
</SheetContent>
```

**Do:** use Drawer when the panel sits beside work the user is still doing.

```tsx
<Drawer>
  <DrawerLayout>
    <main style={{ flex: 1, minWidth: 0 }}>{/* the table being edited */}</main>
    <DrawerContent side="right">{/* properties of the selected row */}</DrawerContent>
  </DrawerLayout>
</Drawer>
```

**Don't:** use a Sheet for an inspector the user must keep open while clicking rows in the page; the scrim blocks the page.

```tsx
<Sheet modal={false}>
  <SheetContent>{/* properties of the selected row */}</SheetContent>
</Sheet>
```

## 10. Accessibility

- Role: `dialog` on SheetContent. SheetTrigger gets `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls`.
- Label: SheetTitle names the sheet (`aria-labelledby`); SheetDescription describes it (`aria-describedby`). The close button's name is "Close".
- Keyboard: Escape closes. Tab and Shift+Tab cycle through the sheet's controls and wrap at the ends. Enter and Space activate buttons.
- Focus: on open, focus moves to the first focusable element, which is the close button (it's first in the DOM). Focus is trapped while open and returns to SheetTrigger on close. Everything outside is hidden from assistive technology and blocked from pointer input.
- Contrast: handled by the theme. Don't override colours.
- The built-in close button is a `--size-xxs` icon with no padding, a small pointer target. Keep a Cancel or Close Button in SheetFooter. <!-- REVIEW: W3 records this hit target for dialog.tsx; sheet.tsx has the same close button styles. -->

## 11. Behaviour

- Responsive: `left` and `right` sheets take 75% of the width on small screens and stop at 24rem from 640px. Below 640px the header centres its text and the footer stacks its buttons with the last one on top.
- Overflow and truncation: the panel doesn't scroll. Content taller than the viewport is cut off at the bottom edge. Keep left and right sheets to what fits, or wrap the body in a [ScrollArea](./scroll-area.md) with a bounded height. <!-- REVIEW: sheet.tsx sets no overflow on the panel; scroll composition drafted. Not in the fix plan. -->
- Motion: the panel slides in from its edge and the scrim fades in over 300ms, and both reverse on close. Under `prefers-reduced-motion: reduce` the animation is near instant. Don't add your own.
- Dismissal: Escape, a click on the scrim, the close button or a SheetClose all close it and fire `onOpenChange(false)`.
- Portal: SheetContent mounts in `document.body`. In a scoped theme, pass `portalContainer` to the scoped EluanProvider or wrap the region in `PortalContainerProvider`; `container` overrides it for one sheet. See `../foundations/theming.md`.

## 12. API

<!-- api:start -->
### Sheet

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | | Called on every open and close. |
| `modal` | `boolean` | `true` | `false` removes the scrim, focus trap and scroll lock. Use Drawer instead. |

### SheetTrigger, SheetClose

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders the child (a Button) instead of a bare `<button type="button">`. |
| `...props` | Radix `Dialog.Trigger` / `Dialog.Close` props | | Native button attributes. |

### SheetContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"right"` | Edge the sheet slides in from. |
| `layout` | `"default" \| "headerNavigation" \| "navigationDrawer"` | `"default"` | Panel layout; the other two are for Header and NavigationDrawer. |
| `container` | `HTMLElement \| null` | nearest `PortalContainerProvider`, then `document.body` | Element to portal into. |
| `onOpenAutoFocus` | `(event: Event) => void` | | `preventDefault()` and focus another element to change where focus lands. |
| `onCloseAutoFocus` | `(event: Event) => void` | | `preventDefault()` and focus the opener when there's no SheetTrigger. |
| `onEscapeKeyDown` | `(event: KeyboardEvent) => void` | | `preventDefault()` keeps the sheet open. |
| `onPointerDownOutside` | `(event: CustomEvent) => void` | | `preventDefault()` keeps the sheet open on a scrim click. |
| `aria-describedby` | `string \| undefined` | SheetDescription's id | Pass `undefined` when there's no description. |
| `...props` | Radix `Dialog.Content` props without `className`, `style` | | |

### SheetHeader, SheetFooter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | Layout wrappers. |

### SheetTitle, SheetDescription

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders the child element instead of the `h2` / `p`. |
| `...props` | Radix `Dialog.Title` / `Dialog.Description` props without `className`, `style` | | |

### SheetOverlay, SheetPortal

Rendered by SheetContent. Radix `Dialog.Overlay` (without `className`, `style`) and `Dialog.Portal` props.
<!-- api:end -->

## 13. Examples

An edit panel for a row in a customer list. The form lives in the body; the footer's submit button points at it with `form`.

```tsx
import {
  Button,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@eluan/core";

type Customer = { id: string; name: string; email: string };

export function EditCustomerSheet({
  customer,
  onSave,
}: {
  customer: Customer;
  onSave: (values: { name: string; email: string }) => void;
}) {
  const formId = `edit-customer-${customer.id}`;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="ghost" size="sm">
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit customer</SheetTitle>
          <SheetDescription>Changes apply to all open invoices for {customer.name}.</SheetDescription>
        </SheetHeader>
        <form
          id={formId}
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            onSave({ name: String(data.get("name")), email: String(data.get("email")) });
          }}
          style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
            <Label htmlFor={`${formId}-name`} required>
              Name
            </Label>
            <Input id={`${formId}-name`} name="name" defaultValue={customer.name} required />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
            <Label htmlFor={`${formId}-email`} required>
              Billing email
            </Label>
            <Input id={`${formId}-email`} name="email" type="email" defaultValue={customer.email} required />
          </div>
        </form>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </SheetClose>
          <Button type="submit" form={formId}>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

## 14. Related components

- [Dialog](./dialog.md): the same primitive, centred, for short decisions.
- [Drawer](./drawer.md): a non-modal side panel that pushes the page instead of covering it.
- [NavigationDrawer](./navigation-drawer.md) and [Header](./header.md): use Sheet for their mobile menus.
- [Popover](./popover.md): small anchored content.
- [ScrollArea](./scroll-area.md): scroll long sheet content.

## 15. Common agent mistakes

_Filled from evals._
