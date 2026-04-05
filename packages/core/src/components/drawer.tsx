"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const drawerVariants = cva(
  "fixed z-50 bg-background shadow-lg transition-transform duration-300 ease-in-out",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0",
        right:
          "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[state=closed]:translate-x-full data-[state=open]:translate-x-0",
        top: "inset-x-0 top-0 h-auto max-h-[80vh] border-b data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0",
        bottom:
          "inset-x-0 bottom-0 h-auto max-h-[80vh] border-t data-[state=closed]:translate-y-full data-[state=open]:translate-y-0",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface DrawerContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
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

  return (
    <DrawerContext.Provider value={{ open, onOpenChange: setOpen }}>
      {children}
    </DrawerContext.Provider>
  )
}

const DrawerTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, ...props }, ref) => {
  const { onOpenChange } = useDrawer()

  return (
    <button
      ref={ref}
      onClick={(e) => {
        onOpenChange(true)
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
        "fixed inset-0 z-50 bg-black/80 transition-opacity duration-300",
        open ? "opacity-100" : "pointer-events-none opacity-0",
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

interface DrawerContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerVariants> {
  /** When true the drawer pushes content instead of overlaying (no backdrop). Use with DrawerPushLayout. */
  push?: boolean
}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, side, push = false, children, ...props }, ref) => {
    const { open, onOpenChange } = useDrawer()

    // Handle escape key
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onOpenChange(false)
        }
      }

      if (open) {
        document.addEventListener("keydown", handleEscape)
        if (!push) {
          document.body.style.overflow = "hidden"
        }
      }

      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = ""
      }
    }, [open, onOpenChange, push])

    if (push) {
      // Push mode: render inline (not in a portal), no overlay, no fixed positioning.
      // The drawer sits beside the content and DrawerPushLayout handles the margin shift.
      return (
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          className={cn(
            "h-full bg-background border-r shadow-sm transition-all duration-300 ease-in-out overflow-hidden",
            open ? (side === "right" ? "w-[280px] border-l" : "w-[280px] border-r") : "w-0",
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

    return (
      <DrawerPortal>
        <DrawerOverlay />
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          className={cn(drawerVariants({ side }), className)}
          {...props}
        >
          {children}
        </div>
      </DrawerPortal>
    )
  }
)
DrawerContent.displayName = "DrawerContent"

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
    className={cn("font-heading text-lg font-semibold text-foreground", className)}
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
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

// Handle for bottom/top drawers
const DrawerHandle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mx-auto mt-4 h-1.5 w-12 rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
DrawerHandle.displayName = "DrawerHandle"


// DrawerPushLayout: wrap your main content with this to get push behaviour
// Usage: <DrawerPushLayout side="left"><YourApp /></DrawerPushLayout>
interface DrawerPushLayoutProps {
  children: React.ReactNode
  side?: "left" | "right"
  width?: string
  className?: string
}

const DrawerPushLayout = ({ children, side = "left", width = "280px", className }: DrawerPushLayoutProps) => {
  const { open } = useDrawer()
  return (
    <div
      className={cn("transition-all duration-300 ease-in-out", className)}
      style={{
        marginLeft: side === "left" && open ? width : undefined,
        marginRight: side === "right" && open ? width : undefined,
      }}
    >
      {children}
    </div>
  )
}
DrawerPushLayout.displayName = "DrawerPushLayout"

export {
  Drawer,
  DrawerPushLayout,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerHandle,
}
