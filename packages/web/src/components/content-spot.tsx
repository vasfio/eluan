import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const contentSpotVariants = cva(
  "flex flex-col gap-6 py-12 md:py-16 lg:py-20",
  {
    variants: {
      layout: {
        default: "items-center text-center",
        left: "items-start text-left",
        right: "items-end text-right",
      },
      size: {
        sm: "max-w-xl",
        default: "max-w-2xl",
        lg: "max-w-3xl",
        xl: "max-w-4xl",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      layout: "default",
      size: "default",
    },
  }
)

export interface ContentSpotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentSpotVariants> {
  container?: boolean
}

const ContentSpot = React.forwardRef<HTMLDivElement, ContentSpotProps>(
  ({ className, layout, size, container = true, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          container && "container mx-auto px-4",
          className
        )}
        {...props}
      >
        <div className={cn(contentSpotVariants({ layout, size }), layout === "default" && "mx-auto")}>
          {children}
        </div>
      </section>
    )
  }
)
ContentSpot.displayName = "ContentSpot"

const ContentSpotEyebrow = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "text-xs font-medium uppercase tracking-widest text-[var(--action-primary-bg)]",
      className
    )}
    {...props}
  />
))
ContentSpotEyebrow.displayName = "ContentSpotEyebrow"

const ContentSpotTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" | "h3" | "h4" }
>(({ className, as: Comp = "h2", ...props }, ref) => (
  <Comp
    ref={ref}
    className={cn(
      "font-heading text-3xl font-semibold tracking-tight text-[var(--foregrounds-primary)] sm:text-4xl lg:text-5xl",
      className
    )}
    {...props}
  />
))
ContentSpotTitle.displayName = "ContentSpotTitle"

const ContentSpotDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-lg text-[var(--foregrounds-tertiary)] sm:text-xl",
      className
    )}
    {...props}
  />
))
ContentSpotDescription.displayName = "ContentSpotDescription"

const ContentSpotActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-4",
      className
    )}
    {...props}
  />
))
ContentSpotActions.displayName = "ContentSpotActions"

export {
  ContentSpot,
  ContentSpotEyebrow,
  ContentSpotTitle,
  ContentSpotDescription,
  ContentSpotActions,
}
