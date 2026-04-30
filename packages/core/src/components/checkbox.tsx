import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Fixed size with min-w to prevent layout shift on check
      "peer relative h-[var(--size-xxs)] w-[var(--size-xxs)] min-w-[var(--size-xxs)] shrink-0 rounded-[3px] border border-[var(--interactive-border-alt)]",
      "ring-offset-background transition-colors",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1",
      "disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:border-[var(--interactive-border-disabled)]",
      "data-[state=checked]:bg-[var(--interactive-bg-selected)] data-[state=checked]:border-[var(--interactive-bg-selected)] data-[state=checked]:text-[color:var(--interactive-fg-selected)]",
      "hover:border-[var(--interactive-border-alt)] hover:text-[color:var(--interactive-fg-alt)] hover:bg-[var(--interactive-bg-hover)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      forceMount
      className="flex h-full w-full items-center justify-center text-current data-[state=unchecked]:opacity-0 data-[state=checked]:opacity-100 transition-opacity"
    >
      <Check className="h-3 w-3 absolute" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
