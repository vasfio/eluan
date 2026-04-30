"use client"

import * as React from "react"
import { Eye, EyeOff, Search, Mail, Lock, Phone, Link } from "lucide-react"

import { cn } from "@/lib/utils"

const typeIcons: Record<string, React.ElementType> = {
  search: Search,
  email: Mail,
  password: Lock,
  tel: Phone,
  url: Link,
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Show a leading icon. Overrides the auto-icon for the input type. */
  icon?: React.ReactNode
  /** Show a trailing element (e.g. a button) */
  trailing?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, trailing, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const isPassword = type === "password"
    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type

    const AutoIcon = type ? typeIcons[type] : undefined
    const leadingIcon = icon ?? (AutoIcon ? <AutoIcon className="h-[var(--size-xxs)] w-[var(--size-xxs)]" /> : null)
    const hasLeading = !!leadingIcon
    const hasTrailing = !!trailing || isPassword

    return (
      <div className={cn("relative flex w-full items-center", className)}>
        {hasLeading && (
          <span className="pointer-events-none absolute left-3 flex items-center text-[color:var(--interactive-fg-alt)]">
            {leadingIcon}
          </span>
        )}
        <input
          type={resolvedType}
          className={cn(
            "flex h-[var(--size-lg)] w-full rounded-[var(--curves-md)] border border-[var(--interactive-border-alt)] bg-[var(--interactive-bg)] text-[length:var(--font-size-sm)] text-[color:var(--interactive-fg)]",
            "ring-offset-background",
            "placeholder:text-[color:var(--interactive-fg-alt)]",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:border-[var(--interactive-border)]",
            "disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:text-[color:var(--interactive-fg-disabled)]",
            "transition-colors",
            "file:border-0 file:bg-transparent file:text-[length:var(--font-size-sm)] file:font-medium file:text-[color:var(--interactive-fg)]",
            hasLeading ? "pl-9" : "px-3",
            hasTrailing ? "pr-9" : "pr-3",
            "py-[var(--spacing-sm)]"
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 flex items-center text-[color:var(--interactive-fg-alt)] hover:text-[color:var(--interactive-fg-hover)] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-[var(--size-xxs)] w-[var(--size-xxs)]" /> : <Eye className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />}
          </button>
        )}
        {!isPassword && trailing && (
          <span className="absolute right-3 flex items-center">
            {trailing}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
