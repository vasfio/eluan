"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const announcementBarVariants = cva(
  "relative w-full px-4 py-2 text-center text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        muted: "bg-muted text-muted-foreground",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-black",
        error: "bg-red-500 text-white",
        gradient: "bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white",
        dark: "bg-zinc-900 text-white",
      },
      size: {
        sm: "py-1.5 text-xs",
        default: "py-2 text-sm",
        lg: "py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface AnnouncementBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof announcementBarVariants> {
  /**
   * Whether the bar can be dismissed
   * @default true
   */
  dismissible?: boolean
  /**
   * Callback when dismissed
   */
  onDismiss?: () => void
  /**
   * Whether the bar is visible
   * @default true
   */
  isVisible?: boolean
  /**
   * Link URL (makes the entire bar clickable)
   */
  href?: string
  /**
   * Icon to display before the text
   */
  icon?: React.ReactNode
}

const AnnouncementBar = React.forwardRef<HTMLDivElement, AnnouncementBarProps>(
  (
    {
      className,
      variant,
      size,
      dismissible = true,
      onDismiss,
      isVisible = true,
      href,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(isVisible)

    React.useEffect(() => {
      setVisible(isVisible)
    }, [isVisible])

    if (!visible) return null

    const handleDismiss = () => {
      setVisible(false)
      onDismiss?.()
    }

    const content = (
      <>
        {icon && <span className="mr-2 inline-flex">{icon}</span>}
        {children}
      </>
    )

    return (
      <div
        ref={ref}
        className={cn(announcementBarVariants({ variant, size }), className)}
        role="banner"
        {...props}
      >
        <div className="container mx-auto flex items-center justify-center">
          {href ? (
            <a
              href={href}
              className="flex items-center hover:underline"
            >
              {content}
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          ) : (
            <span className="flex items-center">{content}</span>
          )}

          {dismissible && (
            <button
              onClick={handleDismiss}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100"
              aria-label="Dismiss announcement"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    )
  }
)
AnnouncementBar.displayName = "AnnouncementBar"

// Rotating announcements
export interface RotatingAnnouncementBarProps
  extends Omit<AnnouncementBarProps, "children"> {
  /**
   * Array of announcement messages
   */
  messages: Array<{
    text: string
    href?: string
  }>
  /**
   * Rotation interval in milliseconds
   * @default 5000
   */
  interval?: number
}

const RotatingAnnouncementBar = React.forwardRef<
  HTMLDivElement,
  RotatingAnnouncementBarProps
>(
  (
    {
      messages,
      interval = 5000,
      className,
      variant,
      size,
      dismissible,
      onDismiss,
      icon,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)

    React.useEffect(() => {
      if (messages.length <= 1) return

      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length)
      }, interval)

      return () => clearInterval(timer)
    }, [messages.length, interval])

    const currentMessage = messages[currentIndex]

    return (
      <AnnouncementBar
        ref={ref}
        className={className}
        variant={variant}
        size={size}
        dismissible={dismissible}
        onDismiss={onDismiss}
        href={currentMessage?.href}
        icon={icon}
        {...props}
      >
        <span className="animate-fade-in">{currentMessage?.text}</span>
      </AnnouncementBar>
    )
  }
)
RotatingAnnouncementBar.displayName = "RotatingAnnouncementBar"

// Countdown announcement bar
export interface CountdownAnnouncementBarProps
  extends Omit<AnnouncementBarProps, "children"> {
  /**
   * Target date for countdown
   */
  targetDate: Date
  /**
   * Text before countdown
   */
  prefix?: string
  /**
   * Text after countdown
   */
  suffix?: string
  /**
   * Callback when countdown reaches zero
   */
  onComplete?: () => void
}

const CountdownAnnouncementBar = React.forwardRef<
  HTMLDivElement,
  CountdownAnnouncementBarProps
>(
  (
    {
      targetDate,
      prefix = "Sale ends in",
      suffix,
      onComplete,
      className,
      variant,
      size,
      dismissible,
      onDismiss,
      href,
      icon,
      ...props
    },
    ref
  ) => {
    const [timeLeft, setTimeLeft] = React.useState("")

    React.useEffect(() => {
      const calculateTimeLeft = () => {
        const difference = targetDate.getTime() - new Date().getTime()

        if (difference <= 0) {
          onComplete?.()
          return "00:00:00"
        }

        const hours = Math.floor(difference / (1000 * 60 * 60))
        const minutes = Math.floor((difference / (1000 * 60)) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      }

      setTimeLeft(calculateTimeLeft())

      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft())
      }, 1000)

      return () => clearInterval(timer)
    }, [targetDate, onComplete])

    return (
      <AnnouncementBar
        ref={ref}
        className={className}
        variant={variant}
        size={size}
        dismissible={dismissible}
        onDismiss={onDismiss}
        href={href}
        icon={icon}
        {...props}
      >
        {prefix}{" "}
        <span className="mx-2 font-mono font-bold">{timeLeft}</span>
        {suffix}
      </AnnouncementBar>
    )
  }
)
CountdownAnnouncementBar.displayName = "CountdownAnnouncementBar"

export {
  AnnouncementBar,
  RotatingAnnouncementBar,
  CountdownAnnouncementBar,
}
