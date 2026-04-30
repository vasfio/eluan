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
      // `focusInput` is a closure over a stable ref, so excluding it from
      // the deps array is intentional — including it would re-run the effect
      // on every render.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoFocus])

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-[var(--spacing-sm)]", className)}
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
                "h-[var(--size-xl)] w-[var(--size-lg)] rounded-[var(--spacing-md)] border border-[var(--interactive-border-alt)] bg-[var(--interactive-bg)] text-center text-[length:var(--font-size-lg)] font-semibold tracking-widest transition-all",
                "focus:outline-none focus:ring-1 focus:ring-[var(--interactive-border)] focus:ring-offset-1 focus:ring-offset-[var(--interactive-border)]",
                "disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:text-[color:var(--interactive-fg-disabled)]",
                value && "bg-[var(--interactive-bg-alt)]"
              )}
            />
            {index === Math.floor(length / 2) - 1 && length > 3 && (
              <div className="flex w-[var(--size-xxs)] items-center justify-center">
                <span className="text-[color:var(--interactive-fg)] text-[length:var(--font-size-lg)]">-</span>
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
      "relative flex h-[var(--size-lg)] w-[var(--size-lg)] items-center justify-center border-y border-r border-[var(--interactive-border-alt)] text-[length:var(--font-size-sm)] transition-all first:rounded-l-[var(--curves-md)] first:border-l last:rounded-r-[var(--curves-md)]",
      isActive && "z-10 ring-1 ring-[var(--interactive-border-alt)] ring-offset-background",
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
        <div className="h-4 w-px animate-caret-blink bg-[var(--interactive-fg-alt)] duration-1000" />
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
    <Dot className="h-[var(--size-xxs)] w-[var(--size-xxs)] text-[color:var(--container-fg)]" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
