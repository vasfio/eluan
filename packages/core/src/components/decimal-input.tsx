import * as React from "react"
import { cn } from "@/lib/utils"

type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "CNY" | "KRW" | "INR" | "BRL" | "CAD" | "AUD" | "CHF"

interface CurrencyInfo {
  code: CurrencyCode
  symbol: string
  name: string
  decimals: number
}

const currencies: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", decimals: 2 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", decimals: 2 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", decimals: 2 },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", decimals: 0 },
  CNY: { code: "CNY", symbol: "¥", name: "Chinese Yuan", decimals: 2 },
  KRW: { code: "KRW", symbol: "₩", name: "South Korean Won", decimals: 0 },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", decimals: 2 },
  BRL: { code: "BRL", symbol: "R$", name: "Brazilian Real", decimals: 2 },
  CAD: { code: "CAD", symbol: "CA$", name: "Canadian Dollar", decimals: 2 },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", decimals: 2 },
  CHF: { code: "CHF", symbol: "Fr.", name: "Swiss Franc", decimals: 2 },
}

export interface DecimalInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  value?: number
  onChange?: (value: number | undefined) => void
  decimals?: number
  min?: number
  max?: number
  prefix?: string
  suffix?: string
  currency?: CurrencyCode
  unit?: string
  unitPosition?: "prefix" | "suffix"
  thousandsSeparator?: string
  decimalSeparator?: string
  allowNegative?: boolean
}

function formatNumber(
  value: number,
  decimals: number,
  thousandsSeparator: string,
  decimalSeparator: string
): string {
  const parts = value.toFixed(decimals).split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)
  return parts.join(decimalSeparator)
}

function parseNumber(
  value: string,
  thousandsSeparator: string,
  decimalSeparator: string
): number | undefined {
  if (!value) return undefined
  const cleaned = value
    .replace(new RegExp(`\\${thousandsSeparator}`, "g"), "")
    .replace(decimalSeparator, ".")
  const num = parseFloat(cleaned)
  return isNaN(num) ? undefined : num
}

const DecimalInput = React.forwardRef<HTMLInputElement, DecimalInputProps>(
  (
    {
      className,
      value,
      onChange,
      decimals = 2,
      min,
      max,
      prefix,
      suffix,
      currency,
      unit,
      unitPosition = "prefix",
      thousandsSeparator = ",",
      decimalSeparator = ".",
      allowNegative = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const currencyInfo = currency ? currencies[currency] : undefined
    const effectiveDecimals = currencyInfo?.decimals ?? decimals
    const effectivePrefix = prefix ?? (currencyInfo?.symbol && currencyInfo.symbol)
    const effectiveSuffix = suffix ?? (unit && unitPosition === "suffix" ? unit : undefined)
    const effectivePrefixUnit = unit && unitPosition === "prefix" ? unit : undefined

    const [inputValue, setInputValue] = React.useState<string>("")
    const [isFocused, setIsFocused] = React.useState(false)

    React.useEffect(() => {
      if (value !== undefined && !isFocused) {
        setInputValue(formatNumber(value, effectiveDecimals, thousandsSeparator, decimalSeparator))
      }
    }, [value, effectiveDecimals, thousandsSeparator, decimalSeparator, isFocused])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value

      // Remove non-numeric characters except for decimal separator and negative sign
      const regex = allowNegative
        ? new RegExp(`[^0-9\\${decimalSeparator}-]`, "g")
        : new RegExp(`[^0-9\\${decimalSeparator}]`, "g")
      newValue = newValue.replace(regex, "")

      // Ensure only one decimal separator
      const parts = newValue.split(decimalSeparator)
      if (parts.length > 2) {
        newValue = parts[0] + decimalSeparator + parts.slice(1).join("")
      }

      // Ensure only one negative sign at the start
      if (allowNegative) {
        const isNegative = newValue.startsWith("-")
        newValue = newValue.replace(/-/g, "")
        if (isNegative) newValue = "-" + newValue
      }

      // Limit decimal places
      if (parts.length === 2 && parts[1].length > effectiveDecimals) {
        newValue = parts[0] + decimalSeparator + parts[1].slice(0, effectiveDecimals)
      }

      setInputValue(newValue)

      const parsed = parseNumber(newValue, thousandsSeparator, decimalSeparator)
      if (parsed !== undefined) {
        let clamped = parsed
        if (min !== undefined && clamped < min) clamped = min
        if (max !== undefined && clamped > max) clamped = max
        onChange?.(clamped)
      } else {
        onChange?.(undefined)
      }
    }

    const handleFocus = () => {
      setIsFocused(true)
      // Remove formatting on focus for easier editing
      if (value !== undefined) {
        setInputValue(value.toString().replace(".", decimalSeparator))
      }
    }

    const handleBlur = () => {
      setIsFocused(false)
      // Reformat on blur
      if (value !== undefined) {
        setInputValue(formatNumber(value, effectiveDecimals, thousandsSeparator, decimalSeparator))
      }
    }

    const prefixRef = React.useRef<HTMLSpanElement>(null)
    const suffixRef = React.useRef<HTMLSpanElement>(null)
    const [prefixWidth, setPrefixWidth] = React.useState(0)
    const [suffixWidth, setSuffixWidth] = React.useState(0)

    const hasPrefix = !!(effectivePrefix || effectivePrefixUnit)
    const hasSuffix = !!effectiveSuffix

    React.useEffect(() => {
      if (prefixRef.current) {
        setPrefixWidth(prefixRef.current.offsetWidth)
      }
    }, [effectivePrefix, effectivePrefixUnit])

    React.useEffect(() => {
      if (suffixRef.current) {
        setSuffixWidth(suffixRef.current.offsetWidth)
      }
    }, [effectiveSuffix])

    return (
      <div className="relative flex items-center">
        {hasPrefix && (
          <span
            ref={prefixRef}
            className="pointer-events-none absolute left-3 text-[var(--interactive-fg-alt)] text-[var(--font-size-sm)] whitespace-nowrap"
          >
            {effectivePrefix}
            {effectivePrefixUnit}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          className={cn(
            "flex h-[var(--size-lg)] w-full rounded-[var(--curves-md)] border border-[var(--interactive-border-alt)] bg-[var(--container-bg)] py-[var(--spacing-sm)] text-[var(--font-size-sm)] text-right ring-offset-background placeholder:text-[var(--interactive-fg-alt)] focus-visible:outline-none focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:text-[var(--interactive-fg-disabled)] font-mono",
            !hasPrefix && "pl-3",
            !hasSuffix && "pr-3",
            className
          )}
          style={{
            paddingLeft: hasPrefix ? `${prefixWidth + 20}px` : undefined,
            paddingRight: hasSuffix ? `${suffixWidth + 20}px` : undefined,
          }}
          ref={ref}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          {...props}
        />
        {hasSuffix && (
          <span
            ref={suffixRef}
            className="pointer-events-none absolute right-3 text-[var(--interactive-fg-alt)] text-[var(--font-size-sm)] whitespace-nowrap"
          >
            {effectiveSuffix}
          </span>
        )}
      </div>
    )
  }
)
DecimalInput.displayName = "DecimalInput"

// Specialized currency input
export interface CurrencyInputProps extends Omit<DecimalInputProps, "currency"> {
  currency: CurrencyCode
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ currency, ...props }, ref) => {
    return <DecimalInput ref={ref} currency={currency} {...props} />
  }
)
CurrencyInput.displayName = "CurrencyInput"

// Specialized percentage input
export interface PercentageInputProps extends Omit<DecimalInputProps, "suffix" | "min" | "max"> {
  min?: number
  max?: number
}

const PercentageInput = React.forwardRef<HTMLInputElement, PercentageInputProps>(
  ({ min = 0, max = 100, decimals = 1, ...props }, ref) => {
    return (
      <DecimalInput
        ref={ref}
        suffix="%"
        min={min}
        max={max}
        decimals={decimals}
        {...props}
      />
    )
  }
)
PercentageInput.displayName = "PercentageInput"

// Specialized unit input for measurements
export interface UnitInputProps extends Omit<DecimalInputProps, "unit" | "unitPosition"> {
  unit: string
  unitPosition?: "prefix" | "suffix"
}

const UnitInput = React.forwardRef<HTMLInputElement, UnitInputProps>(
  ({ unit, unitPosition = "suffix", ...props }, ref) => {
    return (
      <DecimalInput
        ref={ref}
        unit={unit}
        unitPosition={unitPosition}
        {...props}
      />
    )
  }
)
UnitInput.displayName = "UnitInput"

export { DecimalInput, CurrencyInput, PercentageInput, UnitInput, currencies }
export type { CurrencyCode, CurrencyInfo }
