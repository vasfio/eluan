"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const counterVariants = cva("tabular-nums", {
  variants: {
    size: {
      sm: "text-2xl font-bold",
      default: "text-4xl font-bold",
      lg: "text-5xl font-bold",
      xl: "text-6xl font-bold",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface AnimatedCounterProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof counterVariants> {
  /**
   * Target value to count to
   */
  value: number
  /**
   * Starting value
   * @default 0
   */
  from?: number
  /**
   * Duration in milliseconds
   * @default 2000
   */
  duration?: number
  /**
   * Prefix (e.g., "$")
   */
  prefix?: string
  /**
   * Suffix (e.g., "%", "+")
   */
  suffix?: string
  /**
   * Number of decimal places
   * @default 0
   */
  decimals?: number
  /**
   * Thousand separator
   * @default ","
   */
  separator?: string
  /**
   * Decimal separator
   * @default "."
   */
  decimalSeparator?: string
  /**
   * Easing function
   * @default "easeOut"
   */
  easing?: "linear" | "easeOut" | "easeInOut"
  /**
   * Delay before starting in milliseconds
   * @default 0
   */
  delay?: number
  /**
   * Whether to trigger animation when in viewport
   * @default true
   */
  triggerOnView?: boolean
  /**
   * Callback when animation completes
   */
  onComplete?: () => void
}

const easingFunctions = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
}

function formatNumber(
  value: number,
  decimals: number,
  separator: string,
  decimalSeparator: string
): string {
  const fixed = value.toFixed(decimals)
  const [intPart, decPart] = fixed.split(".")
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  return decPart ? `${formattedInt}${decimalSeparator}${decPart}` : formattedInt
}

const AnimatedCounter = React.forwardRef<HTMLSpanElement, AnimatedCounterProps>(
  (
    {
      className,
      size,
      value,
      from = 0,
      duration = 2000,
      prefix = "",
      suffix = "",
      decimals = 0,
      separator = ",",
      decimalSeparator = ".",
      easing = "easeOut",
      delay = 0,
      triggerOnView = true,
      onComplete,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = React.useState(from)
    const [hasAnimated, setHasAnimated] = React.useState(false)
    const elementRef = React.useRef<HTMLSpanElement>(null)
    const combinedRef = React.useCallback(
      (node: HTMLSpanElement | null) => {
        (elementRef as React.MutableRefObject<HTMLSpanElement | null>).current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLSpanElement | null>).current = node
        }
      },
      [ref]
    )

    const animate = React.useCallback(() => {
      if (hasAnimated) return

      const startTime = performance.now()
      const easingFn = easingFunctions[easing]

      const tick = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easingFn(progress)
        const currentValue = from + (value - from) * easedProgress

        setDisplayValue(currentValue)

        if (progress < 1) {
          requestAnimationFrame(tick)
        } else {
          setDisplayValue(value)
          setHasAnimated(true)
          onComplete?.()
        }
      }

      setTimeout(() => {
        requestAnimationFrame(tick)
      }, delay)
    }, [value, from, duration, easing, delay, hasAnimated, onComplete])

    React.useEffect(() => {
      if (!triggerOnView) {
        animate()
        return
      }

      const element = elementRef.current
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated) {
            animate()
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(element)

      return () => observer.disconnect()
    }, [animate, triggerOnView, hasAnimated])

    // Reset animation if value changes
    React.useEffect(() => {
      setHasAnimated(false)
      setDisplayValue(from)
    }, [value, from])

    return (
      <span
        ref={combinedRef}
        className={cn(counterVariants({ size }), className)}
        {...props}
      >
        {prefix}
        {formatNumber(displayValue, decimals, separator, decimalSeparator)}
        {suffix}
      </span>
    )
  }
)
AnimatedCounter.displayName = "AnimatedCounter"

// Counter with label
export interface CounterWithLabelProps extends AnimatedCounterProps {
  label: string
  labelClassName?: string
}

const CounterWithLabel = React.forwardRef<HTMLDivElement, CounterWithLabelProps>(
  ({ label, labelClassName, className, ...counterProps }, ref) => (
    <div ref={ref} className={cn("text-center", className)}>
      <AnimatedCounter {...counterProps} />
      <p className={cn("mt-[var(--spacing-sm)] text-sm text-[var(--container-fg-alt)]", labelClassName)}>
        {label}
      </p>
    </div>
  )
)
CounterWithLabel.displayName = "CounterWithLabel"

// Counter grid for stats
export interface CounterGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4
}

const CounterGrid = React.forwardRef<HTMLDivElement, CounterGridProps>(
  ({ className, columns = 4, ...props }, ref) => {
    const gridCols = {
      2: "grid-cols-2",
      3: "grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-2 lg:grid-cols-4",
    }

    return (
      <div
        ref={ref}
        className={cn("grid gap-[var(--spacing-lg)]", gridCols[columns], className)}
        {...props}
      />
    )
  }
)
CounterGrid.displayName = "CounterGrid"

// Countdown timer
export interface CountdownTimerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Target date/time
   */
  targetDate: Date
  /**
   * Callback when countdown reaches zero
   */
  onComplete?: () => void
  /**
   * Labels for time units
   */
  labels?: {
    days?: string
    hours?: string
    minutes?: string
    seconds?: string
  }
  /**
   * Size variant
   */
  size?: "sm" | "default" | "lg"
}

const CountdownTimer = React.forwardRef<HTMLDivElement, CountdownTimerProps>(
  (
    {
      className,
      targetDate,
      onComplete,
      labels = {
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
      },
      size = "default",
      ...props
    },
    ref
  ) => {
    const [timeLeft, setTimeLeft] = React.useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })

    React.useEffect(() => {
      const calculateTimeLeft = () => {
        const difference = targetDate.getTime() - new Date().getTime()

        if (difference <= 0) {
          onComplete?.()
          return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }

        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      setTimeLeft(calculateTimeLeft())

      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft())
      }, 1000)

      return () => clearInterval(timer)
    }, [targetDate, onComplete])

    const sizes = {
      sm: { value: "text-2xl font-bold", label: "text-xs" },
      default: { value: "text-4xl font-bold", label: "text-sm" },
      lg: { value: "text-5xl font-bold", label: "text-base" },
    }

    return (
      <div
        ref={ref}
        className={cn("flex gap-[var(--spacing-md)] md:gap-[var(--spacing-lg)]", className)}
        {...props}
      >
        {Object.entries(timeLeft).map(([key, value]) => (
          <div key={key} className="text-center">
            <div className={cn("tabular-nums", sizes[size].value)}>
              {String(value).padStart(2, "0")}
            </div>
            <div className={cn("text-[var(--container-fg-alt)]", sizes[size].label)}>
              {labels[key as keyof typeof labels]}
            </div>
          </div>
        ))}
      </div>
    )
  }
)
CountdownTimer.displayName = "CountdownTimer"

export {
  AnimatedCounter,
  CounterWithLabel,
  CounterGrid,
  CountdownTimer,
}
