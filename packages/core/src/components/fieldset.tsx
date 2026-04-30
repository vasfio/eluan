import * as React from "react"
import { cn } from "@/lib/utils"

// Fieldset renders as a div to avoid the native <fieldset> legend-cuts-border-line behaviour
const Fieldset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-4 rounded-[var(--curves-lg)] border border-[var(--container-border-alt)] p-[var(--spacing-lg)]", className)}
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
    className={cn("mb-[var(--spacing-lg)] text-[length:var(--font-size-sm)] font-medium text-[color:var(--container-fg)] leading-none", className)}
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
    className={cn("text-[length:var(--font-size-sm)] text-[color:var(--container-fg-alt)]", className)}
    {...props}
  />
))
FieldsetDescription.displayName = "FieldsetDescription"

export { Fieldset, FieldsetLegend, FieldsetDescription }
