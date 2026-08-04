import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import * as stylex from "@stylexjs/stylex"

export type RadioGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  "className" | "style"
>

export type RadioGroupItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  "className" | "style"
>

const styles = stylex.create({
  root: {
    display: "grid",
    gap: "var(--spacing-sm)",
    "[aria-orientation=horizontal]": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "var(--spacing-lg)",
    },
  },
  item: {
    aspectRatio: "1 / 1",
    backgroundColor: "transparent",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--radius-radius-full)",
    borderStyle: "solid",
    borderWidth: 1,
    boxSizing: "border-box",
    flexShrink: 0,
    height: "var(--size-xxs)",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--size-xxs)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
    ":focus": {
      outlineStyle: "none",
    },
    ":focus-visible": {
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
    "[data-state=checked]": {
      backgroundColor: "var(--interactive-bg-selected)",
      borderColor: "var(--interactive-bg-selected)",
    },
  },
  indicator: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    transitionDuration: "150ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "100%",
    "[data-state=unchecked]": {
      opacity: 0,
    },
    "[data-state=checked]": {
      opacity: 1,
    },
  },
  dot: {
    backgroundColor: "var(--interactive-bg)",
    borderRadius: "var(--radius-radius-full)",
    // Sized proportionally to the ring (--size-xxs) so it stays balanced
    // across compact/standard/wide. The old additive spacing math collapsed
    // to ~2px in compact where --spacing-xxs is 0.
    height: "calc(var(--size-xxs) * 0.5)",
    width: "calc(var(--size-xxs) * 0.5)",
  },
})

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>((props, ref) => (
  <RadioGroupPrimitive.Root ref={ref} {...props} {...stylex.props(styles.root)} />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>((props, ref) => (
  <RadioGroupPrimitive.Item ref={ref} {...props} {...stylex.props(styles.item)}>
    <RadioGroupPrimitive.Indicator forceMount {...stylex.props(styles.indicator)}>
      <div {...stylex.props(styles.dot)} />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
