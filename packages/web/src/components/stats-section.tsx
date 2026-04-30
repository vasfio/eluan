import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statsSectionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-[var(--container-bg)]",
      muted: "bg-[var(--container-bg-alt)]",
      primary: "bg-[var(--action-primary-bg)] text-[color:var(--action-primary-fg)]",
      dark: "bg-[var(--container-bg-inverse)] text-[color:var(--container-fg-inverse)]",
    },
    size: {
      sm: "py-[var(--spacing-2xl)]",
      default: "py-[var(--spacing-3xl)]",
      lg: "py-[var(--spacing-4xl)]",
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
        <div className="container mx-auto px-[var(--spacing-md)]">{children}</div>
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
    className={cn("mb-[var(--spacing-2xl)] text-center", className)}
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
      "font-heading text-[length:var(--font-size-3xl)] font-medium tracking-tight text-[color:var(--container-fg)] sm:text-[length:var(--font-size-4xl)]",
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
    className={cn("mx-auto mt-[var(--spacing-md)] max-w-2xl text-[length:var(--font-size-lg)] leading-relaxed text-[color:var(--container-fg-alt)]", className)}
    {...props}
  />
))
StatsDescription.displayName = "StatsDescription"

const statsGridVariants = cva("grid gap-[var(--spacing-lg)]", {
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
      bordered: "border-l border-[color:var(--container-border-alt)] first:border-l-0 pl-[var(--spacing-lg)] first:pl-0",
      card: "rounded-[var(--curves-xl)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] p-[var(--spacing-lg)] transition-all duration-300 hover:shadow-md hover:shadow-black/[0.03]",
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
    className={cn("font-heading text-[length:var(--font-size-4xl)] font-medium tracking-tight text-[color:var(--container-fg)] lg:text-[length:var(--font-size-5xl)]", className)}
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
    className={cn("mt-[var(--spacing-sm)] text-[length:var(--font-size-sm)] font-normal text-[color:var(--container-fg-alt)]", className)}
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
      "mt-[var(--spacing-xs)] text-[length:var(--font-size-sm)] font-medium",
      direction === "up" && "text-[color:var(--positive-fg)]",
      direction === "down" && "text-[color:var(--negative-fg)]",
      direction === "neutral" && "text-[color:var(--container-fg-alt)]",
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
