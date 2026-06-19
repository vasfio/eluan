import * as React from "react"
import * as stylex from "@stylexjs/stylex"

import { Slider } from "./slider"
import { Switch } from "./switch"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./select"

type DivProps = Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">

export type AIParametersProps = DivProps

export interface AIParameterSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "onChange" | "style"> {
  label: string
  min: number
  max: number
  step?: number
  value: number
  onChange: (value: number) => void
  showValue?: boolean
  disabled?: boolean
}

export interface AIParameterToggleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "onChange" | "style"> {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export interface AIParameterSelectOption {
  value: string
  label: string
}

export interface AIParameterSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "onChange" | "style"> {
  label: string
  options: AIParameterSelectOption[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-md)",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xxs)",
  },
  row: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-md)",
    justifyContent: "space-between",
  },
  disabled: {
    opacity: 0.5,
    pointerEvents: "none",
  },
  labelRow: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    color: "var(--container-fg)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
  },
  value: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
    fontVariantNumeric: "tabular-nums",
  },
  description: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
  },
})

const AIParameters = React.forwardRef<HTMLDivElement, AIParametersProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.root)}>
      {children}
    </div>
  )
)
AIParameters.displayName = "AIParameters"

const AIParameterSlider = React.forwardRef<
  HTMLDivElement,
  AIParameterSliderProps
>(
  (
    {
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
      {...props}
      {...stylex.props(styles.stack, disabled && styles.disabled)}
    >
      <div {...stylex.props(styles.labelRow)}>
        <label {...stylex.props(styles.label)}>{label}</label>
        {showValue && <span {...stylex.props(styles.value)}>{value}</span>}
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

const AIParameterToggle = React.forwardRef<
  HTMLDivElement,
  AIParameterToggleProps
>(
  (
    {
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
      {...props}
      {...stylex.props(styles.row, disabled && styles.disabled)}
    >
      <div {...stylex.props(styles.stack)}>
        <span {...stylex.props(styles.label)}>{label}</span>
        {description && (
          <span {...stylex.props(styles.description)}>{description}</span>
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

const AIParameterSelect = React.forwardRef<
  HTMLDivElement,
  AIParameterSelectProps
>(
  (
    { label, options, value, onChange, disabled = false, ...props },
    ref
  ) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(styles.stack, disabled && styles.disabled)}
    >
      <label {...stylex.props(styles.label)}>{label}</label>
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
