import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const timelineVariants = cva("relative", {
  variants: {
    variant: {
      default: "",
      alternating: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(timelineVariants({ variant }), className)}
      {...props}
    />
  )
)
Timeline.displayName = "Timeline"

const timelineItemVariants = cva(
  // Padding scales with the spacing density. Left padding clears the dot
  // (`--size-sm`) plus a token-driven gap so content aligns to the right of
  // the dot consistently across compact / standard / wide spacing.
  "relative pb-[var(--spacing-xl)] pl-[calc(var(--size-sm)+var(--spacing-md))] last:pb-0",
  {
  variants: {
    variant: {
      default: "",
      success: "[--timeline-dot-color:var(--positive-bg)] [--timeline-dot-bg:var(--positive-bg)] [--timeline-dot-border:var(--positive-fg)]",
      warning: "[--timeline-dot-color:var(--cautionary-fg)] [--timeline-dot-bg:var(--cautionary-bg)]",
      error: "[--timeline-dot-color:var(--destructive-fg)] [--timeline-dot-bg:var(--destructive-bg)]",
      info: "[--timeline-dot-color:var(--informative-fg)] [--timeline-dot-bg:var(--informative-bg)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineItemVariants> {}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(timelineItemVariants({ variant }), className)}
      {...props}
    />
  )
)
TimelineItem.displayName = "TimelineItem"

const timelineLineVariants = cva(
  // Position centred on the dot (`left = (size-sm / 2) - 0.5px` for the 1px
  // line). `top` starts the line right below the dot, `h` extends it to the
  // bottom of the item — both expressed in tokens so the line scales with
  // the dot/spacing.
  "absolute left-[calc(var(--size-sm)/2-0.5px)] top-[var(--size-sm)] h-[calc(100%-var(--size-sm))] w-px",
  {
    variants: {
      variant: {
        default: "bg-[var(--container-border-alt)]",
        dashed: "border-l border-dashed border-[var(--container-border-alt)] bg-transparent",
        dotted: "border-l border-dotted border-[var(--container-border-alt)] bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TimelineLineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineLineVariants> {}

const TimelineLine = React.forwardRef<HTMLDivElement, TimelineLineProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(timelineLineVariants({ variant }), className)}
      {...props}
    />
  )
)
TimelineLine.displayName = "TimelineLine"

const timelineDotVariants = cva(
  "absolute left-0 top-0 flex h-[var(--size-sm)] w-[var(--size-sm)] items-center justify-center rounded-full border-2 border-[var(--container-bg)]",
  {
    variants: {
      variant: {
        default: "bg-[var(--container-bg-alt)]",
        filled: "bg-[var(--container-bg)] text-[color:var(--container-fg)]",
        outline: "border-2 border-[var(--container-border-alt)] bg-[var(--container-bg)]",
        icon: "bg-[var(--container-bg)] text-[color:var(--container-fg)]",
      },
      size: {
        sm: "h-[var(--size-xxs)] w-[var(--size-xxs)]",
        default: "h-[var(--size-sm)] w-[var(--size-sm)]",
        lg: "h-[var(--size-md)] w-[var(--size-md)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TimelineDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineDotVariants> {
  icon?: React.ReactNode
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        timelineDotVariants({ variant, size }),
        "bg-[var(--timeline-dot-bg,var(--container-bg-alt))] text-[color:var(--timeline-dot-color,var(--container-fg))]",
        className
      )}
      {...props}
    >
      {icon || children}
    </div>
  )
)
TimelineDot.displayName = "TimelineDot"

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0.5", className)} {...props} />
))
TimelineContent.displayName = "TimelineContent"

const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // `min-h-[var(--size-sm)]` matches the dot's height so `items-center`
    // vertically centres the title with the (absolutely positioned) dot
    // regardless of the active spacing density.
    className={cn(
      "flex items-center gap-[var(--spacing-sm)] min-h-[var(--size-sm)]",
      className
    )}
    {...props}
  />
))
TimelineHeader.displayName = "TimelineHeader"

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
TimelineTitle.displayName = "TimelineTitle"

const TimelineTime = React.forwardRef<
  HTMLTimeElement,
  React.TimeHTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => (
  <time
    ref={ref}
    className={cn("text-[length:var(--font-size-sm)] text-[color:var(--interactive-fg-alt)]", className)}
    {...props}
  />
))
TimelineTime.displayName = "TimelineTime"

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-[var(--spacing-sm)] text-[length:var(--font-size-sm)] text-[color:var(--interactive-fg-alt)]", className)}
    {...props}
  />
))
TimelineDescription.displayName = "TimelineDescription"

// Horizontal timeline
const TimelineHorizontal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex items-start gap-[var(--spacing-md)]", className)}
    {...props}
  />
))
TimelineHorizontal.displayName = "TimelineHorizontal"

const TimelineHorizontalItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex flex-col items-center", className)}
    {...props}
  />
))
TimelineHorizontalItem.displayName = "TimelineHorizontalItem"

const TimelineHorizontalLine = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Token-based positioning so the connecting line scales with `--size-sm`
      // across spacing densities (was hardcoded 12px / top-3 = 12px).
      "absolute left-[calc(50%+var(--size-sm)/2)] top-[calc(var(--size-sm)/2-0.5px)] h-px w-[calc(100%-var(--size-sm))] bg-[var(--container-border-alt)]",
      className
    )}
    {...props}
  />
))
TimelineHorizontalLine.displayName = "TimelineHorizontalLine"

export {
  Timeline,
  TimelineItem,
  TimelineLine,
  TimelineDot,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
  TimelineHorizontal,
  TimelineHorizontalItem,
  TimelineHorizontalLine,
}
