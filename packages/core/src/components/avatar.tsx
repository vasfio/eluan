import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-[var(--size-lg)] w-[var(--size-lg)] shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-[var(--container-bg-alt)] text-[var(--font-size-xs)] font-medium text-[var(--container-fg-alt)]",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// --- Notification badge overlay ---
type AvatarBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left"
  /** Display a numeric count inside the badge. When provided, the badge enlarges to fit the number. */
  count?: number
  /** Maximum count to display; values above show "max+" (e.g. "99+"). Default 99. */
  max?: number
}

const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ className, position = "top-right", count, max = 99, ...props }, ref) => {
    const positionClasses = {
      "top-right": "-top-1 -right-1",
      "bottom-right": "-bottom-1 -right-1",
      "top-left": "-top-1 -left-1",
      "bottom-left": "-bottom-1 -left-1",
    }

    const hasCount = count !== undefined && count > 0
    const displayCount = hasCount
      ? count > max
        ? `${max}+`
        : `${count}`
      : undefined

    return (
      <span
        ref={ref}
        className={cn(
          "absolute flex items-center justify-center rounded-full ring-2 ring-[var(--container-border)] bg-[var(--destructive-bg)] text-[var(--destructive-fg)]",
          hasCount
            ? "min-w-[18px] h-[18px] px-[var(--spacing-xs)] text-[10px] font-bold leading-none"
            : "h-3 w-3",
          positionClasses[position],
          className
        )}
        {...props}
      >
        {displayCount}
      </span>
    )
  }
)
AvatarBadge.displayName = "AvatarBadge"

// --- Live / status indicator ---
type AvatarStatusProps = {
  status: "online" | "offline" | "busy" | "away"
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left"
  className?: string
}

const statusColors: Record<AvatarStatusProps["status"], string> = {
  online: "bg-[var(--positive-bg)]",
  offline: "bg-[var(--backgrounds-quaternary)]",
  busy: "bg-[var(--destructive-bg)]",
  away: "bg-[var(--cautionary-bg)]",
}

const AvatarStatus = ({ status, position = "bottom-right", className }: AvatarStatusProps) => {
  const positionClasses = {
    "top-right": "top-0 right-0",
    "bottom-right": "bottom-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-left": "bottom-0 left-0",
  }
  return (
    <span
      className={cn(
        "absolute h-2.5 w-2.5 rounded-full ring-2 ring-[var(--container-bg)]",
        statusColors[status],
        positionClasses[position],
        className
      )}
      aria-label={status}
    />
  )
}
AvatarStatus.displayName = "AvatarStatus"

// --- Wrapper that handles relative positioning for overlays ---
const AvatarWithStatus = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative inline-flex", className)} {...props} />
))
AvatarWithStatus.displayName = "AvatarWithStatus"

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarStatus, AvatarWithStatus }
