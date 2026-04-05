import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
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
  className?: string
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
      className,
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
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, dateTimeFormat)
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="border-t p-3">
            <div className="flex items-center gap-2">
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
                className="w-[44px] rounded-md border border-input bg-background px-2 py-1.5 text-sm text-center tabular-nums focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <span className="text-muted-foreground font-medium">:</span>
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
                className="w-[44px] rounded-md border border-input bg-background px-2 py-1.5 text-sm text-center tabular-nums focus:outline-none focus:ring-1 focus:ring-ring"
              />
              {showSeconds && (
                <>
                  <span className="text-muted-foreground font-medium">:</span>
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
                    className="w-[44px] rounded-md border border-input bg-background px-2 py-1.5 text-sm text-center tabular-nums focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </>
              )}
              {!use24Hour && (
                <div className="flex rounded-md border border-input overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleTimeChange("ampm", "AM")}
                    className={cn(
                      "px-2.5 py-1.5 text-xs font-medium transition-colors",
                      getAmPm() === "AM"
                        ? "bg-foreground text-background"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTimeChange("ampm", "PM")}
                    className={cn(
                      "px-2.5 py-1.5 text-xs font-medium transition-colors",
                      getAmPm() === "PM"
                        ? "bg-foreground text-background"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
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

export { DateTimePicker }
