---
name: Command
use_when: A searchable, keyboard-driven list of commands or options, as a Cmd+K palette (CommandDialog), an inline filterable list or a searchable picker in a Popover.
instead_of: Select for a short fixed list; MultiSelect for several choices; SearchInput for a plain search field; DropdownMenu for a few actions behind a button. Eluan has no Combobox; Command is that primitive.
source: packages/core/src/components/command.tsx
---

# Command

## 1. Overview

Command is a filterable, keyboard-first list built on cmdk. Typing in its input filters and ranks the items; arrow keys move a highlight and Enter runs the highlighted item. Use it as a Cmd+K palette inside `CommandDialog`, inline on a surface, or inside a Popover as a searchable picker. Eluan has no separate Combobox: Command is the primitive, and MultiSelect is built from it.

## 2. When to use

- An app-wide command palette for navigation and actions, opened with Cmd/Ctrl+K and a visible trigger (`CommandDialog`).
- A filterable list that is a permanent part of the layout, such as a "Jump to setting" panel (inline `Command`).
- A searchable single-choice picker with many options, in a Popover. <!-- REVIEW: drafted from MultiSelect's internals (multi-select.tsx composes Popover + Command); no story shows a single-choice picker. -->

### When not to use

- A short, fixed list of options in a form → use [Select](./select.md).
- Several choices from a searchable list → use [MultiSelect](./multi-select.md).
- A search field that filters page content, or one that just focuses on Cmd+K → use [SearchInput](./search-input.md) (`SearchInput` or `CommandSearch`).
- Suggestions under a text field as the user types → use [SearchInput](./search-input.md)'s `AutocompleteSearch`. <!-- REVIEW: boundary drafted; source doesn't compare AutocompleteSearch and Command. -->
- A few actions behind a button → use [DropdownMenu](./dropdown-menu.md).

## 3. Anatomy

1. **Root** (`Command`): the container. Inline, it draws a `--container-border` border, `--curves-md` corners and a shadow, and fills its parent.
2. **Input** (`CommandInput`): a search icon and a borderless text input, with a `--container-border` line beneath.
3. **List** (`CommandList`): the scrolling listbox that holds everything below.
4. **Empty** (`CommandEmpty`): text shown only when nothing matches.
5. **Group** (`CommandGroup`): items under an optional `heading`, which renders small, in `--container-fg-alt` at weight 500. <!-- REVIEW: group-label design differs across Select, DropdownMenu, Menubar, ContextMenu, Command and SearchInput; open item under "Decide before coding" in the fix plan. Don't restyle it. -->
6. **Item** (`CommandItem`): one row, with an optional leading icon, the label and an optional shortcut.
7. **Shortcut** (`CommandShortcut`): a muted hint pushed to the end of the row, at `--font-size-xs`.
8. **Separator** (`CommandSeparator`): the shared Separator line between groups, hidden while the user is searching.

## 4. Variants

There's no `variant` prop. Pick the presentation:

| Presentation | Use for |
| --- | --- |
| `CommandDialog` | The Cmd+K palette. A modal Dialog with a visually hidden title and description; the inner Command drops its own border and uses roomier rows. |
| Inline `Command` | A palette on the page or inside a Popover. Draws its own border and shadow. |
| `Dialog` with `DialogContent layout="command"` | What CommandDialog is built from: no padding and no close button. Compose it yourself only when you need Command props that CommandDialog doesn't pass through (`shouldFilter`, `filter`, `loop`, `label`, `value`). The inner Command then keeps its own border and the compact row padding. <!-- REVIEW: dialog.tsx and command.tsx verified; when to compose by hand is drafted, and the scale context that removes the border isn't exported. --> |

`CommandSearch` in [SearchInput](./search-input.md) is not part of Command: it is an Input with a Cmd+K hint that focuses itself on Cmd/Ctrl+K, with no list.

`CommandEmpty` has a `tone`: `default`, or `muted` (`--interactive-fg-alt`, less padding) for a compact picker.

## 5. Sizes

No size prop.

| Setting | Use in |
| --- | --- |
| `CommandInput density="default"` | Palettes and inline lists (`--size-xl` tall). |
| `CommandInput density="compact"` | A picker inside a Popover (`--size-lg`), as MultiSelect does. |

Inside `CommandDialog`, rows pad with `--spacing-sm` instead of `--spacing-xs` and the search icon grows from `--size-xxs` to `--size-xs`.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Rows in `--interactive-fg` | |
| Highlighted | The row under the keyboard cursor or pointer fills with `--interactive-bg-selected` and its text turns `--interactive-fg-selected` | cmdk calls this "selected" (`aria-selected`, `data-selected`). Moving the pointer over a row highlights it; there is no separate hover style. The CommandShortcut keeps `--container-fg-alt` and goes dark on the dark row; don't recolour it, and keep the full action name in the row so it reads without the hint. <!-- REVIEW: known source bug W2 #6 in the fix plan (styles.shortcut is never re-coloured for [data-selected=true]). --> |
| Chosen | Weight 500 in `--interactive-fg` | Eluan's `selected` prop: the current value in a picker. It is visual only, with no ARIA state; add a Check icon as MultiSelect does. Not the same as Highlighted. |
| Focus | Focus stays in the input; the input draws no outline | Never remove or restyle the focus ring. The caret and the highlighted row show where the user is; don't add an outline to rows. <!-- REVIEW: CommandInput sets outline-style none with no focus-visible style; not in the fix plan. --> |
| Disabled item | `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text, no pointer events | Arrow keys skip it. |
| Empty | CommandEmpty text, centred | Only rendered when no item matches. |
| Loading | No built-in loading state | For results fetched as the user types, show a [Spinner](./spinner.md) in CommandEmpty's place. <!-- REVIEW: composition drafted; cmdk's Loading part isn't exported. --> |

## 7. Content guidelines

- Write items as the page name or a verb phrase: "Settings", "New project", "Invite teammate". Sentence case.
- Write group headings as short nouns: "Go to", "Actions", "Recent".
- Write the placeholder as what can be searched: "Search pages and actions".
- Write the empty text as a plain statement: "No pages or actions match."
- Pass `title` and `description` to CommandDialog in sentence case; the defaults are "Command Menu" and "Search for a command to run."
- Write shortcut hints with symbols, matching what the app actually binds: "⌘P", "⌘,".

| Do | Don't |
| --- | --- |
| New project | Click to create a new project |
| No pages or actions match. | Oops! Nothing here |
| Go to | NAVIGATION |

## 8. Rules

1. Use `CommandDialog` for a Cmd+K palette. Bind Cmd/Ctrl+K yourself on `document`, and give it a visible trigger Button as well.
2. Put every item inside `CommandList`, with `CommandEmpty` first in the list.
3. Give every `CommandItem` a unique `value`. Without one, cmdk infers it from the row's text, shortcut hint included, and items with the same value highlight together. Add `keywords` for synonyms.
4. Run the item's action in `onSelect`. Enter and click both call it; an `onClick` on CommandItem is overwritten.
5. Close the dialog in `onSelect` when the item navigates or opens something else.
6. Use the `selected` prop only to mark the current value in a picker, with a Check icon. Never use it to show the highlight; cmdk handles that.
7. Use `CommandShortcut` for shortcut hints inside items, and [Kbd](./kbd.md) everywhere else. <!-- REVIEW: drafted; source doesn't say whether Kbd belongs in Command rows. -->
8. Don't wrap an inline Command in another bordered or shadowed box; it draws its own.
9. Never pass `className` or `style`; they're omitted. Use a wrapper for width and height.

## 9. Dos and don'ts

**Do:** name items with a value, and act in `onSelect`.

```tsx
<CommandItem value="Billing" keywords={["invoices", "payment"]} onSelect={() => run(() => navigate("/billing"))}>
  Billing
  <CommandShortcut>⌘B</CommandShortcut>
</CommandItem>
```

**Don't:** use `onClick` or leave values to be guessed from text.

```tsx
<CommandItem onClick={() => navigate("/billing")}>
  Billing <CommandShortcut>⌘B</CommandShortcut>
</CommandItem>
```

**Do:** build a searchable picker from Popover and Command, marking the chosen value.

```tsx
<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button id="time-zone" type="button" variant={zone ? "input" : "inputMuted"} fullWidth align="start" textAlign="left">
      {zone ?? "Choose a time zone"}
    </Button>
  </PopoverTrigger>
  <PopoverContent layout="matchTrigger" align="start">
    <Command label="Time zones">
      <CommandInput placeholder="Search time zones" density="compact" />
      <CommandList>
        <CommandEmpty tone="muted">No time zones match.</CommandEmpty>
        <CommandGroup>
          {zones.map((name) => (
            <CommandItem key={name} value={name} selected={name === zone} onSelect={() => { setZone(name); setOpen(false); }}>
              {name}
              {name === zone && <Check aria-hidden="true" style={{ marginLeft: "auto", width: "var(--size-xxs)", height: "var(--size-xxs)" }} />}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
```

**Don't:** hand-roll a filtered list with an Input and buttons.

```tsx
<Input value={query} onChange={(e) => setQuery(e.target.value)} />
{zones.filter((z) => z.includes(query)).map((z) => <button key={z} onClick={() => setZone(z)}>{z}</button>)}
```

## 10. Accessibility

- Role: the input is a `combobox` with `aria-expanded`, `aria-controls` and `aria-activedescendant`; the list is a `listbox`; items are `option`s, with `aria-selected` on the highlighted one; groups are `group`s named by their heading; separators are `separator`s.
- Label: the input is labelled by Command's visually hidden `label`; set it on an inline Command. CommandDialog doesn't pass one, so give its CommandInput a descriptive placeholder and an `aria-label`. The listbox is named "Suggestions" unless you pass CommandList `label`. CommandDialog's `title` names the dialog. <!-- REVIEW: fallback drafted; cmdk sets aria-labelledby to an empty label when Command has no `label`. -->
- Keyboard: Down and Up move the highlight (wrapping only with `loop`); Home and End jump to the first and last item; Alt with Down or Up jumps between groups; Enter runs the highlighted item; Ctrl+N or Ctrl+J and Ctrl+P or Ctrl+K also move down and up. Escape closes CommandDialog. Typing filters.
- Focus: focus stays in the input while the highlight moves. CommandDialog traps focus, focuses the input on open and puts focus back where it was on close. Inline Command doesn't trap focus.
- Contrast: handled by the theme. Don't override colours, including the shortcut hint on the highlighted row (States).

## 11. Behaviour

- Filtering: items are filtered and ranked by match score as the user types. Groups with no matches hide, separators hide while there's a query, and CommandEmpty shows when nothing matches. Set `shouldFilter={false}` on Command to filter the items yourself.
- Responsive: inline Command fills the width and height of its parent; constrain it with a wrapper. CommandDialog takes the Dialog's width.
- Overflow: CommandList has a fixed maximum height and scrolls; the highlighted item scrolls into view.
- Motion: none of its own; CommandDialog uses the Dialog's. Don't add any.

## 12. API

<!-- api:start -->
### Command

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | | Visually hidden label for the input. |
| `shouldFilter` | `boolean` | `true` | Set `false` to filter and sort items yourself. |
| `filter` | `(value: string, search: string, keywords?: string[]) => number` | cmdk's scorer | Match score from 0 (hidden) to 1 (best). |
| `value` | `string` | | Controlled value of the highlighted item. |
| `defaultValue` | `string` | | Initially highlighted item. |
| `onValueChange` | `(value: string) => void` | | Called when the highlight moves. |
| `loop` | `boolean` | `false` | Arrow keys wrap around. |
| `vimBindings` | `boolean` | `true` | Ctrl+N/J/P/K navigation. |
| `disablePointerSelection` | `boolean` | `false` | Stops the pointer moving the highlight. |
| `...props` | cmdk `Command` (div attributes) without `className`, `style` | | |

### CommandDialog

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | | Controlled open state. |
| `onOpenChange` | `(open: boolean) => void` | | Called on open and close. |
| `defaultOpen` | `boolean` | | Initial state when uncontrolled. |
| `title` | `string` | `"Command Menu"` | Visually hidden dialog title. |
| `description` | `string` | `"Search for a command to run."` | Visually hidden dialog description. |
| `...props` | Radix `Dialog` root props | | `modal` and the rest. Command props are not passed to the inner Command. |

### CommandInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `density` | `"default" \| "compact"` | `"default"` | Input height: `--size-xl` or `--size-lg`. |
| `value` | `string` | | Controlled search text. |
| `onValueChange` | `(search: string) => void` | | Called as the search text changes. |
| `placeholder` | `string` | | Hint for what can be searched. |
| `...props` | cmdk `Command.Input` (input attributes) without `className`, `size`, `style` | | |

### CommandList

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `"Suggestions"` | Accessible name of the listbox. |
| `...props` | cmdk `Command.List` without `className`, `style` | | |

### CommandEmpty

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `"default" \| "muted"` | `"default"` | `muted` uses `--interactive-fg-alt` and less padding. |
| `...props` | cmdk `Command.Empty` without `className`, `style` | | |

### CommandGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` | `ReactNode` | | Group label; also names the group. |
| `value` | `string` | | Group identity. |
| `forceMount` | `boolean` | | Keeps the group rendered when nothing in it matches. |
| `...props` | cmdk `Command.Group` without `className`, `style` | | |

### CommandItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onSelect` | `(value: string) => void` | | Runs on Enter or click. |
| `value` | `string` | the row's text | Unique identity used for filtering and the highlight. |
| `keywords` | `string[]` | | Extra terms that match this item. |
| `disabled` | `boolean` | `false` | Skipped by the keyboard and the pointer. |
| `selected` | `boolean` | `false` | Eluan: marks the current value (weight 500). Not the highlight. |
| `forceMount` | `boolean` | | Keeps the item rendered when it doesn't match. |
| `...props` | cmdk `Command.Item` without `className`, `style` | | `onClick` is overwritten; use `onSelect`. |

### CommandShortcut

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLSpanElement>` without `className`, `style` | | The hint text as children. |

### CommandSeparator

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `alwaysRender` | `boolean` | `false` | Keeps the line visible while searching. |
<!-- api:end -->

## 13. Examples

```tsx
import * as React from "react";
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Kbd,
} from "@eluan/core";
import { FilePlus, FolderOpen, Settings, Users } from "lucide-react";

const icon = { width: "var(--size-xxs)", height: "var(--size-xxs)" };

export function AppCommandMenu({
  navigate,
  createProject,
}: {
  navigate: (path: string) => void;
  createProject: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = (action: () => void) => {
    setOpen(false);
    action();
  };

  return (
    <>
      <Button type="button" variant="outline" aria-keyshortcuts="Meta+K Control+K" onClick={() => setOpen(true)}>
        Search
        <Kbd keys="cmd+k" size="sm" variant="ghost" aria-hidden="true" />
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command menu"
        description="Search for a page or an action."
      >
        <CommandInput placeholder="Search pages and actions" aria-label="Search pages and actions" />
        <CommandList>
          <CommandEmpty>No pages or actions match.</CommandEmpty>
          <CommandGroup heading="Go to">
            <CommandItem value="Projects" onSelect={() => run(() => navigate("/projects"))}>
              <FolderOpen aria-hidden="true" style={icon} />
              Projects
            </CommandItem>
            <CommandItem value="Team members" keywords={["people", "users"]} onSelect={() => run(() => navigate("/team"))}>
              <Users aria-hidden="true" style={icon} />
              Team members
            </CommandItem>
            <CommandItem value="Settings" onSelect={() => run(() => navigate("/settings"))}>
              <Settings aria-hidden="true" style={icon} />
              Settings
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem value="New project" onSelect={() => run(createProject)}>
              <FilePlus aria-hidden="true" style={icon} />
              New project
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
```

## 14. Related components

- [Dialog](./dialog.md): CommandDialog is a Dialog with `layout="command"`.
- [SearchInput](./search-input.md): plain search fields, `CommandSearch` (focus on Cmd+K, no list) and `AutocompleteSearch`.
- [MultiSelect](./multi-select.md): a searchable multi-choice picker built from Command in a Popover.
- [Popover](./popover.md): the surface for a searchable picker.
- [Kbd](./kbd.md): shortcut keycaps outside Command rows, such as on the trigger Button.
- [DropdownMenu](./dropdown-menu.md): a short menu of actions without search.

## 15. Common agent mistakes

_Filled from evals._
