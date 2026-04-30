import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Badge,
} from "@vasf/ragnar-core"

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

export interface AIModelOption {
  /** Unique value identifier */
  value: string
  /** Display name */
  name: string
  /** Optional short description */
  description?: string
  /** Optional badge label (e.g. "Pro", "Free") */
  badge?: string
  /** Optional latency / cost indicator text */
  indicator?: string
  /** Optional icon rendered before the name */
  icon?: React.ReactNode
  /** Whether the option is disabled */
  disabled?: boolean
}

/* ---------------------------------------------------------------------------
 * Trigger variants
 * --------------------------------------------------------------------------- */

const aiModelSelectorTriggerVariants = cva(
  "inline-flex items-center justify-between gap-[var(--spacing-sm)] rounded-[var(--curves-md)] border border-[var(--interactive-border-alt)] bg-[var(--container-bg)] text-[color:var(--container-fg)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      size: {
        default:
          "px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)]",
        sm: "px-[var(--spacing-xs)] py-[var(--spacing-xxs)] text-[length:var(--font-size-xs)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

/* ---------------------------------------------------------------------------
 * AIModelSelector
 * --------------------------------------------------------------------------- */

export interface AIModelSelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof aiModelSelectorTriggerVariants> {
  /** Available model options */
  models: AIModelOption[]
  /** Currently selected model value */
  value?: string
  /** Callback when a model is selected */
  onValueChange?: (value: string) => void
}

const AIModelSelector = React.forwardRef<HTMLDivElement, AIModelSelectorProps>(
  ({ className, models, value, onValueChange, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            className={cn(
              aiModelSelectorTriggerVariants({ size }),
              "w-auto h-auto [&>span]:line-clamp-none"
            )}
          >
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem
                key={model.value}
                value={model.value}
                disabled={model.disabled}
                className="py-[var(--spacing-sm)]"
              >
                <span className="inline-flex items-center gap-[var(--spacing-xxs)]">
                  {model.icon && (
                    <span className="shrink-0 [&_svg]:h-[var(--size-xxs)] [&_svg]:w-[var(--size-xxs)]">
                      {model.icon}
                    </span>
                  )}
                  <span className="font-medium">{model.name}</span>
                  {model.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {model.badge}
                    </Badge>
                  )}
                </span>
                {model.description && (
                  <span className="block text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)]">
                    {model.description}
                  </span>
                )}
                {model.indicator && (
                  <span className="block text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)] opacity-75">
                    {model.indicator}
                  </span>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }
)
AIModelSelector.displayName = "AIModelSelector"

export { AIModelSelector, aiModelSelectorTriggerVariants }
