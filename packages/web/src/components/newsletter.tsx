import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const newsletterVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-[var(--container-bg)]",
      muted: "bg-[var(--container-bg-alt)]",
      primary: "bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)]",
      gradient: "bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)]",
      dark: "bg-[var(--container-bg-inverse)] text-[var(--container-fg-inverse)]",
      card: "bg-[var(--container-bg)]",
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
        <div className="container mx-auto px-[var(--spacing-md)]">
          {isCard ? (
            <div className="mx-auto max-w-2xl rounded-[var(--curves-xl)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] p-[var(--spacing-lg)] shadow-sm md:p-[var(--spacing-2xl)]">
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
      "mb-[var(--spacing-md)] inline-flex h-[var(--size-xl)] w-[var(--size-xl)] items-center justify-center rounded-full bg-[var(--action-primary-bg)] text-[var(--action-primary-bg)]",
      className
    )}
    {...props}
  >
    {children || (
      <svg
        className="h-[var(--size-sm)] w-[var(--size-sm)]"
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
      "font-heading text-[var(--font-size-2xl)] font-bold tracking-tight sm:text-[var(--font-size-3xl)]",
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
    className={cn("mt-[var(--spacing-md)] text-[var(--font-size-lg)] opacity-90", className)}
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
        "mt-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-sm)] sm:flex-row sm:gap-[var(--spacing-md)]",
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
        "flex-1 h-[var(--size-xl)] rounded-[var(--curves-lg)] border border-[color:var(--interactive-border-alt)] bg-[var(--interactive-bg)] px-[var(--spacing-md)] text-[var(--font-size-sm)] text-[var(--interactive-fg)] placeholder:text-[var(--interactive-fg-alt)] focus:outline-none focus:ring-1 focus:ring-[var(--interactive-fg)] focus:border-[var(--interactive-fg)]",
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
    className={cn("mt-[var(--spacing-md)] text-[var(--font-size-xs)] opacity-70", className)}
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
      "mt-[var(--spacing-lg)] flex items-center justify-center gap-[var(--spacing-sm)] text-[var(--positive-fg)]",
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
