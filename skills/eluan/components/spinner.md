---
name: Spinner
use_when: Showing that something is working when you can't say how long it will take, such as a button action or a panel refreshing.
instead_of: Progress when the amount is known; Skeleton when content loads into a known layout.
source: packages/core/src/components/spinner.tsx
---

# Spinner

## 1. Overview

Spinner is a rotating ring that shows work in progress. It renders a `<div role="status">` named "Loading", with visually hidden "Loading..." text inside. It draws in the current text colour and comes in four sizes.

## 2. When to use

- Inside a Button while its action runs, before the label.
- A region refreshing in place: a table reloading after a filter change, a card fetching new data.
- A short wait where you don't know the shape of what's coming.

### When not to use

- You know how far along the work is → use [Progress](./progress.md).
- Content is loading into a known layout (a list, card grid or table on first load) → use [Skeleton](./skeleton.md). Don't put a lone Spinner in the middle of an empty page.
- Background work the user doesn't wait on → use [Toast](./toast.md) with `toast.promise()`.

## 3. Anatomy

1. **Ring**: the `<div>`; a 2px circle in `currentColor` with a transparent top segment, rotating.
2. **Hidden label**: visually hidden "Loading..." text inside the ring.

## 4. Variants

Spinner has no variants. It draws in `currentColor`, so it takes the text colour of its parent. To change it, set `color` with a token on a wrapper you own.

## 5. Sizes

| Size | Use in |
| --- | --- |
| `sm` | Inside buttons and inputs, next to small text (`--size-xxs`). |
| `default` | Inline with body text (`--size-xs`). |
| `lg` | A panel or card region (`--size-sm`). |
| `xl` | A large empty region (`--size-md`). |

<!-- REVIEW: "Use in" text is drafted from the token sizes; the stories put size="sm" inside a Button and give no other guidance. -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Ring rotating once a second | |
| Reduced motion | Static ring with a gap | Under `prefers-reduced-motion` the animation runs once, almost instantly, and stops. |

## 7. Content guidelines

- Spinner has no visible text. When the wait is more than a moment, put a short label beside it that says what's loading: "Loading invoices…".
- In a Button, keep the label and switch it to the ongoing verb: "Save changes" becomes "Saving…".
- When the Spinner stands alone, give it a specific `aria-label`: "Loading invoices", not the default "Loading".

| Do | Don't |
| --- | --- |
| Loading invoices… | Please wait |
| Saving… (in the button) | A button with only a Spinner and no label |
| Refreshing results… | Loading... Loading... (two labels saying the same) |

<!-- REVIEW: copy guidance drafted; source stories show "Loading..." and "Processing..." only. -->

## 8. Rules

1. In a Button, put the Spinner before the label, keep the label, and set `aria-busy` and `aria-disabled` on the Button, ignoring clicks while it's busy. Don't set `disabled`: it drops focus from the button the user just pressed.
2. Mark a Spinner inside a labelled Button `aria-hidden="true"`, so the button's name stays "Saving…" instead of "Loading Saving…". <!-- REVIEW: drafted from the name computation; Spinner's role="status" and aria-label otherwise join the button's accessible name. -->
3. Give a standalone Spinner a specific `aria-label` that says what's loading.
4. Change its colour through the parent's `color`, using a token. Never pass `className` or `style`; they're dropped.
5. Use [Progress](./progress.md) when you know the amount and [Skeleton](./skeleton.md) when you know the layout.
6. Don't build your own spinner with CSS animations.

## 9. Dos and don'ts

**Do:** keep the label in a busy button.

```tsx
<Button type="submit" aria-busy={saving} aria-disabled={saving}>
  {saving && <Spinner size="sm" aria-hidden="true" />}
  {saving ? "Saving…" : "Save changes"}
</Button>
```

**Don't:** replace the label with a Spinner.

```tsx
<Button type="submit" aria-busy={saving} aria-disabled={saving}>
  {saving ? <Spinner /> : "Save changes"}
</Button>
```

**Do:** say what a region is loading.

```tsx
<div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", color: "var(--container-fg-alt)" }}>
  <Spinner size="sm" aria-label="Refreshing results" />
  <Typography variant="label" tone="muted" aria-hidden="true">Refreshing results…</Typography>
</div>
```

**Don't:** recolour or resize it by hand.

```tsx
<Spinner style={{ borderColor: "#3b82f6", width: 40, height: 40 }} />
```

## 10. Accessibility

- Role: `status`, a polite live region.
- Label: `aria-label="Loading"` by default, plus visually hidden "Loading..." text. Both `role` and `aria-label` can be overridden through props.
- Keyboard: not focusable; no keys.
- Focus: Spinner never takes or moves focus. When loading ends, leave focus where the user was.
- Motion: respects `prefers-reduced-motion` (see States).
- Contrast: the ring uses the surrounding text colour, so it's as legible as the text it sits in. Keep the parent on a token pair from the theme; don't override colours.

## 11. Behaviour

- Responsive: fixed size from `--size-*`, which scales with density.
- Layout: Spinner is a `<div>`. Put it in a flex row with `gap` to line it up with text.
- Motion: one linear rotation per second, forever, until unmounted. Don't add your own.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg" \| "xl"` | `"default"` | Diameter, from `--size-xxs` to `--size-md`. |
| `aria-label` | `string` | `"Loading"` | Accessible name. Make it specific when the Spinner stands alone. |
| `role` | `string` | `"status"` | Live-region role. Leave it unless you hide the Spinner with `aria-hidden`. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | `aria-hidden`, `id`. The ref goes to the `<div>`. |
<!-- api:end -->

## 13. Examples

```tsx
import { useState } from "react";
import { Button, Spinner, Typography } from "@eluan/core";

export function ExportReportButton({ exportReport }: { exportReport: () => Promise<void> }) {
  const [exporting, setExporting] = useState(false);

  async function handleClick() {
    if (exporting) return;
    setExporting(true);
    try {
      await exportReport();
    } finally {
      setExporting(false);
    }
  }

  return (
    <Button type="button" variant="outline" aria-busy={exporting} aria-disabled={exporting} onClick={handleClick}>
      {exporting && <Spinner size="sm" aria-hidden="true" />}
      {exporting ? "Exporting…" : "Export CSV"}
    </Button>
  );
}

export function ResultsRefreshing() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--spacing-sm)",
        padding: "var(--spacing-xl)",
        color: "var(--container-fg-alt)",
      }}
    >
      <Spinner aria-label="Refreshing results" />
      <Typography variant="label" tone="muted" aria-hidden="true">Refreshing results…</Typography>
    </div>
  );
}
```

## 14. Related components

- [Button](./button.md): the most common place for a Spinner.
- [Progress](./progress.md): when you know how far along the work is.
- [Skeleton](./skeleton.md): placeholders in the shape of loading content.
- [Toast](./toast.md): `toast.promise()` for background work.

## 15. Common agent mistakes

_Filled from evals._
