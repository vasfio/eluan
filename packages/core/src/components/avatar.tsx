import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import * as stylex from "@stylexjs/stylex"

import { Badge } from "./badge"

export type AvatarProps = Omit<
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
  "className" | "style"
>

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  (props, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    {...props}
    {...stylex.props(styles.root)}
  />
  )
)
Avatar.displayName = AvatarPrimitive.Root.displayName

export type AvatarImageProps = Omit<
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>,
  "className" | "style"
>

const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, AvatarImageProps>(
  (props, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    {...props}
    {...stylex.props(styles.image)}
  />
  )
)
AvatarImage.displayName = AvatarPrimitive.Image.displayName

export type AvatarFallbackProps = Omit<
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
  "className" | "style"
>

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>((props, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    {...props}
    {...stylex.props(styles.fallback)}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// --- Notification badge overlay ---
type AvatarPosition = "top-right" | "bottom-right" | "top-left" | "bottom-left"

export type AvatarBadgeProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "className" | "style"> & {
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left"
  /** Display a numeric count inside the badge. When provided, the badge enlarges to fit the number. */
  count?: number
  /** Maximum count to display; values above show "max+" (e.g. "99+"). Default 99. */
  max?: number
}

const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ position = "top-right", count, max = 99, ...props }, ref) => {
    const hasCount = count !== undefined && count > 0
    const displayCount = hasCount
      ? count > max
        ? `${max}+`
        : `${count}`
      : undefined

    return (
      <span
        ref={ref}
        {...props}
        {...stylex.props(styles.badge, badgePositionStyles[position])}
      >
        <Badge variant="destructive" size={hasCount ? "default" : "microdot"}>
          {displayCount}
        </Badge>
      </span>
    )
  }
)
AvatarBadge.displayName = "AvatarBadge"

// --- Live / status indicator ---
export type AvatarStatusProps = {
  status: "online" | "offline" | "busy" | "away"
  position?: AvatarPosition
}

const AvatarStatus = ({ status, position = "bottom-right" }: AvatarStatusProps) => {
  return (
    <span
      {...stylex.props(styles.status, statusStyles[status], statusPositionStyles[position])}
      aria-label={status}
    />
  )
}
AvatarStatus.displayName = "AvatarStatus"

// --- Wrapper that handles relative positioning for overlays ---
const AvatarWithStatus = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
>((props, ref) => (
  <div ref={ref} {...props} {...stylex.props(styles.withStatus)} />
))
AvatarWithStatus.displayName = "AvatarWithStatus"

const styles = stylex.create({
  root: {
    borderRadius: "var(--radius-radius-full)",
    display: "flex",
    flexShrink: 0,
    height: "var(--size-lg)",
    overflow: "hidden",
    position: "relative",
    width: "var(--size-lg)",
  },
  image: {
    aspectRatio: "1 / 1",
    height: "100%",
    width: "100%",
  },
  fallback: {
    alignItems: "center",
    backgroundColor: "var(--container-bg-alt)",
    borderRadius: "var(--radius-radius-full)",
    color: "var(--container-fg-alt)",
    display: "flex",
    fontSize: "var(--font-size-xs)",
    fontWeight: 500,
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  /* Anchored to a corner, then shifted so the badge's center sits on the
     avatar's circular rim at the diagonal — half over the image, half
     outside the container. */
  badge: {
    display: "inline-flex",
    position: "absolute",
    zIndex: 1,
  },
  badgeTopRight: {
    top: 0,
    right: 0,
    transform: "translate(35%, -35%)",
  },
  badgeBottomRight: {
    bottom: 0,
    right: 0,
    transform: "translate(35%, 35%)",
  },
  badgeTopLeft: {
    top: 0,
    left: 0,
    transform: "translate(-35%, -35%)",
  },
  badgeBottomLeft: {
    bottom: 0,
    left: 0,
    transform: "translate(-35%, 35%)",
  },
  status: {
    borderRadius: "var(--radius-radius-full)",
    boxShadow: "0 0 0 2px var(--container-bg)",
    height: "calc(var(--spacing-md) + var(--spacing-xxs))",
    position: "absolute",
    width: "calc(var(--spacing-md) + var(--spacing-xxs))",
  },
  statusTop: {
    top: 0,
  },
  statusBottom: {
    bottom: 0,
  },
  statusRight: {
    right: 0,
  },
  statusLeft: {
    left: 0,
  },
  statusOnline: {
    backgroundColor: "var(--positive-fg)",
  },
  statusOffline: {
    backgroundColor: "var(--container-bg-alt)",
  },
  statusBusy: {
    backgroundColor: "var(--destructive-fg)",
  },
  statusAway: {
    backgroundColor: "var(--cautionary-bg-alt)",
  },
  withStatus: {
    display: "inline-flex",
    position: "relative",
  },
})

const badgePositionStyles = {
  "top-right": styles.badgeTopRight,
  "bottom-right": styles.badgeBottomRight,
  "top-left": styles.badgeTopLeft,
  "bottom-left": styles.badgeBottomLeft,
} satisfies Record<AvatarPosition, stylex.StyleXStyles>

const statusPositionStyles = {
  "top-right": [styles.statusTop, styles.statusRight],
  "bottom-right": [styles.statusBottom, styles.statusRight],
  "top-left": [styles.statusTop, styles.statusLeft],
  "bottom-left": [styles.statusBottom, styles.statusLeft],
} satisfies Record<AvatarPosition, stylex.StyleXStyles>

const statusStyles = {
  online: styles.statusOnline,
  offline: styles.statusOffline,
  busy: styles.statusBusy,
  away: styles.statusAway,
} satisfies Record<AvatarStatusProps["status"], stylex.StyleXStyles>

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarStatus, AvatarWithStatus }
