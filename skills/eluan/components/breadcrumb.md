---
name: Breadcrumb
use_when: A page sits two or more levels deep in a hierarchy and the user needs to see where they are and step back up.
instead_of: NavigationDrawer or NavigationMenu for primary navigation; Stepper for steps in a process; Button variant link with asChild for a single Back link.
source: packages/core/src/components/breadcrumb.tsx
---

# Breadcrumb

## 1. Overview

Breadcrumb shows the trail from a top-level page to the current one, as a row of links separated by chevrons inside a `<nav aria-label="breadcrumb">`. It's composed from small parts: a list, items, links, the current page, separators and an optional ellipsis that can hide middle levels in a dropdown.

## 2. When to use

- Pages two or more levels below a section: Projects › Apollo › Settings.
- Detail pages reached from a list, so the user can go back up to the list: Invoices › INV-1042.
- Documentation or file hierarchies where users jump between levels.

### When not to use

- Primary navigation between sections → use [NavigationDrawer](./navigation-drawer.md), [NavigationMenu](./navigation-menu.md) or [Header](./header.md).
- Progress through an ordered flow (checkout, onboarding) → use [Stepper](./stepper.md).
- A top-level page with nothing above it → leave Breadcrumb out.
- A single "Back to invoices" link → use [Button](./button.md) `variant="link"` with `asChild` around an `<a>`.
- Switching views within the page → use [Tabs](./tabs.md).

<!-- REVIEW: usage boundaries drafted; docs describe Breadcrumb only as showing "the current page's location within a navigational hierarchy". -->

## 3. Anatomy

1. **Nav** (`Breadcrumb`): a `<nav aria-label="breadcrumb">` landmark. Adds no styling.
2. **List** (`BreadcrumbList`): an `<ol>` that wraps onto more lines when needed. `--font-size-sm` text in `--interactive-fg-alt`; items are `--spacing-xxs` apart, `--spacing-sm` from 640px up.
3. **Item** (`BreadcrumbItem`): an `<li>` holding one link, the page, or the ellipsis.
4. **Link** (`BreadcrumbLink`): an `<a>` to an ancestor page, muted until hovered. Use `asChild` to render your router's link.
5. **Page** (`BreadcrumbPage`): the current page as plain text in `--interactive-fg`, with `aria-current="page"`. Not a link.
6. **Separator** (`BreadcrumbSeparator`): an `<li>` hidden from assistive tech. Shows a chevron by default; pass one Lucide icon as a child to change it. The icon is sized to the text.
7. **Ellipsis** (`BreadcrumbEllipsis`, optional): stands in for hidden middle levels. With `items` it's a ghost icon Button that opens a [DropdownMenu](./dropdown-menu.md) of those levels; without `items` it's a decorative "…".

## 4. Variants

Breadcrumb has no variants. Change the separator glyph by passing an icon to `BreadcrumbSeparator`.

## 5. Sizes

Breadcrumb has no size prop. Text is `--font-size-sm` and gaps come from `--spacing-*`, so it follows the density axis.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Links in `--interactive-fg-alt`; the current page in `--interactive-fg` | Links set no text decoration, so they keep the browser underline unless your CSS reset removes it. |
| Hover | Link text turns `--interactive-fg` | |
| Focus | Links keep the browser's default focus ring; the ellipsis Button shows its 1px `--interactive-border` outline | Never remove or restyle the focus ring. |
| Current | `BreadcrumbPage`: `--interactive-fg`, not interactive | |
| Disabled | Ellipsis entries without `href` or `onClick` are disabled in its dropdown | |

## 7. Content guidelines

- Use each page's own title, shortened if needed: "Invoices", "INV-1042", "Settings".
- Use sentence case, matching the page titles.
- Start at the section root, not "Home", unless the site has a real home page users return to. <!-- REVIEW: drafted; stories start at "Home" without stating a rule. -->
- End with the current page, as `BreadcrumbPage`.
- Collapse middle levels into `BreadcrumbEllipsis` when the trail has more than four levels; keep the first and the last two. <!-- REVIEW: threshold drafted; the collapsed story hides three middle levels without stating a rule. -->

| Do | Don't |
| --- | --- |
| Invoices › INV-1042 | Home › Billing › Invoices › Invoice details for INV-1042 |
| Projects › Apollo › Settings | projects / apollo / settings |

## 8. Rules

1. Put each link, page and ellipsis in its own `BreadcrumbItem`, and put a `BreadcrumbSeparator` between items, never inside one.
2. End the trail with `BreadcrumbPage` for the current page. Don't make the current page a link.
3. Render router links with `asChild`: `<BreadcrumbLink asChild><Link href="/invoices">Invoices</Link></BreadcrumbLink>`.
4. Change the separator by passing an icon child to `BreadcrumbSeparator`. Don't use the `separator` prop on `Breadcrumb`; it isn't wired up and leaks onto the `<nav>` element.
5. With a client-side router, give `BreadcrumbEllipsis` items an `onClick` that calls the router. An `href` alone triggers a full page load (`window.location.href`).
6. Use one Breadcrumb per page, above the page title. <!-- REVIEW: placement drafted; no source states it. -->
7. Never pass `className` or `style` to any part. Put spacing on a wrapper you own.

## 9. Dos and don'ts

**Do:** separate items and end with the current page.

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/invoices">Invoices</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>INV-1042</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

**Don't:** type separators into the text or link the current page.

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/invoices">Invoices /</BreadcrumbLink>
      <BreadcrumbLink href="/invoices/inv-1042">INV-1042</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

**Do:** swap the glyph with an icon child.

```tsx
<BreadcrumbSeparator>
  <Slash aria-hidden="true" />
</BreadcrumbSeparator>
```

**Don't:** use the unwired `separator` prop or size the icon yourself.

```tsx
<Breadcrumb separator={<Slash size={14} />}>…</Breadcrumb>
```

## 10. Accessibility

- Role: a `navigation` landmark named "breadcrumb"; the trail is an ordered list. Separators are `presentation` and `aria-hidden`.
- Label: links are named by their text. Pass `aria-label` on `Breadcrumb` to rename the landmark ("Breadcrumb", or a localised name).
- Current page: `BreadcrumbPage` carries `aria-current="page"`, `role="link"` and `aria-disabled="true"`.
- Ellipsis: with `items`, it's a Button named "Show more breadcrumbs" that opens a menu. Without `items` it's hidden from assistive tech, so the hidden levels aren't announced.
- Keyboard: Tab moves through the links; Enter follows one. The ellipsis menu uses DropdownMenu keys (arrows, Enter, Escape).
- Contrast: handled by the theme. Don't override colours. Links keep the browser focus ring; don't add your own. The ellipsis Button's outline currently measures below 3:1; don't patch it here. <!-- REVIEW: system-wide focus-ring contrast issue, see foundations/colour.md. -->

## 11. Behaviour

- Responsive: the list wraps onto more lines rather than truncating. Item gaps widen from `--spacing-xxs` to `--spacing-sm` at 640px.
- Overflow and truncation: nothing truncates. Shorten labels or collapse middle levels with `BreadcrumbEllipsis`.
- Motion: link colour transitions over 150ms. Don't add more.

## 12. API

<!-- api:start -->
### Breadcrumb

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | `string` | `"breadcrumb"` | Name of the navigation landmark. |
| `separator` | `ReactNode` | | Declared but not used; it is passed through to the `<nav>`. Don't use it. |
| `...props` | `ComponentProps<"nav">` without `className`, `style` | | |

### BreadcrumbList, BreadcrumbItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `ComponentProps<"ol">` / `ComponentProps<"li">` without `className`, `style` | | |

### BreadcrumbLink

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders your child (a router link) with the link styles. |
| `...props` | `ComponentProps<"a">` without `className`, `style` | | `href`. |

### BreadcrumbPage

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `ComponentProps<"span">` without `className`, `style` | | Renders with `aria-current="page"`. |

### BreadcrumbSeparator

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | chevron icon | One icon element to use as the separator; it's sized to the text. |
| `...props` | `ComponentProps<"li">` without `className`, `style` | | |

### BreadcrumbEllipsis

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `{ label: string; href?: string; onClick?: () => void }[]` | `[]` | Hidden levels shown in a dropdown. Empty renders a decorative "…". `onClick` wins over `href`; `href` does a full page load. |
<!-- api:end -->

## 13. Examples

```tsx
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Typography,
} from "@eluan/core";

export function InvoiceHeader({ navigate }: { navigate: (href: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/billing">Billing</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis
              items={[
                { label: "Customers", onClick: () => navigate("/billing/customers") },
                { label: "Northwind Traders", onClick: () => navigate("/billing/customers/northwind") },
              ]}
            />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/billing/customers/northwind/invoices">Invoices</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>INV-1042</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Typography variant="title" as="h1">Invoice INV-1042</Typography>
    </div>
  );
}
```

## 14. Related components

- [NavigationDrawer](./navigation-drawer.md): primary app navigation; Breadcrumb shows depth within a section.
- [DropdownMenu](./dropdown-menu.md): what the ellipsis opens.
- [Stepper](./stepper.md): progress through ordered steps.
- [Typography](./typography.md): the page title that follows the trail.
- See [navigation patterns](../patterns/navigation.md).

## 15. Common agent mistakes

_Filled from evals._
