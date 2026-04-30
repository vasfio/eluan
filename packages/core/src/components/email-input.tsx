import * as React from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "./input"

export interface EmailInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showValidation?: boolean
  onValidationChange?: (isValid: boolean) => void
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  (
    { className, showValidation = false, onValidationChange, onChange, onBlur, ...props },
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
      onBlur?.(e)
    }

    const showStatus = showValidation && isTouched && isValid !== null
    const statusIcon = showStatus
      ? isValid
        ? <CheckCircle2 className="h-[var(--size-xxs)] w-[var(--size-xxs)] text-[color:var(--positive-fg)]" />
        : <AlertCircle className="h-[var(--size-xxs)] w-[var(--size-xxs)] text-[color:var(--destructive-fg)]" />
      : undefined

    return (
      <Input
        type="email"
        className={cn(
          showStatus && isValid && "[&_input]:border-[var(--positive-fg)] [&_input]:focus-visible:ring-[var(--positive-bg-alt)]",
          showStatus && !isValid && "[&_input]:border-[var(--destructive-fg)] [&_input]:focus-visible:ring-[var(--destructive-bg-alt)]",
          className
        )}
        ref={ref}
        onChange={handleChange}
        onBlur={handleBlur}
        trailing={statusIcon}
        {...props}
      />
    )
  }
)
EmailInput.displayName = "EmailInput"

export { EmailInput }
