import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const logoCloudVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-background",
      muted: "bg-muted/50",
      bordered: "border-y bg-background",
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

export interface LogoCloudProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof logoCloudVariants> {
  title?: string
  /** Layout mode: flex row, responsive grid, or auto-scrolling marquee */
  layout?: "flex" | "grid" | "marquee"
  columns?: 3 | 4 | 5 | 6 | 8
}

const LogoCloud = React.forwardRef<HTMLDivElement, LogoCloudProps>(
  ({ className, variant, size, title, layout = "flex", columns = 5, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)

    const gridCols: Record<number, string> = {
      3: "grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
      5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
      6: "grid-cols-3 sm:grid-cols-6",
      8: "grid-cols-4 sm:grid-cols-8",
    }

    return (
      <section
        ref={ref}
        className={cn(logoCloudVariants({ variant, size }), className)}
        {...props}
      >
        <div className="container mx-auto px-4 overflow-hidden">
          {title && (
            <p className="mb-8 text-center text-[length:var(--font-size-xs)] font-normal uppercase tracking-widest text-[color:var(--foregrounds-quinary)]">
              {title}
            </p>
          )}

          {layout === "marquee" ? (
            <div className="hover:pause-marquee relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex animate-[marquee_30s_linear_infinite] items-center gap-12">
                {childArray}
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex animate-[marquee_30s_linear_infinite] items-center gap-12" aria-hidden>
                {childArray}
              </div>
              <style>{`
                @keyframes marquee {
                  from { transform: translateX(0); }
                  to { transform: translateX(-50%); }
                }
                .hover\\:pause-marquee:hover .animate-\\[marquee_30s_linear_infinite\\] {
                  animation-play-state: paused;
                }
              `}</style>
            </div>
          ) : layout === "grid" ? (
            <div className={cn("grid items-center gap-8", gridCols[columns] ?? gridCols[5])}>
              {children}
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
              {children}
            </div>
          )}
        </div>
      </section>
    )
  }
)
LogoCloud.displayName = "LogoCloud"

const logoItemVariants = cva(
  "flex items-center justify-center transition-all duration-300",
  {
    variants: {
      grayscale: {
        true: "opacity-50 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-105",
        false: "opacity-100 hover:scale-105",
      },
    },
    defaultVariants: {
      grayscale: true,
    },
  }
)

export interface LogoCloudItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof logoItemVariants> {
  href?: string
  name: string
}

const LogoCloudItem = React.forwardRef<HTMLDivElement, LogoCloudItemProps>(
  ({ className, grayscale, href, name, children, ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        className={cn(logoItemVariants({ grayscale }), className)}
        {...props}
      >
        {children}
      </div>
    )

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {content}
        </a>
      )
    }

    return content
  }
)
LogoCloudItem.displayName = "LogoCloudItem"

export { LogoCloud, LogoCloudItem }
