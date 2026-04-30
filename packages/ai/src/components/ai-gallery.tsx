import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardTitle, CardDescription, Button } from "@vasf/ragnar-core"

const aiGalleryVariants = cva("grid", {
  variants: {
    columns: {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    },
    gap: {
      sm: "gap-[var(--spacing-sm)]",
      default: "gap-[var(--spacing-md)]",
      lg: "gap-[var(--spacing-lg)]",
    },
  },
  defaultVariants: {
    columns: 3,
    gap: "default",
  },
})

/** Grid container for the AI gallery. */
export interface AIGalleryProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiGalleryVariants> {}

const AIGallery = React.forwardRef<HTMLDivElement, AIGalleryProps>(
  ({ className, columns, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(aiGalleryVariants({ columns, gap }), className)}
      {...props}
    />
  )
)
AIGallery.displayName = "AIGallery"

/** Individual gallery item card. */
export interface AIGalleryItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** URL for the preview image or illustration. */
  image?: string
  /** Alt text for the preview image. */
  imageAlt?: string
  /** Title of the gallery item. */
  title?: string
  /** Short description. */
  description?: string
  /** Metadata text (e.g. category, date). */
  metadata?: string
  /** Label for the action button. Defaults to "Try". */
  actionLabel?: string
  /** Called when the action button is clicked. */
  onAction?: () => void
}

const AIGalleryItem = React.forwardRef<HTMLDivElement, AIGalleryItemProps>(
  (
    {
      className,
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
      className={cn(
        "group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-px",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden bg-[var(--interactive-bg-alt2)]">
          <img
            src={image}
            alt={imageAlt ?? title ?? ""}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <CardContent className="flex flex-1 flex-col gap-[var(--spacing-xxs)] p-[var(--spacing-sm)]">
        {title && <CardTitle className="text-[length:var(--font-size-sm)] leading-snug">{title}</CardTitle>}
        {description && (
          <CardDescription className="leading-relaxed">{description}</CardDescription>
        )}
        {metadata && (
          <span className="text-[length:var(--font-size-xs)] text-[color:var(--foregrounds-tertiary)]">
            {metadata}
          </span>
        )}
        {children}
      </CardContent>
      {onAction && (
        <CardFooter className="px-[var(--spacing-sm)] pb-[var(--spacing-sm)]">
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
        </CardFooter>
      )}
    </Card>
  )
)
AIGalleryItem.displayName = "AIGalleryItem"

export { AIGallery, aiGalleryVariants, AIGalleryItem }
