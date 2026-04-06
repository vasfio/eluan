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
        months: "flex flex-col sm:flex-row gap-[var(--spacing-sm)]",
        month: "flex flex-col gap-3",
        month_caption: "flex justify-center pt-[var(--spacing-xxs)] relative items-center gap-[var(--spacing-xs)]",
        caption_label: "hidden",
        nav: "flex items-center gap-[var(--spacing-xxs)]",
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-1 h-7 w-7 p-0"
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-1 h-7 w-7 p-0"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-[var(--interactive-fg-alt)] rounded-[var(--curves-lg)] w-9 font-normal text-[0.75rem] text-center",
        week: "flex w-full mt-1",
        day: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([aria-selected].day-range-end)]:rounded-r-[var(--curves-lg)]",
          "[&:has([aria-selected].day-outside)]:bg-[var(--interactive-bg-alt2)]",
          "first:[&:has([aria-selected])]:rounded-l-[var(--curves-lg)]",
          "last:[&:has([aria-selected])]:rounded-r-[var(--curves-lg)]",
          "focus-within:relative focus-within:z-20"
        ),
        day_button: cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-[inherit] text-sm font-normal transition-all",
          "h-9 w-9 p-0 text-inherit hover:bg-[var(--interactive-bg-alt)] hover:rounded-[var(--curves-lg)]",
          "[html[data-theme='classic-retro']_&]:font-mono [html[data-theme='classic-black']_&]:font-mono"
        ),
        range_start: "day-range-start bg-[var(--interactive-bg-selected)] text-[var(--interactive-fg-selected)] rounded-l-[var(--curves-lg)] rounded-r-none",
        range_end: "day-range-end bg-[var(--interactive-bg-selected)] text-[var(--interactive-fg-selected)] rounded-r-[var(--curves-lg)] rounded-l-none",
        selected: cn(
          "bg-[var(--interactive-bg-selected)] text-[var(--interactive-fg-selected)] rounded-[var(--curves-lg)]",
          "hover:bg-[var(--interactive-bg-hover)] hover:text-[var(--interactive-fg)] hover:rounded-[var(--curves-lg)] focus:ring-[var(--interactive-border)]"
        ),
        today: "[&>button]:underline [&>button]:underline-offset-4 [&>button]:decoration-2 [&>button]:decoration-[var(--interactive-fg)] font-semibold",
        outside: "day-outside text-[var(--interactive-fg-disabled)] aria-selected:bg-[var(--interactive-bg-alt2)] aria-selected:text-[var(-interactive-fg-selected)]",
        disabled: "text-[var(--interactive-fg-disabled)] cursor-not-allowed",
        range_middle: "aria-selected:bg-[var(--interactive-bg-alt2)] aria-selected:text-[var(--interactive-fg-alt)] !rounded-none",
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
          <div className="flex items-center gap-[var(--spacing-xxs)] px-[var(--spacing-xl)]">
            <Select
              value={String(calendarMonth.date.getMonth())}
              onValueChange={(v) => {
                const d = new Date(month)
                d.setMonth(Number(v))
                setMonth(d)
              }}
            >
              <SelectTrigger className="h-7 w-[110px] text-xs border-none shadow-none px-[var(--spacing-xs)] focus:ring-0">
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
              <SelectTrigger className="h-7 w-[70px] text-xs border-none shadow-none px-[var(--spacing-xs)] focus:ring-0">
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
