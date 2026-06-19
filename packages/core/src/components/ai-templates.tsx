import * as React from "react"
import * as stylex from "@stylexjs/stylex"

import { Badge } from "./badge"
import { Card } from "./card"

export type AITemplatesColumns = 2 | 3 | 4
export type AITemplatesGap = "sm" | "default" | "lg"

/** Grid container for AI template cards. */
export interface AITemplatesProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  columns?: AITemplatesColumns
  gap?: AITemplatesGap
}

export type AITemplateCardVariant = "default" | "compact"

/** Individual template card. */
export interface AITemplateCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Description shown in default variant; hidden in compact. */
  description?: string
  /** Optional icon rendered at the top of the card. */
  icon?: React.ReactNode
  /** Tags rendered as small chips below the description. */
  tags?: string[]
  /** Title of the template. */
  title: string
  variant?: AITemplateCardVariant
}

const styles = stylex.create({
  grid: {
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
  gapSm: {
    gap: "var(--spacing-sm)",
  },
  gapDefault: {
    gap: "var(--spacing-md)",
  },
  gapLg: {
    gap: "var(--spacing-lg)",
  },
  cardInner: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    transitionDuration: "200ms",
    transitionProperty: "all",
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
  },
  cardDefault: {
    padding: "var(--spacing-md)",
  },
  cardCompact: {
    padding: "var(--spacing-sm)",
  },
  icon: {
    color: "var(--foregrounds-secondary)",
    flexShrink: 0,
  },
  title: {
    color: "var(--container-fg)",
    fontFamily: "var(--font-heading)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 600,
    lineHeight: 1.375,
  },
  description: {
    color: "var(--foregrounds-tertiary)",
    fontSize: "var(--font-size-sm)",
    lineHeight: 1.625,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-xxs)",
  },
})

const columnStyles = {
  2: styles.columns2,
  3: styles.columns3,
  4: styles.columns4,
} satisfies Record<AITemplatesColumns, stylex.StyleXStyles>

const gapStyles = {
  sm: styles.gapSm,
  default: styles.gapDefault,
  lg: styles.gapLg,
} satisfies Record<AITemplatesGap, stylex.StyleXStyles>

const AITemplates = React.forwardRef<HTMLDivElement, AITemplatesProps>(
  ({ columns = 3, gap = "default", ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(styles.grid, columnStyles[columns], gapStyles[gap])}
    />
  )
)
AITemplates.displayName = "AITemplates"

const AITemplateCard = React.forwardRef<HTMLDivElement, AITemplateCardProps>(
  (
    { variant = "default", icon, title, description, tags, children, ...props },
    ref
  ) => (
    <Card
      ref={ref}
      clickable
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          e.currentTarget.click()
        }
      }}
      {...props}
    >
      <div
        {...stylex.props(
          styles.cardInner,
          variant === "default" ? styles.cardDefault : styles.cardCompact
        )}
      >
        {icon && <span {...stylex.props(styles.icon)}>{icon}</span>}
        <div {...stylex.props(styles.title)}>{title}</div>
        {variant !== "compact" && description && (
          <div {...stylex.props(styles.description)}>{description}</div>
        )}
        {tags && tags.length > 0 && (
          <div {...stylex.props(styles.tags)}>
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {children}
      </div>
    </Card>
  )
)
AITemplateCard.displayName = "AITemplateCard"

export {
  AITemplates,
  AITemplateCard,
}
