import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@vasf/ragnar-core"
import { Input } from "@vasf/ragnar-core"

const emailFormVariants = cva(
  "flex w-full gap-[var(--spacing-sm)]",
  {
    variants: {
      layout: {
        inline: "flex-row items-center",
        stacked: "flex-col",
      },
      size: {
        sm: "max-w-sm",
        default: "max-w-md",
        lg: "max-w-lg",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      layout: "inline",
      size: "default",
    },
  }
)

export interface EmailFormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit">,
    VariantProps<typeof emailFormVariants> {
  onSubmit?: (email: string) => void | Promise<void>
  placeholder?: string
  buttonText?: string
  loading?: boolean
  disabled?: boolean
  helperText?: string
  successMessage?: string
  errorMessage?: string
}

const EmailForm = React.forwardRef<HTMLFormElement, EmailFormProps>(
  (
    {
      className,
      layout,
      size,
      onSubmit,
      placeholder = "Enter your email",
      buttonText = "Subscribe",
      loading = false,
      disabled = false,
      helperText,
      successMessage,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = React.useState("")
    const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!email || !onSubmit) return

      setStatus("loading")
      try {
        await onSubmit(email)
        setStatus("success")
        setEmail("")
      } catch {
        setStatus("error")
      }
    }

    const isLoading = loading || status === "loading"
    const isDisabled = disabled || isLoading

    return (
      <div className={cn("w-full", size !== "full" && emailFormVariants({ size }))}>
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className={cn(emailFormVariants({ layout, size: "full" }), className)}
          {...props}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={isDisabled}
            required
            className={cn("h-[var(--size-xl)]", layout === "inline" && "flex-1")}
          />
          <Button
            type="submit"
            disabled={isDisabled}
            className={cn("h-[var(--size-xl)]", layout === "stacked" && "w-full")}
          >
            {isLoading ? (
              <span className="flex items-center gap-[var(--spacing-sm)]">
                <svg
                  className="h-[var(--size-xxs)] w-[var(--size-xxs)] animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              buttonText
            )}
          </Button>
        </form>
        {helperText && status === "idle" && (
          <p className="mt-[var(--spacing-sm)] text-[var(--font-size-sm)] text-[var(--container-fg-alt)]">{helperText}</p>
        )}
        {status === "success" && successMessage && (
          <p className="mt-[var(--spacing-sm)] text-[var(--font-size-sm)] text-[var(--positive-fg)]">
            {successMessage}
          </p>
        )}
        {status === "error" && errorMessage && (
          <p className="mt-[var(--spacing-sm)] text-[var(--font-size-sm)] text-[var(--destructive-fg)]">{errorMessage}</p>
        )}
      </div>
    )
  }
)
EmailForm.displayName = "EmailForm"

export { EmailForm }
