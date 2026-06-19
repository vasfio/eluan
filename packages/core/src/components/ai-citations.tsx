import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Globe } from "lucide-react"

import { Badge } from "./badge"
import { Card } from "./card"

export interface AICitationProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  index: number
}

const styles = stylex.create({
  citation: {
    alignItems: "center",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: 10,
    height: "var(--size-xxs)",
    justifyContent: "center",
    lineHeight: 1,
    minWidth: "var(--size-xxs)",
    verticalAlign: "super",
  },
  sourceCard: {
    overflow: "hidden",
  },
  sourceContent: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    gap: "var(--spacing-sm)",
    padding: "var(--spacing-sm)",
  },
  iconWrap: {
    flexShrink: 0,
    marginTop: "var(--spacing-xxs)",
  },
  favicon: {
    borderRadius: "var(--curves-sm)",
    height: "var(--size-xxs)",
    objectFit: "cover",
    width: "var(--size-xxs)",
  },
  globe: {
    color: "var(--container-fg-alt)",
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  body: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    minWidth: 0,
  },
  title: {
    color: "var(--container-fg)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  meta: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  snippet: {
    color: "var(--container-fg-alt)",
    display: "-webkit-box",
    fontSize: "var(--font-size-xs)",
    marginBlock: 0,
    marginTop: "var(--spacing-xxs)",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  heading: {
    color: "var(--container-fg)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    margin: 0,
  },
})

const AICitation = React.forwardRef<HTMLSpanElement, AICitationProps>(
  ({ index, ...props }, ref) => (
    <span ref={ref} {...(props as React.HTMLAttributes<HTMLSpanElement>)}>
      <Badge
        variant="informative"
        role="button"
        tabIndex={0}
      >
        <span {...stylex.props(styles.citation)}>{index}</span>
      </Badge>
    </span>
  )
)
AICitation.displayName = "AICitation"

export interface AICitationSourceProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  title: string
  url?: string
  domain?: string
  favicon?: string
  snippet?: string
  onNavigate?: () => void
}

const AICitationSource = React.forwardRef<HTMLDivElement, AICitationSourceProps>(
  (
    {
      title,
      url,
      domain,
      favicon,
      snippet,
      onNavigate,
      ...props
    },
    ref
  ) => (
    <Card
      ref={ref}
      clickable={!!onNavigate}
      elevation="none"
      onClick={onNavigate}
      role={onNavigate ? "button" : undefined}
      tabIndex={onNavigate ? 0 : undefined}
      onKeyDown={
        onNavigate
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onNavigate()
              }
            }
          : undefined
      }
      {...props}
    >
      <div {...stylex.props(styles.sourceCard)}>
        <div {...stylex.props(styles.sourceContent)}>
          <div {...stylex.props(styles.iconWrap)}>
            {favicon ? (
              <img
                src={favicon}
                alt=""
                {...stylex.props(styles.favicon)}
              />
            ) : (
              <Globe {...stylex.props(styles.globe)} />
            )}
          </div>

          <div {...stylex.props(styles.body)}>
            <span {...stylex.props(styles.title)}>{title}</span>
            {(url || domain) && (
              <span {...stylex.props(styles.meta)}>{domain ?? url}</span>
            )}
            {snippet && <p {...stylex.props(styles.snippet)}>{snippet}</p>}
          </div>
        </div>
      </div>
    </Card>
  )
)
AICitationSource.displayName = "AICitationSource"

export interface AICitationListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  heading?: string
}

const AICitationList = React.forwardRef<HTMLDivElement, AICitationListProps>(
  ({ heading = "Sources", children, ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.list)}>
      {heading && <h4 {...stylex.props(styles.heading)}>{heading}</h4>}
      {children}
    </div>
  )
)
AICitationList.displayName = "AICitationList"

export { AICitation, AICitationSource, AICitationList }
