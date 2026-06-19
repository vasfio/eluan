import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Shield } from "lucide-react"

import { Button } from "./button"
import { Card } from "./card"
import { Dialog, DialogContent, DialogFooter } from "./dialog"

export type AIConsentVariant = "card" | "banner" | "dialog"

export interface AIConsentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** List of data items that will be used */
  items?: string[]
  /** Called when the user allows */
  onAllow?: () => void
  /** Called when the user denies */
  onDeny?: () => void
  /** Description of what the AI will do */
  description?: string
  /** Consent title */
  title?: string
  variant?: AIConsentVariant
}

const styles = stylex.create({
  banner: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border)",
    borderLeftColor: "var(--informative-border)",
    borderLeftWidth: 2,
    borderRadius: "var(--curves-sm)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--container-fg)",
    padding: "var(--spacing-md)",
  },
  header: {
    alignItems: "flex-start",
    display: "flex",
    gap: "var(--spacing-sm)",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  icon: {
    color: "var(--informative-fg)",
    flexShrink: 0,
    height: "var(--size-xs)",
    width: "var(--size-xs)",
  },
  title: {
    color: "var(--container-fg)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
  },
  description: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-sm)",
    margin: 0,
  },
  list: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-sm)",
    listStyleType: "disc",
    marginBlock: 0,
    paddingLeft: "var(--spacing-md)",
  },
  content: {
    padding: "var(--spacing-md)",
  },
  actions: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-xs)",
    justifyContent: "flex-end",
    marginTop: "var(--spacing-sm)",
  },
  cardInner: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-md)",
    padding: "var(--spacing-md)",
  },
})

const AIConsentItemsList = ({
  items,
}: {
  items: string[]
}) => (
  <ul {...stylex.props(styles.list)}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
)

const AIConsentActionButtons = ({
  onAllow,
  onDeny,
}: {
  onAllow?: () => void
  onDeny?: () => void
}) => (
  <>
    {onDeny && (
      <Button variant="outline" size="sm" onClick={onDeny}>
        Deny
      </Button>
    )}
    {onAllow && (
      <Button variant="default" size="sm" onClick={onAllow}>
        Allow
      </Button>
    )}
  </>
)

const AIConsent = React.forwardRef<HTMLDivElement, AIConsentProps>(
  (
    {
      variant = "card",
      title = "AI Permission Required",
      description,
      items,
      onAllow,
      onDeny,
      children,
      ...props
    },
    ref
  ) => {
    const shieldIcon = <Shield {...stylex.props(styles.icon)} />

    const mainContent = (
      <>
        <div {...stylex.props(styles.header)}>
          {shieldIcon}
          <div {...stylex.props(styles.body)}>
            <span {...stylex.props(styles.title)}>{title}</span>
            {description && <p {...stylex.props(styles.description)}>{description}</p>}
            {items && items.length > 0 && <AIConsentItemsList items={items} />}
            {children}
          </div>
        </div>
      </>
    )

    const content = (
      <>
        {mainContent}
        {(onAllow || onDeny) && (
          <AIConsentActions>
            <AIConsentActionButtons onAllow={onAllow} onDeny={onDeny} />
          </AIConsentActions>
        )}
      </>
    )

    if (variant === "card") {
      return (
        <Card ref={ref} elevation="sm" {...props}>
          <div {...stylex.props(styles.cardInner)}>{content}</div>
        </Card>
      )
    }

    if (variant === "dialog") {
      return (
        <Dialog open>
          <DialogContent ref={ref} {...props}>
            <div {...stylex.props(styles.content)}>{mainContent}</div>
            {(onAllow || onDeny) && (
              <DialogFooter>
                <AIConsentActionButtons onAllow={onAllow} onDeny={onDeny} />
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      )
    }

    return (
      <div ref={ref} {...props} {...stylex.props(styles.banner)}>
        {content}
      </div>
    )
  }
)
AIConsent.displayName = "AIConsent"

const AIConsentActions = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
>((props, ref) => <div ref={ref} {...props} {...stylex.props(styles.actions)} />)
AIConsentActions.displayName = "AIConsentActions"

export { AIConsent, AIConsentActions }
