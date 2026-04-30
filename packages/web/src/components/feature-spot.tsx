import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const featureSpotVariants = cva(
  "py-[var(--spacing-3xl)] md:py-[var(--spacing-4xl)] lg:py-32",
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
          container && "container mx-auto px-[var(--spacing-md)]",
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
      "mb-[var(--spacing-sm)] inline-block text-[length:var(--font-size-xs)] font-medium uppercase tracking-widest text-[color:var(--action-primary-bg)]",
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
      "mx-auto mb-[var(--spacing-3xl)] max-w-2xl text-center",
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
      "font-heading text-[length:var(--font-size-3xl)] font-medium tracking-tight text-[color:var(--container-fg)] sm:text-[length:var(--font-size-4xl)] lg:text-[length:var(--font-size-5xl)]",
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
      "mt-[var(--spacing-md)] text-[length:var(--font-size-lg)] leading-relaxed text-[color:var(--container-fg-alt)]",
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
        className={cn("grid gap-[var(--spacing-lg)]", gridCols[columns], className)}
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
        "flex flex-col gap-[var(--spacing-md)] rounded-[var(--curves-xl)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] p-[var(--spacing-lg)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/[0.03]",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-[var(--size-lg)] w-[var(--size-lg)] items-center justify-center rounded-[var(--curves-lg)] bg-[var(--container-bg-alt)] text-[color:var(--container-fg)]">
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
    className={cn("font-heading text-[length:var(--font-size-lg)] font-medium text-[color:var(--container-fg)]", className)}
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
    className={cn("text-[color:var(--container-fg-alt)] leading-relaxed", className)}
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
        "grid items-center gap-[var(--spacing-xl)] md:grid-cols-2 md:gap-[var(--spacing-3xl)] lg:gap-[var(--spacing-4xl)]",
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
    className={cn("flex flex-col gap-[var(--spacing-md)]", className)}
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
    className={cn("relative overflow-hidden rounded-[var(--curves-xl)]", className)}
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
