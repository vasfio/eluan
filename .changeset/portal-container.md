---
"@eluan/core": minor
---

Add `PortalContainerProvider` / `usePortalContainer()` so portalled overlays stay inside a scoped theme.

Radix `*Primitive.Portal` mounts into `document.body`, which puts overlay content outside any element carrying scoped `data-theme` / `data-mode` / `data-spacing` / `data-curves` / `data-typeset` attributes — a scoped region got a themed trigger but a default-themed popover.

- New `PortalContainerProvider` (accepts an element or a ref object) and `usePortalContainer()`, both exported from the package root.
- `EluanProvider` gains an optional `portalContainer` prop that forwards to it, so `target={el} portalContainer={el}` scopes a theme and its overlays in one step.
- `PopoverContent`, `DropdownMenuContent`, `SelectContent`, `ContextMenuContent`, `DialogContent`, `SheetContent`, and `MenubarContent` read the context and accept an explicit `container` prop that overrides it.

Behaviour is unchanged without a provider: overlays still portal to `document.body`.
