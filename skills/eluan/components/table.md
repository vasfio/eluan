---
name: Table
use_when: Showing items the user compares across the same attributes, such as users, invoices or plan features.
instead_of: Card for items browsed on their own; TreeView for hierarchical data; your own grid of divs for tabular data.
source: packages/core/src/components/table.tsx
---

# Table

## 1. Overview

Table is a set of styled native table elements: `<table>` inside a horizontally scrolling wrapper, plus header, body, footer, row, head cell, data cell and caption parts. It has no data model, sorting, selection logic or pagination; you render the rows and own the state.

## 2. When to use

- A list of records with the same fields that users scan and compare: users, invoices, deployments.
- A feature comparison across plans, with the feature names in the first column and the recommended plan's column highlighted.
- Totals under a list of figures (TableFooter).
- A list with row actions or row selection, composed with [DropdownMenu](./dropdown-menu.md) and [Checkbox](./checkbox.md).

### When not to use

- Items that stand alone and are browsed (projects, articles), or a few plans to choose from → use [Card](./card.md) in a grid.
- Hierarchical data (folders, org charts) → use [TreeView](./tree-view.md).
- Page or form layout → use your own flex or grid wrapper; see [page-layout.md](../patterns/page-layout.md).
- No rows yet → follow [empty-states.md](../patterns/empty-states.md) instead of an empty table.
- Many pages of rows → keep Table and add [Pagination](./pagination.md) below it.

## 3. Anatomy

1. **Table**: a full-width wrapper `<div>` with `overflow: auto`, holding the `<table>`. Text is `--font-size-sm`. The ref and your props go to the `<table>`.
2. **TableCaption** (optional): a `<caption>`, shown below the table in muted text. Names the table for assistive tech.
3. **TableHeader**: the `<thead>`.
4. **TableBody**: the `<tbody>`.
5. **TableFooter** (optional): the `<tfoot>`, on `--container-bg-alt` with a top border and medium weight. For totals.
6. **TableRow**: a `<tr>` with a bottom border, a hover background and a selected style.
7. **TableHead**: a `<th>` header cell, `--size-xl` tall, muted medium-weight text.
8. **TableCell**: a `<td>` data cell, padded `--spacing-md`.

## 4. Variants

Table has no `variant` prop. Cell props control the look:

| Prop | On | Use for |
| --- | --- | --- |
| `align="center"` | TableHead, TableCell | Short centred values: check marks, icons, status dots in a comparison table. |
| `highlighted` | TableHead, TableCell | The recommended plan's column in a comparison table (`--interactive-bg-alt2` background). Set it on every cell in that column. |
| `weight="medium"` | TableCell | The identifying column of each row: invoice number, user name. |
| `width="feature"` | TableHead | The feature-name column of a comparison table (fixed wider column). |

<!-- REVIEW: "Use for" is drafted from the prop names and styles; source has no usage notes. The stories use weight="medium" on the invoice column. -->

There is no right or end alignment. For numbers, wrap the cell content in `<div style={{ textAlign: "right" }}>`, as the stories do.

## 5. Sizes

Table has no size prop. Header cells are `--size-xl` tall and data cells pad `--spacing-md`; both scale with density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Rows separated by a `--container-border` line | |
| Hover | Row background `--interactive-bg-hover` | Every TableRow hovers, including header and footer rows. |
| Selected | Set `data-state="selected"` on TableRow: `--interactive-bg-selected` background with `--interactive-fg-selected` text | In the default theme this is a near-black band, and a Badge inside keeps its pale fill. Convey selection with a checked [Checkbox](./checkbox.md) in the row as well, never by colour alone. <!-- REVIEW: "Decide before coding" item in the fix plan: the selection token reads well on a checkbox but heavy at row scale; may need a row-scale selection token. --> |
| Focus | Table parts aren't focusable | Buttons, checkboxes and links inside cells show their own focus ring. Never remove or restyle the focus ring. |

## 7. Content guidelines

- Write header labels as short nouns in sentence case: "Name", "Last active", "Amount".
- Put units in the header, not in every cell: "Storage (GB)".
- Keep one format per column: same date format, same decimal places, same currency.
- Put the identifying column first and give it `weight="medium"`.
- Show an em dash for a missing value rather than leaving the cell blank.
- Write the caption as a sentence that says what the rows are: "Invoices from the last 30 days."

| Do | Don't |
| --- | --- |
| Last active | LAST ACTIVE DATE/TIME |
| Amount | $ |
| Invoices from the last 30 days. | Table 1 |

<!-- REVIEW: content guidance drafted; source gives no copy rules for Table. -->

## 8. Rules

1. Give every table a name: a TableCaption, or `aria-label` on Table when the caption would repeat a visible heading.
2. Put header cells in TableHeader as TableHead, never as bold TableCells.
3. Table has no sorting. To sort, put a ghost Button inside the TableHead, set `aria-sort` on that TableHead, and sort the data yourself (see Examples). <!-- REVIEW: no sorting in source; composition drafted for eval t09. -->
4. Put row actions in the last column, behind one [DropdownMenu](./dropdown-menu.md) trigger Button (`variant="ghost"`, `size="iconSm"`) with an `aria-label` naming the row.
5. For a recommended plan in a comparison table, set `highlighted` on that column's TableHead and every TableCell in it. Don't put a primary Button in each column.
6. Don't use Table for layout.
7. Never pass `className` or `style`; they're dropped. Align numbers with a wrapper `<div>` inside the cell.

## 9. Dos and don'ts

**Do:** name the table and keep headers in TableHead.

```tsx
<Table>
  <TableCaption>Invoices from the last 30 days.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell weight="medium">INV-1042</TableCell>
      <TableCell>Paid</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**Don't:** fake headers with bold cells or leave the table unnamed.

```tsx
<Table>
  <TableBody>
    <TableRow>
      <TableCell weight="medium">Invoice</TableCell>
      <TableCell weight="medium">Status</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**Do:** align figures with a wrapper inside the cell.

```tsx
<TableCell>
  <div style={{ textAlign: "right" }}>$1,750.00</div>
</TableCell>
```

**Don't:** style the cell itself.

```tsx
<TableCell style={{ textAlign: "right", color: "#666" }}>$1,750.00</TableCell>
```

## 10. Accessibility

- Role: native `table`, with `columnheader` for TableHead and `cell` for TableCell (asserted in tests).
- Label: TableCaption names the table; or pass `aria-label` to Table.
- Keyboard: the table itself takes no focus. Tab moves through interactive content in cells (sort Buttons, checkboxes, menu triggers). Wide tables scroll inside the wrapper, which isn't focusable, so a keyboard user can only scroll it by tabbing to something inside. <!-- REVIEW: wrapper has overflow auto but no tabIndex or role; consider making it a focusable region. -->
- Sorting: set `aria-sort="ascending"`, `"descending"` or `"none"` on the sortable TableHead, and keep the Button label as the column name.
- Selection: `aria-selected` isn't valid on rows of a plain table. Use a Checkbox per row labelled with the row's name, plus a header Checkbox labelled "Select all". Cells holding a checkbox lose their end padding automatically.
- Focus: interactive children keep their own focus rings.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: Table is full width. When columns don't fit, the wrapper scrolls horizontally; the page doesn't. Drop low-priority columns on narrow screens rather than squeezing them. <!-- REVIEW: column-dropping advice drafted. -->
- Overflow and truncation: cells wrap by default. Keep identifiers short; nothing truncates.
- Motion: row colours transition over 150ms. Don't add your own.

## 12. API

<!-- api:start -->
### Table

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | `string` | | Names the table when there's no TableCaption. |
| `...props` | `HTMLAttributes<HTMLTableElement>` without `className`, `style` | | Native table attributes. The ref goes to the `<table>`, not the scroll wrapper. |

### TableHeader, TableBody, TableFooter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLTableSectionElement>` without `className`, `style` | | Renders `<thead>`, `<tbody>` or `<tfoot>`. |

### TableRow

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data-state` | `"selected"` | | Applies the selected row style. |
| `...props` | `HTMLAttributes<HTMLTableRowElement>` without `className`, `style` | | Native row attributes. |

### TableHead

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"left" \| "center"` | `"left"` | Text alignment. |
| `highlighted` | `boolean` | `false` | Highlights the column with `--interactive-bg-alt2`. |
| `width` | `"auto" \| "feature"` | `"auto"` | `"feature"` fixes a wider first column for comparison tables. |
| `aria-sort` | `"ascending" \| "descending" \| "none" \| "other"` | | Set on sortable columns. |
| `...props` | `ThHTMLAttributes` without `className`, `style` | | Native `<th>` attributes: `scope`, `colSpan`. |

### TableCell

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"left" \| "center"` | `"left"` | Text alignment. |
| `highlighted` | `boolean` | `false` | Highlights the column with `--interactive-bg-alt2`. |
| `weight` | `"normal" \| "medium"` | `"normal"` | `"medium"` for the identifying column. |
| `...props` | `TdHTMLAttributes` without `className`, `style` | | Native `<td>` attributes: `colSpan`, `rowSpan`. |

### TableCaption

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLTableCaptionElement>` without `className`, `style` | | Renders `<caption>` below the table. |
<!-- api:end -->

## 13. Examples

A users table with sortable columns, row selection and a row action menu (eval t09).

```tsx
import * as React from "react";
import {
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@eluan/core";
import { ArrowDown, ArrowUp, ArrowUpDown, Ellipsis } from "lucide-react";

type User = { id: string; name: string; email: string; role: string; lastActive: string; active: boolean };
type SortKey = "name" | "lastActive";

const users: User[] = [
  { id: "u1", name: "Ana Lima", email: "ana@northwind.io", role: "Owner", lastActive: "2026-10-26", active: true },
  { id: "u2", name: "Ben Okafor", email: "ben@northwind.io", role: "Admin", lastActive: "2026-10-21", active: true },
  { id: "u3", name: "Chloe Martin", email: "chloe@northwind.io", role: "Member", lastActive: "2026-09-30", active: false },
];

const iconStyle = { width: "var(--size-xxs)", height: "var(--size-xxs)" };

function SortButton({ label, active, direction, onClick }: { label: string; active: boolean; direction: "ascending" | "descending"; onClick: () => void }) {
  const Icon = !active ? ArrowUpDown : direction === "ascending" ? ArrowUp : ArrowDown;
  return (
    <Button type="button" variant="ghost" size="sm" onClick={onClick}>
      {label}
      <Icon aria-hidden="true" style={iconStyle} />
    </Button>
  );
}

export function UsersTable() {
  const [sort, setSort] = React.useState<{ key: SortKey; direction: "ascending" | "descending" }>({ key: "name", direction: "ascending" });
  const [selected, setSelected] = React.useState<string[]>([]);

  const rows = [...users].sort((a, b) => {
    const order = a[sort.key].localeCompare(b[sort.key]);
    return sort.direction === "ascending" ? order : -order;
  });

  const toggleSort = (key: SortKey) =>
    setSort((s) => ({ key, direction: s.key === key && s.direction === "ascending" ? "descending" : "ascending" }));
  const ariaSort = (key: SortKey) => (sort.key === key ? sort.direction : "none");
  const allSelected = selected.length === users.length;

  return (
    <Table>
      <TableCaption>People with access to the Northwind workspace.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              aria-label="Select all"
              checked={allSelected}
              onCheckedChange={() => setSelected(allSelected ? [] : users.map((u) => u.id))}
            />
          </TableHead>
          <TableHead aria-sort={ariaSort("name")}>
            <SortButton label="Name" active={sort.key === "name"} direction={sort.direction} onClick={() => toggleSort("name")} />
          </TableHead>
          <TableHead>Role</TableHead>
          <TableHead aria-sort={ariaSort("lastActive")}>
            <SortButton label="Last active" active={sort.key === "lastActive"} direction={sort.direction} onClick={() => toggleSort("lastActive")} />
          </TableHead>
          <TableHead>Status</TableHead>
          <TableHead aria-label="Actions" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((user) => {
          const isSelected = selected.includes(user.id);
          return (
            <TableRow key={user.id} data-state={isSelected ? "selected" : undefined}>
              <TableCell>
                <Checkbox
                  aria-label={`Select ${user.name}`}
                  checked={isSelected}
                  onCheckedChange={(checked) =>
                    setSelected((ids) => (checked ? [...ids, user.id] : ids.filter((id) => id !== user.id)))
                  }
                />
              </TableCell>
              <TableCell weight="medium">
                {user.name}
                <div style={{ color: "var(--container-fg-alt)" }}>{user.email}</div>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.lastActive}</TableCell>
              <TableCell>
                <Badge variant={user.active ? "positive" : "secondary"}>{user.active ? "Active" : "Suspended"}</Badge>
              </TableCell>
              <TableCell>
                <div style={{ textAlign: "right" }}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" variant="ghost" size="iconSm" aria-label={`Actions for ${user.name}`}>
                        <Ellipsis aria-hidden="true" style={iconStyle} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Change role</DropdownMenuItem>
                      <DropdownMenuItem>Resend invite</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem tone="destructive">Remove from workspace</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
```

## 14. Related components

- [Card](./card.md): browse standalone items instead of comparing them.
- [Checkbox](./checkbox.md): row selection and "Select all".
- [DropdownMenu](./dropdown-menu.md): the row action menu.
- [Pagination](./pagination.md): split long tables into pages.
- [Badge](./badge.md): status values in a cell.
- [Button](./button.md): sortable header controls (`ghost`, `sm`).

## 15. Common agent mistakes

_Filled from evals._
