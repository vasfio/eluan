import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const newsletterVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-background",
      muted: "bg-muted/50",
      primary: "bg-primary text-primary-foreground",
      gradient: "bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)]", // kept for API compat, no gradient
      dark: "bg-zinc-900 text-white",
      card: "bg-background",
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

export interface NewsletterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof newsletterVariants> {}

const Newsletter = React.forwardRef<HTMLDivElement, NewsletterProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const isCard = variant === "card"

    return (
      <section
        ref={ref}
        className={cn(newsletterVariants({ variant, size }), className)}
        {...props}
      >
        <div className="container mx-auto px-4">
          {isCard ? (
            <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 shadow-sm md:p-12">
              {children}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl text-center">{children}</div>
          )}
        </div>
      </section>
    )
  }
)
Newsletter.displayName = "Newsletter"

const NewsletterIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary",
      className
    )}
    {...props}
  >
    {children || (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    )}
  </div>
))
NewsletterIcon.displayName = "NewsletterIcon"

const NewsletterTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "font-heading text-2xl font-bold tracking-tight sm:text-3xl",
      className
    )}
    {...props}
  />
))
NewsletterTitle.displayName = "NewsletterTitle"

const NewsletterDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-4 text-lg opacity-90", className)}
    {...props}
  />
))
NewsletterDescription.displayName = "NewsletterDescription"

export interface NewsletterFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {}

const NewsletterForm = React.forwardRef<HTMLFormElement, NewsletterFormProps>(
  ({ className, ...props }, ref) => (
    <form
      ref={ref}
      className={cn(
        "mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4",
        className
      )}
      {...props}
    />
  )
)
NewsletterForm.displayName = "NewsletterForm"

export interface NewsletterInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const NewsletterInput = React.forwardRef<HTMLInputElement, NewsletterInputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="email"
      className={cn(
        "flex-1 h-12 rounded-lg border border-[var(--interactive-border)] bg-[var(--interactive-bg)] px-4 text-sm text-[var(--foregrounds-primary)] placeholder:text-[var(--foregrounds-quinary)] focus:outline-none focus:ring-1 focus:ring-[var(--interactive-fg)] focus:border-[var(--interactive-fg)]",
        className
      )}
      {...props}
    />
  )
)
NewsletterInput.displayName = "NewsletterInput"

const NewsletterDisclaimer = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-4 text-xs opacity-70", className)}
    {...props}
  />
))
NewsletterDisclaimer.displayName = "NewsletterDisclaimer"

const NewsletterSuccess = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-8 flex items-center justify-center gap-2 text-[var(--positive-fg)]",
      className
    )}
    {...props}
  />
))
NewsletterSuccess.displayName = "NewsletterSuccess"

export {
  Newsletter,
  NewsletterIcon,
  NewsletterTitle,
  NewsletterDescription,
  NewsletterForm,
  NewsletterInput,
  NewsletterDisclaimer,
  NewsletterSuccess,
}
