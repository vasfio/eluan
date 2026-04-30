import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Coins, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@vasf/ragnar-core"

/* ---------------------------------------------------------------------------
 * Variants
 * --------------------------------------------------------------------------- */

const aiCostEstimateVariants = cva("", {
  variants: {
    variant: {
      inline:
        "inline-flex items-center gap-[var(--spacing-xxs)] text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)]",
      detailed:
        "flex flex-col gap-[var(--spacing-xs)] bg-[var(--container-bg-alt)] rounded-[var(--curves-sm)] p-[var(--spacing-sm)] text-[length:var(--font-size-sm)]",
    },
    icon: {
      coins: "",
      zap: "",
    },
  },
  defaultVariants: {
    variant: "inline",
    icon: "coins",
  },
})

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

export interface AICostBreakdownItem {
  /** Line item label */
  label: string
  /** Line item cost */
  cost: string | number
}

export interface AICostEstimateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiCostEstimateVariants> {
  /** Total cost value */
  cost: string | number
  /** Unit label displayed after the cost (e.g. "tokens", "credits") */
  unit?: string
  /** Optional breakdown of individual line items (only shown in "detailed" variant) */
  breakdown?: AICostBreakdownItem[]
  /** Whether to show an "estimated" indicator */
  estimated?: boolean
  /** Which lucide icon to show: "coins" or "zap" */
  icon?: "coins" | "zap"
}

/* ---------------------------------------------------------------------------
 * Component
 * --------------------------------------------------------------------------- */

const IconMap = {
  coins: Coins,
  zap: Zap,
} as const

const AICostEstimate = React.forwardRef<HTMLDivElement, AICostEstimateProps>(
  (
    {
      className,
      variant = "inline",
      icon = "coins",
      cost,
      unit,
      breakdown,
      estimated = false,
      ...props
    },
    ref
  ) => {
    const Icon = IconMap[icon ?? "coins"]

    if (variant === "detailed") {
      return (
        <div
          ref={ref}
          className={cn(aiCostEstimateVariants({ variant, icon }), className)}
          {...props}
        >
          {/* Header row */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-[var(--spacing-xxs)] font-medium text-[color:var(--container-fg)]">
              <Icon className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
              <span>Cost estimate</span>
              {estimated && (
                <Badge variant="secondary">est.</Badge>
              )}
            </span>
            <span className="font-medium text-[color:var(--container-fg)] tabular-nums">
              {cost}
              {unit && (
                <span className="ml-[var(--spacing-xxs)] text-[color:var(--container-fg-alt)] font-normal">
                  {unit}
                </span>
              )}
            </span>
          </div>

          {/* Breakdown items */}
          {breakdown && breakdown.length > 0 && (
            <div className="flex flex-col gap-[var(--spacing-xxs)] border-t border-[var(--container-border-alt)] pt-[var(--spacing-xs)]">
              {breakdown.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)]"
                >
                  <span>{item.label}</span>
                  <span className="tabular-nums">{item.cost}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    /* Inline variant */
    return (
      <div
        ref={ref}
        className={cn(aiCostEstimateVariants({ variant, icon }), className)}
        {...props}
      >
        <Icon className="h-3 w-3 shrink-0" />
        {estimated && <Badge variant="secondary" className="text-[0.625rem] px-1 py-0">~</Badge>}
        <span className="tabular-nums">
          {cost}
          {unit && <span className="ml-[var(--spacing-xxs)]">{unit}</span>}
        </span>
      </div>
    )
  }
)
AICostEstimate.displayName = "AICostEstimate"

export { AICostEstimate, aiCostEstimateVariants }
