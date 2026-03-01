import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const appDownloadSectionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-background",
      muted: "bg-muted/50",
      dark: "bg-zinc-900 text-white",
      gradient: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
    },
    size: {
      sm: "py-12",
      default: "py-16",
      lg: "py-24",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface AppDownloadSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof appDownloadSectionVariants> {}

const AppDownloadSection = React.forwardRef<HTMLDivElement, AppDownloadSectionProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(appDownloadSectionVariants({ variant, size }), className)}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    )
  }
)
AppDownloadSection.displayName = "AppDownloadSection"

const AppDownloadContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid items-center gap-8 md:grid-cols-2 md:gap-12",
      className
    )}
    {...props}
  />
))
AppDownloadContent.displayName = "AppDownloadContent"

const AppDownloadInfo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-6", className)} {...props} />
))
AppDownloadInfo.displayName = "AppDownloadInfo"

const AppDownloadTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "font-heading text-3xl font-bold tracking-tight sm:text-4xl",
      className
    )}
    {...props}
  />
))
AppDownloadTitle.displayName = "AppDownloadTitle"

const AppDownloadDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-lg opacity-90", className)}
    {...props}
  />
))
AppDownloadDescription.displayName = "AppDownloadDescription"

const AppDownloadButtons = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-wrap gap-4", className)}
    {...props}
  />
))
AppDownloadButtons.displayName = "AppDownloadButtons"

const storeBadgeVariants = cva(
  "inline-flex items-center gap-3 rounded-lg px-4 py-3 transition-transform hover:scale-105",
  {
    variants: {
      variant: {
        apple: "bg-black text-white",
        google: "bg-black text-white",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "apple",
    },
  }
)

export interface AppStoreBadgeProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof storeBadgeVariants> {}

const AppStoreBadge = React.forwardRef<HTMLAnchorElement, AppStoreBadgeProps>(
  ({ className, variant, href, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(storeBadgeVariants({ variant }), className)}
      {...props}
    >
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="text-left">
        <div className="text-xs opacity-80">Download on the</div>
        <div className="text-lg font-semibold leading-tight">App Store</div>
      </div>
    </a>
  )
)
AppStoreBadge.displayName = "AppStoreBadge"

const GooglePlayBadge = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, href, ...props }, ref) => (
  <a
    ref={ref}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(storeBadgeVariants({ variant: "google" }), className)}
    {...props}
  >
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31M6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
    </svg>
    <div className="text-left">
      <div className="text-xs opacity-80">Get it on</div>
      <div className="text-lg font-semibold leading-tight">Google Play</div>
    </div>
  </a>
))
GooglePlayBadge.displayName = "GooglePlayBadge"

const AppDownloadMockup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-center", className)}
    {...props}
  >
    {children}
  </div>
))
AppDownloadMockup.displayName = "AppDownloadMockup"

// Phone mockup frame
export interface PhoneMockupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Screenshot image URL
   */
  screenshot?: string
  /**
   * Alt text for screenshot
   */
  alt?: string
}

const PhoneMockup = React.forwardRef<HTMLDivElement, PhoneMockupProps>(
  ({ className, screenshot, alt = "App screenshot", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative mx-auto h-[500px] w-[250px] rounded-[2.5rem] border-[8px] border-gray-800 bg-gray-800 shadow-xl",
        className
      )}
      {...props}
    >
      {/* Notch */}
      <div className="absolute left-1/2 top-0 z-10 h-6 w-24 -translate-x-1/2 rounded-b-xl bg-gray-800" />

      {/* Screen */}
      <div className="h-full w-full overflow-hidden rounded-[2rem] bg-white">
        {screenshot ? (
          <img
            src={screenshot}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          children
        )}
      </div>

      {/* Side buttons */}
      <div className="absolute -left-[10px] top-24 h-8 w-1 rounded-l bg-gray-800" />
      <div className="absolute -left-[10px] top-36 h-14 w-1 rounded-l bg-gray-800" />
      <div className="absolute -left-[10px] top-52 h-14 w-1 rounded-l bg-gray-800" />
      <div className="absolute -right-[10px] top-32 h-16 w-1 rounded-r bg-gray-800" />
    </div>
  )
)
PhoneMockup.displayName = "PhoneMockup"

// QR Code for app download
export interface AppQRCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Label text
   */
  label?: string
}

const AppQRCode = React.forwardRef<HTMLDivElement, AppQRCodeProps>(
  ({ className, label = "Scan to download", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-center", className)}
      {...props}
    >
      <div className="mx-auto mb-2 h-32 w-32 rounded-lg border bg-white p-2">
        {children}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
)
AppQRCode.displayName = "AppQRCode"

export {
  AppDownloadSection,
  AppDownloadContent,
  AppDownloadInfo,
  AppDownloadTitle,
  AppDownloadDescription,
  AppDownloadButtons,
  AppStoreBadge,
  GooglePlayBadge,
  AppDownloadMockup,
  PhoneMockup,
  AppQRCode,
}
