import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[length:var(--font-size-sm)] font-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--action-primary-bg)] text-[color:var(--action-primary-fg)] hover:bg-[var(--action-primary-bg-hover)] active:bg-[var(--action-primary-bg-active)] shadow-sm hover:shadow-md",
        destructive:
          "bg-[var(--destructive-bg)] text-[color:var(--destructive-fg)] hover:bg-[var(--destructive-bg-hover)] active:bg-[var(--destructive-bg-active)]",
        outline:
          "border border-[var(--action-secondary-border)] bg-transparent text-[color:var(--action-secondary-fg)] hover:bg-[var(--action-secondary-bg-hover)] active:bg-[var(--action-secondary-bg-active)] active:text-[color:var(--action-secondary-fg-active)]",
        secondary:
          "bg-[var(--backgrounds-tertiary)] text-[color:var(--foregrounds-primary)] hover:bg-[var(--backgrounds-quaternary)]",
        ghost:
          "bg-transparent text-[color:var(--foregrounds-secondary)] hover:bg-[var(--backgrounds-tertiary)] hover:text-[color:var(--foregrounds-primary)]",
        link:
          "text-[color:var(--action-primary-bg)] underline-offset-4 hover:underline p-0 h-auto shadow-none",
      },
      size: {
        default: "h-[var(--size-lg)] px-4 py-2",
        sm: "h-[var(--size-md)] rounded-md px-3 text-[length:var(--font-size-xs)]",
        lg: "h-[var(--size-xl)] rounded-md px-8 text-[length:var(--font-size-base)]",
        icon: "h-[var(--size-lg)] w-[var(--size-lg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
