import * as React from "react"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@vasf/ragnar-core"
import { Sheet, SheetContent, SheetTrigger } from "@vasf/ragnar-core"

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
        ? "block w-full px-[var(--spacing-md)] py-[var(--spacing-sm)] text-base font-medium text-[var(--interactive-fg)] hover:bg-[var(--interactive-bg-hover)] rounded-[var(--curves-lg)] transition-colors"
        : "relative px-[var(--spacing-md)] py-[var(--spacing-xs)] text-sm font-normal text-[var(--interactive-fg-alt)] hover:text-[var(--interactive-fg)] transition-colors rounded-full"

      const activeClasses = mobile
        ? "bg-[var(--interactive-bg-alt)]"
        : "bg-[var(--interactive-bg-alt)] text-[var(--interactive-fg)]"

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
          "w-full border-b border-[color:var(--container-border-alt)] bg-[var(--container-bg)] backdrop-blur supports-[backdrop-filter]:bg-[var(--container-bg)]",
          sticky && "sticky top-0 z-50",
          transparent && "border-transparent bg-transparent",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-[var(--spacing-md)]">
          {/* Logo */}
          <div className="flex items-center">
            {logo}
          </div>

          {/* Desktop Navigation */}
          <nav className={cn("items-center gap-[var(--spacing-sm)]", breakpointClasses[mobileBreakpoint].desktop)}>
            {items.map((item) => renderNavItem(item))}
          </nav>

          {/* Desktop Actions */}
          <div className={cn("items-center gap-[var(--spacing-md)]", breakpointClasses[mobileBreakpoint].desktop)}>
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
              <SheetContent side="right" className="w-[300px] border-l border-[color:var(--container-border-alt)] bg-[var(--container-bg)] sm:w-[400px]">
                <div className="flex flex-col gap-[var(--spacing-md)] pt-[var(--spacing-md)]">
                  <nav className="flex flex-col gap-[var(--spacing-xs)]">
                    {items.map((item) => renderNavItem(item, true))}
                  </nav>
                  {actions && (
                    <div className="flex flex-col gap-[var(--spacing-sm)] border-t border-[color:var(--container-border-alt)] pt-[var(--spacing-md)]">
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
