import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import * as stylex from "@stylexjs/stylex"
import { X } from "lucide-react"

import { usePortalContainer } from "../providers/portal-container"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

export type SheetOverlayProps = Omit<
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>,
  "className" | "style"
>

type SheetSide = "top" | "bottom" | "left" | "right"

export type SheetContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  "className" | "style"
> & {
  layout?: "default" | "headerNavigation" | "navigationDrawer"
  side?: SheetSide
  /**
   * Element to portal into, overriding `PortalContainerProvider`.
   * Defaults to the nearest provider's container, then `document.body`.
   */
  container?: HTMLElement | null
}

export type SheetDivProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
>

export type SheetTitleProps = Omit<
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>,
  "className" | "style"
>

export type SheetDescriptionProps = Omit<
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>,
  "className" | "style"
>

const fadeIn = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 0.8 },
})

const fadeOut = stylex.keyframes({
  from: { opacity: 0.8 },
  to: { opacity: 0 },
})

const slideInTop = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(-100%)" },
  to: { opacity: 1, transform: "translateY(0)" },
})

const slideInBottom = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(100%)" },
  to: { opacity: 1, transform: "translateY(0)" },
})

const slideInLeft = stylex.keyframes({
  from: { opacity: 0, transform: "translateX(-100%)" },
  to: { opacity: 1, transform: "translateX(0)" },
})

const slideInRight = stylex.keyframes({
  from: { opacity: 0, transform: "translateX(100%)" },
  to: { opacity: 1, transform: "translateX(0)" },
})

const slideOutTop = stylex.keyframes({
  from: { opacity: 1, transform: "translateY(0)" },
  to: { opacity: 0, transform: "translateY(-100%)" },
})

const slideOutBottom = stylex.keyframes({
  from: { opacity: 1, transform: "translateY(0)" },
  to: { opacity: 0, transform: "translateY(100%)" },
})

const slideOutLeft = stylex.keyframes({
  from: { opacity: 1, transform: "translateX(0)" },
  to: { opacity: 0, transform: "translateX(-100%)" },
})

const slideOutRight = stylex.keyframes({
  from: { opacity: 1, transform: "translateX(0)" },
  to: { opacity: 0, transform: "translateX(100%)" },
})

// Radix mounts the content already in the open state, so the reveal has to be
// an animation — a transition between `[data-state]` values never runs.
const styles = stylex.create({
  overlay: {
    animationDuration: {
      default: "300ms",
      "@media (prefers-reduced-motion: reduce)": "0.01ms",
    },
    animationFillMode: "both",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: "var(--container-fg)",
    inset: 0,
    opacity: 0.8,
    position: "fixed",
    zIndex: 50,
    "[data-state=closed]": { animationName: fadeOut },
    "[data-state=open]": { animationName: fadeIn },
  },
  content: {
    animationDuration: {
      default: "300ms",
      "@media (prefers-reduced-motion: reduce)": "0.01ms",
    },
    animationFillMode: "both",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border)",
    borderStyle: "solid",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    display: "grid",
    gap: "var(--spacing-md)",
    padding: "var(--spacing-lg)",
    position: "fixed",
    zIndex: 50,
  },
  contentTop: {
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    left: 0,
    right: 0,
    top: 0,
    "[data-state=closed]": {
      animationName: slideOutTop,
    },
    "[data-state=open]": {
      animationName: slideInTop,
    },
  },
  contentBottom: {
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 1,
    bottom: 0,
    left: 0,
    right: 0,
    "[data-state=closed]": {
      animationName: slideOutBottom,
    },
    "[data-state=open]": {
      animationName: slideInBottom,
    },
  },
  contentLeft: {
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderTopWidth: 0,
    bottom: 0,
    height: "100%",
    left: 0,
    top: 0,
    width: "75%",
    "[data-state=closed]": {
      animationName: slideOutLeft,
    },
    "[data-state=open]": {
      animationName: slideInLeft,
    },
    "@media (min-width: 640px)": {
      maxWidth: "24rem",
    },
  },
  contentRight: {
    borderBottomWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    bottom: 0,
    height: "100%",
    right: 0,
    top: 0,
    width: "75%",
    "[data-state=closed]": {
      animationName: slideOutRight,
    },
    "[data-state=open]": {
      animationName: slideInRight,
    },
    "@media (min-width: 640px)": {
      maxWidth: "24rem",
    },
  },
  contentHeaderNavigation: {
    borderColor: "var(--container-border-alt)",
    width: "18.75rem",
    "@media (min-width: 640px)": {
      width: "25rem",
    },
  },
  contentNavigationDrawer: {
    padding: 0,
    width: "16rem",
  },
  close: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--curves-sm)",
    color: "inherit",
    opacity: 0.7,
    padding: 0,
    position: "absolute",
    right: "var(--spacing-md)",
    top: "var(--spacing-md)",
    transitionDuration: "150ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      opacity: 1,
    },
    ":focus": {
      outlineStyle: "none",
    },
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    ":disabled": {
      pointerEvents: "none",
    },
    "[data-state=open]": {
      backgroundColor: "var(--container-bg-alt)",
    },
  },
  closeIcon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  visuallyHidden: {
    borderWidth: 0,
    clip: "rect(0, 0, 0, 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    textAlign: "center",
    "@media (min-width: 640px)": {
      textAlign: "left",
    },
  },
  footer: {
    display: "flex",
    flexDirection: "column-reverse",
    gap: "var(--spacing-xs)",
    "@media (min-width: 640px)": {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
  },
  title: {
    color: "var(--interactive-fg)",
    fontFamily: "var(--font-heading)",
    fontSize: "var(--font-size-lg)",
    fontWeight: 600,
  },
  description: {
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-sm)",
  },
})

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  SheetOverlayProps
>(({ ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    {...props}
    {...stylex.props(styles.overlay)}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ container, layout = "default", side = "right", children, ...props }, ref) => {
  const portalContainer = usePortalContainer()
  return (
    <SheetPortal container={container ?? portalContainer}>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        {...props}
        {...stylex.props(
          styles.content,
          side === "top" && styles.contentTop,
          side === "bottom" && styles.contentBottom,
          side === "left" && styles.contentLeft,
          side === "right" && styles.contentRight,
          layout === "headerNavigation" && styles.contentHeaderNavigation,
          layout === "navigationDrawer" && styles.contentNavigationDrawer
        )}
      >
        <SheetPrimitive.Close {...stylex.props(styles.close)}>
          <X aria-hidden="true" {...stylex.props(styles.closeIcon)} />
          <span {...stylex.props(styles.visuallyHidden)}>Close</span>
        </SheetPrimitive.Close>
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
})
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  ...props
}: SheetDivProps) => (
  <div
    {...props}
    {...stylex.props(styles.header)}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  ...props
}: SheetDivProps) => (
  <div
    {...props}
    {...stylex.props(styles.footer)}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  SheetTitleProps
>(({ ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    {...props}
    {...stylex.props(styles.title)}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  SheetDescriptionProps
>(({ ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    {...props}
    {...stylex.props(styles.description)}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

export type SheetProps = React.ComponentProps<typeof Sheet>
