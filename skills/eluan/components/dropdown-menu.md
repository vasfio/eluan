---
name: DropdownMenu
use_when: A button opens a short list of actions or view settings, such as a table row's actions menu or an account menu.
instead_of: Select to pick a form value; ActionPopover for a plain icon-only list of actions; ContextMenu for right-click; Menubar for an app-wide File/Edit bar.
source: packages/core/src/components/dropdown-menu.tsx
---

# DropdownMenu

## 1. Overview

DropdownMenu opens a floating list of actions from a trigger. It wraps Radix DropdownMenu: the panel portals out of the page, and it supports plain items (with a destructive tone), checkbox and radio items, labels, separators, shortcut hints and submenus. This file is also the chooser for every "menu of actions" task: start with the table below.

## 2. When to use

- A table row's actions (Edit, Duplicate, Delete) behind a ghost icon Button labelled for that row.
- An account or workspace menu in a header: Profile, Billing, Sign out.
- A split of related secondary actions behind one button: Export as CSV, Export as PDF.
- View settings that apply at once and stay visible as checked state: show columns, sort order, density.

### Choosing a menu

Menus run actions. Pickers choose a value. Pick by what happens when the user chooses an option.

| You need… | Use |
| --- | --- |
| A button that opens actions, with groups, labels, shortcuts, submenus or checkable items | DropdownMenu |
| An icon-only "…" button with a flat list of actions (label, icon, destructive, disabled) and nothing else | [ActionPopover](./action-popover.md); it renders a DropdownMenu for you |
| The same actions on right-click or long-press of a surface: a file tile, a canvas, a row | [ContextMenu](./context-menu.md), plus a visible DropdownMenu or ActionPopover with the same actions |
| A persistent desktop-style bar of menus: File, Edit, View | [Menubar](./menubar.md) |
| The user picks one value for a form field and the trigger shows the choice | [Select](./select.md) |
| Searching or filtering a long list of options or commands | [Command](./command.md) |
| Site navigation with link panels | [NavigationMenu](./navigation-menu.md) |
| Text, a form or other non-menu content in a floating panel | [Popover](./popover.md) |

<!-- REVIEW: chooser drafted from each component's source and docs descriptions; no source states these selection rules. -->

### When not to use

- Choosing a value that a form submits → use [Select](./select.md), or [RadioGroup](./radio-group.md) when there are few options.
- One or two actions → show them as [Button](./button.md)s; don't hide them in a menu.
- Right-click actions on a surface → use [ContextMenu](./context-menu.md).
- File/Edit/View bars in an editor-style app → use [Menubar](./menubar.md).
- Moving between pages or sections of a site → use [NavigationMenu](./navigation-menu.md) or [NavigationDrawer](./navigation-drawer.md).
- A setting that should stay visible on the page → use [Switch](./switch.md) or [Checkbox](./checkbox.md).

## 3. Anatomy

1. **Root** (`DropdownMenu`): holds open state. Renders no element.
2. **Trigger** (`DropdownMenuTrigger`): the control that opens the menu. Use `asChild` around a [Button](./button.md).
3. **Content** (`DropdownMenuContent`): the floating panel, portalled to the nearest `PortalContainerProvider` container or `document.body`. `--container-bg` surface, `--container-border` border, `--curves-md` radius, `--spacing-xs` padding, minimum width 8rem, 4px from the trigger.
4. **Item** (`DropdownMenuItem`): one action row. `--font-size-sm` text, padded `--spacing-xs` by `--spacing-sm`, with a `--spacing-sm` gap between an icon and the label.
5. **Checkbox item** (`DropdownMenuCheckboxItem`): an item with a checkbox box on the trailing edge, drawn to match [Checkbox](./checkbox.md).
6. **Radio group and radio item** (`DropdownMenuRadioGroup`, `DropdownMenuRadioItem`): single choice among items, with a radio ring on the trailing edge, drawn to match [RadioGroup](./radio-group.md).
7. **Label** (`DropdownMenuLabel`): a non-interactive heading for a group, weight 600.
8. **Separator** (`DropdownMenuSeparator`): a 1px line between groups, running edge to edge.
9. **Shortcut** (`DropdownMenuShortcut`): trailing hint text at `--font-size-xs` and 60% opacity. Display only; it binds no keys.
10. **Group** (`DropdownMenuGroup`): wraps related items.
11. **Submenu** (`DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`): a nested panel. The sub-trigger adds a trailing chevron; the sub-panel uses a larger shadow than the main panel.
12. **Portal** (`DropdownMenuPortal`): the Radix portal, re-exported. Content already portals, so you rarely need it.

<!-- REVIEW: Decide before coding (fix plan): DropdownMenu, ContextMenu and Menubar draw the same menu three ways. They differ on checked-item design (trailing box here, leading glyph in the other two), separator colour, shortcut colour, minimum width, label colour, and the destructive tone (only here). The group-label recipe also differs across menus, Select and Command. Don't restyle any of them to match; this needs a shared-primitive decision. -->

## 4. Variants

DropdownMenu has no variant prop. `DropdownMenuItem` takes a `tone`:

| Tone | Use for |
| --- | --- |
| `default` | Every ordinary action. |
| `destructive` | An action that deletes, revokes or can't be undone: Delete invoice, Remove member. Text uses `--destructive-fg`. |

## 5. Sizes

DropdownMenu has no size prop. Item text is `--font-size-sm` and padding comes from `--spacing-*`, so the menu follows the density axis.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Items inherit `--container-fg` on `--container-bg` | |
| Hover | Item row fills `--interactive-bg-hover` with `--interactive-fg` text | Pointing at an item focuses it, so hover and keyboard focus look the same. Checkbox and radio items also fill on `:hover`. |
| Focus | Trigger: the Button's outline. Inside the menu: the highlighted row, no outline | Never remove or restyle the focus ring. |
| Open | A sub-trigger with its submenu open keeps the `--interactive-bg-hover` fill | The trigger Button has no open styling of its own. |
| Checked | Checkbox item: filled `--interactive-bg-selected` box with a tick. Radio item: filled ring with a centre dot | Only `checked={true}` draws the tick. `checked="indeterminate"` renders an empty box, so don't use it. |
| Disabled | `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text, no pointer events | Arrow keys skip disabled items. |
| Destructive | `--destructive-fg` text, kept while highlighted | |

Separators currently use `--container-bg-alt`, which is barely visible on the panel in `minimal`. Don't draw your own line; keep using `DropdownMenuSeparator`. <!-- REVIEW: W4 (fix/divider-convergence): dropdown-menu.tsx separator uses a background token; the fix moves menus to the shared Separator. -->

## 7. Content guidelines

- Start action labels with a verb and name the object when it isn't obvious: "Duplicate", "Export as CSV", "Delete invoice".
- Use sentence case. Keep labels to one to four words; long labels wrap.
- End a label with an ellipsis (…) only when the item opens a dialog that asks for more input: "Rename…", "Move to…". <!-- REVIEW: convention drafted; stories use "Save Page As..." without stating a rule. -->
- Put the destructive item last, after a separator.
- Group related items under a `DropdownMenuLabel` when the menu has more than one kind of action.
- Show a shortcut only if that shortcut works elsewhere in the app. Use platform glyphs: "⌘D", "⇧⌘P".
- Name icon-only triggers after the object they act on: "Actions for invoice INV-1042".

| Do | Don't |
| --- | --- |
| Duplicate | Make a copy of this item |
| Export as CSV | CSV |
| Rename… | Rename this… |
| Delete invoice | Delete!!! |

## 8. Rules

1. Wrap the trigger with `asChild`: `<DropdownMenuTrigger asChild><Button …/></DropdownMenuTrigger>`. Without it you nest a button inside a button.
2. Give an icon-only trigger an `aria-label` that names the object, and mark the icon `aria-hidden="true"`.
3. Run actions in `onSelect`. Call `event.preventDefault()` in `onSelect` to keep the menu open, as the stories do for checkbox and radio items.
4. Use `tone="destructive"` only for actions that destroy or revoke. Place it last, after a separator, and confirm it in a [Dialog](./dialog.md).
5. To open a Dialog from an item, control the Dialog's `open` state and set it in the item's `onSelect`. Don't nest the Dialog inside the menu. <!-- REVIEW: composition drafted; no source shows a menu opening a dialog. -->
6. Navigate from an item with `asChild` around a link: `<DropdownMenuItem asChild><a href="/settings">Settings</a></DropdownMenuItem>`. Never set `window.location` in a handler.
7. Put only menu items in the content: items, checkbox and radio items, labels, separators, groups and submenus. Forms and rich content go in a [Popover](./popover.md).
8. Never pass `className` or `style` to any part. Pass `container` on `DropdownMenuContent` when a scoped theme must reach the panel (see [theming](../foundations/theming.md)).

## 9. Dos and don'ts

**Do:** label a row's icon trigger with the row it acts on.

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button type="button" variant="ghost" size="iconSm" aria-label="Actions for invoice INV-1042">
      <MoreHorizontal aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onSelect={onEdit}>Edit</DropdownMenuItem>
    <DropdownMenuItem onSelect={onDuplicate}>Duplicate</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Don't:** nest a Button without `asChild`, or leave the icon trigger unnamed.

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button size="iconSm"><MoreHorizontal /></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Do:** use Select when the user is choosing a value for a form.

```tsx
<Select name="currency" defaultValue="eur">
  <SelectTrigger aria-label="Currency">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="eur">Euro</SelectItem>
    <SelectItem value="usd">US dollar</SelectItem>
  </SelectContent>
</Select>
```

**Don't:** build a form field out of a menu's radio items.

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="input">{currency}</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuRadioGroup value={currency} onValueChange={setCurrency}>
      <DropdownMenuRadioItem value="eur">Euro</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="usd">US dollar</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

**Do:** separate the destructive action and give it the tone.

```tsx
<DropdownMenuContent>
  <DropdownMenuItem onSelect={onArchive}>Archive</DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem tone="destructive" onSelect={() => setConfirmOpen(true)}>
    Delete project
  </DropdownMenuItem>
</DropdownMenuContent>
```

**Don't:** bury it mid-list or colour it by hand.

```tsx
<DropdownMenuContent>
  <DropdownMenuItem onSelect={deleteProject}>
    <span style={{ color: "red" }}>Delete project</span>
  </DropdownMenuItem>
  <DropdownMenuItem onSelect={onArchive}>Archive</DropdownMenuItem>
</DropdownMenuContent>
```

## 10. Accessibility

- Role: the trigger gets `aria-haspopup="menu"` and `aria-expanded`; the content is `menu`; items are `menuitem`, `menuitemcheckbox` or `menuitemradio`.
- Label: the trigger's text, or `aria-label` for icon-only triggers. Items are named by their text; mark item icons `aria-hidden="true"`.
- Keyboard: Enter, Space or ArrowDown on the trigger opens the menu. ArrowUp and ArrowDown move between items, Home and End jump to the ends, and typing a letter jumps to a matching item. Enter or Space selects. ArrowRight opens a submenu and ArrowLeft closes it. Escape closes the menu.
- Focus: opening moves focus into the menu; closing returns it to the trigger. The menu is modal by default (`modal`), so outside pointer interaction is blocked while it is open.
- Shortcut hints are text only. Register the key binding yourself, or leave the hint out.
- Contrast: handled by the theme. Don't override colours. The trigger Button's focus outline currently measures below 3:1; don't patch it per menu. <!-- REVIEW: system-wide focus-ring contrast issue, see foundations/colour.md. -->

## 11. Behaviour

- Positioning: the panel opens below the trigger, centred (`side="bottom"`, `align="center"`, `sideOffset` 4), and flips to stay on screen. Use `align="end"` for triggers at the right edge of a row or header.
- Responsive: no breakpoint behaviour. The panel is at least 8rem wide and grows with its widest item.
- Overflow and truncation: the panel has no maximum height or scroll. Keep menus short; move long lists to [Command](./command.md).
- Closing: selecting an item closes the menu unless `onSelect` calls `event.preventDefault()`.
- Motion: item background and colour transition over 150ms. There is no open or close animation. Don't add one.

## 12. API

<!-- api:start -->
### DropdownMenu

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial open state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | | Called when the menu opens or closes. |
| `modal` | `boolean` | `true` | Blocks outside interaction while open. |
| `...props` | Radix `DropdownMenu.Root` props | | `dir`. |

### DropdownMenuTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders your child (a Button) as the trigger. |
| `disabled` | `boolean` | `false` | Prevents opening. |
| `...props` | Radix `DropdownMenu.Trigger` props | | Re-exported Radix part. |

### DropdownMenuContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `container` | `HTMLElement \| null` | provider container, then `document.body` | Element to portal into. |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Preferred side of the trigger. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment against the trigger. |
| `sideOffset` | `number` | `4` | Distance from the trigger in px. |
| `loop` | `boolean` | `false` | Wraps arrow-key focus from last to first item. |
| `onCloseAutoFocus` | `(event: Event) => void` | | Call `event.preventDefault()` to stop focus returning to the trigger. |
| `...props` | Radix `DropdownMenu.Content` props without `className`, `style` | | `alignOffset`, `collisionPadding`, `onEscapeKeyDown`. |

### DropdownMenuItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `"default" \| "destructive"` | `"default"` | Destructive colours the text with `--destructive-fg`. |
| `inset` | `boolean` | `false` | Adds left padding to line up with items that have an icon. |
| `onSelect` | `(event: Event) => void` | | Runs the action; `event.preventDefault()` keeps the menu open. |
| `disabled` | `boolean` | `false` | Skipped by the keyboard, not clickable. |
| `asChild` | `boolean` | `false` | Renders your child (for example a link) as the item. |
| `...props` | Radix `DropdownMenu.Item` props without `className`, `style` | | `textValue` for typeahead when the label isn't plain text. |

### DropdownMenuCheckboxItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean \| "indeterminate"` | | Checked state. Only `true` draws the tick. |
| `onCheckedChange` | `(checked: boolean) => void` | | Called when toggled. |
| `...props` | Radix `DropdownMenu.CheckboxItem` props without `className`, `style` | | `disabled`, `onSelect`. |

### DropdownMenuRadioGroup and DropdownMenuRadioItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (group) | `string` | | Selected value. |
| `onValueChange` (group) | `(value: string) => void` | | Called when a radio item is chosen. |
| `value` (item) | `string` | | Required. The item's value. |
| `...props` | Radix `DropdownMenu.RadioGroup` / `RadioItem` props without `className`, `style` | | `disabled`, `onSelect` on items. |

### DropdownMenuLabel, DropdownMenuSubTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `inset` | `boolean` | `false` | Adds left padding to line up with items that have an icon. |
| `...props` | Radix `Label` / `SubTrigger` props without `className`, `style` | | `disabled` on the sub-trigger. |

### DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open`, `defaultOpen`, `onOpenChange` (Sub) | as on the root | | Submenu open state. |
| `...props` (SubContent, Separator) | Radix props without `className`, `style` | | `sideOffset`, `loop` on SubContent. |
| `...props` (Shortcut) | `HTMLAttributes<HTMLSpanElement>` without `className`, `style` | | Renders a `<span>`. |
| `...props` (Group, Portal) | Radix `Group` / `Portal` props | | Re-exported Radix parts. |

`className` and `style` are omitted from every wrapped part. The re-exported Radix parts (Trigger, Group, Portal, Sub, RadioGroup) still forward them; don't pass them there either.
<!-- api:end -->

## 13. Examples

A table row actions menu with a confirmed delete:

```tsx
import * as React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  TableCell,
  TableRow,
} from "@eluan/core";
import { Copy, Download, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

const iconStyle = { width: "var(--size-xxs)", height: "var(--size-xxs)" };

export function InvoiceRow({
  invoice,
  onDuplicate,
  onDownload,
  onDelete,
}: {
  invoice: { id: string; customer: string; total: string };
  onDuplicate: () => void;
  onDownload: () => void;
  onDelete: () => void;
}) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <TableRow>
      <TableCell weight="medium">{invoice.id}</TableCell>
      <TableCell>{invoice.customer}</TableCell>
      <TableCell>{invoice.total}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="ghost" size="iconSm" aria-label={`Actions for invoice ${invoice.id}`}>
              <MoreHorizontal aria-hidden="true" style={iconStyle} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href={`/invoices/${invoice.id}/edit`}>
                <Pencil aria-hidden="true" style={iconStyle} />
                Edit
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onDuplicate}>
              <Copy aria-hidden="true" style={iconStyle} />
              Duplicate
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onDownload}>
              <Download aria-hidden="true" style={iconStyle} />
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem tone="destructive" onSelect={() => setConfirmOpen(true)}>
              <Trash2 aria-hidden="true" style={iconStyle} />
              Delete invoice
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete invoice {invoice.id}?</DialogTitle>
              <DialogDescription>The invoice and its payment history are removed. This can't be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button type="button" variant="destructive" onClick={onDelete}>
                Delete invoice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
```

View settings that stay open while toggled:

```tsx
import * as React from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@eluan/core";

export function ViewOptions() {
  const [showArchived, setShowArchived] = React.useState(false);
  const [sort, setSort] = React.useState("due");
  const keepOpen = (event: Event) => event.preventDefault();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="sm">View</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Show</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived} onSelect={keepOpen}>
          Archived invoices
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="due" onSelect={keepOpen}>Due date</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="amount" onSelect={keepOpen}>Amount</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="customer" onSelect={keepOpen}>Customer</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## 14. Related components

- [ActionPopover](./action-popover.md): a ready-made icon trigger and flat action list built on DropdownMenu.
- [ContextMenu](./context-menu.md): the same kind of menu, opened by right-click or long-press.
- [Menubar](./menubar.md): several menus in a persistent bar.
- [Select](./select.md): picks a value for a form instead of running an action.
- [Command](./command.md): a searchable list for many options or commands.
- [Button](./button.md): the trigger.
- [Dialog](./dialog.md): confirms the destructive item.

## 15. Common agent mistakes

_Filled from evals._
