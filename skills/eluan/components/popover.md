---
name: Popover
use_when: A small interactive panel (a short form, a few options) opens from a control and floats next to it without blocking the page.
instead_of: DropdownMenu or ActionPopover for a list of actions; Tooltip for a text hint; HoverCard for a hover preview; Dialog or Sheet for content that must block the page.
source: packages/core/src/components/popover.tsx
---

# Popover

## 1. Overview

Popover is a non-modal floating panel anchored to its trigger, built on Radix Popover. It portals, opens on click, moves focus inside, and closes on Escape or a click outside. DatePicker, DateTimePicker and MultiSelect use it for their dropdown panels.

## 2. When to use

- A short form tied to one control: rename an item, set dimensions, add a link.
- A small set of options or settings: share settings, column visibility, notification preferences for one item.
- A custom picker anchored to a field, when no Eluan picker fits.

### When not to use

- A list of actions → use [DropdownMenu](./dropdown-menu.md), or [ActionPopover](./action-popover.md) for row actions.
- A short text hint or label → use [Tooltip](./tooltip.md).
- A preview on hover → use [HoverCard](./hover-card.md).
- A decision that must be answered before continuing → use [Dialog](./dialog.md).
- A long form or details → use [Sheet](./sheet.md).
- Picking a date or one of several options → use [DatePicker](./date-picker.md), [Select](./select.md) or [MultiSelect](./multi-select.md).

## 3. Anatomy

1. **Popover**: the root. Holds open state; renders nothing itself.
2. **PopoverTrigger**: the control that toggles the popover. Wrap a Button with `asChild`.
3. **PopoverContent**: the floating panel. Renders in a portal with `--container-bg`, a `--container-border` border, `--curves-md` corners, `--spacing-md` padding, 18rem wide, 4px from the trigger.
4. **Your content**: anything inside PopoverContent. Eluan exports no close, arrow or anchor parts.

## 4. Variants

No `variant` prop. `layout` on PopoverContent changes width and padding:

| Layout | Use for |
| --- | --- |
| `default` | Every popover you build: 18rem wide with padding. |
| `matchTrigger` | A panel as wide as its trigger, with no padding, such as a list under a field. MultiSelect uses it. |
| `calendar` | DatePicker's range calendar: sized to the calendar, no padding. |
| `calendarSingle` | DatePicker's single calendar: as wide as the trigger, never narrower than the calendar. |

Use [DatePicker](./date-picker.md) rather than putting a Calendar in a Popover yourself.

## 5. Sizes

No size prop. The `default` layout is a fixed 18rem; `matchTrigger` and `calendarSingle` follow the trigger's width. <!-- REVIEW: Decide before coding; popover is 18rem and hover-card 16rem, neither from a token, and nothing says why they differ. -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Closed | Only the trigger renders | PopoverContent is unmounted. The trigger has `data-state="closed"`. |
| Open | Panel floats beside the trigger | The page stays usable. |
| Focus | PopoverContent draws no outline | Focus goes to the first control inside, which shows its own ring. Never remove or restyle the focus ring. |

PopoverContent sets its text colour from `--interactive-fg`, where Tooltip and HoverCard use `--container-fg`. They match in the default theme; don't set your own text colour to compensate. <!-- REVIEW: W5, popover is the lone panel using --interactive-fg. -->

## 7. Content guidelines

- One task per popover. Lead with a short heading when it holds a form: "Rename file", "Dimensions".
- Keep it to a few fields or options. If it needs scrolling or sections, use a Sheet.
- Label the trigger with what opens: "Share", "Columns", "Edit link".
- Sentence case.

| Do | Don't |
| --- | --- |
| Rename file | Options |
| Columns | Click to configure |

## 8. Rules

1. Use `PopoverTrigger asChild` around a Button.
2. Give PopoverContent an `aria-label`, or an `aria-labelledby` pointing at its heading. It has the `dialog` role and no name of its own. <!-- REVIEW: drafted; Radix gives the content role="dialog" without a label. -->
3. To close after saving, control it: pass `open` and `onOpenChange` and set `open` to `false`. There's no PopoverClose part.
4. Keep it short. The panel has no maximum height and doesn't scroll.
5. Never use a Popover as an action menu; DropdownMenu brings menu roles and arrow-key navigation.
6. Never pass `className` or `style` to Popover parts; they're dropped. Lay out content with your own wrapper inside PopoverContent.

## 9. Dos and don'ts

**Do:** use a Popover for a short, focused form.

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button type="button" variant="outline">Dimensions</Button>
  </PopoverTrigger>
  <PopoverContent aria-labelledby="dimensions-title">
    <Typography id="dimensions-title" variant="label" as="h2">Dimensions</Typography>
    {/* width and height fields */}
  </PopoverContent>
</Popover>
```

**Don't:** build an action menu out of Buttons in a Popover.

```tsx
<PopoverContent>
  <Button variant="ghost">Edit</Button>
  <Button variant="ghost">Duplicate</Button>
  <Button variant="destructive">Delete</Button>
</PopoverContent>
```

**Do:** use DropdownMenu for actions.

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button type="button" variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={editFile}>Edit</DropdownMenuItem>
    <DropdownMenuItem onSelect={duplicateFile}>Duplicate</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Don't:** resize the panel by styling it.

```tsx
<PopoverContent style={{ width: 600, padding: 0 }}>{/* … */}</PopoverContent>
```

## 10. Accessibility

- Role: `dialog` on PopoverContent. PopoverTrigger gets `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls`.
- Label: none by default; see rule 2.
- Keyboard: Enter or Space on the trigger toggles it. Escape closes it. Tab moves through the content and then out of it.
- Focus: on open, focus moves to the first focusable element inside (or the panel itself). Focus isn't trapped. On close, focus returns to the trigger, unless the user closed it by clicking or tabbing to something outside, in which case focus stays there. With `modal`, focus is trapped and the rest of the page is hidden from assistive technology.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per component. <!-- REVIEW: system-wide focus-ring contrast issue (W1), see foundations/colour.md. -->

## 11. Behaviour

- Placement: below the trigger and centred on it by default (`side="bottom"`, `align="center"`, `sideOffset={4}`). It flips and shifts to stay inside the viewport.
- Overflow and truncation: no maximum height and no scroll. Long content runs off-screen.
- Motion: appears and disappears without animation. Don't add your own.
- Dismissal: Escape, a click outside or a second click on the trigger close it and fire `onOpenChange(false)`.
- Portal: PopoverContent mounts in `document.body`. In a scoped theme, pass `portalContainer` to the scoped EluanProvider or wrap the region in `PortalContainerProvider`; `container` overrides it for one popover. See `../foundations/theming.md`.

## 12. API

<!-- api:start -->
### Popover

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | | Called on every open and close. |
| `modal` | `boolean` | `false` | `true` traps focus and hides the rest of the page from assistive technology. |

### PopoverTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders the child (a Button) instead of a bare `<button>`. |
| `...props` | Radix `Popover.Trigger` props | | Native button attributes. |

### PopoverContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `layout` | `"default" \| "calendar" \| "calendarSingle" \| "matchTrigger"` | `"default"` | Width and padding; see Variants. |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Preferred side of the trigger. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment along that side. |
| `sideOffset` | `number` | `4` | Distance from the trigger in px. |
| `collisionPadding` | `number \| Partial<Record<Side, number>>` | `0` | Space to keep from the viewport edges. |
| `container` | `HTMLElement \| null` | nearest `PortalContainerProvider`, then `document.body` | Element to portal into. |
| `onOpenAutoFocus` | `(event: Event) => void` | | `preventDefault()` to keep focus on the trigger. |
| `onCloseAutoFocus` | `(event: Event) => void` | | `preventDefault()` to stop focus returning to the trigger. |
| `onEscapeKeyDown` | `(event: KeyboardEvent) => void` | | `preventDefault()` keeps it open. |
| `onInteractOutside` | `(event: CustomEvent) => void` | | `preventDefault()` keeps it open on an outside click or focus. |
| `aria-label`, `aria-labelledby` | `string` | | Names the panel. |
| `...props` | Radix `Popover.Content` props without `className`, `style` | | |
<!-- api:end -->

## 13. Examples

A rename popover that closes after saving and returns focus to its trigger.

```tsx
import * as React from "react";
import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from "@eluan/core";
import { Pencil } from "lucide-react";

export function RenameFilePopover({
  fileName,
  onRename,
}: {
  fileName: string;
  onRename: (name: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="sm">
          <Pencil aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
          Rename
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" aria-label={`Rename ${fileName}`}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = String(new FormData(event.currentTarget).get("name")).trim();
            if (name) {
              onRename(name);
              setOpen(false);
            }
          }}
          style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
            <Label htmlFor="rename-file">File name</Label>
            <Input id="rename-file" name="name" defaultValue={fileName} required />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--spacing-sm)" }}>
            <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
```

## 14. Related components

- [DropdownMenu](./dropdown-menu.md) and [ActionPopover](./action-popover.md): menus of actions.
- [HoverCard](./hover-card.md): a read-only preview on hover.
- [Tooltip](./tooltip.md): a short text hint.
- [DatePicker](./date-picker.md) and [MultiSelect](./multi-select.md): built on Popover.
- [Sheet](./sheet.md): when the content outgrows a popover.

## 15. Common agent mistakes

_Filled from evals._
