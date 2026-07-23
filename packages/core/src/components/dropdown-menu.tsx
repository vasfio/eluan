import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import * as stylex from "@stylexjs/stylex"
import { Check, ChevronRight } from "lucide-react"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

type DropdownMenuSubTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>,
  "className" | "style"
> & {
  inset?: boolean
}

type DropdownMenuSubContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>,
  "className" | "style"
>

type DropdownMenuContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
  "className" | "style"
>

type DropdownMenuItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
  "className" | "style"
> & {
  inset?: boolean
  tone?: "default" | "destructive"
}

type DropdownMenuCheckboxItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  "className" | "style"
>

type DropdownMenuRadioItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>,
  "className" | "style"
>

type DropdownMenuLabelProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>,
  "className" | "style"
> & {
  inset?: boolean
}

type DropdownMenuSeparatorProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>,
  "className" | "style"
>

type DropdownMenuShortcutProps = Omit<
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
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
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
  subTrigger: {
    gap: "var(--spacing-xs)",
    "[data-state=open]": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  item: {
    gap: "var(--spacing-sm)",
    transitionDuration: "150ms",
    transitionProperty: "background-color, color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  itemDestructive: {
    color: "var(--destructive-fg)",
    ":focus": {
      color: "var(--destructive-fg)",
    },
  },
  inset: {
    paddingLeft: "calc(var(--spacing-lg) + var(--spacing-md))",
  },
  chevron: {
    marginLeft: "auto",
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
    transformOrigin: "var(--radix-dropdown-menu-content-transform-origin)",
    zIndex: 50,
    "[data-side=bottom]": {
      transformOrigin: "top",
    },
    "[data-side=left]": {
      transformOrigin: "right",
    },
    "[data-side=right]": {
      transformOrigin: "left",
    },
    "[data-side=top]": {
      transformOrigin: "bottom",
    },
  },
  subContent: {
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
  checkboxItem: {
    justifyContent: "space-between",
    transitionDuration: "150ms",
    transitionProperty: "background-color, color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
    "[data-state=checked]": {
      color: "var(--interactive-fg)",
    },
  },
  radioItem: {
    justifyContent: "space-between",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  // Presentational mirror of the `Checkbox` component's recipe. We cannot nest
  // the interactive Radix checkbox inside a menu item, so this replicates its
  // exact visual (box, border, skeuo shadows, checked fill) driven by the menu
  // item's own checked state.
  checkBox: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-xs)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "var(--skeuo-recessed)",
    boxSizing: "border-box",
    display: "flex",
    flexShrink: 0,
    height: "var(--size-xxs)",
    justifyContent: "center",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--size-xxs)",
  },
  checkBoxChecked: {
    backgroundColor: "var(--interactive-bg-selected)",
    backgroundImage: "var(--skeuo-surface-pressed)",
    borderColor: "var(--interactive-bg-selected)",
    boxShadow: "var(--skeuo-pressed)",
    color: "var(--interactive-fg-selected)",
  },
  checkIcon: {
    color: "var(--interactive-fg-selected)",
    height: "var(--spacing-md)",
    width: "var(--spacing-md)",
  },
  // Presentational mirror of the `RadioGroup` item recipe: an unchecked ring
  // (border + recessed shadow) with a filled, pressed circle + inner dot shown
  // only when selected.
  radioBox: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--radius-radius-full)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "var(--skeuo-recessed)",
    boxSizing: "border-box",
    display: "flex",
    flexShrink: 0,
    height: "var(--size-xxs)",
    justifyContent: "center",
    position: "relative",
    width: "var(--size-xxs)",
  },
  radioIndicator: {
    alignItems: "center",
    backgroundColor: "var(--interactive-bg-selected)",
    backgroundImage: "var(--skeuo-surface-pressed)",
    borderColor: "var(--interactive-bg-selected)",
    borderRadius: "var(--radius-radius-full)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "var(--skeuo-pressed)",
    boxSizing: "border-box",
    display: "flex",
    height: "var(--size-xxs)",
    justifyContent: "center",
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "var(--size-xxs)",
  },
  radioDot: {
    backgroundColor: "var(--interactive-bg)",
    borderRadius: "var(--radius-radius-full)",
    // Keep in lockstep with RadioGroup's dot: proportional to the ring so
    // it stays balanced across spacing densities.
    height: "calc(var(--size-xxs) * 0.5)",
    width: "calc(var(--size-xxs) * 0.5)",
  },
  label: {
    fontSize: "var(--font-size-sm)",
    fontWeight: 600,
    paddingBlock: "var(--spacing-sm)",
    paddingInline: "var(--spacing-sm)",
  },
  separator: {
    backgroundColor: "var(--container-bg-alt)",
    height: 1,
    marginBlock: "var(--spacing-xxs)",
    marginInline: "calc(-1 * var(--spacing-xxs))",
  },
  shortcut: {
    fontSize: "var(--font-size-xs)",
    letterSpacing: "0.1em",
    marginLeft: "auto",
    opacity: 0.6,
  },
})

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    {...props}
    {...stylex.props(
      styles.itemBase,
      styles.subTrigger,
      inset && styles.inset
    )}
  >
    {children}
    <ChevronRight {...stylex.props(styles.chevron)} />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    {...props}
    {...stylex.props(styles.content, styles.subContent)}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      {...props}
      {...stylex.props(styles.content)}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ inset, tone = "default", ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    {...props}
    {...stylex.props(
      styles.itemBase,
      styles.item,
      tone === "destructive" && styles.itemDestructive,
      inset && styles.inset
    )}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    {...props}
    {...stylex.props(styles.itemBase, styles.checkboxItem)}
  >
    {children}
    <span
      aria-hidden
      {...stylex.props(
        styles.checkBox,
        checked === true && styles.checkBoxChecked
      )}
    >
      {checked === true && (
        <Check {...stylex.props(styles.checkIcon)} strokeWidth={3} />
      )}
    </span>
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    {...props}
    {...stylex.props(styles.itemBase, styles.radioItem)}
  >
    {children}
    <span aria-hidden {...stylex.props(styles.radioBox)}>
      <DropdownMenuPrimitive.ItemIndicator>
        <span {...stylex.props(styles.radioIndicator)}>
          <span {...stylex.props(styles.radioDot)} />
        </span>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    {...props}
    {...stylex.props(styles.label, inset && styles.inset)}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    {...props}
    {...stylex.props(styles.separator)}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  ...props
}: DropdownMenuShortcutProps) => {
  return (
    <span
      {...props}
      {...stylex.props(styles.shortcut)}
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
