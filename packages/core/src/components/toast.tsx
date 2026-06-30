import { Toaster as SonnerPrimitive } from "sonner"

type ToastProps = React.ComponentProps<typeof SonnerPrimitive>

// Sonner ships with opinionated CSS for font, spacing, and sizing. The global
// stylesheet owns these class hooks so toasts inherit Ragnar tokens.
const Toast = ({ ...props }: ToastProps) => {
  return (
    <SonnerPrimitive
      className="ragnar-toaster"
      style={
        {
          "--border-radius": "var(--curves-md)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "ragnar-toast",
          title: "ragnar-toast-title",
          description: "ragnar-toast-description",
          actionButton: "ragnar-toast-action",
          cancelButton: "ragnar-toast-cancel",
        },
      }}
      {...props}
    />
  )
}

export { Toast }
