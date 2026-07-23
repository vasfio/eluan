import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import * as stylex from "@stylexjs/stylex"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

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
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
>(({ children, ...props }, ref) => {
  const { collapsed, isMobile } = useNavigationDrawer()

  if (isMobile) {
    return (
      <Sheet>
        <div {...stylex.props(navigationDrawerStyles.mobileTrigger)}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu {...stylex.props(navigationDrawerStyles.menuIcon)} />
              <span {...stylex.props(navigationDrawerStyles.srOnly)}>Open navigation</span>
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="left" layout="navigationDrawer">
          <nav {...stylex.props(navigationDrawerStyles.mobileNav)}>{children}</nav>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <aside
      ref={ref}
      data-collapsed={collapsed}
      {...props}
      {...stylex.props(
        navigationDrawerStyles.drawer,
        collapsed ? navigationDrawerStyles.drawerCollapsed : navigationDrawerStyles.drawerExpanded
      )}
    >
      {children}
    </aside>
  )
})
NavigationDrawer.displayName = "NavigationDrawer"

const NavigationDrawerHeader = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
>(({ children, ...props }, ref) => {
  const { collapsed } = useNavigationDrawer()

  return (
    <div
      ref={ref}
      {...props}
      {...stylex.props(
        navigationDrawerStyles.header,
        collapsed && navigationDrawerStyles.headerCollapsed
      )}
    >
      {/* Hide the brand/logomark when collapsed. The header keeps its fixed
          height (no layout jump); only its contents drop out. */}
      {!collapsed && children}
    </div>
  )
})
NavigationDrawerHeader.displayName = "NavigationDrawerHeader"

const NavigationDrawerContent = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
>((props, ref) => (
  <div
    ref={ref}
    {...props}
    {...stylex.props(navigationDrawerStyles.content)}
  />
))
NavigationDrawerContent.displayName = "NavigationDrawerContent"

const NavigationDrawerFooter = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
>((props, ref) => (
  <div
    ref={ref}
    {...props}
    {...stylex.props(navigationDrawerStyles.footer)}
  />
))
NavigationDrawerFooter.displayName = "NavigationDrawerFooter"

const NavigationDrawerToggle = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style">
>(({ onClick, ...props }, ref) => {
  const { collapsed, setCollapsed, isMobile } = useNavigationDrawer()

  if (isMobile) return null

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="compactIcon"
      aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
      onClick={(event) => {
        setCollapsed(!collapsed)
        onClick?.(event)
      }}
      {...props}
    >
      {collapsed ? (
        <ChevronRight {...stylex.props(navigationDrawerStyles.icon)} />
      ) : (
        <ChevronLeft {...stylex.props(navigationDrawerStyles.icon)} />
      )}
    </Button>
  )
})
NavigationDrawerToggle.displayName = "NavigationDrawerToggle"

const navigationDrawerStyles = stylex.create({
  mobileTrigger: {
    left: "0.75rem",
    position: "fixed",
    top: "0.75rem",
    zIndex: 40,
    "@media (min-width: 768px)": {
      display: "none",
    },
  },
  mobileNav: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  menuIcon: {
    height: "var(--size-xs)",
    width: "var(--size-xs)",
  },
  drawer: {
    backgroundColor: "var(--container-bg)",
    borderRightColor: "var(--container-border-alt)",
    borderRightStyle: "solid",
    borderRightWidth: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transitionDuration: "300ms",
    transitionProperty: "width",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  drawerCollapsed: {
    // Icon-button width plus equal horizontal padding on each side
    // (matching the content/footer inline padding) so items read centered.
    width: "calc(var(--size-md) + var(--spacing-xs) * 2)",
  },
  drawerExpanded: {
    width: "16rem",
  },
  header: {
    alignItems: "center",
    borderBottomColor: "var(--container-border-alt)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    display: "flex",
    height: "var(--size-xl)",
    paddingInline: "var(--spacing-sm)",
  },
  headerCollapsed: {
    paddingInline: "var(--spacing-xs)",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "var(--spacing-xs)",
    scrollbarColor: "transparent transparent",
    scrollbarGutter: "stable",
    ":hover": {
      scrollbarColor: "var(--container-border-alt) transparent",
    },
    "::-webkit-scrollbar": {
      width: "calc(var(--spacing-xs) + var(--spacing-xxs))",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
      borderRadius: "var(--radius-radius-full)",
      transitionDuration: "150ms",
      transitionProperty: "background-color",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    ":hover::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--container-border-alt)",
    },
  },
  footer: {
    borderTopColor: "var(--container-border-alt)",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    padding: "var(--spacing-xs)",
  },
  icon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  item: {
    alignItems: "center",
    borderRadius: "var(--curves-md)",
    color: "var(--interactive-fg-alt)",
    display: "flex",
    fontSize: "var(--font-size-xs)",
    fontWeight: 500,
    gap: "var(--spacing-sm)",
    height: "var(--size-md)",
    paddingInline: "var(--spacing-sm)",
    textDecorationLine: "none",
    transitionDuration: "150ms",
    transitionProperty: "background-color, color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
      color: "var(--interactive-fg)",
    },
    ":focus-visible": {
      boxShadow: "0 0 0 1px var(--interactive-border-alt)",
      outlineStyle: "none",
    },
  },
  itemActive: {
    backgroundColor: "var(--interactive-bg-active)",
    color: "var(--interactive-fg-active)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-active)",
      color: "var(--interactive-fg-active)",
    },
  },
  itemCollapsed: {
    // Fixed square that centers its icon; the content/footer inline padding
    // supplies the equal space on each side (no justifyContent hack on the
    // container — the drawer width shrinks to fit instead).
    justifyContent: "center",
    paddingInline: 0,
    width: "var(--size-md)",
  },
  itemIcon: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    height: "var(--size-xxs)",
    justifyContent: "center",
    width: "var(--size-xxs)",
  },
  itemLabel: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  group: {
    paddingBlock: "var(--spacing-xs)",
  },
  groupLabel: {
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-xs)",
    fontWeight: 600,
    margin: 0,
    marginBottom: "var(--spacing-xxs)",
    paddingInline: "var(--spacing-sm)",
  },
  groupLabelCollapsed: {
    opacity: 0,
  },
  groupItems: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xxs)",
  },
  layout: {
    display: "flex",
    // Fill the parent's height so the sidebar stretches to it. Consumers give
    // the layout a bounded height (a fixed wrapper, or 100vh on the page root).
    height: "100%",
  },
  layoutMain: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    minWidth: 0,
  },
  layoutBar: {
    alignItems: "center",
    borderBottomColor: "var(--container-border-alt)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    display: "flex",
    height: "var(--size-xl)",
    paddingInline: "var(--spacing-sm)",
  },
  layoutContent: {
    flex: 1,
    overflow: "auto",
  },
  srOnly: {
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
})

export interface NavigationDrawerItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "style"> {
  icon?: React.ReactNode
  asChild?: boolean
  active?: boolean
}

const NavigationDrawerItem = React.forwardRef<
  HTMLAnchorElement,
  NavigationDrawerItemProps
>(({ icon, active, asChild, children, ...props }, ref) => {
  const { collapsed } = useNavigationDrawer()
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      {...stylex.props(
        navigationDrawerStyles.item,
        active && navigationDrawerStyles.itemActive,
        collapsed && navigationDrawerStyles.itemCollapsed
      )}
      {...props}
    >
      {icon && (
        <span {...stylex.props(navigationDrawerStyles.itemIcon)}>
          {React.isValidElement(icon)
            ? React.cloneElement(
                icon as React.ReactElement<{ width?: string; height?: string }>,
                { width: "100%", height: "100%" }
              )
            : icon}
        </span>
      )}
      {!collapsed && <span {...stylex.props(navigationDrawerStyles.itemLabel)}>{children}</span>}
    </Comp>
  )
})
NavigationDrawerItem.displayName = "NavigationDrawerItem"

const NavigationDrawerGroup = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> & { label?: string }
>(({ label, children, ...props }, ref) => {
  const { collapsed } = useNavigationDrawer()

  return (
    <div ref={ref} {...props} {...stylex.props(navigationDrawerStyles.group)}>
      {label && (
        <h4
          {...stylex.props(
            navigationDrawerStyles.groupLabel,
            collapsed && navigationDrawerStyles.groupLabelCollapsed
          )}
        >
          {label}
        </h4>
      )}
      <div {...stylex.props(navigationDrawerStyles.groupItems)}>{children}</div>
    </div>
  )
})
NavigationDrawerGroup.displayName = "NavigationDrawerGroup"

/**
 * Layout helper that renders the navigation drawer alongside main content.
 * Wraps everything in the provider so open/close/collapse all work automatically.
 *
 * The collapse/expand toggle sits in a bar above the content column — outside
 * the sidebar panel — so it stays visible and clickable in both the expanded
 * and collapsed states.
 *
 * Usage:
 * ```tsx
 * <NavigationDrawerLayout
 *   sidebar={<>
 *     <NavigationDrawerHeader>Logo</NavigationDrawerHeader>
 *     <NavigationDrawerContent>
 *       <NavigationDrawerItem href="/" icon={<Home />} active>Home</NavigationDrawerItem>
 *     </NavigationDrawerContent>
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
}

const NavigationDrawerLayout = ({
  children,
  sidebar,
  defaultCollapsed = false,
}: NavigationDrawerLayoutProps) => (
  <NavigationDrawerProvider defaultCollapsed={defaultCollapsed}>
    <div {...stylex.props(navigationDrawerStyles.layout)}>
      <NavigationDrawer>{sidebar}</NavigationDrawer>
      <div {...stylex.props(navigationDrawerStyles.layoutMain)}>
        <div {...stylex.props(navigationDrawerStyles.layoutBar)}>
          <NavigationDrawerToggle />
        </div>
        <div {...stylex.props(navigationDrawerStyles.layoutContent)}>
          {children}
        </div>
      </div>
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
