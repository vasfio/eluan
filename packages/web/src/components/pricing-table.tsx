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
} from "@ragnar/core"

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
          <Check className="mx-auto h-5 w-5 text-green-500" />
        ) : (
          <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
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
                    plan.highlighted && "bg-primary/5"
                  )}
                >
                  <div className="flex flex-col gap-1">
                    {plan.highlighted && (
                      <span className="text-xs font-medium text-primary">
                        Most Popular
                      </span>
                    )}
                    <span className="font-heading text-lg font-semibold text-foreground">
                      {plan.name}
                    </span>
                    <div className="font-heading text-2xl font-bold text-foreground">
                      {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
                      {plan.period && (
                        <span className="text-sm font-normal text-muted-foreground">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    {plan.description && (
                      <span className="text-xs text-muted-foreground">
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
                      plan.highlighted && "bg-primary/5"
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
