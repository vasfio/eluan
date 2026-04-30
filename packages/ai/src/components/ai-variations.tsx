import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { RefreshCw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, Button } from "@vasf/ragnar-core"

const aiVariationsVariants = cva(
  "grid gap-[var(--spacing-sm)]",
  {
    variants: {
      columns: {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
      },
    },
    defaultVariants: {
      columns: 2,
    },
  }
)

export interface AIVariationsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiVariationsVariants> {}

const AIVariations = React.forwardRef<HTMLDivElement, AIVariationsProps>(
  ({ className, columns, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(aiVariationsVariants({ columns }), className)}
      {...props}
    >
      {children}
    </div>
  )
)
AIVariations.displayName = "AIVariations"

export interface AIVariationItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean
  onSelect?: () => void
  label?: string
  onRegenerate?: () => void
}

const AIVariationItem = React.forwardRef<HTMLDivElement, AIVariationItemProps>(
  (
    {
      className,
      selected = false,
      onSelect,
      label,
      onRegenerate,
      children,
      ...props
    },
    ref
  ) => (
    <Card
      ref={ref}
      elevation="none"
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        selected
          ? "ring-2 ring-[var(--action-primary-bg)] border-[var(--action-primary-bg)]"
          : "",
        className
      )}
      {...props}
    >
      <CardContent className="p-[var(--spacing-sm)]">
        {children}
      </CardContent>

      <CardFooter className="flex flex-row items-center justify-between border-t border-[var(--container-border)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] p-0">
        <Button
          size="sm"
          variant={selected ? "default" : "outline"}
          onClick={onSelect}
        >
          {selected ? "Selected" : "Select"}
        </Button>

        <div className="flex flex-row items-center gap-[var(--spacing-xs)]">
          {label && (
            <span className="text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)]">
              {label}
            </span>
          )}
          {onRegenerate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onRegenerate()
              }}
              aria-label="Regenerate"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
)
AIVariationItem.displayName = "AIVariationItem"

export { AIVariations, AIVariationItem, aiVariationsVariants }
