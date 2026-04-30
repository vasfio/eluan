import * as React from "react"
import { Brain, Pencil, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@vasf/ragnar-core"

export interface AIMemoryProps extends React.HTMLAttributes<HTMLDivElement> {}

const AIMemory = React.forwardRef<HTMLDivElement, AIMemoryProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-[var(--spacing-xs)]", className)}
      role="list"
      {...props}
    />
  )
)
AIMemory.displayName = "AIMemory"

export interface AIMemoryItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Callback when the edit button is clicked */
  onEdit?: () => void
  /** Callback when the delete button is clicked */
  onDelete?: () => void
  /** Optional timestamp for the memory entry */
  timestamp?: string
}

const AIMemoryItem = React.forwardRef<HTMLDivElement, AIMemoryItemProps>(
  ({ className, onEdit, onDelete, timestamp, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "group flex items-start gap-[var(--spacing-sm)] rounded-[var(--curves-sm)] bg-[var(--container-bg-alt)] p-[var(--spacing-sm)]",
        className
      )}
      role="listitem"
      {...props}
    >
      <Brain className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--informative-fg-strong)]" />
      <div className="flex min-w-0 flex-1 flex-col gap-[var(--spacing-xxs)]">
        <p className="text-[length:var(--font-size-sm)] text-[color:var(--container-fg)]">
          {children}
        </p>
        {timestamp && (
          <span className="text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)]">
            {timestamp}
          </span>
        )}
      </div>
      {(onEdit || onDelete) && (
        <div className="flex shrink-0 items-center gap-[var(--spacing-xxs)] opacity-0 transition-opacity group-hover:opacity-100">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              className="h-auto w-auto p-[var(--spacing-xxs)]"
              aria-label="Edit memory"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="h-auto w-auto p-[var(--spacing-xxs)] hover:bg-[var(--destructive-bg-alt)] hover:text-[color:var(--destructive-fg)]"
              aria-label="Delete memory"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
)
AIMemoryItem.displayName = "AIMemoryItem"

export { AIMemory, AIMemoryItem }
