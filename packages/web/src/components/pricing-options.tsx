import * as React from "react"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@ragnar/core"

const pricingOptionsVariants = cva(
  "grid gap-6",
  {
    variants: {
      columns: {
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      },
    },
    defaultVariants: {
      columns: 3,
    },
  }
)

export interface PricingOption {
  id: string
  name: string
  description?: string
  price: string | number
  originalPrice?: string | number
  period?: string
  features: string[]
  highlighted?: boolean
  highlightLabel?: string
  buttonText?: string
  buttonVariant?: "default" | "outline" | "secondary"
  disabled?: boolean
  onSelect?: () => void
}

export interface PricingOptionsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pricingOptionsVariants> {
  options: PricingOption[]
}

const PricingOptions = React.forwardRef<HTMLDivElement, PricingOptionsProps>(
  ({ className, columns, options, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pricingOptionsVariants({ columns }), className)}
        {...props}
      >
        {options.map((option) => (
          <PricingCard key={option.id} option={option} />
        ))}
      </div>
    )
  }
)
PricingOptions.displayName = "PricingOptions"

interface PricingCardProps {
  option: PricingOption
}

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({ option }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col rounded-2xl border border-[var(--container-border)]/60 bg-[var(--container-bg)] p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]",
          option.highlighted && "border-[var(--action-primary-bg)]/40 shadow-sm ring-1 ring-[var(--action-primary-bg)]/20"
        )}
      >
        {option.highlighted && option.highlightLabel && (
          <span className="absolute -top-3 right-4 inline-flex items-center rounded-full bg-[var(--action-primary-bg)] px-3 py-1 text-xs font-normal text-[var(--action-primary-fg)]">
            {option.highlightLabel}
          </span>
        )}
        <div className="mb-6 text-center">
          <h3 className="font-heading text-lg font-medium text-[var(--foregrounds-primary)]">
            {option.name}
          </h3>
          {option.description && (
            <p className="mt-1 text-sm text-[var(--foregrounds-tertiary)]">
              {option.description}
            </p>
          )}
          <div className="mt-4">
            {option.originalPrice && (
              <span className="mr-2 text-lg text-[var(--foregrounds-tertiary)] line-through">
                {typeof option.originalPrice === "number"
                  ? `$${option.originalPrice}`
                  : option.originalPrice}
              </span>
            )}
            <span className="font-heading text-4xl font-medium text-[var(--foregrounds-primary)]">
              {typeof option.price === "number"
                ? `$${option.price}`
                : option.price}
            </span>
            {option.period && (
              <span className="text-sm text-[var(--foregrounds-tertiary)]">/{option.period}</span>
            )}
          </div>
        </div>
        <ul className="mb-8 flex-1 space-y-3.5">
          {option.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-4 w-4 shrink-0 text-[var(--positive-fg)]" />
              <span className="text-sm text-[var(--foregrounds-secondary)]">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full"
          variant={option.buttonVariant ?? (option.highlighted ? "default" : "outline")}
          disabled={option.disabled}
          onClick={option.onSelect}
          style={
            option.highlighted
              ? { backgroundColor: "var(--action-primary-bg)", color: "var(--action-primary-fg)" }
              : undefined
          }
        >
          {option.buttonText ?? "Get Started"}
        </Button>
      </div>
    )
  }
)
PricingCard.displayName = "PricingCard"

export { PricingOptions, PricingCard }
