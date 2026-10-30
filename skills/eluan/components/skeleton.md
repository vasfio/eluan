---
name: Skeleton
use_when: Holding the shape of content that's loading into a known layout, such as a list, card grid or table on first load.
instead_of: Spinner for a short in-place wait or a running action; Progress when the amount is known.
source: packages/core/src/components/skeleton.tsx
---

# Skeleton

## 1. Overview

Skeleton is a pulsing placeholder block in the shape of content that hasn't loaded yet. It renders an empty `<div>`; you set its `width`, `height` and `radius`, and compose several to match the layout that's coming.

## 2. When to use

- The first load of a list, card grid, table or profile whose layout you know.
- A panel or section that loads after the rest of the page.

### When not to use

- An action is running (save, export) → use [Spinner](./spinner.md) inside the [Button](./button.md).
- A short refresh, or you don't know the layout → use [Spinner](./spinner.md).
- You know how far along the work is → use [Progress](./progress.md).
- Loading finished and there's nothing to show → see [patterns/empty-states.md](../patterns/empty-states.md).

## 3. Anatomy

1. **Block**: the `<div>`; `--container-bg-alt` fill, `--curves-md` corners, pulsing.

Compose blocks into the shape of the content: thin blocks for lines of text, a circle (`radius="var(--radius-radius-full)"`) for an avatar, a tall block for an image.

## 4. Variants

Skeleton has no variants. Its shape comes from `width`, `height` and `radius`.

## 5. Sizes

Skeleton has no size prop. `width` defaults to `100%` and `height` to `var(--size-xxs)`. Pass token strings:

| Placeholder for | Props |
| --- | --- |
| A line of body text | default height; `width` as a percentage, such as `"75%"` |
| A heading | `height="var(--size-xs)"` |
| An avatar | `width` and `height` `"var(--size-lg)"`, `radius="var(--radius-radius-full)"` |
| An image or media block | `height="var(--size-4xl)"`, `radius="var(--curves-lg)"` |
| A table cell | `height="var(--size-sm)"` |

<!-- REVIEW: mapping drafted; stories and docs size skeletons in rem and px, which the router's token rule doesn't allow. -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Fill pulsing between full and half opacity every 2 seconds | |
| Reduced motion | Static fill | Under `prefers-reduced-motion` the pulse runs once, almost instantly, and stops. |

## 7. Content guidelines

Skeletons have no text. Make them look like the content they stand in for:

- Use about as many lines as the real content, and make the last line of a paragraph shorter.
- Put circles where avatars will be and blocks where images will be.
- Keep the real spacing: use the same `gap` the loaded layout uses.

| Do | Don't |
| --- | --- |
| Three rows, each an avatar circle and two lines | One grey block covering the whole page |
| Line widths of 100%, 100% and 60% | Every line at full width |

<!-- REVIEW: composition guidance drafted from the stories (Card, Profile, TextBlock, ListItems, Table). -->

## 8. Rules

1. Match the shape and size of the content that replaces it, so the layout doesn't jump when data arrives.
2. Size with tokens or percentages. Never pass numbers (they become px) or rem values.
3. Use `--radius-radius-full` only for circles; otherwise keep the default corners or use a `--curves-*` token.
4. Don't place skeletons on a `--container-bg-alt` surface. They use the same fill and disappear.
5. Hide skeletons from assistive tech and mark the region busy: `aria-hidden="true"` on the skeleton wrapper, `aria-busy="true"` on the region, and a visually hidden "Loading…" message. <!-- REVIEW: drafted; Skeleton renders an empty div with no role or label. -->
6. Swap the whole skeleton layout for the real content in one go.
7. Never pass `className` or `style`; they're dropped. Use the `width`, `height` and `radius` props, and a wrapper for anything else.

## 9. Dos and don'ts

**Do:** mirror the row you're loading, with tokens.

```tsx
<div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
  <Skeleton width="var(--size-lg)" height="var(--size-lg)" radius="var(--radius-radius-full)" />
  <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: "var(--spacing-xs)" }}>
    <Skeleton width="50%" />
    <Skeleton width="75%" />
  </div>
</div>
```

**Don't:** size in px or rem, or style it directly.

```tsx
<Skeleton width={200} height="1rem" style={{ background: "#eee" }} />
```

**Do:** use a Spinner in the button for a running action.

```tsx
<Button type="submit" aria-busy aria-disabled>
  <Spinner size="sm" aria-hidden="true" />
  Saving…
</Button>
```

**Don't:** replace a form with skeletons while it saves.

```tsx
{saving ? <Skeleton height="var(--size-4xl)" /> : <ProfileForm />}
```

## 10. Accessibility

- Role: none. Skeleton is an empty `<div>` with no text, so screen readers skip it and nothing says content is loading.
- Label: none. Mark the loading region `aria-busy="true"`, hide the skeletons with `aria-hidden="true"`, and add a visually hidden status message. See Rules.
- Keyboard: not focusable; no keys.
- Focus: Skeleton never takes focus. Don't move focus when the real content replaces it.
- Motion: the pulse respects `prefers-reduced-motion`.
- Contrast: `--container-bg-alt` is a subtle fill meant for `--container-bg` surfaces. Don't override colours.

## 11. Behaviour

- Responsive: the default `width="100%"` fills the container. Percentage widths track the container.
- Flex rows: Skeleton sets `flex-shrink: 0`, so a full-width skeleton in a flex row won't shrink. Wrap it in an element with `flex: 1`, as the stories do for table cells.
- Density: heights from `--size-*` grow and shrink with density, like the content they stand in for.
- Motion: 2-second opacity pulse, forever, until unmounted. Don't add your own.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `number \| string` | `"100%"` | Width. Numbers are pixels; pass a percentage or a `--size-*` token instead. |
| `height` | `number \| string` | `"var(--size-xxs)"` | Height. Numbers are pixels; pass a `--size-*` token instead. |
| `radius` | `string` | `--curves-md` | Corner radius, such as `"var(--radius-radius-full)"` for a circle. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | `aria-hidden`, `id`. Skeleton isn't wrapped in `forwardRef`. |
<!-- api:end -->

## 13. Examples

```tsx
import { Skeleton, Typography } from "@eluan/core";

type Teammate = { id: string; name: string; email: string };

// eluan: composed, no component for visually hidden text (same recipe Spinner uses internally)
const visuallyHidden: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
};

export function TeammateList({ teammates }: { teammates: Teammate[] | undefined }) {
  const loading = teammates === undefined;

  return (
    <section aria-busy={loading} aria-labelledby="teammates-heading">
      <Typography variant="heading" id="teammates-heading">Teammates</Typography>
      {loading ? (
        <>
          <span role="status" style={visuallyHidden}>Loading teammates…</span>
          <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
            {["a", "b", "c"].map((key) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
                <Skeleton width="var(--size-lg)" height="var(--size-lg)" radius="var(--radius-radius-full)" />
                <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: "var(--spacing-xs)" }}>
                  <Skeleton width="40%" />
                  <Skeleton width="60%" />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <ul style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)", margin: 0, padding: 0, listStyle: "none" }}>
          {teammates.map((person) => (
            <li key={person.id}>
              <Typography variant="body">{person.name}</Typography>
              <Typography variant="caption" tone="muted">{person.email}</Typography>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
```

## 14. Related components

- [Spinner](./spinner.md): short in-place waits and running actions.
- [Progress](./progress.md): work with a known amount.
- [Card](./card.md), [Table](./table.md) and [Avatar](./avatar.md): the layouts skeletons usually stand in for.
- See [patterns/empty-states.md](../patterns/empty-states.md) for what to show when loading returns nothing.

## 15. Common agent mistakes

_Filled from evals._
