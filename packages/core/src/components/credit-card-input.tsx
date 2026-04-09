import * as React from "react"
import { CreditCard, Calendar, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

type CardType = "visa" | "mastercard" | "amex" | "discover" | "diners" | "jcb" | "unionpay" | "unknown"

interface CardTypeInfo {
  type: CardType
  name: string
  pattern: RegExp
  cvvLength: number
  gaps: number[]
  lengths: number[]
}

const cardTypes: CardTypeInfo[] = [
  {
    type: "visa",
    name: "Visa",
    pattern: /^4/,
    cvvLength: 3,
    gaps: [4, 8, 12],
    lengths: [16, 18, 19],
  },
  {
    type: "mastercard",
    name: "Mastercard",
    pattern: /^(5[1-5]|2[2-7])/,
    cvvLength: 3,
    gaps: [4, 8, 12],
    lengths: [16],
  },
  {
    type: "amex",
    name: "American Express",
    pattern: /^3[47]/,
    cvvLength: 4,
    gaps: [4, 10],
    lengths: [15],
  },
  {
    type: "discover",
    name: "Discover",
    pattern: /^(6011|65|64[4-9])/,
    cvvLength: 3,
    gaps: [4, 8, 12],
    lengths: [16, 19],
  },
  {
    type: "diners",
    name: "Diners Club",
    pattern: /^(36|38|30[0-5])/,
    cvvLength: 3,
    gaps: [4, 10],
    lengths: [14, 16, 19],
  },
  {
    type: "jcb",
    name: "JCB",
    pattern: /^35/,
    cvvLength: 3,
    gaps: [4, 8, 12],
    lengths: [16, 17, 18, 19],
  },
  {
    type: "unionpay",
    name: "UnionPay",
    pattern: /^62/,
    cvvLength: 3,
    gaps: [4, 8, 12],
    lengths: [16, 17, 18, 19],
  },
]

function detectCardType(number: string): CardTypeInfo | undefined {
  const cleaned = number.replace(/\s/g, "")
  return cardTypes.find((card) => card.pattern.test(cleaned))
}

function formatCardNumber(number: string, gaps: number[] = [4, 8, 12]): string {
  const cleaned = number.replace(/\D/g, "")
  let formatted = ""
  let gapIndex = 0

  for (let i = 0; i < cleaned.length; i++) {
    if (gapIndex < gaps.length && i === gaps[gapIndex]) {
      formatted += " "
      gapIndex++
    }
    formatted += cleaned[i]
  }

  return formatted
}

function formatExpiry(value: string): string {
  const cleaned = value.replace(/\D/g, "")
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
  }
  return cleaned
}

// SVG logos for card processors — inline to avoid external image deps
const VisaLogo = () => (
  <svg viewBox="0 0 48 16" width="38" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="13" fontFamily="Arial" fontWeight="800" fontSize="14" fill="#1A1F71" letterSpacing="-0.5">VISA</text>
  </svg>
)

const MastercardLogo = () => (
  <svg viewBox="0 0 36 24" width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="12" r="10" fill="#EB001B" />
    <circle cx="23" cy="12" r="10" fill="#F79E1B" />
    <path d="M18 4.8A10 10 0 0 1 22.2 12 10 10 0 0 1 18 19.2 10 10 0 0 1 13.8 12 10 10 0 0 1 18 4.8z" fill="#FF5F00" />
  </svg>
)

const AmexLogo = () => (
  <svg viewBox="0 0 50 16" width="40" height="13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="12" fontFamily="Arial" fontWeight="700" fontSize="11" fill="#2E77BC" letterSpacing="0.5">AMEX</text>
  </svg>
)

const DiscoverLogo = () => (
  <svg viewBox="0 0 64 16" width="52" height="13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="12" fontFamily="Arial" fontWeight="700" fontSize="10" fill="#F76F20" letterSpacing="0.2">DISCOVER</text>
  </svg>
)

const GenericCardBadge = ({ label, color }: { label: string; color: string }) => (
  <span
    className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold leading-none tracking-tight"
    style={{ color, border: `1.5px solid ${color}` }}
  >
    {label}
  </span>
)

const CardIcon = ({ type }: { type: CardType }) => {
  switch (type) {
    case "visa":       return <VisaLogo />
    case "mastercard": return <MastercardLogo />
    case "amex":       return <AmexLogo />
    case "discover":   return <DiscoverLogo />
    case "jcb":        return <GenericCardBadge label="JCB" color="#0E4C96" />
    case "diners":     return <GenericCardBadge label="DC" color="#004A97" />
    case "unionpay":   return <GenericCardBadge label="UP" color="#E21836" />
    default:
      return <CreditCard className="h-[var(--size-xs)] w-[var(--size-xs)] text-[var(--foregrounds-quinary)]" />
  }
}

export interface CreditCardInputProps {
  onCardChange?: (data: {
    number: string
    expiry: string
    cvv: string
    cardType: CardType
    isValid: boolean
  }) => void
  className?: string
  disabled?: boolean
}

export interface CreditCardNumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onChange?: (value: string, cardType: CardType) => void
}

export interface CreditCardExpiryInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onChange?: (value: string) => void
}

export interface CreditCardCVVInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  cardType?: CardType
  onChange?: (value: string) => void
}

const CreditCardNumberInput = React.forwardRef<HTMLInputElement, CreditCardNumberInputProps>(
  ({ className, onChange, ...props }, ref) => {
    const [value, setValue] = React.useState("")
    const [cardType, setCardType] = React.useState<CardType>("unknown")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "")
      const detected = detectCardType(rawValue)
      const maxLength = detected?.lengths[detected.lengths.length - 1] || 19

      if (rawValue.length <= maxLength) {
        const formatted = formatCardNumber(rawValue, detected?.gaps)
        setValue(formatted)
        const newType = detected?.type || "unknown"
        setCardType(newType)
        onChange?.(rawValue, newType)
      }
    }

    return (
      <div className="relative">
        <CreditCard className="absolute left-3 top-1/2 h-[var(--size-xxs)] w-[var(--size-xxs)] -translate-y-1/2 text-[var(--interactive-fg-alt)]" />
        <input
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          className={cn(
            "flex h-[var(--size-lg)] w-full rounded-[var(--curves-md)] border border-[var(--interactive-border-alt)] bg-[var(--interactive-bg)] pl-10 pr-12 py-[var(--spacing-sm)] text-[var(--font-size-sm)] ring-offset-background placeholder:text-[var(--interactive-fg-alt)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:fg-[var(--interactive-fg-disabled)] font-mono",
            className
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          {...props}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <CardIcon type={cardType} />
        </div>
      </div>
    )
  }
)
CreditCardNumberInput.displayName = "CreditCardNumberInput"

const CreditCardExpiryInput = React.forwardRef<HTMLInputElement, CreditCardExpiryInputProps>(
  ({ className, onChange, ...props }, ref) => {
    const [value, setValue] = React.useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "")
      if (rawValue.length <= 4) {
        const formatted = formatExpiry(rawValue)
        setValue(formatted)
        onChange?.(rawValue)
      }
    }

    return (
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 h-[var(--size-xxs)] w-[var(--size-xxs)] -translate-y-1/2 text-[var(--interactive-fg-alt)]" />
        <input
          type="text"
          inputMode="numeric"
          autoComplete="cc-exp"
          className={cn(
            "flex h-[var(--size-lg)] w-full rounded-[var(--curves-md)] border border-[var(--interactive-border-alt)] bg-[var(--interactive-bg)] pl-10 pr-3 py-[var(--spacing-sm)] text-[var(--font-size-sm)] ring-offset-background placeholder:text-[var(--interactive-fg-alt)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:fg-[var(--interactive-fg-disabled)] font-mono",
            className
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          placeholder="MM/YY"
          {...props}
        />
      </div>
    )
  }
)
CreditCardExpiryInput.displayName = "CreditCardExpiryInput"

const CreditCardCVVInput = React.forwardRef<HTMLInputElement, CreditCardCVVInputProps>(
  ({ className, cardType = "unknown", onChange, ...props }, ref) => {
    const [value, setValue] = React.useState("")
    const maxLength = cardType === "amex" ? 4 : 3

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "")
      if (rawValue.length <= maxLength) {
        setValue(rawValue)
        onChange?.(rawValue)
      }
    }

    return (
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 h-[var(--size-xxs)] w-[var(--size-xxs)] -translate-y-1/2 text-[var(--interactive-fg-alt)]" />
        <input
          type="text"
          inputMode="numeric"
          autoComplete="cc-csc"
          className={cn(
            "flex h-[var(--size-lg)] w-full rounded-[var(--curves-md)] border border-[var(--interactive-border-alt)] bg-[var(--interactive-bg)] pl-10 pr-3 py-[var(--spacing-sm)] text-[var(--font-size-sm)] ring-offset-background placeholder:text-[var(--interactive-fg-alt)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:fg-[var(--interactive-fg-disabled)] font-mono",
            className
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          placeholder={cardType === "amex" ? "1234" : "123"}
          maxLength={maxLength}
          {...props}
        />
      </div>
    )
  }
)
CreditCardCVVInput.displayName = "CreditCardCVVInput"

const CreditCardInput = React.forwardRef<HTMLDivElement, CreditCardInputProps>(
  ({ className, onCardChange, disabled }, ref) => {
    const [number, setNumber] = React.useState("")
    const [expiry, setExpiry] = React.useState("")
    const [cvv, setCvv] = React.useState("")
    const [cardType, setCardType] = React.useState<CardType>("unknown")

    React.useEffect(() => {
      const detected = detectCardType(number)
      const isNumberValid = detected
        ? detected.lengths.includes(number.length)
        : number.length >= 13 && number.length <= 19
      const isExpiryValid = expiry.length === 4
      const isCvvValid = cardType === "amex" ? cvv.length === 4 : cvv.length === 3

      onCardChange?.({
        number,
        expiry,
        cvv,
        cardType,
        isValid: isNumberValid && isExpiryValid && isCvvValid,
      })
    }, [number, expiry, cvv, cardType, onCardChange])

    return (
      <div ref={ref} className={cn("space-y-3", className)}>
        <CreditCardNumberInput
          onChange={(value, type) => {
            setNumber(value)
            setCardType(type)
          }}
          disabled={disabled}
        />
        <div className="grid grid-cols-2 gap-3">
          <CreditCardExpiryInput
            onChange={setExpiry}
            disabled={disabled}
          />
          <CreditCardCVVInput
            cardType={cardType}
            onChange={setCvv}
            disabled={disabled}
          />
        </div>
      </div>
    )
  }
)
CreditCardInput.displayName = "CreditCardInput"

export {
  CreditCardInput,
  CreditCardNumberInput,
  CreditCardExpiryInput,
  CreditCardCVVInput,
}
