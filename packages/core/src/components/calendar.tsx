"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { Button } from "./button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  showOutsideDays = true,
  disabled,
  components,
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
      {...stylex.props(styles.root, disabled && styles.disabled)}
      aria-disabled={disabled || undefined}
      data-range-complete={hasCompleteRange ? "" : undefined}
    >
      <style>{calendarStyles}</style>
      <span {...stylex.props(styles.previousButton)}>
        <Button
          variant="ghost"
          size="xsIcon"
          onClick={goToPreviousMonth}
          disabled={disabled}
        >
          <ChevronLeft {...stylex.props(styles.navIcon)} />
        </Button>
      </span>
      <DayPicker
        showOutsideDays={showOutsideDays}
        disabled={disabled || undefined}
        month={month}
        onMonthChange={disabled ? undefined : setMonth}
        hideNavigation
        {...props}
        className={sx(styles.dayPicker)}
        classNames={{
          months: sx(styles.months),
          month: sx(styles.month),
          month_caption: sx(styles.monthCaption),
          caption_label: sx(styles.captionLabel),
          month_grid: sx(styles.monthGrid),
          weekdays: sx(styles.weekdays),
          weekday: sx(styles.weekday),
          week: sx(styles.week),
          day: `${sx(styles.day)} eluan-calendar-day`,
          day_button: `${sx(styles.dayButton)} eluan-calendar-day-button`,
          range_start: `${sx(styles.rangeStart)} day-range-start eluan-calendar-range-start`,
          range_end: `${sx(styles.rangeEnd)} day-range-end eluan-calendar-range-end`,
          selected: `${sx(styles.selected)} eluan-calendar-selected`,
          today: `${sx(styles.today)} eluan-calendar-today`,
          outside: `${sx(styles.outside)} day-outside`,
          disabled: sx(styles.dayDisabled),
          range_middle: sx(styles.rangeMiddle),
          hidden: sx(styles.hidden),
        }}
        components={{
          ...components,
          MonthCaption: ({ calendarMonth }) => (
            <div {...stylex.props(styles.captionControls)}>
              <Select
                value={String(calendarMonth.date.getMonth())}
                onValueChange={(v) => {
                  const d = new Date(month)
                  d.setMonth(Number(v))
                  setMonth(d)
                }}
              >
                <SelectTrigger variant="calendarCaption">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent layout="auto">
                  {months.map((m, i) => (
                    <SelectItem key={i} value={String(i)} size="compact">{m}</SelectItem>
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
                <SelectTrigger variant="calendarCaption">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent layout="auto">
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)} size="compact">{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ),
        }}
      />
      <span {...stylex.props(styles.nextButton)}>
        <Button
          variant="ghost"
          size="xsIcon"
          onClick={goToNextMonth}
          disabled={disabled}
        >
          <ChevronRight {...stylex.props(styles.navIcon)} />
        </Button>
      </span>
    </div>
  )
}
Calendar.displayName = "Calendar"

function sx(...stylesToApply: stylex.StyleXStyles[]) {
  return stylex.props(...stylesToApply).className ?? ""
}

const styles = stylex.create({
  root: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-xxs)",
    paddingBlock: "var(--spacing-md)",
  },
  disabled: {
    opacity: 0.5,
    pointerEvents: "none",
  },
  previousButton: {
    flexShrink: 0,
    marginLeft: "var(--spacing-xs)",
  },
  nextButton: {
    flexShrink: 0,
    marginRight: "var(--spacing-xs)",
  },
  navIcon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  dayPicker: {
    padding: 12,
  },
  months: {
    display: "flex",
    flexDirection: {
      default: "column",
      "@media (min-width: 640px)": "row",
    },
    gap: "var(--spacing-lg)",
  },
  month: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-lg)",
  },
  monthCaption: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-xs)",
    justifyContent: "center",
    paddingTop: "var(--spacing-xxs)",
  },
  captionLabel: {
    display: "none",
  },
  monthGrid: {
    borderCollapse: "collapse",
    width: "100%",
  },
  weekdays: {
    display: "flex",
  },
  weekday: {
    borderRadius: "var(--curves-lg)",
    color: "var(--interactive-fg-alt)",
    fontSize: "0.75rem",
    fontWeight: 300,
    textAlign: "center",
    width: "var(--size-lg)",
  },
  week: {
    display: "flex",
    marginTop: 4,
    width: "100%",
  },
  day: {
    fontSize: "var(--font-size-sm)",
    height: "var(--size-lg)",
    padding: 0,
    position: "relative",
    textAlign: "center",
    width: "var(--size-lg)",
  },
  dayButton: {
    alignItems: "center",
    borderRadius: "inherit",
    display: "inline-flex",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 400,
    height: "var(--size-lg)",
    justifyContent: "center",
    padding: 0,
    transitionDuration: "150ms",
    transitionProperty: "background-color, border-radius, color",
    transitionTimingFunction: "ease",
    whiteSpace: "nowrap",
    width: "var(--size-lg)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
      borderRadius: "var(--curves-lg)",
    },
  },
  rangeStart: {
    backgroundColor: "var(--interactive-bg-selected)",
    borderRadius: "var(--curves-lg)",
    color: "var(--interactive-fg-selected)",
  },
  rangeEnd: {
    backgroundColor: "var(--interactive-bg-selected)",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: "var(--curves-lg)",
    borderTopLeftRadius: 0,
    borderTopRightRadius: "var(--curves-lg)",
    color: "var(--interactive-fg-selected)",
  },
  selected: {
    backgroundColor: "var(--interactive-bg-selected)",
    borderRadius: "var(--curves-lg)",
    color: "var(--interactive-fg-selected)",
  },
  today: {
    fontWeight: 600,
  },
  outside: {
    color: "var(--interactive-fg-disabled)",
  },
  dayDisabled: {
    color: "var(--interactive-fg-disabled)",
    cursor: "not-allowed",
  },
  rangeMiddle: {
    borderRadius: 0,
  },
  hidden: {
    visibility: "hidden",
  },
  captionControls: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-sm)",
    justifyContent: "center",
    paddingInline: "var(--spacing-lg)",
  },
})

const calendarStyles = `
@media (min-width: 640px) {
  .${sx(styles.months)} > div + div {
    border-left: 1px solid var(--backgrounds-quaternary);
    padding-left: var(--spacing-lg);
  }
}
.eluan-calendar-day:has([aria-selected].day-range-end) {
  border-bottom-right-radius: var(--curves-lg);
  border-top-right-radius: var(--curves-lg);
}
.eluan-calendar-day:has([aria-selected].day-range-end) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.eluan-calendar-day:has([aria-selected].day-outside) {
  background-color: var(--interactive-bg-alt2);
}
.eluan-calendar-day:first-child:has([aria-selected]) {
  border-bottom-left-radius: var(--curves-lg);
  border-top-left-radius: var(--curves-lg);
}
.eluan-calendar-day:last-child:has([aria-selected]) {
  border-bottom-right-radius: var(--curves-lg);
  border-top-right-radius: var(--curves-lg);
}
.eluan-calendar-day:focus-within {
  position: relative;
  z-index: 20;
}
[data-range-complete] .eluan-calendar-range-start {
  border-bottom-left-radius: var(--curves-lg);
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--curves-lg);
  border-top-right-radius: 0;
}
.eluan-calendar-selected > button:hover {
  background-color: var(--action-primary-bg-hover);
  color: var(--interactive-fg-selected);
}
.eluan-calendar-selected:focus {
  box-shadow: 0 0 0 1px var(--interactive-border);
}
.eluan-calendar-today > button {
  position: relative;
}
.eluan-calendar-today > button::after {
  background-color: currentColor;
  border-radius: var(--radius-radius-full);
  bottom: 0.5rem;
  content: "";
  height: 0.125rem;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 0.75rem;
}
.day-outside[aria-selected] {
  background-color: var(--interactive-bg-alt2);
  color: var(--interactive-fg-selected);
}
.${sx(styles.rangeMiddle)}[aria-selected] {
  background-color: var(--interactive-bg-alt2);
  color: var(--interactive-fg-alt);
}
`

export { Calendar }
