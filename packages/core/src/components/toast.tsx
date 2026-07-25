import { Toaster as SonnerPrimitive } from "sonner"

export type ToastProps = React.ComponentProps<typeof SonnerPrimitive>

// Sonner ships with opinionated CSS for font, spacing, and sizing. The global
// stylesheet owns these class hooks so toasts inherit Eluan tokens.
const Toast = ({ ...props }: ToastProps) => {
  return (
    <SonnerPrimitive
      className="eluan-toaster"
      style={
        {
          "--border-radius": "var(--curves-md)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "eluan-toast",
          title: "eluan-toast-title",
          description: "eluan-toast-description",
          actionButton: "eluan-toast-action",
          cancelButton: "eluan-toast-cancel",
        },
      }}
      {...props}
    />
  )
}

export { Toast }
