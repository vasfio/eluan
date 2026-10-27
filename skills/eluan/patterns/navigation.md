---
name: navigation
---

# Navigation

## When this applies

Moving between pages, sections or views: app shells, top bars, sidebars, in-page tabs, breadcrumbs and paging. The router sends "Let the user move between views" here.

## Choosing components

| Situation | Use | Not |
| --- | --- | --- |
| Site or app top bar with logo, links and actions | [Header](../components/header.md) (`logo`, `items`, `actions`) | a hand-built `<nav>` |
| Top-bar menus with rich dropdown panels | [NavigationMenu](../components/navigation-menu.md) | DropdownMenu: that's for actions, not destinations |
| App sidebar with sections, collapsible on desktop and a sheet on mobile | [NavigationDrawer](../components/navigation-drawer.md) inside `NavigationDrawerLayout` | Drawer or Sheet with your own links |
| Switching views of the same object on one page (Overview, Activity, Settings) | [Tabs](../components/tabs.md) | Buttons or links styled as tabs |
| Switching a mode or filter of the same view (Day, Week, Month) | [SegmentedControl](../components/segmented-control.md) | Tabs: no panels to switch |
| Showing where the page sits in a hierarchy | [Breadcrumb](../components/breadcrumb.md) | a row of links with slashes |
| Moving through pages of results | [Pagination](../components/pagination.md) | Previous/Next Buttons you wire yourself |
| A step-by-step flow | [Stepper](../components/stepper.md) | Tabs: steps have an order |
| Application menus (File, Edit, View) | [Menubar](../components/menubar.md) | NavigationMenu |
| A link inside text or a single link-styled action | your router's link, or [Button](../components/button.md) `variant="link"` with `asChild` | Button with an `onClick` that changes the URL |

<!-- REVIEW: Tabs vs SegmentedControl split (panels vs mode) is drafted from what each renders; the source doesn't state it. -->

## Structure

- One primary navigation per app: a Header for marketing sites and simple apps, a NavigationDrawer for apps with many sections. Don't stack both as primary nav.
- Breadcrumb sits at the top of the content area, above the page title.
- Tabs sit directly under the heading of the thing they switch, and their panels follow.
- Pagination sits under the collection it pages, aligned to the end.

## Rules

1. Navigate with real links (`href`), so middle-click, copy link and the back button work. Use `asChild` on Eluan parts to render your router's link.
2. Mark the current page: `active` on Header `NavItem`s and NavigationDrawer items, `BreadcrumbPage` for the last crumb, `aria-current="page"` on any link you compose.
3. Use Tabs only when every tab has a panel on the same page. If a tab changes the URL to a different page, it's navigation; use links.
4. Never style Buttons or links to look like tabs; keyboard and screen-reader behaviour won't match.
5. Keep top-level labels to one or two words, in sentence case.
6. Don't hide primary navigation behind a hover-only control. Every menu must open by click and keyboard.

## Example

```tsx
import {
  Header,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from "@eluan/core";

export function ProjectPage({ name }: { name: string }) {
  return (
    <>
      <Header
        logo={<a href="/">Acme</a>}
        items={[
          { label: "Projects", href: "/projects", active: true },
          { label: "Reports", href: "/reports" },
          { label: "Team", href: "/team" },
        ]}
      />
      <main style={{ padding: "var(--spacing-xl)", display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
        <Typography variant="title" as="h1">{name}</Typography>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Summary of the project.</TabsContent>
          <TabsContent value="activity">Recent changes.</TabsContent>
          <TabsContent value="settings">Project settings.</TabsContent>
        </Tabs>
      </main>
    </>
  );
}
```

## Dos and don'ts

**Do:** use Tabs for views of one object on one page.

**Don't:** use a row of Buttons with a selected style; Tabs carry the roles and arrow-key behaviour.

**Do:** use NavigationDrawer for an app sidebar; it already handles collapse and the mobile sheet.

**Don't:** build a sidebar from a Sheet and a list of links.

## Common agent mistakes

_Filled from evals._
