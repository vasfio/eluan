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
      "peer h-4 w-4 min-w-4 shrink-0 rounded-sm border border-[var(--interactive-border-alt)]",
      "ring-offset-background transition-colors",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 focus-visible:ring-offset-1",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-foreground data-[state=checked]:border-foreground data-[state=checked]:text-background",
      "hover:border-[var(--interactive-fg-alt)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className="flex h-full w-full items-center justify-center text-current"
    >
      <Check className="h-3 w-3" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
