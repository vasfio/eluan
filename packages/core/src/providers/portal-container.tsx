"use client"

import * as React from "react"

// ============================================
// Portal container
// ============================================
// Radix overlays (`*Primitive.Portal`) mount into `document.body` by default,
// which puts them *outside* any element that scopes Eluan's theme attributes
// (`data-theme` / `data-mode` / `data-spacing` / `data-curves` / `data-typeset`).
// A scoped region therefore gets a correctly themed trigger but a
// default-themed popover.
//
// `PortalContainerProvider` supplies the element every Eluan overlay should
// portal into, so overlays land back inside the scope and inherit its tokens.
//
// Usage:
//   const [scope, setScope] = React.useState<HTMLElement | null>(null)
//
//   <div ref={setScope} data-theme="minimal" data-mode="dark">
//     <PortalContainerProvider container={scope}>
//       <DropdownMenu>…</DropdownMenu>
//     </PortalContainerProvider>
//   </div>
//
// Apps that scope a theme through `EluanProvider target={el}` can pass the same
// element to its `portalContainer` prop instead of nesting this provider.
//
// CAVEAT — containing blocks: Radix positions popper content with
// `position: fixed`, so a container anywhere in normal flow works. But if the
// container *or any ancestor* has a `transform`, `filter`, `perspective`,
// `backdrop-filter`, `contain: paint|layout|strict|content`, or
// `will-change` naming one of those, that element becomes the containing block
// for fixed positioning and the overlay will be offset (and clipped by
// `contain`). Choose a container without those properties, or move the
// transform onto an inner wrapper.

const PortalContainerContext = React.createContext<HTMLElement | undefined>(
  undefined
)

/**
 * Accepted container shapes: a resolved element, `null`/`undefined` (fall back
 * to `document.body`), or a ref object holding the element.
 */
export type PortalContainerValue =
  | HTMLElement
  | null
  | undefined
  | React.RefObject<HTMLElement | null>

export interface PortalContainerProviderProps {
  /**
   * Element every descendant overlay portals into. Pass `null`/`undefined` to
   * keep Radix's default (`document.body`). A ref object is resolved after
   * mount, so `<div ref={ref}>` wrappers work without extra state.
   */
  container?: PortalContainerValue
  children: React.ReactNode
}

function isRefObject(
  value: PortalContainerValue
): value is React.RefObject<HTMLElement | null> {
  return typeof value === "object" && value !== null && "current" in value
}

function resolveContainer(value: PortalContainerValue): HTMLElement | undefined {
  if (!value) return undefined
  return (isRefObject(value) ? value.current : value) ?? undefined
}

/**
 * Scopes the portal target for every Eluan overlay below it (DropdownMenu,
 * Popover, Select, ContextMenu, Dialog, Sheet, Menubar).
 *
 * See the containing-block caveat above: a `transform`, `filter`, `contain` or
 * `perspective` on the container or one of its ancestors re-anchors the
 * `position: fixed` popper to that element.
 */
export function PortalContainerProvider({
  container,
  children,
}: PortalContainerProviderProps) {
  // A ref object passed as `container` is still empty on the first render, and
  // mutating `.current` never re-renders. One forced pass after mount lets
  // descendants resolve it. Prefer a callback ref into state
  // (`<div ref={setEl}>`) when the container can change over time.
  const [, settle] = React.useState(false)
  React.useEffect(() => {
    settle(true)
  }, [])

  const resolved = resolveContainer(container)

  return (
    <PortalContainerContext.Provider value={resolved}>
      {children}
    </PortalContainerContext.Provider>
  )
}

/**
 * Returns the portal target from the nearest `PortalContainerProvider`, or
 * `undefined` when there is none (Radix then portals to `document.body`).
 */
export function usePortalContainer(): HTMLElement | undefined {
  return React.useContext(PortalContainerContext)
}
