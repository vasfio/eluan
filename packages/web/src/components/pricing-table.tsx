import * as React from "react"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@vasf/ragnar-core"

export interface PricingPlan {
  id: string
  name: string
  price: string | number
  period?: string
  description?: string
  highlighted?: boolean
  buttonText?: string
  onSelect?: () => void
}

export interface PricingFeature {
  name: string
  tooltip?: string
  values: Record<string, boolean | string>
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: PricingPlan[]
  features: PricingFeature[]
  featureGroupTitle?: string
}

const PricingTable = React.forwardRef<HTMLDivElement, PricingTableProps>(
  ({ className, plans, features, featureGroupTitle = "Features", ...props }, ref) => {
    const renderCellValue = (value: boolean | string) => {
      if (typeof value === "boolean") {
        return value ? (
          <Check className="mx-auto h-[var(--size-xs)] w-[var(--size-xs)] text-[var(--positive-fg)]" />
        ) : (
          <X className="mx-auto h-[var(--size-xs)] w-[var(--size-xs)] text-[var(--container-fg-alt)]" />
        )
      }
      return <span className="text-[var(--font-size-sm)]">{value}</span>
    }

    return (
      <div ref={ref} className={cn("w-full overflow-auto", className)} {...props}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">{featureGroupTitle}</TableHead>
              {plans.map((plan) => (
                <TableHead
                  key={plan.id}
                  className={cn(
                    "text-center",
                    plan.highlighted && "bg-[var(--interactive-bg-alt2)]"
                  )}
                >
                  <div className="flex flex-col gap-[var(--spacing-xs)]">
                    {/* Fixed height eyebrow row -- always rendered so titles stay aligned */}
                    <div className="h-[var(--size-sm)] flex items-center justify-center">
                      {plan.highlighted ? (
                        <span className="text-[10px] font-medium text-[var(--action-primary-bg)] uppercase tracking-wider leading-none">
                          Most Popular
                        </span>
                      ) : (
                        <span aria-hidden className="invisible text-[10px] leading-none">&nbsp;</span>
                      )}
                    </div>
                    <span className="font-heading text-[var(--font-size-base)] font-semibold text-[var(--container-fg)]">
                      {plan.name}
                    </span>
                    <div className="font-heading text-[var(--font-size-2xl)] font-semibold text-[var(--container-fg)]">
                      {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
                      {plan.period && (
                        <span className="text-[var(--font-size-sm)] font-normal text-[var(--container-fg-alt)]">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    {plan.description && (
                      <span className="text-[var(--font-size-xs)] text-[var(--container-fg-alt)]">
                        {plan.description}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                {plans.map((plan) => (
                  <TableCell
                    key={plan.id}
                    className={cn(
                      "text-center",
                      plan.highlighted && "bg-[var(--interactive-bg-alt2)]"
                    )}
                  >
                    {renderCellValue(feature.values[plan.id] ?? false)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
)
PricingTable.displayName = "PricingTable"

export { PricingTable }
