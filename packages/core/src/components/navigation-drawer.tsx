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
            <Menu className="h-5 w-5" />
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
        "flex h-full flex-col border-r border-[var(--container-border)] bg-[var(--container-bg)] transition-all duration-300",
        collapsed ? "w-16" : "w-64",
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
        "flex h-14 items-center border-b border-[var(--container-border)] px-4",
        collapsed && "justify-center px-2",
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
    className={cn("flex-1 overflow-y-auto p-2", className)}
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
    className={cn("border-t border-[var(--container-border)] p-2", className)}
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
      className={cn("h-8 w-8", className)}
      onClick={() => setCollapsed(!collapsed)}
      {...props}
    >
      {collapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </Button>
  )
})
NavigationDrawerToggle.displayName = "NavigationDrawerToggle"

const navigationDrawerItemVariants = cva(
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--backgrounds-tertiary)] hover:text-[var(--foregrounds-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-fg)]",
  {
    variants: {
      active: {
        true: "bg-[var(--interactive-bg-active)] text-[var(--interactive-fg-active)]",
        false: "text-[var(--foregrounds-secondary)]",
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
        collapsed && "justify-center px-2",
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
    <div ref={ref} className={cn("py-2", className)} {...props}>
      {label && !collapsed && (
        <h4 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </h4>
      )}
      <div className="space-y-1">{children}</div>
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
