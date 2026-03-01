"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cookieBannerVariants = cva(
  "fixed z-50 w-full p-4 shadow-lg transition-transform duration-300",
  {
    variants: {
      position: {
        bottom: "bottom-0 left-0",
        top: "top-0 left-0",
        "bottom-left": "bottom-4 left-4 max-w-md rounded-lg",
        "bottom-right": "bottom-4 right-4 max-w-md rounded-lg",
      },
      variant: {
        default: "border-t bg-background",
        dark: "bg-zinc-900 text-white",
        card: "border bg-card",
      },
    },
    defaultVariants: {
      position: "bottom",
      variant: "default",
    },
  }
)

export interface CookieBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cookieBannerVariants> {
  /**
   * Whether the banner is visible
   */
  isVisible?: boolean
  /**
   * Callback when accepted
   */
  onAccept?: () => void
  /**
   * Callback when declined
   */
  onDecline?: () => void
  /**
   * Callback when preferences are opened
   */
  onPreferences?: () => void
}

const CookieBanner = React.forwardRef<HTMLDivElement, CookieBannerProps>(
  (
    {
      className,
      position,
      variant,
      isVisible = true,
      children,
      ...props
    },
    ref
  ) => {
    if (!isVisible) return null

    return (
      <div
        ref={ref}
        className={cn(cookieBannerVariants({ position, variant }), className)}
        role="dialog"
        aria-label="Cookie consent"
        {...props}
      >
        <div className="container mx-auto">{children}</div>
      </div>
    )
  }
)
CookieBanner.displayName = "CookieBanner"

const CookieBannerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
      className
    )}
    {...props}
  />
))
CookieBannerContent.displayName = "CookieBannerContent"

const CookieBannerText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1", className)} {...props} />
))
CookieBannerText.displayName = "CookieBannerText"

const CookieBannerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading text-lg font-semibold", className)}
    {...props}
  />
))
CookieBannerTitle.displayName = "CookieBannerTitle"

const CookieBannerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-1 text-sm text-muted-foreground", className)}
    {...props}
  />
))
CookieBannerDescription.displayName = "CookieBannerDescription"

const CookieBannerActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-wrap items-center gap-2", className)}
    {...props}
  />
))
CookieBannerActions.displayName = "CookieBannerActions"

const CookieBannerLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "text-sm text-primary underline-offset-4 hover:underline",
      className
    )}
    {...props}
  />
))
CookieBannerLink.displayName = "CookieBannerLink"

// Cookie preferences modal
export interface CookiePreferencesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  onSave?: (preferences: CookiePreference[]) => void
}

export interface CookiePreference {
  id: string
  name: string
  description: string
  required?: boolean
  enabled: boolean
}

const CookiePreferences = React.forwardRef<HTMLDivElement, CookiePreferencesProps>(
  ({ className, isOpen, onClose, onSave, children, ...props }, ref) => {
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose()
      }

      if (isOpen) {
        document.addEventListener("keydown", handleEscape)
        document.body.style.overflow = "hidden"
      }

      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = ""
      }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div
          ref={ref}
          className={cn(
            "w-full max-w-lg rounded-lg bg-background p-6 shadow-xl",
            className
          )}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Cookie preferences"
          {...props}
        >
          {children}
        </div>
      </div>
    )
  }
)
CookiePreferences.displayName = "CookiePreferences"

const CookiePreferencesHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-6", className)}
    {...props}
  />
))
CookiePreferencesHeader.displayName = "CookiePreferencesHeader"

const CookiePreferencesTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("font-heading text-xl font-semibold", className)}
    {...props}
  />
))
CookiePreferencesTitle.displayName = "CookiePreferencesTitle"

const CookiePreferencesDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-2 text-sm text-muted-foreground", className)}
    {...props}
  />
))
CookiePreferencesDescription.displayName = "CookiePreferencesDescription"

const CookiePreferencesList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-4", className)}
    {...props}
  />
))
CookiePreferencesList.displayName = "CookiePreferencesList"

export interface CookiePreferenceItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  name: string
  description: string
  required?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
}

const CookiePreferenceItem = React.forwardRef<
  HTMLDivElement,
  CookiePreferenceItemProps
>(
  (
    {
      className,
      name,
      description,
      required = false,
      checked = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const id = React.useId()

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start justify-between gap-4 rounded-lg border p-4",
          className
        )}
        {...props}
      >
        <div className="flex-1">
          <label htmlFor={id} className="font-medium">
            {name}
            {required && (
              <span className="ml-2 text-xs text-muted-foreground">
                (Required)
              </span>
            )}
          </label>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="shrink-0">
          <button
            id={id}
            type="button"
            role="switch"
            aria-checked={required || checked}
            disabled={required}
            onClick={() => onChange?.(!checked)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              required || checked ? "bg-primary" : "bg-muted",
              required && "cursor-not-allowed opacity-50"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                required || checked ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>
      </div>
    )
  }
)
CookiePreferenceItem.displayName = "CookiePreferenceItem"

const CookiePreferencesFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-6 flex justify-end gap-2", className)}
    {...props}
  />
))
CookiePreferencesFooter.displayName = "CookiePreferencesFooter"

export {
  CookieBanner,
  CookieBannerContent,
  CookieBannerText,
  CookieBannerTitle,
  CookieBannerDescription,
  CookieBannerActions,
  CookieBannerLink,
  CookiePreferences,
  CookiePreferencesHeader,
  CookiePreferencesTitle,
  CookiePreferencesDescription,
  CookiePreferencesList,
  CookiePreferenceItem,
  CookiePreferencesFooter,
}
