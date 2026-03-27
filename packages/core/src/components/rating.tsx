import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  max?: number
  onChange?: (value: number) => void
  readonly?: boolean
  size?: "sm" | "default" | "lg"
  showValue?: boolean
  precision?: 0.5 | 1
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value = 0,
      max = 5,
      onChange,
      readonly = false,
      size = "default",
      showValue = false,
      precision = 1,
      ...props
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)

    const sizeClasses = {
      sm: "h-4 w-4",
      default: "h-5 w-5",
      lg: "h-6 w-6",
    }

    const handleMouseMove = (
      event: React.MouseEvent<HTMLButtonElement>,
      index: number
    ) => {
      if (readonly) return
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const percent = x / rect.width

      if (precision === 0.5) {
        setHoverValue(index + (percent < 0.5 ? 0.5 : 1))
      } else {
        setHoverValue(index + 1)
      }
    }

    const handleClick = (index: number) => {
      if (readonly || !onChange) return
      onChange(hoverValue ?? index + 1)
    }

    const displayValue = hoverValue ?? value

    const renderStar = (index: number) => {
      const filled = displayValue >= index + 1
      const halfFilled = displayValue >= index + 0.5 && displayValue < index + 1

      return (
        <button
          key={index}
          type="button"
          disabled={readonly}
          className={cn(
            "relative p-0.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-default",
            !readonly && "cursor-pointer hover:scale-110"
          )}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onMouseLeave={() => setHoverValue(null)}
          onClick={() => handleClick(index)}
          aria-label={`Rate ${index + 1} out of ${max}`}
        >
          {/* Empty star */}
          <Star
            className={cn(
              sizeClasses[size],
              "text-[var(--backgrounds-quaternary)] fill-[var(--backgrounds-quaternary)]"
            )}
          />
          {/* Filled star overlay */}
          <Star
            className={cn(
              sizeClasses[size],
              "absolute inset-0.5 fill-[var(--cautionary-main)] text-[var(--cautionary-main)] transition-all",
              filled ? "opacity-100" : halfFilled ? "opacity-100" : "opacity-0"
            )}
            style={
              halfFilled
                ? {
                    clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                  }
                : undefined
            }
          />
        </button>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-0.5", className)}
        role="radiogroup"
        aria-label="Rating"
        {...props}
      >
        {Array.from({ length: max }, (_, i) => renderStar(i))}
        {showValue && (
          <span className="ml-2 text-sm text-[var(--foregrounds-tertiary)]">
            {displayValue.toFixed(precision === 0.5 ? 1 : 0)} / {max}
          </span>
        )}
      </div>
    )
  }
)
Rating.displayName = "Rating"

export { Rating }
