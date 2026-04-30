import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ShieldAlert, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@vasf/ragnar-core"

const aiVerificationVariants = cva(
  "relative flex flex-col gap-[var(--spacing-sm)] border-l-2 border-[var(--cautionary-border)] rounded-[var(--curves-sm)] p-[var(--spacing-sm)]",
  {
    variants: {
      variant: {
        inline:
          "bg-[var(--cautionary-bg-alt,var(--container-bg-alt))]",
        modal:
          "bg-[var(--container-bg)] border border-[var(--container-border)] shadow-lg mx-auto max-w-md",
      },
    },
    defaultVariants: {
      variant: "inline",
    },
  }
)

export interface AIVerificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiVerificationVariants> {
  /** Title displayed in the verification header */
  title?: string
  /** Description of the action requiring confirmation */
  description?: string
  /** Callback when the user approves the action */
  onApprove?: () => void
  /** Callback when the user rejects the action */
  onReject?: () => void
  /** Optional callback when the user wants to edit the action */
  onEdit?: () => void
  /** Whether the verification is in a loading state */
  loading?: boolean
}

const AIVerificationContent = React.forwardRef<
  HTMLDivElement,
  AIVerificationProps & { isModal?: boolean }
>(
  (
    {
      className,
      variant,
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
    const header = (
      <div className="flex items-start gap-[var(--spacing-sm)]">
        <ShieldAlert className="h-5 w-5 shrink-0 text-[color:var(--cautionary-fg-strong)]" />
        <div className="flex flex-col gap-[var(--spacing-xxs)]">
          <p className="text-[length:var(--font-size-sm)] font-semibold text-[color:var(--container-fg)]">
            {title}
          </p>
          {description && (
            <p className="text-[length:var(--font-size-sm)] text-[color:var(--container-fg-alt)]">
              {description}
            </p>
          )}
        </div>
      </div>
    )

    const actions = (onApprove || onReject || onEdit) ? (
      <AIVerificationActions>
        {onApprove && (
          <Button
            variant="default"
            size="sm"
            onClick={onApprove}
            disabled={loading}
          >
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
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
      </AIVerificationActions>
    ) : null

    if (isModal) {
      return (
        <div ref={ref} {...props}>
          <DialogHeader>
            {header}
          </DialogHeader>
          {children}
          {actions && <DialogFooter>{actions}</DialogFooter>}
        </div>
      )
    }

    return (
      <Card
        ref={ref}
        elevation="none"
        className={cn(
          "border-l-2 border-[var(--cautionary-border)] rounded-[var(--curves-sm)] p-[var(--spacing-sm)] bg-[var(--cautionary-bg-alt,var(--container-bg-alt))] flex flex-col gap-[var(--spacing-sm)]",
          className
        )}
        role="alert"
        {...props}
      >
        {header}
        {children}
        {actions}
      </Card>
    )
  }
)
AIVerificationContent.displayName = "AIVerificationContent"

const AIVerification = React.forwardRef<HTMLDivElement, AIVerificationProps>(
  (
    {
      className,
      variant,
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
          <DialogContent className={cn("max-w-md", className)}>
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
        className={className}
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
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-[var(--spacing-xs)] pt-[var(--spacing-xxs)]",
      className
    )}
    {...props}
  />
))
AIVerificationActions.displayName = "AIVerificationActions"

export { AIVerification, AIVerificationActions, aiVerificationVariants }
