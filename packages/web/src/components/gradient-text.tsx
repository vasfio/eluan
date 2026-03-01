import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const gradientTextVariants = cva(
  "inline-block bg-clip-text text-transparent",
  {
    variants: {
      gradient: {
        primary: "bg-gradient-to-r from-primary to-primary/60",
        secondary: "bg-gradient-to-r from-secondary to-secondary/60",
        rainbow: "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
        sunset: "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500",
        ocean: "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500",
        forest: "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500",
        fire: "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500",
        aurora: "bg-gradient-to-r from-green-400 via-cyan-500 to-purple-500",
        neon: "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500",
        gold: "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500",
        silver: "bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500",
        custom: "",
      },
      animate: {
        none: "",
        shimmer: "animate-gradient-shimmer bg-[length:200%_auto]",
        pulse: "animate-pulse",
      },
    },
    defaultVariants: {
      gradient: "primary",
      animate: "none",
    },
  }
)

export interface GradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof gradientTextVariants> {
  /**
   * Custom gradient (use with gradient="custom")
   * e.g., "from-blue-500 to-purple-500"
   */
  customGradient?: string
  /**
   * Element to render as
   */
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
}

function GradientText({
  className,
  gradient,
  animate,
  customGradient,
  as: Component = "span",
  ...props
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        gradientTextVariants({ gradient, animate }),
        gradient === "custom" && customGradient && `bg-gradient-to-r ${customGradient}`,
        className
      )}
      {...props}
    />
  )
}
GradientText.displayName = "GradientText"

// Gradient heading presets
export interface GradientHeadingProps extends Omit<GradientTextProps, "as"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

function GradientHeading({ className, level = 1, ...props }: GradientHeadingProps) {
  const sizes = {
    1: "font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl",
    2: "font-heading text-3xl font-bold tracking-tight sm:text-4xl",
    3: "font-heading text-2xl font-bold tracking-tight sm:text-3xl",
    4: "font-heading text-xl font-bold tracking-tight sm:text-2xl",
    5: "font-heading text-lg font-bold tracking-tight",
    6: "font-heading text-base font-bold tracking-tight",
  }

  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

  return (
    <GradientText
      as={Tag}
      className={cn(sizes[level], className)}
      {...props}
    />
  )
}
GradientHeading.displayName = "GradientHeading"

// Animated gradient border
const GradientBorder = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    gradient?: string
    borderWidth?: number
  }
>(({ className, gradient = "from-primary via-purple-500 to-pink-500", borderWidth = 2, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-lg p-[2px]",
      `bg-gradient-to-r ${gradient}`,
      className
    )}
    style={{ padding: `${borderWidth}px` }}
    {...props}
  >
    <div className="h-full w-full rounded-[calc(0.5rem-2px)] bg-background">
      {children}
    </div>
  </div>
))
GradientBorder.displayName = "GradientBorder"

// Animated gradient background
const GradientBackground = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    gradient?: string
    animate?: boolean
  }
>(({ className, gradient = "from-primary/20 via-purple-500/20 to-pink-500/20", animate = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute inset-0 -z-10",
      `bg-gradient-to-r ${gradient}`,
      animate && "animate-gradient-shift bg-[length:200%_200%]",
      className
    )}
    {...props}
  />
))
GradientBackground.displayName = "GradientBackground"

// Gradient divider
const GradientDivider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    gradient?: string
  }
>(({ className, gradient = "from-transparent via-primary to-transparent", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "h-px w-full",
      `bg-gradient-to-r ${gradient}`,
      className
    )}
    {...props}
  />
))
GradientDivider.displayName = "GradientDivider"

// Gradient blob
const GradientBlob = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    color?: string
    size?: "sm" | "md" | "lg" | "xl"
    blur?: "sm" | "md" | "lg" | "xl"
  }
>(({ className, color = "bg-primary/30", size = "lg", blur = "xl", ...props }, ref) => {
  const sizes = {
    sm: "h-32 w-32",
    md: "h-64 w-64",
    lg: "h-96 w-96",
    xl: "h-[32rem] w-[32rem]",
  }

  const blurs = {
    sm: "blur-2xl",
    md: "blur-3xl",
    lg: "blur-[100px]",
    xl: "blur-[200px]",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "absolute rounded-full",
        sizes[size],
        blurs[blur],
        color,
        className
      )}
      {...props}
    />
  )
})
GradientBlob.displayName = "GradientBlob"

export {
  GradientText,
  GradientHeading,
  GradientBorder,
  GradientBackground,
  GradientDivider,
  GradientBlob,
}
