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
          <Check className="mx-auto h-5 w-5 text-[var(--positive-fg)]" />
        ) : (
          <X className="mx-auto h-5 w-5 text-[var(--foregrounds-tertiary)]/40" />
        )
      }
      return <span className="text-sm">{value}</span>
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
                    plan.highlighted && "bg-[var(--interactive-bg-alt2)]/20"
                  )}
                >
                  <div className="flex flex-col gap-1">
                    {/* Fixed height for eyebrow so all titles align regardless of badge presence */}
                    <div className="h-5 flex items-center justify-center">
                      {plan.highlighted && (
                        <span className="text-[10px] font-medium text-[var(--action-primary-bg)] uppercase tracking-wider">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <span className="font-heading text-base font-semibold text-[var(--foregrounds-primary)]">
                      {plan.name}
                    </span>
                    <div className="font-heading text-2xl font-semibold text-[var(--foregrounds-primary)]">
                      {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
                      {plan.period && (
                        <span className="text-sm font-normal text-[var(--foregrounds-tertiary)]">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    {plan.description && (
                      <span className="text-xs text-[var(--foregrounds-quinary)]">
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
                      plan.highlighted && "bg-[var(--interactive-bg-alt2)]/20"
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
