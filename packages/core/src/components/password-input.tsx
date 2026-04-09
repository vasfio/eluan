import * as React from "react"
import { Lock, Eye, EyeOff, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showStrengthIndicator?: boolean
  strengthRequirements?: {
    minLength?: number
    requireUppercase?: boolean
    requireLowercase?: boolean
    requireNumbers?: boolean
    requireSpecialChars?: boolean
  }
  onStrengthChange?: (strength: "weak" | "medium" | "strong") => void
}

interface StrengthResult {
  score: number
  checks: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    specialChars: boolean
  }
}

function calculateStrength(
  password: string,
  requirements: PasswordInputProps["strengthRequirements"] = {}
): StrengthResult {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = requirements

  const checks = {
    length: password.length >= minLength,
    uppercase: !requireUppercase || /[A-Z]/.test(password),
    lowercase: !requireLowercase || /[a-z]/.test(password),
    numbers: !requireNumbers || /[0-9]/.test(password),
    specialChars: !requireSpecialChars || /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const passedChecks = Object.values(checks).filter(Boolean).length
  const totalChecks = Object.keys(checks).length

  return {
    score: passedChecks / totalChecks,
    checks,
  }
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      showStrengthIndicator = false,
      strengthRequirements = {},
      onStrengthChange,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [strength, setStrength] = React.useState<StrengthResult | null>(null)

    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSpecialChars = true,
    } = strengthRequirements

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (showStrengthIndicator && value) {
        const result = calculateStrength(value, strengthRequirements)
        setStrength(result)

        if (result.score < 0.4) {
          onStrengthChange?.("weak")
        } else if (result.score < 0.8) {
          onStrengthChange?.("medium")
        } else {
          onStrengthChange?.("strong")
        }
      } else {
        setStrength(null)
      }
      onChange?.(e)
    }

    const getStrengthColor = () => {
      if (!strength) return "bg-muted"
      if (strength.score < 0.4) return "bg-red-500"
      if (strength.score < 0.8) return "bg-yellow-500"
      return "bg-[var(--positive-fg)]"
    }

    const getStrengthLabel = () => {
      if (!strength) return ""
      if (strength.score < 0.4) return "Weak"
      if (strength.score < 0.8) return "Medium"
      return "Strong"
    }

    return (
      <div className="space-y-2">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-[var(--size-xxs)] w-[var(--size-xxs)] -translate-y-1/2 text-[var(--interactive-fg-alt)]" />
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-[var(--size-lg)] w-full rounded-[var(--curves-md)] border border-[var(--interactive-border-alt)] bg-[var(--interactive-bg)] pl-10 pr-10 py-[var(--spacing-sm)] text-[var(--font-size-sm)] ring-offset-background placeholder:text-[var(--interactive-fg-alt)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:text-[var(--interactive-fg-disabled)]",
              className
            )}
            ref={ref}
            onChange={handleChange}
            {...props}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--interactive-fg-alt)] hover:text-[var(--interactive-fg)]"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
            ) : (
              <Eye className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
            )}
          </button>
        </div>

        {showStrengthIndicator && strength && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[var(--interactive-bg-alt)] rounded-full overflow-hidden">
                <div
                  className={cn("h-full transition-all duration-300", getStrengthColor())}
                  style={{ width: `${strength.score * 100}%` }}
                />
              </div>
              <span className="text-[var(--font-size-xs)] text-[var(--interactive-fg-alt)] min-w-[50px]">
                {getStrengthLabel()}
              </span>
            </div>

            <ul className="grid grid-cols-2 gap-1 text-[var(--font-size-xs)]">
              <li className="flex items-center gap-1">
                {strength.checks.length ? (
                  <Check className="h-3 w-3 text-[var(--positive-fg)]" />
                ) : (
                  <X className="h-3 w-3 text-[var(--interactive-fg-alt)]" />
                )}
                <span className={strength.checks.length ? "text-[var(--positive-fg)]" : "text-[var(--interactive-fg-alt)]"}>
                  {minLength}+ characters
                </span>
              </li>
              {requireUppercase && (
                <li className="flex items-center gap-[var(--spacing-xxs)]">
                  {strength.checks.uppercase ? (
                    <Check className="h-3 w-3 text-[var(--positive-fg)]" />
                  ) : (
                    <X className="h-3 w-3 text-[var(--interactive-fg-alt)]" />
                  )}
                  <span className={strength.checks.uppercase ? "text-[var(--positive-fg)]" : "text-[var(--interactive-fg-alt)]"}>
                    Uppercase letter
                  </span>
                </li>
              )}
              {requireLowercase && (
                <li className="flex items-center gap-[var(--spacing-xxs)]">
                  {strength.checks.lowercase ? (
                    <Check className="h-3 w-3 text-[var(--positive-fg)]" />
                  ) : (
                    <X className="h-3 w-3 text-[var(--interactive-fg-alt)]" />
                  )}
                  <span className={strength.checks.lowercase ? "text-[var(--positive-fg)]" : "text-[var(--interactive-fg-alt)]"}>
                    Lowercase letter
                  </span>
                </li>
              )}
              {requireNumbers && (
                <li className="flex items-center gap-[var(--spacing-xxs)]">
                  {strength.checks.numbers ? (
                    <Check className="h-3 w-3 text-[var(--positive-fg)]" />
                  ) : (
                    <X className="h-3 w-3 text-[var(--interactive-fg-alt)]" />
                  )}
                  <span className={strength.checks.numbers ? "text-[var(--positive-fg)]" : "text-[var(--interactive-fg-alt)]"}>
                    Number
                  </span>
                </li>
              )}
              {requireSpecialChars && (
                <li className="flex items-center gap-[var(--spacing-xxs)]">
                  {strength.checks.specialChars ? (
                    <Check className="h-3 w-3 text-[var(--positive-fg)]" />
                  ) : (
                    <X className="h-3 w-3 text-[var(--interactive-fg-alt)]" />
                  )}
                  <span className={strength.checks.specialChars ? "text-[var(--positive-fg)]" : "text-[var(--interactive-fg-alt)]"}>
                    Special character
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
