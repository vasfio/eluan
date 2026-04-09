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
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, clickable, elevation = "sm", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--curves-lg)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] text-[var(--container-fg)]",
        elevationClasses[elevation],
        clickable && [
          "cursor-pointer transition-all duration-200",
          "hover:shadow-xl hover:-translate-y-px",
          "active:translate-y-0 active:shadow-md",
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
    className={cn("font-heading text-[var(--font-size-xl)] font-semibold leading-snug tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-[var(--font-size-sm)] text-[var(--foregrounds-tertiary)] leading-relaxed", className)} {...props} />
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
