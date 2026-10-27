---
name: NavigationDrawer
use_when: An app needs persistent side navigation between its main sections, collapsible to an icon rail on desktop and a slide-in sheet on phones.
instead_of: NavigationMenu or Header for a website's top navigation; Tabs to switch views within a page; Sheet or Drawer for temporary side content.
source: packages/core/src/components/navigation-drawer.tsx
---

# NavigationDrawer

## 1. Overview

NavigationDrawer is an app's primary side navigation. On screens 768px and wider it's a 16rem sidebar that collapses to an icon-only rail; below 768px it becomes a left [Sheet](./sheet.md) behind a menu button, which closes when the user picks an item. `NavigationDrawerLayout` gives you the whole shell: the provider, the sidebar, a bar with the collapse toggle and a scrolling content column.

## 2. When to use

- The main navigation of a dashboard, admin or SaaS app with several top-level sections: Dashboard, Projects, Team, Settings.
- Navigation that must stay visible while the user works, with an option to shrink it to icons.

### When not to use

- A marketing or documentation site's top navigation → use [Header](./header.md) or [NavigationMenu](./navigation-menu.md).
- Switching between views of one page → use [Tabs](./tabs.md).
- Showing extra content or a form beside the page for a moment → use [Sheet](./sheet.md) or [Drawer](./drawer.md).
- A deep tree of folders or documents → use [TreeView](./tree-view.md) inside the drawer content or the page.

<!-- REVIEW: "When not to use" drafted; docs call it "the application's primary side navigation" without listing alternatives. -->

## 3. Anatomy

1. **Provider** (`NavigationDrawerProvider`): holds the collapsed state, the phone breakpoint check and the phone sheet's open state. Every other part reads it.
2. **Layout** (`NavigationDrawerLayout`, optional): provider + sidebar + main column. Puts a `NavigationDrawerToggle` in a `--size-xl` bar above your content, outside the sidebar, so it stays visible when collapsed. Fills its parent's height.
3. **Drawer** (`NavigationDrawer`): on desktop an `<aside>` on `--container-bg` with a `--container-border-alt` right border, 16rem wide or a rail when collapsed. On phones, a menu button fixed at the top-left that opens a left Sheet wrapping the children in a `<nav>`.
4. **Header** (`NavigationDrawerHeader`): a `--size-xl` row with a bottom border for the logo or app name. Its children are hidden while collapsed.
5. **Content** (`NavigationDrawerContent`): the scrolling middle area for groups and items, padded `--spacing-xs`. The scrollbar appears on hover.
6. **Footer** (`NavigationDrawerFooter`): pinned to the bottom with a top border, for the account, help or sign out.
7. **Group** (`NavigationDrawerGroup`): a column of items with an optional `label`, rendered as an `<h4>` at `--font-size-xs`, weight 600.
8. **Item** (`NavigationDrawerItem`): a link row, `--size-md` tall, `--font-size-xs` at weight 500 in `--interactive-fg-alt`. A `--size-xxs` icon slot, then the label, which truncates with an ellipsis. Use `asChild` to render your router's link.
9. **Toggle** (`NavigationDrawerToggle`): a ghost `iconSm` Button with a chevron that collapses or expands the drawer. Renders nothing on phones.
10. **Hook** (`useNavigationDrawer`): reads `collapsed`, `setCollapsed`, `isMobile`, `mobileOpen` and `setMobileOpen`.

## 4. Variants

NavigationDrawer has no variant prop. Its look changes with state: expanded, collapsed (rail) or phone sheet.

## 5. Sizes

NavigationDrawer has no size prop. Expanded it is 16rem wide; collapsed it is one `--size-md` item plus `--spacing-xs` on each side. Items and bars use `--size-*` tokens, so they follow the density axis.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Item text `--interactive-fg-alt`, no fill | |
| Hover | `--interactive-bg-hover` fill, `--interactive-fg` text | |
| Focus | 1px ring drawn as a `box-shadow` in `--interactive-border-alt` | Never remove or restyle the focus ring. |
| Active | `--interactive-bg-active` fill, `--interactive-fg-active` text, unchanged on hover | `active` is visual only; also set `aria-current="page"` (Rule 3). |
| Collapsed | A rail of square icon items; labels and header contents removed; group labels fade to transparent but keep their space | Item labels are removed from the DOM, so give items an `aria-label` (Rule 4). |
| Phone | Menu button at the top-left; the drawer opens as a left Sheet | Picking an item closes the sheet, even when a client-side router prevents the native navigation. |

## 7. Content guidelines

- Label items with one or two nouns naming the destination: "Dashboard", "Invoices", "Team settings".
- Use sentence case.
- Use a distinct Lucide icon for every item; in the rail the icon is all the user sees.
- Group items under short labels only when there are more than about six: "Workspace", "Account". <!-- REVIEW: threshold drafted; stories show labelled and unlabelled groups without a rule. -->
- Put account, help and sign out in the footer, not among the sections.

| Do | Don't |
| --- | --- |
| Invoices | View all invoices |
| Team settings | Settings for your team members |
| Help | ? |

## 8. Rules

1. Render every part inside `NavigationDrawerProvider`, or use `NavigationDrawerLayout`, which includes it. Outside a provider the parts silently fall back to "expanded, desktop" and never collapse; `useNavigationDrawer` doesn't throw.
2. Give `NavigationDrawerLayout` (or the element holding the drawer) a bounded height, such as a full-viewport wrapper. The sidebar fills its parent's height.
3. Set `aria-current="page"` on the current item alongside `active`. The component doesn't set it.
4. When the drawer can collapse, give each item an `aria-label` with its label text. Collapsed items render only the icon and have no other accessible name.
5. Put `NavigationDrawerToggle` outside `NavigationDrawerHeader`; the header hides its children while collapsed. `NavigationDrawerLayout` places it for you.
6. Pass router links with `asChild`: `<NavigationDrawerItem asChild icon={<Home />}><Link href="/">Dashboard</Link></NavigationDrawerItem>`. The icon and truncating label render inside your link.
7. Pass icons through `icon`, not as children. The slot sizes them to `--size-xxs`; don't set Lucide's `size`.
8. Leave the top-left corner clear on phones. The menu button is fixed there above your page content.
9. Never pass `className` or `style` to any part. Put page padding on your own content wrapper.

## 9. Dos and don'ts

**Do:** mark the current page and name items for the rail.

```tsx
<NavigationDrawerItem
  asChild
  icon={<Receipt aria-hidden="true" />}
  active={pathname === "/invoices"}
  aria-current={pathname === "/invoices" ? "page" : undefined}
  aria-label="Invoices"
>
  <Link href="/invoices">Invoices</Link>
</NavigationDrawerItem>
```

**Don't:** rely on `active` alone, or wrap a link in an item that already renders one.

```tsx
<NavigationDrawerItem icon={<Receipt />} active>
  <a href="/invoices">Invoices</a>
</NavigationDrawerItem>
```

**Do:** let the layout place the toggle.

```tsx
<div style={{ height: "100dvh" }}>
  <NavigationDrawerLayout sidebar={<AppSidebar />}>
    <main style={{ padding: "var(--spacing-xl)" }}>{children}</main>
  </NavigationDrawerLayout>
</div>
```

**Don't:** put the toggle in the header, where collapsing hides it.

```tsx
<NavigationDrawerProvider>
  <NavigationDrawer>
    <NavigationDrawerHeader>
      Acme
      <NavigationDrawerToggle />
    </NavigationDrawerHeader>
  </NavigationDrawer>
</NavigationDrawerProvider>
```

## 10. Accessibility

- Role: on desktop the drawer is an `<aside>` (`complementary` landmark); on phones its children sit in a `<nav>` inside a `dialog` (the Sheet), titled "Navigation menu" for screen readers. Items are links. Wrap your items in `<nav aria-label="Main">` inside `NavigationDrawerContent` so desktop has a navigation landmark too, as the tests do. <!-- REVIEW: source finding, not in the fix plan: the desktop branch renders no nav landmark. -->
- Label: items are named by their text while expanded and need `aria-label` when collapsed (Rule 4). The toggle is labelled "Collapse navigation" or "Expand navigation"; the phone menu button "Open navigation".
- Current page: add `aria-current="page"` yourself (Rule 3).
- Group labels are `<h4>` elements; check they fit your page's heading outline.
- Keyboard: Tab moves through items in order; Enter follows a link. On phones the Sheet traps focus, Escape closes it, and focus returns to the menu button.
- Contrast: handled by the theme. Don't override colours. The item focus ring uses `--interactive-border-alt` at 1px and measures well below 3:1; don't patch it per item. <!-- REVIEW: system-wide focus-ring contrast issue (W1), see foundations/colour.md; this item draws its ring with box-shadow rather than outline. -->

## 11. Behaviour

- Responsive: the breakpoint is 768px, read from `window.innerWidth` on mount and on resize. The first render (including server rendering) is the desktop sidebar, which then switches to the phone button on small screens.
- Phone sheet: uncontrolled by default; control it with `mobileOpen` and `onMobileOpenChange` on the provider or layout. Clicking any item closes it.
- Collapse: uncontrolled. Start collapsed with `defaultCollapsed`; change it later with `setCollapsed` from `useNavigationDrawer`. There is no controlled `collapsed` prop.
- Overflow and truncation: item labels truncate with an ellipsis; `NavigationDrawerContent` scrolls while the header and footer stay put.
- Motion: the width animates over 300ms when collapsing; item colours transition over 150ms. Don't add more.

## 12. API

<!-- api:start -->
### NavigationDrawerProvider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | | Required. |
| `defaultCollapsed` | `boolean` | `false` | Starts as the icon rail. |
| `mobileOpen` | `boolean` | | Controlled open state of the phone sheet. |
| `defaultMobileOpen` | `boolean` | `false` | Initial phone sheet state when uncontrolled. |
| `onMobileOpenChange` | `(open: boolean) => void` | | Called when the phone sheet opens or closes, including on item clicks. |

### NavigationDrawerLayout

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sidebar` | `ReactNode` | | Required. The drawer's parts: Header, Content, Footer. |
| `children` | `ReactNode` | | Required. The page content, shown in the scrolling main column. |
| `defaultCollapsed`, `mobileOpen`, `defaultMobileOpen`, `onMobileOpenChange` | as on the provider | | Passed to the provider it renders. |

### NavigationDrawer, NavigationDrawerHeader, NavigationDrawerContent, NavigationDrawerFooter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | `aria-*`, `id`. On phones, props passed to `NavigationDrawer` itself are not applied. |

### NavigationDrawerItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | | A Lucide icon, sized to the `--size-xxs` slot. |
| `active` | `boolean` | `false` | Shows the current-page fill. Visual only. |
| `asChild` | `boolean` | `false` | Renders your single child (a router link) as the item, with the icon and label inside it. |
| `...props` | `AnchorHTMLAttributes<HTMLAnchorElement>` without `className`, `style` | | `href`, `onClick`, `aria-current`, `aria-label`. |

### NavigationDrawerGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | | Optional group heading, rendered as an `<h4>`. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | |

### NavigationDrawerToggle

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | | Called after the drawer toggles. |
| `...props` | `ButtonHTMLAttributes<HTMLButtonElement>` without `className`, `style` | | `aria-label` overrides the built-in "Collapse navigation" / "Expand navigation". |

### useNavigationDrawer

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `collapsed` | `boolean` | `false` | Whether the desktop drawer is a rail. |
| `setCollapsed` | `(collapsed: boolean) => void` | | Collapses or expands it. |
| `isMobile` | `boolean` | `false` | `true` below 768px. |
| `mobileOpen` | `boolean` | `false` | Whether the phone sheet is open; always `false` on desktop. |
| `setMobileOpen` | `(open: boolean) => void` | | Opens or closes the phone sheet. |
<!-- api:end -->

## 13. Examples

```tsx
import * as React from "react";
import {
  NavigationDrawerContent,
  NavigationDrawerFooter,
  NavigationDrawerGroup,
  NavigationDrawerHeader,
  NavigationDrawerItem,
  NavigationDrawerLayout,
  Typography,
} from "@eluan/core";
import { FolderKanban, HelpCircle, Home, Receipt, Settings, Users } from "lucide-react";

const sections = [
  { href: "/", label: "Dashboard", icon: <Home aria-hidden="true" /> },
  { href: "/projects", label: "Projects", icon: <FolderKanban aria-hidden="true" /> },
  { href: "/invoices", label: "Invoices", icon: <Receipt aria-hidden="true" /> },
];

const workspace = [
  { href: "/team", label: "Team", icon: <Users aria-hidden="true" /> },
  { href: "/settings", label: "Settings", icon: <Settings aria-hidden="true" /> },
];

function DrawerItem({ href, label, icon, pathname }: { href: string; label: string; icon: React.ReactNode; pathname: string }) {
  const current = pathname === href;
  return (
    <NavigationDrawerItem
      href={href}
      icon={icon}
      active={current}
      aria-current={current ? "page" : undefined}
      aria-label={label}
    >
      {label}
    </NavigationDrawerItem>
  );
}

export function AppShell({ pathname, children }: { pathname: string; children: React.ReactNode }) {
  return (
    <div style={{ height: "100dvh" }}>
      <NavigationDrawerLayout
        sidebar={
          <>
            <NavigationDrawerHeader>
              <Typography variant="label" weight="semibold">Acme Finance</Typography>
            </NavigationDrawerHeader>
            <NavigationDrawerContent>
              <nav aria-label="Main">
                <NavigationDrawerGroup>
                  {sections.map((item) => (
                    <DrawerItem key={item.href} {...item} pathname={pathname} />
                  ))}
                </NavigationDrawerGroup>
                <NavigationDrawerGroup label="Workspace">
                  {workspace.map((item) => (
                    <DrawerItem key={item.href} {...item} pathname={pathname} />
                  ))}
                </NavigationDrawerGroup>
              </nav>
            </NavigationDrawerContent>
            <NavigationDrawerFooter>
              <DrawerItem href="/help" label="Help" icon={<HelpCircle aria-hidden="true" />} pathname={pathname} />
            </NavigationDrawerFooter>
          </>
        }
      >
        <main style={{ padding: "var(--spacing-xl)" }}>{children}</main>
      </NavigationDrawerLayout>
    </div>
  );
}
```

## 14. Related components

- [Sheet](./sheet.md): what the drawer becomes on phones; also the right choice for temporary side panels.
- [Header](./header.md): top navigation for websites.
- [NavigationMenu](./navigation-menu.md): top navigation with link panels.
- [Breadcrumb](./breadcrumb.md): shows the current page's place inside a section.
- [TreeView](./tree-view.md): nested hierarchies inside a section.
- See [navigation patterns](../patterns/navigation.md) and [page layout](../patterns/page-layout.md).

## 15. Common agent mistakes

_Filled from evals._
