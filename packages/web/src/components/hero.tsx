import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const heroVariants = cva(
  "relative flex flex-col items-center justify-center overflow-hidden",
  {
    variants: {
      size: {
        sm: "min-h-[40vh] py-[var(--spacing-3xl)]",
        default: "min-h-[60vh] py-[var(--spacing-4xl)]",
        lg: "min-h-[80vh] py-[var(--spacing-4xl)]",
        full: "min-h-screen py-[var(--spacing-4xl)]",
      },
      align: {
        left: "items-start text-left",
        center: "items-center text-center",
        right: "items-end text-right",
      },
    },
    defaultVariants: {
      size: "default",
      align: "center",
    },
  }
)

export interface HeroProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heroVariants> {
  backgroundImage?: string
  backgroundOverlay?: boolean
  overlayOpacity?: number
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  (
    {
      className,
      size,
      align,
      backgroundImage,
      backgroundOverlay = true,
      overlayOpacity = 0.5,
      children,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(heroVariants({ size, align }), className)}
        style={{
          ...style,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        {...props}
      >
        {backgroundImage && backgroundOverlay && (
          <div
            className="absolute inset-0 bg-[var(--container-bg)]"
            style={{ opacity: overlayOpacity }}
          />
        )}
        <div className={cn(
          "container relative z-10 mx-auto px-[var(--spacing-md)]",
          align === "center" && "flex flex-col items-center text-center"
        )}>
          {children}
        </div>
      </section>
    )
  }
)
Hero.displayName = "Hero"

const HeroBadge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "mb-[var(--spacing-md)] inline-flex items-center rounded-full border border-[color:var(--container-border-alt)] bg-[var(--container-bg-alt)] px-[var(--spacing-md)] py-[var(--spacing-xs)] text-sm font-medium text-[var(--container-fg-alt)]",
      className
    )}
    {...props}
  />
))
HeroBadge.displayName = "HeroBadge"

const HeroTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "max-w-4xl w-full font-heading text-4xl font-medium tracking-tight text-[var(--container-fg)] sm:text-5xl md:text-6xl lg:text-7xl",
      className
    )}
    {...props}
  />
))
HeroTitle.displayName = "HeroTitle"

const HeroSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mt-[var(--spacing-md)] max-w-2xl w-full text-lg text-[var(--container-fg-alt)] sm:text-xl",
      className
    )}
    {...props}
  />
))
HeroSubtitle.displayName = "HeroSubtitle"

const HeroActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-[var(--spacing-lg)] flex flex-wrap items-center justify-center gap-[var(--spacing-md)]",
      className
    )}
    {...props}
  />
))
HeroActions.displayName = "HeroActions"

const HeroImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-[var(--spacing-2xl)] w-full max-w-5xl",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
HeroImage.displayName = "HeroImage"

export {
  Hero,
  HeroBadge,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  HeroImage,
}
