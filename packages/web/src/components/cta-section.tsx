import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const ctaSectionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-[var(--container-bg)]",
      muted: "bg-[var(--container-bg-alt)]",
      primary: "bg-[var(--action-primary-bg)] text-[color:var(--action-primary-fg)]",
      gradient: "bg-[var(--action-primary-bg)] text-[color:var(--action-primary-fg)]",
      dark: "bg-[var(--container-bg-inverse)] text-[color:var(--container-fg-inverse)]",
      bordered: "border-y border-[color:var(--container-border-alt)] bg-[var(--container-bg)]",
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
        <div className="container mx-auto px-[var(--spacing-md)]">{children}</div>
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
      split: "flex flex-col items-center justify-between gap-[var(--spacing-lg)] text-center md:flex-row md:text-left",
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
      "font-heading text-[length:var(--font-size-3xl)] font-bold tracking-tight sm:text-[length:var(--font-size-4xl)]",
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
    className={cn("mt-[var(--spacing-md)] text-[length:var(--font-size-lg)] opacity-90", className)}
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
      "mt-[var(--spacing-lg)] flex flex-wrap items-center gap-[var(--spacing-md)]",
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
      "rounded-[var(--curves-xl)] bg-[var(--container-bg)] p-[var(--spacing-lg)] md:p-[var(--spacing-2xl)] border border-[var(--container-border-alt)] shadow-none",
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
