import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Makes the card interactive — adds hover elevation + cursor pointer */
  clickable?: boolean
  /** Elevation level controls shadow depth */
  elevation?: "none" | "sm" | "md" | "lg"
}

const elevationClasses = {
  none: "",
  sm: "shadow-[0_1px_3px_0_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06)]",
  md: "shadow-[0_4px_12px_0_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.06)]",
  lg: "shadow-[0_12px_32px_0_rgba(0,0,0,0.14),0_4px_8px_-4px_rgba(0,0,0,0.08)]",
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, clickable, elevation = "sm", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-[var(--container-border)] bg-[var(--container-bg)] text-[var(--container-fg)]",
        elevationClasses[elevation],
        clickable && [
          "cursor-pointer transition-all duration-200",
          "hover:border-[var(--container-border-alt)] hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.12),0_4px_8px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-px",
          "active:translate-y-0 active:shadow-[0_2px_6px_0_rgba(0,0,0,0.08)]",
        ],
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-heading text-xl font-semibold leading-snug tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm text-[var(--foregrounds-tertiary)] leading-relaxed", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
