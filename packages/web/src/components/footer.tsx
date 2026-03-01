import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const footerVariants = cva("w-full border-t bg-background", {
  variants: {
    size: {
      sm: "py-8",
      default: "py-12",
      lg: "py-16",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface FooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(footerVariants({ size }), className)}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </footer>
    )
  }
)
Footer.displayName = "Footer"

const FooterContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid gap-8 md:grid-cols-2 lg:grid-cols-4",
      className
    )}
    {...props}
  />
))
FooterContent.displayName = "FooterContent"

const FooterSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-4", className)} {...props} />
))
FooterSection.displayName = "FooterSection"

const FooterTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading text-sm font-semibold uppercase tracking-wider text-foreground", className)}
    {...props}
  />
))
FooterTitle.displayName = "FooterTitle"

const FooterLinks = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("space-y-2", className)} {...props} />
))
FooterLinks.displayName = "FooterLinks"

export interface FooterLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const FooterLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ className, ...props }, ref) => (
    <li>
      <a
        ref={ref}
        className={cn(
          "text-sm text-muted-foreground transition-colors hover:text-foreground",
          className
        )}
        {...props}
      />
    </li>
  )
)
FooterLink.displayName = "FooterLink"

const FooterBottom = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row",
      className
    )}
    {...props}
  />
))
FooterBottom.displayName = "FooterBottom"

const FooterCopyright = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
FooterCopyright.displayName = "FooterCopyright"

const FooterSocial = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-4", className)}
    {...props}
  />
))
FooterSocial.displayName = "FooterSocial"

export interface FooterSocialLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string
}

const FooterSocialLink = React.forwardRef<
  HTMLAnchorElement,
  FooterSocialLinkProps
>(({ className, label, children, ...props }, ref) => (
  <a
    ref={ref}
    aria-label={label}
    className={cn(
      "text-muted-foreground transition-colors hover:text-foreground",
      className
    )}
    {...props}
  >
    {children}
  </a>
))
FooterSocialLink.displayName = "FooterSocialLink"

export {
  Footer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLinks,
  FooterLink,
  FooterBottom,
  FooterCopyright,
  FooterSocial,
  FooterSocialLink,
}
