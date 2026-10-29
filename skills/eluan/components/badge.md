---
name: Badge
use_when: Labelling the status or category of an item, such as Active, Draft, Failed or Beta.
instead_of: Toast or Banner for messages; Avatar's AvatarStatus for presence; Button or Toggle for anything clickable; Progress, Spinner or Skeleton for loading.
source: packages/core/src/components/badge.tsx
---

# Badge

## 1. Overview

Badge is a small inline label for the status or category of an item. It renders a `<span>` in eight variants and two sizes: a text label (`default`) and a bare status dot (`microdot`). It can carry a remove button. Badge labels something; it isn't a message and it isn't a button.

## 2. When to use

- The status of a row, card or record: Active, Draft, Paid, Failed.
- A category or attribute tag: Beta, Admin, Pro.
- A count or "New" marker next to a label.
- A removable filter tag, with `onRemove`.
- A small status dot next to a text label, with `size="microdot"`.

### When not to use

- Telling the user something happened → use [Toast](./toast.md) or [Banner](./banner.md).
- Online or away status on an avatar → use [Avatar](./avatar.md) `AvatarStatus` or `AvatarWithStatus`.
- Picking several values in a field → use [MultiSelect](./multi-select.md).
- Anything clickable → use [Button](./button.md) or [Toggle](./toggle.md).
- Progress with a known amount → use [Progress](./progress.md).
- Work in progress → use [Spinner](./spinner.md); content loading into a layout → use [Skeleton](./skeleton.md).
- A keyboard shortcut → use [Kbd](./kbd.md).

## 3. Anatomy

1. **Container**: the `<span>`; inline-flex, `--curves-md` corners, 1px border (transparent except for `outline`).
2. **Label**: the text child, at `--font-size-xs`.
3. **Remove button** (optional): an X icon button named "Remove", shown when `removable` or `onRemove` is set.

At `size="microdot"` the container is the whole badge: a filled circle. Children and the remove button aren't rendered.

## 4. Variants

| Variant | Use for |
| --- | --- |
| `default` | High-emphasis labels in primary colours: New, a count. |
| `secondary` | Neutral, low-emphasis tags and categories. |
| `outline` | The quietest label, bordered with no fill: metadata. |
| `positive` | Healthy or done: Active, Paid, Passing. |
| `caution` | Needs attention soon: Expiring, Pending review. |
| `destructive` | Failed or blocked: Failed, Overdue. |
| `informative` | Neutral status: Scheduled, In progress. |
| `important` | Emphasis that isn't a warning: Beta, Pro, Featured. |

<!-- REVIEW: "Use for" text is drafted from each variant's tokens; source and docs give no per-variant usage guidance. -->

## 5. Sizes

| Size | Use in |
| --- | --- |
| `default` | Every text badge. |
| `microdot` | A status dot beside a text label. A circle `--spacing-sm` plus `--spacing-xxs` across, ringed in `--container-bg`. Renders no text. |

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Variant colours | |
| Hover | Only the remove button changes: 60% to full opacity | |
| Focus | Remove button: 1px outline in `--focus-ring`, 1px offset, at full opacity | Never remove or restyle the focus ring. Don't add `tabIndex` to badges. |
| Microdot | Filled circle with a ring | `variant="outline"` at this size has no fill and no border, so nothing shows. Use a filled variant. <!-- REVIEW: W2 #7 in the fix plan. --> |

## 7. Content guidelines

- Use one or two words that name the state or category: "Active", "Past due", "Beta".
- Use sentence case. Don't write in capitals.
- Use the same word for the same status everywhere in the product, with the same variant.
- Name the status in words. Colour alone doesn't tell everyone what it means.

| Do | Don't |
| --- | --- |
| Active | ● (a dot with no text) |
| Past due | PAST DUE!! |
| Draft | Not yet published to the workspace |
| 3 new | Click to view |

<!-- REVIEW: copy guidance drafted; docs and stories show single-word labels only. -->

## 8. Rules

1. Use Badge to label an item. Never use it as a message or give it an `onClick`; it isn't focusable or keyboard-operable.
2. Say the status in words. A `microdot` must sit next to visible text that names the status.
3. Map each status to one variant and keep it consistent: if Failed is `destructive` in one table, it's `destructive` everywhere.
4. Use a filled variant with `size="microdot"`; `outline` renders nothing at that size.
5. Pass `onRemove` whenever a badge is removable. `removable` alone renders a remove button that does nothing.
6. Never pass `className` or `style`; they're dropped. Put spacing on the parent with `gap`.

<!-- REVIEW: rules 1 and 3 drafted; Badge renders a plain span with no interactive behaviour of its own. -->

## 9. Dos and don'ts

**Do:** label a record's status in words, with the matching tone.

```tsx
<Badge variant="positive">Paid</Badge>
<Badge variant="destructive">Overdue</Badge>
```

**Don't:** make a badge clickable or let colour carry the meaning.

```tsx
<Badge onClick={() => openInvoice(id)}>View</Badge>
<Badge variant="positive" size="microdot" />
```

**Do:** pair a microdot with a visible label and hide the dot.

```tsx
<span style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-xs)" }}>
  <Badge variant="positive" size="microdot" aria-hidden="true" />
  Operational
</span>
```

**Don't:** use an outline microdot; it renders nothing.

```tsx
<Badge variant="outline" size="microdot" />
```

## 10. Accessibility

- Role: none. The `<span>` text is read inline with its surroundings.
- Label: the children. A `microdot` has no text, so put the status in visible text next to it and mark the dot `aria-hidden="true"`.
- Remove button: a native `<button>` named "Remove". The name doesn't include the badge's text and can't be changed, so several removable badges all read as "Remove". Keep removable badges next to a heading or label that names the set, or use [MultiSelect](./multi-select.md) for a multi-value field. <!-- REVIEW: source issue, not in the fix plan; badge.tsx hardcodes aria-label="Remove" on the inner button and spreads props onto the span. -->
- Keyboard: Tab reaches the remove button; Enter and Space activate it. Its click doesn't bubble to a parent row.
- Focus: the remove button currently shows no focus indicator (see States).
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: Badge sizes to its content and sits inline with text.
- Overflow and truncation: Badge doesn't set `white-space`, so a long label wraps inside a narrow container. Keep labels short.
- Motion: colours transition over 150ms. Don't add your own.
- The remove button stops click propagation, so removing a badge inside a clickable row doesn't also open the row.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "secondary" \| "outline" \| "positive" \| "caution" \| "destructive" \| "informative" \| "important"` | `"default"` | Visual style. |
| `size` | `"default" \| "microdot"` | `"default"` | `"microdot"` renders a status dot with no text. |
| `removable` | `boolean` | | Shows the remove button. Pair it with `onRemove`. |
| `onRemove` | `() => void` | | Called when the remove button is clicked. Also shows the button. |
| `...props` | `HTMLAttributes<HTMLSpanElement>` without `className`, `style` | | `id`, `aria-*`, `title`. Badge isn't wrapped in `forwardRef`. |
<!-- api:end -->

## 13. Examples

```tsx
import { Badge } from "@eluan/core";

type InvoiceStatus = "paid" | "pending" | "overdue" | "draft";

const statusBadge: Record<InvoiceStatus, { label: string; variant: "positive" | "caution" | "destructive" | "secondary" }> = {
  paid: { label: "Paid", variant: "positive" },
  pending: { label: "Pending", variant: "caution" },
  overdue: { label: "Overdue", variant: "destructive" },
  draft: { label: "Draft", variant: "secondary" },
};

export function InvoiceStatusCell({ status }: { status: InvoiceStatus }) {
  const { label, variant } = statusBadge[status];
  return <Badge variant={variant}>{label}</Badge>;
}

export function ServiceStatus({ healthy }: { healthy: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-xs)", color: "var(--container-fg-alt)" }}>
      <Badge variant={healthy ? "positive" : "destructive"} size="microdot" aria-hidden="true" />
      {healthy ? "Operational" : "Outage"}
    </span>
  );
}
```

## 14. Related components

- [Banner](./banner.md) and [Toast](./toast.md): messages, not labels.
- [Avatar](./avatar.md): `AvatarStatus` for presence on a person.
- [MultiSelect](./multi-select.md): removable chips inside a field.
- [Table](./table.md): status columns usually hold a Badge.
- [Progress](./progress.md), [Spinner](./spinner.md), [Skeleton](./skeleton.md): progress and loading.

## 15. Common agent mistakes

_Filled from evals._
