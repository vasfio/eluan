import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Brain, Pencil, Trash2 } from "lucide-react"

import { Button } from "./button"

export interface AIMemoryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  item: {
    alignItems: "flex-start",
    backgroundColor: "var(--container-bg-alt)",
    borderRadius: "var(--curves-sm)",
    display: "flex",
    gap: "var(--spacing-sm)",
    padding: "var(--spacing-sm)",
  },
  brainIcon: {
    color: "var(--informative-fg)",
    flexShrink: 0,
    height: "var(--size-xxs)",
    marginTop: "var(--spacing-xxs)",
    width: "var(--size-xxs)",
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: "var(--spacing-xxs)",
    minWidth: 0,
  },
  text: {
    color: "var(--container-fg)",
    fontSize: "var(--font-size-sm)",
    margin: 0,
  },
  timestamp: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
  },
  actions: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    gap: "var(--spacing-xxs)",
    opacity: 0,
    transitionDuration: "150ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  actionsVisible: {
    opacity: 1,
  },
  actionIcon: {
    height: "var(--font-size-sm)",
    width: "var(--font-size-sm)",
  },
})

const AIMemory = React.forwardRef<HTMLDivElement, AIMemoryProps>(
  ({ ...props }, ref) => (
    <div
      ref={ref}
      role="list"
      {...props}
      {...stylex.props(styles.root)}
    />
  )
)
AIMemory.displayName = "AIMemory"

export interface AIMemoryItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Callback when the edit button is clicked */
  onEdit?: () => void
  /** Callback when the delete button is clicked */
  onDelete?: () => void
  /** Optional timestamp for the memory entry */
  timestamp?: string
}

const AIMemoryItem = React.forwardRef<HTMLDivElement, AIMemoryItemProps>(
  (
    {
      onBlur,
      onDelete,
      onEdit,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      timestamp,
      children,
      ...props
    },
    ref
  ) => {
    const [isActive, setIsActive] = React.useState(false)

    return (
      <div
        ref={ref}
        role="listitem"
        onMouseEnter={(event) => {
          setIsActive(true)
          onMouseEnter?.(event)
        }}
        onMouseLeave={(event) => {
          setIsActive(false)
          onMouseLeave?.(event)
        }}
        onFocus={(event) => {
          setIsActive(true)
          onFocus?.(event)
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsActive(false)
          }
          onBlur?.(event)
        }}
        {...props}
        {...stylex.props(styles.item)}
      >
        <Brain {...stylex.props(styles.brainIcon)} />
        <div {...stylex.props(styles.content)}>
          <p {...stylex.props(styles.text)}>
            {children}
          </p>
          {timestamp && (
            <span {...stylex.props(styles.timestamp)}>
              {timestamp}
            </span>
          )}
        </div>
        {(onEdit || onDelete) && (
          <div {...stylex.props(styles.actions, isActive && styles.actionsVisible)}>
            {onEdit && (
              <Button
                variant="ghost"
                size="inlineIcon"
                onClick={onEdit}
                aria-label="Edit memory"
              >
                <Pencil {...stylex.props(styles.actionIcon)} />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="dangerGhost"
                size="inlineIcon"
                onClick={onDelete}
                aria-label="Delete memory"
              >
                <Trash2 {...stylex.props(styles.actionIcon)} />
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }
)
AIMemoryItem.displayName = "AIMemoryItem"

export { AIMemory, AIMemoryItem }
