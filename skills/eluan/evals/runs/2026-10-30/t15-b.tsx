import * as React from "react";
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

export type DateRange = { from: Date | undefined; to: Date | undefined };

export type StatusOption = {
  /** Unique, non-empty, and not equal to ALL_STATUSES. */
  value: string;
  label: string;
};

export type Filters = {
  dateRange: DateRange;
  /** A StatusOption value, or ALL_STATUSES for no status filter. */
  status: string;
};

/** Sentinel for "no status filter". Select items can't use an empty value. */
export const ALL_STATUSES = "all";

const ANY_DATE: DateRange = { from: undefined, to: undefined };

export const EMPTY_FILTERS: Filters = { dateRange: ANY_DATE, status: ALL_STATUSES };

const DEFAULT_STATUS_OPTIONS: StatusOption[] = [
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "archived", label: "Archived" },
];

export type FilterBarProps = {
  /** Controlled filters. Omit to let the bar keep its own state. */
  value?: Filters;
  /** Initial filters when uncontrolled. */
  defaultValue?: Filters;
  /** Called with the full filter set on every change, including reset. */
  onValueChange?: (filters: Filters) => void;
  /** Statuses to filter by. "All statuses" is always listed first. */
  statusOptions?: StatusOption[];
  /** Visible label for the date range field. */
  dateLabel?: string;
};

// Layout only: Eluan components take no className/style, so these go on wrappers we own.
const styles = {
  bar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    gap: "var(--spacing-md)",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
  },
  // Content-sized basis, so the bar wraps instead of squeezing the range text.
  dateField: { flex: "2 1 auto" },
  statusField: { flex: "1 1 auto" },
} satisfies Record<string, React.CSSProperties>;

// eluan: composed, no component for a filter bar (DateRangePicker + Select + outline Button, per date-picker.md)
export default function FilterBar({
  value,
  defaultValue = EMPTY_FILTERS,
  onValueChange,
  statusOptions = DEFAULT_STATUS_OPTIONS,
  dateLabel = "Date",
}: FilterBarProps) {
  const id = React.useId();
  const dateLabelId = `${id}-date-label`;
  const statusId = `${id}-status`;

  const [internalFilters, setInternalFilters] = React.useState<Filters>(defaultValue);
  const isControlled = value !== undefined;
  const filters = isControlled ? value : internalFilters;

  const commit = (next: Filters) => {
    if (!isControlled) setInternalFilters(next);
    onValueChange?.(next);
  };

  return (
    <div role="group" aria-label="Filters" style={styles.bar}>
      <div style={{ ...styles.field, ...styles.dateField }}>
        <Label id={dateLabelId}>{dateLabel}</Label>
        {/* The picker's trigger takes no id or aria-label, so the group carries its name. */}
        <div role="group" aria-labelledby={dateLabelId}>
          <DateRangePicker
            value={filters.dateRange}
            // Re-clicking the only selected day passes undefined despite the type.
            onValueChange={(next) => commit({ ...filters, dateRange: next ?? ANY_DATE })}
            placeholder="Any date"
          />
        </div>
      </div>

      <div style={{ ...styles.field, ...styles.statusField }}>
        <Label htmlFor={statusId}>Status</Label>
        <Select
          value={filters.status}
          onValueChange={(status) => commit({ ...filters, status })}
        >
          <SelectTrigger id={statusId}>
            <SelectValue placeholder="All statuses" />
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

      {/* Stays enabled: disabling it on click would drop keyboard focus to the page. */}
      <Button type="button" variant="outline" onClick={() => commit(EMPTY_FILTERS)}>
        Reset filters
      </Button>
    </div>
  );
}
