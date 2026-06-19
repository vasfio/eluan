import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { ArrowUp, Square } from "lucide-react"

import { Button } from "./button"

type PromptSize = "default" | "compact"

const aiPromptVariants = () => ""

export interface AIPromptProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "onSubmit" | "style"> {
  onSubmit?: (value: string) => void
  disabled?: boolean
  loading?: boolean
  onStop?: () => void
  size?: PromptSize
}

export interface AIPromptInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "style"> {}

export interface AIPromptActionsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  onSubmit?: () => void
  onStop?: () => void
}

export type AIPromptFooterProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
>

const AIPromptContext = React.createContext<{
  disabled?: boolean
  loading?: boolean
}>({})

const styles = stylex.create({
  root: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border-alt)",
    borderRadius: "var(--curves-lg)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--container-fg)",
    display: "flex",
    flexDirection: "column",
    padding: "var(--spacing-sm)",
    position: "relative",
    transitionDuration: "150ms",
    transitionProperty: "box-shadow",
    ":focus-within": {
      boxShadow: "0 0 0 1px var(--interactive-border-alt)",
    },
  },
  rootCompact: {
    padding: "var(--spacing-xs)",
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 0,
    color: "inherit",
    fontSize: "var(--font-size-sm)",
    resize: "none",
    width: "100%",
    "::placeholder": {
      color: "var(--foregrounds-tertiary)",
    },
    ":focus": {
      outlineStyle: "none",
    },
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
  actions: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-xs)",
    justifyContent: "space-between",
    paddingTop: "var(--spacing-xs)",
  },
  actionGroup: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-xs)",
  },
  iconSm: {
    height: "calc(var(--size-xxs) + var(--spacing-xxs))",
    width: "calc(var(--size-xxs) + var(--spacing-xxs))",
  },
  iconXs: {
    height: "calc(var(--size-xxs) - var(--spacing-xxs))",
    width: "calc(var(--size-xxs) - var(--spacing-xxs))",
  },
  footer: {
    color: "var(--foregrounds-tertiary)",
    fontSize: "var(--font-size-xs)",
    paddingTop: "var(--spacing-xs)",
  },
})

const AIPrompt = React.forwardRef<HTMLDivElement, AIPromptProps>(
  (
    {
      size = "default",
      disabled,
      loading,
      onSubmit: _onSubmit,
      onStop: _onStop,
      children,
      ...props
    },
    ref
  ) => (
    <AIPromptContext.Provider value={{ disabled, loading }}>
      <div
        ref={ref}
        {...props}
        {...stylex.props(styles.root, size === "compact" && styles.rootCompact)}
      >
        {children}
      </div>
    </AIPromptContext.Provider>
  )
)
AIPrompt.displayName = "AIPrompt"

const AIPromptInput = React.forwardRef<HTMLTextAreaElement, AIPromptInputProps>(
  ({ onChange, ...props }, ref) => {
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
        onChange={handleChange}
        {...props}
        {...stylex.props(styles.input)}
      />
    )
  }
)
AIPromptInput.displayName = "AIPromptInput"

const AIPromptActions = React.forwardRef<HTMLDivElement, AIPromptActionsProps>(
  ({ onSubmit, onStop, children, ...props }, ref) => {
    const { disabled, loading } = React.useContext(AIPromptContext)

    return (
      <div ref={ref} {...props} {...stylex.props(styles.actions)}>
        <div {...stylex.props(styles.actionGroup)}>
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
            <Square {...stylex.props(styles.iconXs)} />
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
            <ArrowUp {...stylex.props(styles.iconSm)} />
          </Button>
        )}
      </div>
    )
  }
)
AIPromptActions.displayName = "AIPromptActions"

const AIPromptFooter = React.forwardRef<HTMLDivElement, AIPromptFooterProps>(
  ({ ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.footer)} />
  )
)
AIPromptFooter.displayName = "AIPromptFooter"

export { AIPrompt, aiPromptVariants, AIPromptInput, AIPromptActions, AIPromptFooter }
