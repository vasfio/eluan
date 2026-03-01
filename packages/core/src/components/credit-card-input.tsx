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

const CardIcon = ({ type }: { type: CardType }) => {
  const iconClasses = "h-6 w-6"

  switch (type) {
    case "visa":
      return <span className={cn(iconClasses, "text-blue-600 font-bold text-xs")}>VISA</span>
    case "mastercard":
      return (
        <div className="flex -space-x-1">
          <div className="h-4 w-4 rounded-full bg-red-500" />
          <div className="h-4 w-4 rounded-full bg-yellow-500 opacity-80" />
        </div>
      )
    case "amex":
      return <span className={cn(iconClasses, "text-blue-500 font-bold text-xs")}>AMEX</span>
    case "discover":
      return <span className={cn(iconClasses, "text-orange-500 font-bold text-xs")}>DISC</span>
    default:
      return <CreditCard className={cn(iconClasses, "text-muted-foreground")} />
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
        <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-12 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
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
        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          inputMode="numeric"
          autoComplete="cc-exp"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
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
        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          inputMode="numeric"
          autoComplete="cc-csc"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
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
