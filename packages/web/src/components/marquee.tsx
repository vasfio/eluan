import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const marqueeVariants = cva("w-full overflow-hidden", {
  variants: {
    variant: {
      default: "",
      fade: "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
    },
  },
  defaultVariants: {
    variant: "fade",
  },
})

export interface MarqueeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marqueeVariants> {
  /**
   * Duration of one complete loop in seconds
   * @default 40
   */
  duration?: number
  /**
   * Direction of the marquee
   * @default "left"
   */
  direction?: "left" | "right"
  /**
   * Whether to pause on hover
   * @default true
   */
  pauseOnHover?: boolean
  /**
   * Gap between items
   * @default 16
   */
  gap?: number
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      variant,
      duration = 40,
      direction = "left",
      pauseOnHover = true,
      gap = 16,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(marqueeVariants({ variant }), className)}
        {...props}
      >
        <div
          className={cn(
            "flex w-max animate-marquee",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          style={{
            gap: `${gap}px`,
            animationDuration: `${duration}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {children}
          {/* Duplicate for seamless loop */}
          <div className="flex" style={{ gap: `${gap}px` }} aria-hidden>
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Marquee.displayName = "Marquee"

const MarqueeItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex shrink-0 items-center", className)}
    {...props}
  />
))
MarqueeItem.displayName = "MarqueeItem"

// Vertical marquee variant
const verticalMarqueeVariants = cva("h-full overflow-hidden", {
  variants: {
    variant: {
      default: "",
      fade: "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
    },
  },
  defaultVariants: {
    variant: "fade",
  },
})

export interface VerticalMarqueeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof verticalMarqueeVariants> {
  duration?: number
  direction?: "up" | "down"
  pauseOnHover?: boolean
  gap?: number
}

const VerticalMarquee = React.forwardRef<HTMLDivElement, VerticalMarqueeProps>(
  (
    {
      className,
      variant,
      duration = 40,
      direction = "up",
      pauseOnHover = true,
      gap = 16,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(verticalMarqueeVariants({ variant }), className)}
        {...props}
      >
        <div
          className={cn(
            "flex h-max flex-col animate-marquee-vertical",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          style={{
            gap: `${gap}px`,
            animationDuration: `${duration}s`,
            animationDirection: direction === "down" ? "reverse" : "normal",
          }}
        >
          {children}
          {/* Duplicate for seamless loop */}
          <div className="flex flex-col" style={{ gap: `${gap}px` }} aria-hidden>
            {children}
          </div>
        </div>
      </div>
    )
  }
)
VerticalMarquee.displayName = "VerticalMarquee"

// Testimonial card for marquee
const MarqueeTestimonial = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-80 shrink-0 rounded-[var(--curves-xl)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] p-[var(--spacing-md)] transition-shadow duration-300 hover:shadow-md hover:shadow-black/[0.04]",
      className
    )}
    {...props}
  />
))
MarqueeTestimonial.displayName = "MarqueeTestimonial"

const MarqueeTestimonialContent = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm leading-relaxed text-[var(--container-fg-alt)]", className)}
    {...props}
  />
))
MarqueeTestimonialContent.displayName = "MarqueeTestimonialContent"

const MarqueeTestimonialAuthor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-[var(--spacing-md)] flex items-center gap-[var(--spacing-sm)]", className)}
    {...props}
  />
))
MarqueeTestimonialAuthor.displayName = "MarqueeTestimonialAuthor"

const MarqueeTestimonialAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src?: string
    alt?: string
    fallback?: string
  }
>(({ className, src, alt, fallback, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-10 w-10 overflow-hidden rounded-full bg-[var(--container-bg-alt)]", className)}
    {...props}
  >
    {src ? (
      <img src={src} alt={alt || ""} className="h-full w-full object-cover" />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-sm font-normal text-[var(--container-fg-alt)]">
        {fallback || alt?.charAt(0).toUpperCase()}
      </div>
    )}
  </div>
))
MarqueeTestimonialAvatar.displayName = "MarqueeTestimonialAvatar"

const MarqueeTestimonialInfo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
MarqueeTestimonialInfo.displayName = "MarqueeTestimonialInfo"

const MarqueeTestimonialName = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-normal text-[var(--container-fg)]", className)}
    {...props}
  />
))
MarqueeTestimonialName.displayName = "MarqueeTestimonialName"

const MarqueeTestimonialRole = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xs text-[var(--container-fg-alt)]", className)}
    {...props}
  />
))
MarqueeTestimonialRole.displayName = "MarqueeTestimonialRole"

export {
  Marquee,
  MarqueeItem,
  VerticalMarquee,
  MarqueeTestimonial,
  MarqueeTestimonialContent,
  MarqueeTestimonialAuthor,
  MarqueeTestimonialAvatar,
  MarqueeTestimonialInfo,
  MarqueeTestimonialName,
  MarqueeTestimonialRole,
}
