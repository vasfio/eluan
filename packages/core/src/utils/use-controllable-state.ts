import * as React from "react"

interface UseControllableStateParams<T> {
  /** The controlled value. When not `undefined`, the component is controlled. */
  value?: T
  /** The value used to seed internal state in uncontrolled mode. */
  defaultValue: T
  /** Notified whenever the value should change, in both modes. */
  onChange?: (value: T) => void
}

/**
 * Controlled/uncontrolled state, modelled on Radix's `useControllableState`.
 *
 * When `value` is provided the component is controlled: internal state is
 * ignored and `onChange` is the only channel for updates. Otherwise the hook
 * owns its state and still forwards updates to `onChange`.
 *
 * Internal helper — intentionally not part of the public export surface.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>): [T, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? (value as T) : uncontrolled

  // Keep the latest onChange without giving `setValue` a new identity every
  // render — that stability lets callers memoize context values around it.
  const onChangeRef = React.useRef(onChange)
  React.useEffect(() => {
    onChangeRef.current = onChange
  })

  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) {
        setUncontrolled(next)
      }
      onChangeRef.current?.(next)
    },
    [isControlled]
  )

  return [current, setValue]
}
