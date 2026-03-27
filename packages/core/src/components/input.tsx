"use client"

import * as React from "react"
import { Eye, EyeOff, Search, Mail, Lock, Phone, User, Link } from "lucide-react"

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
    const leadingIcon = icon ?? (AutoIcon ? <AutoIcon className="h-4 w-4" /> : null)
    const hasLeading = !!leadingIcon
    const hasTrailing = !!trailing || isPassword

    return (
      <div className={cn("relative flex w-full items-center", className)}>
        {hasLeading && (
          <span className="pointer-events-none absolute left-3 flex items-center text-[var(--foregrounds-quinary)]">
            {leadingIcon}
          </span>
        )}
        <input
          type={resolvedType}
          className={cn(
            "flex h-10 w-full rounded-md border border-[var(--interactive-border)] bg-[var(--interactive-bg)] text-sm text-[var(--interactive-fg)]",
            "ring-offset-background",
            "placeholder:text-[var(--foregrounds-quinary)]",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-fg)] focus-visible:border-[var(--interactive-fg)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--foregrounds-primary)]",
            hasLeading ? "pl-9" : "px-3",
            hasTrailing ? "pr-9" : "pr-3",
            "py-2"
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 flex items-center text-[var(--foregrounds-quinary)] hover:text-[var(--foregrounds-secondary)] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
