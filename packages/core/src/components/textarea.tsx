import * as React from "react"
import * as stylex from "@stylexjs/stylex"

export interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "className" | "style"> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        {...stylex.props(styles.root)}
      />
    )
  }
)
Textarea.displayName = "Textarea"

const styles = stylex.create({
  root: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "var(--skeuo-recessed)",
    display: "flex",
    fontSize: "var(--font-size-base)",
    minHeight: 80,
    paddingBlock: "var(--spacing-sm)",
    paddingInline: "var(--spacing-md)",
    width: "100%",
    "::placeholder": {
      color: "var(--interactive-fg-alt)",
    },
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: 1,
      outlineStyle: "solid",
      outlineWidth: 1,
    },
    ":disabled": {
      backgroundColor: "var(--interactive-bg-disabled)",
      color: "var(--interactive-fg-disabled)",
      cursor: "not-allowed",
    },
    "@media (min-width: 768px)": {
      fontSize: "var(--font-size-sm)",
    },
  },
})

export { Textarea }
