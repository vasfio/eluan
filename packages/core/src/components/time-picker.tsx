"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TimePickerProps {
  value?: string          // "HH:MM" or "HH:MM AM/PM"
  onChange?: (value: string) => void
  format?: "12" | "24"
  disabled?: boolean
  className?: string
  placeholder?: string
}

function pad(n: number) { return String(n).padStart(2, "0") }

function parseTime(value: string, format: "12" | "24") {
  if (!value) return { h: format === "12" ? 12 : 0, m: 0, period: "AM" as "AM" | "PM" }
  const m12 = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  const m24 = value.match(/^(\d{1,2}):(\d{2})$/)
  if (m12) return { h: parseInt(m12[1]), m: parseInt(m12[2]), period: m12[3].toUpperCase() as "AM" | "PM" }
  if (m24) {
    const h = parseInt(m24[1]), m = parseInt(m24[2])
    if (format === "12") {
      const period = h >= 12 ? "PM" : "AM"
      return { h: h === 0 ? 12 : h > 12 ? h - 12 : h, m, period }
    }
    return { h, m, period: "AM" as "AM" | "PM" }
  }
  return { h: format === "12" ? 12 : 0, m: 0, period: "AM" as "AM" | "PM" }
}

export function TimePicker({ value = "", onChange, format = "24", disabled, className }: TimePickerProps) {
  const parsed = parseTime(value, format)
  const [h, setH] = React.useState(parsed.h)
  const [m, setM] = React.useState(parsed.m)
  const [period, setPeriod] = React.useState<"AM" | "PM">(parsed.period as "AM" | "PM")

  React.useEffect(() => {
    const p = parseTime(value, format)
    setH(p.h); setM(p.m); setPeriod(p.period as "AM" | "PM")
  }, [value])

  const emit = (nh: number, nm: number, np: "AM" | "PM") => {
    if (format === "24") {
      onChange?.(`${pad(nh)}:${pad(nm)}`)
    } else {
      onChange?.(`${pad(nh)}:${pad(nm)} ${np}`)
    }
  }

  const maxH = format === "12" ? 12 : 23
  const minH = format === "12" ? 1 : 0

  const spinH = (dir: 1 | -1) => {
    let nh = h + dir
    if (nh > maxH) nh = minH
    if (nh < minH) nh = maxH
    setH(nh); emit(nh, m, period)
  }

  const spinM = (dir: 1 | -1) => {
    let nm = m + dir
    if (nm > 59) nm = 0
    if (nm < 0) nm = 59
    setM(nm); emit(h, nm, period)
  }

  const togglePeriod = () => {
    const np: "AM" | "PM" = period === "AM" ? "PM" : "AM"
    setPeriod(np); emit(h, m, np)
  }

  const spinnerCls = "flex flex-col items-center"
  const btnCls = "flex h-6 w-6 items-center justify-center rounded opacity-50 hover:opacity-100 hover:bg-[var(--backgrounds-tertiary)] transition-opacity disabled:pointer-events-none"
  const valCls = "w-9 text-center text-lg font-mono font-medium leading-none py-1 tabular-nums"

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border border-[var(--interactive-border)] bg-[var(--interactive-bg)] px-3 py-2",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <Clock className="h-4 w-4 text-[var(--foregrounds-quinary)] mr-1 shrink-0" />

      {/* Hours */}
      <div className={spinnerCls}>
        <button type="button" className={btnCls} onClick={() => spinH(1)} disabled={disabled}>
          <span className="text-xs">▲</span>
        </button>
        <input
          className={cn(valCls, "bg-transparent outline-none focus:bg-[var(--backgrounds-tertiary)] rounded")}
          value={pad(h)}
          onChange={(e) => {
            const n = parseInt(e.target.value)
            if (!isNaN(n) && n >= minH && n <= maxH) { setH(n); emit(n, m, period) }
          }}
          onBlur={(e) => { const n = parseInt(e.target.value); if (isNaN(n) || n < minH || n > maxH) setH(minH) }}
          disabled={disabled}
          maxLength={2}
        />
        <button type="button" className={btnCls} onClick={() => spinH(-1)} disabled={disabled}>
          <span className="text-xs">▼</span>
        </button>
      </div>

      <span className="text-[var(--foregrounds-quinary)] text-lg font-mono font-bold leading-none pb-px">:</span>

      {/* Minutes */}
      <div className={spinnerCls}>
        <button type="button" className={btnCls} onClick={() => spinM(1)} disabled={disabled}>
          <span className="text-xs">▲</span>
        </button>
        <input
          className={cn(valCls, "bg-transparent outline-none focus:bg-[var(--backgrounds-tertiary)] rounded")}
          value={pad(m)}
          onChange={(e) => {
            const n = parseInt(e.target.value)
            if (!isNaN(n) && n >= 0 && n <= 59) { setM(n); emit(h, n, period) }
          }}
          onBlur={(e) => { const n = parseInt(e.target.value); if (isNaN(n) || n < 0 || n > 59) setM(0) }}
          disabled={disabled}
          maxLength={2}
        />
        <button type="button" className={btnCls} onClick={() => spinM(-1)} disabled={disabled}>
          <span className="text-xs">▼</span>
        </button>
      </div>

      {/* AM/PM toggle */}
      {format === "12" && (
        <button
          type="button"
          onClick={togglePeriod}
          disabled={disabled}
          className="ml-1 rounded-md px-2 py-1 text-xs font-semibold transition-colors bg-[var(--backgrounds-tertiary)] hover:bg-[var(--backgrounds-quaternary)] text-[var(--foregrounds-primary)]"
        >
          {period}
        </button>
      )}
    </div>
  )
}

// Minimal inline time input (type=time native but styled)
export interface TimeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, ...props }, ref) => (
    <div className={cn("relative flex w-full items-center", className)}>
      <Clock className="pointer-events-none absolute left-3 h-4 w-4 text-[var(--foregrounds-quinary)]" />
      <input
        type="time"
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-[var(--interactive-border)] bg-[var(--interactive-bg)]",
          "pl-9 pr-3 py-2 text-sm text-[var(--foregrounds-primary)]",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-fg)] focus-visible:border-[var(--interactive-fg)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&::-webkit-calendar-picker-indicator]:opacity-0"
        )}
        {...props}
      />
    </div>
  )
)
TimeInput.displayName = "TimeInput"
