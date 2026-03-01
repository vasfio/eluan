import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  value?: number
  onChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
  showControls?: boolean
  allowNegative?: boolean
  clampOnBlur?: boolean
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      value,
      onChange,
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
      onChange?.(parsed)
    }

    const handleBlur = () => {
      const parsed = parseValue(internalValue)
      if (parsed !== undefined && clampOnBlur) {
        const clamped = clamp(parsed)
        setInternalValue(clamped.toString())
        onChange?.(clamped)
      }
    }

    const increment = () => {
      const current = parseValue(internalValue) ?? 0
      const newValue = clamp(current + step)
      setInternalValue(newValue.toString())
      onChange?.(newValue)
    }

    const decrement = () => {
      const current = parseValue(internalValue) ?? 0
      const newValue = clamp(current - step)
      setInternalValue(newValue.toString())
      onChange?.(newValue)
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
        <input
          type="text"
          inputMode="decimal"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
            className
          )}
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
      <div className="flex">
        <button
          type="button"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 border-input bg-background hover:bg-accent",
            (!canDecrement() || disabled) && "opacity-50 cursor-not-allowed hover:bg-background"
          )}
          onClick={decrement}
          disabled={!canDecrement() || disabled}
          tabIndex={-1}
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="text"
          inputMode="decimal"
          className={cn(
            "flex h-10 w-full border border-input bg-background px-3 py-2 text-sm text-center ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
            className
          )}
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
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-r-md border border-l-0 border-input bg-background hover:bg-accent",
            (!canIncrement() || disabled) && "opacity-50 cursor-not-allowed hover:bg-background"
          )}
          onClick={increment}
          disabled={!canIncrement() || disabled}
          tabIndex={-1}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
