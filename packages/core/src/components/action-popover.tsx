import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu"
import { Button } from "./button"

export interface ActionPopoverItem {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  destructive?: boolean
  disabled?: boolean
}

export interface ActionPopoverProps {
  /** Array of menu items to display in the dropdown */
  items: ActionPopoverItem[]
  /** Horizontal alignment of the menu relative to the trigger */
  align?: "start" | "center" | "end"
  /** Which side of the trigger the menu appears on */
  side?: "top" | "bottom" | "left" | "right"
  /** Accessible label for the trigger button */
  "aria-label"?: string
}

const styles = stylex.create({
  triggerIcon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  itemIcon: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
})

const ActionPopover = React.forwardRef<HTMLButtonElement, ActionPopoverProps>(
  (
    {
      items,
      align = "end",
      side = "bottom",
      "aria-label": ariaLabel = "Open actions menu",
    },
    ref
  ) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            size="icon"
            aria-label={ariaLabel}
          >
            <MoreHorizontal {...stylex.props(styles.triggerIcon)} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} side={side}>
          {items.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={item.onClick}
              disabled={item.disabled}
              tone={item.destructive ? "destructive" : "default"}
            >
              {item.icon && (
                <span {...stylex.props(styles.itemIcon)}>
                  {React.isValidElement(item.icon)
                    ? React.cloneElement(
                        item.icon as React.ReactElement<{ width?: string; height?: string }>,
                        { width: "100%", height: "100%" }
                      )
                    : item.icon}
                </span>
              )}
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)
ActionPopover.displayName = "ActionPopover"

export { ActionPopover }
