import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

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

    const hours = use24Hour
      ? Array.from({ length: 24 }, (_, i) => i)
      : Array.from({ length: 12 }, (_, i) => i + 1)

    const minutes = Array.from({ length: 60 }, (_, i) => i)
    const seconds = Array.from({ length: 60 }, (_, i) => i)

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
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Select
                value={getDisplayHour()}
                onValueChange={(val) => handleTimeChange("hour", val)}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((hour) => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-muted-foreground">:</span>
              <Select
                value={selectedDate?.getMinutes().toString() ?? ""}
                onValueChange={(val) => handleTimeChange("minute", val)}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((minute) => (
                    <SelectItem key={minute} value={minute.toString()}>
                      {minute.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {showSeconds && (
                <>
                  <span className="text-muted-foreground">:</span>
                  <Select
                    value={selectedDate?.getSeconds().toString() ?? ""}
                    onValueChange={(val) => handleTimeChange("second", val)}
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="SS" />
                    </SelectTrigger>
                    <SelectContent>
                      {seconds.map((second) => (
                        <SelectItem key={second} value={second.toString()}>
                          {second.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
              {!use24Hour && (
                <Select
                  value={getAmPm()}
                  onValueChange={(val) => handleTimeChange("ampm", val)}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
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
