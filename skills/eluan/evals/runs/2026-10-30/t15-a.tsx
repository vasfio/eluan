"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { RotateCcw } from "lucide-react";
import {
  Button,
  DateRangePicker,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@eluan/core";

/**
 * Whatever DateRangePicker takes and emits: a `{ from, to }` pair, or
 * `undefined` when nothing is picked. Derived from the component so this file
 * doesn't need its own react-day-picker import. While the user is mid-pick,
 * `to` can still be undefined.
 */
export type DateRangeValue = React.ComponentProps<typeof DateRangePicker>["value"];

export interface StatusOption {
  value: string;
  label: string;
}

export interface FilterValues {
  dateRange: DateRangeValue;
  /** One of the status option values, or `ALL_STATUSES` when status isn't filtered. */
  status: string;
}

export interface FilterBarProps {
  /** Controlled filters. Leave it out to let the bar manage its own state. */
  value?: FilterValues;
  /** Starting filters when uncontrolled. Reset also returns the bar to these. */
  defaultValue?: FilterValues;
  onValueChange?: (filters: FilterValues) => void;
  statusOptions?: readonly StatusOption[];
  /** Accessible name for the whole bar. */
  "aria-label"?: string;
}

/**
 * Radix Select keeps "" for "no selection" and won't take it as an item value,
 * so "all statuses" needs a real value of its own. Status option values must
 * not use it.
 */
export const ALL_STATUSES = "all";

export const EMPTY_FILTERS: FilterValues = {
  dateRange: undefined,
  status: ALL_STATUSES,
};

const DEFAULT_STATUS_OPTIONS: readonly StatusOption[] = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

function isSameDate(a: Date | undefined, b: Date | undefined) {
  return a?.getTime() === b?.getTime();
}

function isSameFilters(a: FilterValues, b: FilterValues) {
  return (
    a.status === b.status &&
    isSameDate(a.dateRange?.from, b.dateRange?.from) &&
    isSameDate(a.dateRange?.to, b.dateRange?.to)
  );
}

const styles = stylex.create({
  bar: {
    display: "flex",
    flexWrap: "wrap",
    // Labels sit above their controls, so line up the bottoms. That keeps the
    // label-less Reset button level with the controls instead of the labels.
    alignItems: "flex-end",
    gap: "var(--spacing-md)",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    minWidth: 0,
  },
  // Eluan triggers fill their container, so the field sets the width. Both
  // sizes leave room for the larger controls at data-spacing="wide".
  dateField: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "16rem",
    maxWidth: "22rem",
  },
  statusField: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "12rem",
    minWidth: "10rem",
  },
});

export default function FilterBar({
  value,
  defaultValue = EMPTY_FILTERS,
  onValueChange,
  statusOptions = DEFAULT_STATUS_OPTIONS,
  "aria-label": ariaLabel = "Filters",
}: FilterBarProps) {
  const [uncontrolled, setUncontrolled] = React.useState<FilterValues>(defaultValue);
  const isControlled = value !== undefined;
  const filters = isControlled ? value : uncontrolled;

  const id = React.useId();
  const dateLabelId = `${id}-date-label`;
  const statusId = `${id}-status`;
  const statusTriggerRef = React.useRef<HTMLButtonElement>(null);

  const commit = (next: FilterValues) => {
    if (!isControlled) setUncontrolled(next);
    onValueChange?.(next);
  };

  const canReset = !isSameFilters(filters, defaultValue);

  const handleReset = () => {
    commit(defaultValue);
    // Reset disables itself once there's nothing left to reset. If focus
    // stayed on it, keyboard and screen-reader users would drop to <body>,
    // so move focus to the nearest control first.
    statusTriggerRef.current?.focus();
  };

  return (
    <div role="group" aria-label={ariaLabel} {...stylex.props(styles.bar)}>
      {/* DateRangePicker has no documented id or aria props, so it can't be
          tied to a label with htmlFor. The group gives it its name instead. */}
      <div
        role="group"
        aria-labelledby={dateLabelId}
        {...stylex.props(styles.field, styles.dateField)}
      >
        <Label id={dateLabelId}>Date range</Label>
        <DateRangePicker
          value={filters.dateRange}
          onValueChange={(dateRange) => commit({ ...filters, dateRange })}
          placeholder="Any date"
          dateFormat="PP"
        />
      </div>

      <div {...stylex.props(styles.field, styles.statusField)}>
        <Label htmlFor={statusId}>Status</Label>
        <Select
          value={filters.status}
          onValueChange={(status) => commit({ ...filters, status })}
        >
          <SelectTrigger id={statusId} ref={statusTriggerRef}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_STATUSES}>All statuses</SelectItem>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button variant="ghost" onClick={handleReset} disabled={!canReset}>
        <RotateCcw size={16} aria-hidden />
        Reset
      </Button>
    </div>
  );
}
