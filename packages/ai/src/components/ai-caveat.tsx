import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"

const aiCaveatVariants = cva(
  "inline-flex items-center gap-[var(--spacing-xs)] text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)]",
  {
    variants: {
      variant: {
        subtle: "",
        bordered:
          "border rounded-[var(--curves-sm)] p-[var(--spacing-xs)] bg-[var(--container-bg-alt)]",
        warning:
          "border border-[var(--cautionary-border)] rounded-[var(--curves-sm)] p-[var(--spacing-xs)] bg-[var(--cautionary-bg-alt,var(--container-bg-alt))] text-[color:var(--cautionary-fg-strong)]",
      },
    },
    defaultVariants: {
      variant: "subtle",
    },
  }
)

export interface AICaveatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiCaveatVariants> {
  /** Override the default icon */
  icon?: React.ReactNode
}

const AICaveat = React.forwardRef<HTMLDivElement, AICaveatProps>(
  ({ className, variant, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(aiCaveatVariants({ variant }), className)}
      {...props}
    >
      {icon ?? <AlertTriangle className="h-3 w-3 shrink-0" />}
      <span>{children}</span>
    </div>
  )
)
AICaveat.displayName = "AICaveat"

export { AICaveat, aiCaveatVariants }
