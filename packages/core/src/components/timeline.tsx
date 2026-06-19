import * as React from "react"
import * as stylex from "@stylexjs/stylex"

type DivProps = Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">

type TimelineProps = DivProps & {
  variant?: "default" | "alternating"
}

type TimelineItemProps = DivProps & {
  spacing?: "default" | "none"
  variant?: "default" | "success" | "warning" | "error" | "info"
}

type TimelineLineProps = DivProps & {
  variant?: "default" | "dashed" | "dotted"
}

type TimelineDotProps = DivProps & {
  icon?: React.ReactNode
  size?: "sm" | "default" | "lg"
  variant?: "default" | "filled" | "outline" | "icon"
}

type TimelineContentProps = DivProps

type TimelineHeaderProps = DivProps

type TimelineTitleProps = Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  "className" | "style"
> & {
  size?: "default" | "sm"
}

type TimelineTimeProps = Omit<
  React.TimeHTMLAttributes<HTMLTimeElement>,
  "className" | "style"
> & {
  layout?: "default" | "inlineEnd"
  size?: "default" | "xs"
}

type TimelineDescriptionProps = Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  "className" | "style"
> & {
  spacing?: "default" | "none" | "xs"
  size?: "default" | "xs"
}

const styles = stylex.create({
  timeline: {
    position: "relative",
  },
  item: {
    paddingBottom: "var(--spacing-xl)",
    paddingLeft: "calc(var(--size-sm) + var(--spacing-md))",
    position: "relative",
    ":last-child": {
      paddingBottom: 0,
    },
    "--timeline-dot-bg": "var(--container-bg-alt)",
    "--timeline-dot-border": "var(--container-bg)",
    "--timeline-dot-color": "var(--container-fg)",
  },
  itemNoSpacing: {
    paddingBottom: 0,
  },
  itemSuccess: {
    "--timeline-dot-bg": "var(--positive-bg)",
    "--timeline-dot-border": "var(--positive-fg)",
    "--timeline-dot-color": "var(--positive-bg)",
  },
  itemWarning: {
    "--timeline-dot-bg": "var(--cautionary-bg)",
    "--timeline-dot-color": "var(--cautionary-fg)",
  },
  itemError: {
    "--timeline-dot-bg": "var(--destructive-bg)",
    "--timeline-dot-color": "var(--destructive-fg)",
  },
  itemInfo: {
    "--timeline-dot-bg": "var(--informative-bg)",
    "--timeline-dot-color": "var(--informative-fg)",
  },
  line: {
    backgroundColor: "var(--container-border-alt)",
    height: "calc(100% - var(--size-sm))",
    left: "calc(var(--size-sm) / 2 - 0.5px)",
    position: "absolute",
    top: "var(--size-sm)",
    width: 1,
  },
  lineDashed: {
    backgroundColor: "transparent",
    borderColor: "var(--container-border-alt)",
    borderLeftStyle: "dashed",
    borderLeftWidth: 1,
  },
  lineDotted: {
    backgroundColor: "transparent",
    borderColor: "var(--container-border-alt)",
    borderLeftStyle: "dotted",
    borderLeftWidth: 1,
  },
  dot: {
    alignItems: "center",
    backgroundColor: "var(--timeline-dot-bg, var(--container-bg-alt))",
    borderColor: "var(--timeline-dot-border, var(--container-bg))",
    borderRadius: "var(--radius-radius-full)",
    borderStyle: "solid",
    borderWidth: 2,
    color: "var(--timeline-dot-color, var(--container-fg))",
    display: "flex",
    height: "var(--size-sm)",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    top: 0,
    width: "var(--size-sm)",
  },
  dotFilled: {
    backgroundColor: "var(--container-bg)",
    color: "var(--container-fg)",
  },
  dotOutline: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border-alt)",
  },
  dotIcon: {
    backgroundColor: "var(--container-bg)",
    color: "var(--container-fg)",
  },
  dotSm: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  dotLg: {
    height: "var(--size-md)",
    width: "var(--size-md)",
  },
  content: {
    paddingTop: "calc(var(--spacing-xxs) / 2)",
  },
  header: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-sm)",
    minHeight: "var(--size-sm)",
  },
  title: {
    fontFamily: "var(--font-heading)",
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: 1,
  },
  titleSm: {
    fontSize: "var(--font-size-sm)",
  },
  time: {
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-sm)",
  },
  timeXs: {
    fontSize: "var(--font-size-xs)",
  },
  timeInlineEnd: {
    flexShrink: 0,
    marginLeft: "var(--spacing-sm)",
  },
  description: {
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-sm)",
    marginTop: "var(--spacing-sm)",
  },
  descriptionXs: {
    fontSize: "var(--font-size-xs)",
  },
  descriptionNoSpacing: {
    marginTop: 0,
  },
  descriptionXsSpacing: {
    marginTop: "var(--spacing-xs)",
  },
  horizontal: {
    alignItems: "flex-start",
    display: "flex",
    gap: "var(--spacing-md)",
    position: "relative",
  },
  horizontalItem: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  horizontalLine: {
    backgroundColor: "var(--container-border-alt)",
    height: 1,
    left: "calc(50% + var(--size-sm) / 2)",
    position: "absolute",
    top: "calc(var(--size-sm) / 2 - 0.5px)",
    width: "calc(100% - var(--size-sm))",
  },
})

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ variant: _variant = "default", ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.timeline)} />
  )
)
Timeline.displayName = "Timeline"

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ spacing = "default", variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(
        styles.item,
        spacing === "none" && styles.itemNoSpacing,
        variant === "success" && styles.itemSuccess,
        variant === "warning" && styles.itemWarning,
        variant === "error" && styles.itemError,
        variant === "info" && styles.itemInfo
      )}
    />
  )
)
TimelineItem.displayName = "TimelineItem"

const TimelineLine = React.forwardRef<HTMLDivElement, TimelineLineProps>(
  ({ variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(
        styles.line,
        variant === "dashed" && styles.lineDashed,
        variant === "dotted" && styles.lineDotted
      )}
    />
  )
)
TimelineLine.displayName = "TimelineLine"

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ icon, size = "default", variant = "default", children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(
        styles.dot,
        variant === "filled" && styles.dotFilled,
        variant === "outline" && styles.dotOutline,
        variant === "icon" && styles.dotIcon,
        size === "sm" && styles.dotSm,
        size === "lg" && styles.dotLg
      )}
    >
      {icon || children}
    </div>
  )
)
TimelineDot.displayName = "TimelineDot"

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.content)} />
  )
)
TimelineContent.displayName = "TimelineContent"

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.header)} />
  )
)
TimelineHeader.displayName = "TimelineHeader"

const TimelineTitle = React.forwardRef<HTMLHeadingElement, TimelineTitleProps>(
  ({ size = "default", ...props }, ref) => (
    <h3
      ref={ref}
      {...props}
      {...stylex.props(styles.title, size === "sm" && styles.titleSm)}
    />
  )
)
TimelineTitle.displayName = "TimelineTitle"

const TimelineTime = React.forwardRef<HTMLTimeElement, TimelineTimeProps>(
  ({ layout = "default", size = "default", ...props }, ref) => (
    <time
      ref={ref}
      {...props}
      {...stylex.props(
        styles.time,
        size === "xs" && styles.timeXs,
        layout === "inlineEnd" && styles.timeInlineEnd
      )}
    />
  )
)
TimelineTime.displayName = "TimelineTime"

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  TimelineDescriptionProps
>(({ spacing = "default", size = "default", ...props }, ref) => (
  <p
    ref={ref}
    {...props}
    {...stylex.props(
      styles.description,
      size === "xs" && styles.descriptionXs,
      spacing === "none" && styles.descriptionNoSpacing,
      spacing === "xs" && styles.descriptionXsSpacing
    )}
  />
))
TimelineDescription.displayName = "TimelineDescription"

const TimelineHorizontal = React.forwardRef<HTMLDivElement, DivProps>(
  ({ ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.horizontal)} />
  )
)
TimelineHorizontal.displayName = "TimelineHorizontal"

const TimelineHorizontalItem = React.forwardRef<HTMLDivElement, DivProps>(
  ({ ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.horizontalItem)} />
  )
)
TimelineHorizontalItem.displayName = "TimelineHorizontalItem"

const TimelineHorizontalLine = React.forwardRef<HTMLDivElement, DivProps>(
  ({ ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.horizontalLine)} />
  )
)
TimelineHorizontalLine.displayName = "TimelineHorizontalLine"

export {
  Timeline,
  TimelineItem,
  TimelineLine,
  TimelineDot,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
  TimelineHorizontal,
  TimelineHorizontalItem,
  TimelineHorizontalLine,
}
