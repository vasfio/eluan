import * as React from "react"

import { cn } from "@/lib/utils"
import { Checkbox } from "./checkbox"
import { Label } from "./form-label"

interface CheckboxGroupContextValue {
  value: string[]
  onItemChange: (itemValue: string, checked: boolean) => void
  disabled?: boolean
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | null>(null)

const useCheckboxGroup = () => {
  const context = React.useContext(CheckboxGroupContext)
  if (!context) {
    throw new Error("CheckboxGroupItem must be used within a CheckboxGroup")
  }
  return context
}

export interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  orientation?: "vertical" | "horizontal"
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = [],
      onValueChange,
      disabled,
      orientation = "vertical",
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue)
    const value = controlledValue !== undefined ? controlledValue : internalValue

    const onItemChange = React.useCallback(
      (itemValue: string, checked: boolean) => {
        const next = checked
          ? [...value, itemValue]
          : value.filter((v) => v !== itemValue)

        if (controlledValue === undefined) {
          setInternalValue(next)
        }
        onValueChange?.(next)
      },
      [value, controlledValue, onValueChange]
    )

    return (
      <CheckboxGroupContext.Provider value={{ value, onItemChange, disabled }}>
        <div
          ref={ref}
          role="group"
          className={cn(
            orientation === "vertical" ? "grid gap-3" : "flex flex-wrap gap-4",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </CheckboxGroupContext.Provider>
    )
  }
)
CheckboxGroup.displayName = "CheckboxGroup"

export interface CheckboxGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Checkbox>, "checked" | "onCheckedChange" | "value"> {
  value: string
  label: string
  description?: string
}

const CheckboxGroupItem = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  CheckboxGroupItemProps
>(({ className, value, label, description, disabled: itemDisabled, id, ...props }, ref) => {
  const group = useCheckboxGroup()
  const checked = group.value.includes(value)
  const disabled = group.disabled || itemDisabled
  const itemId = id || `checkbox-${value}`

  return (
    <div className={cn(description ? "flex items-start gap-[var(--spacing-sm)]" : "flex items-center gap-[var(--spacing-sm)]", className)}>
      <Checkbox
        ref={ref}
        id={itemId}
        checked={checked}
        onCheckedChange={(c) => group.onItemChange(value, c === true)}
        disabled={disabled}
        className={description ? "mt-0.5" : undefined}
        {...props}
      />
      <div className="grid gap-[var(--spacing-xxs)]">
        <Label
          htmlFor={itemId}
          className={cn(
            "cursor-pointer",
            disabled && "cursor-not-allowed text-[color:var(--interactive-fg-disabled)]"
          )}
        >
          {label}
        </Label>
        {description && (
          <p className={cn(
            "text-[length:var(--font-size-sm)] text-[color:var(--interactive-fg-alt)]",
            disabled && "text-[color:var(--interactive-fg-disabled)]"
          )}>
            {description}
          </p>
        )}
      </div>
    </div>
  )
})
CheckboxGroupItem.displayName = "CheckboxGroupItem"

export { CheckboxGroup, CheckboxGroupItem, useCheckboxGroup }
