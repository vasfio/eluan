import * as React from "react"
import * as stylex from "@stylexjs/stylex"

export type FieldsetProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
>

export type FieldsetDescriptionProps = Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  "className" | "style"
>

const styles = stylex.create({
  root: {
    borderColor: "var(--container-border-alt)",
    borderRadius: "var(--curves-lg)",
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-lg)",
    padding: "var(--spacing-lg)",
  },
  legend: {
    color: "var(--container-fg)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    lineHeight: 1,
    marginBlockEnd: "var(--spacing-lg)",
  },
  description: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-sm)",
  },
})

// Fieldset renders as a div to avoid the native <fieldset> legend-cuts-border-line behaviour
const Fieldset = React.forwardRef<HTMLDivElement, FieldsetProps>(
  (props, ref) => <div ref={ref} {...props} {...stylex.props(styles.root)} />
)
Fieldset.displayName = "Fieldset"

const FieldsetLegend = React.forwardRef<HTMLDivElement, FieldsetProps>(
  (props, ref) => <div ref={ref} {...props} {...stylex.props(styles.legend)} />
)
FieldsetLegend.displayName = "FieldsetLegend"

const FieldsetDescription = React.forwardRef<
  HTMLParagraphElement,
  FieldsetDescriptionProps
>((props, ref) => <p ref={ref} {...props} {...stylex.props(styles.description)} />)
FieldsetDescription.displayName = "FieldsetDescription"

export { Fieldset, FieldsetLegend, FieldsetDescription }
