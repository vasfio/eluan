import * as React from "react"
import { Phone, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

function assignRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value)
  } else if (ref) {
    ;(ref as React.MutableRefObject<T | null>).current = value
  }
}

export interface Country {
  code: string
  name: string
  dialCode: string
  flag: string
}

const defaultCountries: Country[] = [
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮" },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
  { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
  { code: "CZ", name: "Czech Republic", dialCode: "+420", flag: "🇨🇿" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰" },
  { code: "TW", name: "Taiwan", dialCode: "+886", flag: "🇹🇼" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "PE", name: "Peru", dialCode: "+51", flag: "🇵🇪" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "IL", name: "Israel", dialCode: "+972", flag: "🇮🇱" },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" },
  { code: "UA", name: "Ukraine", dialCode: "+380", flag: "🇺🇦" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
]

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  countries?: Country[]
  defaultCountry?: string
  value?: string
  onChange?: (value: string, country: Country) => void
  onCountryChange?: (country: Country) => void
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      countries = defaultCountries,
      defaultCountry = "US",
      value,
      onChange,
      onCountryChange,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedCountry, setSelectedCountry] = React.useState<Country>(
      countries.find((c) => c.code === defaultCountry) || countries[0]
    )
    const [phoneNumber, setPhoneNumber] = React.useState(value || "")
    const [search, setSearch] = React.useState("")
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement | null>(null)

    React.useEffect(() => {
      if (value !== undefined) {
        setPhoneNumber(value)
      }
    }, [value])

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setSearch("")
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const filteredCountries = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(search.toLowerCase()) ||
        country.dialCode.includes(search) ||
        country.code.toLowerCase().includes(search.toLowerCase())
    )

    const handleCountrySelect = (country: Country) => {
      setSelectedCountry(country)
      setIsOpen(false)
      setSearch("")
      onCountryChange?.(country)
      onChange?.(phoneNumber, country)
      inputRef.current?.focus()
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/[^\d\s\-()]/g, "")
      setPhoneNumber(newValue)
      onChange?.(newValue, selectedCountry)
    }

    return (
      <div className="relative" ref={dropdownRef}>
        <div className="flex">
          <button
            type="button"
            className={cn(
              "flex items-center gap-[var(--spacing-xxs)] h-[var(--size-lg)] px-[var(--spacing-md)] rounded-l-[var(--curves-md)] border border-r-0 border-[var(--interactive-border-alt)] bg-[var(--interactive-bg)] text-[var(--font-size-sm)] hover:bg-[var(--interactive-bg-hover)]",
              isOpen && "ring-2 ring-[var(--interactive-border)] ring-offset-2"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-[var(--font-size-base)]">{selectedCountry.flag}</span>
            <span className="text-[var(--interactive-fg-alt)]">{selectedCountry.dialCode}</span>
            <ChevronDown className="h-3 w-3 text-[var(--interactive-fg-alt)]" />
          </button>
          <div className="relative flex-1">
            <Phone className="absolute left-3 top-1/2 h-[var(--size-xxs)] w-[var(--size-xxs)] -translate-y-1/2 text-[var(--interactive-fg-alt)]" />
            <input
              type="tel"
              ref={(node) => {
                inputRef.current = node
                assignRef(ref, node)
              }}
              className={cn(
                "flex h-[var(--size-lg)] w-full rounded-r-[var(--curves-md)] border border-[var(--interactive-border-alt)] bg-[var(--interactive-bg)] pl-10 pr-[var(--spacing-md)] py-[var(--spacing-sm)] text-[var(--font-size-sm)] ring-offset-background placeholder:text-[var(--interactive-fg-alt)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:text-[var(--interactive-fg-disabled)]",
                className
              )}
              value={phoneNumber}
              onChange={handlePhoneChange}
              {...props}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-[var(--spacing-xxs)] w-full min-w-[280px] rounded-[var(--curves-md)] border bg-[var(--interactive-bg)] p-[var(--spacing-xxs)] shadow-md">
            <input
              type="text"
              className="w-full px-[var(--spacing-md)] py-[var(--spacing-sm)] text-[var(--font-size-sm)] border-b bg-transparent outline-none placeholder:text-[var(--interactive-fg-alt)]"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <div className="max-h-[200px] overflow-y-auto mt-1">
              {filteredCountries.length === 0 ? (
                <div className="px-[var(--spacing-md)] py-[var(--spacing-sm)] text-[var(--font-size-sm)] text-[var(--interactive-fg-alt)]">
                  No countries found
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    className={cn(
                      "flex w-full items-center gap-[var(--spacing-sm)] rounded-[var(--curves-sm)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-[var(--font-size-sm)] hover:bg-[var(--interactive-bg-hover)]",
                      selectedCountry.code === country.code && "bg-accent"
                    )}
                    onClick={() => handleCountrySelect(country)}
                  >
                    <span className="text-[var(--font-size-base)]">{country.flag}</span>
                    <span className="flex-1 text-left">{country.name}</span>
                    <span className="text-[var(--interactive-fg-alt)]">{country.dialCode}</span>
                    {selectedCountry.code === country.code && (
                      <Check className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
)
PhoneInput.displayName = "PhoneInput"

export { PhoneInput, defaultCountries }
