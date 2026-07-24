import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { Button, type ButtonSize } from "./button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu"

type PaginationProps = Omit<React.ComponentProps<"nav">, "className" | "style">
type PaginationContentProps = Omit<
  React.ComponentProps<"ul">,
  "className" | "style"
>
type PaginationItemProps = Omit<
  React.ComponentProps<"li">,
  "className" | "style"
>

const Pagination = ({ ...props }: PaginationProps) => (
  <nav
    role="navigation"
    aria-label="pagination"
    {...props}
    {...stylex.props(paginationStyles.root)}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ ...props }, ref) => (
  <ul
    ref={ref}
    {...props}
    {...stylex.props(paginationStyles.content)}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  PaginationItemProps
>(({ ...props }, ref) => (
  <li ref={ref} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkSize = Extract<ButtonSize, "default" | "sm" | "lg" | "icon">

type PaginationLinkProps = {
  edge?: boolean
  isActive?: boolean
  size?: PaginationLinkSize
} & Omit<React.ComponentProps<"a">, "className" | "style">

const PaginationLink = ({
  edge,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    {...props}
    {...stylex.props(
      paginationLinkStyles.base,
      paginationLinkSizeStyles[size],
      isActive ? paginationLinkStyles.active : paginationLinkStyles.inactive,
      edge && paginationLinkStyles.edge
    )}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = (
  props: React.ComponentProps<typeof PaginationLink>
) => (
  <PaginationLink
    aria-label="Go to previous page"
    edge
    size="default"
    {...props}
  >
    <ChevronLeft aria-hidden="true" {...stylex.props(paginationStyles.icon)} />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = (props: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    edge
    size="default"
    {...props}
  >
    <span>Next</span>
    <ChevronRight aria-hidden="true" {...stylex.props(paginationStyles.icon)} />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

interface PaginationEllipsisProps {
  /** Array of hidden page numbers to show in the dropdown */
  pages?: number[]
  /** Callback when a page number is clicked in the dropdown */
  onPageClick?: (page: number) => void
}

const PaginationEllipsis = ({
  pages,
  onPageClick,
}: PaginationEllipsisProps) => {
  if (!pages || pages.length === 0) {
    return (
      <span
        aria-hidden
        {...stylex.props(paginationStyles.ellipsis)}
      >
        <MoreHorizontal {...stylex.props(paginationStyles.icon)} />
        <span {...stylex.props(paginationStyles.visuallyHidden)}>More pages</span>
      </span>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Show more pages">
          <MoreHorizontal aria-hidden="true" {...stylex.props(paginationStyles.icon)} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {pages.map((page) => (
          <DropdownMenuItem
            key={page}
            onClick={() => onPageClick?.(page)}
          >
            Page {page}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
PaginationEllipsis.displayName = "PaginationEllipsis"

const paginationStyles = stylex.create({
  root: {
    display: "flex",
    justifyContent: "center",
    marginInline: "auto",
    width: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "var(--spacing-xxs)",
  },
  ellipsis: {
    alignItems: "center",
    color: "var(--interactive-fg-alt)",
    display: "flex",
    height: "var(--size-lg)",
    justifyContent: "center",
    width: "var(--size-lg)",
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

const paginationLinkStyles = stylex.create({
  base: {
    alignItems: "center",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: "var(--curves-md)",
    boxSizing: "border-box",
    display: "inline-flex",
    fontSize: "var(--font-size-sm)",
    fontWeight: 400,
    gap: "var(--spacing-xs)",
    justifyContent: "center",
    textDecorationLine: "none",
    transitionDuration: "150ms",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    whiteSpace: "nowrap",
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
  },
  active: {
    backgroundColor: "var(--interactive-bg-selected)",
    borderColor: "var(--interactive-bg-selected)",
    borderWidth: 1,
    color: "var(--interactive-fg-selected)",
  },
  inactive: {
    backgroundColor: "transparent",
    color: "var(--interactive-fg)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
      color: "var(--interactive-fg-hover)",
    },
  },
  edge: {
    gap: "var(--spacing-xxs)",
    paddingLeft: "var(--spacing-sm)",
  },
  sizeDefault: {
    height: "var(--size-lg)",
    paddingBlock: "var(--spacing-sm)",
    paddingInline: "var(--spacing-md)",
  },
  sizeSm: {
    borderRadius: "var(--curves-sm)",
    fontSize: "var(--font-size-xs)",
    height: "var(--size-md)",
    paddingInline: "var(--spacing-sm)",
  },
  sizeLg: {
    borderRadius: "var(--curves-md)",
    fontSize: "var(--font-size-base)",
    height: "var(--size-xl)",
    paddingInline: "var(--spacing-xl)",
  },
  sizeIcon: {
    height: "var(--size-lg)",
    width: "var(--size-lg)",
  },
})

const paginationLinkSizeStyles = {
  default: paginationLinkStyles.sizeDefault,
  sm: paginationLinkStyles.sizeSm,
  lg: paginationLinkStyles.sizeLg,
  icon: paginationLinkStyles.sizeIcon,
} satisfies Record<PaginationLinkSize, stylex.StyleXStyles>

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
