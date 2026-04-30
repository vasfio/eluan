import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-[var(--curves-md)] text-[length:var(--font-size-sm)] font-medium ring-offset-background transition-colors hover:bg-[var(--interactive-bg-hover)] hover:text-[color:var(--interactive-fg)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:bg-[var(--interactive-bg-disabled)] disabled:text-[color:var(--interactive-fg-disabled)] data-[state=on]:bg-[var(--interactive-bg-selected)] data-[state=on]:text-[color:var(--interactive-fg-selected)] [&_svg]:pointer-events-none [&_svg]:size-[var(--size-xxs)] [&_svg]:shrink-0 gap-[var(--spacing-sm)]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-[var(--interactive-border-alt)] bg-transparent hover:bg-[var(--interactive-bg-hover)] hover:text-[color:var(--interactive-fg)]",
      },
      size: {
        default: "h-[var(--size-lg)] px-[var(--spacing-md)] min-w-[var(--size-lg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
