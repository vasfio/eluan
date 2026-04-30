import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border font-normal transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--container-border)]/50 focus:ring-offset-1",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--action-primary-bg)] text-[color:var(--action-primary-fg)]",
        secondary:
          "border-transparent bg-[var(--interactive-bg-alt2)] text-[color:var(--container-fg-alt)]",
        destructive:
          "border-transparent bg-[var(--destructive-bg-alt)] text-[color:var(--destructive-fg)]",
        outline:
          "border-[var(--container-border)] text-[color:var(--container-fg-alt)] bg-transparent",
        positive:
          "border-transparent bg-[var(--positive-bg)] text-[color:var(--positive-fg)]",
        cautionary:
          "border-transparent bg-[var(--cautionary-bg)] text-[color:var(--cautionary-fg)]",
        informative:
          "border-transparent bg-[var(--informative-bg)] text-[color:var(--informative-fg)]",
        important:
          "border-transparent bg-[var(--important-bg)] text-[color:var(--important-fg)]",
      },
      size: {
        default:
          "gap-1 rounded-[var(--curves-md)] px-[var(--spacing-xs)] py-[var(--spacing-xxs)] text-[length:var(--font-size-xs)]",
        microdot:
          "h-2.5 w-2.5 rounded-full p-0 border-0 ring-2 ring-[var(--container-bg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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

function Badge({ className, variant, size, onRemove, removable, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {size !== "microdot" && children}
      {size !== "microdot" && (removable || onRemove) && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
          className="ml-[var(--spacing-xxs)] -mr-[var(--spacing-xxs)] rounded-[var(--curves-xl)] opacity-60 hover:opacity-100 transition-opacity focus:outline-none"
          aria-label="Remove"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
}

export { Badge, badgeVariants }
