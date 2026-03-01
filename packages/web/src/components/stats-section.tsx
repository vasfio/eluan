import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statsSectionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-background",
      muted: "bg-muted/50",
      primary: "bg-primary text-primary-foreground",
      dark: "bg-zinc-900 text-white",
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
      "font-heading text-3xl font-bold tracking-tight sm:text-4xl",
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
    className={cn("mx-auto mt-4 max-w-2xl text-lg opacity-80", className)}
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
      bordered: "border-l first:border-l-0 pl-8 first:pl-0",
      card: "rounded-lg border bg-card p-6 shadow-sm",
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
    className={cn("font-heading text-4xl font-bold tracking-tight lg:text-5xl", className)}
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
    className={cn("mt-2 text-sm font-medium opacity-80", className)}
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
      direction === "up" && "text-green-500",
      direction === "down" && "text-red-500",
      direction === "neutral" && "opacity-60",
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
