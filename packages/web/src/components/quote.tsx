import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Quote as QuoteIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const quoteVariants = cva(
  "relative",
  {
    variants: {
      variant: {
        default: "border-l-4 border-primary pl-6",
        centered: "text-center",
        card: "rounded-lg border bg-card p-6 shadow-sm",
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
  sm: "text-base sm:text-lg",
  default: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl",
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
          <QuoteIcon className="mx-auto mb-4 h-8 w-8 text-[var(--foregrounds-tertiary)]/30" />
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
      "font-normal text-[var(--foregrounds-secondary)] leading-relaxed",
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
    className={cn("mt-4 flex items-center gap-4", className)}
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
      "h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted",
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
    className={cn("font-medium text-[var(--foregrounds-primary)]", className)}
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
    className={cn("text-sm text-[var(--foregrounds-tertiary)]", className)}
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
