"use client"

import * as React from "react"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

export interface InputOTPProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** Number of OTP slots */
  length?: number
  /** Called when OTP value changes */
  onChange?: (value: string) => void
  /** Called when all slots are filled */
  onComplete?: (value: string) => void
  /** Render as password/hidden */
  mask?: boolean
  /** Auto focus first input */
  autoFocus?: boolean
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      className,
      length = 6,
      onChange,
      onComplete,
      mask = false,
      autoFocus = true,
      disabled,
      ...props
    },
    ref
  ) => {
    const [values, setValues] = React.useState<string[]>(
      Array(length).fill("")
    )
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    const focusInput = (index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.focus()
      }
    }

    const handleChange = (index: number, value: string) => {
      // Only allow single digit
      const digit = value.slice(-1)
      if (digit && !/^\d$/.test(digit)) return

      const newValues = [...values]
      newValues[index] = digit
      setValues(newValues)

      const otpValue = newValues.join("")
      onChange?.(otpValue)

      if (digit && index < length - 1) {
        focusInput(index + 1)
      }

      if (newValues.every((v) => v !== "") && otpValue.length === length) {
        onComplete?.(otpValue)
      }
    }

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace") {
        e.preventDefault()
        const newValues = [...values]

        if (values[index]) {
          newValues[index] = ""
          setValues(newValues)
          onChange?.(newValues.join(""))
        } else if (index > 0) {
          newValues[index - 1] = ""
          setValues(newValues)
          onChange?.(newValues.join(""))
          focusInput(index - 1)
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        focusInput(index - 1)
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        focusInput(index + 1)
      }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData("text/plain").slice(0, length)
      const digits = pastedData.replace(/\D/g, "").split("")

      if (digits.length === 0) return

      const newValues = [...values]
      digits.forEach((digit, i) => {
        if (i < length) {
          newValues[i] = digit
        }
      })
      setValues(newValues)
      onChange?.(newValues.join(""))

      // Focus last filled or next empty input
      const focusIndex = Math.min(digits.length, length - 1)
      focusInput(focusIndex)

      if (newValues.every((v) => v !== "") && newValues.join("").length === length) {
        onComplete?.(newValues.join(""))
      }
    }

    React.useEffect(() => {
      if (autoFocus) {
        focusInput(0)
      }
    }, [autoFocus])

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {values.map((value, index) => (
          <React.Fragment key={index}>
            <input
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type={mask ? "password" : "text"}
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{1}"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              disabled={disabled}
              className={cn(
                "h-10 w-10 rounded-md border border-input bg-background text-center text-sm font-medium shadow-sm transition-all",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                value && "border-primary"
              )}
            />
            {index === Math.floor(length / 2) - 1 && length > 3 && (
              <div className="flex items-center justify-center">
                <Dot className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
InputOTP.displayName = "InputOTP"

// Individual slot component for custom layouts
const InputOTPSlot = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    index: number
    char?: string
    hasFakeCaret?: boolean
    isActive?: boolean
  }
>(({ className, index, char, hasFakeCaret, isActive, ...props }, ref) => (
  <div
    className={cn(
      "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
      isActive && "z-10 ring-2 ring-ring ring-offset-background",
      className
    )}
  >
    <input
      ref={ref}
      className="absolute inset-0 h-full w-full bg-transparent text-center outline-none"
      {...props}
    />
    {char}
    {hasFakeCaret && (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
      </div>
    )}
  </div>
))
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot className="h-4 w-4 text-muted-foreground" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
