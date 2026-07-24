import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Input } from "./input"

export interface EmailInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "size" | "style" | "type"> {
  onValidationChange?: (isValid: boolean) => void
  showValidation?: boolean
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const styles = stylex.create({
  icon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  positive: {
    color: "var(--positive-fg)",
  },
  destructive: {
    color: "var(--destructive-fg)",
  },
})

const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  (
    { showValidation = false, onValidationChange, onChange, onBlur, ...props },
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
        ? <CheckCircle2 aria-hidden="true" {...stylex.props(styles.icon, styles.positive)} />
        : <AlertCircle aria-hidden="true" {...stylex.props(styles.icon, styles.destructive)} />
      : undefined

    return (
      <Input
        type="email"
        ref={ref}
        onChange={handleChange}
        onBlur={handleBlur}
        trailing={statusIcon}
        validationTone={showStatus ? (isValid ? "positive" : "destructive") : "none"}
        {...props}
      />
    )
  }
)
EmailInput.displayName = "EmailInput"

export { EmailInput }
