import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@vasf/ragnar-core"

const aiFollowUpVariants = cva("flex flex-col", {
  variants: {
    variant: {
      list: "gap-0",
      cards: "gap-[var(--spacing-xs)]",
      chips: "flex-row flex-wrap gap-[var(--spacing-xs)]",
    },
  },
  defaultVariants: {
    variant: "list",
  },
})

export interface AIFollowUpProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiFollowUpVariants> {
  /** Optional heading text */
  heading?: string
}

const AIFollowUp = React.forwardRef<HTMLDivElement, AIFollowUpProps>(
  ({ className, variant, heading, children, ...props }, ref) => (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {heading && (
        <p className="text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)] uppercase tracking-wide font-medium mb-[var(--spacing-sm)]">
          {heading}
        </p>
      )}
      <div className={cn(aiFollowUpVariants({ variant }))}>{children}</div>
    </div>
  )
)
AIFollowUp.displayName = "AIFollowUp"

const aiFollowUpItemVariants = cva(
  "flex items-center gap-[var(--spacing-xs)] text-[length:var(--font-size-sm)] text-[color:var(--container-fg)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        list: "p-[var(--spacing-xs)] py-[var(--spacing-sm)] border-b border-[var(--container-border)] hover:bg-[var(--interactive-bg-hover)] last:border-b-0",
        cards:
          "p-[var(--spacing-sm)] border border-[var(--container-border)] rounded-[var(--curves-md)] hover:bg-[var(--interactive-bg-hover)]",
        chips:
          "px-[var(--spacing-sm)] py-[var(--spacing-xs)] border border-[var(--container-border)] rounded-[var(--curves-md)] hover:bg-[var(--interactive-bg-hover)]",
      },
    },
    defaultVariants: {
      variant: "list",
    },
  }
)

export interface AIFollowUpItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof aiFollowUpItemVariants> {
  /** Hide the arrow icon */
  hideIcon?: boolean
}

const AIFollowUpItem = React.forwardRef<
  HTMLButtonElement,
  AIFollowUpItemProps
>(({ className, variant, hideIcon = false, children, ...props }, ref) => (
  <Button
    ref={ref}
    variant={variant === "chips" ? "outline" : "ghost"}
    size={variant === "chips" ? "sm" : "default"}
    className={cn(
      aiFollowUpItemVariants({ variant }),
      variant !== "chips" && "w-full justify-start",
      className
    )}
    {...props}
  >
    {!hideIcon && (
      <ArrowRight className="h-[var(--size-xxs)] w-[var(--size-xxs)] shrink-0 text-[color:var(--container-fg-alt)]" />
    )}
    <span className="text-left">{children}</span>
  </Button>
))
AIFollowUpItem.displayName = "AIFollowUpItem"

export {
  AIFollowUp,
  aiFollowUpVariants,
  AIFollowUpItem,
  aiFollowUpItemVariants,
}
