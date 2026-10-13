---
"@eluan/core": minor
---

NavigationDrawer: the mobile sheet closes when an item is clicked, and `asChild` works with router links.

- **Mobile sheet state lives in the provider.** Below 768px the drawer was an
  uncontrolled Radix Sheet, so an app had no way to close it after navigating —
  `SheetClose` is skipped once a client-side router has called
  `preventDefault()` on the click. `NavigationDrawerProvider` (and
  `NavigationDrawerLayout`) now own the sheet's open state and accept
  `mobileOpen`, `defaultMobileOpen` and `onMobileOpenChange` to control it.
  `useNavigationDrawer()` exposes `mobileOpen` and `setMobileOpen`.
- **Clicking a `NavigationDrawerItem` on mobile closes the sheet**, whether or
  not the click was default-prevented, so `next/link` and `router.push()`
  handlers both work without workarounds such as dispatching an Escape keydown.
- **`asChild` works with an icon.** The item passed its icon and label as two
  children to Radix `Slot`, which accepts only one, so
  `<NavigationDrawerItem asChild icon={…}><Link /></NavigationDrawerItem>`
  threw — and without an icon the item's styles landed on the label `<span>`
  instead of the link. The child is now marked with `Slottable`: the link
  receives the item styles, and the icon and truncating label render inside it.
- `NavigationDrawerProviderProps` and `NavigationDrawerLayoutProps` are now
  exported types.
