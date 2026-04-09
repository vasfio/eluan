import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const teamSectionVariants = cva("w-full", {
  variants: {
    size: {
      sm: "py-[var(--spacing-2xl)]",
      default: "py-[var(--spacing-3xl)]",
      lg: "py-[var(--spacing-4xl)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface TeamSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof teamSectionVariants> {}

const TeamSection = React.forwardRef<HTMLDivElement, TeamSectionProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(teamSectionVariants({ size }), className)}
        {...props}
      >
        <div className="container mx-auto px-[var(--spacing-md)]">{children}</div>
      </section>
    )
  }
)
TeamSection.displayName = "TeamSection"

const TeamHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-[var(--spacing-2xl)] text-center", className)}
    {...props}
  />
))
TeamHeader.displayName = "TeamHeader"

const TeamTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "font-heading text-3xl font-medium tracking-tight text-[var(--container-fg)] sm:text-4xl",
      className
    )}
    {...props}
  />
))
TeamTitle.displayName = "TeamTitle"

const TeamDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mx-auto mt-[var(--spacing-md)] max-w-2xl text-lg leading-relaxed text-[var(--container-fg-alt)]",
      className
    )}
    {...props}
  />
))
TeamDescription.displayName = "TeamDescription"

const teamGridVariants = cva("grid gap-[var(--spacing-xl)]", {
  variants: {
    columns: {
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 4,
  },
})

export interface TeamGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof teamGridVariants> {}

const TeamGrid = React.forwardRef<HTMLDivElement, TeamGridProps>(
  ({ className, columns, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(teamGridVariants({ columns }), className)}
      {...props}
    />
  )
)
TeamGrid.displayName = "TeamGrid"

const teamMemberVariants = cva("group text-center", {
  variants: {
    variant: {
      default: "transition-all duration-300 hover:-translate-y-0.5",
      card: "rounded-[var(--curves-xl)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] p-[var(--spacing-lg)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.04]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface TeamMemberProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof teamMemberVariants> {}

const TeamMember = React.forwardRef<HTMLDivElement, TeamMemberProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(teamMemberVariants({ variant }), className)}
      {...props}
    />
  )
)
TeamMember.displayName = "TeamMember"

export interface TeamMemberImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

const TeamMemberImage = React.forwardRef<HTMLImageElement, TeamMemberImageProps>(
  ({ className, alt, fallback, ...props }, ref) => (
    <div className="relative mx-auto mb-[var(--spacing-md)] aspect-square w-full max-w-[200px] overflow-hidden rounded-[var(--curves-xl)] bg-[var(--container-bg-alt)]">
      {props.src ? (
        <img
          ref={ref}
          alt={alt}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
            className
          )}
          {...props}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-4xl font-medium text-[var(--container-fg-alt)]">
          {fallback || alt?.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  )
)
TeamMemberImage.displayName = "TeamMemberImage"

const TeamMemberName = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-medium text-[var(--container-fg)]", className)}
    {...props}
  />
))
TeamMemberName.displayName = "TeamMemberName"

const TeamMemberRole = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--container-fg-alt)]", className)}
    {...props}
  />
))
TeamMemberRole.displayName = "TeamMemberRole"

const TeamMemberBio = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-[var(--spacing-sm)] text-sm text-[var(--container-fg-alt)]", className)}
    {...props}
  />
))
TeamMemberBio.displayName = "TeamMemberBio"

const TeamMemberLinks = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-[var(--spacing-md)] flex justify-center gap-[var(--spacing-sm)]", className)}
    {...props}
  />
))
TeamMemberLinks.displayName = "TeamMemberLinks"

export interface TeamMemberLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string
}

const TeamMemberLink = React.forwardRef<HTMLAnchorElement, TeamMemberLinkProps>(
  ({ className, label, children, ...props }, ref) => (
    <a
      ref={ref}
      aria-label={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-[var(--curves-lg)] text-[var(--container-fg-alt)] transition-colors hover:bg-[var(--container-bg-alt)] hover:text-[var(--container-fg)]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
)
TeamMemberLink.displayName = "TeamMemberLink"

export {
  TeamSection,
  TeamHeader,
  TeamTitle,
  TeamDescription,
  TeamGrid,
  TeamMember,
  TeamMemberImage,
  TeamMemberName,
  TeamMemberRole,
  TeamMemberBio,
  TeamMemberLinks,
  TeamMemberLink,
}
