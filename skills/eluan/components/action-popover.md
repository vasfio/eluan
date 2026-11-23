---
name: ActionPopover
use_when: A table row, list item or card needs a compact "more actions" menu behind a three-dots button.
instead_of: DropdownMenu when you need separators, groups, submenus, checkable items or a custom trigger; inline Buttons for one or two actions; Popover for a panel with form content.
source: packages/core/src/components/action-popover.tsx
---

# ActionPopover

## 1. Overview

ActionPopover is a ready-made overflow menu: an icon-only ghost Button with a horizontal-dots icon that opens a [DropdownMenu](./dropdown-menu.md) built from an `items` array. Despite the name it isn't a [Popover](./popover.md): it imports nothing from Popover and behaves as a menu, with menu roles and arrow-key navigation.

## 2. When to use

- Row-level actions in a [Table](./table.md) or list, where a full set of buttons would crowd the row.
- Overflow actions on a [Card](./card.md).
- Any place a flat list of three to seven actions needs a compact trigger.

<!-- REVIEW: the "three to seven" range is drafted; the docs page only says it's for rows where a full set of items would crowd the row. -->

### When not to use

- Separators, group labels, submenus, checkbox or radio items, shortcuts, or a trigger other than the dots button → use [DropdownMenu](./dropdown-menu.md).
- One or two actions → show them as [Button](./button.md)s in the row.
- A panel with fields or rich content → use [Popover](./popover.md).
- Actions on right-click → use [ContextMenu](./context-menu.md).
- An application menu bar → use [Menubar](./menubar.md).

## 3. Anatomy

1. **Trigger**: a [Button](./button.md) with `variant="ghost"` and `size="icon"`, showing a horizontal-dots icon at `--size-xxs`. Its accessible name comes from the `aria-label` prop.
2. **Menu**: a DropdownMenuContent in a portal, with the menu family's surface and spacing.
3. **Item**: one DropdownMenuItem per entry in `items`: an optional icon in a `--size-xxs` box, then the label. `destructive` items use the destructive tone.

## 4. Variants

No `variant` prop. Each item can set `destructive: true` to use the destructive tone (`--destructive-fg`).

## 5. Sizes

No size prop. The trigger is always Button's `icon` size.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Ghost icon button | |
| Hover | Ghost hover background | From Button. |
| Focus | 1px outline in `--focus-ring`, 1px offset | Never remove or restyle the focus ring. |
| Open | Menu below the trigger, aligned to its end | Trigger has `aria-expanded="true"`. |
| Item highlighted | Item background in `--interactive-bg-hover` | On pointer hover or arrow-key focus. |
| Item disabled | `--interactive-bg-disabled` background, `--interactive-fg-disabled` text | Set `disabled: true`; the item gets `data-disabled`, is skipped by arrow keys and can't be selected. |

## 7. Content guidelines

- Labels start with a verb and name the action: "Edit", "Duplicate", "Download PDF", "Delete".
- Keep the same items in the same order in every row.
- Put destructive items last.
- Sentence case; one to three words.

| Do | Don't |
| --- | --- |
| Delete | Delete this item permanently |
| Download PDF | PDF |
| Duplicate | Make a copy of this invoice |

<!-- REVIEW: content guidance drafted; source shows only sample labels (Edit, Duplicate, Delete, Archive). -->

## 8. Rules

1. Pass an `aria-label` that names the row: "Actions for invoice INV-2041". The default, "Open actions menu", is identical on every row.
2. Give every item an `onClick`. An item without one only closes the menu.
3. Confirm destructive items with a [Dialog](./dialog.md) before running them.
4. When an item opens a Dialog, return focus to the ActionPopover trigger on close: hold a `ref` (it's forwarded to the trigger Button) and focus it in DialogContent's `onCloseAutoFocus`. <!-- REVIEW: composition drafted; ActionPopover forwards its ref to the trigger, and a Dialog with no DialogTrigger has nowhere to return focus. -->
5. Pass Lucide icons with `aria-hidden="true"`. ActionPopover sizes them; don't size them yourself.
6. Use icons on all items or none.
7. Don't wrap ActionPopover in your own trigger or Button. It renders its own.

## 9. Dos and don'ts

**Do:** name the trigger after the row and put the destructive action last.

```tsx
<ActionPopover
  aria-label="Actions for invoice INV-2041"
  items={[
    { label: "Edit", onClick: editInvoice },
    { label: "Download PDF", onClick: downloadInvoice },
    { label: "Delete", destructive: true, onClick: confirmDelete },
  ]}
/>
```

**Don't:** leave the default label on every row, or delete straight from the menu.

```tsx
<ActionPopover
  items={[
    { label: "Delete", destructive: true, onClick: deleteInvoice },
    { label: "Edit", onClick: editInvoice },
  ]}
/>
```

**Do:** switch to DropdownMenu when you need structure.

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button type="button" variant="ghost" size="icon" aria-label="Actions for invoice INV-2041">
      <MoreHorizontal aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onSelect={editInvoice}>Edit</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem tone="destructive" onSelect={confirmDelete}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Don't:** fake a separator or heading with a disabled item.

```tsx
<ActionPopover items={[{ label: "Edit" }, { label: "──────", disabled: true }, { label: "Delete" }]} />
```

## 10. Accessibility

- Role: the trigger is a `button` with `aria-haspopup="menu"` and `aria-expanded`. The menu has role `menu` and each entry is a `menuitem`.
- Label: the trigger's `aria-label` (default "Open actions menu"). Items are named by their `label`.
- Keyboard: Enter, Space or Arrow Down on the trigger opens the menu. Arrow keys move between items, Home and End jump to the ends, typing a letter jumps to a matching item, Enter or Space activates, Escape closes.
- Focus: moves into the menu on open and returns to the trigger on close. Disabled items are skipped.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Placement: below the trigger and aligned to its end by default (`side="bottom"`, `align="end"`), so it opens inward from a row's trailing edge. It flips to stay inside the viewport.
- Overflow and truncation: the menu is at least 8rem wide and grows to fit its longest label. Keep labels short.
- Motion: the menu appears without animation; item highlights fade over 150ms. Don't add your own.
- Portal: the menu mounts in `document.body`. In a scoped theme, pass `portalContainer` to the scoped EluanProvider or wrap the region in `PortalContainerProvider`. See `../foundations/theming.md`.

## 12. API

<!-- api:start -->
### ActionPopover

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `ActionPopoverItem[]` | | Required. The menu entries, in order. |
| `align` | `"start" \| "center" \| "end"` | `"end"` | Alignment of the menu along the trigger. |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Side of the trigger the menu opens on. |
| `aria-label` | `string` | `"Open actions menu"` | Accessible name of the trigger. |
| `ref` | `Ref<HTMLButtonElement>` | | Forwarded to the trigger Button. |

No other props: there's no `className`, `style`, `disabled` or trigger override.

### ActionPopoverItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | | Required. The item text. |
| `icon` | `ReactNode` | | Leading icon, sized to `--size-xxs`. |
| `onClick` | `() => void` | | Runs when the item is chosen by pointer or keyboard. |
| `destructive` | `boolean` | `false` | Uses the destructive tone. |
| `disabled` | `boolean` | `false` | Can't be selected; skipped by arrow keys. |
<!-- api:end -->

## 13. Examples

Row actions for an invoices table, with a confirmation Dialog for Delete that returns focus to the row's trigger.

```tsx
import * as React from "react";
import {
  ActionPopover,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@eluan/core";
import { Copy, Download, Pencil, Trash2 } from "lucide-react";

type Invoice = { id: string; number: string; customer: string };

export function InvoiceRowActions({
  invoice,
  onEdit,
  onDuplicate,
  onDownload,
  onDelete,
}: {
  invoice: Invoice;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <>
      <ActionPopover
        ref={triggerRef}
        aria-label={`Actions for invoice ${invoice.number}`}
        items={[
          { label: "Edit", icon: <Pencil aria-hidden="true" />, onClick: () => onEdit(invoice.id) },
          { label: "Duplicate", icon: <Copy aria-hidden="true" />, onClick: () => onDuplicate(invoice.id) },
          { label: "Download PDF", icon: <Download aria-hidden="true" />, onClick: () => onDownload(invoice.id) },
          {
            label: "Delete",
            icon: <Trash2 aria-hidden="true" />,
            destructive: true,
            onClick: () => setConfirmOpen(true),
          },
        ]}
      />
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          <DialogHeader>
            <DialogTitle>Delete invoice {invoice.number}?</DialogTitle>
            <DialogDescription>
              {invoice.customer} will no longer see this invoice in their portal. You can't undo this.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                onDelete(invoice.id);
                setConfirmOpen(false);
              }}
            >
              Delete invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

## 14. Related components

- [DropdownMenu](./dropdown-menu.md): what ActionPopover is built on; use it directly for anything beyond a flat list.
- [Dialog](./dialog.md): confirm destructive items.
- [Table](./table.md): the usual home for row actions.
- [Popover](./popover.md): unrelated despite the name; a floating panel for content.

## 15. Common agent mistakes

_Filled from evals._
