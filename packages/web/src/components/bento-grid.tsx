import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const bentoGridVariants = cva("grid gap-[var(--spacing-md)]", {
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
  "group relative overflow-hidden rounded-[var(--curves-xl)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] p-[var(--spacing-md)] transition-colors duration-300",
  {
    variants: {
      variant: {
        default: "",
        ghost: "border-transparent bg-[var(--container-bg-alt)]",
        dotted: [
          "border-transparent bg-[var(--container-bg-alt)]",
          "hover:[background-image:radial-gradient(var(--container-border-alt)_1px,transparent_1px)]",
          "hover:[background-size:16px_16px]",
        ].join(" "),
        grid: [
          "",
          "hover:[background-image:linear-gradient(var(--container-border-alt)_1px,transparent_1px),linear-gradient(to_right,var(--container-border-alt)_1px,transparent_1px)]",
          "hover:[background-size:40px_40px]",
        ].join(" "),
      },
      size: {
        default: "",
        lg: "p-[var(--spacing-lg)]",
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
        <a href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--action-primary-bg)]">
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
      "mb-[var(--spacing-md)] inline-flex h-10 w-10 items-center justify-center rounded-[var(--curves-lg)] bg-[var(--container-bg-alt)] text-[var(--container-fg)]",
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
      "font-heading text-lg font-medium text-[var(--container-fg)]",
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
    className={cn("mt-[var(--spacing-sm)] text-sm text-[var(--container-fg-alt)]", className)}
    {...props}
  />
))
BentoCardDescription.displayName = "BentoCardDescription"

const BentoCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-[var(--spacing-md)]", className)} {...props} />
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
      "absolute inset-0 -z-10 opacity-10",
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
      "absolute right-4 top-4 inline-flex items-center rounded-full bg-[var(--action-primary-bg)] px-[var(--spacing-sm)] py-[var(--spacing-xxs)] text-xs font-medium text-[var(--action-primary-fg)]",
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
      "mt-[var(--spacing-md)] inline-flex items-center gap-[var(--spacing-xs)] text-sm font-medium text-[var(--action-primary-bg)]",
      className
    )}
    {...props}
  >
    {children || "Learn more"}
    <svg
      className="h-4 w-4"
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
      className={cn("grid gap-[var(--spacing-md)]", layoutClasses[layout], className)}
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
