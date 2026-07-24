"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import * as stylex from "@stylexjs/stylex"
import { Check, ChevronRight, Circle } from "lucide-react"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

type ContextMenuSubTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger>,
  "className" | "style"
> & {
  inset?: boolean
}

type ContextMenuSubContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>,
  "className" | "style"
>

type ContextMenuContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>,
  "className" | "style"
>

type ContextMenuItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item>,
  "className" | "style"
> & {
  inset?: boolean
}

type ContextMenuCheckboxItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>,
  "className" | "style"
>

type ContextMenuRadioItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>,
  "className" | "style"
>

type ContextMenuLabelProps = Omit<
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>,
  "className" | "style"
> & {
  inset?: boolean
}

type ContextMenuSeparatorProps = Omit<
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>,
  "className" | "style"
>

type ContextMenuShortcutProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "className" | "style"
>

const styles = stylex.create({
  itemBase: {
    alignItems: "center",
    borderRadius: "var(--curves-sm)",
    cursor: "default",
    display: "flex",
    fontSize: "var(--font-size-sm)",
    outlineStyle: "none",
    position: "relative",
    userSelect: "none",
    ":focus": {
      backgroundColor: "var(--interactive-bg-hover)",
      color: "var(--interactive-fg)",
    },
    "[data-disabled]": {
      backgroundColor: "var(--interactive-bg-disabled)",
      color: "var(--interactive-fg-disabled)",
      pointerEvents: "none",
    },
  },
  standardItem: {
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
  },
  indicatorItem: {
    paddingBottom: "var(--spacing-xs)",
    paddingLeft: "calc(var(--spacing-lg) + var(--spacing-md))",
    paddingRight: "var(--spacing-sm)",
    paddingTop: "var(--spacing-xs)",
  },
  subTrigger: {
    "[data-state=open]": {
      backgroundColor: "var(--interactive-bg-hover)",
      color: "var(--interactive-fg)",
    },
  },
  inset: {
    paddingLeft: "calc(var(--spacing-lg) + var(--spacing-md))",
  },
  chevron: {
    height: "var(--size-xxs)",
    marginLeft: "auto",
    width: "var(--size-xxs)",
  },
  content: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    color: "var(--container-fg)",
    minWidth: "8rem",
    overflow: "hidden",
    padding: "var(--spacing-xxs)",
    transformOrigin: "var(--radix-context-menu-content-transform-origin)",
    zIndex: 50,
  },
  subContent: {
    padding: "var(--spacing-xs)",
  },
  indicatorSlot: {
    alignItems: "center",
    display: "flex",
    height: "calc(var(--size-xxs) + var(--spacing-xxs))",
    justifyContent: "center",
    left: "var(--spacing-sm)",
    position: "absolute",
    width: "calc(var(--size-xxs) + var(--spacing-xxs))",
  },
  checkIcon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  radioIcon: {
    fill: "currentColor",
    height: "var(--spacing-sm)",
    width: "var(--spacing-sm)",
  },
  label: {
    color: "var(--interactive-fg)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 600,
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
  },
  separator: {
    backgroundColor: "var(--container-border)",
    height: 1,
    marginBlock: "var(--spacing-xs)",
    marginInline: "calc(-1 * var(--spacing-xs))",
  },
  shortcut: {
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-xs)",
    letterSpacing: "0.1em",
    marginLeft: "auto",
  },
})

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  ContextMenuSubTriggerProps
>(({ inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    {...props}
    {...stylex.props(
      styles.itemBase,
      styles.standardItem,
      styles.subTrigger,
      inset && styles.inset
    )}
  >
    {children}
    <ChevronRight aria-hidden="true" {...stylex.props(styles.chevron)} />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  ContextMenuSubContentProps
>(({ ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    {...props}
    {...stylex.props(styles.content, styles.subContent)}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  ContextMenuContentProps
>(({ ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      {...props}
      {...stylex.props(styles.content)}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  ContextMenuItemProps
>(({ inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    {...props}
    {...stylex.props(
      styles.itemBase,
      styles.standardItem,
      inset && styles.inset
    )}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  ContextMenuCheckboxItemProps
>(({ children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    {...props}
    {...stylex.props(styles.itemBase, styles.indicatorItem)}
  >
    <span {...stylex.props(styles.indicatorSlot)}>
      <ContextMenuPrimitive.ItemIndicator>
        <Check aria-hidden="true" {...stylex.props(styles.checkIcon)} />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  ContextMenuRadioItemProps
>(({ children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    {...props}
    {...stylex.props(styles.itemBase, styles.indicatorItem)}
  >
    <span {...stylex.props(styles.indicatorSlot)}>
      <ContextMenuPrimitive.ItemIndicator>
        <Circle aria-hidden="true" {...stylex.props(styles.radioIcon)} />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  ContextMenuLabelProps
>(({ inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    {...props}
    {...stylex.props(styles.label, inset && styles.inset)}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  ContextMenuSeparatorProps
>(({ ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    {...props}
    {...stylex.props(styles.separator)}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  ...props
}: ContextMenuShortcutProps) => {
  return (
    <span
      {...props}
      {...stylex.props(styles.shortcut)}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
