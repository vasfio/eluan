"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Dot } from "lucide-react"

export interface InputOTPProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "onChange" | "style"> {
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

const caretBlink = stylex.keyframes({
  "0%, 70%, 100%": {
    opacity: 1,
  },
  "20%, 50%": {
    opacity: 0,
  },
})

const styles = stylex.create({
  root: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-sm)",
  },
  input: {
    backgroundColor: "var(--interactive-bg)",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    fontSize: "var(--font-size-lg)",
    fontWeight: 600,
    height: "var(--size-xl)",
    letterSpacing: "0.1em",
    textAlign: "center",
    transitionDuration: "150ms",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--size-lg)",
    ":focus": {
      outlineStyle: "none",
    },
    ":focus-visible": {
      boxShadow: "0 0 0 1px var(--interactive-border), 0 0 0 2px var(--interactive-border)",
    },
    ":disabled": {
      backgroundColor: "var(--interactive-bg-disabled)",
      color: "var(--interactive-fg-disabled)",
      cursor: "not-allowed",
    },
  },
  inputFilled: {
    backgroundColor: "var(--interactive-bg-alt)",
  },
  divider: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "var(--size-xxs)",
  },
  dividerText: {
    color: "var(--interactive-fg)",
    fontSize: "var(--font-size-lg)",
  },
  slot: {
    alignItems: "center",
    borderColor: "var(--interactive-border-alt)",
    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderTopStyle: "solid",
    borderTopWidth: 1,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    display: "flex",
    fontSize: "var(--font-size-sm)",
    height: "var(--size-lg)",
    justifyContent: "center",
    position: "relative",
    transitionDuration: "150ms",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--size-lg)",
    ":first-child": {
      borderLeftStyle: "solid",
      borderLeftWidth: 1,
      borderTopLeftRadius: "var(--curves-md)",
      borderBottomLeftRadius: "var(--curves-md)",
    },
    ":last-child": {
      borderTopRightRadius: "var(--curves-md)",
      borderBottomRightRadius: "var(--curves-md)",
    },
  },
  slotActive: {
    boxShadow: "0 0 0 1px var(--interactive-border-alt)",
    zIndex: 10,
  },
  slotInput: {
    backgroundColor: "transparent",
    borderWidth: 0,
    height: "100%",
    inset: 0,
    outlineStyle: "none",
    position: "absolute",
    textAlign: "center",
    width: "100%",
  },
  caretWrap: {
    alignItems: "center",
    display: "flex",
    inset: 0,
    justifyContent: "center",
    pointerEvents: "none",
    position: "absolute",
  },
  caret: {
    animationDuration: "1000ms",
    animationIterationCount: "infinite",
    animationName: caretBlink,
    animationTimingFunction: "linear",
    backgroundColor: "var(--interactive-fg-alt)",
    height: "var(--size-xxs)",
    width: 1,
  },
  group: {
    alignItems: "center",
    display: "flex",
  },
  separatorIcon: {
    color: "var(--container-fg)",
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
})

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
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
        {...stylex.props(styles.root)}
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
              {...stylex.props(styles.input, value !== "" && styles.inputFilled)}
            />
            {index === Math.floor(length / 2) - 1 && length > 3 && (
              <div {...stylex.props(styles.divider)}>
                <span {...stylex.props(styles.dividerText)}>-</span>
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
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "style"> & {
    index: number
    char?: string
    hasFakeCaret?: boolean
    isActive?: boolean
  }
>(({ index: _index, char, hasFakeCaret, isActive, ...props }, ref) => (
  <div
    {...stylex.props(styles.slot, isActive && styles.slotActive)}
  >
    <input
      ref={ref}
      {...stylex.props(styles.slotInput)}
      {...props}
    />
    {char}
    {hasFakeCaret && (
      <div {...stylex.props(styles.caretWrap)}>
        <div {...stylex.props(styles.caret)} />
      </div>
    )}
  </div>
))
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
>((props, ref) => (
  <div ref={ref} {...props} {...stylex.props(styles.group)} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot {...stylex.props(styles.separatorIcon)} />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
