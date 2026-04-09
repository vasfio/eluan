import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const comparisonSectionVariants = cva("w-full", {
  variants: {
    size: {
      sm: "py-[var(--spacing-2xl)]",
      default: "py-[var(--spacing-3xl)]",
      lg: "py-[var(--spacing-4xl)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface ComparisonSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof comparisonSectionVariants> {}

const ComparisonSection = React.forwardRef<HTMLDivElement, ComparisonSectionProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(comparisonSectionVariants({ size }), className)}
        {...props}
      >
        <div className="container mx-auto px-[var(--spacing-md)]">{children}</div>
      </section>
    )
  }
)
ComparisonSection.displayName = "ComparisonSection"

const ComparisonHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-[var(--spacing-2xl)] text-center", className)}
    {...props}
  />
))
ComparisonHeader.displayName = "ComparisonHeader"

const ComparisonTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "font-heading text-3xl font-bold tracking-tight text-[var(--container-fg)] sm:text-4xl",
      className
    )}
    {...props}
  />
))
ComparisonTitle.displayName = "ComparisonTitle"

const ComparisonDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mx-auto mt-[var(--spacing-md)] max-w-2xl text-lg text-[var(--container-fg-alt)]",
      className
    )}
    {...props}
  />
))
ComparisonDescription.displayName = "ComparisonDescription"

const ComparisonTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("overflow-x-auto", className)}
    {...props}
  />
))
ComparisonTable.displayName = "ComparisonTable"

const ComparisonTableInner = React.forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full border-collapse text-center [&_td]:border-0 [&_th]:border-0 [&_tr]:border-0", className)}
    {...props}
  />
))
ComparisonTableInner.displayName = "ComparisonTableInner"

const ComparisonTableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("", className)} {...props} />
))
ComparisonTableHead.displayName = "ComparisonTableHead"

const ComparisonTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&>tr:nth-child(odd)]:bg-[var(--container-bg-alt)]", className)}
    {...props}
  />
))
ComparisonTableBody.displayName = "ComparisonTableBody"

const ComparisonTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("", className)} {...props} />
))
ComparisonTableRow.displayName = "ComparisonTableRow"

const comparisonHeaderCellVariants = cva(
  "px-[var(--spacing-md)] py-[var(--spacing-md)] text-sm font-medium text-center",
  {
    variants: {
      highlight: {
        true: "bg-[var(--interactive-bg-alt2)]",
        false: "",
      },
    },
    defaultVariants: {
      highlight: false,
    },
  }
)

export interface ComparisonHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof comparisonHeaderCellVariants> {}

const ComparisonHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  ComparisonHeaderCellProps
>(({ className, highlight, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(comparisonHeaderCellVariants({ highlight }), className)}
    {...props}
  />
))
ComparisonHeaderCell.displayName = "ComparisonHeaderCell"

const comparisonCellVariants = cva("px-[var(--spacing-md)] py-[var(--spacing-md)] text-sm text-center", {
  variants: {
    highlight: {
      true: "bg-[var(--interactive-bg-alt2)]",
      false: "",
    },
  },
  defaultVariants: {
    highlight: false,
  },
})

export interface ComparisonCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof comparisonCellVariants> {}

const ComparisonCell = React.forwardRef<
  HTMLTableCellElement,
  ComparisonCellProps
>(({ className, highlight, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(comparisonCellVariants({ highlight }), className)}
    {...props}
  />
))
ComparisonCell.displayName = "ComparisonCell"

const ComparisonFeatureCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-[var(--spacing-md)] py-[var(--spacing-md)] text-sm font-medium text-[var(--container-fg)] text-center",
      className
    )}
    {...props}
  />
))
ComparisonFeatureCell.displayName = "ComparisonFeatureCell"

const ComparisonCheck = React.forwardRef<
  SVGSVGElement,
  React.SVGAttributes<SVGSVGElement>
>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    className={cn("mx-auto h-5 w-5 text-[var(--positive-fg)]", className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
))
ComparisonCheck.displayName = "ComparisonCheck"

const ComparisonX = React.forwardRef<
  SVGSVGElement,
  React.SVGAttributes<SVGSVGElement>
>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    className={cn("mx-auto h-5 w-5 text-[var(--container-fg-alt)]", className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
))
ComparisonX.displayName = "ComparisonX"

const ComparisonMinus = React.forwardRef<
  SVGSVGElement,
  React.SVGAttributes<SVGSVGElement>
>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    className={cn("mx-auto h-5 w-5 text-[var(--container-fg-alt)]", className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
))
ComparisonMinus.displayName = "ComparisonMinus"

const ComparisonPlanHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-center", className)}
    {...props}
  />
))
ComparisonPlanHeader.displayName = "ComparisonPlanHeader"

const ComparisonPlanName = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-heading font-semibold text-[var(--container-fg)]", className)}
    {...props}
  />
))
ComparisonPlanName.displayName = "ComparisonPlanName"

const ComparisonPlanPrice = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-[var(--spacing-xs)] font-heading text-2xl font-bold text-[var(--container-fg)]", className)}
    {...props}
  />
))
ComparisonPlanPrice.displayName = "ComparisonPlanPrice"

const ComparisonCategory = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, children, ...props }, ref) => (
  <tr ref={ref} className={cn("bg-[var(--container-bg-alt)]", className)} {...props}>
    <td colSpan={100} className="px-[var(--spacing-md)] py-[var(--spacing-sm)] text-sm font-semibold text-[var(--container-fg)]">
      {children}
    </td>
  </tr>
))
ComparisonCategory.displayName = "ComparisonCategory"

export {
  ComparisonSection,
  ComparisonHeader,
  ComparisonTitle,
  ComparisonDescription,
  ComparisonTable,
  ComparisonTableInner,
  ComparisonTableHead,
  ComparisonTableBody,
  ComparisonTableRow,
  ComparisonHeaderCell,
  ComparisonCell,
  ComparisonFeatureCell,
  ComparisonCheck,
  ComparisonX,
  ComparisonMinus,
  ComparisonPlanHeader,
  ComparisonPlanName,
  ComparisonPlanPrice,
  ComparisonCategory,
}
