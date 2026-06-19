import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import * as stylex from "@stylexjs/stylex"

type AvatarProps = Omit<
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

type AvatarImageProps = Omit<
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

type AvatarFallbackProps = Omit<
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

type AvatarBadgeProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "className" | "style"> & {
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
        {...stylex.props(
          styles.badge,
          hasCount ? styles.badgeCount : styles.badgeDot,
          badgePositionStyles[position]
        )}
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
  badge: {
    alignItems: "center",
    backgroundColor: "var(--destructive-fg)",
    borderRadius: "var(--radius-radius-full)",
    boxShadow: "0 0 0 2px var(--container-border)",
    color: "var(--destructive-bg)",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
  },
  badgeCount: {
    fontSize: "var(--font-size-xs)",
    fontWeight: 700,
    height: "var(--size-xxs)",
    lineHeight: 1,
    minWidth: "var(--size-xxs)",
    paddingInline: "var(--spacing-xs)",
  },
  badgeDot: {
    height: "var(--spacing-md)",
    width: "var(--spacing-md)",
  },
  badgeTop: {
    top: "calc(var(--spacing-xxs) * -1)",
  },
  badgeBottom: {
    bottom: "calc(var(--spacing-xxs) * -1)",
  },
  badgeRight: {
    right: "calc(var(--spacing-xxs) * -1)",
  },
  badgeLeft: {
    left: "calc(var(--spacing-xxs) * -1)",
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
  "top-right": [styles.badgeTop, styles.badgeRight],
  "bottom-right": [styles.badgeBottom, styles.badgeRight],
  "top-left": [styles.badgeTop, styles.badgeLeft],
  "bottom-left": [styles.badgeBottom, styles.badgeLeft],
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
