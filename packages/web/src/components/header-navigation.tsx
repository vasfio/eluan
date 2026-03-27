import * as React from "react"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@ragnar/core"
import { Sheet, SheetContent, SheetTrigger } from "@ragnar/core"

export interface NavItem {
  label: string
  href?: string
  onClick?: () => void
  children?: NavItem[]
  active?: boolean
}

export interface HeaderNavigationProps extends React.HTMLAttributes<HTMLElement> {
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
      className,
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

    const breakpointClasses = {
      sm: {
        desktop: "hidden sm:flex",
        mobile: "sm:hidden",
      },
      md: {
        desktop: "hidden md:flex",
        mobile: "md:hidden",
      },
      lg: {
        desktop: "hidden lg:flex",
        mobile: "lg:hidden",
      },
    }

    const renderNavItem = (item: NavItem, mobile = false) => {
      const baseClasses = mobile
        ? "block w-full px-4 py-2 text-base font-medium text-[var(--foregrounds-primary)] hover:bg-[var(--backgrounds-tertiary)] rounded-lg transition-colors"
        : "relative px-3 py-1.5 text-sm font-medium text-[var(--foregrounds-tertiary)] hover:text-[var(--foregrounds-primary)] transition-colors rounded-full"

      const activeClasses = mobile
        ? "bg-[var(--backgrounds-tertiary)]"
        : "bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-primary)]"

      if (item.href) {
        return (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              baseClasses,
              item.active && activeClasses
            )}
            onClick={() => mobile && setMobileOpen(false)}
          >
            {item.label}
          </a>
        )
      }

      return (
        <button
          key={item.label}
          onClick={() => {
            item.onClick?.()
            if (mobile) setMobileOpen(false)
          }}
          className={cn(
            baseClasses,
            "cursor-pointer text-left",
            item.active && activeClasses
          )}
        >
          {item.label}
        </button>
      )
    }

    return (
      <header
        ref={ref}
        className={cn(
          "w-full border-b border-[var(--container-border)] bg-[var(--container-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--container-bg)]/60",
          sticky && "sticky top-0 z-50",
          transparent && "border-transparent bg-transparent",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center">
            {logo}
          </div>

          {/* Desktop Navigation */}
          <nav className={cn("items-center gap-1", breakpointClasses[mobileBreakpoint].desktop)}>
            {items.map((item) => renderNavItem(item))}
          </nav>

          {/* Desktop Actions */}
          <div className={cn("items-center gap-4", breakpointClasses[mobileBreakpoint].desktop)}>
            {actions}
          </div>

          {/* Mobile Menu */}
          <div className={breakpointClasses[mobileBreakpoint].mobile}>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l border-[var(--container-border)] bg-[var(--container-bg)] sm:w-[400px]">
                <div className="flex flex-col gap-6 pt-6">
                  <nav className="flex flex-col gap-1">
                    {items.map((item) => renderNavItem(item, true))}
                  </nav>
                  {actions && (
                    <div className="flex flex-col gap-2 border-t border-[var(--container-border)] pt-6">
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

export { HeaderNavigation }
