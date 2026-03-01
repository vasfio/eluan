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
}

const LogoCloud = React.forwardRef<HTMLDivElement, LogoCloudProps>(
  ({ className, variant, size, title, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(logoCloudVariants({ variant, size }), className)}
        {...props}
      >
        <div className="container mx-auto px-4">
          {title && (
            <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
              {title}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {children}
          </div>
        </div>
      </section>
    )
  }
)
LogoCloud.displayName = "LogoCloud"

const logoItemVariants = cva(
  "flex items-center justify-center transition-opacity",
  {
    variants: {
      grayscale: {
        true: "opacity-60 grayscale hover:opacity-100 hover:grayscale-0",
        false: "opacity-100",
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
