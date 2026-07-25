import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Minus, Plus } from "lucide-react"
import { Input } from "./input"

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "size" | "style" | "type" | "value" | "onChange"> {
  value?: number
  onValueChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
  showControls?: boolean
  allowNegative?: boolean
  clampOnBlur?: boolean
}

const styles = stylex.create({
  controls: {
    display: "flex",
  },
  controlButton: {
    alignItems: "center",
    backgroundColor: "var(--interactive-bg)",
    borderColor: "var(--interactive-border-alt)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--interactive-fg)",
    display: "flex",
    height: "var(--size-lg)",
    justifyContent: "center",
    transitionDuration: "150ms",
    transitionProperty: "background-color, border-color, color, opacity",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--size-lg)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
    // Disabled steppers behave like disabled ghost buttons: transparent
    // surface, disabled foreground, and no hover — pointerEvents:none keeps
    // the :hover rule above from ever matching a disabled stepper.
    ":disabled": {
      backgroundColor: "transparent",
      color: "var(--interactive-fg-disabled)",
      cursor: "not-allowed",
      pointerEvents: "none",
    },
  },
  decrementButton: {
    borderRightWidth: 0,
    borderTopLeftRadius: "var(--curves-md)",
    borderBottomLeftRadius: "var(--curves-md)",
  },
  incrementButton: {
    borderLeftWidth: 0,
    borderTopRightRadius: "var(--curves-md)",
    borderBottomRightRadius: "var(--curves-md)",
  },
  icon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
})

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onValueChange,
      min,
      max,
      step = 1,
      showControls = true,
      allowNegative = true,
      clampOnBlur = true,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      value !== undefined ? value.toString() : ""
    )

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value.toString())
      }
    }, [value])

    const clamp = (val: number): number => {
      let clamped = val
      if (min !== undefined && clamped < min) clamped = min
      if (max !== undefined && clamped > max) clamped = max
      return clamped
    }

    const parseValue = (str: string): number | undefined => {
      if (str === "" || str === "-") return undefined
      const num = parseFloat(str)
      return isNaN(num) ? undefined : num
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value

      // Allow only valid number characters
      if (!allowNegative) {
        newValue = newValue.replace(/-/g, "")
      }

      // Allow typing negative sign and decimal point
      if (!/^-?\d*\.?\d*$/.test(newValue)) {
        return
      }

      setInternalValue(newValue)
      const parsed = parseValue(newValue)
      onValueChange?.(parsed)
    }

    const handleBlur = () => {
      const parsed = parseValue(internalValue)
      if (parsed !== undefined && clampOnBlur) {
        const clamped = clamp(parsed)
        setInternalValue(clamped.toString())
        onValueChange?.(clamped)
      }
    }

    const increment = () => {
      const current = parseValue(internalValue) ?? 0
      const newValue = clamp(current + step)
      setInternalValue(newValue.toString())
      onValueChange?.(newValue)
    }

    const decrement = () => {
      const current = parseValue(internalValue) ?? 0
      const newValue = clamp(current - step)
      setInternalValue(newValue.toString())
      onValueChange?.(newValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        increment()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        decrement()
      }
    }

    const canDecrement = () => {
      const current = parseValue(internalValue) ?? 0
      return min === undefined || current > min
    }

    const canIncrement = () => {
      const current = parseValue(internalValue) ?? 0
      return max === undefined || current < max
    }

    if (!showControls) {
      return (
        <Input
          type="text"
          inputMode="decimal"
          textStyle="mono"
          ref={ref}
          value={internalValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          {...props}
        />
      )
    }

    return (
      <div {...stylex.props(styles.controls)}>
        <button
          type="button"
          aria-label="Decrease"
          {...stylex.props(styles.controlButton, styles.decrementButton)}
          onClick={decrement}
          disabled={!canDecrement() || disabled}
          tabIndex={-1}
        >
          <Minus aria-hidden="true" {...stylex.props(styles.icon)} />
        </button>
        <Input
          type="text"
          inputMode="decimal"
          attachment="middle"
          textAlign="center"
          textStyle="mono"
          ref={ref}
          value={internalValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          {...props}
        />
        <button
          type="button"
          aria-label="Increase"
          {...stylex.props(styles.controlButton, styles.incrementButton)}
          onClick={increment}
          disabled={!canIncrement() || disabled}
          tabIndex={-1}
        >
          <Plus aria-hidden="true" {...stylex.props(styles.icon)} />
        </button>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
