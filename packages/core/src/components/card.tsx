import * as React from "react"
import * as stylex from "@stylexjs/stylex"

export type CardElevation = "none" | "sm" | "md" | "lg"

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Makes the card interactive — adds hover elevation + cursor pointer */
  clickable?: boolean
  /** Elevation level controls shadow depth */
  elevation?: CardElevation
}

export type CardSectionProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
>

const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
}

const styles = stylex.create({
  root: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-lg)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--container-fg)",
  },
  elevationNone: {
    boxShadow: "none",
  },
  elevationSm: {
    boxShadow: shadows.sm,
  },
  elevationMd: {
    boxShadow: shadows.md,
  },
  elevationLg: {
    boxShadow: shadows.lg,
  },
  clickable: {
    cursor: "pointer",
    transitionDuration: "200ms",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      boxShadow: shadows.xl,
      transform: "translateY(-1px)",
    },
    ":active": {
      boxShadow: shadows.md,
      transform: "translateY(0)",
    },
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "calc(var(--spacing-xs) + var(--spacing-xxs))",
    padding: "var(--spacing-2xl)",
  },
  title: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--font-size-xl)",
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: 1.375,
  },
  description: {
    color: "var(--foregrounds-tertiary)",
    fontSize: "var(--font-size-sm)",
    lineHeight: 1.625,
  },
  content: {
    paddingBlockEnd: "var(--spacing-2xl)",
    paddingInline: "var(--spacing-2xl)",
  },
  footer: {
    alignItems: "center",
    display: "flex",
    paddingBlockEnd: "var(--spacing-2xl)",
    paddingInline: "var(--spacing-2xl)",
  },
})

const elevationStyles = {
  none: styles.elevationNone,
  sm: styles.elevationSm,
  md: styles.elevationMd,
  lg: styles.elevationLg,
} satisfies Record<CardElevation, stylex.StyleXStyles>

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ clickable = false, elevation = "sm", ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(
        styles.root,
        elevationStyles[elevation],
        clickable && styles.clickable
      )}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, CardSectionProps>(
  (props, ref) => <div ref={ref} {...props} {...stylex.props(styles.header)} />
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, CardSectionProps>(
  (props, ref) => <div ref={ref} {...props} {...stylex.props(styles.title)} />
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, CardSectionProps>(
  (props, ref) => <div ref={ref} {...props} {...stylex.props(styles.description)} />
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, CardSectionProps>(
  (props, ref) => <div ref={ref} {...props} {...stylex.props(styles.content)} />
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, CardSectionProps>(
  (props, ref) => <div ref={ref} {...props} {...stylex.props(styles.footer)} />
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
