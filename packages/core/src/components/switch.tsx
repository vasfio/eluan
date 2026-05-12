import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      // The 2px border preserves the thumb's stable offset across spacing
      // densities. Its color must match the active track bg so it reads as a
      // single solid pill rather than a haloed selection state.
      "peer inline-flex h-[var(--size-xs)] w-[var(--size-lg)] shrink-0 cursor-pointer items-center rounded-full border-2",
      "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:text-[color:var(--interactive-fg-disabled)]",
      "data-[state=checked]:bg-[var(--interactive-bg-selected)] data-[state=checked]:border-[var(--interactive-bg-selected)]",
      "data-[state=unchecked]:bg-[var(--interactive-border-alt)] data-[state=unchecked]:border-[var(--interactive-border-alt)]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-[var(--size-xxs)] w-[var(--size-xxs)] rounded-full bg-[var(--interactive-bg)] shadow-sm ring-0 transition-transform",
        // Translate by (track inner width − thumb width) so the right padding
        // when checked matches the left padding when unchecked across all
        // spacing densities. 4px accounts for the 2px transparent border on each side.
        "data-[state=checked]:translate-x-[calc(var(--size-lg)-var(--size-xxs)-4px)] data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
