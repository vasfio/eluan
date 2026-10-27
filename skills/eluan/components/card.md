---
name: Card
use_when: Grouping content about one item or topic on its own surface, such as a project, a plan or a settings group.
instead_of: Table for items compared across the same attributes; Fieldset for a group of form fields; Dialog or Sheet for content over the page.
source: packages/core/src/components/card.tsx
---

# Card

## 1. Overview

Card is a bordered surface that groups content about one thing. It renders a `<div>` with optional header, content and footer parts, and takes an `elevation` (shadow depth) and a `clickable` flag. It's the only component with its own elevation prop; see [elevation.md](../foundations/elevation.md).

## 2. When to use

- Items that stand alone and are browsed in a grid: projects, articles, integrations.
- A few plans or options side by side, one of them recommended (pricing).
- A settings group or summary block inside a page section.
- A surface that must lift off a busy background (`elevation="sm"` or `"md"`).

### When not to use

- Items compared across the same attributes (users, invoices, line items) → use [Table](./table.md).
- A group of related form fields with a legend → use [Fieldset](./fieldset.md).
- Content that floats over the page or blocks it → use [Popover](./popover.md), [Dialog](./dialog.md) or [Sheet](./sheet.md).
- Long secondary content the user may skip → use [Accordion](./accordion.md).
- Dividing sections inside one card → use [Separator](./separator.md) or headings, never a nested Card.

## 3. Anatomy

1. **Card**: the container. Background `--container-bg`, 1px border, `--curves-lg` corners, shadow from `elevation`.
2. **CardHeader** (optional): a column holding the title and description, padded `--spacing-2xl` on all sides.
3. **CardTitle** (optional): the card's heading text, `--font-size-xl` at weight 600. Renders a `<div>`, not a heading element (see Accessibility).
4. **CardDescription** (optional): muted supporting text under the title, `--font-size-sm`.
5. **CardContent**: the body. Padded `--spacing-2xl` on the sides and bottom; no top padding, so it sits under the header (see Rules 3 for cards without one).
6. **CardFooter** (optional): a row for actions, padded like CardContent. It has no gap between children.

## 4. Variants

Card has no `variant` prop. Its look comes from `elevation` and `clickable`.

| Elevation | Use for |
| --- | --- |
| `none` | Flat layouts where the border alone separates the card: settings groups, cards on a plain page. |
| `sm` (default) | Most cards. A slight lift off the page. |
| `md` | A card that must stand out from a busy background, or the recommended option in a row. |
| `lg` | Rare. A single prominent card on an otherwise empty area. |

<!-- REVIEW: "Use for" is drafted. Source only says elevation "controls shadow depth"; elevation.md says to use none for flat layouts and a raised level only to separate a surface from a busy background. -->

`clickable` makes the whole card respond to hover: a deeper shadow, a 1px lift and a pointer cursor. It adds no role, focus or keyboard handling (see Rules and Accessibility).

## 5. Sizes

Card has no size prop. It fills the width of its parent; set width or grid placement on a wrapper you own. Inner padding is fixed at `--spacing-2xl`, which scales with density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | `--container-bg` surface, border, shadow from `elevation` | Shadows are hardcoded black at low opacity, so raised cards barely show depth in dim and dark modes. Use `elevation="none"` with the border where depth must read in every mode. <!-- REVIEW: W8 (fix/shadow-tokens): card.tsx holds four literal shadows; no shadow tokens exist yet. --> |
| Hover | `clickable` only: deeper shadow and a 1px upward lift | Non-clickable cards don't react. |
| Focus | No focus style of its own | A Card is only focusable if you add `tabIndex`; then the browser's default ring shows. Never remove or restyle the focus ring. |
| Active | `clickable` only: shadow drops back to `md`, lift resets | |

## 7. Content guidelines

- Give each card a short title that names the item: "Pro", "Billing contact", "Q3 roadmap".
- Keep the description to one sentence that says what the card is for or what changed.
- Use sentence case for titles and descriptions. Don't end titles with punctuation.
- Keep cards in a grid parallel: same parts, same order, similar length.
- Put at most one primary Button in a card, in the footer.

| Do | Don't |
| --- | --- |
| Pro | Our amazing Pro plan! |
| Manage how you receive notifications. | This card lets you manage your notification settings below. |
| Team members | Members of your team that you have invited |

<!-- REVIEW: content guidance drafted; source gives no copy rules for Card. -->

## 8. Rules

1. Don't nest a Card inside a Card. Divide a card with [Separator](./separator.md) or headings.
2. Never add `box-shadow` to a card or a wrapper; choose an `elevation` instead.
3. Don't add padding around card parts; they already pad with `--spacing-2xl`. The exception: CardContent has no top padding, so a card without a CardHeader starts flush with its top border. Start cards with a CardHeader, or give your own element inside CardContent `paddingTop: "var(--spacing-2xl)"`. <!-- REVIEW: source gap; elevation.md's own example (Card with only CardContent) hits it. -->
4. CardFooter has no gap. Put two or more actions in a wrapper with `display: flex` and a `--spacing-*` gap, or use one `fullWidth` Button.
5. Use one `default` (primary) Button per card. In a row of plan cards, only the recommended card gets the primary Button; the others use `outline`.
6. Don't set `clickable` on a card that contains its own Buttons or links; nested interactive elements inside a clickable surface conflict.
7. If the whole card must be clickable, give it `role`, `tabIndex={0}`, an `aria-label`, and handle Enter and Space in `onKeyDown`. Prefer a Button or link inside a non-clickable card. <!-- REVIEW: rules 6 and 7 are drafted. clickable adds no role, focus or key handling; the tests pair it with role="button" and aria-label only. -->
8. Never pass `className` or `style`; they're dropped. Size and place cards with a wrapper or a grid parent.

## 9. Dos and don'ts

**Do:** space footer actions with a wrapper.

```tsx
<CardFooter>
  <div style={{ display: "flex", gap: "var(--spacing-sm)", justifyContent: "flex-end", width: "100%" }}>
    <Button type="button" variant="outline">Cancel</Button>
    <Button type="submit">Save changes</Button>
  </div>
</CardFooter>
```

**Don't:** drop Buttons straight into CardFooter; they touch.

```tsx
<CardFooter>
  <Button variant="outline">Cancel</Button>
  <Button>Save changes</Button>
</CardFooter>
```

**Do:** get depth from `elevation`.

```tsx
<Card elevation="md">
  <CardHeader>
    <CardTitle>Quarterly revenue</CardTitle>
    <CardDescription>Up 12% on last quarter.</CardDescription>
  </CardHeader>
</Card>
```

**Don't:** add a shadow or restyle the card.

```tsx
<Card style={{ boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)", padding: 32 }}>
  <CardContent>Quarterly revenue is up 12% on last quarter.</CardContent>
</Card>
```

**Do:** divide one card with a Separator.

```tsx
<Card elevation="none">
  <CardHeader>
    <CardTitle>Email</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Product updates</p>
    <Separator />
    <p>Weekly digest</p>
  </CardContent>
</Card>
```

**Don't:** nest cards.

```tsx
<Card>
  <CardContent>
    <Card><CardContent>Product updates</CardContent></Card>
    <Card><CardContent>Weekly digest</CardContent></Card>
  </CardContent>
</Card>
```

## 10. Accessibility

- Role: none by default (a plain `<div>`). Add `role="article"` or `role="group"` with an `aria-label` when a card is a self-contained item in a list, as the tests do. <!-- REVIEW: tests use role="article" with aria-label; when to add a role is drafted. -->
- Label: CardTitle renders a `<div>`, so it isn't a heading and doesn't name the card. When the title belongs in the page outline, pass `role="heading"` and an `aria-level` that fits (for example `aria-level={3}` under an `h2` section). <!-- REVIEW: the docs site says CardTitle renders h3 and CardDescription a p; the source renders div for both. Fix the docs or the source. -->
- Keyboard: Card itself isn't focusable. Its Buttons, links and inputs are reached with Tab. A `clickable` card is not reachable by keyboard unless you add `tabIndex={0}` and Enter/Space handling (Rules 7).
- Focus: Card declares no focus style; a focusable card shows the browser's default ring. Don't add or remove one.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: Card fills its parent's width. Lay cards out with a grid or flex wrapper and a `--spacing-lg` gap (page-layout.md), and drop to one column on narrow screens in your own stylesheet.
- Overflow and truncation: content wraps; nothing is clipped or truncated. Keep titles short.
- Motion: `clickable` cards animate shadow and lift over 200ms. Don't add your own transitions.

## 12. API

<!-- api:start -->
### Card

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `elevation` | `"none" \| "sm" \| "md" \| "lg"` | `"sm"` | Shadow depth. |
| `clickable` | `boolean` | `false` | Adds a hover shadow, lift and pointer cursor. Adds no role, focus or keyboard handling. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | Native div attributes: `role`, `aria-*`, `onClick`, `tabIndex`, `onKeyDown`. |

### CardHeader, CardTitle, CardDescription, CardContent, CardFooter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | | The part's content. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | Native div attributes. Each part renders a `<div>`; pass `role="heading"` and `aria-level` to CardTitle for heading semantics. |
<!-- api:end -->

## 13. Examples

Three plans, the middle one recommended (eval t06). Each plan stands alone, so they're Cards; only the recommended plan gets the primary Button.

```tsx
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Typography,
} from "@eluan/core";

const plans = [
  { name: "Starter", price: "$0", description: "For trying things out.", features: ["1 project", "Community support"], recommended: false },
  { name: "Pro", price: "$24", description: "For small teams shipping every week.", features: ["Unlimited projects", "Email support", "Audit log"], recommended: true },
  { name: "Business", price: "$79", description: "For teams with security reviews.", features: ["SSO", "Priority support", "99.9% uptime SLA"], recommended: false },
];

export function PricingPlans() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <Typography variant="heading" as="h2">Choose a plan</Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "var(--spacing-lg)",
          alignItems: "stretch",
        }}
      >
        {plans.map((plan) => (
          <Card key={plan.name} role="article" aria-label={`${plan.name} plan`} elevation={plan.recommended ? "md" : "sm"}>
            <CardHeader>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-sm)" }}>
                <CardTitle role="heading" aria-level={3}>{plan.name}</CardTitle>
                {plan.recommended && <Badge variant="informative">Recommended</Badge>}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Typography variant="title" as="p">
                {plan.price}
                <Typography variant="caption" tone="muted"> per user / month</Typography>
              </Typography>
              <ul style={{ margin: 0, paddingInlineStart: "var(--spacing-xl)", display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Typography variant="body" as="span">{feature}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button type="button" variant={plan.recommended ? "default" : "outline"} fullWidth>
                Choose {plan.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

<!-- REVIEW: the Badge tone and md elevation for the recommended plan are drafted. A responsive column minimum needs a width token that doesn't exist (page-layout.md notes the same gap for max widths), so the grid is a fixed three columns. -->

## 14. Related components

- [Table](./table.md): compare items across the same columns instead of browsing them.
- [Separator](./separator.md): divide sections inside one card.
- [Button](./button.md): card actions, one primary per card.
- [Badge](./badge.md): a status or "Recommended" marker in the header.
- [Typography](./typography.md): headings and text inside CardContent.
- [Carousel](./carousel.md): a scrolling row of cards.

## 15. Common agent mistakes

_Filled from evals._
