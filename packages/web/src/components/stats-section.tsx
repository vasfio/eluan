import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statsSectionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-[var(--container-bg)]",
      muted: "bg-[var(--backgrounds-secondary)]",
      primary: "bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)]",
      dark: "bg-[var(--backgrounds-primary)] text-[var(--foregrounds-primary)]",
    },
    size: {
      sm: "py-12",
      default: "py-16",
      lg: "py-24",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface StatsSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statsSectionVariants> {}

const StatsSection = React.forwardRef<HTMLDivElement, StatsSectionProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(statsSectionVariants({ variant, size }), className)}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    )
  }
)
StatsSection.displayName = "StatsSection"

const StatsHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-12 text-center", className)}
    {...props}
  />
))
StatsHeader.displayName = "StatsHeader"

const StatsTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "font-heading text-3xl font-medium tracking-tight text-[var(--foregrounds-primary)] sm:text-4xl",
      className
    )}
    {...props}
  />
))
StatsTitle.displayName = "StatsTitle"

const StatsDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--foregrounds-tertiary)]", className)}
    {...props}
  />
))
StatsDescription.displayName = "StatsDescription"

const statsGridVariants = cva("grid gap-8", {
  variants: {
    columns: {
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 4,
  },
})

export interface StatsGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statsGridVariants> {}

const StatsGrid = React.forwardRef<HTMLDivElement, StatsGridProps>(
  ({ className, columns, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(statsGridVariants({ columns }), className)}
      {...props}
    />
  )
)
StatsGrid.displayName = "StatsGrid"

const statItemVariants = cva("text-center", {
  variants: {
    variant: {
      default: "",
      bordered: "border-l border-[var(--container-border)]/60 first:border-l-0 pl-8 first:pl-0",
      card: "rounded-2xl border border-[var(--container-border)]/60 bg-[var(--container-bg)] p-8 transition-all duration-300 hover:shadow-md hover:shadow-black/[0.03]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface StatItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statItemVariants> {}

const StatItem = React.forwardRef<HTMLDivElement, StatItemProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(statItemVariants({ variant }), className)}
      {...props}
    />
  )
)
StatItem.displayName = "StatItem"

const StatValue = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-heading text-4xl font-medium tracking-tight text-[var(--foregrounds-primary)] lg:text-5xl", className)}
    {...props}
  />
))
StatValue.displayName = "StatValue"

const StatLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-3 text-sm font-normal text-[var(--foregrounds-tertiary)]", className)}
    {...props}
  />
))
StatLabel.displayName = "StatLabel"

const StatTrend = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    direction?: "up" | "down" | "neutral"
  }
>(({ className, direction = "neutral", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-1 text-sm font-medium",
      direction === "up" && "text-[var(--positive-fg)]",
      direction === "down" && "text-[var(--negative-fg)]",
      direction === "neutral" && "text-[var(--foregrounds-tertiary)]",
      className
    )}
    {...props}
  />
))
StatTrend.displayName = "StatTrend"

export {
  StatsSection,
  StatsHeader,
  StatsTitle,
  StatsDescription,
  StatsGrid,
  StatItem,
  StatValue,
  StatLabel,
  StatTrend,
}
