import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowUp, Square } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

const aiPromptVariants = cva(
  "relative flex flex-col rounded-[var(--curves-lg)] border border-[var(--container-border-alt)] bg-[var(--container-bg)] text-[var(--container-fg)] transition-shadow focus-within:ring-1 focus-within:ring-[var(--interactive-border-alt)]",
  {
    variants: {
      size: {
        default: "p-[var(--spacing-sm)]",
        compact: "p-[var(--spacing-xs)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

/** Root container for the AI prompt input. */
export interface AIPromptProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit">,
    VariantProps<typeof aiPromptVariants> {
  /** Called when the user submits the prompt. */
  onSubmit?: (value: string) => void
  /** Disables all interactive elements. */
  disabled?: boolean
  /** Shows a loading/generating state on the submit button. */
  loading?: boolean
  /** Called when the user clicks stop during loading. */
  onStop?: () => void
}

const AIPromptContext = React.createContext<{
  disabled?: boolean
  loading?: boolean
}>({})

const AIPrompt = React.forwardRef<HTMLDivElement, AIPromptProps>(
  ({ className, size, disabled, loading, onSubmit: _onSubmit, onStop: _onStop, children, ...props }, ref) => (
    <AIPromptContext.Provider value={{ disabled, loading }}>
      <div
        ref={ref}
        className={cn(aiPromptVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    </AIPromptContext.Provider>
  )
)
AIPrompt.displayName = "AIPrompt"

/** Auto-expanding textarea for the AI prompt. */
export interface AIPromptInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AIPromptInput = React.forwardRef<HTMLTextAreaElement, AIPromptInputProps>(
  ({ className, onChange, ...props }, ref) => {
    const { disabled } = React.useContext(AIPromptContext)
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null)

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      },
      [ref]
    )

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.currentTarget
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
        onChange?.(e)
      },
      [onChange]
    )

    return (
      <textarea
        ref={setRefs}
        disabled={disabled}
        rows={1}
        className={cn(
          "w-full resize-none bg-transparent text-[var(--font-size-sm)] placeholder:text-[var(--foregrounds-tertiary)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
AIPromptInput.displayName = "AIPromptInput"

/** Bottom action bar with submit button and optional left-side actions. */
export interface AIPromptActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Called when the submit button is clicked. */
  onSubmit?: () => void
  /** Called when the stop button is clicked during loading. */
  onStop?: () => void
}

const AIPromptActions = React.forwardRef<HTMLDivElement, AIPromptActionsProps>(
  ({ className, onSubmit, onStop, children, ...props }, ref) => {
    const { disabled, loading } = React.useContext(AIPromptContext)

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-[var(--spacing-xs)] pt-[var(--spacing-xs)]",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-[var(--spacing-xs)]">
          {children}
        </div>
        {loading ? (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={onStop}
            aria-label="Stop generating"
          >
            <Square className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button
            type="button"
            variant="default"
            size="icon"
            disabled={disabled}
            onClick={onSubmit}
            aria-label="Submit"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        )}
      </div>
    )
  }
)
AIPromptActions.displayName = "AIPromptActions"

/** Optional footer with model info or caveat text. */
export interface AIPromptFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AIPromptFooter = React.forwardRef<HTMLDivElement, AIPromptFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "pt-[var(--spacing-xs)] text-[var(--font-size-xs)] text-[var(--foregrounds-tertiary)]",
        className
      )}
      {...props}
    />
  )
)
AIPromptFooter.displayName = "AIPromptFooter"

export { AIPrompt, aiPromptVariants, AIPromptInput, AIPromptActions, AIPromptFooter }
