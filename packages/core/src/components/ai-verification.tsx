import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { ShieldAlert, Loader2 } from "lucide-react"

import { Button } from "./button"
import { Card } from "./card"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./dialog"

export type AIVerificationVariant = "inline" | "modal"

export interface AIVerificationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Description of the action requiring confirmation */
  description?: string
  /** Whether the verification is in a loading state */
  loading?: boolean
  /** Callback when the user approves the action */
  onApprove?: () => void
  /** Optional callback when the user wants to edit the action */
  onEdit?: () => void
  /** Callback when the user rejects the action */
  onReject?: () => void
  /** Title displayed in the verification header */
  title?: string
  variant?: AIVerificationVariant
}

const spin = stylex.keyframes({
  to: {
    transform: "rotate(360deg)",
  },
})

const styles = stylex.create({
  card: {
    backgroundColor: "var(--cautionary-bg-alt, var(--container-bg-alt))",
    borderLeftColor: "var(--cautionary-border)",
    borderLeftStyle: "solid",
    borderLeftWidth: 2,
    borderRadius: "var(--curves-sm)",
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
    padding: "var(--spacing-sm)",
  },
  header: {
    alignItems: "flex-start",
    display: "flex",
    gap: "var(--spacing-sm)",
  },
  icon: {
    color: "var(--cautionary-fg)",
    flexShrink: 0,
    height: "var(--size-xs)",
    width: "var(--size-xs)",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xxs)",
  },
  title: {
    color: "var(--container-fg)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 600,
    margin: 0,
  },
  description: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-sm)",
    margin: 0,
  },
  actions: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-xs)",
    paddingTop: "var(--spacing-xxs)",
  },
  loadingIcon: {
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
    height: "calc(var(--spacing-md) + var(--spacing-xxs))",
    width: "calc(var(--spacing-md) + var(--spacing-xxs))",
  },
})

const AIVerificationHeader = ({
  title,
  description,
}: {
  title: string
  description?: string
}) => (
  <div {...stylex.props(styles.header)}>
    <ShieldAlert {...stylex.props(styles.icon)} />
    <div {...stylex.props(styles.copy)}>
      <p {...stylex.props(styles.title)}>{title}</p>
      {description && <p {...stylex.props(styles.description)}>{description}</p>}
    </div>
  </div>
)

const AIVerificationActionButtons = ({
  loading,
  onApprove,
  onEdit,
  onReject,
}: Pick<AIVerificationProps, "loading" | "onApprove" | "onEdit" | "onReject">) => (
  <>
    {onApprove && (
      <Button
        variant="default"
        size="sm"
        onClick={onApprove}
        disabled={loading}
      >
        {loading && <Loader2 {...stylex.props(styles.loadingIcon)} />}
        Approve
      </Button>
    )}
    {onReject && (
      <Button
        variant="outline"
        size="sm"
        onClick={onReject}
        disabled={loading}
      >
        Reject
      </Button>
    )}
    {onEdit && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
        disabled={loading}
      >
        Edit
      </Button>
    )}
  </>
)

const AIVerificationContent = React.forwardRef<
  HTMLDivElement,
  AIVerificationProps & { isModal?: boolean }
>(
  (
    {
      title = "Confirm action",
      description,
      onApprove,
      onReject,
      onEdit,
      loading = false,
      children,
      isModal,
      ...props
    },
    ref
  ) => {
    const actions = (onApprove || onReject || onEdit) ? (
      <AIVerificationActions>
        <AIVerificationActionButtons
          loading={loading}
          onApprove={onApprove}
          onEdit={onEdit}
          onReject={onReject}
        />
      </AIVerificationActions>
    ) : null

    if (isModal) {
      return (
        <div ref={ref} {...props}>
          <DialogHeader>
            <AIVerificationHeader title={title} description={description} />
          </DialogHeader>
          {children}
          {actions && <DialogFooter>{actions}</DialogFooter>}
        </div>
      )
    }

    return (
      <Card ref={ref} elevation="none" role="alert" {...props}>
        <div {...stylex.props(styles.card)}>
          <div {...stylex.props(styles.inner)}>
            <AIVerificationHeader title={title} description={description} />
            {children}
            {actions}
          </div>
        </div>
      </Card>
    )
  }
)
AIVerificationContent.displayName = "AIVerificationContent"

const AIVerification = React.forwardRef<HTMLDivElement, AIVerificationProps>(
  (
    {
      variant = "inline",
      title = "Confirm action",
      description,
      onApprove,
      onReject,
      onEdit,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    if (variant === "modal") {
      return (
        <Dialog open>
          <DialogContent>
            <AIVerificationContent
              ref={ref}
              variant={variant}
              title={title}
              description={description}
              onApprove={onApprove}
              onReject={onReject}
              onEdit={onEdit}
              loading={loading}
              isModal
              {...props}
            >
              {children}
            </AIVerificationContent>
          </DialogContent>
        </Dialog>
      )
    }

    return (
      <AIVerificationContent
        ref={ref}
        variant={variant}
        title={title}
        description={description}
        onApprove={onApprove}
        onReject={onReject}
        onEdit={onEdit}
        loading={loading}
        {...props}
      >
        {children}
      </AIVerificationContent>
    )
  }
)
AIVerification.displayName = "AIVerification"

const AIVerificationActions = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
>((props, ref) => <div ref={ref} {...props} {...stylex.props(styles.actions)} />)
AIVerificationActions.displayName = "AIVerificationActions"

export { AIVerification, AIVerificationActions }
