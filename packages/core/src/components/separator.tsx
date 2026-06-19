import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import * as stylex from "@stylexjs/stylex"

type SeparatorProps = Omit<
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
  "className" | "style"
> & {
  variant?: "default" | "toolbar" | "inline" | "command"
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { orientation = "horizontal", decorative = true, variant = "default", ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      {...props}
      {...stylex.props(
        styles.root,
        orientation === "horizontal" ? styles.horizontal : styles.vertical,
        variantStyles[variant]
      )}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

const styles = stylex.create({
  root: {
    backgroundColor: "var(--container-border-alt)",
    flexShrink: 0,
  },
  horizontal: {
    height: 1,
    width: "100%",
  },
  vertical: {
    height: "100%",
    width: 1,
  },
  toolbar: {
    height: "var(--size-sm)",
    marginInline: "var(--spacing-xxs)",
  },
  inline: {
    height: "var(--size-xxs)",
    marginInline: "var(--spacing-xxs)",
    width: 1,
  },
  command: {
    marginBlock: "var(--spacing-xxs)",
    marginInline: "calc(var(--spacing-xxs) * -1)",
  },
})

const variantStyles = {
  default: null,
  toolbar: styles.toolbar,
  inline: styles.inline,
  command: styles.command,
} satisfies Record<NonNullable<SeparatorProps["variant"]>, stylex.StyleXStyles | null>

export { Separator }
