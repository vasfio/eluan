import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { FileEdit, FileCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"
import { Badge } from "./badge"

const aiDraftIndicatorVariants = cva(
  "inline-flex items-center gap-[var(--spacing-xxs)] rounded-[var(--curves-xl)] text-[var(--font-size-sm)] font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "px-[var(--spacing-sm)] py-[var(--spacing-xxs)]",
        compact: "px-[var(--spacing-xs)] py-[var(--spacing-xxs)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AIDraftIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof aiDraftIndicatorVariants> {
  /** Current mode of the indicator */
  mode: "draft" | "final"
  /** Callback when the mode is toggled */
  onModeChange?: (mode: "draft" | "final") => void
  /** Optional label override */
  label?: string
  /** Show approximate token cost difference */
  showCost?: boolean
  /** Token cost string to display when showCost is true */
  cost?: string
}

const AIDraftIndicator = React.forwardRef<
  HTMLDivElement,
  AIDraftIndicatorProps
>(
  (
    {
      className,
      variant = "default",
      mode,
      onModeChange,
      label,
      showCost = false,
      cost,
      ...props
    },
    ref
  ) => {
    const isDraft = mode === "draft"
    const isCompact = variant === "compact"

    const modeClasses = isDraft
      ? "border border-dashed border-[var(--cautionary-border)] bg-[var(--cautionary-bg-alt)] text-[var(--cautionary-fg-strong)]"
      : "border border-solid border-[var(--positive-border)] bg-[var(--positive-bg-alt)] text-[var(--positive-fg-strong)]"

    const Icon = isDraft ? FileEdit : FileCheck
    const defaultLabel = isDraft ? "Draft" : "Final"

    if (isCompact) {
      return (
        <div
          ref={ref}
          className={cn(
            aiDraftIndicatorVariants({ variant }),
            modeClasses,
            className
          )}
          {...props}
        >
          <Icon className="h-3.5 w-3.5" />
          <span>{label || defaultLabel}</span>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-[var(--spacing-xxs)]",
          className
        )}
        {...props}
      >
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={mode}
          onValueChange={(value) => {
            if (value) onModeChange?.(value as "draft" | "final")
          }}
          aria-label="Draft or final mode"
        >
          <ToggleGroupItem
            value="draft"
            className={cn(
              "rounded-[var(--curves-xl)]",
              isDraft &&
                "border border-dashed border-[var(--cautionary-border)] bg-[var(--cautionary-bg-alt)] text-[var(--cautionary-fg-strong)]"
            )}
          >
            <FileEdit className="h-3.5 w-3.5" />
            Draft
          </ToggleGroupItem>
          <ToggleGroupItem
            value="final"
            className={cn(
              "rounded-[var(--curves-xl)]",
              !isDraft &&
                "border border-solid border-[var(--positive-border)] bg-[var(--positive-bg-alt)] text-[var(--positive-fg-strong)]"
            )}
          >
            <FileCheck className="h-3.5 w-3.5" />
            Final
          </ToggleGroupItem>
        </ToggleGroup>
        {showCost && cost && (
          <Badge variant="secondary">{cost}</Badge>
        )}
      </div>
    )
  }
)
AIDraftIndicator.displayName = "AIDraftIndicator"

export { AIDraftIndicator, aiDraftIndicatorVariants }
