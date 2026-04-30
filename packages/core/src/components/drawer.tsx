"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Tailwind `lg` breakpoint in pixels. */
const LG_BREAKPOINT = 1024

/**
 * Variants used for the **mobile overlay** mode only.
 * On large screens (>=1024px) the drawer is rendered inline (push mode) and these classes are not applied.
 * Only left and right sides are supported.
 */
const drawerVariants = cva(
  "fixed z-50 bg-[var(--container-bg)] transition-transform duration-300 ease-in-out",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0",
        right:
          "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[state=closed]:translate-x-full data-[state=open]:translate-x-0",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

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
  React.ButtonHTMLAttributes<HTMLButtonElement>
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
  React.ButtonHTMLAttributes<HTMLButtonElement>
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
  React.HTMLAttributes<HTMLDivElement>
>(({ className, onClick, ...props }, ref) => {
  const { open, onOpenChange } = useDrawer()

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-[var(--container-bg-inverse)] transition-opacity duration-300",
        open ? "opacity-80" : "pointer-events-none opacity-0",
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onOpenChange(false)
        }
        onClick?.(e)
      }}
      {...props}
    />
  )
})
DrawerOverlay.displayName = "DrawerOverlay"

// ---------------------------------------------------------------------------
// DrawerContent
// ---------------------------------------------------------------------------

interface DrawerContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerVariants> {}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, side = "right", children, ...props }, ref) => {
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
          className={cn(
            "sticky top-0 h-screen shrink-0 bg-[var(--container-bg)] transition-[width] duration-300 ease-in-out overflow-hidden",
            resolvedSide === "right" ? "border-l order-last" : "border-r order-first",
            open ? "w-[280px]" : "w-0",
            className
          )}
          {...props}
        >
          <div className={cn("h-full w-[280px]", !open && "invisible")}>
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
          className={cn(drawerVariants({ side: resolvedSide }), className)}
          {...props}
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
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 p-4", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("font-heading text-[length:var(--font-size-lg)] font-semibold text-foreground", className)}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[length:var(--font-size-sm)] text-muted-foreground", className)}
    {...props}
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
