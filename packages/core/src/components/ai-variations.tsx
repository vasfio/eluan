import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { RefreshCw } from "lucide-react"

import { Button } from "./button"
import { Card } from "./card"

export type AIVariationsColumns = 2 | 3 | 4

export interface AIVariationsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  columns?: AIVariationsColumns
}

export interface AIVariationItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  label?: string
  onRegenerate?: () => void
  onSelect?: () => void
  selected?: boolean
}

const styles = stylex.create({
  grid: {
    display: "grid",
    gap: "var(--spacing-sm)",
  },
  columns2: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  columns3: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
  columns4: {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  },
  cardInner: {
    overflow: "hidden",
    transitionDuration: "150ms",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    },
  },
  selected: {
    boxShadow: "0 0 0 2px var(--action-primary-bg)",
  },
  content: {
    padding: "var(--spacing-sm)",
  },
  footer: {
    alignItems: "center",
    borderTopColor: "var(--container-border)",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
  },
  meta: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "var(--spacing-xs)",
  },
  label: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
  },
  icon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
})

const columnStyles = {
  2: styles.columns2,
  3: styles.columns3,
  4: styles.columns4,
} satisfies Record<AIVariationsColumns, stylex.StyleXStyles>

const AIVariations = React.forwardRef<HTMLDivElement, AIVariationsProps>(
  ({ columns = 2, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(styles.grid, columnStyles[columns])}
    >
      {children}
    </div>
  )
)
AIVariations.displayName = "AIVariations"

const AIVariationItem = React.forwardRef<HTMLDivElement, AIVariationItemProps>(
  (
    {
      selected = false,
      onSelect,
      label,
      onRegenerate,
      children,
      ...props
    },
    ref
  ) => (
    <Card ref={ref} elevation="none" {...props}>
      <div {...stylex.props(styles.cardInner, selected && styles.selected)}>
        <div {...stylex.props(styles.content)}>{children}</div>

        <div {...stylex.props(styles.footer)}>
          <Button
            size="sm"
            variant={selected ? "default" : "outline"}
            onClick={onSelect}
          >
            {selected ? "Selected" : "Select"}
          </Button>

          <div {...stylex.props(styles.meta)}>
            {label && <span {...stylex.props(styles.label)}>{label}</span>}
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
                <RefreshCw {...stylex.props(styles.icon)} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
)
AIVariationItem.displayName = "AIVariationItem"

export { AIVariations, AIVariationItem }
