import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { ChevronLeft, ChevronRight, GitBranch } from "lucide-react"

import { Button } from "./button"

const aiBranchesVariants = () => ""

export interface AIBranchesProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
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
  variant?: "default" | "compact"
}

const styles = stylex.create({
  root: {
    alignItems: "center",
    display: "inline-flex",
    gap: "var(--spacing-xs)",
  },
  rootCompact: {
    gap: "var(--spacing-xxs)",
  },
  icon: {
    color: "var(--container-fg-alt)",
    flexShrink: 0,
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  iconCompact: {
    height: "calc(var(--size-xxs) - var(--spacing-xxs))",
    width: "calc(var(--size-xxs) - var(--spacing-xxs))",
  },
  count: {
    color: "var(--container-fg)",
    fontSize: "var(--font-size-sm)",
    fontVariantNumeric: "tabular-nums",
    userSelect: "none",
  },
  countCompact: {
    fontSize: "var(--font-size-xs)",
  },
  branch: {
    alignItems: "center",
    borderRadius: "var(--curves-sm)",
    borderWidth: 0,
    display: "inline-flex",
    fontSize: "var(--font-size-xs)",
    justifyContent: "center",
    paddingBlock: "var(--spacing-xxs)",
    paddingInline: "var(--spacing-xs)",
    transitionDuration: "150ms",
    transitionProperty: "background-color, color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  branchActive: {
    backgroundColor: "var(--interactive-bg-selected)",
    color: "var(--interactive-fg-selected)",
  },
  branchInactive: {
    backgroundColor: "transparent",
    color: "var(--container-fg-alt)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
      color: "var(--container-fg)",
    },
  },
})

const AIBranches = React.forwardRef<HTMLDivElement, AIBranchesProps>(
  (
    {
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
        role="navigation"
        aria-label="Branch navigation"
        {...props}
        {...stylex.props(styles.root, isCompact && styles.rootCompact)}
      >
        {showIcon && (
          <GitBranch
            {...stylex.props(styles.icon, isCompact && styles.iconCompact)}
          />
        )}
        <Button
          variant="ghost"
          size="inlineIcon"
          onClick={onPrevious}
          disabled={current <= 1}
          aria-label="Previous branch"
        >
          <ChevronLeft {...stylex.props(styles.icon, isCompact && styles.iconCompact)} />
        </Button>
        <span
          {...stylex.props(styles.count, isCompact && styles.countCompact)}
        >
          {current}/{total}
        </span>
        <Button
          variant="ghost"
          size="inlineIcon"
          onClick={onNext}
          disabled={current >= total}
          aria-label="Next branch"
        >
          <ChevronRight {...stylex.props(styles.icon, isCompact && styles.iconCompact)} />
        </Button>
      </div>
    )
  }
)
AIBranches.displayName = "AIBranches"

export interface AIBranchProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  /** Branch index (1-based) */
  index: number
  /** Whether this branch is the active one */
  active?: boolean
}

const AIBranch = React.forwardRef<HTMLButtonElement, AIBranchProps>(
  ({ index, active = false, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-current={active ? "true" : undefined}
      {...props}
      {...stylex.props(
        styles.branch,
        active ? styles.branchActive : styles.branchInactive
      )}
    >
      {index}
    </button>
  )
)
AIBranch.displayName = "AIBranch"

export { AIBranches, AIBranch, aiBranchesVariants }
