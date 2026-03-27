import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

import { cn } from "@/lib/utils"

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
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
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
    className={cn("inline-flex items-center gap-1.5", className)}
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
      className={cn("transition-colors hover:text-foreground", className)}
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

interface BreadcrumbEllipsisProps extends React.ComponentProps<"span"> {
  /** Pass collapsed breadcrumb items to show in the popover */
  items?: { label: string; href?: string }[]
}

const BreadcrumbEllipsis = ({
  className,
  items,
  ...props
}: BreadcrumbEllipsisProps) => {
  if (items && items.length > 0) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
              "hover:bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-tertiary)] hover:text-[var(--foregrounds-primary)]",
              className
            )}
            aria-label="Show more breadcrumbs"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto min-w-[120px] p-1" align="start" sideOffset={6}>
          <div className="flex flex-col gap-0.5">
            {items.map((item, i) =>
              item.href ? (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center rounded-sm px-3 py-1.5 text-sm text-[var(--foregrounds-secondary)] hover:bg-[var(--backgrounds-tertiary)] hover:text-[var(--foregrounds-primary)] transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  key={i}
                  className="flex items-center rounded-sm px-3 py-1.5 text-sm text-[var(--foregrounds-tertiary)]"
                >
                  {item.label}
                </span>
              )
            )}
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-7 w-7 items-center justify-center text-[var(--foregrounds-tertiary)]", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  )
}
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
