import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const featureSpotVariants = cva(
  "py-16 md:py-24 lg:py-32",
  {
    variants: {
      layout: {
        grid: "",
        imageLeft: "",
        imageRight: "",
      },
    },
    defaultVariants: {
      layout: "grid",
    },
  }
)

export interface FeatureSpotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featureSpotVariants> {
  container?: boolean
}

const FeatureSpot = React.forwardRef<HTMLDivElement, FeatureSpotProps>(
  ({ className, layout, container = true, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          featureSpotVariants({ layout }),
          container && "container mx-auto px-4",
          className
        )}
        {...props}
      >
        {children}
      </section>
    )
  }
)
FeatureSpot.displayName = "FeatureSpot"

const FeatureSpotEyebrow = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "mb-3 inline-block text-xs font-medium uppercase tracking-widest text-[var(--action-primary-bg)]",
      className
    )}
    {...props}
  />
))
FeatureSpotEyebrow.displayName = "FeatureSpotEyebrow"

const FeatureSpotHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mx-auto mb-16 max-w-2xl text-center",
      className
    )}
    {...props}
  />
))
FeatureSpotHeader.displayName = "FeatureSpotHeader"

const FeatureSpotTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" | "h3" }
>(({ className, as: Comp = "h2", ...props }, ref) => (
  <Comp
    ref={ref}
    className={cn(
      "font-heading text-3xl font-medium tracking-tight text-[var(--foregrounds-primary)] sm:text-4xl lg:text-5xl",
      className
    )}
    {...props}
  />
))
FeatureSpotTitle.displayName = "FeatureSpotTitle"

const FeatureSpotDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mt-6 text-lg leading-relaxed text-[var(--foregrounds-tertiary)]",
      className
    )}
    {...props}
  />
))
FeatureSpotDescription.displayName = "FeatureSpotDescription"

export interface FeatureSpotGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4
}

const FeatureSpotGrid = React.forwardRef<HTMLDivElement, FeatureSpotGridProps>(
  ({ className, columns = 3, ...props }, ref) => {
    const gridCols = {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    }

    return (
      <div
        ref={ref}
        className={cn("grid gap-8", gridCols[columns], className)}
        {...props}
      />
    )
  }
)
FeatureSpotGrid.displayName = "FeatureSpotGrid"

export interface FeatureSpotItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
}

const FeatureSpotItem = React.forwardRef<HTMLDivElement, FeatureSpotItemProps>(
  ({ className, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-[var(--container-border)]/60 bg-[var(--container-bg)] p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/[0.03]",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-secondary)]">
          {icon}
        </div>
      )}
      {children}
    </div>
  )
)
FeatureSpotItem.displayName = "FeatureSpotItem"

const FeatureSpotItemTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading text-lg font-medium text-[var(--foregrounds-primary)]", className)}
    {...props}
  />
))
FeatureSpotItemTitle.displayName = "FeatureSpotItemTitle"

const FeatureSpotItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[var(--foregrounds-tertiary)] leading-relaxed", className)}
    {...props}
  />
))
FeatureSpotItemDescription.displayName = "FeatureSpotItemDescription"

export interface FeatureSpotSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean
}

const FeatureSpotSplit = React.forwardRef<HTMLDivElement, FeatureSpotSplitProps>(
  ({ className, reverse = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-20",
        reverse && "md:[&>*:first-child]:order-2",
        className
      )}
      {...props}
    />
  )
)
FeatureSpotSplit.displayName = "FeatureSpotSplit"

const FeatureSpotContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-6", className)}
    {...props}
  />
))
FeatureSpotContent.displayName = "FeatureSpotContent"

const FeatureSpotMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative overflow-hidden rounded-xl", className)}
    {...props}
  />
))
FeatureSpotMedia.displayName = "FeatureSpotMedia"

export {
  FeatureSpot,
  FeatureSpotEyebrow,
  FeatureSpotHeader,
  FeatureSpotTitle,
  FeatureSpotDescription,
  FeatureSpotGrid,
  FeatureSpotItem,
  FeatureSpotItemTitle,
  FeatureSpotItemDescription,
  FeatureSpotSplit,
  FeatureSpotContent,
  FeatureSpotMedia,
}
