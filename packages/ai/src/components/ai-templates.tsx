import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from "@vasf/ragnar-core"

const aiTemplatesVariants = cva("grid", {
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

/** Grid container for AI template cards. */
export interface AITemplatesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiTemplatesVariants> {}

const AITemplates = React.forwardRef<HTMLDivElement, AITemplatesProps>(
  ({ className, columns, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(aiTemplatesVariants({ columns, gap }), className)}
      {...props}
    />
  )
)
AITemplates.displayName = "AITemplates"

const aiTemplateCardVariants = cva(
  "flex cursor-pointer flex-col gap-[var(--spacing-xs)] transition-all duration-200 hover:shadow-md hover:border-[var(--interactive-border-alt)] focus:outline-none focus:ring-1 focus:ring-[var(--interactive-border-alt)]",
  {
    variants: {
      variant: {
        default: "p-[var(--spacing-md)]",
        compact: "p-[var(--spacing-sm)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/** Individual template card. */
export interface AITemplateCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiTemplateCardVariants> {
  /** Optional icon rendered at the top of the card. */
  icon?: React.ReactNode
  /** Title of the template. */
  title: string
  /** Description shown in default variant; hidden in compact. */
  description?: string
  /** Tags rendered as small chips below the description. */
  tags?: string[]
}

const AITemplateCard = React.forwardRef<HTMLDivElement, AITemplateCardProps>(
  (
    { className, variant, icon, title, description, tags, children, ...props },
    ref
  ) => (
    <Card
      ref={ref}
      clickable
      role="button"
      tabIndex={0}
      className={cn(aiTemplateCardVariants({ variant }), className)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          e.currentTarget.click()
        }
      }}
      {...props}
    >
      <CardHeader className="p-0 gap-[var(--spacing-xs)]">
        {icon && (
          <span className="shrink-0 text-[color:var(--foregrounds-secondary)]">
            {icon}
          </span>
        )}
        <CardTitle className="text-[length:var(--font-size-sm)] leading-snug">{title}</CardTitle>
        {variant !== "compact" && description && (
          <CardDescription className="leading-relaxed">{description}</CardDescription>
        )}
      </CardHeader>
      {tags && tags.length > 0 && (
        <CardContent className="p-0">
          <div className="flex flex-wrap gap-[var(--spacing-xxs)]">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
      {children}
    </Card>
  )
)
AITemplateCard.displayName = "AITemplateCard"

export {
  AITemplates,
  aiTemplatesVariants,
  AITemplateCard,
  aiTemplateCardVariants,
}
