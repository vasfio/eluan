import type * as React from "react"

/**
 * Assign a value to a React ref, whether it is a callback ref or a ref object.
 *
 * Internal helper — intentionally not part of the public export surface.
 */
export function assignRef<T>(
  ref: React.Ref<T> | undefined,
  value: T | null
): void {
  if (typeof ref === "function") {
    ref(value)
  } else if (ref != null) {
    ;(ref as React.MutableRefObject<T | null>).current = value
  }
}

/**
 * Merge several refs into a single callback ref. Each provided ref receives the
 * node on mount (and `null` on cleanup). Accepts callback refs, ref objects,
 * `null`, and `undefined`.
 *
 * Internal helper — intentionally not part of the public export surface.
 */
export function composeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): (node: T | null) => void {
  return (node) => {
    for (const ref of refs) {
      assignRef(ref, node)
    }
  }
}
