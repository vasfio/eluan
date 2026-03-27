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
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
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
      "flex h-full w-full items-center justify-center rounded-full bg-[var(--backgrounds-tertiary)] text-xs font-medium text-[var(--foregrounds-secondary)]",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// --- Badge overlay ---
type AvatarBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left"
}

const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ className, position = "bottom-right", ...props }, ref) => {
    const positionClasses = {
      "top-right": "top-0 right-0",
      "bottom-right": "bottom-0 right-0",
      "top-left": "top-0 left-0",
      "bottom-left": "bottom-0 left-0",
    }
    return (
      <span
        ref={ref}
        className={cn(
          "absolute flex h-3 w-3 items-center justify-center rounded-full ring-2 ring-[var(--backgrounds-primary)]",
          positionClasses[position],
          className
        )}
        {...props}
      />
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
        "absolute h-2.5 w-2.5 rounded-full ring-2 ring-[var(--backgrounds-primary)]",
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
