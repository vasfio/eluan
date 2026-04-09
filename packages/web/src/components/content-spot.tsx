import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const contentSpotVariants = cva(
  "flex flex-col gap-[var(--spacing-md)] py-[var(--spacing-2xl)] md:py-[var(--spacing-3xl)] lg:py-[var(--spacing-4xl)]",
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
          container && "container mx-auto px-[var(--spacing-md)]",
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
      "text-[var(--font-size-xs)] font-normal uppercase tracking-widest text-[var(--action-primary-bg)]",
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
      "font-heading text-[var(--font-size-3xl)] font-normal tracking-tight text-[var(--container-fg)] sm:text-[var(--font-size-4xl)] lg:text-[var(--font-size-5xl)]",
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
      "text-[var(--font-size-lg)] text-[var(--container-fg-alt)] sm:text-[var(--font-size-xl)]",
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
      "flex flex-wrap items-center gap-[var(--spacing-md)]",
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
