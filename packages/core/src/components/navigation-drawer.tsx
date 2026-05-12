import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Sheet, SheetContent, SheetTrigger } from "./sheet"

const NavigationDrawerContext = React.createContext<{
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  isMobile: boolean
}>({
  collapsed: false,
  setCollapsed: () => {},
  isMobile: false,
})

const useNavigationDrawer = () => {
  const context = React.useContext(NavigationDrawerContext)
  if (!context) {
    throw new Error(
      "useNavigationDrawer must be used within a NavigationDrawerProvider"
    )
  }
  return context
}

interface NavigationDrawerProviderProps {
  children: React.ReactNode
  defaultCollapsed?: boolean
}

const NavigationDrawerProvider = ({
  children,
  defaultCollapsed = false,
}: NavigationDrawerProviderProps) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <NavigationDrawerContext.Provider
      value={{ collapsed, setCollapsed, isMobile }}
    >
      {children}
    </NavigationDrawerContext.Provider>
  )
}

const NavigationDrawer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { collapsed, isMobile } = useNavigationDrawer()

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed top-3 left-3 z-40 md:hidden">
            <Menu className="h-[var(--size-xs)] w-[var(--size-xs)]" />
            <span className="sr-only">Open navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <nav className="flex h-full flex-col">{children}</nav>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <aside
      ref={ref}
      data-collapsed={collapsed}
      className={cn(
        "flex h-full flex-col border-r border-[var(--container-border-alt)] bg-[var(--container-bg)] transition-[width] duration-300 ease-in-out",
        collapsed ? "w-[var(--size-2xl)]" : "w-64",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
})
NavigationDrawer.displayName = "NavigationDrawer"

const NavigationDrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { collapsed } = useNavigationDrawer()

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-12 items-center border-b border-[var(--container-border-alt)] px-[var(--spacing-sm)]",
        collapsed && "px-[var(--spacing-xs)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
NavigationDrawerHeader.displayName = "NavigationDrawerHeader"

const NavigationDrawerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-1 overflow-y-auto p-[var(--spacing-xs)]",
      // Auto-hide the vertical scrollbar — only render a faint thumb while the
      // drawer is being hovered or actively scrolled. `scrollbar-gutter: stable`
      // keeps the layout from shifting when the thumb appears.
      "[scrollbar-gutter:stable] [scrollbar-color:transparent_transparent] hover:[scrollbar-color:var(--container-border-alt)_transparent]",
      "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-[var(--container-border-alt)]",
      "[&::-webkit-scrollbar-thumb]:transition-colors",
      className
    )}
    {...props}
  />
))
NavigationDrawerContent.displayName = "NavigationDrawerContent"

const NavigationDrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-t border-[var(--container-border-alt)] p-[var(--spacing-xs)]", className)}
    {...props}
  />
))
NavigationDrawerFooter.displayName = "NavigationDrawerFooter"

const NavigationDrawerToggle = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { collapsed, setCollapsed, isMobile } = useNavigationDrawer()

  if (isMobile) return null

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-[var(--size-md)] w-[var(--size-md)]", className)}
      onClick={() => setCollapsed(!collapsed)}
      {...props}
    >
      {collapsed ? (
        <ChevronRight className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      ) : (
        <ChevronLeft className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      )}
    </Button>
  )
})
NavigationDrawerToggle.displayName = "NavigationDrawerToggle"

const navigationDrawerItemVariants = cva(
  "flex h-[var(--size-md)] items-center gap-[var(--spacing-sm)] rounded-[var(--curves-md)] px-[var(--spacing-sm)] text-[length:var(--font-size-xs)] font-medium transition-colors hover:bg-[var(--interactive-bg-hover)] hover:text-[color:var(--interactive-fg)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border-alt)]",
  {
    variants: {
      active: {
        true: "bg-[var(--interactive-bg-active)] text-[color:var(--interactive-fg-active)] hover:bg-[var(--interactive-bg-active)] hover:text-[color:var(--interactive-fg-active)]",
        false: "text-[color:var(--interactive-fg-alt)]",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

export interface NavigationDrawerItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navigationDrawerItemVariants> {
  icon?: React.ReactNode
  asChild?: boolean
}

const NavigationDrawerItem = React.forwardRef<
  HTMLAnchorElement,
  NavigationDrawerItemProps
>(({ className, icon, active, asChild, children, ...props }, ref) => {
  const { collapsed } = useNavigationDrawer()
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn(
        navigationDrawerItemVariants({ active }),
        collapsed && "w-fit",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {!collapsed && <span className="truncate">{children}</span>}
    </Comp>
  )
})
NavigationDrawerItem.displayName = "NavigationDrawerItem"

const NavigationDrawerGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { label?: string }
>(({ className, label, children, ...props }, ref) => {
  const { collapsed } = useNavigationDrawer()

  return (
    <div ref={ref} className={cn("py-[var(--spacing-xs)]", className)} {...props}>
      {label && (
        <h4 className={cn(
          // Smaller, heavier, and uppercase to read as a section heading
          // rather than another link in the list.
          "mb-[var(--spacing-xxs)] px-[var(--spacing-sm)] text-[0.6875rem] font-bold uppercase tracking-wider text-[color:var(--interactive-fg-alt)]",
          collapsed && "opacity-0"
        )}>
          {label}
        </h4>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  )
})
NavigationDrawerGroup.displayName = "NavigationDrawerGroup"

/**
 * Layout helper that renders the navigation drawer alongside main content.
 * Wraps everything in the provider so open/close/collapse all work automatically.
 *
 * Usage:
 * ```tsx
 * <NavigationDrawerLayout
 *   sidebar={<>
 *     <NavigationDrawerHeader>Logo</NavigationDrawerHeader>
 *     <NavigationDrawerContent>
 *       <NavigationDrawerItem href="/" icon={<Home />} active>Home</NavigationDrawerItem>
 *     </NavigationDrawerContent>
 *     <NavigationDrawerFooter><NavigationDrawerToggle /></NavigationDrawerFooter>
 *   </>}
 * >
 *   <main>Page content</main>
 * </NavigationDrawerLayout>
 * ```
 */
interface NavigationDrawerLayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
  defaultCollapsed?: boolean
  className?: string
}

const NavigationDrawerLayout = ({
  children,
  sidebar,
  defaultCollapsed = false,
  className,
}: NavigationDrawerLayoutProps) => (
  <NavigationDrawerProvider defaultCollapsed={defaultCollapsed}>
    <div className={cn("flex h-screen", className)}>
      <NavigationDrawer>{sidebar}</NavigationDrawer>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  </NavigationDrawerProvider>
)
NavigationDrawerLayout.displayName = "NavigationDrawerLayout"

export {
  NavigationDrawerProvider,
  NavigationDrawer,
  NavigationDrawerHeader,
  NavigationDrawerContent,
  NavigationDrawerFooter,
  NavigationDrawerToggle,
  NavigationDrawerItem,
  NavigationDrawerGroup,
  NavigationDrawerLayout,
  useNavigationDrawer,
}
