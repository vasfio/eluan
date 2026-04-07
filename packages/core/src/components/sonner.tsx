import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="system"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--container-bg-alt)] group-[.toaster]:text-[var(--container-fg)] group-[.toaster]:border-[var(--container-border-alt)] group-[.toaster]:shadow-lg",
          description:
            "group-[.toast]:text-[var(--container-fg-alt)] group-[.toast]:text-sm",
          actionButton:
            "group-[.toast]:bg-[var(--action-primary-bg)] group-[.toast]:text-[var(--action-primary-fg)] group-[.toast]:font-medium",
          cancelButton:
            "group-[.toast]:bg-[var(--action-tertiary-bg)] group-[.toast]:text-[var(--action-tertiary-fg)]",
          error:
            "group-[.toaster]:bg-[var(--destructive-bg)] group-[.toaster]:text-[var(--destructive-fg)] group-[.toaster]:border-[var(--destructive-border)]",
          success:
            "group-[.toaster]:bg-[var(--positive-bg)] group-[.toaster]:text-[var(--positive-fg)] group-[.toaster]:border-[var(--positive-border)]",
          warning:
            "group-[.toaster]:bg-[var(--cautionary-bg)] group-[.toaster]:text-[var(--cautionary-fg)] group-[.toaster]:border-[var(--cautionary-border)]",
          info:
            "group-[.toaster]:bg-[var(--informative-bg)] group-[.toaster]:text-[var(--informative-fg)] group-[.toaster]:border-[var(--informative-border)]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
