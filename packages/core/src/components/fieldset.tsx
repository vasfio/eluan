import * as React from "react"
import { cn } from "@/lib/utils"

// Fieldset renders as a div to avoid the native <fieldset> legend-cuts-border-line behaviour
const Fieldset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-4 rounded-lg border border-[var(--container-border-alt)] p-4", className)}
    {...props}
  />
))
Fieldset.displayName = "Fieldset"

const FieldsetLegend = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-4 text-sm font-medium text-[var(--foregrounds-primary)] leading-none", className)}
    {...props}
  />
))
FieldsetLegend.displayName = "FieldsetLegend"

const FieldsetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--foregrounds-tertiary)]", className)}
    {...props}
  />
))
FieldsetDescription.displayName = "FieldsetDescription"

export { Fieldset, FieldsetLegend, FieldsetDescription }
