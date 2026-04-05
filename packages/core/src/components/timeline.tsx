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

const timelineItemVariants = cva("relative pb-8 pl-8 last:pb-0", {
  variants: {
    variant: {
      default: "",
      success: "[--timeline-dot-color:theme(colors.green.500)]",
      warning: "[--timeline-dot-color:theme(colors.yellow.500)]",
      error: "[--timeline-dot-color:theme(colors.red.500)]",
      info: "[--timeline-dot-color:theme(colors.blue.500)]",
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
  "absolute left-[11px] top-6 h-[calc(100%-24px)] w-px",
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
  "absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background",
  {
    variants: {
      variant: {
        default: "bg-muted",
        filled: "bg-primary text-primary-foreground",
        outline: "border-2 border-primary bg-background",
        icon: "bg-primary text-primary-foreground",
      },
      size: {
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
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
        "bg-[var(--timeline-dot-color,theme(colors.muted.DEFAULT))]",
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
    className={cn("flex items-center gap-2", className)}
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
    className={cn("text-sm text-[var(--foregrounds-tertiary)]", className)}
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
    className={cn("mt-2 text-sm text-[var(--foregrounds-tertiary)]", className)}
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
    className={cn("relative flex items-start gap-4", className)}
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
      "absolute left-[calc(50%+12px)] top-3 h-px w-[calc(100%-24px)] bg-[var(--container-border-alt)]",
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
