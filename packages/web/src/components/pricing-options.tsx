import * as React from "react"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@vasf/ragnar-core"

const pricingOptionsVariants = cva(
  "grid gap-[var(--spacing-md)]",
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
          "relative flex flex-col rounded-[var(--curves-xl)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] p-[var(--spacing-lg)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]",
          option.highlighted && "border-[color:var(--action-primary-bg)] shadow-sm ring-1 ring-[var(--action-primary-bg)]"
        )}
      >
        {option.highlighted && option.highlightLabel && (
          <span className="absolute -top-3 right-4 inline-flex items-center rounded-full bg-[var(--action-primary-bg)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[var(--font-size-xs)] font-normal text-[var(--action-primary-fg)]">
            {option.highlightLabel}
          </span>
        )}
        <div className="mb-[var(--spacing-md)] text-center">
          <h3 className="font-heading text-[var(--font-size-lg)] font-medium text-[var(--container-fg)]">
            {option.name}
          </h3>
          {option.description && (
            <p className="mt-[var(--spacing-xs)] text-[var(--font-size-sm)] text-[var(--container-fg-alt)]">
              {option.description}
            </p>
          )}
          <div className="mt-[var(--spacing-md)]">
            {option.originalPrice && (
              <span className="mr-[var(--spacing-sm)] text-[var(--font-size-lg)] text-[var(--container-fg-alt)] line-through">
                {typeof option.originalPrice === "number"
                  ? `$${option.originalPrice}`
                  : option.originalPrice}
              </span>
            )}
            <span className="font-heading text-[var(--font-size-4xl)] font-medium text-[var(--container-fg)]">
              {typeof option.price === "number"
                ? `$${option.price}`
                : option.price}
            </span>
            {option.period && (
              <span className="text-[var(--font-size-sm)] text-[var(--container-fg-alt)]">/{option.period}</span>
            )}
          </div>
        </div>
        <ul className="mb-[var(--spacing-lg)] flex-1 space-y-[var(--spacing-md)]">
          {option.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-[var(--spacing-sm)]">
              <Check className="h-[var(--size-xxs)] w-[var(--size-xxs)] shrink-0 text-[var(--positive-fg)]" />
              <span className="text-[var(--font-size-sm)] text-[var(--container-fg)]">{feature}</span>
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
