import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

import { cn } from "@/lib/utils"
import { Button } from "./button"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-[var(--spacing-xxs)] break-words text-[var(--font-size-sm)] text-[var(--interactive-fg-alt)] sm:gap-[var(--spacing-sm)]",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-[var(--spacing-xxs)]", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-[var(--interactive-fg)]", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:h-3.5 [&>svg]:w-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

interface BreadcrumbEllipsisProps {
  className?: string
  /** Pass collapsed breadcrumb items to show in the popover */
  items?: { label: string; href?: string }[]
}

const BreadcrumbEllipsis = ({
  className,
  items = [],
}: BreadcrumbEllipsisProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-7 w-7", className)}
        aria-label="Show more breadcrumbs"
      >
        <MoreHorizontal className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto min-w-[140px] p-[var(--spacing-xxs)]" align="start" sideOffset={6}>
      <div className="flex flex-col gap-[var(--spacing-xxs)]">
        {items.length > 0 ? (
          items.map((item, i) =>
            item.href ? (
              <a
                key={i}
                href={item.href}
                className="flex items-center rounded-[var(--curves-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xxs)] text-[var(--font-size-sm)] text-[var(--interactive-fg-alt)] hover:bg-[var(--interactive-bg-hover)] hover:text-[var(--interactive-fg)] transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span
                key={i}
                className="flex items-center rounded-[var(--curves-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xxs)] text-[var(--font-size-sm)] text-[var(--interactive-fg-disabled)]"
              >
                {item.label}
              </span>
            )
          )
        ) : (
          <span className="flex items-center px-[var(--spacing-sm)] py-[var(--spacing-xxs)] text-[var(--font-size-sm)] text-[var(--interactive-fg-disabled)]">
            No pages
          </span>
        )}
      </div>
    </PopoverContent>
  </Popover>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
