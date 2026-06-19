import * as React from "react"
import * as stylex from "@stylexjs/stylex"

import { Badge } from "./badge"
import { Toggle } from "./toggle"

export interface AIFiltersProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {}

const styles = stylex.create({
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-xs)",
  },
  icon: {
    flexShrink: 0,
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  count: {
    alignItems: "center",
    display: "inline-flex",
    height: "var(--size-xs)",
    justifyContent: "center",
    lineHeight: 1,
    minWidth: "var(--size-xs)",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xxs)",
  },
  label: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
    fontWeight: 500,
  },
})

const AIFilters = React.forwardRef<HTMLDivElement, AIFiltersProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.filters)}>
      {children}
    </div>
  )
)
AIFilters.displayName = "AIFilters"

export interface AIFilterChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style" | "onChange"> {
  /** Optional count badge rendered after the label */
  count?: number
  /** Icon rendered before the label */
  icon?: React.ReactNode
  /** Called when the chip is toggled */
  onToggle?: (selected: boolean) => void
  /** Whether the chip is currently selected / active */
  selected?: boolean
}

const AIFilterChip = React.forwardRef<HTMLButtonElement, AIFilterChipProps>(
  (
    {
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
      onClick={onClick}
      {...props}
    >
      {icon && <span {...stylex.props(styles.icon)}>{icon}</span>}
      <span>{children}</span>
      {count !== undefined && (
        <Badge variant="secondary">
          <span {...stylex.props(styles.count)}>{count}</span>
        </Badge>
      )}
    </Toggle>
  )
)
AIFilterChip.displayName = "AIFilterChip"

export interface AIFilterGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Group label displayed above the chips */
  label: string
}

const AIFilterGroup = React.forwardRef<HTMLDivElement, AIFilterGroupProps>(
  ({ label, children, ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.group)}>
      <span {...stylex.props(styles.label)}>{label}</span>
      <div {...stylex.props(styles.filters)}>{children}</div>
    </div>
  )
)
AIFilterGroup.displayName = "AIFilterGroup"

export { AIFilters, AIFilterChip, AIFilterGroup }
