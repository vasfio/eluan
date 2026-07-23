"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Clock } from "lucide-react"

import { Toggle } from "./toggle"

function pad(n: number) {
  return String(n).padStart(2, "0")
}

const timeInputVariants = () => ""

export interface TimeInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style" | "onChange"> {
  /**
   * Time value. When `showSeconds` is false: "HH:MM" (24h) or "HH:MM AM/PM"
   * (12h). When `showSeconds` is true: "HH:MM:SS" (24h) or "HH:MM:SS AM/PM"
   * (12h).
   */
  value?: string
  /** Called when time changes */
  onChange?: (value: string) => void
  /** 12-hour or 24-hour format */
  format?: "12" | "24"
  /** Disabled state */
  disabled?: boolean
  /** Show clock icon */
  showIcon?: boolean
  /** Show a seconds segment (adds `:SS` to the value) */
  showSeconds?: boolean
  /** Placeholder text (shown when empty) */
  placeholder?: string
  /** Name attribute for form submission */
  name?: string
  size?: "default"
}

function parseTimeValue(value: string, format: "12" | "24") {
  if (!value) return { h: format === "12" ? 12 : 0, m: 0, s: 0, period: "AM" as const }
  const m12 = value.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i)
  const m24 = value.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/)
  if (m12) {
    return {
      h: parseInt(m12[1]),
      m: parseInt(m12[2]),
      s: m12[3] ? parseInt(m12[3]) : 0,
      period: m12[4].toUpperCase() as "AM" | "PM",
    }
  }
  if (m24) {
    const h = parseInt(m24[1])
    const m = parseInt(m24[2])
    const s = m24[3] ? parseInt(m24[3]) : 0
    if (format === "12") {
      const period = h >= 12 ? "PM" as const : "AM" as const
      return { h: h === 0 ? 12 : h > 12 ? h - 12 : h, m, s, period }
    }
    return { h, m, s, period: "AM" as const }
  }
  return { h: format === "12" ? 12 : 0, m: 0, s: 0, period: "AM" as const }
}

const TimeInput = React.forwardRef<HTMLDivElement, TimeInputProps>(
  (
    {
      value = "",
      onChange,
      format = "24",
      disabled = false,
      showIcon = true,
      showSeconds = false,
      placeholder: _placeholder,
      name,
      size: _size,
      ...props
    },
    ref
  ) => {
    const parsed = parseTimeValue(value, format)
    const [hours, setHours] = React.useState(parsed.h)
    const [minutes, setMinutes] = React.useState(parsed.m)
    const [seconds, setSeconds] = React.useState(parsed.s)
    const [period, setPeriod] = React.useState<"AM" | "PM">(parsed.period)
    const [editingH, setEditingH] = React.useState<string | null>(null)
    const [editingM, setEditingM] = React.useState<string | null>(null)
    const [editingS, setEditingS] = React.useState<string | null>(null)

    const minuteRef = React.useRef<HTMLInputElement>(null)
    const secondRef = React.useRef<HTMLInputElement>(null)
    // When a segment gains focus (or is reset via arrow keys) its display
    // shows the current padded value. The next digit typed should START a
    // fresh entry rather than append to the existing digits, so we track a
    // "fresh" flag per segment and take only the newest digit on that first
    // keystroke. This avoids the truncation bug where typing over a
    // pre-filled 2-digit value produced a stale value and auto-advanced.
    const hoursFreshRef = React.useRef(true)
    const minutesFreshRef = React.useRef(true)
    const secondsFreshRef = React.useRef(true)

    const maxH = format === "12" ? 12 : 23
    const minH = format === "12" ? 1 : 0

    React.useEffect(() => {
      const p = parseTimeValue(value, format)
      setHours(p.h)
      setMinutes(p.m)
      setSeconds(p.s)
      setPeriod(p.period)
    }, [value, format])

    const emit = React.useCallback(
      (h: number, m: number, s: number, p: "AM" | "PM") => {
        const sec = showSeconds ? `:${pad(s)}` : ""
        if (format === "24") {
          onChange?.(`${pad(h)}:${pad(m)}${sec}`)
        } else {
          onChange?.(`${pad(h)}:${pad(m)}${sec} ${p}`)
        }
      },
      [format, onChange, showSeconds]
    )

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, "")
      // First keystroke since focus/reset: start a fresh number from the
      // most recently typed digit. After that, accumulate up to two digits.
      const raw = hoursFreshRef.current ? digits.slice(-1) : digits.slice(0, 2)
      hoursFreshRef.current = false
      setEditingH(raw)
      if (raw === "") return
      const n = parseInt(raw)
      if (isNaN(n)) return

      if (n >= minH && n <= maxH) {
        setHours(n)
        emit(n, minutes, seconds, period)
      }

      // Advance only once the value can no longer be extended: either two
      // digits have been entered, or the single first digit is high enough
      // that any second digit would exceed the max (24h: >=3, 12h: >=2).
      const isComplete = raw.length === 2 || n > Math.floor(maxH / 10)
      if (isComplete) {
        // Defer the focus move so React first commits `editingH` for this
        // keystroke. A synchronous focus() would fire the hours `onBlur`
        // with a stale `editingH` closure (the previous digit) and clobber
        // the value that was just entered.
        requestAnimationFrame(() => {
          minuteRef.current?.focus()
          minuteRef.current?.select()
        })
      }
    }

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, "")
      const raw = minutesFreshRef.current ? digits.slice(-1) : digits.slice(0, 2)
      minutesFreshRef.current = false
      setEditingM(raw)
      if (raw === "") return
      const n = parseInt(raw)
      if (!isNaN(n) && n >= 0 && n <= 59) {
        setMinutes(n)
        emit(hours, n, seconds, period)
      }

      // When a seconds segment is present, advance to it once the minutes can
      // no longer be extended (two digits entered, or a first digit >= 6 that
      // can't be the tens place of a valid minute). Mirrors the hours logic.
      if (showSeconds && !isNaN(n)) {
        const isComplete = raw.length === 2 || n > 5
        if (isComplete) {
          requestAnimationFrame(() => {
            secondRef.current?.focus()
            secondRef.current?.select()
          })
        }
      }
    }

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, "")
      const raw = secondsFreshRef.current ? digits.slice(-1) : digits.slice(0, 2)
      secondsFreshRef.current = false
      setEditingS(raw)
      if (raw === "") return
      const n = parseInt(raw)
      if (!isNaN(n) && n >= 0 && n <= 59) {
        setSeconds(n)
        emit(hours, minutes, n, period)
      }
    }

    const handleHoursKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        let nh = hours + 1
        if (nh > maxH) nh = minH
        setHours(nh)
        setEditingH(null)
        hoursFreshRef.current = true
        emit(nh, minutes, seconds, period)
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        let nh = hours - 1
        if (nh < minH) nh = maxH
        setHours(nh)
        setEditingH(null)
        hoursFreshRef.current = true
        emit(nh, minutes, seconds, period)
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
        setEditingM(null)
        minutesFreshRef.current = true
        emit(hours, nm, seconds, period)
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        let nm = minutes - 1
        if (nm < 0) nm = 59
        setMinutes(nm)
        setEditingM(null)
        minutesFreshRef.current = true
        emit(hours, nm, seconds, period)
      }
      if (e.key === ":" && showSeconds) {
        e.preventDefault()
        secondRef.current?.focus()
        secondRef.current?.select()
      }
    }

    const handleSecondsKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        let ns = seconds + 1
        if (ns > 59) ns = 0
        setSeconds(ns)
        setEditingS(null)
        secondsFreshRef.current = true
        emit(hours, minutes, ns, period)
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        let ns = seconds - 1
        if (ns < 0) ns = 59
        setSeconds(ns)
        setEditingS(null)
        secondsFreshRef.current = true
        emit(hours, minutes, ns, period)
      }
    }

    const togglePeriod = (newPeriod: "AM" | "PM") => {
      setPeriod(newPeriod)
      emit(hours, minutes, seconds, newPeriod)
    }

    return (
      <div
        ref={ref}
        {...props}
        {...stylex.props(styles.root, disabled && styles.disabled)}
      >
        {showIcon && <Clock {...stylex.props(styles.icon)} />}

        {name && (
          <input
            type="hidden"
            name={name}
            value={
              format === "24"
                ? `${pad(hours)}:${pad(minutes)}${showSeconds ? `:${pad(seconds)}` : ""}`
                : `${pad(hours)}:${pad(minutes)}${showSeconds ? `:${pad(seconds)}` : ""} ${period}`
            }
          />
        )}

        <input
          {...stylex.props(styles.segment)}
          value={editingH !== null ? editingH : pad(hours)}
          onFocus={(e) => {
            hoursFreshRef.current = true
            requestAnimationFrame(() => e.target.select())
          }}
          onChange={handleHoursChange}
          onBlur={() => {
            if (editingH === null) return
            const n = parseInt(editingH)
            if (!isNaN(n) && n >= minH && n <= maxH) {
              setHours(n)
              emit(n, minutes, seconds, period)
            } else if (!isNaN(n)) {
              const clamped = Math.max(minH, Math.min(maxH, n))
              setHours(clamped)
              emit(clamped, minutes, seconds, period)
            }
            setEditingH(null)
          }}
          onKeyDown={handleHoursKeyDown}
          disabled={disabled}
          inputMode="numeric"
          aria-label="Hours"
        />

        <span {...stylex.props(styles.separator)}>:</span>

        <input
          ref={minuteRef}
          {...stylex.props(styles.segment)}
          value={editingM !== null ? editingM : pad(minutes)}
          onFocus={(e) => {
            minutesFreshRef.current = true
            requestAnimationFrame(() => e.target.select())
          }}
          onChange={handleMinutesChange}
          onBlur={() => {
            if (editingM === null) return
            const n = parseInt(editingM)
            if (!isNaN(n) && n >= 0 && n <= 59) {
              setMinutes(n)
              emit(hours, n, seconds, period)
            } else if (!isNaN(n)) {
              const clamped = Math.max(0, Math.min(59, n))
              setMinutes(clamped)
              emit(hours, clamped, seconds, period)
            }
            setEditingM(null)
          }}
          onKeyDown={handleMinutesKeyDown}
          disabled={disabled}
          inputMode="numeric"
          aria-label="Minutes"
        />

        {showSeconds && (
          <>
            <span {...stylex.props(styles.separator)}>:</span>
            <input
              ref={secondRef}
              {...stylex.props(styles.segment)}
              value={editingS !== null ? editingS : pad(seconds)}
              onFocus={(e) => {
                secondsFreshRef.current = true
                requestAnimationFrame(() => e.target.select())
              }}
              onChange={handleSecondsChange}
              onBlur={() => {
                if (editingS === null) return
                const n = parseInt(editingS)
                if (!isNaN(n) && n >= 0 && n <= 59) {
                  setSeconds(n)
                  emit(hours, minutes, n, period)
                } else if (!isNaN(n)) {
                  const clamped = Math.max(0, Math.min(59, n))
                  setSeconds(clamped)
                  emit(hours, minutes, clamped, period)
                }
                setEditingS(null)
              }}
              onKeyDown={handleSecondsKeyDown}
              disabled={disabled}
              inputMode="numeric"
              aria-label="Seconds"
            />
          </>
        )}

        {format === "12" && (
          <div {...stylex.props(styles.periodToggle)}>
            <Toggle
              pressed={period === "AM"}
              onPressedChange={() => togglePeriod("AM")}
              disabled={disabled}
              size="sm"
              tabIndex={-1}
            >
              AM
            </Toggle>
            <Toggle
              pressed={period === "PM"}
              onPressedChange={() => togglePeriod("PM")}
              disabled={disabled}
              size="sm"
              tabIndex={-1}
            >
              PM
            </Toggle>
          </div>
        )}
      </div>
    )
  }
)
TimeInput.displayName = "TimeInput"

const styles = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--interactive-fg)",
    display: "inline-flex",
    fontSize: "var(--font-size-sm)",
    gap: "var(--spacing-xxs)",
    height: "var(--size-lg)",
    paddingInline: "var(--spacing-md)",
    transitionDuration: "150ms",
    transitionProperty: "background-color, border-color, color, box-shadow",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":focus-within": {
      borderColor: "var(--interactive-border)",
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
  },
  disabled: {
    backgroundColor: "var(--interactive-bg-disabled)",
    color: "var(--interactive-fg-disabled)",
    pointerEvents: "none",
  },
  icon: {
    color: "var(--interactive-fg-alt)",
    flexShrink: 0,
    height: "var(--size-xxs)",
    marginRight: "var(--spacing-xs)",
    width: "var(--size-xxs)",
  },
  segment: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--curves-sm)",
    color: "inherit",
    fontFamily: "var(--font-mono)",
    fontVariantNumeric: "tabular-nums",
    outlineStyle: "none",
    paddingInline: "var(--spacing-xxs)",
    textAlign: "center",
    width: "1.75rem",
    "::selection": {
      backgroundColor: "var(--container-bg-alt)",
    },
    ":focus": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  separator: {
    color: "var(--interactive-fg-alt)",
    fontFamily: "var(--font-mono)",
    userSelect: "none",
  },
  periodToggle: {
    borderLeftColor: "var(--interactive-border)",
    borderLeftStyle: "solid",
    borderLeftWidth: 1,
    display: "flex",
    gap: "var(--spacing-xxs)",
    marginLeft: "var(--spacing-xxs)",
    paddingLeft: "var(--spacing-xs)",
  },
})

export { TimeInput, timeInputVariants }
