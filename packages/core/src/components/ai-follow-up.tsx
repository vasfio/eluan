import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { ArrowRight } from "lucide-react"

type FollowUpVariant = "list" | "cards" | "chips"

const aiFollowUpVariants = () => ""
const aiFollowUpItemVariants = () => ""

export interface AIFollowUpProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Optional heading text */
  heading?: string
  variant?: FollowUpVariant
}

export interface AIFollowUpItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  /** Hide the arrow icon */
  hideIcon?: boolean
  variant?: FollowUpVariant
}

const styles = stylex.create({
  root: {
    width: "100%",
  },
  heading: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
    fontWeight: 500,
    letterSpacing: "0.025em",
    marginBottom: "var(--spacing-sm)",
    textTransform: "uppercase",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  chips: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "var(--spacing-xs)",
  },
  item: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderStyle: "solid",
    borderWidth: 0,
    color: "var(--container-fg)",
    cursor: "pointer",
    display: "flex",
    fontSize: "var(--font-size-sm)",
    gap: "var(--spacing-xs)",
    transitionDuration: "150ms",
    transitionProperty: "background-color, color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":disabled": {
      opacity: 0.5,
      pointerEvents: "none",
    },
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
  },
  itemList: {
    borderBottomColor: "var(--container-border)",
    borderBottomWidth: 1,
    justifyContent: "flex-start",
    padding: "var(--spacing-xs)",
    paddingBlock: "var(--spacing-sm)",
    width: "100%",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
    ":last-child": {
      borderBottomWidth: 0,
    },
  },
  itemCards: {
    borderColor: "var(--container-border)",
    borderRadius: "var(--curves-md)",
    borderWidth: 1,
    justifyContent: "flex-start",
    padding: "var(--spacing-sm)",
    width: "100%",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  itemChips: {
    borderColor: "var(--container-border)",
    borderRadius: "var(--curves-md)",
    borderWidth: 1,
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  icon: {
    color: "var(--container-fg-alt)",
    flexShrink: 0,
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  label: {
    textAlign: "left",
  },
})

const AIFollowUp = React.forwardRef<HTMLDivElement, AIFollowUpProps>(
  ({ variant = "list", heading, children, ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.root)}>
      {heading && <p {...stylex.props(styles.heading)}>{heading}</p>}
      <div
        {...stylex.props(
          variant === "list" && styles.list,
          variant === "cards" && styles.cards,
          variant === "chips" && styles.chips
        )}
      >
        {children}
      </div>
    </div>
  )
)
AIFollowUp.displayName = "AIFollowUp"

const AIFollowUpItem = React.forwardRef<
  HTMLButtonElement,
  AIFollowUpItemProps
>(({ variant = "list", hideIcon = false, children, ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    {...stylex.props(
      styles.item,
      variant === "list" && styles.itemList,
      variant === "cards" && styles.itemCards,
      variant === "chips" && styles.itemChips
    )}
  >
    {!hideIcon && <ArrowRight {...stylex.props(styles.icon)} />}
    <span {...stylex.props(styles.label)}>{children}</span>
  </button>
))
AIFollowUpItem.displayName = "AIFollowUpItem"

export {
  AIFollowUp,
  aiFollowUpVariants,
  AIFollowUpItem,
  aiFollowUpItemVariants,
}
