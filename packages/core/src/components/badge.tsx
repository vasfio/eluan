import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)]",
        secondary:
          "border-transparent bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-secondary)]",
        destructive:
          "border-transparent bg-[var(--destructive-bg-alt)] text-[var(--destructive-fg)]",
        outline:
          "border-[var(--container-border)] text-[var(--foregrounds-primary)] bg-transparent",
        positive:
          "border-transparent bg-[var(--positive-bg)] text-[var(--positive-fg)]",
        cautionary:
          "border-transparent bg-[var(--cautionary-bg)] text-[var(--cautionary-fg)]",
        informative:
          "border-transparent bg-[var(--informative-bg)] text-[var(--informative-fg)]",
        important:
          "border-transparent bg-[var(--important-bg)] text-[var(--important-fg)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show a remove button — call onRemove when clicked */
  onRemove?: () => void
  removable?: boolean
}

function Badge({ className, variant, onRemove, removable, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
      {(removable || onRemove) && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
          className="ml-0.5 -mr-0.5 rounded-full opacity-60 hover:opacity-100 transition-opacity focus:outline-none"
          aria-label="Remove"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
}

export { Badge, badgeVariants }
