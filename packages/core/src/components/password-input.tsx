import * as React from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Progress } from "./progress"

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

const strengthColors = {
  weak: "bg-[var(--destructive-fg)] [&>div]:bg-[var(--destructive-fg)]",
  medium: "bg-[var(--cautionary-fg)] [&>div]:bg-[var(--cautionary-fg)]",
  strong: "bg-[var(--positive-fg)] [&>div]:bg-[var(--positive-fg)]",
  none: "",
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
    const [strength, setStrength] = React.useState<StrengthResult | null>(null)
    const [strengthLevel, setStrengthLevel] = React.useState<"weak" | "medium" | "strong" | "none">("none")

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

        let level: "weak" | "medium" | "strong"
        if (result.score < 0.4) {
          level = "weak"
        } else if (result.score < 0.8) {
          level = "medium"
        } else {
          level = "strong"
        }
        setStrengthLevel(level)
        onStrengthChange?.(level)
      } else {
        setStrength(null)
        setStrengthLevel("none")
      }
      onChange?.(e)
    }

    const getStrengthLabel = () => {
      if (!strength) return ""
      if (strength.score < 0.4) return "Weak"
      if (strength.score < 0.8) return "Medium"
      return "Strong"
    }

    return (
      <div className="space-y-2">
        <Input
          type="password"
          className={className}
          ref={ref}
          onChange={handleChange}
          {...props}
        />

        {showStrengthIndicator && strength && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Progress
                value={strength.score * 100}
                className={cn("h-1.5 flex-1", strengthColors[strengthLevel])}
              />
              <span className="text-[length:var(--font-size-xs)] text-[color:var(--interactive-fg-alt)] min-w-[50px]">
                {getStrengthLabel()}
              </span>
            </div>

            <ul className="grid grid-cols-2 gap-1 text-[length:var(--font-size-xs)]">
              <li className="flex items-center gap-1">
                {strength.checks.length ? (
                  <Check className="h-3 w-3 text-[color:var(--positive-fg)]" />
                ) : (
                  <X className="h-3 w-3 text-[color:var(--interactive-fg-alt)]" />
                )}
                <span className={strength.checks.length ? "text-[color:var(--positive-fg)]" : "text-[color:var(--interactive-fg-alt)]"}>
                  {minLength}+ characters
                </span>
              </li>
              {requireUppercase && (
                <li className="flex items-center gap-[var(--spacing-xxs)]">
                  {strength.checks.uppercase ? (
                    <Check className="h-3 w-3 text-[color:var(--positive-fg)]" />
                  ) : (
                    <X className="h-3 w-3 text-[color:var(--interactive-fg-alt)]" />
                  )}
                  <span className={strength.checks.uppercase ? "text-[color:var(--positive-fg)]" : "text-[color:var(--interactive-fg-alt)]"}>
                    Uppercase letter
                  </span>
                </li>
              )}
              {requireLowercase && (
                <li className="flex items-center gap-[var(--spacing-xxs)]">
                  {strength.checks.lowercase ? (
                    <Check className="h-3 w-3 text-[color:var(--positive-fg)]" />
                  ) : (
                    <X className="h-3 w-3 text-[color:var(--interactive-fg-alt)]" />
                  )}
                  <span className={strength.checks.lowercase ? "text-[color:var(--positive-fg)]" : "text-[color:var(--interactive-fg-alt)]"}>
                    Lowercase letter
                  </span>
                </li>
              )}
              {requireNumbers && (
                <li className="flex items-center gap-[var(--spacing-xxs)]">
                  {strength.checks.numbers ? (
                    <Check className="h-3 w-3 text-[color:var(--positive-fg)]" />
                  ) : (
                    <X className="h-3 w-3 text-[color:var(--interactive-fg-alt)]" />
                  )}
                  <span className={strength.checks.numbers ? "text-[color:var(--positive-fg)]" : "text-[color:var(--interactive-fg-alt)]"}>
                    Number
                  </span>
                </li>
              )}
              {requireSpecialChars && (
                <li className="flex items-center gap-[var(--spacing-xxs)]">
                  {strength.checks.specialChars ? (
                    <Check className="h-3 w-3 text-[color:var(--positive-fg)]" />
                  ) : (
                    <X className="h-3 w-3 text-[color:var(--interactive-fg-alt)]" />
                  )}
                  <span className={strength.checks.specialChars ? "text-[color:var(--positive-fg)]" : "text-[color:var(--interactive-fg-alt)]"}>
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
