import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const bentoGridVariants = cva("grid gap-4", {
  variants: {
    columns: {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      auto: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    },
  },
  defaultVariants: {
    columns: "auto",
  },
})

export interface BentoGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoGridVariants> {}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, columns, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(bentoGridVariants({ columns }), className)}
      {...props}
    />
  )
)
BentoGrid.displayName = "BentoGrid"

const bentoCardVariants = cva(
  "group relative overflow-hidden rounded-xl border bg-card p-6 transition-all",
  {
    variants: {
      variant: {
        default: "hover:shadow-lg",
        ghost: "border-transparent bg-muted/50 hover:bg-muted",
        gradient: "border-transparent bg-gradient-to-br from-primary/10 to-primary/5",
      },
      size: {
        default: "",
        lg: "p-8",
      },
      span: {
        1: "col-span-1",
        2: "col-span-1 md:col-span-2",
        3: "col-span-1 md:col-span-2 lg:col-span-3",
        full: "col-span-full",
      },
      rowSpan: {
        1: "row-span-1",
        2: "row-span-1 md:row-span-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      span: 1,
      rowSpan: 1,
    },
  }
)

export interface BentoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoCardVariants> {
  href?: string
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ className, variant, size, span, rowSpan, href, children, ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        className={cn(bentoCardVariants({ variant, size, span, rowSpan }), className)}
        {...props}
      >
        {children}
      </div>
    )

    if (href) {
      return (
        <a href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {content}
        </a>
      )
    }

    return content
  }
)
BentoCard.displayName = "BentoCard"

const BentoCardIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
BentoCardIcon.displayName = "BentoCardIcon"

const BentoCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary",
      className
    )}
    {...props}
  />
))
BentoCardTitle.displayName = "BentoCardTitle"

const BentoCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-2 text-sm text-muted-foreground", className)}
    {...props}
  />
))
BentoCardDescription.displayName = "BentoCardDescription"

const BentoCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-4", className)} {...props} />
))
BentoCardContent.displayName = "BentoCardContent"

const BentoCardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src?: string
    alt?: string
  }
>(({ className, src, alt, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute inset-0 -z-10 opacity-10 transition-opacity group-hover:opacity-20",
      className
    )}
    {...props}
  >
    {src ? (
      <img src={src} alt={alt || ""} className="h-full w-full object-cover" />
    ) : (
      children
    )}
  </div>
))
BentoCardImage.displayName = "BentoCardImage"

const BentoCardBadge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "absolute right-4 top-4 inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground",
      className
    )}
    {...props}
  />
))
BentoCardBadge.displayName = "BentoCardBadge"

const BentoCardLink = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors",
      className
    )}
    {...props}
  >
    {children || "Learn more"}
    <svg
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </div>
))
BentoCardLink.displayName = "BentoCardLink"

// Preset bento layouts
const BentoGridPreset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    layout?: "default" | "asymmetric" | "featured"
  }
>(({ className, layout = "default", ...props }, ref) => {
  const layoutClasses = {
    default: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    asymmetric: "grid-cols-1 md:grid-cols-3 lg:grid-cols-4",
    featured: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(200px,1fr)]",
  }

  return (
    <div
      ref={ref}
      className={cn("grid gap-4", layoutClasses[layout], className)}
      {...props}
    />
  )
})
BentoGridPreset.displayName = "BentoGridPreset"

export {
  BentoGrid,
  BentoCard,
  BentoCardIcon,
  BentoCardTitle,
  BentoCardDescription,
  BentoCardContent,
  BentoCardImage,
  BentoCardBadge,
  BentoCardLink,
  BentoGridPreset,
}
