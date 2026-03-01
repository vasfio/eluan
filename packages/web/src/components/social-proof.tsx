import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const socialProofVariants = cva("flex items-center gap-3", {
  variants: {
    size: {
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface SocialProofProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof socialProofVariants> {}

const SocialProof = React.forwardRef<HTMLDivElement, SocialProofProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(socialProofVariants({ size }), className)}
      {...props}
    />
  )
)
SocialProof.displayName = "SocialProof"

// Avatar stack
export interface AvatarStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum number of avatars to show
   * @default 5
   */
  max?: number
  /**
   * Total count (for "+X more" display)
   */
  total?: number
  /**
   * Size of avatars
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
}

const AvatarStack = React.forwardRef<HTMLDivElement, AvatarStackProps>(
  ({ className, max = 5, total, size = "default", children, ...props }, ref) => {
    const sizes = {
      sm: "h-6 w-6 -ml-2 first:ml-0",
      default: "h-8 w-8 -ml-3 first:ml-0",
      lg: "h-10 w-10 -ml-4 first:ml-0",
    }

    const childArray = React.Children.toArray(children)
    const displayedChildren = childArray.slice(0, max)
    const remaining = total ? total - max : childArray.length - max

    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {displayedChildren.map((child, index) => (
          <div
            key={index}
            className={cn(
              "relative inline-block overflow-hidden rounded-full border-2 border-background bg-muted",
              sizes[size]
            )}
            style={{ zIndex: max - index }}
          >
            {child}
          </div>
        ))}
        {remaining > 0 && (
          <div
            className={cn(
              "relative inline-flex items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-muted-foreground",
              sizes[size]
            )}
          >
            +{remaining}
          </div>
        )}
      </div>
    )
  }
)
AvatarStack.displayName = "AvatarStack"

// Star rating display
export interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Rating value (0-5)
   */
  rating: number
  /**
   * Total reviews count
   */
  reviewCount?: number
  /**
   * Size of stars
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * Whether to show the rating number
   * @default true
   */
  showValue?: boolean
}

const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  (
    {
      className,
      rating,
      reviewCount,
      size = "default",
      showValue = true,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: "h-3 w-3",
      default: "h-4 w-4",
      lg: "h-5 w-5",
    }

    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        <div className="flex gap-0.5">
          {/* Full stars */}
          {Array.from({ length: fullStars }).map((_, i) => (
            <svg
              key={`full-${i}`}
              className={cn(sizes[size], "text-yellow-400")}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          {/* Half star */}
          {hasHalfStar && (
            <svg
              className={cn(sizes[size], "text-yellow-400")}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="half-star">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#e5e7eb" />
                </linearGradient>
              </defs>
              <path
                fill="url(#half-star)"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          )}
          {/* Empty stars */}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <svg
              key={`empty-${i}`}
              className={cn(sizes[size], "text-gray-200")}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        {showValue && (
          <span className="font-medium">{rating.toFixed(1)}</span>
        )}
        {reviewCount !== undefined && (
          <span className="text-muted-foreground">
            ({reviewCount.toLocaleString()} reviews)
          </span>
        )}
      </div>
    )
  }
)
StarRating.displayName = "StarRating"

// Trust badges
const TrustBadges = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-wrap items-center gap-4", className)}
    {...props}
  />
))
TrustBadges.displayName = "TrustBadges"

export interface TrustBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  label: string
}

const TrustBadge = React.forwardRef<HTMLDivElement, TrustBadgeProps>(
  ({ className, icon, label, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      {icon || (
        <svg
          className="h-4 w-4 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      )}
      <span>{label}</span>
    </div>
  )
)
TrustBadge.displayName = "TrustBadge"

// Customer count
export interface CustomerCountProps
  extends React.HTMLAttributes<HTMLDivElement> {
  count: number
  label?: string
  size?: "sm" | "default" | "lg"
}

const CustomerCount = React.forwardRef<HTMLDivElement, CustomerCountProps>(
  (
    {
      className,
      count,
      label = "happy customers",
      size = "default",
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", sizes[size], className)}
        {...props}
      >
        <span className="font-bold">{count.toLocaleString()}+</span>
        <span className="text-muted-foreground">{label}</span>
      </div>
    )
  }
)
CustomerCount.displayName = "CustomerCount"

// Social proof banner
const SocialProofBanner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-wrap items-center justify-center gap-6 border-y bg-muted/50 py-4 md:gap-12",
      className
    )}
    {...props}
  />
))
SocialProofBanner.displayName = "SocialProofBanner"

// Featured in / As seen on
export interface FeaturedInProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
}

const FeaturedIn = React.forwardRef<HTMLDivElement, FeaturedInProps>(
  ({ className, title = "Featured in", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-center", className)}
      {...props}
    >
      <p className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale">
        {children}
      </div>
    </div>
  )
)
FeaturedIn.displayName = "FeaturedIn"

export {
  SocialProof,
  AvatarStack,
  StarRating,
  TrustBadges,
  TrustBadge,
  CustomerCount,
  SocialProofBanner,
  FeaturedIn,
}
