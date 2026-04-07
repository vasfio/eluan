"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

// Sidebar context
interface SidebarContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined
)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// Provider
interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
  defaultCollapsed?: boolean
  onOpenChange?: (open: boolean) => void
  onCollapsedChange?: (collapsed: boolean) => void
}

export function SidebarProvider({
  children,
  defaultOpen = true,
  defaultCollapsed = false,
  onOpenChange,
  onCollapsedChange,
}: SidebarProviderProps) {
  const [open, setOpenState] = React.useState(defaultOpen)
  const [collapsed, setCollapsedState] = React.useState(defaultCollapsed)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const setOpen = React.useCallback(
    (value: boolean) => {
      setOpenState(value)
      onOpenChange?.(value)
    },
    [onOpenChange]
  )

  const setCollapsed = React.useCallback(
    (value: boolean) => {
      setCollapsedState(value)
      onCollapsedChange?.(value)
    },
    [onCollapsedChange]
  )

  return (
    <SidebarContext.Provider
      value={{ open, setOpen, collapsed, setCollapsed, isMobile }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

// Sidebar variants
const sidebarVariants = cva(
  "flex h-full flex-col border-r bg-[var(--container-bg)] transition-all duration-300",
  {
    variants: {
      variant: {
        default: "",
        inset: "rounded-[var(--curves-lg)] border shadow-sm",
        floating: "m-[var(--spacing-sm)] rounded-[var(--curves-lg)] border shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  /** Width when expanded */
  width?: number
  /** Width when collapsed */
  collapsedWidth?: number
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      variant,
      width = 256,
      collapsedWidth = 64,
      children,
      ...props
    },
    ref
  ) => {
    const { open, setOpen, collapsed, isMobile } = useSidebar()

    // Mobile: slide in/out
    // Desktop: collapse to icons
    const currentWidth = isMobile
      ? open
        ? width
        : 0
      : collapsed
      ? collapsedWidth
      : width

    return (
      <>
        {/* Mobile overlay */}
        {isMobile && open && (
          <div
            className="fixed inset-0 z-40 bg-[var(--container-bg-inverse)] opacity-80 transition-opacity"
            onClick={() => setOpen(false)}
          />
        )}

        <aside
          ref={ref}
          data-collapsed={collapsed}
          data-mobile={isMobile}
          className={cn(
            sidebarVariants({ variant }),
            isMobile && "fixed inset-y-0 left-0 z-50",
            className
          )}
          style={{
            width: currentWidth,
            minWidth: currentWidth,
            overflow: "hidden",
          }}
          {...props}
        >
          <div
            className="flex h-full flex-col"
            style={{ width: width, minWidth: width }}
          >
            {children}
          </div>
        </aside>
      </>
    )
  }
)
Sidebar.displayName = "Sidebar"

// Trigger button
interface SidebarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, ...props }, ref) => {
    const { open, setOpen, collapsed, setCollapsed, isMobile } = useSidebar()

    const handleClick = () => {
      if (isMobile) {
        setOpen(!open)
      } else {
        setCollapsed(!collapsed)
      }
    }

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("h-9 w-9", className)}
        onClick={handleClick}
        {...props}
      >
        <PanelLeft className="h-4 w-4" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
    )
  }
)
SidebarTrigger.displayName = "SidebarTrigger"

// Sidebar sections
const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-14 items-center border-b px-[var(--spacing-md)]", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto py-[var(--spacing-sm)]", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-auto border-t p-[var(--spacing-md)]", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-[var(--spacing-sm)] py-[var(--spacing-sm)]", className)} {...props} />
))
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { collapsed } = useSidebar()

  if (collapsed) return null

  return (
    <div
      ref={ref}
      className={cn(
        "px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-xs font-medium text-[var(--interactive-fg-alt)]",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1", className)} {...props} />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("space-y-1", className)} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  tooltip?: string
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, isActive, tooltip, children, ...props }, ref) => {
  const { collapsed } = useSidebar()

  const button = (
    <button
      ref={ref}
      className={cn(
        "flex w-full items-center gap-[var(--spacing-sm)] rounded-[var(--curves-md)] px-[var(--spacing-sm)] py-[var(--spacing-sm)] text-sm font-medium transition-colors",
        "hover:bg-[var(--interactive-bg-hover)] hover:text-[var(--interactive-fg)]",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)]",
        isActive && "bg-[var(--interactive-bg-active)] text-[var(--interactive-fg-active)]",
        collapsed && "justify-center px-[var(--spacing-sm)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )

  if (collapsed && tooltip) {
    return (
      <div className="relative group">
        {button}
        <div className="absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 rounded-[var(--curves-md)] bg-[var(--container-bg)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-xs text-[var(--container-fg)] opacity-0 shadow-md transition-opacity group-hover:opacity-100">
          {tooltip}
        </div>
      </div>
    )
  }

  return button
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  const { collapsed } = useSidebar()

  if (collapsed) return null

  return (
    <ul
      ref={ref}
      className={cn("ml-[var(--spacing-md)] space-y-1 border-l pl-[var(--spacing-md)]", className)}
      {...props}
    />
  )
})
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }
>(({ className, isActive, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex w-full items-center rounded-[var(--curves-md)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-sm transition-colors",
      "hover:bg-[var(--interactive-bg-hover)] hover:text-[var(--interactive-fg)]",
      isActive && "bg-[var(--interactive-bg-active)] text-[var(--interactive-fg-active)]",
      className
    )}
    {...props}
  />
))
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

const SidebarSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-[var(--spacing-sm)] my-[var(--spacing-sm)] h-px bg-[var(--interactive-border-alt)]", className)}
    {...props}
  />
))
SidebarSeparator.displayName = "SidebarSeparator"

export {
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
}
