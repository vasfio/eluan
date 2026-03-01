import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const formLabelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      required: {
        true: "after:ml-0.5 after:text-destructive after:content-['*']",
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
    <div className="flex items-baseline gap-2">
      <label
        ref={ref}
        className={cn(formLabelVariants({ required }), className)}
        {...props}
      >
        {children}
      </label>
      {optional && (
        <span className="text-xs text-muted-foreground">(optional)</span>
      )}
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
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
    className={cn("text-sm text-muted-foreground", className)}
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
      "text-sm",
      error ? "text-destructive" : "text-muted-foreground",
      className
    )}
    {...props}
  />
))
FormMessage.displayName = "FormMessage"

export { FormLabel, FormDescription, FormMessage, formLabelVariants }
