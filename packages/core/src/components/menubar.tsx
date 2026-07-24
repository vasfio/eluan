"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import * as stylex from "@stylexjs/stylex"
import { Check, ChevronRight, Circle } from "lucide-react"

const MenubarMenu: typeof MenubarPrimitive.Menu = MenubarPrimitive.Menu

const MenubarGroup: typeof MenubarPrimitive.Group = MenubarPrimitive.Group

const MenubarPortal: typeof MenubarPrimitive.Portal = MenubarPrimitive.Portal

const MenubarSub: typeof MenubarPrimitive.Sub = MenubarPrimitive.Sub

const MenubarRadioGroup: typeof MenubarPrimitive.RadioGroup = MenubarPrimitive.RadioGroup

type MenubarRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>,
  "className" | "style"
>

type MenubarTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>,
  "className" | "style"
>

type MenubarSubTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger>,
  "className" | "style"
> & {
  inset?: boolean
}

type MenubarContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>,
  "className" | "style"
>

type MenubarSubContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>,
  "className" | "style"
>

type MenubarItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item>,
  "className" | "style"
> & {
  inset?: boolean
}

type MenubarCheckboxItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>,
  "className" | "style"
>

type MenubarRadioItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>,
  "className" | "style"
>

type MenubarLabelProps = Omit<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label>,
  "className" | "style"
> & {
  inset?: boolean
}

type MenubarSeparatorProps = Omit<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>,
  "className" | "style"
>

type MenubarShortcutProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "className" | "style"
>

const styles = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    gap: "var(--spacing-xxs)",
    height: "var(--size-lg)",
    padding: "var(--spacing-xxs)",
  },
  trigger: {
    alignItems: "center",
    borderRadius: "var(--curves-sm)",
    cursor: "default",
    display: "flex",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    outlineStyle: "none",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-md)",
    userSelect: "none",
    ":focus": {
      backgroundColor: "var(--interactive-bg-hover)",
      color: "var(--interactive-fg)",
    },
    "[data-state=open]": {
      backgroundColor: "var(--interactive-bg-hover)",
      color: "var(--interactive-fg)",
    },
  },
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
    color: "var(--container-fg)",
    minWidth: "12rem",
    overflow: "hidden",
    padding: "var(--spacing-xxs)",
    zIndex: 50,
  },
  contentShadow: {
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  subContent: {
    minWidth: "8rem",
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
    fontSize: "var(--font-size-sm)",
    fontWeight: 600,
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
  },
  separator: {
    backgroundColor: "var(--container-bg-alt)",
    height: 1,
    marginBlock: "var(--spacing-xxs)",
    marginInline: "calc(-1 * var(--spacing-xxs))",
  },
  shortcut: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
    letterSpacing: "0.1em",
    marginLeft: "auto",
  },
})

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  MenubarRootProps
>(({ ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    {...props}
    {...stylex.props(styles.root)}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  MenubarTriggerProps
>(({ ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    {...props}
    {...stylex.props(styles.trigger)}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  MenubarSubTriggerProps
>(({ inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
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
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  MenubarSubContentProps
>(({ ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    {...props}
    {...stylex.props(styles.content, styles.subContent)}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  MenubarContentProps
>(
  (
    { align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        {...props}
        {...stylex.props(styles.content, styles.contentShadow)}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  MenubarItemProps
>(({ inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    {...props}
    {...stylex.props(
      styles.itemBase,
      styles.standardItem,
      inset && styles.inset
    )}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  MenubarCheckboxItemProps
>(({ children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    {...props}
    {...stylex.props(styles.itemBase, styles.indicatorItem)}
  >
    <span {...stylex.props(styles.indicatorSlot)}>
      <MenubarPrimitive.ItemIndicator>
        <Check aria-hidden="true" {...stylex.props(styles.checkIcon)} />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  MenubarRadioItemProps
>(({ children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    {...props}
    {...stylex.props(styles.itemBase, styles.indicatorItem)}
  >
    <span {...stylex.props(styles.indicatorSlot)}>
      <MenubarPrimitive.ItemIndicator>
        <Circle aria-hidden="true" {...stylex.props(styles.radioIcon)} />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  MenubarLabelProps
>(({ inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    {...props}
    {...stylex.props(styles.label, inset && styles.inset)}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  MenubarSeparatorProps
>(({ ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    {...props}
    {...stylex.props(styles.separator)}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  ...props
}: MenubarShortcutProps) => {
  return (
    <span
      {...props}
      {...stylex.props(styles.shortcut)}
    />
  )
}
MenubarShortcut.displayName = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
