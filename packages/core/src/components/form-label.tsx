import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const formLabelVariants = cva(
  "text-[var(--font-size-sm)] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:text-[var(--interactive-fg-disabled)]",
  {
    variants: {
      required: {
        true: "after:ml-[var(--spacing-xxs)] after:text-[var(--destructive-fg)] after:content-['*']",
        false: "",
      },
    },
    defaultVariants: {
      required: false,
    },
  }
)

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof formLabelVariants> {
  optional?: boolean
  hint?: string
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, optional, hint, children, ...props }, ref) => (
    <div className="flex items-baseline gap-[var(--spacing-sm)]">
      <label
        ref={ref}
        className={cn(formLabelVariants({ required }), className)}
        {...props}
      >
        {children}
      </label>
      {optional && (
        <span className="text-[var(--font-size-xs)] text-[var(--interactive-fg-alt)]">(optional)</span>
      )}
      {hint && <span className="text-[var(--font-size-xs)] text-[var(--interactive-fg-alt)]">{hint}</span>}
    </div>
  )
)
FormLabel.displayName = "FormLabel"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[var(--font-size-sm)] text-[var(--interactive-fg-alt)]", className)}
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
      "text-[var(--font-size-sm)]",
      error ? "text-destructive" : "text-[var(--interactive-fg-alt)]",
      className
    )}
    {...props}
  />
))
FormMessage.displayName = "FormMessage"

export { FormLabel, FormDescription, FormMessage, formLabelVariants }
