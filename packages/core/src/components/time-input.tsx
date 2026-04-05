"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"

function pad(n: number) {
  return String(n).padStart(2, "0")
}

const timeInputVariants = cva(
  "inline-flex items-center gap-0.5 rounded-md border bg-background text-sm ring-offset-background transition-colors focus-within:ring-1 focus-within:ring-neutral-400 focus-within:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        default: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface TimeInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof timeInputVariants> {
  /** Time value in "HH:MM" (24h) or "HH:MM AM/PM" (12h) format */
  value?: string
  /** Called when time changes */
  onChange?: (value: string) => void
  /** 12-hour or 24-hour format */
  format?: "12" | "24"
  /** Disabled state */
  disabled?: boolean
  /** Show clock icon */
  showIcon?: boolean
  /** Placeholder text (shown when empty) */
  placeholder?: string
  /** Name attribute for form submission */
  name?: string
}

function parseTimeValue(value: string, format: "12" | "24") {
  if (!value) return { h: format === "12" ? 12 : 0, m: 0, period: "AM" as const }
  const m12 = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  const m24 = value.match(/^(\d{1,2}):(\d{2})$/)
  if (m12) return { h: parseInt(m12[1]), m: parseInt(m12[2]), period: m12[3].toUpperCase() as "AM" | "PM" }
  if (m24) {
    const h = parseInt(m24[1])
    const m = parseInt(m24[2])
    if (format === "12") {
      const period = h >= 12 ? "PM" as const : "AM" as const
      return { h: h === 0 ? 12 : h > 12 ? h - 12 : h, m, period }
    }
    return { h, m, period: "AM" as const }
  }
  return { h: format === "12" ? 12 : 0, m: 0, period: "AM" as const }
}

const TimeInput = React.forwardRef<HTMLDivElement, TimeInputProps>(
  (
    {
      className,
      size,
      value = "",
      onChange,
      format = "24",
      disabled = false,
      showIcon = true,
      placeholder,
      name,
      ...props
    },
    ref
  ) => {
    const parsed = parseTimeValue(value, format)
    const [hours, setHours] = React.useState(parsed.h)
    const [minutes, setMinutes] = React.useState(parsed.m)
    const [period, setPeriod] = React.useState<"AM" | "PM">(parsed.period)
    const [editingH, setEditingH] = React.useState<string | null>(null)
    const [editingM, setEditingM] = React.useState<string | null>(null)

    const minuteRef = React.useRef<HTMLInputElement>(null)

    const maxH = format === "12" ? 12 : 23
    const minH = format === "12" ? 1 : 0

    React.useEffect(() => {
      const p = parseTimeValue(value, format)
      setHours(p.h)
      setMinutes(p.m)
      setPeriod(p.period)
    }, [value, format])

    const emit = React.useCallback(
      (h: number, m: number, p: "AM" | "PM") => {
        if (format === "24") {
          onChange?.(`${pad(h)}:${pad(m)}`)
        } else {
          onChange?.(`${pad(h)}:${pad(m)} ${p}`)
        }
      },
      [format, onChange]
    )

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, 2)
      setEditingH(raw)
      const n = parseInt(raw)
      if (!isNaN(n) && n >= minH && n <= maxH) {
        setHours(n)
        emit(n, minutes, period)
      }
      // Auto-advance to minutes when 2 digits entered
      if (raw.length === 2) {
        minuteRef.current?.focus()
        minuteRef.current?.select()
      }
    }

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, 2)
      setEditingM(raw)
      const n = parseInt(raw)
      if (!isNaN(n) && n >= 0 && n <= 59) {
        setMinutes(n)
        emit(hours, n, period)
      }
    }

    const handleHoursKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        let nh = hours + 1
        if (nh > maxH) nh = minH
        setHours(nh)
        emit(nh, minutes, period)
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        let nh = hours - 1
        if (nh < minH) nh = maxH
        setHours(nh)
        emit(nh, minutes, period)
      }
      if (e.key === ":") {
        e.preventDefault()
        minuteRef.current?.focus()
        minuteRef.current?.select()
      }
    }

    const handleMinutesKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        let nm = minutes + 1
        if (nm > 59) nm = 0
        setMinutes(nm)
        emit(hours, nm, period)
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        let nm = minutes - 1
        if (nm < 0) nm = 59
        setMinutes(nm)
        emit(hours, nm, period)
      }
    }

    const togglePeriod = (newPeriod: "AM" | "PM") => {
      setPeriod(newPeriod)
      emit(hours, minutes, newPeriod)
    }

    const segmentCls =
      "w-7 bg-transparent text-center font-mono tabular-nums outline-none selection:bg-primary/20 rounded px-0.5 focus:bg-accent"

    return (
      <div
        ref={ref}
        className={cn(
          timeInputVariants({ size }),
          "border-input",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        {showIcon && (
          <Clock className="h-4 w-4 text-muted-foreground shrink-0 mr-1" />
        )}

        {/* Hidden input for form submission */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={
              format === "24"
                ? `${pad(hours)}:${pad(minutes)}`
                : `${pad(hours)}:${pad(minutes)} ${period}`
            }
          />
        )}

        {/* Hours segment */}
        <input
          className={segmentCls}
          value={editingH !== null ? editingH : pad(hours)}
          onFocus={(e) => {
            setEditingH(pad(hours))
            requestAnimationFrame(() => e.target.select())
          }}
          onChange={handleHoursChange}
          onBlur={() => {
            const n = parseInt(editingH || "")
            if (!isNaN(n) && n >= minH && n <= maxH) {
              setHours(n)
              emit(n, minutes, period)
            } else {
              setHours(minH)
              emit(minH, minutes, period)
            }
            setEditingH(null)
          }}
          onKeyDown={handleHoursKeyDown}
          disabled={disabled}
          inputMode="numeric"
          maxLength={2}
          aria-label="Hours"
        />

        <span className="text-muted-foreground font-mono select-none">:</span>

        {/* Minutes segment */}
        <input
          ref={minuteRef}
          className={segmentCls}
          value={editingM !== null ? editingM : pad(minutes)}
          onFocus={(e) => {
            setEditingM(pad(minutes))
            requestAnimationFrame(() => e.target.select())
          }}
          onChange={handleMinutesChange}
          onBlur={() => {
            const n = parseInt(editingM || "")
            if (!isNaN(n) && n >= 0 && n <= 59) {
              setMinutes(n)
              emit(hours, n, period)
            } else {
              setMinutes(0)
              emit(hours, 0, period)
            }
            setEditingM(null)
          }}
          onKeyDown={handleMinutesKeyDown}
          disabled={disabled}
          inputMode="numeric"
          maxLength={2}
          aria-label="Minutes"
        />

        {/* AM/PM toggle */}
        {format === "12" && (
          <div className="ml-1 flex border-l pl-1.5 gap-0.5">
            <button
              type="button"
              onClick={() => togglePeriod("AM")}
              disabled={disabled}
              className={cn(
                "rounded px-1.5 py-0.5 text-xs font-medium transition-colors cursor-pointer",
                period === "AM"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              )}
              tabIndex={-1}
            >
              AM
            </button>
            <button
              type="button"
              onClick={() => togglePeriod("PM")}
              disabled={disabled}
              className={cn(
                "rounded px-1.5 py-0.5 text-xs font-medium transition-colors cursor-pointer",
                period === "PM"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              )}
              tabIndex={-1}
            >
              PM
            </button>
          </div>
        )}
      </div>
    )
  }
)
TimeInput.displayName = "TimeInput"

export { TimeInput }
