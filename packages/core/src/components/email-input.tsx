import * as React from "react"
import { Mail, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface EmailInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showValidation?: boolean
  onValidationChange?: (isValid: boolean) => void
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  (
    { className, showValidation = false, onValidationChange, onChange, ...props },
    ref
  ) => {
    const [isValid, setIsValid] = React.useState<boolean | null>(null)
    const [isTouched, setIsTouched] = React.useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (value) {
        const valid = emailRegex.test(value)
        setIsValid(valid)
        onValidationChange?.(valid)
      } else {
        setIsValid(null)
        onValidationChange?.(false)
      }
      onChange?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsTouched(true)
      props.onBlur?.(e)
    }

    const showStatus = showValidation && isTouched && isValid !== null

    return (
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--interactive-fg-alt)]" />
        <input
          type="email"
          className={cn(
            "flex h-10 w-full rounded-[var(--curves-md)] border border-[var(--interactive-border-alt)] bg-[var(--interactive-bg)] pl-10 pr-[var(--spacing-xl)] py-[var(--spacing-sm)] text-sm ring-offset-background placeholder:text-[var(--interactive-fg-alt)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:text-[var(--interactive-fg-disabled)]",
            showStatus && isValid && "border-[var(--positive-fg)] focus-visible:ring-[var(--positive-bg-alt)]",
            showStatus && !isValid && "border-[var(--destructive-fg)] focus-visible:ring-[var(--destructive-bg-alt)]",
            className
          )}
          ref={ref}
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
        />
        {showStatus && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValid ? (
              <CheckCircle2 className="h-4 w-4 text-[var(--positive-fg)]" />
            ) : (
              <AlertCircle className="h-4 w-4 text-[var(--destructive-fg)]" />
            )}
          </div>
        )}
      </div>
    )
  }
)
EmailInput.displayName = "EmailInput"

export { EmailInput }
