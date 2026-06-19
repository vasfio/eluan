import * as React from "react"
import * as stylex from "@stylexjs/stylex"

import { Badge } from "./badge"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./select"

export interface AIModelOption {
  /** Optional badge label (e.g. "Pro", "Free") */
  badge?: string
  /** Optional short description */
  description?: string
  /** Whether the option is disabled */
  disabled?: boolean
  /** Optional icon rendered before the name */
  icon?: React.ReactNode
  /** Optional latency / cost indicator text */
  indicator?: string
  /** Display name */
  name: string
  /** Unique value identifier */
  value: string
}

export type AIModelSelectorSize = "default" | "sm"

export interface AIModelSelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style" | "onChange"> {
  /** Available model options */
  models: AIModelOption[]
  /** Callback when a model is selected */
  onValueChange?: (value: string) => void
  size?: AIModelSelectorSize
  /** Currently selected model value */
  value?: string
}

const styles = stylex.create({
  root: {
    display: "inline-block",
    position: "relative",
  },
  row: {
    alignItems: "center",
    display: "inline-flex",
    gap: "var(--spacing-xxs)",
  },
  icon: {
    flexShrink: 0,
  },
  name: {
    fontWeight: 500,
  },
  description: {
    color: "var(--container-fg-alt)",
    display: "block",
    fontSize: "var(--font-size-xs)",
  },
  indicator: {
    color: "var(--container-fg-alt)",
    display: "block",
    fontSize: "var(--font-size-xs)",
    opacity: 0.75,
  },
})

const AIModelSelector = React.forwardRef<HTMLDivElement, AIModelSelectorProps>(
  ({ models, value, onValueChange, size: _size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        {...stylex.props(styles.root)}
      >
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem
                key={model.value}
                value={model.value}
                disabled={model.disabled}
              >
                <span {...stylex.props(styles.row)}>
                  {model.icon && <span {...stylex.props(styles.icon)}>{model.icon}</span>}
                  <span {...stylex.props(styles.name)}>{model.name}</span>
                  {model.badge && <Badge variant="secondary">{model.badge}</Badge>}
                </span>
                {model.description && (
                  <span {...stylex.props(styles.description)}>{model.description}</span>
                )}
                {model.indicator && (
                  <span {...stylex.props(styles.indicator)}>{model.indicator}</span>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }
)
AIModelSelector.displayName = "AIModelSelector"

export { AIModelSelector }
