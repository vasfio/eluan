import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "./button"

const aiSuggestionsVariants = cva("flex flex-wrap", {
  variants: {
    layout: {
      default: "gap-[var(--spacing-xs)]",
      grid: "grid gap-[var(--spacing-xs)]",
    },
  },
  defaultVariants: {
    layout: "default",
  },
})

/** Container for AI suggestion chips. */
export interface AISuggestionsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiSuggestionsVariants> {
  /** Number of columns when layout is "grid". */
  columns?: 2 | 3 | 4
}

const AISuggestions = React.forwardRef<HTMLDivElement, AISuggestionsProps>(
  ({ className, layout, columns, ...props }, ref) => (
    <div
      ref={ref}
      role="list"
      className={cn(
        aiSuggestionsVariants({ layout }),
        layout === "grid" && columns && `grid-cols-${columns}`,
        className
      )}
      {...props}
    />
  )
)
AISuggestions.displayName = "AISuggestions"

const aiSuggestionItemVariants = cva(
  "inline-flex items-center gap-[var(--spacing-xs)] rounded-[var(--curves-md)] font-normal transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--interactive-border-alt)] focus:ring-offset-1 cursor-pointer disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--container-border-alt)] bg-transparent text-[var(--container-fg-alt)] hover:bg-[var(--interactive-bg-alt2)]",
        filled:
          "border border-transparent bg-[var(--interactive-bg-alt2)] text-[var(--container-fg-alt)] hover:bg-[var(--interactive-bg-alt)]",
        ghost:
          "border border-transparent bg-transparent text-[var(--container-fg-alt)] hover:text-[var(--container-fg)]",
      },
      size: {
        sm: "px-[var(--spacing-xs)] py-[var(--spacing-xxs)] text-[var(--font-size-xs)]",
        default:
          "px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[var(--font-size-sm)]",
        lg: "px-[var(--spacing-md)] py-[var(--spacing-sm)] text-[var(--font-size-base)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/** Map suggestion variant to Button variant */
const variantMap = {
  default: "outline",
  filled: "secondary",
  ghost: "ghost",
} as const

/** Map suggestion size to Button size */
const sizeMap = {
  sm: "sm",
  default: "default",
  lg: "lg",
} as const

/** Individual suggestion chip. */
export interface AISuggestionItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof aiSuggestionItemVariants> {
  /** Optional icon rendered before the text. */
  icon?: React.ReactNode
}

const AISuggestionItem = React.forwardRef<
  HTMLButtonElement,
  AISuggestionItemProps
>(({ className, variant = "default", size = "default", icon, children, ...props }, ref) => (
  <Button
    ref={ref}
    type="button"
    role="listitem"
    variant={variantMap[variant ?? "default"]}
    size={sizeMap[size ?? "default"]}
    className={className}
    {...props}
  >
    {icon && <span className="shrink-0">{icon}</span>}
    {children}
  </Button>
))
AISuggestionItem.displayName = "AISuggestionItem"

export {
  AISuggestions,
  aiSuggestionsVariants,
  AISuggestionItem,
  aiSuggestionItemVariants,
}
