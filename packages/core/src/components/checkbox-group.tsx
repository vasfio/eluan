import * as React from "react"
import * as stylex from "@stylexjs/stylex"

import { Checkbox } from "./checkbox"
import { Label } from "./form-label"

interface CheckboxGroupContextValue {
  disabled?: boolean
  onItemChange: (itemValue: string, checked: boolean) => void
  value: string[]
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
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style" | "onChange" | "defaultValue"> {
  defaultValue?: string[]
  disabled?: boolean
  onValueChange?: (value: string[]) => void
  orientation?: "vertical" | "horizontal"
  value?: string[]
}

const styles = stylex.create({
  groupVertical: {
    display: "grid",
    gap: "var(--spacing-md)",
  },
  groupHorizontal: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-lg)",
  },
  item: {
    display: "flex",
    gap: "var(--spacing-sm)",
  },
  itemCenter: {
    alignItems: "center",
  },
  itemStart: {
    alignItems: "flex-start",
  },
  copy: {
    display: "grid",
    gap: "var(--spacing-xxs)",
  },
  labelWrap: {
    cursor: "pointer",
  },
  disabledLabel: {
    color: "var(--interactive-fg-disabled)",
    cursor: "not-allowed",
  },
  description: {
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-sm)",
    margin: 0,
  },
  disabledDescription: {
    color: "var(--interactive-fg-disabled)",
  },
})

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
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
          {...props}
          {...stylex.props(
            orientation === "vertical" ? styles.groupVertical : styles.groupHorizontal
          )}
        >
          {children}
        </div>
      </CheckboxGroupContext.Provider>
    )
  }
)
CheckboxGroup.displayName = "CheckboxGroup"

export interface CheckboxGroupItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Checkbox>,
    "checked" | "className" | "onCheckedChange" | "style" | "value"
  > {
  description?: string
  label: string
  value: string
}

const CheckboxGroupItem = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  CheckboxGroupItemProps
>(({ value, label, description, disabled: itemDisabled, id, ...props }, ref) => {
  const group = useCheckboxGroup()
  const checked = group.value.includes(value)
  const disabled = group.disabled || itemDisabled
  const itemId = id || `checkbox-${value}`

  return (
    <div
      {...stylex.props(
        styles.item,
        description ? styles.itemStart : styles.itemCenter
      )}
    >
      <Checkbox
        ref={ref}
        id={itemId}
        checked={checked}
        onCheckedChange={(c) => group.onItemChange(value, c === true)}
        disabled={disabled}
        {...props}
      />
      <div {...stylex.props(styles.copy)}>
        <span {...stylex.props(styles.labelWrap, disabled && styles.disabledLabel)}>
          <Label htmlFor={itemId}>{label}</Label>
        </span>
        {description && (
          <p
            {...stylex.props(
              styles.description,
              disabled && styles.disabledDescription
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  )
})
CheckboxGroupItem.displayName = "CheckboxGroupItem"

export { CheckboxGroup, CheckboxGroupItem, useCheckboxGroup }
