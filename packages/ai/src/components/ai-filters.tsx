import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Toggle, Badge } from "@vasf/ragnar-core"

/* ---------------------------------------------------------------------------
 * AIFilters – flex-wrap container for filter chips
 * --------------------------------------------------------------------------- */

export interface AIFiltersProps extends React.HTMLAttributes<HTMLDivElement> {}

const AIFilters = React.forwardRef<HTMLDivElement, AIFiltersProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-wrap gap-[var(--spacing-xs)]", className)}
      {...props}
    >
      {children}
    </div>
  )
)
AIFilters.displayName = "AIFilters"

/* ---------------------------------------------------------------------------
 * AIFilterChip – toggleable chip button (backed by Toggle)
 * --------------------------------------------------------------------------- */

const aiFilterChipVariants = cva(
  "cursor-pointer select-none",
  {
    variants: {
      selected: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

export interface AIFilterChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof aiFilterChipVariants> {
  /** Whether the chip is currently selected / active */
  selected?: boolean
  /** Icon rendered before the label */
  icon?: React.ReactNode
  /** Optional count badge rendered after the label */
  count?: number
  /** Called when the chip is toggled */
  onToggle?: (selected: boolean) => void
}

const AIFilterChip = React.forwardRef<HTMLButtonElement, AIFilterChipProps>(
  (
    {
      className,
      selected = false,
      icon,
      count,
      onToggle,
      onClick,
      children,
      ...props
    },
    ref
  ) => (
    <Toggle
      ref={ref}
      variant="outline"
      pressed={selected}
      onPressedChange={(pressed) => onToggle?.(pressed)}
      className={cn("cursor-pointer select-none", className)}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="shrink-0 [&_svg]:h-[var(--size-xxs)] [&_svg]:w-[var(--size-xxs)]">{icon}</span>}
      <span>{children}</span>
      {count !== undefined && (
        <Badge variant="secondary" className="ml-[var(--spacing-xxs)] min-w-[1.25rem] h-[1.25rem] justify-center rounded-full px-[var(--spacing-xxs)] text-[length:var(--font-size-xs)] leading-none">
          {count}
        </Badge>
      )}
    </Toggle>
  )
)
AIFilterChip.displayName = "AIFilterChip"

/* ---------------------------------------------------------------------------
 * AIFilterGroup – labeled group of chips
 * --------------------------------------------------------------------------- */

export interface AIFilterGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Group label displayed above the chips */
  label: string
}

const AIFilterGroup = React.forwardRef<HTMLDivElement, AIFilterGroupProps>(
  ({ className, label, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-[var(--spacing-xxs)]", className)}
      {...props}
    >
      <span className="text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)] font-medium">
        {label}
      </span>
      <div className="flex flex-wrap gap-[var(--spacing-xs)]">{children}</div>
    </div>
  )
)
AIFilterGroup.displayName = "AIFilterGroup"

export { AIFilters, AIFilterChip, aiFilterChipVariants, AIFilterGroup }
