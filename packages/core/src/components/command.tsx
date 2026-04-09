import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "./dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-[var(--curves-md)] bg-[var(--container-bg)] text-[var(--container-fg)]",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-[var(--spacing-sm)] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[var(--interactive-fg-alt)] [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-[var(--spacing-sm)] [&_[cmdk-input-wrapper]_svg]:h-[var(--size-xs)] [&_[cmdk-input-wrapper]_svg]:w-[var(--size-xs)] [&_[cmdk-input]]:h-[var(--size-xl)] [&_[cmdk-item]]:px-[var(--spacing-sm)] [&_[cmdk-item]]:py-[var(--spacing-sm)] [&_[cmdk-item]_svg]:h-[var(--size-xs)] [&_[cmdk-item]_svg]:w-[var(--size-xs)]">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-[var(--size-xxs)] w-[var(--size-xxs)] shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-[var(--size-xl)] w-full rounded-[var(--curves-md)] bg-transparent py-[var(--spacing-md)] text-[var(--font-size-sm)] outline-none placeholder:text-[var(--interactive-fg-alt)] disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:text-[var(--interactive-fg-disabled)]",
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-[var(--spacing-lg)] text-center text-[var(--font-size-sm)]"
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-[var(--spacing-xs)] text-[var(--interactive-fg)] [&_[cmdk-group-heading]]:px-[var(--spacing-sm)] [&_[cmdk-group-heading]]:py-[var(--spacing-sm)] [&_[cmdk-group-heading]]:text-[var(--font-size-xs)] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[var(--interactive-fg-alt)]",
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-[var(--spacing-xxs)] h-px bg-[var(--container-border)]", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-[var(--spacing-xs)] select-none items-center rounded-[var(--curves-sm)] px-[var(--spacing-xs)] py-[var(--spacing-xs)] text-[var(--font-size-sm)] outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-[var(--interactive-bg-selected)] data-[selected=true]:text-[var(--interactive-fg-selected)] data-[disabled=true]:bg-[var(--interactive-bg-disabled)] data-[disabled=true]:text-[var(--interactive-fg-disabled)] [&_svg]:pointer-events-none [&_svg]:size-[var(--size-xxs)] [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-[var(--font-size-xs)] tracking-widest text-[var(--interactive-fg-alt)]",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
