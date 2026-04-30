import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-[var(--spacing-xs)] select-none items-center rounded-[var(--curves-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)] outline-none focus:bg-accent data-[state=open]:bg-[var(--interactive-bg-hover)] [&_svg]:pointer-events-none [&_svg]:size-[var(--size-xxs)] [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-[var(--curves-md)] border bg-[var(--container-bg)] p-[var(--spacing-xxs)] text-[color:var(--container-fg)] shadow-lg",
      "data-[state=open]:animate-dropdown-unroll data-[state=closed]:animate-dropdown-roll-up",
      "data-[side=bottom]:origin-top data-[side=top]:origin-bottom data-[side=left]:origin-right data-[side=right]:origin-left",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-[var(--curves-md)] border bg-[var(--container-bg)] p-[var(--spacing-xxs)] text-[color:var(--container-fg)] shadow-md",
        "data-[state=open]:animate-dropdown-unroll data-[state=closed]:animate-dropdown-roll-up",
        "data-[side=bottom]:origin-top data-[side=top]:origin-bottom data-[side=left]:origin-right data-[side=right]:origin-left",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-[var(--spacing-sm)] rounded-[var(--curves-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)] outline-none transition-colors focus:bg-[var(--interactive-bg-hover)] focus:text-[color:var(--interactive-fg)] data-[disabled]:pointer-events-none data-[disabled]:bg-[var(--interactive-bg-disabled)] data-[disabled]:text-[color:var(--interactive-fg-disabled)] [&_svg]:pointer-events-none [&_svg]:size-[var(--size-xxs)] [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center justify-between rounded-[var(--curves-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)] outline-none transition-colors",
      "hover:bg-[var(--interactive-bg-hover)] focus:bg-[var(--interactive-bg-hover)]",
      "data-[state=checked]:text-[color:var(--interactive-fg)]",
      "data-[disabled]:pointer-events-none data-[disabled]:bg-[var(--interactive-bg-disabled)] data-[disabled]:text-[color:var(--interactive-fg-disabled)]",
      className
    )}
    checked={checked}
    {...props}
  >
    {children}
    <span className={cn(
      "ml-auto pl-[var(--spacing-md)] flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border border-[var(--interactive-border-alt)] transition-colors",
      checked ? "bg-[var(--interactive-bg-active)] border-[var(--interactive-bg-active)]" : ""
    )}>
      {checked && <Check className="h-3 w-3 text-[color:var(--interactive-fg-active)]" />}
    </span>
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center justify-between rounded-[var(--curves-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)] outline-none transition-colors",
      "hover:bg-[var(--interactive-bg-hover)] focus:bg-[var(--interactive-bg-hover)]",
      "data-[disabled]:pointer-events-none data-[disabled]:bg-[var(--interactive-bg-disabled)] data-[disabled]:text-[color:var(--interactive-fg-disabled)]",
      className
    )}
    {...props}
  >
    {children}
    <span className="relative ml-[var(--spacing-sm)] flex h-[var(--size-xxs)] w-[var(--size-xxs)] shrink-0 items-center justify-center rounded-full border border-[var(--interactive-border-alt)]">
      <DropdownMenuPrimitive.ItemIndicator>
        <span className="absolute inset-0 rounded-full bg-[var(--interactive-bg-active)] border border-[var(--interactive-bg-active)] flex items-center justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--interactive-fg-active)]" />
        </span>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-[var(--spacing-sm)] py-[var(--spacing-sm)] text-[length:var(--font-size-sm)] font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-[var(--spacing-xxs)] my-[var(--spacing-xxs)] h-px bg-[var(--container-bg-alt)]", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-[length:var(--font-size-xs)] tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
