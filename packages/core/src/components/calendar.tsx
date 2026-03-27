"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(
    props.defaultMonth ?? (props.month as Date) ?? new Date()
  )

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ]

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      month={month}
      onMonthChange={setMonth}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-3",
        month_caption: "flex justify-center pt-1 relative items-center gap-2",
        caption_label: "hidden",
        nav: "flex items-center gap-1",
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-1 h-7 w-7 p-0 opacity-50 hover:opacity-100"
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-1 h-7 w-7 p-0 opacity-50 hover:opacity-100"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-[var(--foregrounds-quinary)] rounded-md w-9 font-normal text-[0.75rem] text-center",
        week: "flex w-full mt-1",
        day: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([aria-selected].day-range-end)]:rounded-r-lg",
          "[&:has([aria-selected].day-outside)]:bg-[var(--backgrounds-tertiary)]/50",
          "first:[&:has([aria-selected])]:rounded-l-lg",
          "last:[&:has([aria-selected])]:rounded-r-lg",
          "focus-within:relative focus-within:z-20"
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal rounded-lg aria-selected:opacity-100"
        ),
        range_end: "day-range-end",
        selected: cn(
          "bg-[var(--interactive-bg-active)] text-[var(--interactive-fg-active)] rounded-lg",
          "hover:bg-[var(--interactive-bg-active)]/80 focus:bg-[var(--interactive-bg-active)]"
        ),
        today: "bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-primary)] font-semibold rounded-lg",
        outside: "day-outside text-[var(--foregrounds-quinary)] opacity-50 aria-selected:bg-[var(--backgrounds-tertiary)]/50 aria-selected:text-[var(--foregrounds-tertiary)]",
        disabled: "text-[var(--foregrounds-quinary)] opacity-30",
        range_middle: "aria-selected:bg-[var(--backgrounds-tertiary)] aria-selected:text-[var(--foregrounds-primary)] rounded-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
        MonthCaption: ({ calendarMonth }) => (
          <div className="flex items-center gap-1.5 px-8">
            <Select
              value={String(calendarMonth.date.getMonth())}
              onValueChange={(v) => {
                const d = new Date(month)
                d.setMonth(Number(v))
                setMonth(d)
              }}
            >
              <SelectTrigger className="h-7 w-[110px] text-xs border-none shadow-none px-2 focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((m, i) => (
                  <SelectItem key={i} value={String(i)} className="text-xs">{m}</SelectItem>
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
              <SelectTrigger className="h-7 w-[70px] text-xs border-none shadow-none px-2 focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={String(y)} className="text-xs">{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
