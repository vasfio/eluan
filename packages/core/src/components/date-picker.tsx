import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

export interface DatePickerProps {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  dateFormat?: string
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      onValueChange,
      placeholder = "Pick a date",
      disabled = false,
      dateFormat = "PPP",
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant={value ? "input" : "inputMuted"}
            fullWidth
            align="start"
            textAlign="left"
            disabled={disabled}
          >
            <CalendarIcon aria-hidden="true" {...stylex.props(styles.triggerIcon)} />
            {value ? format(value, dateFormat) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent layout="calendarSingle" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onValueChange?.(date)
              setOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DatePicker.displayName = "DatePicker"

export interface DateRangePickerProps {
  value?: { from: Date | undefined; to: Date | undefined }
  onValueChange?: (range: { from: Date | undefined; to: Date | undefined }) => void
  placeholder?: string
  disabled?: boolean
  dateFormat?: string
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (
    {
      value,
      onValueChange,
      placeholder = "Pick a date range",
      disabled = false,
      dateFormat = "LLL dd, y",
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant={value?.from ? "input" : "inputMuted"}
            fullWidth
            align="start"
            textAlign="left"
            disabled={disabled}
          >
            <CalendarIcon aria-hidden="true" {...stylex.props(styles.triggerIcon)} />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, dateFormat)} -{" "}
                  {format(value.to, dateFormat)}
                </>
              ) : (
                format(value.from, dateFormat)
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent layout="calendar" align="start">
          <Calendar
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={(range) => {
              onValueChange?.(range as { from: Date | undefined; to: Date | undefined })
            }}
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DateRangePicker.displayName = "DateRangePicker"

const styles = stylex.create({
  triggerIcon: {
    height: "var(--size-xxs)",
    marginRight: "var(--spacing-sm)",
    width: "var(--size-xxs)",
  },
})

export { DatePicker, DateRangePicker }
