import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Menu } from "lucide-react"

import { Button } from "./button"
import { Sheet, SheetContent, SheetTrigger } from "./sheet"

export interface NavItem {
  label: string
  href?: string
  onClick?: () => void
  children?: NavItem[]
  active?: boolean
}

export interface HeaderNavigationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "style"> {
  logo?: React.ReactNode
  items?: NavItem[]
  actions?: React.ReactNode
  sticky?: boolean
  transparent?: boolean
  mobileBreakpoint?: "sm" | "md" | "lg"
}

const HeaderNavigation = React.forwardRef<HTMLElement, HeaderNavigationProps>(
  (
    {
      logo,
      items = [],
      actions,
      sticky = false,
      transparent = false,
      mobileBreakpoint = "md",
      ...props
    },
    ref
  ) => {
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const renderNavItem = (item: NavItem, mobile = false) => {
      const navItemStyles = mobile
        ? [styles.mobileItem, item.active && styles.mobileItemActive]
        : [styles.desktopItem, item.active && styles.desktopItemActive]

      if (item.href) {
        return (
          <a
            key={item.label}
            href={item.href}
            {...stylex.props(...navItemStyles)}
            onClick={() => mobile && setMobileOpen(false)}
          >
            {item.label}
          </a>
        )
      }

      return (
        <button
          key={item.label}
          type="button"
          onClick={() => {
            item.onClick?.()
            if (mobile) setMobileOpen(false)
          }}
          {...stylex.props(...navItemStyles, styles.buttonItem)}
        >
          {item.label}
        </button>
      )
    }

    return (
      <header
        ref={ref}
        {...props}
        {...stylex.props(
          styles.header,
          sticky && styles.sticky,
          transparent && styles.transparent
        )}
      >
        <div {...stylex.props(styles.container)}>
          <div {...stylex.props(styles.logo)}>
            {logo}
          </div>

          <nav {...stylex.props(styles.desktopNav, desktopBreakpointStyles[mobileBreakpoint])}>
            {items.map((item) => renderNavItem(item))}
          </nav>

          <div {...stylex.props(styles.desktopActions, desktopBreakpointStyles[mobileBreakpoint])}>
            {actions}
          </div>

          <div {...stylex.props(mobileBreakpointStyles[mobileBreakpoint])}>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu {...stylex.props(styles.menuIcon)} />
                  <span {...stylex.props(styles.srOnly)}>Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" layout="headerNavigation">
                <div {...stylex.props(styles.mobilePanel)}>
                  <nav {...stylex.props(styles.mobileNav)}>
                    {items.map((item) => renderNavItem(item, true))}
                  </nav>
                  {actions && (
                    <div {...stylex.props(styles.mobileActions)}>
                      {actions}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    )
  }
)
HeaderNavigation.displayName = "HeaderNavigation"

const styles = stylex.create({
  header: {
    backdropFilter: "blur(8px)",
    backgroundColor: "var(--container-bg)",
    borderBottomColor: "var(--container-border-alt)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    width: "100%",
  },
  sticky: {
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  transparent: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
  },
  container: {
    alignItems: "center",
    boxSizing: "border-box",
    display: "flex",
    height: "calc(var(--size-xl) * 1.5)",
    justifyContent: "space-between",
    marginInline: "auto",
    maxWidth: "80rem",
    paddingInline: "var(--spacing-md)",
    width: "100%",
  },
  logo: {
    alignItems: "center",
    display: "flex",
  },
  desktopNav: {
    alignItems: "center",
    display: "none",
    gap: "var(--spacing-sm)",
  },
  desktopActions: {
    alignItems: "center",
    display: "none",
    gap: "var(--spacing-md)",
  },
  desktopItem: {
    borderRadius: "var(--radius-radius-full)",
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 400,
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-md)",
    position: "relative",
    textDecoration: "none",
    transitionDuration: "150ms",
    transitionProperty: "background-color, color",
    transitionTimingFunction: "ease",
    ":hover": {
      color: "var(--interactive-fg)",
    },
  },
  desktopItemActive: {
    backgroundColor: "var(--interactive-bg-alt)",
    color: "var(--interactive-fg)",
  },
  mobileItem: {
    backgroundColor: "transparent",
    borderRadius: "var(--curves-lg)",
    borderWidth: 0,
    boxSizing: "border-box",
    color: "var(--interactive-fg)",
    display: "block",
    fontSize: "var(--font-size-base)",
    fontWeight: 500,
    paddingBlock: "var(--spacing-sm)",
    paddingInline: "var(--spacing-md)",
    textDecoration: "none",
    transitionDuration: "150ms",
    transitionProperty: "background-color",
    transitionTimingFunction: "ease",
    width: "100%",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  mobileItemActive: {
    backgroundColor: "var(--interactive-bg-alt)",
  },
  buttonItem: {
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "left",
  },
  mobilePanel: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-md)",
    paddingTop: "var(--spacing-md)",
  },
  mobileNav: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  mobileActions: {
    borderTopColor: "var(--container-border-alt)",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
    paddingTop: "var(--spacing-md)",
  },
  menuIcon: {
    height: "var(--size-xs)",
    width: "var(--size-xs)",
  },
  srOnly: {
    clip: "rect(0, 0, 0, 0)",
    borderWidth: 0,
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  },
})

const desktopBreakpointStyles = stylex.create({
  sm: {
    "@media (min-width: 640px)": {
      display: "flex",
    },
  },
  md: {
    "@media (min-width: 768px)": {
      display: "flex",
    },
  },
  lg: {
    "@media (min-width: 1024px)": {
      display: "flex",
    },
  },
})

const mobileBreakpointStyles = stylex.create({
  sm: {
    "@media (min-width: 640px)": {
      display: "none",
    },
  },
  md: {
    "@media (min-width: 768px)": {
      display: "none",
    },
  },
  lg: {
    "@media (min-width: 1024px)": {
      display: "none",
    },
  },
})

export { HeaderNavigation }
