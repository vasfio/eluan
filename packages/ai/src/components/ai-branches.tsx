import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight, GitBranch } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@vasf/ragnar-core"

const aiBranchesVariants = cva(
  "inline-flex items-center gap-[var(--spacing-xs)]",
  {
    variants: {
      variant: {
        default: "",
        compact: "gap-[var(--spacing-xxs)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AIBranchesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiBranchesVariants> {
  /** Total number of branches */
  total: number
  /** Current active branch (1-based) */
  current: number
  /** Callback when navigating to the previous branch */
  onPrevious?: () => void
  /** Callback when navigating to the next branch */
  onNext?: () => void
  /** Optional callback for branch selection via dropdown */
  onBranchSelect?: (branch: number) => void
  /** Show a GitBranch icon prefix */
  showIcon?: boolean
}

const AIBranches = React.forwardRef<HTMLDivElement, AIBranchesProps>(
  (
    {
      className,
      variant,
      total,
      current,
      onPrevious,
      onNext,
      onBranchSelect,
      showIcon = false,
      ...props
    },
    ref
  ) => {
    const isCompact = variant === "compact"

    return (
      <div
        ref={ref}
        className={cn(aiBranchesVariants({ variant }), className)}
        role="navigation"
        aria-label="Branch navigation"
        {...props}
      >
        {showIcon && (
          <GitBranch
            className={cn(
              "shrink-0 text-[color:var(--container-fg-alt)]",
              isCompact ? "h-3.5 w-3.5" : "h-4 w-4"
            )}
          />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={current <= 1}
          className="h-auto w-auto p-[var(--spacing-xxs)]"
          aria-label="Previous branch"
        >
          <ChevronLeft className={isCompact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </Button>
        <span
          className={cn(
            "select-none tabular-nums text-[color:var(--container-fg)]",
            isCompact
              ? "text-[length:var(--font-size-xs)]"
              : "text-[length:var(--font-size-sm)]"
          )}
        >
          {current}/{total}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={current >= total}
          className="h-auto w-auto p-[var(--spacing-xxs)]"
          aria-label="Next branch"
        >
          <ChevronRight className={isCompact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </Button>
      </div>
    )
  }
)
AIBranches.displayName = "AIBranches"

export interface AIBranchProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /** Branch index (1-based) */
  index: number
  /** Whether this branch is the active one */
  active?: boolean
}

const AIBranch = React.forwardRef<HTMLButtonElement, AIBranchProps>(
  ({ className, index, active = false, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--curves-sm)] px-[var(--spacing-xs)] py-[var(--spacing-xxs)] text-[length:var(--font-size-xs)] transition-colors",
        active
          ? "bg-[var(--interactive-bg-selected)] text-[color:var(--interactive-fg-selected)]"
          : "text-[color:var(--container-fg-alt)] hover:bg-[var(--interactive-bg-hover)] hover:text-[color:var(--container-fg)]",
        className
      )}
      aria-current={active ? "true" : undefined}
      {...props}
    >
      {index}
    </button>
  )
)
AIBranch.displayName = "AIBranch"

export { AIBranches, AIBranch, aiBranchesVariants }
