---
name: Menubar
use_when: An editor-style app needs a persistent desktop-style bar of menus such as File, Edit and View.
instead_of: DropdownMenu for a single menu; NavigationMenu or Header for site navigation; Button or ToggleGroup for a toolbar of direct actions.
source: packages/core/src/components/menubar.tsx
---

# Menubar

## 1. Overview

Menubar is a horizontal bar of menu triggers, like a desktop app's File, Edit and View. It wraps Radix Menubar: each `MenubarMenu` pairs a trigger with a portalled panel of items, checkbox and radio items, labels, separators, shortcut hints and submenus. For choosing between menus, see the chooser in [DropdownMenu](./dropdown-menu.md).

## 2. When to use

- Document, canvas, spreadsheet or code editors where users expect File, Edit, View, Insert menus.
- Apps with many commands that need a stable, discoverable home, each mirrored by a keyboard shortcut.

### When not to use

- One menu of actions → use [DropdownMenu](./dropdown-menu.md).
- Site or app navigation between pages → use [NavigationMenu](./navigation-menu.md), [Header](./header.md) or [NavigationDrawer](./navigation-drawer.md).
- A few direct actions or formatting toggles → use [Button](./button.md)s or a [ToggleGroup](./toggle-group.md).
- Phone-width layouts → use a [DropdownMenu](./dropdown-menu.md) or a [Sheet](./sheet.md); the bar doesn't adapt.

<!-- REVIEW: usage drafted; docs describe Menubar only as "a persistent application menu bar styled like a native desktop app". -->

## 3. Anatomy

1. **Bar** (`Menubar`): the root row. `--container-bg` with a `--container-border` border, `--curves-md` radius, `--spacing-xs` padding and gap.
2. **Menu** (`MenubarMenu`): one top-level menu. Renders no element; holds one trigger and one content.
3. **Trigger** (`MenubarTrigger`): the menu's name in the bar, `--font-size-sm` at weight 500.
4. **Content** (`MenubarContent`): the panel, portalled to the nearest `PortalContainerProvider` container or `document.body`. Aligned to the trigger's start edge, 8px below it, minimum width 12rem, with a shadow.
5. **Item** (`MenubarItem`): one command row, `--font-size-sm`, padded `--spacing-sm`.
6. **Checkbox item** (`MenubarCheckboxItem`): shows a tick in a leading indicator slot when checked.
7. **Radio group and radio item** (`MenubarRadioGroup`, `MenubarRadioItem`): single choice, with a filled dot in the leading slot.
8. **Label** (`MenubarLabel`): a non-interactive group heading, weight 600.
9. **Separator** (`MenubarSeparator`): a 1px line between groups.
10. **Shortcut** (`MenubarShortcut`): trailing hint text at `--font-size-xs` in `--container-fg-alt`. Display only; it binds no keys.
11. **Group** (`MenubarGroup`): wraps related items.
12. **Submenu** (`MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent`): a nested panel, minimum width 8rem; the sub-trigger adds a trailing chevron.
13. **Portal** (`MenubarPortal`): the Radix portal, re-exported. Content already portals.

<!-- REVIEW: Decide before coding (fix plan): DropdownMenu, ContextMenu and Menubar implement the same menu three times and differ in checked-item design, separator colour, shortcut colour, minimum width and label colour. Don't restyle Menubar to match the others. -->

## 4. Variants

Menubar has no variants. Items have no `tone`; only `DropdownMenuItem` has a destructive tone.

## 5. Sizes

Menubar has no size prop. Text is `--font-size-sm` and padding comes from `--spacing-*`, so the bar follows the density axis.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Triggers and items inherit `--container-fg` on `--container-bg` | |
| Hover | Items fill `--interactive-bg-hover` with `--interactive-fg` text | Pointing at an item focuses it. Triggers have no separate hover style until focused or open. |
| Focus | Trigger or item fills `--interactive-bg-hover`; no outline | Never remove or restyle the focus ring. |
| Open | The open menu's trigger keeps the `--interactive-bg-hover` fill; so does an open sub-trigger | |
| Checked | A tick (checkbox) or filled dot (radio) in the leading slot | Checkbox and radio items reserve the leading slot even when unchecked. |
| Disabled | `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text, no pointer events | Arrow keys skip disabled items. |

Known issues:

- Separators use `--container-bg-alt`, which is barely visible on the panel in `minimal`. Keep using `MenubarSeparator`; don't draw your own line. <!-- REVIEW: W4 (fix/divider-convergence): menubar.tsx separator uses a background token. -->
- `MenubarSubContent` has no shadow, so a submenu sits flat on the panel beneath it. Don't add one. <!-- REVIEW: W8 (fix/shadow-tokens): contentShadow is applied only by MenubarContent. -->

## 7. Content guidelines

- Name triggers with one short noun users know from desktop apps: File, Edit, View, Insert, Help.
- Start item labels with a verb: "New document", "Export as PDF", "Undo".
- End a label with an ellipsis (…) only when it opens a dialog that asks for more input: "Save as…". <!-- REVIEW: convention drafted; no source states it. -->
- Show the shortcut for every command that has one, using platform glyphs: "⌘N", "⇧⌘Z".
- Use checkbox items for show/hide toggles ("Show ruler") and radio items for one-of choices ("Zoom: 100%").

| Do | Don't |
| --- | --- |
| File | File menu |
| New document | Document (new) |
| Show ruler | Ruler on/off |

## 8. Rules

1. Put exactly one `MenubarTrigger` and one `MenubarContent` in each `MenubarMenu`.
2. Use Menubar for commands, never for navigation links between pages.
3. Register every shortcut you show. `MenubarShortcut` is text only.
4. Keep the bar to a handful of short triggers that fit on one line; the bar doesn't wrap or collapse.
5. Call `event.preventDefault()` in `onSelect` to keep a menu open while toggling checkbox or radio items.
6. Never pass `className` or `style` to any part. Pass `container` on `MenubarContent` when a scoped theme must reach the panel (see [theming](../foundations/theming.md)).

## 9. Dos and don'ts

**Do:** group commands under familiar menus with real shortcuts.

```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem onSelect={undo}>
        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarItem onSelect={redo}>
        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

**Don't:** use a Menubar as site navigation.

```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Products</MenubarTrigger>
    <MenubarContent>
      <MenubarItem onSelect={() => (window.location.href = "/analytics")}>Analytics</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

## 10. Accessibility

- Role: the bar is `menubar`; triggers are `menuitem` with `aria-haspopup` and `aria-expanded`; panels are `menu`; items are `menuitem`, `menuitemcheckbox` or `menuitemradio`.
- Label: triggers and items are named by their text.
- Keyboard: Tab reaches the bar as one stop. ArrowLeft and ArrowRight move between triggers and wrap at the ends (`loop`). Enter, Space or ArrowDown opens a menu. Inside a menu, ArrowUp and ArrowDown move, Home and End jump to the ends, typing a letter jumps to a match, Enter or Space selects, ArrowRight opens a submenu or moves to the next menu, ArrowLeft closes a submenu or moves to the previous menu, and Escape closes the menu.
- Focus: opening moves focus into the menu; Escape returns it to the trigger.
- Pointer: a click opens a menu; while one is open, pointing at another trigger switches to it. To open on hover from rest, control `value` on `Menubar` and set it from each trigger's `onPointerEnter`, as the docs demo does.
- Contrast: handled by the theme. Don't override colours. Focus on triggers and items is shown only by the `--interactive-bg-hover` fill, which is faint in `minimal`; don't patch it per component. <!-- REVIEW: same family as W1 (focus contrast); menu focus fills aren't in the fix plan's outline count. -->

## 11. Behaviour

- Positioning: each panel opens below its trigger, aligned to the trigger's start (`align="start"`, `alignOffset` -4, `sideOffset` 8), and flips to stay on screen.
- Responsive: no breakpoint behaviour. The bar is a non-wrapping flex row; on narrow screens swap it for a DropdownMenu or Sheet yourself. <!-- REVIEW: drafted; source has no small-screen handling. -->
- Overflow and truncation: panels have no maximum height or scroll. Keep menus to the commands that belong there.
- Motion: none. Don't add any.

## 12. API

<!-- api:start -->
### Menubar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | | Controlled value of the open menu (`""` when none). |
| `defaultValue` | `string` | | Initially open menu when uncontrolled. |
| `onValueChange` | `(value: string) => void` | | Called when a menu opens or closes. |
| `loop` | `boolean` | `true` | Wraps arrow-key focus between the first and last trigger. |
| `...props` | Radix `Menubar.Root` props without `className`, `style` | | `dir`. |

### MenubarMenu

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | generated | Identifies the menu for `Menubar` `value`. |
| `...props` | Radix `Menubar.Menu` props | | Re-exported Radix part. |

### MenubarTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Prevents opening. |
| `...props` | Radix `Menubar.Trigger` props without `className`, `style` | | `asChild`, `onPointerEnter`. |

### MenubarContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `container` | `HTMLElement \| null` | provider container, then `document.body` | Element to portal into. |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Alignment against the trigger. |
| `alignOffset` | `number` | `-4` | Shift along the alignment axis in px. |
| `sideOffset` | `number` | `8` | Distance from the trigger in px. |
| `...props` | Radix `Menubar.Content` props without `className`, `style` | | `side`, `loop`, `onCloseAutoFocus`. |

### MenubarItem, MenubarLabel, MenubarSubTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `inset` | `boolean` | `false` | Adds left padding to line up with checkbox and radio items. |
| `onSelect` (Item) | `(event: Event) => void` | | Runs the command; `event.preventDefault()` keeps the menu open. |
| `disabled` (Item, SubTrigger) | `boolean` | `false` | Skipped by the keyboard, not clickable. |
| `...props` | Radix `Item` / `Label` / `SubTrigger` props without `className`, `style` | | `asChild`, `textValue`. |

### MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` (CheckboxItem) | `boolean \| "indeterminate"` | | Checked state. |
| `onCheckedChange` (CheckboxItem) | `(checked: boolean) => void` | | Called when toggled. |
| `value`, `onValueChange` (RadioGroup) | `string`, `(value: string) => void` | | Selected value and change handler. |
| `value` (RadioItem) | `string` | | Required. The item's value. |
| `...props` | Radix props without `className`, `style` | | `disabled`, `onSelect`. |

### MenubarSub, MenubarSubContent, MenubarSeparator, MenubarShortcut, MenubarGroup, MenubarPortal

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open`, `defaultOpen`, `onOpenChange` (Sub) | `boolean`, `boolean`, `(open: boolean) => void` | | Submenu open state. |
| `...props` (SubContent, Separator) | Radix props without `className`, `style` | | `sideOffset`, `loop` on SubContent. |
| `...props` (Shortcut) | `HTMLAttributes<HTMLSpanElement>` without `className`, `style` | | Renders a `<span>`. |
| `...props` (Group, Portal) | Radix `Group` / `Portal` props | | Re-exported Radix parts. |

`className` and `style` are omitted from every wrapped part. The re-exported Radix parts (Menu, Group, Portal, Sub, RadioGroup) still forward them; don't pass them there either.
<!-- api:end -->

## 13. Examples

```tsx
import * as React from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@eluan/core";

export function EditorMenubar({
  onNew,
  onExport,
  onUndo,
  onRedo,
}: {
  onNew: () => void;
  onExport: (format: "pdf" | "docx") => void;
  onUndo: () => void;
  onRedo: () => void;
}) {
  const [showRuler, setShowRuler] = React.useState(true);
  const [zoom, setZoom] = React.useState("100");
  const keepOpen = (event: Event) => event.preventDefault();

  return (
    <div style={{ paddingBlock: "var(--spacing-sm)" }}>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={onNew}>
              New document <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Export as</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onSelect={() => onExport("pdf")}>PDF</MenubarItem>
                <MenubarItem onSelect={() => onExport("docx")}>Word document</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={onUndo}>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onSelect={onRedo}>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={showRuler} onCheckedChange={setShowRuler} onSelect={keepOpen}>
              Show ruler
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup value={zoom} onValueChange={setZoom}>
              <MenubarRadioItem value="75" onSelect={keepOpen}>Zoom 75%</MenubarRadioItem>
              <MenubarRadioItem value="100" onSelect={keepOpen}>Zoom 100%</MenubarRadioItem>
              <MenubarRadioItem value="150" onSelect={keepOpen}>Zoom 150%</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
```

## 14. Related components

- [DropdownMenu](./dropdown-menu.md): a single menu on a trigger, and the chooser for all menus.
- [ContextMenu](./context-menu.md): the same commands on right-click.
- [NavigationMenu](./navigation-menu.md): navigation links with panels, not commands.
- [Kbd](./kbd.md): show a shortcut in running text rather than in a menu.

## 15. Common agent mistakes

_Filled from evals._
