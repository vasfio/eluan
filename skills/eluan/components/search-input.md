---
name: SearchInput
use_when: The user types a query to search or filter, in a header, toolbar or above a list; AutocompleteSearch when they pick one result from suggestions.
instead_of: Command for a command palette; Select or MultiSelect for choosing from a fixed list; Input for text that isn't a query.
source: packages/core/src/components/search-input.tsx
---

# SearchInput

## 1. Overview

SearchInput is an [Input](./input.md) with `type="search"`, so Input adds the leading search icon automatically. It adds a clear button, Escape to clear, `onSearch` on Enter, an optional debounced `onSearch` while typing, and a loading spinner. Two siblings ship in the same module: CommandSearch, a search field that ⌘K or Ctrl+K focuses from anywhere, and AutocompleteSearch, a combobox that filters a list of suggestions as the user types.

## 2. When to use

- A site or app search field in the [Header](./header.md) or a toolbar.
- Filtering a table, list or grid on the current page, often with `debounceMs` for search-as-you-type.
- Picking one item from a known set by typing part of its name: an assignee, a project, a file (AutocompleteSearch).

### When not to use

- Text that isn't a query → use [Input](./input.md).
- A command palette that runs actions or navigates → use [Command](./command.md).
- Choosing one value from a short fixed list → use [Select](./select.md). Choosing several → use [MultiSelect](./multi-select.md).
- A free-text query that should run on Enter → use SearchInput, not AutocompleteSearch, which only selects options.

SearchInput earns its place over `<Input type="search">` through the clear button, Escape to clear, `onSearch` with optional debounce, and the loading state. If you only need a field with a search icon, `<Input type="search">` draws the same icon.

## 3. Anatomy

**SearchInput**

1. **Field**: a native `<input type="search">` (role `searchbox`) on Input's surface. The browser's own cancel button is hidden.
2. **Search icon**: added automatically by Input for `type="search"`. Don't add your own.
3. **Clear button**: a delete icon at the trailing edge while the field has a value, named "Clear search".
4. **Loading spinner**: replaces the clear button while `loading`.

**CommandSearch**: the same field and icon, plus a **shortcut hint**: a `<kbd>` showing ⌘ and `shortcutKey` at the trailing edge.

**AutocompleteSearch**

1. **Field**: Input with `role="combobox"` and a search icon.
2. **Clear button** or **loading spinner** at the trailing edge.
3. **Suggestion list**: a floating `listbox` below the field.
4. **Option**: optional icon, a label and an optional one-line description.
5. **Group heading and separator** (with `groupBy`): a muted heading above each group, a line between groups.
6. **Empty message**: `emptyMessage` when nothing matches.
7. **Status**: a visually hidden live region announcing the result count.

## 4. Variants

| Export | Use for |
| --- | --- |
| `SearchInput` | Search and filter fields; runs `onSearch` on Enter or after a debounce. |
| `CommandSearch` | A page-level search field that ⌘K or Ctrl+K focuses. |
| `AutocompleteSearch` | Selecting one option from a filtered suggestion list. |

## 5. Sizes

No size prop. The field is `--size-lg` tall, from Input, and follows density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | `--interactive-bg` surface, `--interactive-border-alt` border, icon and placeholder in `--interactive-fg-alt` | |
| Focus | Border and 1px outline in `--focus-ring`, 1px offset | Never remove or restyle the focus ring. |
| Filled | Clear button at the trailing edge; `--interactive-bg-hover` on hover | SearchInput hides it when `showClearButton={false}`. |
| Loading | Spinner at the trailing edge | SearchInput also disables the field while `loading`, so typing stops and focus is lost. AutocompleteSearch stays editable and shows a spinner in the list too. |
| Disabled | `--interactive-bg-disabled` surface, `--interactive-fg-disabled` text | |
| Open (AutocompleteSearch) | List on `--container-bg` with a border, below the field | The list border uses `--container-border-alt` while other floating panels use `--container-border`, and the group separator inside is the lighter of the two. Don't compensate in app code. <!-- REVIEW: known source drift, filed under W4 in the fix plan (search-input.tsx dropdown border). --> |
| Highlighted option | `--interactive-bg-hover` | Set by arrow keys or pointer hover. |
| Disabled option | `--interactive-bg-disabled` surface, `--interactive-fg-disabled` text | Not selectable. |
| Empty | `emptyMessage` centred in the list | |

<!-- REVIEW: AutocompleteSearch's group heading is one of five different group-label designs across menus; listed under "Decide before coding" in the fix plan. Don't restyle it. -->

## 7. Content guidelines

- Name what is searched in the placeholder and the accessible name: "Search projects", "Filter by name".
- Keep `emptyMessage` specific: "No projects match" rather than an error tone.
- Option labels: the item's name. Descriptions: one short distinguishing detail (owner, path, type).

| Do | Don't |
| --- | --- |
| Search projects | Search... |
| No teammates match | Error: 0 results |
| Ada Lovelace · Design | Ada Lovelace, member of the Design team since 2021 |

<!-- REVIEW: copy guidance is drafted; source defaults are "Search..." and "No results found". -->

## 8. Rules

1. Give every search field an accessible name. In a header or toolbar with no visible label, set `aria-label` ("Search projects"). The placeholder isn't a name.
2. Don't add a search icon. SearchInput and CommandSearch get it from Input's `type="search"`; AutocompleteSearch renders its own.
3. Read the value with `onValueChange`; `onChange` isn't available. Run the search in `onSearch`.
4. Decide what Enter does. With `onSearch` set, Enter calls it and doesn't submit an enclosing form; without `onSearch`, Enter submits the form natively.
5. Set `debounceMs` for search-as-you-type; there's no debounce by default.
6. Don't toggle `loading` on SearchInput while the user is typing; it disables the field. Show progress in the results area instead. <!-- REVIEW: drafted guidance; search-input.tsx passes `disabled={disabled || loading}`. -->
7. Use AutocompleteSearch only for choosing an option. Enter selects the highlighted option and never submits; there's no free-text submit.
8. Use one CommandSearch per page, and don't bind ⌘K to anything else on that page. Each instance adds its own document-level shortcut listener. <!-- REVIEW: drafted; follows from the global keydown listener in source. -->
9. Never pass `className` or `style`; they're dropped. Put width on a wrapper.

## 9. Dos and don'ts

**Do:** name a label-less header search.

```tsx
<SearchInput aria-label="Search projects" placeholder="Search projects" onSearch={runSearch} />
```

**Don't:** rely on the placeholder, or add a second icon.

```tsx
<SearchInput placeholder="Search..." icon={<Search />} />
```

**Do:** debounce search-as-you-type and show progress in the results.

```tsx
<SearchInput aria-label="Filter invoices" debounceMs={300} onSearch={setQuery} />
{isFetching && <Spinner />}
```

**Don't:** set `loading` on every keystroke.

```tsx
<SearchInput onValueChange={(q) => { setLoading(true); fetchResults(q).then(() => setLoading(false)); }} loading={loading} />
```

**Do:** use AutocompleteSearch to pick one item.

```tsx
<AutocompleteSearch aria-label="Assign to" options={teammates} onSelect={(option) => assign(option.value)} />
```

**Don't:** use it for an open query that runs on Enter.

```tsx
<AutocompleteSearch options={recentSearches} onValueChange={setQuery} />
```

## 10. Accessibility

- SearchInput: role `searchbox`. Name from `aria-label`, or a Label tied by `htmlFor`/`id`. Enter runs `onSearch`; Escape clears a non-empty field. The clear button is out of the Tab order (`tabIndex={-1}`); Escape is the keyboard path.
- CommandSearch: role `searchbox`. ⌘K or Ctrl+K (or ⌘/Ctrl plus `shortcutKey`) focuses the field from anywhere on the page. The hint is a `<kbd>` and always shows ⌘, even on Windows and Linux.
- AutocompleteSearch: the field is a `combobox` with `aria-expanded`, `aria-autocomplete="list"` and `aria-controls`; `aria-activedescendant` points at the highlighted option. The list is a `listbox` named "Suggestions" of `option`s with `aria-selected` on the highlighted one; disabled options carry `aria-disabled`. A polite `role="status"` region announces "N results available", "Loading results" or `emptyMessage`. Group headings are visual only.
- AutocompleteSearch keyboard: ArrowDown or ArrowUp opens the list, then moves the highlight and wraps; Enter selects; Escape closes; Tab closes and moves on. Focus stays in the field throughout, and returns to it after a pointer selection.
- Landmark: wrap a site-wide search in `<form role="search">`. <!-- REVIEW: drafted; source adds no landmark. -->
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: fills its container's width. Size it with a wrapper.
- Overflow and truncation: option labels and descriptions stay on one line and truncate with an ellipsis. Keep the distinguishing part at the start.
- Clearing (button or Escape) empties the field, calls `onValueChange("")` and `onClear`, and cancels a pending debounced search.
- CommandSearch doesn't wire SearchInput's behaviour: it drops `onValueChange`, and `onSearch`, `onClear`, `loading`, `showClearButton`, `searchOnEnter` and `debounceMs` do nothing. Read its value with `onInput` or a `ref`. <!-- REVIEW: source bug, not in the fix plan; command-search spreads SearchInputProps straight onto Input. -->
- AutocompleteSearch filtering: by default a case-insensitive substring match on `label`, `value` and `description`, capped at `maxResults`. With `showAllOnFocus`, focusing shows the options before typing. When the server already filtered the results, pass them as `options` with `filterFn={() => true}`.
- AutocompleteSearch selection puts the option's `label` in the field and calls `onValueChange(label)` and `onSelect(option)`.
- AutocompleteSearch's list is positioned under the field inside the component, not in a portal. An ancestor with `overflow: hidden` clips it; give it room. It scrolls when long and closes on a click outside.
- Motion: spinners rotate once per second and stop under reduced motion; colour transitions over 150ms. Don't add your own.

## 12. API

<!-- api:start -->
### SearchInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | | Controlled value. |
| `onValueChange` | `(value: string) => void` | | Fires on every change and on clear. |
| `onSearch` | `(value: string) => void` | | Runs on Enter (with `searchOnEnter`) and after `debounceMs`. |
| `onClear` | `() => void` | | Fires when the clear button or Escape empties the field. |
| `loading` | `boolean` | `false` | Shows a spinner instead of the clear button and disables the field. |
| `showClearButton` | `boolean` | `true` | Shows the clear button while there's a value. |
| `searchOnEnter` | `boolean` | `true` | Enter calls `onSearch` and prevents form submission. |
| `debounceMs` | `number` | | Calls `onSearch` this many ms after typing stops. No debounce when unset. |
| `disabled` | `boolean` | | Disables the field. |
| `...props` | `InputHTMLAttributes` without `className`, `style`, `size`, `type`, `onChange` | | Native attributes: `id`, `name`, `placeholder`, `autoFocus`, `aria-*`. `ref` reaches the `<input>`. |

### CommandSearch

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `shortcutKey` | `string` | `"K"` | The key that, with ⌘ or Ctrl, focuses the field. |
| `showShortcut` | `boolean` | `true` | Shows the ⌘ hint at the trailing edge. |
| `...props` | SearchInput props | | Only native input attributes take effect (see Behaviour). |

### AutocompleteSearch

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `AutocompleteOption[]` | required | The suggestions. |
| `onSelect` | `(option: AutocompleteOption) => void` | | Fires when the user picks an enabled option. |
| `value` | `string` | | Controlled field text. |
| `onValueChange` | `(value: string) => void` | | Fires on typing, selection and clear. |
| `loading` | `boolean` | `false` | Shows spinners in the field and list; the field stays editable. |
| `emptyMessage` | `string` | `"No results found"` | Shown and announced when nothing matches. |
| `filterFn` | `(option: AutocompleteOption, query: string) => boolean` | substring match on label, value, description | Decides which options show for the query. |
| `minChars` | `number` | `0` | Characters needed before filtering applies. |
| `maxResults` | `number` | `10` | Most options shown. |
| `showAllOnFocus` | `boolean` | `true` | Opens with options on focus, before typing. |
| `groupBy` | `(option: AutocompleteOption) => string` | | Groups options under headings. |
| `placeholder` | `string` | `"Search..."` | Field placeholder. |
| `disabled` | `boolean` | | Disables the field. |
| `...props` | `InputHTMLAttributes` without `className`, `style`, `size`, `type`, `onChange`, `onSelect` | | Native attributes: `id`, `name`, `aria-*`. `ref` reaches the `<input>`. |

### AutocompleteOption

| Field | Type | Description |
| --- | --- | --- |
| `value` | `string` | Unique id; also the React key. |
| `label` | `string` | Shown text, and the field text after selection. |
| `description` | `string` | Optional second line, truncated. |
| `icon` | `ReactNode` | Optional leading icon, sized to `--size-xxs`. |
| `disabled` | `boolean` | Shows the option but blocks selection. |
<!-- api:end -->

## 13. Examples

```tsx
import { Header, SearchInput } from "@eluan/core";

export function AppHeader({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <Header
      logo={<span>Northwind</span>}
      items={[
        { label: "Projects", href: "/projects", active: true },
        { label: "Reports", href: "/reports" },
      ]}
      actions={
        <form role="search" onSubmit={(event) => event.preventDefault()}>
          <SearchInput aria-label="Search projects" placeholder="Search projects" onSearch={onSearch} />
        </form>
      }
    />
  );
}
```

```tsx
import { useState } from "react";
import { AutocompleteSearch, Label, type AutocompleteOption } from "@eluan/core";
import { User } from "lucide-react";

const teammates: AutocompleteOption[] = [
  { value: "u_102", label: "Ada Lovelace", description: "Design", icon: <User aria-hidden="true" /> },
  { value: "u_204", label: "Grace Hopper", description: "Platform", icon: <User aria-hidden="true" /> },
  { value: "u_311", label: "Katherine Johnson", description: "Data", icon: <User aria-hidden="true" /> },
  { value: "u_415", label: "Alan Turing", description: "On leave", icon: <User aria-hidden="true" />, disabled: true },
];

export function AssigneeField({ onAssign }: { onAssign: (userId: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <Label htmlFor="assignee">Assignee</Label>
      <AutocompleteSearch
        id="assignee"
        placeholder="Search teammates"
        emptyMessage="No teammates match"
        options={teammates}
        value={query}
        onValueChange={setQuery}
        onSelect={(option) => onAssign(option.value)}
      />
    </div>
  );
}
```

## 14. Related components

- [Input](./input.md): the base field; `type="search"` provides the icon.
- [Command](./command.md): a command palette, for actions rather than search results.
- [MultiSelect](./multi-select.md): choosing several values from a list.
- [Header](./header.md): put a site search in its `actions` slot.
- [Kbd](./kbd.md): keyboard hints elsewhere in the UI.
- [Navigation pattern](../patterns/navigation.md): where search sits in the page chrome.

## 15. Common agent mistakes

_Filled from evals._
