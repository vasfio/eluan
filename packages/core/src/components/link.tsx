import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"

const linkVariants = cva(
  "inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-primary underline-offset-4 hover:underline",
        muted: "text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
        nav: "text-foreground/60 hover:text-foreground",
        destructive: "text-destructive underline-offset-4 hover:underline",
        unstyled: "",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean
  external?: boolean
  showExternalIcon?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      external = false,
      showExternalIcon = true,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "a"
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}

    return (
      <Comp
        ref={ref}
        className={cn(linkVariants({ variant, size }), className)}
        {...externalProps}
        {...props}
      >
        {children}
        {external && showExternalIcon && (
          <ExternalLink className="h-3 w-3 shrink-0" />
        )}
      </Comp>
    )
  }
)
Link.displayName = "Link"

export { Link, linkVariants }
