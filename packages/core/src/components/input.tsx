"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Eye, EyeOff, Search, Mail, Lock, Phone, Link } from "lucide-react"

const typeIcons: Record<string, React.ElementType> = {
  search: Search,
  email: Mail,
  password: Lock,
  tel: Phone,
  url: Link,
}

export type InputValidationTone = "none" | "positive" | "destructive"
export type InputTextStyle = "default" | "mono"
export type InputSize = "default" | "lg"
export type InputAttachment = "none" | "start" | "middle"
export type InputTextAlign = "left" | "center"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "size" | "style"> {
  /** Show a leading icon. Overrides the auto-icon for the input type. */
  icon?: React.ReactNode
  /** Show a trailing element (e.g. a button) */
  trailing?: React.ReactNode
  attachment?: InputAttachment
  size?: InputSize
  textAlign?: InputTextAlign
  textStyle?: InputTextStyle
  validationTone?: InputValidationTone
}

const styles = stylex.create({
  root: {
    alignItems: "center",
    display: "flex",
    position: "relative",
    width: "100%",
  },
  iconWrap: {
    alignItems: "center",
    color: "var(--interactive-fg-alt)",
    display: "flex",
    left: "var(--spacing-md)",
    pointerEvents: "none",
    position: "absolute",
  },
  icon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  input: {
    backgroundColor: "var(--interactive-bg)",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "var(--skeuo-recessed)",
    color: "var(--interactive-fg)",
    display: "flex",
    fontSize: "var(--font-size-sm)",
    height: "var(--size-lg)",
    paddingBlock: "var(--spacing-sm)",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "100%",
    "::-webkit-search-cancel-button": {
      display: "none",
    },
    "::-webkit-search-decoration": {
      display: "none",
    },
    "::placeholder": {
      color: "var(--interactive-fg-alt)",
    },
    "::file-selector-button": {
      backgroundColor: "transparent",
      borderWidth: 0,
      color: "var(--interactive-fg)",
      fontSize: "var(--font-size-sm)",
      fontWeight: 500,
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
    "[aria-invalid=true]": {
      borderColor: "var(--destructive-border)",
    },
  },
  inputInvalidFocus: {
    ":focus-visible": {
      borderColor: "var(--destructive-border)",
      outlineColor: "var(--destructive-border)",
    },
  },
  inputPositive: {
    borderColor: "var(--positive-fg)",
    ":focus-visible": {
      outlineColor: "var(--positive-bg-alt)",
    },
  },
  inputDestructive: {
    borderColor: "var(--destructive-fg)",
    ":focus-visible": {
      outlineColor: "var(--destructive-bg-alt)",
    },
  },
  textMono: {
    fontFamily: "var(--font-mono)",
  },
  sizeLg: {
    height: "var(--size-xl)",
  },
  attachmentStart: {
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  attachmentMiddle: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
  },
  textCenter: {
    textAlign: "center",
  },
  padLeading: {
    paddingLeft: "calc(var(--spacing-md) + var(--size-xxs) + var(--spacing-sm))",
  },
  padNoLeading: {
    paddingLeft: "var(--spacing-md)",
  },
  padTrailing: {
    paddingRight: "calc(var(--spacing-md) + var(--size-sm) + var(--spacing-sm))",
  },
  padNoTrailing: {
    paddingRight: "var(--spacing-md)",
  },
  trailingButton: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--curves-sm)",
    color: "var(--interactive-fg-alt)",
    cursor: "pointer",
    display: "inline-flex",
    height: "var(--size-sm)",
    justifyContent: "center",
    minWidth: "var(--size-sm)",
    padding: 0,
    position: "absolute",
    right: "var(--spacing-md)",
    transitionDuration: "150ms",
    transitionProperty: "background-color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  trailingWrap: {
    alignItems: "center",
    display: "flex",
    position: "absolute",
    right: "var(--spacing-md)",
  },
})

const validationStyles = {
  none: null,
  positive: styles.inputPositive,
  destructive: styles.inputDestructive,
} satisfies Record<InputValidationTone, stylex.StyleXStyles | null>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      icon,
      trailing,
      attachment = "none",
      size = "default",
      textAlign = "left",
      textStyle = "default",
      validationTone = "none",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const isPassword = type === "password"
    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type

    const AutoIcon = type ? typeIcons[type] : undefined
    const leadingIcon = icon ?? (AutoIcon ? <AutoIcon aria-hidden="true" {...stylex.props(styles.icon)} /> : null)
    const hasLeading = !!leadingIcon
    const hasTrailing = !!trailing || isPassword

    return (
      <div {...stylex.props(styles.root)}>
        {hasLeading && (
          <span {...stylex.props(styles.iconWrap)}>{leadingIcon}</span>
        )}
        <input
          type={resolvedType}
          ref={ref}
          {...props}
          {...stylex.props(
            styles.input,
            props["aria-invalid"] === true && styles.inputInvalidFocus,
            validationStyles[validationTone],
            textStyle === "mono" && styles.textMono,
            size === "lg" && styles.sizeLg,
            attachment === "start" && styles.attachmentStart,
            attachment === "middle" && styles.attachmentMiddle,
            textAlign === "center" && styles.textCenter,
            hasLeading ? styles.padLeading : styles.padNoLeading,
            hasTrailing ? styles.padTrailing : styles.padNoTrailing
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            {...stylex.props(styles.trailingButton)}
          >
            {showPassword ? (
              <EyeOff aria-hidden="true" {...stylex.props(styles.icon)} />
            ) : (
              <Eye aria-hidden="true" {...stylex.props(styles.icon)} />
            )}
          </button>
        )}
        {!isPassword && trailing && (
          <span {...stylex.props(styles.trailingWrap)}>{trailing}</span>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
