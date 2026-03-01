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
      return "bg-green-500"
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
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            onChange={handleChange}
            {...props}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {showStrengthIndicator && strength && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn("h-full transition-all duration-300", getStrengthColor())}
                  style={{ width: `${strength.score * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground min-w-[50px]">
                {getStrengthLabel()}
              </span>
            </div>

            <ul className="grid grid-cols-2 gap-1 text-xs">
              <li className="flex items-center gap-1">
                {strength.checks.length ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <X className="h-3 w-3 text-muted-foreground" />
                )}
                <span className={strength.checks.length ? "text-green-600" : "text-muted-foreground"}>
                  {minLength}+ characters
                </span>
              </li>
              {requireUppercase && (
                <li className="flex items-center gap-1">
                  {strength.checks.uppercase ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span className={strength.checks.uppercase ? "text-green-600" : "text-muted-foreground"}>
                    Uppercase letter
                  </span>
                </li>
              )}
              {requireLowercase && (
                <li className="flex items-center gap-1">
                  {strength.checks.lowercase ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span className={strength.checks.lowercase ? "text-green-600" : "text-muted-foreground"}>
                    Lowercase letter
                  </span>
                </li>
              )}
              {requireNumbers && (
                <li className="flex items-center gap-1">
                  {strength.checks.numbers ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span className={strength.checks.numbers ? "text-green-600" : "text-muted-foreground"}>
                    Number
                  </span>
                </li>
              )}
              {requireSpecialChars && (
                <li className="flex items-center gap-1">
                  {strength.checks.specialChars ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span className={strength.checks.specialChars ? "text-green-600" : "text-muted-foreground"}>
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
