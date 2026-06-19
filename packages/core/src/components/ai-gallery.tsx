import * as React from "react"
import * as stylex from "@stylexjs/stylex"

import { Button } from "./button"
import { Card } from "./card"

export type AIGalleryColumns = 2 | 3 | 4
export type AIGalleryGap = "sm" | "default" | "lg"

/** Grid container for the AI gallery. */
export interface AIGalleryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  columns?: AIGalleryColumns
  gap?: AIGalleryGap
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
  item: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transitionDuration: "200ms",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      transform: "translateY(-1px)",
    },
  },
  media: {
    aspectRatio: "16 / 9",
    backgroundColor: "var(--interactive-bg-alt2)",
    overflow: "hidden",
    width: "100%",
  },
  image: {
    height: "100%",
    objectFit: "cover",
    transitionDuration: "200ms",
    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "100%",
    ":hover": {
      transform: "scale(1.02)",
    },
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: "var(--spacing-xxs)",
    padding: "var(--spacing-sm)",
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
  metadata: {
    color: "var(--foregrounds-tertiary)",
    fontSize: "var(--font-size-xs)",
  },
  footer: {
    paddingBlockEnd: "var(--spacing-sm)",
    paddingInline: "var(--spacing-sm)",
  },
})

const columnStyles = {
  2: styles.columns2,
  3: styles.columns3,
  4: styles.columns4,
} satisfies Record<AIGalleryColumns, stylex.StyleXStyles>

const gapStyles = {
  sm: styles.gapSm,
  default: styles.gapDefault,
  lg: styles.gapLg,
} satisfies Record<AIGalleryGap, stylex.StyleXStyles>

const AIGallery = React.forwardRef<HTMLDivElement, AIGalleryProps>(
  ({ columns = 3, gap = "default", ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(styles.grid, columnStyles[columns], gapStyles[gap])}
    />
  )
)
AIGallery.displayName = "AIGallery"

/** Individual gallery item card. */
export interface AIGalleryItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Label for the action button. Defaults to "Try". */
  actionLabel?: string
  /** Short description. */
  description?: string
  /** URL for the preview image or illustration. */
  image?: string
  /** Alt text for the preview image. */
  imageAlt?: string
  /** Metadata text (e.g. category, date). */
  metadata?: string
  /** Called when the action button is clicked. */
  onAction?: () => void
  /** Title of the gallery item. */
  title?: string
}

const AIGalleryItem = React.forwardRef<HTMLDivElement, AIGalleryItemProps>(
  (
    {
      image,
      imageAlt,
      title,
      description,
      metadata,
      actionLabel = "Try",
      onAction,
      onClick,
      children,
      ...props
    },
    ref
  ) => (
    <Card
      ref={ref}
      clickable={!!onClick}
      onClick={onClick}
      {...props}
    >
      <div {...stylex.props(styles.item)}>
        {image && (
          <div {...stylex.props(styles.media)}>
            <img
              src={image}
              alt={imageAlt ?? title ?? ""}
              {...stylex.props(styles.image)}
            />
          </div>
        )}
        <div {...stylex.props(styles.content)}>
          {title && <div {...stylex.props(styles.title)}>{title}</div>}
          {description && <div {...stylex.props(styles.description)}>{description}</div>}
          {metadata && <span {...stylex.props(styles.metadata)}>{metadata}</span>}
          {children}
        </div>
        {onAction && (
          <div {...stylex.props(styles.footer)}>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation()
                onAction()
              }}
            >
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
)
AIGalleryItem.displayName = "AIGalleryItem"

export { AIGallery, AIGalleryItem }
