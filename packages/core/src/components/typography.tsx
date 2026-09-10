import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import * as stylex from "@stylexjs/stylex"

export type TypographyVariant =
  | "display"
  | "title"
  | "heading"
  | "subheading"
  | "lead"
  | "body"
  | "label"
  | "caption"

/**
 * A rung on the fluid typeset (typeset.css). Names mirror the CSS token
 * suffixes: `"5"` → `--font-size-step-5`, `"neg2"` → `--font-size-step-neg2`.
 */
export type TypographyStep =
  | "6"
  | "5"
  | "4"
  | "3"
  | "2"
  | "1"
  | "0"
  | "neg1"
  | "neg2"
  | "neg3"

export type TypographyElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "blockquote"
  | "figcaption"

/** Only up to medium — no face above 500 is loaded, so bolder would faux-bold. */
export type TypographyWeight = "normal" | "medium"

export type TypographyFamily = "heading" | "body" | "mono"

export type TypographyTone = "default" | "muted" | "inverse"

export type TypographyAlign = "start" | "center" | "end"

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "style"> {
  /** Render the child element instead of the default one (Radix Slot). */
  asChild?: boolean
  /** Text alignment. */
  align?: TypographyAlign
  /** Element override. Defaults per variant — see `defaultElements`. */
  as?: TypographyElement
  /** Font family override; each variant already picks a sensible one. */
  family?: TypographyFamily
  /**
   * Override the typeset step, keeping the variant's family and weight.
   * Swaps all three of size / line-height / letter-spacing together, so the
   * heading tracking stays matched to the size.
   */
  step?: TypographyStep
  /** Foreground token. */
  tone?: TypographyTone
  /** Single-line ellipsis. */
  truncate?: boolean
  variant?: TypographyVariant
  weight?: TypographyWeight
}

const styles = stylex.create({
  base: {
    margin: 0,
    textWrap: "pretty",
  },

  /* ----------------------------------------
   * Typeset steps — size, line height and tracking always travel together.
   * ---------------------------------------- */
  step6: {
    fontSize: "var(--font-size-step-6)",
    letterSpacing: "var(--letter-spacing-step-6)",
    lineHeight: "var(--line-height-step-6)",
  },
  step5: {
    fontSize: "var(--font-size-step-5)",
    letterSpacing: "var(--letter-spacing-step-5)",
    lineHeight: "var(--line-height-step-5)",
  },
  step4: {
    fontSize: "var(--font-size-step-4)",
    letterSpacing: "var(--letter-spacing-step-4)",
    lineHeight: "var(--line-height-step-4)",
  },
  step3: {
    fontSize: "var(--font-size-step-3)",
    letterSpacing: "var(--letter-spacing-step-3)",
    lineHeight: "var(--line-height-step-3)",
  },
  step2: {
    fontSize: "var(--font-size-step-2)",
    letterSpacing: "var(--letter-spacing-step-2)",
    lineHeight: "var(--line-height-step-2)",
  },
  step1: {
    fontSize: "var(--font-size-step-1)",
    letterSpacing: "var(--letter-spacing-step-1)",
    lineHeight: "var(--line-height-step-1)",
  },
  step0: {
    fontSize: "var(--font-size-step-0)",
    letterSpacing: "var(--letter-spacing-step-0)",
    lineHeight: "var(--line-height-step-0)",
  },
  stepNeg1: {
    fontSize: "var(--font-size-step-neg1)",
    letterSpacing: "var(--letter-spacing-step-neg1)",
    lineHeight: "var(--line-height-step-neg1)",
  },
  stepNeg2: {
    fontSize: "var(--font-size-step-neg2)",
    letterSpacing: "var(--letter-spacing-step-neg2)",
    lineHeight: "var(--line-height-step-neg2)",
  },
  stepNeg3: {
    fontSize: "var(--font-size-step-neg3)",
    letterSpacing: "var(--letter-spacing-step-neg3)",
    lineHeight: "var(--line-height-step-neg3)",
  },

  /* Families */
  familyHeading: { fontFamily: "var(--font-heading)" },
  familyBody: { fontFamily: "var(--font-body)" },
  familyMono: { fontFamily: "var(--font-mono)" },

  /* Weights — capped at medium; nothing heavier is loaded. */
  weightNormal: { fontWeight: 400 },
  weightMedium: { fontWeight: 500 },

  /* Tones */
  toneDefault: { color: "var(--container-fg)" },
  toneMuted: { color: "var(--container-fg-alt)" },
  toneInverse: { color: "var(--container-fg-inverse)" },

  /* Alignment */
  alignStart: { textAlign: "start" },
  alignCenter: { textAlign: "center" },
  alignEnd: { textAlign: "end" },

  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
})

const stepStyles = {
  "6": styles.step6,
  "5": styles.step5,
  "4": styles.step4,
  "3": styles.step3,
  "2": styles.step2,
  "1": styles.step1,
  "0": styles.step0,
  neg1: styles.stepNeg1,
  neg2: styles.stepNeg2,
  neg3: styles.stepNeg3,
} satisfies Record<TypographyStep, stylex.StyleXStyles>

const familyStyles = {
  heading: styles.familyHeading,
  body: styles.familyBody,
  mono: styles.familyMono,
} satisfies Record<TypographyFamily, stylex.StyleXStyles>

const weightStyles = {
  normal: styles.weightNormal,
  medium: styles.weightMedium,
} satisfies Record<TypographyWeight, stylex.StyleXStyles>

const toneStyles = {
  default: styles.toneDefault,
  muted: styles.toneMuted,
  inverse: styles.toneInverse,
} satisfies Record<TypographyTone, stylex.StyleXStyles>

const alignStyles = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
} satisfies Record<TypographyAlign, stylex.StyleXStyles>

/** Each variant's typeset step. `step` overrides this. */
const variantSteps = {
  display: "5",
  title: "4",
  heading: "3",
  subheading: "2",
  lead: "1",
  body: "0",
  label: "neg1",
  caption: "neg2",
} satisfies Record<TypographyVariant, TypographyStep>

const variantFamilies = {
  display: "heading",
  title: "heading",
  heading: "heading",
  subheading: "heading",
  lead: "body",
  body: "body",
  label: "body",
  caption: "body",
} satisfies Record<TypographyVariant, TypographyFamily>

const variantWeights = {
  display: "medium",
  title: "medium",
  heading: "medium",
  subheading: "medium",
  lead: "normal",
  body: "normal",
  label: "medium",
  caption: "normal",
} satisfies Record<TypographyVariant, TypographyWeight>

/** Semantics the variant implies; `as` overrides, `asChild` bypasses. */
const defaultElements = {
  display: "h1",
  title: "h2",
  heading: "h3",
  subheading: "h4",
  lead: "p",
  body: "p",
  label: "span",
  caption: "span",
} satisfies Record<TypographyVariant, TypographyElement>

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      align,
      as,
      asChild = false,
      family,
      step,
      tone = "default",
      truncate = false,
      variant = "body",
      weight,
      ...props
    },
    ref
  ) => {
    // Polymorphic: TS would otherwise intersect every element's ref type, so
    // the tag is widened here. The public `as` union still constrains callers.
    const Comp = (asChild ? Slot : (as ?? defaultElements[variant])) as React.ElementType

    // Styling-closed: className/style are already typed out of the API, and
    // dropped here so a cast can't smuggle them past the token system either.
    const { className: _className, style: _style, ...rest } = props as TypographyProps & {
      className?: string
      style?: React.CSSProperties
    }

    return (
      <Comp
        ref={ref}
        {...rest}
        {...stylex.props(
          styles.base,
          stepStyles[step ?? variantSteps[variant]],
          familyStyles[family ?? variantFamilies[variant]],
          weightStyles[weight ?? variantWeights[variant]],
          toneStyles[tone],
          align && alignStyles[align],
          truncate && styles.truncate
        )}
      />
    )
  }
)
Typography.displayName = "Typography"

export { Typography }
