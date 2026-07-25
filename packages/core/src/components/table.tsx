import * as React from "react"
import * as stylex from "@stylexjs/stylex"

export type TableProps = Omit<
  React.HTMLAttributes<HTMLTableElement>,
  "className" | "style"
>

export type TableSectionProps = Omit<
  React.HTMLAttributes<HTMLTableSectionElement>,
  "className" | "style"
>

export type TableRowProps = Omit<
  React.HTMLAttributes<HTMLTableRowElement>,
  "className" | "style"
>

export type TableHeadProps = Omit<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  "className" | "style"
> & {
  align?: "left" | "center"
  highlighted?: boolean
  width?: "auto" | "feature"
}

export type TableCellProps = Omit<
  React.TdHTMLAttributes<HTMLTableCellElement>,
  "className" | "style"
> & {
  align?: "left" | "center"
  highlighted?: boolean
  weight?: "normal" | "medium"
}

export type TableCaptionProps = Omit<
  React.HTMLAttributes<HTMLTableCaptionElement>,
  "className" | "style"
>

const styles = stylex.create({
  wrapper: {
    overflow: "auto",
    position: "relative",
    width: "100%",
  },
  table: {
    captionSide: "bottom",
    fontSize: "var(--font-size-sm)",
    width: "100%",
  },
  footer: {
    backgroundColor: "var(--container-bg-alt)",
    borderTopColor: "var(--container-border)",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    fontWeight: 500,
  },
  row: {
    borderBottomColor: "var(--container-border)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
    "[data-state=selected]": {
      backgroundColor: "var(--interactive-bg-selected)",
      color: "var(--interactive-fg-selected)",
    },
  },
  head: {
    color: "var(--interactive-fg-alt)",
    fontWeight: 500,
    height: "var(--size-xl)",
    paddingInline: "var(--spacing-md)",
    textAlign: "left",
    verticalAlign: "middle",
    ":has([role=checkbox])": {
      paddingRight: 0,
    },
  },
  headCenter: {
    textAlign: "center",
  },
  headFeature: {
    width: "12.5rem",
  },
  highlighted: {
    backgroundColor: "var(--interactive-bg-alt2)",
  },
  cell: {
    padding: "var(--spacing-md)",
    verticalAlign: "middle",
    ":has([role=checkbox])": {
      paddingRight: 0,
    },
  },
  cellCenter: {
    textAlign: "center",
  },
  cellMedium: {
    fontWeight: 500,
  },
  caption: {
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-sm)",
    marginTop: "var(--spacing-md)",
  },
})

const Table = React.forwardRef<
  HTMLTableElement,
  TableProps
>(({ ...props }, ref) => (
  <div {...stylex.props(styles.wrapper)}>
    <table
      ref={ref}
      {...props}
      {...stylex.props(styles.table)}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableSectionProps
>(({ ...props }, ref) => (
  <thead ref={ref} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableSectionProps
>(({ ...props }, ref) => (
  <tbody
    ref={ref}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableSectionProps
>(({ ...props }, ref) => (
  <tfoot
    ref={ref}
    {...props}
    {...stylex.props(styles.footer)}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  TableRowProps
>(({ ...props }, ref) => (
  <tr
    ref={ref}
    {...props}
    {...stylex.props(styles.row)}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  TableHeadProps
>(({ align = "left", highlighted = false, width = "auto", ...props }, ref) => (
  <th
    ref={ref}
    {...props}
    {...stylex.props(
      styles.head,
      align === "center" && styles.headCenter,
      highlighted && styles.highlighted,
      width === "feature" && styles.headFeature
    )}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  TableCellProps
>(({ align = "left", highlighted = false, weight = "normal", ...props }, ref) => (
  <td
    ref={ref}
    {...props}
    {...stylex.props(
      styles.cell,
      align === "center" && styles.cellCenter,
      highlighted && styles.highlighted,
      weight === "medium" && styles.cellMedium
    )}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ ...props }, ref) => (
  <caption
    ref={ref}
    {...props}
    {...stylex.props(styles.caption)}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
