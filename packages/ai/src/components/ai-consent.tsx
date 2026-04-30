import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Shield } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@vasf/ragnar-core"

const aiConsentVariants = cva(
  "border bg-[var(--container-bg)] text-[color:var(--container-fg)]",
  {
    variants: {
      variant: {
        card: "rounded-[var(--curves-md)] p-[var(--spacing-md)] shadow-sm",
        banner:
          "rounded-[var(--curves-sm)] p-[var(--spacing-md)] border-l-2 border-l-[var(--informative-border)]",
        dialog:
          "rounded-[var(--curves-lg)] p-[var(--spacing-lg)] shadow-lg",
      },
    },
    defaultVariants: {
      variant: "card",
    },
  }
)

export interface AIConsentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiConsentVariants> {
  /** Consent title */
  title?: string
  /** Description of what the AI will do */
  description?: string
  /** List of data items that will be used */
  items?: string[]
  /** Called when the user allows */
  onAllow?: () => void
  /** Called when the user denies */
  onDeny?: () => void
}

const AIConsentItemsList = ({
  items,
}: {
  items: string[]
}) => (
  <ul className="list-disc pl-[var(--spacing-md)] text-[length:var(--font-size-sm)] text-[color:var(--container-fg-alt)]">
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
      className,
      variant,
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
    const shieldIcon = (
      <Shield className="h-5 w-5 shrink-0 text-[color:var(--informative-fg-strong)]" />
    )

    if (variant === "card") {
      return (
        <Card ref={ref} className={cn("border", className)} elevation="sm" {...props}>
          <CardHeader className="flex-row items-start gap-[var(--spacing-sm)]">
            {shieldIcon}
            <div className="flex flex-col gap-[var(--spacing-xs)]">
              <CardTitle className="text-[length:var(--font-size-sm)]">{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
          </CardHeader>
          {(items?.length || children) && (
            <CardContent>
              {items && items.length > 0 && <AIConsentItemsList items={items} />}
              {children}
            </CardContent>
          )}
          {(onAllow || onDeny) && (
            <CardFooter className="justify-end gap-[var(--spacing-xs)]">
              <AIConsentActionButtons onAllow={onAllow} onDeny={onDeny} />
            </CardFooter>
          )}
        </Card>
      )
    }

    if (variant === "dialog") {
      return (
        <Dialog open>
          <DialogContent ref={ref} className={className} {...props}>
            <DialogHeader className="flex-row items-start gap-[var(--spacing-sm)]">
              {shieldIcon}
              <div className="flex flex-col gap-[var(--spacing-xs)]">
                <span className="font-medium text-[length:var(--font-size-sm)]">
                  {title}
                </span>
                {description && (
                  <p className="text-[length:var(--font-size-sm)] text-[color:var(--container-fg-alt)]">
                    {description}
                  </p>
                )}
              </div>
            </DialogHeader>
            {(items?.length || children) && (
              <div>
                {items && items.length > 0 && <AIConsentItemsList items={items} />}
                {children}
              </div>
            )}
            {(onAllow || onDeny) && (
              <DialogFooter>
                <AIConsentActionButtons onAllow={onAllow} onDeny={onDeny} />
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      )
    }

    // banner variant — keep inline layout
    return (
      <div
        ref={ref}
        className={cn(aiConsentVariants({ variant }), className)}
        {...props}
      >
        <div className="flex items-start gap-[var(--spacing-sm)]">
          {shieldIcon}
          <div className="flex flex-col gap-[var(--spacing-xs)]">
            <span className="font-medium text-[length:var(--font-size-sm)]">
              {title}
            </span>
            {description && (
              <p className="text-[length:var(--font-size-sm)] text-[color:var(--container-fg-alt)]">
                {description}
              </p>
            )}
            {items && items.length > 0 && <AIConsentItemsList items={items} />}
            {children}
          </div>
        </div>
        {(onAllow || onDeny) && (
          <AIConsentActions>
            <AIConsentActionButtons onAllow={onAllow} onDeny={onDeny} />
          </AIConsentActions>
        )}
      </div>
    )
  }
)
AIConsent.displayName = "AIConsent"

const AIConsentActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-[var(--spacing-sm)] flex items-center justify-end gap-[var(--spacing-xs)]",
      className
    )}
    {...props}
  />
))
AIConsentActions.displayName = "AIConsentActions"

export { AIConsent, AIConsentActions, aiConsentVariants }
