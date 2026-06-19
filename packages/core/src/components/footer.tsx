import * as React from "react"
import * as stylex from "@stylexjs/stylex"

type FooterVariant = "default" | "modern" | null | undefined
type FooterSize = "sm" | "default" | "lg" | null | undefined

export const footerVariants = (_options?: {
  variant?: FooterVariant
  size?: FooterSize
}) => ""

export interface FooterProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "style"> {
  variant?: FooterVariant
  size?: FooterSize
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ variant = "default", size = "default", children, ...props }, ref) => {
    const resolvedVariant = variant ?? "default"
    const resolvedSize = size ?? "default"

    return (
      <footer
        ref={ref}
        {...props}
        {...stylex.props(styles.footer, footerVariantStyles[resolvedVariant], footerSizeStyles[resolvedSize])}
      >
        <div {...stylex.props(styles.container)}>{children}</div>
      </footer>
    )
  }
)
Footer.displayName = "Footer"

const FooterContent = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
>((props, ref) => (
  <div
    ref={ref}
    {...props}
    {...stylex.props(styles.content)}
  />
))
FooterContent.displayName = "FooterContent"

const FooterSection = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
>((props, ref) => (
  <div ref={ref} {...props} {...stylex.props(styles.section)} />
))
FooterSection.displayName = "FooterSection"

const FooterTitle = React.forwardRef<
  HTMLHeadingElement,
  Omit<React.HTMLAttributes<HTMLHeadingElement>, "className" | "style">
>((props, ref) => (
  <h3
    ref={ref}
    {...props}
    {...stylex.props(styles.title)}
  />
))
FooterTitle.displayName = "FooterTitle"

const FooterLinks = React.forwardRef<
  HTMLUListElement,
  Omit<React.HTMLAttributes<HTMLUListElement>, "className" | "style">
>((props, ref) => (
  <ul ref={ref} {...props} {...stylex.props(styles.links)} />
))
FooterLinks.displayName = "FooterLinks"

export interface FooterLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "style"> {}

const FooterLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  (props, ref) => (
    <li>
      <a
        ref={ref}
        {...props}
        {...stylex.props(styles.link)}
      />
    </li>
  )
)
FooterLink.displayName = "FooterLink"

const FooterBottom = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
>((props, ref) => (
  <div
    ref={ref}
    {...props}
    {...stylex.props(styles.bottom)}
  />
))
FooterBottom.displayName = "FooterBottom"

const FooterCopyright = React.forwardRef<
  HTMLParagraphElement,
  Omit<React.HTMLAttributes<HTMLParagraphElement>, "className" | "style">
>((props, ref) => (
  <p
    ref={ref}
    {...props}
    {...stylex.props(styles.copyright)}
  />
))
FooterCopyright.displayName = "FooterCopyright"

const FooterSocial = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
>((props, ref) => (
  <div
    ref={ref}
    {...props}
    {...stylex.props(styles.social)}
  />
))
FooterSocial.displayName = "FooterSocial"

export interface FooterSocialLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "style"> {
  label: string
}

const FooterSocialLink = React.forwardRef<
  HTMLAnchorElement,
  FooterSocialLinkProps
>(({ label, children, ...props }, ref) => (
  <a
    ref={ref}
    aria-label={label}
    {...props}
    {...stylex.props(styles.socialLink)}
  >
    {children}
  </a>
))
FooterSocialLink.displayName = "FooterSocialLink"

export interface FooterBrandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  text?: string
}

const FooterBrand = React.forwardRef<HTMLDivElement, FooterBrandProps>(
  ({ text = "RAGNAR", children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(styles.brand)}
    >
      {children ?? (
        <span {...stylex.props(styles.brandText)}>
          {text}
        </span>
      )}
    </div>
  )
)
FooterBrand.displayName = "FooterBrand"

const FooterModernLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ children, ...props }, ref) => (
    <li>
      <a
        ref={ref}
        {...props}
        {...stylex.props(styles.modernLink)}
      >
        {children}
      </a>
    </li>
  )
)
FooterModernLink.displayName = "FooterModernLink"

const FooterModernSocialLink = React.forwardRef<
  HTMLAnchorElement,
  FooterSocialLinkProps
>(({ label, children, ...props }, ref) => (
  <a
    ref={ref}
    aria-label={label}
    {...props}
    {...stylex.props(styles.modernSocialLink)}
  >
    {children}
  </a>
))
FooterModernSocialLink.displayName = "FooterModernSocialLink"

export interface FooterStaggerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Delay increment between children in ms (default 80). */
  delayMs?: number
}

const FooterStagger = React.forwardRef<HTMLDivElement, FooterStaggerProps>(
  ({ delayMs = 80, children, ...props }, ref) => {
    const items = React.Children.toArray(children)
    return (
      <div ref={ref} {...props}>
        {items.map((child, i) => (
          <div
            key={i}
            {...stylex.props(styles.fadeItem)}
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

const footerFadeIn = stylex.keyframes({
  from: {
    opacity: 0,
    transform: "translateY(8px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
})

const styles = stylex.create({
  footer: {
    width: "100%",
  },
  footerDefault: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border-alt)",
    borderStyle: "solid",
    borderWidth: 0,
    borderTopWidth: 1,
    color: "var(--container-fg)",
  },
  footerModern: {
    backgroundColor: "var(--container-fg)",
    color: "var(--container-fg-inverse)",
  },
  container: {
    boxSizing: "border-box",
    marginInline: "auto",
    maxWidth: "80rem",
    paddingInline: "var(--spacing-md)",
    width: "100%",
  },
  content: {
    display: "grid",
    gap: "var(--spacing-lg)",
    gridTemplateColumns: {
      default: "1fr",
      "@media (min-width: 768px)": "repeat(2, minmax(0, 1fr))",
      "@media (min-width: 1024px)": "repeat(4, minmax(0, 1fr))",
    },
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-md)",
  },
  title: {
    color: "inherit",
    fontFamily: "var(--font-heading)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 600,
    letterSpacing: "0.05em",
    marginBlock: 0,
    textTransform: "uppercase",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
    listStyle: "none",
    marginBlock: 0,
    paddingInlineStart: 0,
  },
  link: {
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-sm)",
    textDecoration: "none",
    transitionDuration: "150ms",
    transitionProperty: "color",
    transitionTimingFunction: "ease",
    ":hover": {
      color: "var(--interactive-fg)",
    },
  },
  bottom: {
    alignItems: "center",
    borderColor: "var(--container-border-alt)",
    borderStyle: "solid",
    borderWidth: 0,
    borderTopWidth: 1,
    display: "flex",
    flexDirection: {
      default: "column",
      "@media (min-width: 768px)": "row",
    },
    gap: "var(--spacing-md)",
    justifyContent: "space-between",
    marginTop: "var(--spacing-lg)",
    paddingTop: "var(--spacing-lg)",
  },
  copyright: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-sm)",
    marginBlock: 0,
  },
  social: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-md)",
  },
  socialLink: {
    color: "var(--interactive-fg-alt)",
    textDecoration: "none",
    transitionDuration: "150ms",
    transitionProperty: "color",
    transitionTimingFunction: "ease",
    ":hover": {
      color: "var(--interactive-fg)",
    },
  },
  brand: {
    borderBottomColor: "var(--container-border-alt)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    overflow: "hidden",
    paddingBottom: "var(--spacing-xl)",
    userSelect: "none",
  },
  brandText: {
    color: "var(--container-border-alt)",
    display: "block",
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(3rem, 10vw, 8rem)",
    fontWeight: 800,
    letterSpacing: "-0.05em",
    lineHeight: 1,
    textTransform: "uppercase",
  },
  modernLink: {
    backgroundImage: "linear-gradient(var(--container-fg-inverse), var(--container-fg-inverse))",
    backgroundPosition: "left bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "0 1px",
    color: "var(--interactive-fg-alt)",
    display: "inline-block",
    fontSize: "var(--font-size-sm)",
    position: "relative",
    textDecoration: "none",
    transitionDuration: "200ms, 300ms",
    transitionProperty: "color, background-size",
    transitionTimingFunction: "ease",
    ":hover": {
      backgroundSize: "100% 1px",
      color: "var(--container-fg-inverse)",
    },
  },
  modernSocialLink: {
    alignItems: "center",
    borderColor: "var(--container-border-alt)",
    borderRadius: "var(--radius-radius-full)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--interactive-fg-alt)",
    display: "inline-flex",
    height: "var(--size-lg)",
    justifyContent: "center",
    textDecoration: "none",
    transitionDuration: "200ms",
    transitionProperty: "border-color, color, transform",
    transitionTimingFunction: "ease",
    width: "var(--size-lg)",
    ":hover": {
      borderColor: "var(--interactive-border-alt)",
      color: "var(--container-fg-inverse)",
      transform: "scale(1.1)",
    },
  },
  fadeItem: {
    animationDuration: "0.5s",
    animationFillMode: "both",
    animationName: footerFadeIn,
    animationTimingFunction: "ease",
  },
})

const footerVariantStyles = {
  default: styles.footerDefault,
  modern: styles.footerModern,
}

const footerSizeStyles = stylex.create({
  sm: {
    paddingBlock: "var(--spacing-lg)",
  },
  default: {
    paddingBlock: "var(--spacing-2xl)",
  },
  lg: {
    paddingBlock: "calc(var(--spacing-2xl) * 1.5)",
  },
})

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
