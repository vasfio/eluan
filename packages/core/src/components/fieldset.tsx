import * as React from "react"

import { cn } from "@/lib/utils"

const Fieldset = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => (
  <fieldset
    ref={ref}
    className={cn("space-y-4 rounded-lg border p-4", className)}
    {...props}
  />
))
Fieldset.displayName = "Fieldset"

const FieldsetLegend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement>
>(({ className, ...props }, ref) => (
  <legend
    ref={ref}
    className={cn("px-2 text-sm font-medium leading-none", className)}
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
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
FieldsetDescription.displayName = "FieldsetDescription"

export { Fieldset, FieldsetLegend, FieldsetDescription }
