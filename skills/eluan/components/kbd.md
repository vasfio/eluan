---
name: Kbd
use_when: Show a keyboard key or shortcut as a keycap in help text, a tooltip, a shortcuts list or next to a trigger's label.
instead_of: CommandShortcut, DropdownMenuShortcut, ContextMenuShortcut or MenubarShortcut inside those menus' rows; CodeBlock for code; plain text like Ctrl-K.
source: packages/core/src/components/kbd.tsx
---

# Kbd

## 1. Overview

Kbd renders a keyboard key as a keycap in a native `<kbd>` element. Pass `keys` and it maps key names to symbols ("cmd+k" becomes ⌘ + K). The module also exports `KbdGroup` for several keycaps side by side, `Shortcut` for sixteen common shortcuts with a macOS check, and the helpers `KEY_SYMBOLS` and `formatKey`.

## 2. When to use

- A shortcuts list or help panel: "Save changes ⌘ + S".
- A hint next to the label of the control a shortcut triggers, such as Cmd+K on a command menu Button.
- A key named in instructions: "Press Esc to close".

### When not to use

- A shortcut hint in a Command row → use `CommandShortcut` in [Command](./command.md).
- A shortcut hint in a menu item → use `DropdownMenuShortcut` in [DropdownMenu](./dropdown-menu.md), `ContextMenuShortcut` in [ContextMenu](./context-menu.md) or `MenubarShortcut` in [Menubar](./menubar.md).
- Code or a command to type → use [CodeBlock](./code-block.md).
- A status or count label → use [Badge](./badge.md).

## 3. Anatomy

1. **Keycap**: the `<kbd>` box, `--font-mono` at weight 500, `--curves-sm` corners, at least as wide as it is tall.
2. **Key labels**: one per key. Known names become symbols; anything else is uppercased.
3. **Plus signs**: between keys when `keys` holds more than one, in `--interactive-fg-disabled`.

`KbdGroup` is an inline row of separate keycaps with a `--spacing-xxs` gap and no plus signs.

## 4. Variants

| Variant | Use for |
| --- | --- |
| `default` | A raised keycap (`--container-bg-alt` fill, `--container-border-alt` border and bottom edge, `--container-fg-alt` text). Shortcut lists and standalone hints. |
| `outline` | A flat keycap (`--container-bg` fill, `--container-border-alt` border, `--container-fg` text). Where the raised edge is too heavy, such as dense tables or tooltips. |
| `ghost` | Text only (no fill or border, `--container-fg-alt`). Inside buttons and running text. |

<!-- REVIEW: "Use for" text is drafted from each variant's styles and the Command story (ghost in a sentence); source gives no per-variant usage guidance. -->

## 5. Sizes

| Size | Use in |
| --- | --- |
| `sm` | Inside buttons and next to small text (`--size-xs` tall, `--font-size-xs`). |
| `default` | Body text and shortcut lists (`--size-sm`, `--font-size-sm`). |
| `lg` | Large instructional layouts, such as onboarding (`--size-md`, `--font-size-base`). |

<!-- REVIEW: "Use in" drafted; the Command story uses sm inside a Button and in a caption line. -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Variant colours | Kbd isn't interactive: no hover, focus or disabled states. |

## 7. Content guidelines

- Name keys in `keys`, joined with `+` or as an array: `"cmd+k"`, `["shift", "enter"]`.
- Known names become symbols: cmd, command, meta and super → ⌘; ctrl and control → ⌃; alt, option and opt → ⌥; shift → ⇧; enter and return → ↵; tab → ⇥; esc and escape → ⎋; backspace → ⌫; delete and del → ⌦; space → ␣; up, down, left and right → arrows; win → ⊞. Any other key is uppercased.
- Write the word as children for keys whose symbol many people don't know: `<Kbd>Esc</Kbd>`, `<Kbd>Tab</Kbd>`. <!-- REVIEW: drafted; source maps these names to symbols without guidance. -->
- To show the plus key itself, use the array form: `keys={["cmd", "+"]}`. A string is split on `+`.
- Show the shortcut the app really binds, for the user's platform.

| Do | Don't |
| --- | --- |
| `keys="cmd+k"` | `<Kbd>Cmd-K</Kbd>` |
| `<Kbd>Esc</Kbd>` | `<Kbd>ESCAPE KEY</Kbd>` |

## 8. Rules

1. Use `keys` for a chord, keys pressed together: one keycap with plus signs. Use `KbdGroup` for a sequence, keys pressed one after another, such as G then I. <!-- REVIEW: follows the docs site ("a sequence of keys, e.g. Vim-style g d"); the KeyGroup story also uses KbdGroup for a chord. -->
2. Use `Shortcut` for its sixteen named actions. Off macOS it swaps ⌘ for ⌃, the Control symbol, not the word "Ctrl"; where your audience expects the word, write it as children (`<Kbd>Ctrl</Kbd>`), because `keys` turns "ctrl" into ⌃ too. <!-- REVIEW: kbd.tsx maps ctrl to ⌃; the docs site says Shortcut renders "Ctrl+S" on Windows/Linux. -->
3. When Kbd repeats a shortcut its control already announces, hide it from assistive tech: `aria-hidden="true"` on Kbd and `aria-keyshortcuts` on the control. <!-- REVIEW: pattern drafted; source sets no ARIA on Kbd. -->
4. Put `KbdGroup` in a flex or block container, never inside a `<p>`: it renders a `div`. Kbd itself is inline and can sit in a sentence.
5. Use `variant` and `size`. `kbdVariants` is a no-op kept for compatibility.
6. Never pass `className` or `style`; they're omitted.

## 9. Dos and don'ts

**Do:** pass key names and let Kbd map them.

```tsx
<Kbd keys={["cmd", "shift", "p"]} />
```

**Don't:** type symbols and separators by hand.

```tsx
<Kbd>⌘ + ⇧ + P</Kbd>
```

**Do:** hide the keycap on a control that exposes the shortcut.

```tsx
<Button type="button" variant="outline" aria-keyshortcuts="Meta+K Control+K" onClick={openMenu}>
  Search
  <Kbd keys="cmd+k" size="sm" variant="ghost" aria-hidden="true" />
</Button>
```

**Don't:** let the symbols become part of the button's name.

```tsx
<Button onClick={openMenu}>
  Search <Kbd keys="cmd+k" />
</Button>
```

## 10. Accessibility

- Role: native `<kbd>`, no ARIA role. `KbdGroup` is a plain `div`.
- Label: its text content. Screen readers read symbols such as ⌘ and ⇧ inconsistently, so where the shortcut matters, say it in words nearby or put `aria-keyshortcuts` on the control it triggers. <!-- REVIEW: drafted; source gives no accessible-name guidance. -->
- Keyboard: not focusable; no interaction.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Platform: `Shortcut` checks `navigator.platform` while rendering. On the server it assumes macOS, so on Windows and Linux the server HTML (⌘) and the client render (⌃) differ. In server-rendered apps, render `Shortcut` only after mount. <!-- REVIEW: instruction drafted; the server default is in kbd.tsx. -->
- Sizing: keycaps grow with their content and are never narrower than they are tall, so single keys stay square.
- Motion: none.

## 12. API

<!-- api:start -->
### Kbd

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `keys` | `string \| string[]` | | Key names; a string is split on `+`. Replaces `children` when set. |
| `variant` | `"default" \| "outline" \| "ghost"` | `"default"` | Keycap style. |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Height, font size and padding. |
| `children` | `ReactNode` | | Shown as written when `keys` isn't set. |
| `ref` | `Ref<HTMLElement>` | | Forwarded to the `<kbd>`. |
| `...props` | `HTMLAttributes<HTMLElement>` without `className`, `style` | | For example `aria-hidden`, `title`. |

### KbdGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | Kbd children. |

### Shortcut

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `shortcut` | `"copy" \| "paste" \| "cut" \| "undo" \| "redo" \| "save" \| "selectAll" \| "find" \| "new" \| "open" \| "close" \| "refresh" \| "print" \| "bold" \| "italic" \| "underline"` | | The action. Each is ⌘ plus a letter; `redo` adds ⇧. |
| `forceCtrl` | `boolean` | `false` | Shows ⌃ instead of ⌘ on macOS too. |
| `variant`, `size` | as Kbd | | |
| `...props` | Kbd props without `keys` | | |

### Helpers

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `KEY_SYMBOLS` | `Record<string, string>` | | Map from lowercase key name to symbol. |
| `formatKey` | `(key: string) => string` | | The symbol for a known name, otherwise the key uppercased. |
| `kbdVariants` | `() => string` | | Returns `""`. Kept for compatibility. |
<!-- api:end -->

## 13. Examples

```tsx
import { Kbd, KbdGroup, Shortcut, Typography } from "@eluan/core";

const row = { display: "contents" } as const;

export function ShortcutList() {
  return (
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        columnGap: "var(--spacing-xl)",
        rowGap: "var(--spacing-sm)",
        margin: 0,
      }}
    >
      <div style={row}>
        <dt><Typography variant="body" as="span">Open the command menu</Typography></dt>
        <dd style={{ margin: 0 }}><Kbd keys="cmd+k" /></dd>
      </div>
      <div style={row}>
        <dt><Typography variant="body" as="span">Save changes</Typography></dt>
        <dd style={{ margin: 0 }}><Shortcut shortcut="save" /></dd>
      </div>
      <div style={row}>
        <dt><Typography variant="body" as="span">Go to inbox</Typography></dt>
        <dd style={{ margin: 0 }}>
          <KbdGroup>
            <Kbd keys="g" />
            <Kbd keys="i" />
          </KbdGroup>
        </dd>
      </div>
      <div style={row}>
        <dt><Typography variant="body" as="span">Close the panel</Typography></dt>
        <dd style={{ margin: 0 }}><Kbd>Esc</Kbd></dd>
      </div>
    </dl>
  );
}
```

## 14. Related components

- [Command](./command.md): uses `CommandShortcut` for hints inside rows; Kbd goes on its trigger.
- [Tooltip](./tooltip.md): a common place to show a control's shortcut.
- [Button](./button.md): a trigger can carry a Kbd hint after its label.
- [CodeBlock](./code-block.md): for code, not keys.
- [Typography](./typography.md): the text around a keycap.

## 15. Common agent mistakes

_Filled from evals._
