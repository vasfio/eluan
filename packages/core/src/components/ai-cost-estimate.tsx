import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Coins, Zap } from "lucide-react"

import { Badge } from "./badge"

export interface AICostBreakdownItem {
  /** Line item label */
  label: string
  /** Line item cost */
  cost: string | number
}

export type AICostEstimateVariant = "inline" | "detailed"
export type AICostEstimateIcon = "coins" | "zap"

export interface AICostEstimateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Optional breakdown of individual line items (only shown in "detailed" variant) */
  breakdown?: AICostBreakdownItem[]
  /** Total cost value */
  cost: string | number
  /** Whether to show an "estimated" indicator */
  estimated?: boolean
  /** Which lucide icon to show: "coins" or "zap" */
  icon?: AICostEstimateIcon
  /** Unit label displayed after the cost (e.g. "tokens", "credits") */
  unit?: string
  variant?: AICostEstimateVariant
}

const IconMap = {
  coins: Coins,
  zap: Zap,
} as const

const styles = stylex.create({
  inline: {
    alignItems: "center",
    color: "var(--container-fg-alt)",
    display: "inline-flex",
    fontSize: "var(--font-size-xs)",
    gap: "var(--spacing-xxs)",
  },
  detailed: {
    backgroundColor: "var(--container-bg-alt)",
    borderRadius: "var(--curves-sm)",
    display: "flex",
    flexDirection: "column",
    fontSize: "var(--font-size-sm)",
    gap: "var(--spacing-xs)",
    padding: "var(--spacing-sm)",
  },
  header: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    alignItems: "center",
    color: "var(--container-fg)",
    display: "inline-flex",
    fontWeight: 500,
    gap: "var(--spacing-xxs)",
  },
  icon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  smallIcon: {
    flexShrink: 0,
    height: "var(--spacing-md)",
    width: "var(--spacing-md)",
  },
  amount: {
    color: "var(--container-fg)",
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
  },
  unit: {
    color: "var(--container-fg-alt)",
    fontWeight: 400,
    marginLeft: "var(--spacing-xxs)",
  },
  breakdown: {
    borderTopColor: "var(--container-border-alt)",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xxs)",
    paddingTop: "var(--spacing-xs)",
  },
  breakdownItem: {
    alignItems: "center",
    color: "var(--container-fg-alt)",
    display: "flex",
    fontSize: "var(--font-size-xs)",
    justifyContent: "space-between",
  },
  tabular: {
    fontVariantNumeric: "tabular-nums",
  },
  estimatedInline: {
    fontSize: "calc(var(--font-size-xs) * 0.8333)",
    lineHeight: 1,
  },
})

const AICostEstimate = React.forwardRef<HTMLDivElement, AICostEstimateProps>(
  (
    {
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
    const Icon = IconMap[icon]

    if (variant === "detailed") {
      return (
        <div ref={ref} {...props} {...stylex.props(styles.detailed)}>
          <div {...stylex.props(styles.header)}>
            <span {...stylex.props(styles.label)}>
              <Icon {...stylex.props(styles.icon)} />
              <span>Cost estimate</span>
              {estimated && <Badge variant="secondary">est.</Badge>}
            </span>
            <span {...stylex.props(styles.amount)}>
              {cost}
              {unit && <span {...stylex.props(styles.unit)}>{unit}</span>}
            </span>
          </div>

          {breakdown && breakdown.length > 0 && (
            <div {...stylex.props(styles.breakdown)}>
              {breakdown.map((item, index) => (
                <div key={index} {...stylex.props(styles.breakdownItem)}>
                  <span>{item.label}</span>
                  <span {...stylex.props(styles.tabular)}>{item.cost}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    return (
      <div ref={ref} {...props} {...stylex.props(styles.inline)}>
        <Icon {...stylex.props(styles.smallIcon)} />
        {estimated && (
          <Badge variant="secondary">
            <span {...stylex.props(styles.estimatedInline)}>~</span>
          </Badge>
        )}
        <span {...stylex.props(styles.tabular)}>
          {cost}
          {unit && <span {...stylex.props(styles.unit)}>{unit}</span>}
        </span>
      </div>
    )
  }
)
AICostEstimate.displayName = "AICostEstimate"

export { AICostEstimate }
