import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Quote as QuoteIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const quoteVariants = cva(
  "relative",
  {
    variants: {
      variant: {
        default: "border-l-4 border-[color:var(--action-primary-bg)] pl-[var(--spacing-md)]",
        centered: "text-center",
        card: "rounded-[var(--curves-lg)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] p-[var(--spacing-md)] shadow-sm",
        minimal: "",
      },
      size: {
        sm: "",
        default: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const textSizes = {
  sm: "text-[var(--font-size-sm)] sm:text-[var(--font-size-base)]",
  default: "text-[var(--font-size-sm)] sm:text-[var(--font-size-base)]",
  lg: "text-[var(--font-size-base)] sm:text-[var(--font-size-lg)]",
}

export interface QuoteProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof quoteVariants> {
  showIcon?: boolean
}

const QuoteComponent = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  ({ className, variant, size, showIcon = false, children, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn(quoteVariants({ variant, size }), className)}
        {...props}
      >
        {showIcon && variant === "centered" && (
          <QuoteIcon className="mx-auto mb-[var(--spacing-md)] h-[var(--size-md)] w-[var(--size-md)] text-[var(--container-fg-alt)]" />
        )}
        {children}
      </blockquote>
    )
  }
)
QuoteComponent.displayName = "Quote"

const QuoteText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { size?: "sm" | "default" | "lg" }
>(({ className, size = "default", ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "font-light italic text-[var(--container-fg)] leading-relaxed",
      textSizes[size],
      className
    )}
    {...props}
  />
))
QuoteText.displayName = "QuoteText"

const QuoteAuthor = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <footer
    ref={ref}
    className={cn("mt-[var(--spacing-md)] flex items-center gap-[var(--spacing-md)]", className)}
    {...props}
  />
))
QuoteAuthor.displayName = "QuoteAuthor"

const QuoteAuthorAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src?: string; alt?: string }
>(({ className, src, alt, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "h-[var(--size-xl)] w-[var(--size-xl)] shrink-0 overflow-hidden rounded-full bg-[var(--container-bg-alt)]",
      className
    )}
    {...props}
  >
    {src && (
      <img
        src={src}
        alt={alt ?? ""}
        className="h-full w-full object-cover"
      />
    )}
  </div>
))
QuoteAuthorAvatar.displayName = "QuoteAuthorAvatar"

const QuoteAuthorInfo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col", className)}
    {...props}
  />
))
QuoteAuthorInfo.displayName = "QuoteAuthorInfo"

const QuoteAuthorName = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("font-medium text-[var(--container-fg)]", className)}
    {...props}
  />
))
QuoteAuthorName.displayName = "QuoteAuthorName"

const QuoteAuthorTitle = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-[var(--font-size-sm)] text-[var(--container-fg-alt)]", className)}
    {...props}
  />
))
QuoteAuthorTitle.displayName = "QuoteAuthorTitle"

export {
  QuoteComponent as Quote,
  QuoteText,
  QuoteAuthor,
  QuoteAuthorAvatar,
  QuoteAuthorInfo,
  QuoteAuthorName,
  QuoteAuthorTitle,
}
