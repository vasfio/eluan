import * as React from "react"
import { cn } from "@/lib/utils"
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
  /** Additional class names for the trigger button */
  className?: string
  /** Accessible label for the trigger button */
  "aria-label"?: string
}

const ActionPopover = React.forwardRef<HTMLButtonElement, ActionPopoverProps>(
  (
    {
      items,
      align = "end",
      side = "bottom",
      className,
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
            className={cn("h-[var(--size-lg)] w-[var(--size-lg)]", className)}
            aria-label={ariaLabel}
          >
            <MoreHorizontal className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} side={side}>
          {items.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={item.onClick}
              disabled={item.disabled}
              className={cn(
                item.destructive &&
                  "text-[color:var(--destructive-fg)] focus:text-[color:var(--destructive-fg)]"
              )}
            >
              {item.icon && (
                <span className="shrink-0">{item.icon}</span>
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
