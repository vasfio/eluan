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
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="email"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            showStatus && isValid && "border-green-500 focus-visible:ring-green-500",
            showStatus && !isValid && "border-destructive focus-visible:ring-destructive",
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
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
          </div>
        )}
      </div>
    )
  }
)
EmailInput.displayName = "EmailInput"

export { EmailInput }
