---
name: Header
use_when: A site or simple app needs a top bar with a logo, a flat list of page links and actions such as search or sign-in, collapsing to a menu on small screens.
instead_of: NavigationMenu for links with dropdown panels; NavigationDrawer for an app shell with a sidebar; Tabs for switching views inside a page.
source: packages/core/src/components/header.tsx
---

# Header

## 1. Overview

Header is a responsive top bar. It renders a `<header>` with three slots: a logo, a row of nav links built from an `items` array, and free-form `actions` (search, sign-in, a primary call to action). Below `mobileBreakpoint` the links and actions move into a right-side Sheet opened by a menu button. Nav links render as ghost Buttons; the active one uses the filled `secondary` variant.

## 2. When to use

- The top bar of a marketing site, docs site or simple product with a handful of top-level pages.
- A top nav that needs a search field or sign-in buttons alongside the links (put them in `actions`).
- A small app shell whose sections fit in one row of links. <!-- REVIEW: drafted; source and docs frame Header as a site header and don't discuss app shells. -->

### When not to use

- Top-level links that open dropdown panels of sub-links → use [NavigationMenu](./navigation-menu.md). Header's `NavItem.children` isn't rendered.
- An app with many sections, nested navigation or a collapsible sidebar → use [NavigationDrawer](./navigation-drawer.md) (`NavigationDrawerLayout` gives a sidebar and content shell with its own top bar).
- Switching between views of the same page → use [Tabs](./tabs.md) or [SegmentedControl](./segmented-control.md).
- Showing where a page sits in a hierarchy → use [Breadcrumb](./breadcrumb.md).
- The bottom of a page → use [Footer](./footer.md).

## 3. Anatomy

1. **Bar**: the `<header>` element, full width, `--container-bg` with a 1px bottom border in `--container-border-alt`. Your extra props land here.
2. **Container**: centres the content up to `80rem`, with `--spacing-md` side padding and a height of 1.5 × `--size-xl`.
3. **Logo** (`logo`): your node at the start of the bar.
4. **Nav** (`items`): a `<nav>` of small Buttons, one per NavItem. Items with `href` render links; items without render buttons.
5. **Actions** (`actions`): your node at the end of the bar, laid out in a row with a `--spacing-md` gap.
6. **Menu button**: below the breakpoint, a ghost icon Button with a menu icon and the visually hidden label "Toggle menu".
7. **Mobile menu**: a right-side Sheet holding the nav as full-width, start-aligned Buttons and, under a top border, the actions in a column.

## 4. Variants

Header has no `variant` prop. Two booleans change the look:

| Prop | Use for |
| --- | --- |
| default | An opaque bar with a bottom border, in normal page flow. |
| `transparent` | A bar laid over a hero image or coloured section: no background and no border. |
| `sticky` | A bar that stays pinned to the top of its scrolling container (`z-index: 50`). Combine with either look. |

<!-- REVIEW: "Use for" text drafted; source and docs describe what the props do, not when to pick them. -->

## 5. Sizes

Header has no size prop. The bar height is 1.5 × `--size-xl`, so it follows density. Desktop nav links use Button `size="sm"`. `mobileBreakpoint` sets where the bar collapses:

| `mobileBreakpoint` | Collapses below | Use when |
| --- | --- | --- |
| `sm` | 640px | Two or three short links and one action. |
| `md` | 768px (default) | Most headers. |
| `lg` | 1024px | Many links, or a search field in `actions`. |

<!-- REVIEW: "Use when" column drafted; source only defines the breakpoints. -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Ghost links on `--container-bg` | |
| Hover | Ghost Button hover background on the link | |
| Focus | Button focus outline on links, actions and the menu button | Never remove or restyle the focus ring. |
| Active item | Filled `secondary` Button | `href` items also get `aria-current="page"`. |
| Collapsed | Logo and menu button only | Below `mobileBreakpoint`. |
| Menu open | Sheet slides in from the right over an overlay | Choosing a nav item closes it. |

## 7. Content guidelines

- Label links with short nouns for the destination, in sentence case: "Pricing", "Docs", "Customers".
- Keep labels to one or two words, and keep each label unique.
- Keep the row short; links never wrap. The stories and docs show four or five.
- Put one primary Button in `actions`, with secondary actions (Sign in) as `ghost`. The docs demo uses `size="sm"` for actions so they match the nav links.
- Give a search field an `aria-label` and a placeholder that says what it searches: "Search projects".

| Do | Don't |
| --- | --- |
| Pricing | Our pricing plans |
| Docs | Click for documentation |
| Get started | GET STARTED NOW! |

## 8. Rules

1. Build the nav with `items`. Header renders only its slots and drops any children you pass.
2. Mark the current page with `active: true` on exactly one item.
3. Give every item an `href` when it goes to a page. Items without `href` render buttons and get no `aria-current`.
4. Don't combine `href` and `onClick` on one item: `onClick` is ignored when `href` is set. <!-- REVIEW: source oddity; there's also no way to pass a router Link, so href items always render plain anchors. -->
5. Keep item labels unique; Header uses the label as the React key.
6. Don't nest `children` in a NavItem; they aren't rendered. Use NavigationMenu for dropdowns. <!-- REVIEW: NavItem declares `children` and the docs site says it "supports nested children for dropdowns", but header.tsx never renders them. -->
7. Put search, sign-in and the primary call to action in `actions`. `actions` renders in the bar and again in the mobile menu while it's open, so control any stateful field (`value` plus `onValueChange`) and don't give it a fixed `id`.
8. Wrap the logo in a link to the home page with an accessible name (brand text, or an image with `alt`). <!-- REVIEW: drafted; source renders `logo` as given, with no link. -->
9. Use one Header per page. Put layout (margins, max width) on a wrapper you own; Header drops `className` and `style`.

## 9. Dos and don'ts

**Do:** describe links as data and mark the current page.

```tsx
<Header
  logo={<a href="/" aria-label="Northwind home"><NorthwindLogo aria-hidden="true" /></a>}
  items={[
    { label: "Product", href: "/product", active: true },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
  ]}
  actions={<Button size="sm">Get started</Button>}
/>
```

**Don't:** hand-build the nav as children or nest dropdown items.

```tsx
<Header>
  <a href="/product">Product</a>
  <a href="/pricing">Pricing</a>
</Header>
<Header items={[{ label: "Product", children: [{ label: "Analytics", href: "/analytics" }] }]} />
```

**Do:** put search in `actions` and control its value.

```tsx
<Header
  items={items}
  actions={
    <div role="search">
      <SearchInput aria-label="Search docs" placeholder="Search docs" value={query} onValueChange={setQuery} onSearch={runSearch} />
    </div>
  }
/>
```

**Don't:** pass an unlabelled, uncontrolled field with a fixed `id`.

```tsx
<Header items={items} actions={<input id="search" placeholder="Search..." />} />
```

## 10. Accessibility

- Role: the `<header>` is the page's `banner` landmark when it isn't nested inside `<main>`, `<article>`, `<aside>`, `<nav>` or `<section>`. Nav items are links (`href`) or buttons (no `href`); the active link has `aria-current="page"`.
- Label: links and buttons take their `label`. The menu button is named "Toggle menu" by visually hidden text. The `<nav>` elements have no `aria-label`, and Header gives you no way to set one. <!-- REVIEW: source gap; matters when the page has other nav landmarks (breadcrumb, footer). -->
- Search: wrap a search field in an element with `role="search"` so it's exposed as a search landmark. <!-- REVIEW: drafted; Header and SearchInput don't add one. -->
- Keyboard: Tab moves through the logo, links and actions in order. Enter follows a link; Enter or Space activates a button. In the mobile menu, Escape closes it.
- Focus: the mobile menu is a modal Sheet: focus moves into it and is trapped while it's open, and returns to the menu button when it closes. The menu button carries `aria-expanded` from Radix Dialog.
- Mobile menu name: the Sheet has no title, so the dialog has no accessible name and Radix warns in development. <!-- REVIEW: source gap, not in the fix plan; header.tsx renders SheetContent without a SheetTitle. -->
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per component. <!-- REVIEW: system-wide focus-ring contrast issue, W1 in the fix plan; see foundations/colour.md. -->

## 11. Behaviour

- Responsive: at and above `mobileBreakpoint` the nav and actions show inline; below it they're hidden and the menu button appears. The mobile Sheet is 18.75rem wide on small screens.
- Overflow and truncation: links don't wrap. If the row overflows just above the breakpoint, raise `mobileBreakpoint`.
- Sticky: `sticky` pins the bar within its nearest scrolling container, not always the viewport.
- Motion: the mobile Sheet slides in and out; Buttons have their own colour transitions. Don't add your own.
- Choosing an item in the mobile menu runs its `onClick` (if any) and closes the menu.

## 12. API

<!-- api:start -->
### Header

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `logo` | `ReactNode` | | Brand element at the start of the bar. |
| `items` | `NavItem[]` | `[]` | Nav links, in order. |
| `actions` | `ReactNode` | | Elements at the end of the bar (search, sign-in, call to action). Also rendered in the mobile menu. |
| `sticky` | `boolean` | `false` | Pins the bar to the top of its scrolling container. |
| `transparent` | `boolean` | `false` | Removes the background and bottom border. |
| `mobileBreakpoint` | `"sm" \| "md" \| "lg"` | `"md"` | Viewport width below which the nav collapses into the menu (640, 768, 1024px). |
| `...props` | `HTMLAttributes<HTMLElement>` without `className`, `style` | | Applied to the `<header>`: `id`, `aria-*`, `data-*`. Children are dropped. `className` and `style` are omitted. |

### NavItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | | Visible text and accessible name. Also the React key; keep it unique. Required. |
| `href` | `string` | | Renders the item as a link. `onClick` is ignored when set. |
| `onClick` | `() => void` | | Renders the item as a button when there's no `href`. |
| `active` | `boolean` | `false` | Highlights the item; adds `aria-current="page"` on links. |
| `children` | `NavItem[]` | | Declared but not rendered. |
<!-- api:end -->

## 13. Examples

```tsx
import { useState } from "react";
import { Button, Header, SearchInput, Typography, type NavItem } from "@eluan/core";

const items: NavItem[] = [
  { label: "Projects", href: "/projects", active: true },
  { label: "Reports", href: "/reports" },
  { label: "Team", href: "/team" },
  { label: "Settings", href: "/settings" },
];

export function AppHeader({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <Header
      sticky
      mobileBreakpoint="lg"
      logo={
        <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
          <Typography as="span" variant="lead" weight="semibold">Northwind</Typography>
        </a>
      }
      items={items}
      actions={
        <>
          <div role="search">
            <SearchInput
              aria-label="Search projects"
              placeholder="Search projects"
              value={query}
              onValueChange={setQuery}
              onSearch={onSearch}
            />
          </div>
          <Button asChild size="sm">
            <a href="/projects/new">New project</a>
          </Button>
        </>
      }
    />
  );
}
```

## 14. Related components

- [NavigationMenu](./navigation-menu.md): top-level links with dropdown panels.
- [NavigationDrawer](./navigation-drawer.md): a collapsible sidebar shell for apps with many sections.
- [SearchInput](./search-input.md): the search field to place in `actions`.
- [Sheet](./sheet.md): the panel the mobile menu opens in.
- [Button](./button.md): renders every nav item and the menu button.
- [Footer](./footer.md): the matching bottom-of-page component.

## 15. Common agent mistakes

_Filled from evals._
