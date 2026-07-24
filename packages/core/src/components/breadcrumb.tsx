import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import * as stylex from "@stylexjs/stylex"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  Omit<React.ComponentPropsWithoutRef<"nav">, "className" | "style"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const styles = stylex.create({
  list: {
    alignItems: "center",
    color: "var(--interactive-fg-alt)",
    display: "flex",
    flexWrap: "wrap",
    fontSize: "var(--font-size-sm)",
    gap: "var(--spacing-xxs)",
    overflowWrap: "break-word",
    "@media (min-width: 640px)": {
      gap: "var(--spacing-sm)",
    },
  },
  item: {
    alignItems: "center",
    display: "inline-flex",
    gap: "var(--spacing-xxs)",
  },
  link: {
    transitionDuration: "150ms",
    transitionProperty: "color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      color: "var(--interactive-fg)",
    },
  },
  page: {
    color: "var(--interactive-fg)",
    fontWeight: 400,
  },
  separatorIcon: {
    height: "var(--font-size-sm)",
    width: "var(--font-size-sm)",
  },
  ellipsis: {
    alignItems: "center",
    display: "flex",
    height: "var(--size-sm)",
    justifyContent: "center",
    width: "var(--size-sm)",
  },
  icon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  visuallyHidden: {
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

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  Omit<React.ComponentPropsWithoutRef<"ol">, "className" | "style">
>(({ ...props }, ref) => (
  <ol
    ref={ref}
    {...props}
    {...stylex.props(styles.list)}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  Omit<React.ComponentPropsWithoutRef<"li">, "className" | "style">
>(({ ...props }, ref) => (
  <li
    ref={ref}
    {...props}
    {...stylex.props(styles.item)}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<React.ComponentPropsWithoutRef<"a">, "className" | "style"> & {
    asChild?: boolean
  }
>(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      {...props}
      {...stylex.props(styles.link)}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">
>(({ ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    {...props}
    {...stylex.props(styles.page)}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  ...props
}: Omit<React.ComponentProps<"li">, "className" | "style">) => (
  <li
    role="presentation"
    aria-hidden="true"
    {...props}
  >
    {children && React.isValidElement(children)
      ? React.cloneElement(
          children as React.ReactElement<Record<string, unknown>>,
          stylex.props(styles.separatorIcon)
        )
      : children ?? <ChevronRight {...stylex.props(styles.separatorIcon)} />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

interface BreadcrumbEllipsisProps {
  /** Pass collapsed breadcrumb items to show in the dropdown */
  items?: { label: string; href?: string; onClick?: () => void }[]
}

const BreadcrumbEllipsis = ({
  items = [],
}: BreadcrumbEllipsisProps) => {
  if (items.length === 0) {
    return (
      <span
        role="presentation"
        aria-hidden="true"
        {...stylex.props(styles.ellipsis)}
      >
        <MoreHorizontal {...stylex.props(styles.icon)} />
        <span {...stylex.props(styles.visuallyHidden)}>More breadcrumbs</span>
      </span>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="xsIcon"
          aria-label="Show more breadcrumbs"
        >
          <MoreHorizontal aria-hidden="true" {...stylex.props(styles.icon)} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {items.map((item, i) => (
          <DropdownMenuItem
            key={i}
            disabled={!item.href && !item.onClick}
            onClick={() => {
              if (item.onClick) {
                item.onClick()
              } else if (item.href) {
                window.location.href = item.href
              }
            }}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
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
