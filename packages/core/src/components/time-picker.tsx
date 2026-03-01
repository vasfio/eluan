import * as React from "react"
import { Clock, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TimePickerProps {
  value?: string
  onChange?: (value: string) => void
  format?: "12" | "24"
  minuteStep?: number
  disabled?: boolean
  className?: string
  placeholder?: string
}

export interface TimePickerInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  value?: string
  onChange?: (value: string) => void
  format?: "12" | "24"
}

function parseTime(
  value: string,
  format: "12" | "24"
): { hours: number; minutes: number; period: "AM" | "PM" } | null {
  const match24 = value.match(/^(\d{1,2}):(\d{2})$/)
  const match12 = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)

  if (match24 && format === "24") {
    const hours = parseInt(match24[1], 10)
    const minutes = parseInt(match24[2], 10)
    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      return { hours, minutes, period: hours >= 12 ? "PM" : "AM" }
    }
  }

  if (match12 && format === "12") {
    const hours = parseInt(match12[1], 10)
    const minutes = parseInt(match12[2], 10)
    const period = match12[3].toUpperCase() as "AM" | "PM"
    if (hours >= 1 && hours <= 12 && minutes >= 0 && minutes <= 59) {
      return { hours, minutes, period }
    }
  }

  return null
}

function formatTime(
  hours: number,
  minutes: number,
  format: "12" | "24",
  period?: "AM" | "PM"
): string {
  const paddedMinutes = minutes.toString().padStart(2, "0")

  if (format === "24") {
    return `${hours.toString().padStart(2, "0")}:${paddedMinutes}`
  }

  const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  const p = period || (hours >= 12 ? "PM" : "AM")
  return `${hour12}:${paddedMinutes} ${p}`
}

const TimePickerInput = React.forwardRef<HTMLInputElement, TimePickerInputProps>(
  ({ className, value = "", onChange, format = "24", ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }

    return (
      <div className="relative">
        <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
            className
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          placeholder={format === "24" ? "HH:MM" : "HH:MM AM"}
          {...props}
        />
      </div>
    )
  }
)
TimePickerInput.displayName = "TimePickerInput"

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      format = "24",
      minuteStep = 1,
      disabled = false,
      className,
      placeholder,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [hours, setHours] = React.useState(format === "24" ? 0 : 12)
    const [minutes, setMinutes] = React.useState(0)
    const [period, setPeriod] = React.useState<"AM" | "PM">("AM")
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (value) {
        const parsed = parseTime(value, format)
        if (parsed) {
          if (format === "12") {
            setHours(parsed.hours === 0 ? 12 : parsed.hours > 12 ? parsed.hours - 12 : parsed.hours)
          } else {
            setHours(parsed.hours)
          }
          setMinutes(parsed.minutes)
          setPeriod(parsed.period)
        }
      }
    }, [value, format])

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const updateTime = (newHours: number, newMinutes: number, newPeriod: "AM" | "PM") => {
      let h = newHours
      if (format === "12") {
        if (newPeriod === "PM" && h !== 12) h += 12
        if (newPeriod === "AM" && h === 12) h = 0
      }
      const formatted = formatTime(h, newMinutes, format, format === "12" ? newPeriod : undefined)
      onChange?.(formatted)
    }

    const incrementHours = () => {
      const max = format === "24" ? 23 : 12
      const min = format === "24" ? 0 : 1
      const newHours = hours >= max ? min : hours + 1
      setHours(newHours)
      updateTime(newHours, minutes, period)
    }

    const decrementHours = () => {
      const max = format === "24" ? 23 : 12
      const min = format === "24" ? 0 : 1
      const newHours = hours <= min ? max : hours - 1
      setHours(newHours)
      updateTime(newHours, minutes, period)
    }

    const incrementMinutes = () => {
      const newMinutes = (minutes + minuteStep) % 60
      setMinutes(newMinutes)
      updateTime(hours, newMinutes, period)
    }

    const decrementMinutes = () => {
      const newMinutes = minutes - minuteStep < 0 ? 60 - minuteStep : minutes - minuteStep
      setMinutes(newMinutes)
      updateTime(hours, newMinutes, period)
    }

    const togglePeriod = () => {
      const newPeriod = period === "AM" ? "PM" : "AM"
      setPeriod(newPeriod)
      updateTime(hours, minutes, newPeriod)
    }

    const displayValue = value || (
      format === "24"
        ? `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
        : `${hours}:${minutes.toString().padStart(2, "0")} ${period}`
    )

    return (
      <div ref={containerRef} className={cn("relative", className)}>
        <div
          className={cn(
            "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            disabled && "cursor-not-allowed opacity-50",
            !disabled && "cursor-pointer hover:bg-accent/50"
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className={cn("font-mono", !value && "text-muted-foreground")}>
            {value || placeholder || (format === "24" ? "00:00" : "12:00 AM")}
          </span>
        </div>

        {isOpen && !disabled && (
          <div
            ref={ref}
            className="absolute z-50 mt-1 rounded-md border bg-popover p-3 shadow-md"
          >
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className="p-1 hover:bg-accent rounded"
                  onClick={incrementHours}
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-2xl font-mono">
                  {hours.toString().padStart(2, "0")}
                </span>
                <button
                  type="button"
                  className="p-1 hover:bg-accent rounded"
                  onClick={decrementHours}
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <span className="text-2xl font-mono">:</span>

              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className="p-1 hover:bg-accent rounded"
                  onClick={incrementMinutes}
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-2xl font-mono">
                  {minutes.toString().padStart(2, "0")}
                </span>
                <button
                  type="button"
                  className="p-1 hover:bg-accent rounded"
                  onClick={decrementMinutes}
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {format === "12" && (
                <div className="flex flex-col items-center ml-2">
                  <button
                    type="button"
                    className="p-1 hover:bg-accent rounded"
                    onClick={togglePeriod}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-lg font-mono">
                    {period}
                  </span>
                  <button
                    type="button"
                    className="p-1 hover:bg-accent rounded"
                    onClick={togglePeriod}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button
                type="button"
                className="px-3 py-1 text-sm rounded-md hover:bg-accent"
                onClick={() => {
                  const now = new Date()
                  const currentHours = now.getHours()
                  const currentMinutes = now.getMinutes()
                  if (format === "12") {
                    setHours(currentHours === 0 ? 12 : currentHours > 12 ? currentHours - 12 : currentHours)
                    setPeriod(currentHours >= 12 ? "PM" : "AM")
                  } else {
                    setHours(currentHours)
                  }
                  setMinutes(currentMinutes)
                  updateTime(
                    format === "12" ? (currentHours === 0 ? 12 : currentHours > 12 ? currentHours - 12 : currentHours) : currentHours,
                    currentMinutes,
                    currentHours >= 12 ? "PM" : "AM"
                  )
                }}
              >
                Now
              </button>
              <button
                type="button"
                className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
)
TimePicker.displayName = "TimePicker"

export { TimePicker, TimePickerInput }
