import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Slider,
  Switch,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@vasf/ragnar-core"

/* ---------------------------------------------------------------------------
 * AIParameters – container for parameter controls
 * --------------------------------------------------------------------------- */

export interface AIParametersProps extends React.HTMLAttributes<HTMLDivElement> {}

const AIParameters = React.forwardRef<HTMLDivElement, AIParametersProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-[var(--spacing-md)]", className)}
      {...props}
    >
      {children}
    </div>
  )
)
AIParameters.displayName = "AIParameters"

/* ---------------------------------------------------------------------------
 * AIParameterSlider – labeled range slider (backed by Slider)
 * --------------------------------------------------------------------------- */

export interface AIParameterSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Label displayed above the slider */
  label: string
  /** Minimum value */
  min: number
  /** Maximum value */
  max: number
  /** Step increment */
  step?: number
  /** Current value */
  value: number
  /** Change handler */
  onChange: (value: number) => void
  /** Whether to display the current value next to the label */
  showValue?: boolean
  /** Whether the control is disabled */
  disabled?: boolean
}

const AIParameterSlider = React.forwardRef<
  HTMLDivElement,
  AIParameterSliderProps
>(
  (
    {
      className,
      label,
      min,
      max,
      step = 1,
      value,
      onChange,
      showValue = true,
      disabled = false,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-[var(--spacing-xxs)]",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <label className="text-[length:var(--font-size-sm)] font-medium text-[color:var(--container-fg)]">
          {label}
        </label>
        {showValue && (
          <span className="text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)] tabular-nums">
            {value}
          </span>
        )}
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        disabled={disabled}
      />
    </div>
  )
)
AIParameterSlider.displayName = "AIParameterSlider"

/* ---------------------------------------------------------------------------
 * AIParameterToggle – labeled toggle switch (backed by Switch)
 * --------------------------------------------------------------------------- */

export interface AIParameterToggleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Label for the toggle */
  label: string
  /** Optional description below the label */
  description?: string
  /** Whether the toggle is on */
  checked: boolean
  /** Change handler */
  onChange: (checked: boolean) => void
  /** Whether the control is disabled */
  disabled?: boolean
}

const AIParameterToggle = React.forwardRef<
  HTMLDivElement,
  AIParameterToggleProps
>(
  (
    {
      className,
      label,
      description,
      checked,
      onChange,
      disabled = false,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-[var(--spacing-md)]",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-[var(--spacing-xxs)]">
        <span className="text-[length:var(--font-size-sm)] font-medium text-[color:var(--container-fg)]">
          {label}
        </span>
        {description && (
          <span className="text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)]">
            {description}
          </span>
        )}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
    </div>
  )
)
AIParameterToggle.displayName = "AIParameterToggle"

/* ---------------------------------------------------------------------------
 * AIParameterSelect – labeled select dropdown (backed by Select)
 * --------------------------------------------------------------------------- */

export interface AIParameterSelectOption {
  /** Option value */
  value: string
  /** Display label */
  label: string
}

export interface AIParameterSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Label for the select */
  label: string
  /** Available options */
  options: AIParameterSelectOption[]
  /** Current value */
  value: string
  /** Change handler */
  onChange: (value: string) => void
  /** Whether the control is disabled */
  disabled?: boolean
}

const AIParameterSelect = React.forwardRef<
  HTMLDivElement,
  AIParameterSelectProps
>(
  (
    { className, label, options, value, onChange, disabled = false, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-[var(--spacing-xxs)]",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      <label className="text-[length:var(--font-size-sm)] font-medium text-[color:var(--container-fg)]">
        {label}
      </label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
)
AIParameterSelect.displayName = "AIParameterSelect"

export {
  AIParameters,
  AIParameterSlider,
  AIParameterToggle,
  AIParameterSelect,
}
