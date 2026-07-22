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

export interface DateTimePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  showSeconds?: boolean
  use24Hour?: boolean
}

const DateTimePicker = React.forwardRef<HTMLButtonElement, DateTimePickerProps>(
  (
    {
      value,
      onChange,
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

    // No longer need hour/minute/second arrays since we use input fields

    const handleDateSelect = (date: Date | undefined) => {
      if (date) {
        const newDate = new Date(date)
        if (selectedDate) {
          newDate.setHours(selectedDate.getHours())
          newDate.setMinutes(selectedDate.getMinutes())
          newDate.setSeconds(selectedDate.getSeconds())
        }
        setSelectedDate(newDate)
        onChange?.(newDate)
      }
    }

    const handleTimeChange = (
      type: "hour" | "minute" | "second" | "ampm",
      val: string
    ) => {
      const newDate = selectedDate ? new Date(selectedDate) : new Date()

      if (type === "hour") {
        let hour = parseInt(val)
        if (!use24Hour) {
          const isPM = newDate.getHours() >= 12
          if (isPM && hour !== 12) hour += 12
          if (!isPM && hour === 12) hour = 0
        }
        newDate.setHours(hour)
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(val))
      } else if (type === "second") {
        newDate.setSeconds(parseInt(val))
      } else if (type === "ampm") {
        const currentHour = newDate.getHours()
        if (val === "PM" && currentHour < 12) {
          newDate.setHours(currentHour + 12)
        } else if (val === "AM" && currentHour >= 12) {
          newDate.setHours(currentHour - 12)
        }
      }

      setSelectedDate(newDate)
      onChange?.(newDate)
    }

    const getDisplayHour = () => {
      if (!selectedDate) return ""
      const hour = selectedDate.getHours()
      if (use24Hour) return hour.toString()
      return (hour % 12 || 12).toString()
    }

    const getAmPm = () => {
      if (!selectedDate) return "AM"
      return selectedDate.getHours() >= 12 ? "PM" : "AM"
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
            <CalendarIcon {...stylex.props(styles.triggerIcon)} />
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
            <div {...stylex.props(styles.timeRow)}>
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={getDisplayHour() ? getDisplayHour().padStart(2, "0") : ""}
                placeholder="HH"
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "").slice(0, 2)
                  const max = use24Hour ? 23 : 12
                  const min = use24Hour ? 0 : 1
                  const num = parseInt(raw || "0")
                  if (num >= min && num <= max) {
                    handleTimeChange("hour", String(num))
                  }
                }}
                {...stylex.props(styles.timeInput)}
              />
              <span {...stylex.props(styles.separator)}>:</span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={selectedDate ? selectedDate.getMinutes().toString().padStart(2, "0") : ""}
                placeholder="MM"
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "").slice(0, 2)
                  const num = parseInt(raw || "0")
                  if (num >= 0 && num <= 59) {
                    handleTimeChange("minute", String(num))
                  }
                }}
                {...stylex.props(styles.timeInput)}
              />
              {showSeconds && (
                <>
                  <span {...stylex.props(styles.separator)}>:</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    value={selectedDate ? selectedDate.getSeconds().toString().padStart(2, "0") : ""}
                    placeholder="SS"
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "").slice(0, 2)
                      const num = parseInt(raw || "0")
                      if (num >= 0 && num <= 59) {
                        handleTimeChange("second", String(num))
                      }
                    }}
                    {...stylex.props(styles.timeInput)}
                  />
                </>
              )}
              {!use24Hour && (
                <div {...stylex.props(styles.ampmGroup)}>
                  <button
                    type="button"
                    onClick={() => handleTimeChange("ampm", "AM")}
                    {...stylex.props(styles.ampmButton, getAmPm() === "AM" ? styles.ampmButtonActive : styles.ampmButtonInactive)}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTimeChange("ampm", "PM")}
                    {...stylex.props(styles.ampmButton, getAmPm() === "PM" ? styles.ampmButtonActive : styles.ampmButtonInactive)}
                  >
                    PM
                  </button>
                </div>
              )}
            </div>
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
  timeRow: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-sm)",
  },
  timeInput: {
    backgroundColor: "var(--interactive-bg)",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--interactive-fg)",
    fontSize: "var(--font-size-sm)",
    fontVariantNumeric: "tabular-nums",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
    textAlign: "center",
    width: 44,
    ":focus": {
      outline: "none",
      boxShadow: "0 0 0 1px var(--interactive-border)",
    },
  },
  separator: {
    color: "var(--container-fg-alt)",
    fontWeight: 500,
  },
  ampmGroup: {
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    overflow: "hidden",
  },
  ampmButton: {
    borderWidth: 0,
    cursor: "pointer",
    fontSize: "var(--font-size-xs)",
    fontWeight: 500,
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
    transitionDuration: "150ms",
    transitionProperty: "background-color, color",
    transitionTimingFunction: "ease",
  },
  ampmButtonActive: {
    backgroundColor: "var(--interactive-bg-selected)",
    color: "var(--interactive-fg-selected)",
  },
  ampmButtonInactive: {
    backgroundColor: "var(--interactive-bg)",
    color: "var(--interactive-fg-alt)",
    ":hover": {
      color: "var(--interactive-fg)",
    },
  },
})

export { DateTimePicker }
