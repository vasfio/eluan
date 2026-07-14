import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import * as stylex from "@stylexjs/stylex"
import { Check } from "lucide-react"

type CheckboxProps = Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  "className" | "style"
>

const styles = stylex.create({
  root: {
    backgroundColor: "transparent",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-xs)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "var(--skeuo-recessed)",
    boxSizing: "border-box",
    flexShrink: 0,
    height: "var(--size-xxs)",
    minWidth: "var(--size-xxs)",
    position: "relative",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--size-xxs)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
      borderColor: "var(--interactive-border-alt)",
      color: "var(--interactive-fg-alt)",
    },
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    ":disabled": {
      backgroundColor: "var(--interactive-bg-disabled)",
      borderColor: "var(--interactive-border-disabled)",
      cursor: "not-allowed",
    },
    "[data-state=checked]": {
      backgroundColor: "var(--interactive-bg-selected)",
      backgroundImage: "var(--skeuo-surface-pressed)",
      borderColor: "var(--interactive-bg-selected)",
      boxShadow: "var(--skeuo-pressed)",
      color: "var(--interactive-fg-selected)",
    },
  },
  indicator: {
    alignItems: "center",
    color: "currentColor",
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
  icon: {
    height: "var(--spacing-md)",
    position: "absolute",
    width: "var(--spacing-md)",
  },
})

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>((props, ref) => (
  <CheckboxPrimitive.Root ref={ref} {...props} {...stylex.props(styles.root)}>
    <CheckboxPrimitive.Indicator forceMount {...stylex.props(styles.indicator)}>
      <Check {...stylex.props(styles.icon)} strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
