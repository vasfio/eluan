---
name: ContextMenu
use_when: Right-click or long-press on a surface (a file tile, canvas or row) should offer actions for that thing.
instead_of: DropdownMenu or ActionPopover for a visible actions button; Menubar for an app-wide File/Edit bar; Select to pick a value.
source: packages/core/src/components/context-menu.tsx
---

# ContextMenu

## 1. Overview

ContextMenu opens a floating list of actions where the user right-clicks, or after a 700ms long-press on touch. It wraps Radix ContextMenu: the panel portals out of the page and supports items, checkbox and radio items, labels, separators, shortcut hints and submenus. It's a shortcut to actions, so the same actions must also be reachable another way. For choosing between menus, see the chooser in [DropdownMenu](./dropdown-menu.md).

## 2. When to use

- Right-click actions on an object in a workspace: a file or folder tile, a canvas layer, a kanban card.
- Power-user shortcuts that mirror a visible actions menu or toolbar.

### When not to use

- The only way to reach an action → use [DropdownMenu](./dropdown-menu.md) or [ActionPopover](./action-popover.md) on a visible button. Add a ContextMenu alongside it if you want.
- A row actions menu in a table → use [DropdownMenu](./dropdown-menu.md) or [ActionPopover](./action-popover.md) in the row.
- File/Edit/View menus for the whole app → use [Menubar](./menubar.md).
- Picking a value → use [Select](./select.md).
- Ordinary page text or links, where users expect the browser's own menu → leave the native menu alone.

<!-- REVIEW: "When not to use" drafted; source and docs describe ContextMenu as a right-click menu without usage limits. -->

## 3. Anatomy

1. **Root** (`ContextMenu`): holds open state. Renders no element.
2. **Trigger** (`ContextMenuTrigger`): the area that opens the menu on right-click or long-press. Use `asChild` around an element you own and style.
3. **Content** (`ContextMenuContent`): the floating panel at the pointer, portalled to the nearest `PortalContainerProvider` container or `document.body`. `--container-bg` surface, `--container-border` border, `--curves-md` radius, `--spacing-xxs` padding, minimum width 8rem.
4. **Item** (`ContextMenuItem`): one action row, `--font-size-sm`, `--curves-sm` radius.
5. **Checkbox item** (`ContextMenuCheckboxItem`): shows a tick in a leading indicator slot when checked.
6. **Radio group and radio item** (`ContextMenuRadioGroup`, `ContextMenuRadioItem`): single choice, with a filled dot in the leading slot.
7. **Label** (`ContextMenuLabel`): a non-interactive group heading, weight 600, `--interactive-fg`.
8. **Separator** (`ContextMenuSeparator`): a 1px `--container-border` line between groups.
9. **Shortcut** (`ContextMenuShortcut`): trailing hint text at `--font-size-xs` in `--interactive-fg-alt`. Display only; it binds no keys.
10. **Group** (`ContextMenuGroup`): wraps related items.
11. **Submenu** (`ContextMenuSub`, `ContextMenuSubTrigger`, `ContextMenuSubContent`): a nested panel; the sub-trigger adds a trailing chevron.
12. **Portal** (`ContextMenuPortal`): the Radix portal, re-exported. Content already portals.

<!-- REVIEW: Decide before coding (fix plan): DropdownMenu, ContextMenu and Menubar implement the same menu three times and differ in checked-item design, separator colour, shortcut colour, label colour and destructive tone. Don't restyle ContextMenu to match the others. -->

## 4. Variants

ContextMenu has no variants. Items have no `tone`; only `DropdownMenuItem` has a destructive tone. <!-- REVIEW: Decide before coding: destructive item exists only in DropdownMenu. -->

## 5. Sizes

ContextMenu has no size prop. Item text is `--font-size-sm` and padding comes from `--spacing-*`, so the menu follows the density axis.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Items inherit `--container-fg` on `--container-bg` | |
| Hover | Item row fills `--interactive-bg-hover` with `--interactive-fg` text | Pointing at an item focuses it, so hover and keyboard focus look the same. |
| Focus | The highlighted row, no outline | Never remove or restyle the focus ring. |
| Open | A sub-trigger with its submenu open keeps the `--interactive-bg-hover` fill | |
| Checked | A tick (checkbox) or filled dot (radio) in the leading slot | Checkbox and radio items reserve the leading slot even when unchecked. |
| Disabled | `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text, no pointer events | Arrow keys skip disabled items. |

## 7. Content guidelines

- Start action labels with a verb: "Rename…", "Duplicate", "Move to trash".
- Use sentence case and keep labels to one to four words.
- Match the labels of the visible actions menu exactly, so both routes read the same.
- End a label with an ellipsis (…) only when it opens a dialog that asks for more input. <!-- REVIEW: convention drafted; stories use "Save Page As..." without stating a rule. -->
- Put destructive actions last, after a separator.
- Show a shortcut only if it works elsewhere in the app: "⌘C", "⌫".

| Do | Don't |
| --- | --- |
| Move to trash | Trash it |
| Rename… | Edit name of this file |
| Copy link | Link |

## 8. Rules

1. Offer every ContextMenu action somewhere visible too: a [DropdownMenu](./dropdown-menu.md), [ActionPopover](./action-popover.md) or toolbar Button inside or next to the target. Right-click is hidden from touch-only and keyboard users. <!-- REVIEW: drafted; source doesn't state it. Keyboard users can only open it via the browser's contextmenu event (Shift+F10 or the Menu key) while focus is inside the trigger. -->
2. Wrap the target with `<ContextMenuTrigger asChild>` around an element you own, and style that element. Don't pass `style` to the trigger.
3. Put destructive actions last, after a separator, and confirm them in a [Dialog](./dialog.md). ContextMenu has no destructive tone; don't colour the item yourself.
4. Run actions in `onSelect`. Call `event.preventDefault()` in `onSelect` to keep the menu open while toggling checkbox or radio items.
5. Never pass `className` or `style` to any part. Pass `container` on `ContextMenuContent` when a scoped theme must reach the panel (see [theming](../foundations/theming.md)).

## 9. Dos and don'ts

**Do:** put the target in an element you own and mirror the actions on a visible button.

```tsx
<ContextMenu>
  <ContextMenuTrigger asChild>
    <div style={{ display: "flex", gap: "var(--spacing-sm)", padding: "var(--spacing-md)", borderRadius: "var(--curves-md)" }}>
      <span>Q3 report.pdf</span>
      <ActionPopover aria-label="Actions for Q3 report.pdf" items={fileActions} />
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onSelect={onRename}>Rename…</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

**Don't:** style the trigger directly or make right-click the only route.

```tsx
<ContextMenu>
  <ContextMenuTrigger style={{ height: "8rem", border: "1px dashed #ccc" }}>
    Right-click here
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Rename</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

**Do:** separate destructive actions at the end.

```tsx
<ContextMenuContent>
  <ContextMenuItem onSelect={onDuplicate}>Duplicate</ContextMenuItem>
  <ContextMenuSeparator />
  <ContextMenuItem onSelect={() => setConfirmOpen(true)}>Move to trash</ContextMenuItem>
</ContextMenuContent>
```

**Don't:** mix them in and recolour them.

```tsx
<ContextMenuContent>
  <ContextMenuItem onSelect={trashFile}>
    <span style={{ color: "var(--destructive-fg)" }}>Move to trash</span>
  </ContextMenuItem>
  <ContextMenuItem onSelect={onDuplicate}>Duplicate</ContextMenuItem>
</ContextMenuContent>
```

## 10. Accessibility

- Role: the content is `menu`; items are `menuitem`, `menuitemcheckbox` or `menuitemradio`. The trigger adds no role; it keeps your element's role.
- Label: items are named by their text.
- Keyboard: the menu opens on the trigger's `contextmenu` event; give keyboard users the visible actions menu (Rule 1). Inside the menu, ArrowUp and ArrowDown move between items, Home and End jump to the ends, typing a letter jumps to a matching item, Enter or Space selects, ArrowRight opens a submenu, ArrowLeft closes it and Escape closes the menu.
- Focus: opening moves focus into the menu. The menu is modal by default (`modal`), so outside pointer interaction is blocked while it is open.
- Touch: a 700ms long-press opens the menu; moving the finger cancels it.
- Contrast: handled by the theme. Don't override colours. The focused item is shown only by its `--interactive-bg-hover` fill, which is faint in `minimal`; don't patch it per menu. <!-- REVIEW: same family as W1 (focus contrast); menu focus fills aren't in the fix plan's outline count. -->

## 11. Behaviour

- Positioning: the panel opens at the pointer and flips to stay on screen.
- Responsive: no breakpoint behaviour. The panel is at least 8rem wide.
- Overflow and truncation: no maximum height or scroll. Keep menus short.
- Closing: selecting an item closes the menu unless `onSelect` calls `event.preventDefault()`. Escape and outside clicks close it.
- Disabled trigger: `disabled` on `ContextMenuTrigger` restores the browser's native menu.
- Motion: none. Don't add any.

## 12. API

<!-- api:start -->
### ContextMenu

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onOpenChange` | `(open: boolean) => void` | | Called when the menu opens or closes. |
| `modal` | `boolean` | `true` | Blocks outside interaction while open. |
| `...props` | Radix `ContextMenu.Root` props | | `dir`. There is no controlled `open`; the pointer opens it. |

### ContextMenuTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders your child as the trigger area. |
| `disabled` | `boolean` | `false` | Turns the custom menu off; the native menu shows instead. |
| `...props` | Radix `ContextMenu.Trigger` props | | Re-exported Radix part; renders a `<span>` without `asChild`. |

### ContextMenuContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `container` | `HTMLElement \| null` | provider container, then `document.body` | Element to portal into. |
| `loop` | `boolean` | `false` | Wraps arrow-key focus from last to first item. |
| `...props` | Radix `ContextMenu.Content` props without `className`, `style` | | `alignOffset`, `collisionPadding`, `onEscapeKeyDown`, `onCloseAutoFocus`. |

### ContextMenuItem, ContextMenuLabel, ContextMenuSubTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `inset` | `boolean` | `false` | Adds left padding to line up with checkbox and radio items. |
| `onSelect` (Item) | `(event: Event) => void` | | Runs the action; `event.preventDefault()` keeps the menu open. |
| `disabled` (Item, SubTrigger) | `boolean` | `false` | Skipped by the keyboard, not clickable. |
| `...props` | Radix `Item` / `Label` / `SubTrigger` props without `className`, `style` | | `asChild`, `textValue`. |

### ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` (CheckboxItem) | `boolean \| "indeterminate"` | | Checked state. |
| `onCheckedChange` (CheckboxItem) | `(checked: boolean) => void` | | Called when toggled. |
| `value`, `onValueChange` (RadioGroup) | `string`, `(value: string) => void` | | Selected value and change handler. |
| `value` (RadioItem) | `string` | | Required. The item's value. |
| `...props` | Radix props without `className`, `style` | | `disabled`, `onSelect`. |

### ContextMenuSub, ContextMenuSubContent, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuPortal

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open`, `defaultOpen`, `onOpenChange` (Sub) | `boolean`, `boolean`, `(open: boolean) => void` | | Submenu open state. |
| `...props` (SubContent, Separator) | Radix props without `className`, `style` | | `sideOffset`, `loop` on SubContent. |
| `...props` (Shortcut) | `HTMLAttributes<HTMLSpanElement>` without `className`, `style` | | Renders a `<span>`. |
| `...props` (Group, Portal) | Radix `Group` / `Portal` props | | Re-exported Radix parts. |

`className` and `style` are omitted from every wrapped part. The re-exported Radix parts (Trigger, Group, Portal, Sub, RadioGroup) still forward them; don't pass them there either.
<!-- api:end -->

## 13. Examples

```tsx
import * as React from "react";
import {
  ActionPopover,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@eluan/core";

export function FileTile({
  name,
  pinned,
  onOpen,
  onRename,
  onTogglePin,
  onTrash,
}: {
  name: string;
  pinned: boolean;
  onOpen: () => void;
  onRename: () => void;
  onTogglePin: (pinned: boolean) => void;
  onTrash: () => void;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--spacing-sm)",
            padding: "var(--spacing-md)",
            borderRadius: "var(--curves-md)",
            backgroundColor: "var(--container-bg-alt)",
            color: "var(--container-fg)",
            fontSize: "var(--font-size-sm)",
          }}
        >
          <span>{name}</span>
          <ActionPopover
            aria-label={`Actions for ${name}`}
            items={[
              { label: "Open", onClick: onOpen },
              { label: "Rename…", onClick: onRename },
              { label: "Move to trash", onClick: onTrash, destructive: true },
            ]}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={onOpen}>
          Open
          <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onSelect={onRename}>Rename…</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={pinned} onCheckedChange={onTogglePin}>
          Pin to top
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={onTrash}>Move to trash</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## 14. Related components

- [DropdownMenu](./dropdown-menu.md): the same actions on a visible trigger, and the chooser for all menus.
- [ActionPopover](./action-popover.md): a compact visible actions button to pair with a ContextMenu.
- [Menubar](./menubar.md): app-wide menus in a persistent bar.
- [Dialog](./dialog.md): confirms destructive actions.

## 15. Common agent mistakes

_Filled from evals._
