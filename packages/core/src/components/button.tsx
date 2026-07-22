import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import * as stylex from "@stylexjs/stylex"

export type ButtonVariant =
  | "default"
  | "destructive"
  | "caution"
  | "positive"
  | "outline"
  | "dashed"
  | "secondary"
  | "ghost"
  | "mutedGhost"
  | "dangerGhost"
  | "fadedGhost"
  | "input"
  | "inputMuted"
  | "link"

export type ButtonSize =
  | "default"
  | "sm"
  | "lg"
  | "icon"
  | "compactIcon"
  | "xsIcon"
  | "inlineIcon"

export type ButtonAlign = "center" | "start"
export type ButtonAttachment = "none" | "start" | "end"
export type ButtonShape = "default" | "round"
export type ButtonTextAlign = "center" | "left"

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "style"
  > {
  align?: ButtonAlign
  asChild?: boolean
  attachment?: ButtonAttachment
  fullWidth?: boolean
  shape?: ButtonShape
  textAlign?: ButtonTextAlign
  variant?: ButtonVariant
  size?: ButtonSize
}

/* Solid variants render as physical key caps (see --skeuo-* theme tokens) */
const RAISED_VARIANTS: ReadonlySet<ButtonVariant> = new Set([
  "default",
  "destructive",
  "caution",
  "positive",
  "secondary",
])

const styles = stylex.create({
  base: {
    alignItems: "center",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: "var(--curves-md)",
    boxSizing: "border-box",
    display: "inline-flex",
    fontSize: "var(--font-size-sm)",
    fontWeight: 400,
    gap: "var(--spacing-xs)",
    justifyContent: "center",
    textDecorationLine: "none",
    transitionDuration: "150ms",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    whiteSpace: "nowrap",
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    ":disabled": {
      opacity: 0.5,
      pointerEvents: "none",
    },
  },
  variantDefault: {
    backgroundColor: "var(--action-primary-bg)",
    color: "var(--action-primary-fg)",
    ":hover": {
      backgroundColor: "var(--action-primary-bg-hover)",
    },
    ":active": {
      backgroundColor: "var(--action-primary-bg-active)",
    },
  },
  /* Raised key cap: convex face (top-left lit gradient) at rest, longer
     shadow on hover, seats into the housing with a concave face when
     pressed. Flattens when disabled. */
  raisedCap: {
    backgroundImage: "var(--skeuo-surface-raised)",
    boxShadow: "var(--skeuo-raised)",
    ":hover": {
      boxShadow: "var(--skeuo-raised-hover)",
    },
    ":active": {
      backgroundImage: "var(--skeuo-surface-pressed)",
      boxShadow: "var(--skeuo-pressed)",
      transform: "translateY(0.5px)",
    },
    ":disabled": {
      backgroundImage: "none",
      boxShadow: "none",
    },
  },
  variantDestructive: {
    backgroundColor: "var(--destructive-bg)",
    color: "var(--destructive-fg)",
    ":hover": {
      backgroundColor: "var(--destructive-bg-hover)",
    },
    ":active": {
      backgroundColor: "var(--destructive-bg-active)",
    },
  },
  variantCaution: {
    backgroundColor: "var(--cautionary-bg)",
    borderColor: "transparent",
    color: "var(--cautionary-fg)",
    ":hover": {
      backgroundColor: "var(--cautionary-bg-alt)",
    },
  },
  variantPositive: {
    backgroundColor: "var(--positive-bg)",
    borderColor: "transparent",
    color: "var(--positive-fg)",
    ":hover": {
      backgroundColor: "var(--positive-bg-alt)",
    },
  },
  variantOutline: {
    backgroundColor: "transparent",
    borderColor: "var(--action-secondary-border)",
    borderWidth: 1,
    color: "var(--action-secondary-fg)",
    ":hover": {
      backgroundColor: "var(--action-secondary-bg-hover)",
    },
    ":active": {
      backgroundColor: "var(--action-secondary-bg-active)",
      color: "var(--action-secondary-fg-active)",
    },
  },
  variantDashed: {
    backgroundColor: "transparent",
    borderColor: "var(--action-secondary-border)",
    borderStyle: "dashed",
    borderWidth: 1,
    color: "var(--container-fg-alt)",
    ":hover": {
      backgroundColor: "var(--action-secondary-bg-hover)",
      color: "var(--container-fg)",
    },
    ":active": {
      backgroundColor: "var(--action-secondary-bg-active)",
    },
  },
  variantSecondary: {
    backgroundColor: "var(--backgrounds-tertiary)",
    color: "var(--foregrounds-primary)",
    ":hover": {
      backgroundColor: "var(--backgrounds-quaternary)",
    },
  },
  variantGhost: {
    backgroundColor: "transparent",
    color: "var(--foregrounds-secondary)",
    ":hover": {
      backgroundColor: "var(--backgrounds-tertiary)",
      color: "var(--foregrounds-primary)",
    },
  },
  variantMutedGhost: {
    backgroundColor: "transparent",
    color: "var(--container-fg-alt)",
    ":hover": {
      backgroundColor: "var(--backgrounds-tertiary)",
      color: "var(--container-fg)",
    },
  },
  variantDangerGhost: {
    backgroundColor: "transparent",
    color: "var(--foregrounds-secondary)",
    ":hover": {
      backgroundColor: "var(--destructive-bg-alt)",
      color: "var(--destructive-fg)",
    },
  },
  variantFadedGhost: {
    backgroundColor: "transparent",
    color: "var(--foregrounds-secondary)",
    opacity: 0.6,
    ":hover": {
      backgroundColor: "var(--backgrounds-tertiary)",
      color: "var(--foregrounds-primary)",
      opacity: 1,
    },
  },
  variantInput: {
    backgroundColor: "transparent",
    borderColor: "var(--interactive-border-alt)",
    borderWidth: 1,
    color: "var(--interactive-fg)",
    fontWeight: 400,
    ":hover": {
      backgroundColor: "var(--backgrounds-tertiary)",
    },
    ":disabled": {
      backgroundColor: "var(--interactive-bg-disabled)",
      borderColor: "var(--interactive-border-disabled)",
      color: "var(--interactive-fg-disabled)",
      opacity: 1,
    },
  },
  variantInputMuted: {
    backgroundColor: "transparent",
    borderColor: "var(--interactive-border-alt)",
    borderWidth: 1,
    color: "var(--interactive-fg-alt)",
    fontWeight: 400,
    ":hover": {
      backgroundColor: "var(--backgrounds-tertiary)",
    },
    ":disabled": {
      backgroundColor: "var(--interactive-bg-disabled)",
      borderColor: "var(--interactive-border-disabled)",
      color: "var(--interactive-fg-disabled)",
      opacity: 1,
    },
  },
  variantLink: {
    backgroundColor: "transparent",
    boxShadow: "none",
    color: "var(--action-primary-bg)",
    height: "auto",
    padding: 0,
    textUnderlineOffset: "var(--spacing-xs)",
    ":hover": {
      textDecorationLine: "underline",
    },
  },
  sizeDefault: {
    height: "var(--size-lg)",
    paddingBlock: "var(--spacing-sm)",
    paddingInline: "var(--spacing-md)",
  },
  sizeSm: {
    borderRadius: "var(--curves-sm)",
    fontSize: "var(--font-size-xs)",
    height: "var(--size-md)",
    paddingInline: "var(--spacing-sm)",
  },
  sizeLg: {
    borderRadius: "var(--curves-md)",
    fontSize: "var(--font-size-base)",
    height: "var(--size-xl)",
    paddingInline: "var(--spacing-xl)",
  },
  sizeIcon: {
    height: "var(--size-lg)",
    width: "var(--size-lg)",
  },
  sizeCompactIcon: {
    height: "var(--size-md)",
    width: "var(--size-md)",
  },
  sizeXsIcon: {
    height: "calc(var(--size-md) - var(--spacing-xs))",
    padding: 0,
    width: "calc(var(--size-md) - var(--spacing-xs))",
  },
  sizeInlineIcon: {
    height: "auto",
    padding: "var(--spacing-xxs)",
    width: "auto",
  },
  alignStart: {
    justifyContent: "flex-start",
  },
  fullWidth: {
    width: "100%",
  },
  round: {
    borderRadius: "var(--radius-radius-full)",
  },
  textLeft: {
    textAlign: "left",
  },
  attachmentStart: {
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  attachmentEnd: {
    borderLeftColor: "var(--container-border)",
    borderLeftWidth: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingInline: "var(--spacing-xs)",
  },
})

const variantStyles = {
  default: styles.variantDefault,
  destructive: styles.variantDestructive,
  caution: styles.variantCaution,
  positive: styles.variantPositive,
  outline: styles.variantOutline,
  dashed: styles.variantDashed,
  secondary: styles.variantSecondary,
  ghost: styles.variantGhost,
  mutedGhost: styles.variantMutedGhost,
  dangerGhost: styles.variantDangerGhost,
  fadedGhost: styles.variantFadedGhost,
  input: styles.variantInput,
  inputMuted: styles.variantInputMuted,
  link: styles.variantLink,
} satisfies Record<ButtonVariant, stylex.StyleXStyles>

const sizeStyles = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
  icon: styles.sizeIcon,
  compactIcon: styles.sizeCompactIcon,
  xsIcon: styles.sizeXsIcon,
  inlineIcon: styles.sizeInlineIcon,
} satisfies Record<ButtonSize, stylex.StyleXStyles>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      align = "center",
      attachment = "none",
      variant = "default",
      size = "default",
      asChild = false,
      fullWidth = false,
      shape = "default",
      textAlign = "center",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        {...props}
        {...stylex.props(
          styles.base,
          sizeStyles[size],
          variantStyles[variant],
          RAISED_VARIANTS.has(variant) && styles.raisedCap,
          align === "start" && styles.alignStart,
          fullWidth && styles.fullWidth,
          shape === "round" && styles.round,
          textAlign === "left" && styles.textLeft,
          attachment === "start" && styles.attachmentStart,
          attachment === "end" && styles.attachmentEnd
        )}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
