import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import * as stylex from "@stylexjs/stylex"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

export type SelectTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
  "className" | "style"
> & {
  variant?: "default" | "calendarCaption" | "countryCode"
}

export type SelectContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
  "className" | "style"
> & {
  layout?: "default" | "auto" | "country"
}

export type SelectLabelProps = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>,
  "className" | "style"
>

export type SelectItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
  "className" | "style"
> & {
  size?: "default" | "sm"
}

export type SelectSeparatorProps = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>,
  "className" | "style"
>

export type SelectScrollButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>,
  "className" | "style"
>

const styles = stylex.create({
  trigger: {
    alignItems: "center",
    backgroundColor: "var(--interactive-bg)",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "var(--skeuo-recessed)",
    boxSizing: "border-box",
    color: "var(--interactive-fg)",
    display: "flex",
    fontSize: "var(--font-size-sm)",
    height: "var(--size-lg)",
    justifyContent: "space-between",
    paddingBlock: "var(--spacing-sm)",
    paddingInline: "var(--spacing-md)",
    width: "100%",
    "::placeholder": {
      color: "var(--interactive-fg-alt)",
    },
    ":focus": {
      outlineStyle: "none",
    },
    ":focus-visible": {
      borderColor: "var(--interactive-border)",
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    ":disabled": {
      backgroundColor: "var(--interactive-bg-disabled)",
      color: "var(--interactive-fg-disabled)",
      cursor: "not-allowed",
    },
  },
  triggerCalendarCaption: {
    borderColor: "transparent",
    boxShadow: "none",
    flex: 1,
    fontSize: "var(--font-size-xs)",
    height: "var(--size-sm)",
    paddingInline: "var(--spacing-xs)",
    ":focus-visible": {
      borderColor: "transparent",
      outlineStyle: "none",
    },
  },
  triggerCountryCode: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    flexShrink: 0,
    gap: "var(--spacing-xxs)",
    minWidth: "calc(var(--size-xl) + var(--spacing-lg))",
    width: "auto",
  },
  triggerIcon: {
    height: "var(--size-xxs)",
    opacity: 0.5,
    width: "var(--size-xxs)",
  },
  scrollButton: {
    alignItems: "center",
    cursor: "default",
    display: "flex",
    justifyContent: "center",
    paddingBlock: "var(--spacing-xxs)",
  },
  scrollIcon: {
    height: "var(--size-xxs)",
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
    maxHeight: "24rem",
    minWidth: "8rem",
    overflow: "hidden",
    position: "relative",
    zIndex: 50,
  },
  contentAuto: {
    minWidth: 0,
    width: "auto",
  },
  contentCountry: {
    minWidth: "17.5rem",
  },
  contentPopper: {
    "[data-side=bottom]": {
      transform: "translateY(var(--spacing-xxs))",
    },
    "[data-side=left]": {
      transform: "translateX(calc(var(--spacing-xxs) * -1))",
    },
    "[data-side=right]": {
      transform: "translateX(var(--spacing-xxs))",
    },
    "[data-side=top]": {
      transform: "translateY(calc(var(--spacing-xxs) * -1))",
    },
  },
  viewport: {
    padding: "var(--spacing-xxs)",
  },
  viewportPopper: {
    height: "var(--radix-select-trigger-height)",
    minWidth: "var(--radix-select-trigger-width)",
    width: "100%",
  },
  label: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
    fontWeight: 400,
    letterSpacing: "0.04em",
    paddingBlock: "var(--spacing-xs)",
    paddingLeft: "var(--spacing-md)",
    paddingRight: "var(--spacing-sm)",
    textTransform: "uppercase",
  },
  item: {
    alignItems: "center",
    borderRadius: "var(--curves-sm)",
    cursor: "default",
    display: "flex",
    fontSize: "var(--font-size-sm)",
    outlineStyle: "none",
    paddingBlock: "var(--spacing-xs)",
    paddingLeft: "var(--spacing-md)",
    paddingRight: "calc(var(--size-xs) + var(--spacing-lg))",
    position: "relative",
    userSelect: "none",
    width: "100%",
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
  itemSm: {
    fontSize: "var(--font-size-xs)",
  },
  itemIndicator: {
    alignItems: "center",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    right: "var(--spacing-sm)",
    top: 0,
    width: "var(--size-xs)",
  },
  separator: {
    backgroundColor: "var(--container-bg-alt)",
    height: 1,
    marginBlock: "var(--spacing-xxs)",
    marginInline: "calc(var(--spacing-xxs) * -1)",
  },
})

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ children, variant = "default", ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    {...props}
    {...stylex.props(
      styles.trigger,
      variant === "calendarCaption" && styles.triggerCalendarCaption,
      variant === "countryCode" && styles.triggerCountryCode
    )}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown aria-hidden="true" {...stylex.props(styles.triggerIcon)} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  SelectScrollButtonProps
>(({ ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    {...props}
    {...stylex.props(styles.scrollButton)}
  >
    <ChevronUp aria-hidden="true" {...stylex.props(styles.scrollIcon)} />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  SelectScrollButtonProps
>(({ ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    {...props}
    {...stylex.props(styles.scrollButton)}
  >
    <ChevronDown aria-hidden="true" {...stylex.props(styles.scrollIcon)} />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ children, layout = "default", position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      {...props}
      {...stylex.props(
        styles.content,
        position === "popper" && styles.contentPopper,
        layout === "auto" && styles.contentAuto,
        layout === "country" && styles.contentCountry
      )}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        {...stylex.props(styles.viewport, position === "popper" && styles.viewportPopper)}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    {...props}
    {...stylex.props(styles.label)}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ children, size = "default", ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    {...props}
    {...stylex.props(styles.item, size === "sm" && styles.itemSm)}
  >
    <span {...stylex.props(styles.itemIndicator)}>
      <SelectPrimitive.ItemIndicator>
        <Check aria-hidden="true" {...stylex.props(styles.scrollIcon)} />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    {...props}
    {...stylex.props(styles.separator)}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

export type SelectProps = React.ComponentProps<typeof Select>
