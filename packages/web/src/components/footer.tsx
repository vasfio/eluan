import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const footerVariants = cva("w-full", {
  variants: {
    variant: {
      default: "border-t bg-background",
      modern: "bg-zinc-950 text-zinc-100",
    },
    size: {
      sm: "py-8",
      default: "py-12",
      lg: "py-16",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface FooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(footerVariants({ variant, size }), className)}
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

/* ------------------------------------------------------------------ */
/*  Modern footer variant sub-components                              */
/* ------------------------------------------------------------------ */

/** Large brand wordmark that spans the footer width. */
export interface FooterBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
}

const FooterBrand = React.forwardRef<HTMLDivElement, FooterBrandProps>(
  ({ className, text = "RAGNAR", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "select-none overflow-hidden border-b border-zinc-800 pb-10",
        className
      )}
      {...props}
    >
      {children ?? (
        <span className="block font-heading text-[clamp(3rem,10vw,8rem)] font-extrabold uppercase leading-none tracking-tighter text-zinc-800">
          {text}
        </span>
      )}
    </div>
  )
)
FooterBrand.displayName = "FooterBrand"

/** A link with an animated underline slide-in on hover. */
const FooterModernLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ className, children, ...props }, ref) => (
    <li>
      <a
        ref={ref}
        className={cn(
          "group relative inline-block text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-100",
          className
        )}
        {...props}
      >
        {children}
        <span className="absolute bottom-0 left-0 h-px w-0 bg-zinc-100 transition-all duration-300 group-hover:w-full" />
      </a>
    </li>
  )
)
FooterModernLink.displayName = "FooterModernLink"

/** Social icon button with scale + glow hover effect. */
const FooterModernSocialLink = React.forwardRef<
  HTMLAnchorElement,
  FooterSocialLinkProps
>(({ className, label, children, ...props }, ref) => (
  <a
    ref={ref}
    aria-label={label}
    className={cn(
      "inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-all duration-200 hover:scale-110 hover:border-zinc-600 hover:text-zinc-100 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]",
      className
    )}
    {...props}
  >
    {children}
  </a>
))
FooterModernSocialLink.displayName = "FooterModernSocialLink"

/** Wrapper that applies staggered fade-in via CSS animation-delay on children. */
export interface FooterStaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Delay increment between children in ms (default 80). */
  delayMs?: number
}

const FooterStagger = React.forwardRef<HTMLDivElement, FooterStaggerProps>(
  ({ className, delayMs = 80, children, ...props }, ref) => {
    const items = React.Children.toArray(children)
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {items.map((child, i) => (
          <div
            key={i}
            className="animate-[footerFadeIn_0.5s_ease_both]"
            style={{ animationDelay: `${i * delayMs}ms` }}
          >
            {child}
          </div>
        ))}
      </div>
    )
  }
)
FooterStagger.displayName = "FooterStagger"

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
  FooterBrand,
  FooterModernLink,
  FooterModernSocialLink,
  FooterStagger,
}
