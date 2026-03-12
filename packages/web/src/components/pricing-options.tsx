import * as React from "react"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@vasf/ragnar-core"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@vasf/ragnar-core"
import { Badge } from "@vasf/ragnar-core"

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
      <Card
        ref={ref}
        className={cn(
          "relative flex flex-col",
          option.highlighted && "border-primary shadow-lg scale-105"
        )}
      >
        {option.highlighted && option.highlightLabel && (
          <Badge
            className="absolute -top-3 left-1/2 -translate-x-1/2"
            variant="default"
          >
            {option.highlightLabel}
          </Badge>
        )}
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{option.name}</CardTitle>
          {option.description && (
            <CardDescription>{option.description}</CardDescription>
          )}
          <div className="mt-4">
            {option.originalPrice && (
              <span className="mr-2 text-lg text-muted-foreground line-through">
                {typeof option.originalPrice === "number"
                  ? `$${option.originalPrice}`
                  : option.originalPrice}
              </span>
            )}
            <span className="font-heading text-4xl font-bold">
              {typeof option.price === "number"
                ? `$${option.price}`
                : option.price}
            </span>
            {option.period && (
              <span className="text-muted-foreground">/{option.period}</span>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <ul className="space-y-3">
            {option.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant={option.buttonVariant ?? (option.highlighted ? "default" : "outline")}
            disabled={option.disabled}
            onClick={option.onSelect}
          >
            {option.buttonText ?? "Get Started"}
          </Button>
        </CardFooter>
      </Card>
    )
  }
)
PricingCard.displayName = "PricingCard"

export { PricingOptions, PricingCard }
