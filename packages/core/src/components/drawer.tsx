"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"

/** Tailwind `lg` breakpoint in pixels. */
const LG_BREAKPOINT = 1024

// ---------------------------------------------------------------------------
// Media-query hook
// ---------------------------------------------------------------------------

function useIsLargeScreen() {
  const [isLarge, setIsLarge] = React.useState(() => {
    if (typeof window === "undefined") return false
    return window.innerWidth >= LG_BREAKPOINT
  })

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`)
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsLarge(e.matches)
    // Set initial value on the client (handles SSR mismatch).
    handler(mql)
    mql.addEventListener("change", handler as (e: MediaQueryListEvent) => void)
    return () =>
      mql.removeEventListener(
        "change",
        handler as (e: MediaQueryListEvent) => void
      )
  }, [])

  return isLarge
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface DrawerContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
  isLargeScreen: boolean
}

const DrawerContext = React.createContext<DrawerContextValue | undefined>(
  undefined
)

function useDrawer() {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer")
  }
  return context
}

// ---------------------------------------------------------------------------
// Drawer (root)
// ---------------------------------------------------------------------------

interface DrawerProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

type DrawerButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
>

type DrawerDivProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
>

type DrawerHeadingProps = Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  "className" | "style"
>

type DrawerParagraphProps = Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  "className" | "style"
>

type DrawerSide = "left" | "right"

type DrawerContentProps = DrawerDivProps & {
  side?: DrawerSide
}

const styles = stylex.create({
  overlay: {
    backgroundColor: "var(--container-fg)",
    inset: 0,
    position: "fixed",
    transitionDuration: "300ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: 50,
  },
  overlayOpen: {
    opacity: 0.8,
  },
  overlayClosed: {
    opacity: 0,
    pointerEvents: "none",
  },
  content: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border)",
    borderStyle: "solid",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    bottom: 0,
    height: "100%",
    maxWidth: "24rem",
    position: "fixed",
    top: 0,
    transitionDuration: "300ms",
    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "75%",
    zIndex: 50,
  },
  contentLeft: {
    borderLeftWidth: 0,
    borderRightWidth: 1,
    left: 0,
    "[data-state=closed]": {
      transform: "translateX(-100%)",
    },
    "[data-state=open]": {
      transform: "translateX(0)",
    },
  },
  contentRight: {
    borderLeftWidth: 1,
    borderRightWidth: 0,
    right: 0,
    "[data-state=closed]": {
      transform: "translateX(100%)",
    },
    "[data-state=open]": {
      transform: "translateX(0)",
    },
  },
  inlineContent: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border)",
    borderStyle: "solid",
    flexShrink: 0,
    height: "100vh",
    overflow: "hidden",
    position: "sticky",
    top: 0,
    transitionDuration: "300ms",
    transitionProperty: "width",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  inlineLeft: {
    borderLeftWidth: 0,
    borderRightWidth: 1,
    order: -9999,
  },
  inlineRight: {
    borderLeftWidth: 1,
    borderRightWidth: 0,
    order: 9999,
  },
  inlineOpen: {
    width: "17.5rem",
  },
  inlineClosed: {
    width: 0,
  },
  inlineInner: {
    height: "100%",
    width: "17.5rem",
  },
  inlineInnerClosed: {
    visibility: "hidden",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    padding: "var(--spacing-md)",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    marginTop: "auto",
    padding: "var(--spacing-md)",
  },
  title: {
    color: "var(--container-fg)",
    fontFamily: "var(--font-heading)",
    fontSize: "var(--font-size-lg)",
    fontWeight: 600,
  },
  description: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-sm)",
  },
})

function Drawer({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: DrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = onOpenChange ?? setUncontrolledOpen
  const isLargeScreen = useIsLargeScreen()

  return (
    <DrawerContext.Provider value={{ open, onOpenChange: setOpen, isLargeScreen }}>
      {children}
    </DrawerContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Trigger / Close
// ---------------------------------------------------------------------------

const DrawerTrigger = React.forwardRef<
  HTMLButtonElement,
  DrawerButtonProps
>(({ onClick, ...props }, ref) => {
  const { open, onOpenChange } = useDrawer()

  return (
    <button
      ref={ref}
      onClick={(e) => {
        onOpenChange(!open)
        onClick?.(e)
      }}
      {...props}
    />
  )
})
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerClose = React.forwardRef<
  HTMLButtonElement,
  DrawerButtonProps
>(({ onClick, ...props }, ref) => {
  const { onOpenChange } = useDrawer()

  return (
    <button
      ref={ref}
      onClick={(e) => {
        onOpenChange(false)
        onClick?.(e)
      }}
      {...props}
    />
  )
})
DrawerClose.displayName = "DrawerClose"

// ---------------------------------------------------------------------------
// Portal / Overlay (mobile only)
// ---------------------------------------------------------------------------

const DrawerPortal = ({ children }: { children: React.ReactNode }) => {
  const { open } = useDrawer()

  if (!open) return null

  return <>{children}</>
}

const DrawerOverlay = React.forwardRef<
  HTMLDivElement,
  DrawerDivProps
>(({ onClick, ...props }, ref) => {
  const { open, onOpenChange } = useDrawer()

  return (
    <div
      ref={ref}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onOpenChange(false)
        }
        onClick?.(e)
      }}
      {...props}
      {...stylex.props(styles.overlay, open ? styles.overlayOpen : styles.overlayClosed)}
    />
  )
})
DrawerOverlay.displayName = "DrawerOverlay"

// ---------------------------------------------------------------------------
const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ side = "right", children, ...props }, ref) => {
    const { open, onOpenChange, isLargeScreen } = useDrawer()

    const resolvedSide = side ?? "right"

    // ----- side-effects -----
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onOpenChange(false)
        }
      }

      if (open) {
        document.addEventListener("keydown", handleEscape)
        // Only lock scroll on mobile overlay mode
        if (!isLargeScreen) {
          document.body.style.overflow = "hidden"
        }
      }

      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = ""
      }
    }, [open, onOpenChange, isLargeScreen])

    // ----- Large screen: inline push mode -----
    if (isLargeScreen) {
      return (
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          {...props}
          {...stylex.props(
            styles.inlineContent,
            resolvedSide === "right" ? styles.inlineRight : styles.inlineLeft,
            open ? styles.inlineOpen : styles.inlineClosed
          )}
        >
          <div
            {...stylex.props(
              styles.inlineInner,
              !open && styles.inlineInnerClosed
            )}
          >
            {children}
          </div>
        </div>
      )
    }

    // ----- Small screen: overlay mode -----
    return (
      <DrawerPortal>
        <DrawerOverlay />
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          {...props}
          {...stylex.props(
            styles.content,
            resolvedSide === "right" ? styles.contentRight : styles.contentLeft
          )}
        >
          {children}
        </div>
      </DrawerPortal>
    )
  }
)
DrawerContent.displayName = "DrawerContent"

// ---------------------------------------------------------------------------
// Header / Footer / Title / Description
// ---------------------------------------------------------------------------

const DrawerHeader = ({
  ...props
}: DrawerDivProps) => (
  <div
    {...props}
    {...stylex.props(styles.header)}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  ...props
}: DrawerDivProps) => (
  <div
    {...props}
    {...stylex.props(styles.footer)}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  DrawerHeadingProps
>(({ ...props }, ref) => (
  <h2
    ref={ref}
    {...props}
    {...stylex.props(styles.title)}
  />
))
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  DrawerParagraphProps
>(({ ...props }, ref) => (
  <p
    ref={ref}
    {...props}
    {...stylex.props(styles.description)}
  />
))
DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
