import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-[var(--curves-md)] border border-[var(--interactive-border-alt)] bg-[var(--container-bg)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-[var(--font-size-base)] ring-offset-background placeholder:text-[var(--interactive-fg-alt)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:text-[var(--interactive-fg-disabled)] md:text-[var(--font-size-sm)]",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
