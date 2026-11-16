import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import * as stylex from "@stylexjs/stylex"
import { toneStyles, type Tone } from "./tone-shared"

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

/** The full Inter Variable weight axis — every step is a real face. */
export type TypographyWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black"

export type TypographyFamily = "heading" | "body" | "mono"

/**
 * `inherit` takes the parent's colour, for text inside a Banner, Button or
 * link; `positive` and `destructive` are status text; `interactive` and
 * `interactive-muted` are text on a control you build yourself.
 */
export type TypographyTone = Tone

/**
 * A density-aware size: the `--font-size-*` aliases, which sit one typeset
 * step lower in compact spacing and one higher in wide.
 */
export type TypographySize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"

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
   * Size the text by the spacing density instead of a fixed step, so it
   * re-flows with `data-spacing` like the components around it. Reads the
   * `--font-size-*`, `--line-height-*` and `--letter-spacing-*` aliases
   * together. Takes precedence over `step`.
   */
  size?: TypographySize
  /**
   * Override the typeset step, keeping the variant's family and weight.
   * Swaps all three of size / line-height / letter-spacing together, so the
   * heading tracking stays matched to the size.
   */
  step?: TypographyStep
  /** Tabular figures: every digit the same width, so numbers line up in columns. */
  tabular?: boolean
  /** Foreground token. Defaults to `"default"`. */
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

  /* Weights */
  weightThin: { fontWeight: 100 },
  weightExtralight: { fontWeight: 200 },
  weightLight: { fontWeight: 300 },
  weightNormal: { fontWeight: 400 },
  weightMedium: { fontWeight: 500 },
  weightSemibold: { fontWeight: 600 },
  weightBold: { fontWeight: 700 },
  weightExtrabold: { fontWeight: 800 },
  weightBlack: { fontWeight: 900 },


  /* Alignment */
  alignStart: { textAlign: "start" },
  alignCenter: { textAlign: "center" },
  alignEnd: { textAlign: "end" },

  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  tabular: { fontVariantNumeric: "tabular-nums" },
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
  thin: styles.weightThin,
  extralight: styles.weightExtralight,
  light: styles.weightLight,
  normal: styles.weightNormal,
  medium: styles.weightMedium,
  semibold: styles.weightSemibold,
  bold: styles.weightBold,
  extrabold: styles.weightExtrabold,
  black: styles.weightBlack,
} satisfies Record<TypographyWeight, stylex.StyleXStyles>

/* Density-aware sizes — size, line height and tracking still travel together. */
const sizeStyles = stylex.create({
  xs: {
    fontSize: "var(--font-size-xs)",
    letterSpacing: "var(--letter-spacing-xs)",
    lineHeight: "var(--line-height-xs)",
  },
  sm: {
    fontSize: "var(--font-size-sm)",
    letterSpacing: "var(--letter-spacing-sm)",
    lineHeight: "var(--line-height-sm)",
  },
  base: {
    fontSize: "var(--font-size-base)",
    letterSpacing: "var(--letter-spacing-base)",
    lineHeight: "var(--line-height-base)",
  },
  lg: {
    fontSize: "var(--font-size-lg)",
    letterSpacing: "var(--letter-spacing-lg)",
    lineHeight: "var(--line-height-lg)",
  },
  xl: {
    fontSize: "var(--font-size-xl)",
    letterSpacing: "var(--letter-spacing-xl)",
    lineHeight: "var(--line-height-xl)",
  },
  "2xl": {
    fontSize: "var(--font-size-2xl)",
    letterSpacing: "var(--letter-spacing-2xl)",
    lineHeight: "var(--line-height-2xl)",
  },
  "3xl": {
    fontSize: "var(--font-size-3xl)",
    letterSpacing: "var(--letter-spacing-3xl)",
    lineHeight: "var(--line-height-3xl)",
  },
  "4xl": {
    fontSize: "var(--font-size-4xl)",
    letterSpacing: "var(--letter-spacing-4xl)",
    lineHeight: "var(--line-height-4xl)",
  },
  "5xl": {
    fontSize: "var(--font-size-5xl)",
    letterSpacing: "var(--letter-spacing-5xl)",
    lineHeight: "var(--line-height-5xl)",
  },
})

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
      size,
      step,
      tabular = false,
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
          size ? sizeStyles[size] : stepStyles[step ?? variantSteps[variant]],
          familyStyles[family ?? variantFamilies[variant]],
          weightStyles[weight ?? variantWeights[variant]],
          toneStyles[tone],
          align && alignStyles[align],
          truncate && styles.truncate,
          tabular && styles.tabular
        )}
      />
    )
  }
)
Typography.displayName = "Typography"

export { Typography }
