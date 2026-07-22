import * as React from "react"
import * as stylex from "@stylexjs/stylex"

export interface LabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "className" | "style"> {
  disabled?: boolean
  hint?: string
  optional?: boolean
  required?: boolean
}

type FormDescriptionProps = Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  "className" | "style"
>

interface FormMessageProps extends FormDescriptionProps {
  error?: boolean
}

const styles = stylex.create({
  root: {
    alignItems: "baseline",
    display: "flex",
    gap: "var(--spacing-sm)",
  },
  label: {
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    lineHeight: 1,
  },
  labelDisabled: {
    color: "var(--interactive-fg-disabled)",
    cursor: "not-allowed",
  },
  required: {
    "::after": {
      color: "var(--destructive-fg)",
      content: '"*"',
      marginLeft: "var(--spacing-xxs)",
    },
  },
  meta: {
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-xs)",
  },
  description: {
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-sm)",
  },
  message: {
    fontSize: "var(--font-size-sm)",
  },
  error: {
    color: "var(--destructive-fg)",
  },
  neutral: {
    color: "var(--interactive-fg-alt)",
  },
})

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required = false, optional, hint, disabled = false, children, ...props }, ref) => (
    <div {...stylex.props(styles.root)}>
      <label
        ref={ref}
        {...props}
        {...stylex.props(
          styles.label,
          required && styles.required,
          disabled && styles.labelDisabled
        )}
      >
        {children}
      </label>
      {optional && <span {...stylex.props(styles.meta)}>(optional)</span>}
      {hint && <span {...stylex.props(styles.meta)}>{hint}</span>}
    </div>
  )
)
Label.displayName = "Label"

/** @deprecated Use `Label` instead */
const FormLabel = Label

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  (props, ref) => <p ref={ref} {...props} {...stylex.props(styles.description)} />
)
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ error = true, ...props }, ref) => (
    <p
      ref={ref}
      {...props}
      {...stylex.props(styles.message, error ? styles.error : styles.neutral)}
    />
  )
)
FormMessage.displayName = "FormMessage"

export { Label, FormLabel, FormDescription, FormMessage }
