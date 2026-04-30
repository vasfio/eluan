import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-[length:var(--font-size-sm)] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:text-[color:var(--interactive-fg-disabled)]",
  {
    variants: {
      required: {
        true: "after:ml-[var(--spacing-xxs)] after:text-[color:var(--destructive-fg)] after:content-['*']",
        false: "",
      },
    },
    defaultVariants: {
      required: false,
    },
  }
)

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  optional?: boolean
  hint?: string
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, optional, hint, children, ...props }, ref) => (
    <div className="flex items-baseline gap-[var(--spacing-sm)]">
      <label
        ref={ref}
        className={cn(labelVariants({ required }), className)}
        {...props}
      >
        {children}
      </label>
      {optional && (
        <span className="text-[length:var(--font-size-xs)] text-[color:var(--interactive-fg-alt)]">(optional)</span>
      )}
      {hint && <span className="text-[length:var(--font-size-xs)] text-[color:var(--interactive-fg-alt)]">{hint}</span>}
    </div>
  )
)
Label.displayName = "Label"

/** @deprecated Use `Label` instead */
const FormLabel = Label

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[length:var(--font-size-sm)] text-[color:var(--interactive-fg-alt)]", className)}
    {...props}
  />
))
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { error?: boolean }
>(({ className, error = true, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[length:var(--font-size-sm)]",
      error ? "text-destructive" : "text-[color:var(--interactive-fg-alt)]",
      className
    )}
    {...props}
  />
))
FormMessage.displayName = "FormMessage"

export { Label, FormLabel, FormDescription, FormMessage, labelVariants }
