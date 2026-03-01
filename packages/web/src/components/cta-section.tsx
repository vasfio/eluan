import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const ctaSectionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-background",
      muted: "bg-muted/50",
      primary: "bg-primary text-primary-foreground",
      gradient: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
      dark: "bg-zinc-900 text-white",
      bordered: "border-y bg-background",
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

export interface CTASectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ctaSectionVariants> {}

const CTASection = React.forwardRef<HTMLDivElement, CTASectionProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(ctaSectionVariants({ variant, size }), className)}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    )
  }
)
CTASection.displayName = "CTASection"

const ctaContentVariants = cva("mx-auto", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      split: "flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left",
    },
    maxWidth: {
      sm: "max-w-xl",
      md: "max-w-2xl",
      lg: "max-w-4xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    align: "center",
    maxWidth: "lg",
  },
})

export interface CTAContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ctaContentVariants> {}

const CTAContent = React.forwardRef<HTMLDivElement, CTAContentProps>(
  ({ className, align, maxWidth, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(ctaContentVariants({ align, maxWidth }), className)}
      {...props}
    />
  )
)
CTAContent.displayName = "CTAContent"

const CTATitle = React.forwardRef<
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
CTATitle.displayName = "CTATitle"

const CTADescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-4 text-lg opacity-90", className)}
    {...props}
  />
))
CTADescription.displayName = "CTADescription"

const CTAActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-8 flex flex-wrap items-center gap-4",
      className
    )}
    {...props}
  />
))
CTAActions.displayName = "CTAActions"

const CTACard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl bg-card p-8 shadow-lg md:p-12",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
CTACard.displayName = "CTACard"

export {
  CTASection,
  CTAContent,
  CTATitle,
  CTADescription,
  CTAActions,
  CTACard,
}
