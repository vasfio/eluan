import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Check, X } from "lucide-react"
import { Input } from "./input"
import { Progress } from "./progress"

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "size" | "style" | "type"> {
  onStrengthChange?: (strength: "weak" | "medium" | "strong") => void
  showStrengthIndicator?: boolean
  strengthRequirements?: {
    minLength?: number
    requireLowercase?: boolean
    requireNumbers?: boolean
    requireSpecialChars?: boolean
    requireUppercase?: boolean
  }
}

interface StrengthResult {
  checks: {
    length: boolean
    lowercase: boolean
    numbers: boolean
    specialChars: boolean
    uppercase: boolean
  }
  score: number
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

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
  },
  strength: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
  },
  progressRow: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-sm)",
  },
  label: {
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-xs)",
    minWidth: 50,
  },
  list: {
    display: "grid",
    fontSize: "var(--font-size-xs)",
    gap: "var(--spacing-xs)",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  item: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-xxs)",
  },
  icon: {
    height: "var(--spacing-md)",
    width: "var(--spacing-md)",
  },
  positive: {
    color: "var(--positive-fg)",
  },
  muted: {
    color: "var(--interactive-fg-alt)",
  },
})

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
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

    const Requirement = ({
      passed,
      children,
    }: {
      passed: boolean
      children: React.ReactNode
    }) => (
      <li {...stylex.props(styles.item)}>
        {passed ? (
          <Check {...stylex.props(styles.icon, styles.positive)} />
        ) : (
          <X {...stylex.props(styles.icon, styles.muted)} />
        )}
        <span {...stylex.props(passed ? styles.positive : styles.muted)}>
          {children}
        </span>
      </li>
    )

    return (
      <div {...stylex.props(styles.root)}>
        <Input
          type="password"
          ref={ref}
          onChange={handleChange}
          {...props}
        />

        {showStrengthIndicator && strength && (
          <div {...stylex.props(styles.strength)}>
            <div {...stylex.props(styles.progressRow)}>
              <Progress
                value={strength.score * 100}
                size="sm"
                tone={strengthLevel === "none" ? "default" : strengthLevel}
              />
              <span {...stylex.props(styles.label)}>{getStrengthLabel()}</span>
            </div>

            <ul {...stylex.props(styles.list)}>
              <Requirement passed={strength.checks.length}>
                {minLength}+ characters
              </Requirement>
              {requireUppercase && (
                <Requirement passed={strength.checks.uppercase}>
                  Uppercase letter
                </Requirement>
              )}
              {requireLowercase && (
                <Requirement passed={strength.checks.lowercase}>
                  Lowercase letter
                </Requirement>
              )}
              {requireNumbers && (
                <Requirement passed={strength.checks.numbers}>
                  Number
                </Requirement>
              )}
              {requireSpecialChars && (
                <Requirement passed={strength.checks.specialChars}>
                  Special character
                </Requirement>
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
