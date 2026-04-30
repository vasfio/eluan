import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[var(--interactive-bg-alt)]">
      <SliderPrimitive.Range className="absolute h-full bg-[var(--interactive-bg-selected)] data-[disabled]:bg-[var(--interactive-fg-disabled)]" />
    </SliderPrimitive.Track>
    {/* Render a thumb for each value to support range (two dials) */}
    {(Array.isArray(props.value) ? props.value : props.defaultValue ?? [0]).map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block h-[var(--size-xxs)] w-[var(--size-xxs)] rounded-full border border-[var(--interactive-bg-selected)] bg-[var(--interactive-bg)] shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1 data-[disabled]:pointer-events-none data-[disabled]:border-[var(--interactive-fg-disabled)] data-[disabled]:bg-[var(--interactive-bg-disabled)]"
      />
    ))}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
