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
import { TimeInput } from "./time-input"

export interface DateTimePickerProps {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  showSeconds?: boolean
  use24Hour?: boolean
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

/** Serialize the time portion of a Date into the string TimeInput expects. */
function dateToTimeValue(
  date: Date | undefined,
  use24Hour: boolean,
  showSeconds: boolean
): string {
  if (!date) return ""
  const h = date.getHours()
  const sec = showSeconds ? `:${pad(date.getSeconds())}` : ""
  if (use24Hour) return `${pad(h)}:${pad(date.getMinutes())}${sec}`
  const period = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 || 12
  return `${pad(h12)}:${pad(date.getMinutes())}${sec} ${period}`
}

/** Apply a TimeInput value string onto a base date (or today when unset). */
function applyTimeValue(base: Date | undefined, value: string): Date | undefined {
  const m12 = value.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i)
  const m24 = value.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/)
  let h: number
  let m: number
  let s: number
  if (m12) {
    h = parseInt(m12[1]) % 12
    if (m12[4].toUpperCase() === "PM") h += 12
    m = parseInt(m12[2])
    s = m12[3] ? parseInt(m12[3]) : 0
  } else if (m24) {
    h = parseInt(m24[1])
    m = parseInt(m24[2])
    s = m24[3] ? parseInt(m24[3]) : 0
  } else {
    return base
  }
  const d = base ? new Date(base) : new Date()
  d.setHours(h, m, s, 0)
  return d
}

const DateTimePicker = React.forwardRef<HTMLButtonElement, DateTimePickerProps>(
  (
    {
      value,
      onValueChange,
      placeholder = "Pick date and time",
      disabled = false,
      showSeconds = false,
      use24Hour = false,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value)

    React.useEffect(() => {
      setSelectedDate(value)
    }, [value])

    const handleDateSelect = (date: Date | undefined) => {
      if (date) {
        const newDate = new Date(date)
        if (selectedDate) {
          newDate.setHours(selectedDate.getHours())
          newDate.setMinutes(selectedDate.getMinutes())
          newDate.setSeconds(selectedDate.getSeconds())
        }
        setSelectedDate(newDate)
        onValueChange?.(newDate)
      }
    }

    const handleTimeChange = (timeValue: string) => {
      const newDate = applyTimeValue(selectedDate, timeValue)
      if (newDate) {
        setSelectedDate(newDate)
        onValueChange?.(newDate)
      }
    }

    const dateTimeFormat = showSeconds
      ? use24Hour
        ? "PPP HH:mm:ss"
        : "PPP hh:mm:ss a"
      : use24Hour
        ? "PPP HH:mm"
        : "PPP hh:mm a"

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant={selectedDate ? "input" : "inputMuted"}
            fullWidth
            align="start"
            textAlign="left"
            disabled={disabled}
          >
            <CalendarIcon aria-hidden="true" {...stylex.props(styles.triggerIcon)} />
            {selectedDate ? (
              format(selectedDate, dateTimeFormat)
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent layout="calendarSingle" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div {...stylex.props(styles.timeSection)}>
            <TimeInput
              format={use24Hour ? "24" : "12"}
              showSeconds={showSeconds}
              value={dateToTimeValue(selectedDate, use24Hour, showSeconds)}
              onValueChange={handleTimeChange}
            />
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)
DateTimePicker.displayName = "DateTimePicker"

const styles = stylex.create({
  triggerIcon: {
    height: "var(--size-xxs)",
    marginRight: "var(--spacing-sm)",
    width: "var(--size-xxs)",
  },
  timeSection: {
    borderTopColor: "var(--container-border)",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    padding: "var(--spacing-md)",
  },
})

export { DateTimePicker }
