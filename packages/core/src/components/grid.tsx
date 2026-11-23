import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import type { BreakpointToken } from "@eluan/tokens"
import {
  alignStyles,
  gapStyles,
  layoutElement,
  splitBoxProps,
  withClassHook,
  withoutStyling,
  type LayoutAlign,
  type LayoutBoxProps,
  type LayoutSpacing,
} from "./layout-shared"

export type {
  LayoutAlign,
  LayoutElement,
  LayoutSpacing,
} from "./layout-shared"

/** A column count: that many equal `minmax(0, 1fr)` tracks. */
export type GridColumnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * A column count, or a raw `grid-template-columns` value for uneven tracks
 * (`"auto minmax(0, 1fr)"`). Prefer `minmax(0, 1fr)` over a bare `1fr`, so
 * long content can't push a track wider than its share.
 */
export type GridColumns = GridColumnCount | (string & {})

/** Eluan's breakpoint names (`breakpoints` in `@eluan/tokens`). Each is a min-width. */
export type GridBreakpoint = BreakpointToken

/** Columns per breakpoint, mobile first: `{ base: 1, m: 2, l: 4 }`. */
export type GridResponsiveColumns = { base?: GridColumns } & {
  [B in GridBreakpoint]?: GridColumns
}

export interface GridProps extends LayoutBoxProps {
  /** Cross-axis alignment of items in their row. Unset, items stretch. */
  align?: LayoutAlign
  /** Columns: a count, a template, or per breakpoint. Defaults to one column. */
  cols?: GridColumns | GridResponsiveColumns
  /** Space between rows and columns, as a `--spacing-*` token name. */
  gap?: LayoutSpacing
}

// The column template travels through one custom property per breakpoint.
// Each defaults to the one below it, so `{ base: 2, l: 4 }` is 2 columns up
// to l and 4 from l on, and an unset level inherits the nearest level under
// it. Every Grid sets the whole chain itself, so a nested Grid never picks up
// its parent's columns.
//
// Breakpoint widths mirror `breakpoints` in @eluan/tokens (a test checks
// them). StyleX compiles these styles ahead of time, so it can't read the
// import and the values are written out here.
const styles = stylex.create({
  base: {
    display: "grid",
    "--eluan-grid-cols": "minmax(0, 1fr)",
    "--eluan-grid-cols-xxs": "var(--eluan-grid-cols)",
    "--eluan-grid-cols-xs": "var(--eluan-grid-cols-xxs)",
    "--eluan-grid-cols-s": "var(--eluan-grid-cols-xs)",
    "--eluan-grid-cols-m": "var(--eluan-grid-cols-s)",
    "--eluan-grid-cols-l": "var(--eluan-grid-cols-m)",
    "--eluan-grid-cols-xl": "var(--eluan-grid-cols-l)",
    "--eluan-grid-cols-2xl": "var(--eluan-grid-cols-xl)",
    "--eluan-grid-cols-3xl": "var(--eluan-grid-cols-2xl)",
    "--eluan-grid-cols-4xl": "var(--eluan-grid-cols-3xl)",
    gridTemplateColumns: {
      default: "var(--eluan-grid-cols)",
      "@media (min-width: 320px)": "var(--eluan-grid-cols-xxs)",
      "@media (min-width: 414px)": "var(--eluan-grid-cols-xs)",
      "@media (min-width: 480px)": "var(--eluan-grid-cols-s)",
      "@media (min-width: 748px)": "var(--eluan-grid-cols-m)",
      "@media (min-width: 1024px)": "var(--eluan-grid-cols-l)",
      "@media (min-width: 1280px)": "var(--eluan-grid-cols-xl)",
      "@media (min-width: 1440px)": "var(--eluan-grid-cols-2xl)",
      "@media (min-width: 1920px)": "var(--eluan-grid-cols-3xl)",
      "@media (min-width: 2580px)": "var(--eluan-grid-cols-4xl)",
    },
  },
})

type ColumnLevel = keyof GridResponsiveColumns

const LEVELS = ["base", "xxs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl"] as const satisfies
  readonly ColumnLevel[]

// One static style per level and count (10 × 12), so a count never emits an
// inline style. StyleX only compiles literal objects, so they're written out.

const colsBase = stylex.create({
  1: { "--eluan-grid-cols": "repeat(1, minmax(0, 1fr))" },
  2: { "--eluan-grid-cols": "repeat(2, minmax(0, 1fr))" },
  3: { "--eluan-grid-cols": "repeat(3, minmax(0, 1fr))" },
  4: { "--eluan-grid-cols": "repeat(4, minmax(0, 1fr))" },
  5: { "--eluan-grid-cols": "repeat(5, minmax(0, 1fr))" },
  6: { "--eluan-grid-cols": "repeat(6, minmax(0, 1fr))" },
  7: { "--eluan-grid-cols": "repeat(7, minmax(0, 1fr))" },
  8: { "--eluan-grid-cols": "repeat(8, minmax(0, 1fr))" },
  9: { "--eluan-grid-cols": "repeat(9, minmax(0, 1fr))" },
  10: { "--eluan-grid-cols": "repeat(10, minmax(0, 1fr))" },
  11: { "--eluan-grid-cols": "repeat(11, minmax(0, 1fr))" },
  12: { "--eluan-grid-cols": "repeat(12, minmax(0, 1fr))" },
})

const colsXxs = stylex.create({
  1: { "--eluan-grid-cols-xxs": "repeat(1, minmax(0, 1fr))" },
  2: { "--eluan-grid-cols-xxs": "repeat(2, minmax(0, 1fr))" },
  3: { "--eluan-grid-cols-xxs": "repeat(3, minmax(0, 1fr))" },
  4: { "--eluan-grid-cols-xxs": "repeat(4, minmax(0, 1fr))" },
  5: { "--eluan-grid-cols-xxs": "repeat(5, minmax(0, 1fr))" },
  6: { "--eluan-grid-cols-xxs": "repeat(6, minmax(0, 1fr))" },
  7: { "--eluan-grid-cols-xxs": "repeat(7, minmax(0, 1fr))" },
  8: { "--eluan-grid-cols-xxs": "repeat(8, minmax(0, 1fr))" },
  9: { "--eluan-grid-cols-xxs": "repeat(9, minmax(0, 1fr))" },
  10: { "--eluan-grid-cols-xxs": "repeat(10, minmax(0, 1fr))" },
  11: { "--eluan-grid-cols-xxs": "repeat(11, minmax(0, 1fr))" },
  12: { "--eluan-grid-cols-xxs": "repeat(12, minmax(0, 1fr))" },
})

const colsXs = stylex.create({
  1: { "--eluan-grid-cols-xs": "repeat(1, minmax(0, 1fr))" },
  2: { "--eluan-grid-cols-xs": "repeat(2, minmax(0, 1fr))" },
  3: { "--eluan-grid-cols-xs": "repeat(3, minmax(0, 1fr))" },
  4: { "--eluan-grid-cols-xs": "repeat(4, minmax(0, 1fr))" },
  5: { "--eluan-grid-cols-xs": "repeat(5, minmax(0, 1fr))" },
  6: { "--eluan-grid-cols-xs": "repeat(6, minmax(0, 1fr))" },
  7: { "--eluan-grid-cols-xs": "repeat(7, minmax(0, 1fr))" },
  8: { "--eluan-grid-cols-xs": "repeat(8, minmax(0, 1fr))" },
  9: { "--eluan-grid-cols-xs": "repeat(9, minmax(0, 1fr))" },
  10: { "--eluan-grid-cols-xs": "repeat(10, minmax(0, 1fr))" },
  11: { "--eluan-grid-cols-xs": "repeat(11, minmax(0, 1fr))" },
  12: { "--eluan-grid-cols-xs": "repeat(12, minmax(0, 1fr))" },
})

const colsS = stylex.create({
  1: { "--eluan-grid-cols-s": "repeat(1, minmax(0, 1fr))" },
  2: { "--eluan-grid-cols-s": "repeat(2, minmax(0, 1fr))" },
  3: { "--eluan-grid-cols-s": "repeat(3, minmax(0, 1fr))" },
  4: { "--eluan-grid-cols-s": "repeat(4, minmax(0, 1fr))" },
  5: { "--eluan-grid-cols-s": "repeat(5, minmax(0, 1fr))" },
  6: { "--eluan-grid-cols-s": "repeat(6, minmax(0, 1fr))" },
  7: { "--eluan-grid-cols-s": "repeat(7, minmax(0, 1fr))" },
  8: { "--eluan-grid-cols-s": "repeat(8, minmax(0, 1fr))" },
  9: { "--eluan-grid-cols-s": "repeat(9, minmax(0, 1fr))" },
  10: { "--eluan-grid-cols-s": "repeat(10, minmax(0, 1fr))" },
  11: { "--eluan-grid-cols-s": "repeat(11, minmax(0, 1fr))" },
  12: { "--eluan-grid-cols-s": "repeat(12, minmax(0, 1fr))" },
})

const colsM = stylex.create({
  1: { "--eluan-grid-cols-m": "repeat(1, minmax(0, 1fr))" },
  2: { "--eluan-grid-cols-m": "repeat(2, minmax(0, 1fr))" },
  3: { "--eluan-grid-cols-m": "repeat(3, minmax(0, 1fr))" },
  4: { "--eluan-grid-cols-m": "repeat(4, minmax(0, 1fr))" },
  5: { "--eluan-grid-cols-m": "repeat(5, minmax(0, 1fr))" },
  6: { "--eluan-grid-cols-m": "repeat(6, minmax(0, 1fr))" },
  7: { "--eluan-grid-cols-m": "repeat(7, minmax(0, 1fr))" },
  8: { "--eluan-grid-cols-m": "repeat(8, minmax(0, 1fr))" },
  9: { "--eluan-grid-cols-m": "repeat(9, minmax(0, 1fr))" },
  10: { "--eluan-grid-cols-m": "repeat(10, minmax(0, 1fr))" },
  11: { "--eluan-grid-cols-m": "repeat(11, minmax(0, 1fr))" },
  12: { "--eluan-grid-cols-m": "repeat(12, minmax(0, 1fr))" },
})

const colsL = stylex.create({
  1: { "--eluan-grid-cols-l": "repeat(1, minmax(0, 1fr))" },
  2: { "--eluan-grid-cols-l": "repeat(2, minmax(0, 1fr))" },
  3: { "--eluan-grid-cols-l": "repeat(3, minmax(0, 1fr))" },
  4: { "--eluan-grid-cols-l": "repeat(4, minmax(0, 1fr))" },
  5: { "--eluan-grid-cols-l": "repeat(5, minmax(0, 1fr))" },
  6: { "--eluan-grid-cols-l": "repeat(6, minmax(0, 1fr))" },
  7: { "--eluan-grid-cols-l": "repeat(7, minmax(0, 1fr))" },
  8: { "--eluan-grid-cols-l": "repeat(8, minmax(0, 1fr))" },
  9: { "--eluan-grid-cols-l": "repeat(9, minmax(0, 1fr))" },
  10: { "--eluan-grid-cols-l": "repeat(10, minmax(0, 1fr))" },
  11: { "--eluan-grid-cols-l": "repeat(11, minmax(0, 1fr))" },
  12: { "--eluan-grid-cols-l": "repeat(12, minmax(0, 1fr))" },
})

const colsXl = stylex.create({
  1: { "--eluan-grid-cols-xl": "repeat(1, minmax(0, 1fr))" },
  2: { "--eluan-grid-cols-xl": "repeat(2, minmax(0, 1fr))" },
  3: { "--eluan-grid-cols-xl": "repeat(3, minmax(0, 1fr))" },
  4: { "--eluan-grid-cols-xl": "repeat(4, minmax(0, 1fr))" },
  5: { "--eluan-grid-cols-xl": "repeat(5, minmax(0, 1fr))" },
  6: { "--eluan-grid-cols-xl": "repeat(6, minmax(0, 1fr))" },
  7: { "--eluan-grid-cols-xl": "repeat(7, minmax(0, 1fr))" },
  8: { "--eluan-grid-cols-xl": "repeat(8, minmax(0, 1fr))" },
  9: { "--eluan-grid-cols-xl": "repeat(9, minmax(0, 1fr))" },
  10: { "--eluan-grid-cols-xl": "repeat(10, minmax(0, 1fr))" },
  11: { "--eluan-grid-cols-xl": "repeat(11, minmax(0, 1fr))" },
  12: { "--eluan-grid-cols-xl": "repeat(12, minmax(0, 1fr))" },
})

const cols2Xl = stylex.create({
  1: { "--eluan-grid-cols-2xl": "repeat(1, minmax(0, 1fr))" },
  2: { "--eluan-grid-cols-2xl": "repeat(2, minmax(0, 1fr))" },
  3: { "--eluan-grid-cols-2xl": "repeat(3, minmax(0, 1fr))" },
  4: { "--eluan-grid-cols-2xl": "repeat(4, minmax(0, 1fr))" },
  5: { "--eluan-grid-cols-2xl": "repeat(5, minmax(0, 1fr))" },
  6: { "--eluan-grid-cols-2xl": "repeat(6, minmax(0, 1fr))" },
  7: { "--eluan-grid-cols-2xl": "repeat(7, minmax(0, 1fr))" },
  8: { "--eluan-grid-cols-2xl": "repeat(8, minmax(0, 1fr))" },
  9: { "--eluan-grid-cols-2xl": "repeat(9, minmax(0, 1fr))" },
  10: { "--eluan-grid-cols-2xl": "repeat(10, minmax(0, 1fr))" },
  11: { "--eluan-grid-cols-2xl": "repeat(11, minmax(0, 1fr))" },
  12: { "--eluan-grid-cols-2xl": "repeat(12, minmax(0, 1fr))" },
})

const cols3Xl = stylex.create({
  1: { "--eluan-grid-cols-3xl": "repeat(1, minmax(0, 1fr))" },
  2: { "--eluan-grid-cols-3xl": "repeat(2, minmax(0, 1fr))" },
  3: { "--eluan-grid-cols-3xl": "repeat(3, minmax(0, 1fr))" },
  4: { "--eluan-grid-cols-3xl": "repeat(4, minmax(0, 1fr))" },
  5: { "--eluan-grid-cols-3xl": "repeat(5, minmax(0, 1fr))" },
  6: { "--eluan-grid-cols-3xl": "repeat(6, minmax(0, 1fr))" },
  7: { "--eluan-grid-cols-3xl": "repeat(7, minmax(0, 1fr))" },
  8: { "--eluan-grid-cols-3xl": "repeat(8, minmax(0, 1fr))" },
  9: { "--eluan-grid-cols-3xl": "repeat(9, minmax(0, 1fr))" },
  10: { "--eluan-grid-cols-3xl": "repeat(10, minmax(0, 1fr))" },
  11: { "--eluan-grid-cols-3xl": "repeat(11, minmax(0, 1fr))" },
  12: { "--eluan-grid-cols-3xl": "repeat(12, minmax(0, 1fr))" },
})

const cols4Xl = stylex.create({
  1: { "--eluan-grid-cols-4xl": "repeat(1, minmax(0, 1fr))" },
  2: { "--eluan-grid-cols-4xl": "repeat(2, minmax(0, 1fr))" },
  3: { "--eluan-grid-cols-4xl": "repeat(3, minmax(0, 1fr))" },
  4: { "--eluan-grid-cols-4xl": "repeat(4, minmax(0, 1fr))" },
  5: { "--eluan-grid-cols-4xl": "repeat(5, minmax(0, 1fr))" },
  6: { "--eluan-grid-cols-4xl": "repeat(6, minmax(0, 1fr))" },
  7: { "--eluan-grid-cols-4xl": "repeat(7, minmax(0, 1fr))" },
  8: { "--eluan-grid-cols-4xl": "repeat(8, minmax(0, 1fr))" },
  9: { "--eluan-grid-cols-4xl": "repeat(9, minmax(0, 1fr))" },
  10: { "--eluan-grid-cols-4xl": "repeat(10, minmax(0, 1fr))" },
  11: { "--eluan-grid-cols-4xl": "repeat(11, minmax(0, 1fr))" },
  12: { "--eluan-grid-cols-4xl": "repeat(12, minmax(0, 1fr))" },
})

// StyleXStyles has no custom-property keys, so this checks coverage only:
// every level, every count.
const countStyles = {
  base: colsBase,
  xxs: colsXxs,
  xs: colsXs,
  s: colsS,
  m: colsM,
  l: colsL,
  xl: colsXl,
  "2xl": cols2Xl,
  "3xl": cols3Xl,
  "4xl": cols4Xl,
} satisfies Record<ColumnLevel, Record<GridColumnCount, object>>

// Raw templates are open-ended, so they go through a dynamic style.
const templateStyles = stylex.create({
  base: (value: string) => ({ "--eluan-grid-cols": value }),
  xxs: (value: string) => ({ "--eluan-grid-cols-xxs": value }),
  xs: (value: string) => ({ "--eluan-grid-cols-xs": value }),
  s: (value: string) => ({ "--eluan-grid-cols-s": value }),
  m: (value: string) => ({ "--eluan-grid-cols-m": value }),
  l: (value: string) => ({ "--eluan-grid-cols-l": value }),
  xl: (value: string) => ({ "--eluan-grid-cols-xl": value }),
  "2xl": (value: string) => ({ "--eluan-grid-cols-2xl": value }),
  "3xl": (value: string) => ({ "--eluan-grid-cols-3xl": value }),
  "4xl": (value: string) => ({ "--eluan-grid-cols-4xl": value }),
})

function columnStyle(level: ColumnLevel, cols: GridColumns) {
  if (typeof cols === "number") {
    const fixed = countStyles[level][cols as GridColumnCount] as
      | (typeof countStyles)[ColumnLevel][GridColumnCount]
      | undefined
    // Counts outside 1–12 only arrive through a cast; give them a template.
    return fixed ?? templateStyles[level](`repeat(${cols}, minmax(0, 1fr))`)
  }
  return templateStyles[level](cols)
}

function columnStyles(cols: GridProps["cols"]) {
  if (cols === undefined) return []
  const levels: GridResponsiveColumns = typeof cols === "object" ? cols : { base: cols }
  return LEVELS.flatMap((level) => {
    const value = levels[level]
    return value === undefined ? [] : [columnStyle(level, value)]
  })
}

/**
 * CSS grid with a token gap and column counts that can change per
 * breakpoint. Grid children get `min-width: 0`, so wide content can't stretch
 * a column past its share.
 */
const Grid = React.forwardRef<HTMLElement, GridProps>(
  ({ align, as, asChild = false, cols, gap = "md", ...props }, ref) => {
    const Comp = layoutElement(as, asChild)
    const [box, rest] = splitBoxProps(props)

    return (
      <Comp
        ref={ref}
        {...withoutStyling(rest)}
        {...withClassHook(
          "eluan-grid",
          stylex.props(
            styles.base,
            ...columnStyles(cols),
            gapStyles[gap],
            align && alignStyles[align],
            ...box
          )
        )}
      />
    )
  }
)
Grid.displayName = "Grid"

export { Grid }
