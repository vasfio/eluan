import * as React from "react"
import * as stylex from "@stylexjs/stylex"

export type AISuggestionsLayout = "default" | "grid"
export type AISuggestionItemVariant = "default" | "filled" | "ghost"
export type AISuggestionItemSize = "sm" | "default" | "lg"

/** Container for AI suggestion chips. */
export interface AISuggestionsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Number of columns when layout is "grid". */
  columns?: 2 | 3 | 4
  layout?: AISuggestionsLayout
}

const styles = stylex.create({
  suggestions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-xs)",
  },
  suggestionsGrid: {
    display: "grid",
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
  item: {
    alignItems: "center",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    cursor: "pointer",
    display: "inline-flex",
    fontWeight: 400,
    gap: "var(--spacing-xs)",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":focus": {
      outlineStyle: "none",
    },
    ":focus-visible": {
      outlineColor: "var(--interactive-border-alt)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    ":disabled": {
      opacity: 0.5,
      pointerEvents: "none",
    },
  },
  itemDefault: {
    backgroundColor: "transparent",
    borderColor: "var(--container-border-alt)",
    color: "var(--container-fg-alt)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-alt2)",
    },
  },
  itemFilled: {
    backgroundColor: "var(--interactive-bg-alt2)",
    borderColor: "transparent",
    color: "var(--container-fg-alt)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-alt)",
    },
  },
  itemGhost: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: "var(--container-fg-alt)",
    ":hover": {
      color: "var(--container-fg)",
    },
  },
  itemSm: {
    fontSize: "var(--font-size-xs)",
    paddingBlock: "var(--spacing-xxs)",
    paddingInline: "var(--spacing-xs)",
  },
  itemDefaultSize: {
    fontSize: "var(--font-size-sm)",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
  },
  itemLg: {
    fontSize: "var(--font-size-base)",
    paddingBlock: "var(--spacing-sm)",
    paddingInline: "var(--spacing-md)",
  },
  icon: {
    flexShrink: 0,
  },
})

const AISuggestions = React.forwardRef<HTMLDivElement, AISuggestionsProps>(
  ({ layout = "default", columns, ...props }, ref) => (
    <div
      ref={ref}
      role="list"
      {...props}
      {...stylex.props(
        styles.suggestions,
        layout === "grid" && styles.suggestionsGrid,
        layout === "grid" && columns === 2 && styles.columns2,
        layout === "grid" && columns === 3 && styles.columns3,
        layout === "grid" && columns === 4 && styles.columns4
      )}
    />
  )
)
AISuggestions.displayName = "AISuggestions"

/** Individual suggestion chip. */
export interface AISuggestionItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  /** Optional icon rendered before the text. */
  icon?: React.ReactNode
  size?: AISuggestionItemSize
  variant?: AISuggestionItemVariant
}

const AISuggestionItem = React.forwardRef<
  HTMLButtonElement,
  AISuggestionItemProps
>(({ variant = "default", size = "default", icon, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    role="listitem"
    {...props}
    {...stylex.props(
      styles.item,
      variant === "default" && styles.itemDefault,
      variant === "filled" && styles.itemFilled,
      variant === "ghost" && styles.itemGhost,
      size === "sm" && styles.itemSm,
      size === "default" && styles.itemDefaultSize,
      size === "lg" && styles.itemLg
    )}
  >
    {icon && <span {...stylex.props(styles.icon)}>{icon}</span>}
    {children}
  </button>
))
AISuggestionItem.displayName = "AISuggestionItem"

export {
  AISuggestions,
  AISuggestionItem,
}
