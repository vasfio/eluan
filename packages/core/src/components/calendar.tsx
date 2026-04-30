"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  disabled,
  ...props
}: CalendarProps & { disabled?: boolean }) {
  const [month, setMonth] = React.useState<Date>(
    props.defaultMonth ?? (props.month as Date) ?? new Date()
  )

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ]

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)

  const goToPreviousMonth = () => {
    const d = new Date(month)
    d.setMonth(d.getMonth() - 1)
    setMonth(d)
  }

  const goToNextMonth = () => {
    const d = new Date(month)
    d.setMonth(d.getMonth() + 1)
    setMonth(d)
  }

  // Detect whether the range has both endpoints selected. `selected` is only
  // present on the discriminated union when `mode` is "range" (or "single" /
  // "multiple"), so we cast to a loose shape to read it without TS narrowing
  // every variant of DayPickerProps.
  const sel = (props as { selected?: { from?: unknown; to?: unknown } | unknown }).selected
  const hasCompleteRange = Boolean(
    props.mode === "range" &&
      sel &&
      typeof sel === "object" &&
      "from" in sel &&
      "to" in sel &&
      sel.from &&
      sel.to
  )

  return (
    <div
      className={cn(
        "flex items-center gap-[var(--spacing-xxs)] py-[var(--spacing-md)]",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      aria-disabled={disabled || undefined}
      data-range-complete={hasCompleteRange ? "" : undefined}
    >
      <Button
        variant="ghost"
        onClick={goToPreviousMonth}
        disabled={disabled}
        className="h-7 w-7 p-0 shrink-0 ml-[var(--spacing-xs)]"
      >
        <ChevronLeft className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </Button>
      <DayPicker
        showOutsideDays={showOutsideDays}
        disabled={disabled || undefined}
        month={month}
        onMonthChange={disabled ? undefined : setMonth}
        hideNavigation
        className="p-3"
        classNames={{
          months: "flex flex-col sm:flex-row gap-[var(--spacing-lg)] sm:[&>div+div]:border-l sm:[&>div+div]:border-[var(--backgrounds-quaternary)] sm:[&>div+div]:pl-[var(--spacing-lg)]",
          month: "flex flex-col gap-[var(--spacing-lg)]",
          month_caption: "flex justify-center pt-[var(--spacing-xxs)] items-center gap-[var(--spacing-xs)]",
          caption_label: "hidden",
          month_grid: "w-full border-collapse",
          weekdays: "flex",
          weekday: "text-[color:var(--interactive-fg-alt)] rounded-[var(--curves-lg)] w-[var(--size-lg)] font-light text-[0.75rem] text-center",
          week: "flex w-full mt-1",
          day: cn(
            "h-[var(--size-lg)] w-[var(--size-lg)] text-center text-[length:var(--font-size-sm)] p-0 relative",
            "[&:has([aria-selected].day-range-end)]:rounded-r-[var(--curves-lg)]",
            "[&:has([aria-selected].day-outside)]:bg-[var(--interactive-bg-alt2)]",
            "first:[&:has([aria-selected])]:rounded-l-[var(--curves-lg)]",
            "last:[&:has([aria-selected])]:rounded-r-[var(--curves-lg)]",
            "focus-within:relative focus-within:z-20"
          ),
          day_button: cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-[inherit] text-[length:var(--font-size-sm)] font-normal transition-all",
            "h-[var(--size-lg)] w-[var(--size-lg)] p-0 text-inherit hover:bg-[var(--interactive-bg-hover)] hover:rounded-[var(--curves-lg)]",
            "[html[data-theme='industrial-retro']_&]:font-mono [html[data-theme='minimal']_&]:font-mono"
          ),
          range_start: cn(
            "day-range-start bg-[var(--interactive-bg-selected)] text-[color:var(--interactive-fg-selected)]",
            "rounded-[var(--curves-lg)]",
            "[[data-range-complete]_&]:rounded-r-none [[data-range-complete]_&]:rounded-l-[var(--curves-lg)]"
          ),
          range_end: "day-range-end bg-[var(--interactive-bg-selected)] text-[color:var(--interactive-fg-selected)] rounded-r-[var(--curves-lg)] rounded-l-none",
          selected: cn(
            "bg-[var(--interactive-bg-selected)] text-[color:var(--interactive-fg-selected)] rounded-[var(--curves-lg)]",
            "[&>button:hover]:bg-[var(--action-primary-bg-hover)] [&>button:hover]:text-[color:var(--interactive-fg-selected)]",
            "focus:ring-[var(--interactive-border)]"
          ),
          today: cn(
            "font-semibold",
            "[&>button]:relative [&>button]:after:content-[''] [&>button]:after:absolute [&>button]:after:bottom-2 [&>button]:after:left-1/2 [&>button]:after:-translate-x-1/2 [&>button]:after:w-3 [&>button]:after:h-0.5 [&>button]:after:rounded-full [&>button]:after:bg-current"
          ),
          outside: "day-outside text-[color:var(--interactive-fg-disabled)] aria-selected:bg-[var(--interactive-bg-alt2)] aria-selected:text-[color:var(--interactive-fg-selected)]",
          disabled: "text-[color:var(--interactive-fg-disabled)] cursor-not-allowed",
          range_middle: "aria-selected:bg-[var(--interactive-bg-alt2)] aria-selected:text-[color:var(--interactive-fg-alt)] !rounded-none",
          hidden: "invisible",
          ...classNames,
        }}
        components={{
          MonthCaption: ({ calendarMonth }) => (
            <div className="flex items-center justify-center gap-[var(--spacing-sm)] px-[var(--spacing-lg)]">
              <Select
                value={String(calendarMonth.date.getMonth())}
                onValueChange={(v) => {
                  const d = new Date(month)
                  d.setMonth(Number(v))
                  setMonth(d)
                }}
              >
                <SelectTrigger className="h-7 flex-1 text-[length:var(--font-size-xs)] border-none shadow-none px-[var(--spacing-xs)] focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="min-w-0 w-auto [&_[role=listbox]]:w-auto [&_[role=listbox]]:min-w-0">
                  {months.map((m, i) => (
                    <SelectItem key={i} value={String(i)} className="text-[length:var(--font-size-xs)]">{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={String(calendarMonth.date.getFullYear())}
                onValueChange={(v) => {
                  const d = new Date(month)
                  d.setFullYear(Number(v))
                  setMonth(d)
                }}
              >
                <SelectTrigger className="h-7 flex-1 text-[length:var(--font-size-xs)] border-none shadow-none px-[var(--spacing-xs)] focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="min-w-0 w-auto [&_[role=listbox]]:w-auto [&_[role=listbox]]:min-w-0">
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)} className="text-[length:var(--font-size-xs)]">{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ),
        }}
        {...props}
      />
      <Button
        variant="ghost"
        onClick={goToNextMonth}
        disabled={disabled}
        className="h-7 w-7 p-0 shrink-0 mr-[var(--spacing-xs)]"
      >
        <ChevronRight className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
      </Button>
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
