---
name: NavigationMenu
use_when: A site header needs a row of top-level navigation links, some of which open a panel of further links.
instead_of: Header for a complete site header with a mobile menu; NavigationDrawer for an app's side navigation; Tabs to switch views within a page; DropdownMenu for actions.
source: packages/core/src/components/navigation-menu.tsx
---

# NavigationMenu

## 1. Overview

NavigationMenu is a horizontal row of site navigation: triggers that open panels of links (including multi-column "megamenu" panels) and plain top-level links. It wraps Radix NavigationMenu and renders a `<nav>` landmark. The root adds the shared panel viewport for you. Links are unstyled; you style your own anchors, or give top-level links the trigger look with `navigationMenuTriggerStyle()`.

## 2. When to use

- A marketing or documentation site header: Products, Solutions, Resources panels plus Pricing and Docs links.
- Navigation where each top-level area has several destinations worth previewing in a panel.

### When not to use

- A complete site header with logo, actions and a phone menu → use [Header](./header.md).
- The main navigation of an app with many sections → use [NavigationDrawer](./navigation-drawer.md).
- Switching between views of the same page → use [Tabs](./tabs.md).
- A list of actions → use [DropdownMenu](./dropdown-menu.md).
- An editor's File/Edit/View commands → use [Menubar](./menubar.md).
- Showing where the page sits in a hierarchy → use [Breadcrumb](./breadcrumb.md).

<!-- REVIEW: choice against Header and NavigationDrawer drafted; docs describe NavigationMenu as "for use in headers and site navigation" without comparing. -->

## 3. Anatomy

1. **Root** (`NavigationMenu`): a `<nav aria-label="Main">` that also renders the panel viewport.
2. **List** (`NavigationMenuList`): the row of top-level items, `--spacing-xxs` apart.
3. **Item** (`NavigationMenuItem`): one top-level entry, holding a trigger and content, or a single link.
4. **Trigger** (`NavigationMenuTrigger`): a button that opens the item's panel. `--size-lg` tall, `--font-size-sm` at weight 500, `--curves-md` radius, with a chevron that turns up while open.
5. **Content** (`NavigationMenuContent`): the panel body for one trigger, padded `--spacing-lg`. Put your own layout of links inside.
6. **Link** (`NavigationMenuLink`): an unstyled Radix link. Use `asChild` around your own `<a>` or router link.
7. **Viewport** (`NavigationMenuViewport`): the shared floating panel that shows the open content. `--container-bg` with a `--container-border` border, `--curves-md` radius and a shadow, anchored under the left edge of the list. Rendered by the root; never add one yourself.
8. **Indicator** (`NavigationMenuIndicator`, optional): a small arrow under the open trigger. Place it as the last child of the list.
9. **Trigger style** (`navigationMenuTriggerStyle()`): returns the trigger's class name so a top-level link can look like a trigger.

## 4. Variants

NavigationMenu has no variants. Top-level links look like plain text unless you give your anchor `navigationMenuTriggerStyle()`.

## 5. Sizes

NavigationMenu has no size prop. Triggers are `--size-lg` tall with `--spacing-md` inline padding, so they follow the density axis.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Trigger on `--container-bg`, text inherited | |
| Hover | `--interactive-bg-hover` fill, `--interactive-fg` text | Hovering a trigger opens its panel after 200ms. |
| Focus | The same fill as hover; the outline is removed | Never remove or restyle the focus ring. |
| Open | Trigger keeps the `--interactive-bg-hover` fill; the chevron rotates 180° | |
| Active | A link styled with `navigationMenuTriggerStyle()` and `active` fills `--interactive-bg-active` but keeps its dark text, so the label disappears | Until this is fixed, don't pass `active` to a link that uses `navigationMenuTriggerStyle()`; set `aria-current="page"` on your anchor instead. <!-- REVIEW: W2 #2 (fix/invisible-states): navigation-menu.tsx [data-active] sets the active background without the paired --interactive-fg-active. --> |
| Disabled | `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text, no pointer events | |

The indicator arrow is filled with `--container-bg-alt` while the panel is `--container-bg`, so it reads as a separate grey chip rather than part of the panel. Leave the indicator out unless you need it. <!-- REVIEW: source finding (navigation-menu.tsx indicatorArrow), not listed in the fix plan; W8 also notes its inline shadow literal. -->

## 7. Content guidelines

- Label triggers and top-level links with one or two nouns: "Products", "Resources", "Pricing".
- Use sentence case.
- In panels, give each link a short title and, for megamenus, a one-line description of the destination.
- Group panel links under small headings when a panel has more than one column.
- Keep a trigger's panel to links. Put one promotional card at most beside them.

| Do | Don't |
| --- | --- |
| Pricing | See our pricing plans |
| Resources | More |
| Integrations: connect Slack, GitHub and Linear | Click to learn about integrations |

## 8. Rules

1. Wrap every destination in `NavigationMenuLink` (use `asChild` around your `<a>` or router link) so keyboard focus and close-on-select work.
2. Style links on your own anchor. For top-level links, put `className={navigationMenuTriggerStyle()}` on your `<a>` inside `<NavigationMenuLink asChild>`. Never pass `className` or `style` to the Eluan parts themselves.
3. Never render `NavigationMenuViewport`; the root already does.
4. Mark the current page: `active` on `NavigationMenuLink` sets `aria-current="page"`. For links styled with `navigationMenuTriggerStyle()`, set `aria-current="page"` on the anchor instead (see States).
5. Give the root an `aria-label` when the page has more than one `<nav>`, for example `aria-label="Primary"`.
6. Leave `orientation` horizontal. The list is always laid out as a row; `vertical` changes only the arrow keys.
7. Pair it with a phone layout. NavigationMenu has no mobile menu; use [Header](./header.md) or a [Sheet](./sheet.md) below 768px. <!-- REVIEW: drafted; source only switches the panel to full width below 768px. -->

## 9. Dos and don'ts

**Do:** give a top-level link the trigger look through your own anchor.

```tsx
<NavigationMenuItem>
  <NavigationMenuLink asChild>
    <a href="/pricing" className={navigationMenuTriggerStyle()}>
      Pricing
    </a>
  </NavigationMenuLink>
</NavigationMenuItem>
```

**Don't:** use a bare anchor or a Button outside `NavigationMenuLink`.

```tsx
<NavigationMenuItem>
  <Button variant="ghost" onClick={() => (window.location.href = "/pricing")}>
    Pricing
  </Button>
</NavigationMenuItem>
```

**Do:** mark the current page without the active fill on trigger-styled links.

```tsx
<NavigationMenuLink asChild>
  <a href="/docs" aria-current="page" className={navigationMenuTriggerStyle()}>
    Docs
  </a>
</NavigationMenuLink>
```

**Don't:** combine `active` with the trigger style while the active colour pair is broken.

```tsx
<NavigationMenuLink asChild active>
  <a href="/docs" className={navigationMenuTriggerStyle()}>Docs</a>
</NavigationMenuLink>
```

## 10. Accessibility

- Role: the root is a `navigation` landmark named "Main" by default. Triggers are buttons with `aria-expanded` and `aria-controls`; links are links.
- Label: triggers and links are named by their text. Override the landmark name with `aria-label` when there are several navs.
- Keyboard: Tab moves through triggers and top-level links. Enter or Space toggles a panel. ArrowLeft and ArrowRight move between top-level items, Home and End jump to the ends, and ArrowDown moves focus into an open panel. Escape closes the panel and returns focus to its trigger.
- Focus: a panel doesn't trap focus; tabbing past its last link moves on through the page. Selecting a link closes the panel.
- Current page: `active` on `NavigationMenuLink` adds `aria-current="page"`.
- Contrast: handled by the theme. Don't override colours. Trigger focus is shown only by the `--interactive-bg-hover` fill, identical to hover and faint in `minimal`; don't patch it per component. <!-- REVIEW: same family as W1 (focus contrast); the trigger replaces its outline with a fill. -->

## 11. Behaviour

- Positioning: the viewport opens under the list, aligned to its left edge, `--spacing-xs` below. It sizes to the open panel's content at 768px and up.
- Responsive: below 768px the viewport and panels stretch to full width. There is no collapsed or mobile menu.
- Overflow and truncation: set your panel layout's width yourself (a grid or column inside the content). Nothing truncates.
- Hover timing: panels open 200ms after the pointer enters a trigger (`delayDuration`); moving between triggers within 300ms skips the delay (`skipDelayDuration`).
- Motion: trigger colours transition over 150ms and the chevron rotates over 150ms. Don't add more.

## 12. API

<!-- api:start -->
### NavigationMenu

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | | Controlled value of the open item (`""` when none). |
| `defaultValue` | `string` | | Initially open item when uncontrolled. |
| `onValueChange` | `(value: string) => void` | | Called when a panel opens or closes. |
| `delayDuration` | `number` | `200` | Hover delay before a panel opens, in ms. |
| `skipDelayDuration` | `number` | `300` | Window in which moving to another trigger opens it at once, in ms. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Arrow-key direction only; the layout stays a row. |
| `aria-label` | `string` | `"Main"` | Name of the navigation landmark. |
| `...props` | Radix `NavigationMenu.Root` props without `className`, `style` | | `dir`. |

### NavigationMenuList, NavigationMenuItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (Item) | `string` | generated | Identifies the item for the root `value`. |
| `...props` | Radix `List` / `Item` props | | `className` and `style` are omitted from List. Item is the re-exported Radix part. |

### NavigationMenuTrigger, NavigationMenuContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` (Trigger) | `boolean` | `false` | Prevents opening. |
| `forceMount` (Content) | `true` | | Keeps the panel mounted when closed. |
| `...props` | Radix `Trigger` / `Content` props without `className`, `style` | | `onEscapeKeyDown`, `onPointerDownOutside` on Content. |

### NavigationMenuLink

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders your anchor or router link with the link behaviour. |
| `active` | `boolean` | `false` | Marks the current page: adds `aria-current="page"`. |
| `onSelect` | `(event: Event) => void` | | Called on selection; `event.preventDefault()` keeps the panel open. |
| `...props` | Radix `NavigationMenu.Link` props | | Re-exported, unstyled Radix part; renders an `<a>` without `asChild`. |

### NavigationMenuIndicator, NavigationMenuViewport

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `forceMount` | `true` | | Keeps the part mounted. |
| `...props` | Radix `Indicator` / `Viewport` props without `className`, `style` | | The root renders the viewport; don't render it yourself. |

### navigationMenuTriggerStyle

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `navigationMenuTriggerStyle()` | `() => string` | | Returns the trigger's class name for your own top-level `<a>`. |
<!-- api:end -->

## 13. Examples

```tsx
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@eluan/core";

const products = [
  { href: "/analytics", title: "Analytics", description: "Dashboards and reports for every team." },
  { href: "/automation", title: "Automation", description: "Run workflows when data changes." },
  { href: "/integrations", title: "Integrations", description: "Connect Slack, GitHub and Linear." },
];

// Add a :hover rule with --interactive-bg-hover to these anchors in your stylesheet.
const panelLinkStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-xxs)",
  padding: "var(--spacing-sm) var(--spacing-md)",
  borderRadius: "var(--curves-md)",
  color: "var(--container-fg)",
  textDecoration: "none",
};

export function SiteNavigation({ pathname }: { pathname: string }) {
  return (
    <NavigationMenu aria-label="Primary">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul style={{ display: "grid", gap: "var(--spacing-xs)", width: "max-content", margin: 0, padding: 0, listStyle: "none" }}>
              {products.map((product) => (
                <li key={product.href}>
                  <NavigationMenuLink asChild active={pathname === product.href}>
                    <a href={product.href} style={panelLinkStyle}>
                      <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 500 }}>{product.title}</span>
                      <span style={{ fontSize: "var(--font-size-xs)", color: "var(--container-fg-alt)" }}>
                        {product.description}
                      </span>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a
              href="/pricing"
              className={navigationMenuTriggerStyle()}
              aria-current={pathname === "/pricing" ? "page" : undefined}
            >
              Pricing
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a
              href="/docs"
              className={navigationMenuTriggerStyle()}
              aria-current={pathname.startsWith("/docs") ? "page" : undefined}
            >
              Docs
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

## 14. Related components

- [Header](./header.md): a full site header with logo, actions and a mobile menu.
- [NavigationDrawer](./navigation-drawer.md): side navigation for apps.
- [Breadcrumb](./breadcrumb.md): the current page's place in the hierarchy.
- [Tabs](./tabs.md): views within one page, not destinations.
- [DropdownMenu](./dropdown-menu.md): actions, not navigation.
- See [navigation patterns](../patterns/navigation.md).

## 15. Common agent mistakes

_Filled from evals._
