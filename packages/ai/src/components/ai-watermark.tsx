import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@vasf/ragnar-core"

const positionClasses = {
  "top-left": "top-[var(--spacing-xs)] left-[var(--spacing-xs)]",
  "top-right": "top-[var(--spacing-xs)] right-[var(--spacing-xs)]",
  "bottom-left": "bottom-[var(--spacing-xs)] left-[var(--spacing-xs)]",
  "bottom-right": "bottom-[var(--spacing-xs)] right-[var(--spacing-xs)]",
} as const

const aiWatermarkVariants = cva("relative", {
  variants: {
    variant: {
      overlay: "",
      corner: "",
      border: "border border-dashed border-[var(--container-border)]",
    },
  },
  defaultVariants: {
    variant: "corner",
  },
})

export interface AIWatermarkProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiWatermarkVariants> {
  /** Watermark text */
  text?: string
  /** Position of the watermark label (corner and overlay variants) */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

const AIWatermark = React.forwardRef<HTMLDivElement, AIWatermarkProps>(
  (
    {
      className,
      variant,
      text = "AI Generated",
      position = "bottom-right",
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(aiWatermarkVariants({ variant }), className)}
      {...props}
    >
      {children}

      {variant === "overlay" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="rotate-[-30deg] select-none text-[length:var(--font-size-xl)] font-bold uppercase tracking-widest text-[color:var(--container-fg-alt)] opacity-10">
            {text}
          </span>
        </div>
      )}

      {(variant === "corner" || !variant) && (
        <Badge
          variant="secondary"
          className={cn(
            "absolute backdrop-blur bg-[var(--container-bg)]/80",
            positionClasses[position]
          )}
        >
          <Sparkles className="h-3 w-3" />
          {text}
        </Badge>
      )}

      {variant === "border" && (
        <Badge
          variant="secondary"
          className={cn(
            "absolute bg-[var(--container-bg)]",
            positionClasses[position]
          )}
        >
          <Sparkles className="h-3 w-3" />
          {text}
        </Badge>
      )}
    </div>
  )
)
AIWatermark.displayName = "AIWatermark"

export { AIWatermark, aiWatermarkVariants }
