import { Toaster as SonnerPrimitive } from "sonner"

type SonnerProps = React.ComponentProps<typeof SonnerPrimitive>

// Sonner ships with its own opinionated CSS that hardcodes font-family,
// padding, and font-sizes on its toast elements. To make toasts inherit the
// design system's tokens, we override each part with `!important` (Tailwind
// `!` prefix) — matching Sonner's higher specificity. Border-radius is also
// exposed by Sonner as a CSS variable, which we set inline.
const Sonner = ({ ...props }: SonnerProps) => {
  return (
    <SonnerPrimitive
      className="toaster group"
      style={
        {
          "--border-radius": "var(--curves-md)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:![font-family:var(--font-body)] group-[.toaster]:!rounded-[var(--curves-md)] group-[.toaster]:!p-[var(--spacing-md)] group-[.toaster]:!gap-[var(--spacing-sm)] group-[.toaster]:!text-[length:var(--font-size-sm)]",
          title:
            "group-[.toast]:![font-family:var(--font-body)] group-[.toast]:!text-[length:var(--font-size-sm)] group-[.toast]:!font-medium",
          description:
            "group-[.toast]:![font-family:var(--font-body)] group-[.toast]:!text-[length:var(--font-size-sm)] group-[.toast]:!opacity-80",
          actionButton:
            "group-[.toast]:!bg-[var(--action-primary-bg)] group-[.toast]:!text-[color:var(--action-primary-fg)] group-[.toast]:!font-medium group-[.toast]:!rounded-[var(--curves-sm)] group-[.toast]:![font-family:var(--font-body)]",
          cancelButton:
            "group-[.toast]:!bg-[var(--action-tertiary-bg)] group-[.toast]:!text-[color:var(--action-tertiary-fg)] group-[.toast]:!rounded-[var(--curves-sm)] group-[.toast]:![font-family:var(--font-body)]",
        },
      }}
      {...props}
    />
  )
}

export { Sonner, Sonner as Toaster }
