import * as React from "react"
import { countries as countriesData, getEmojiFlag, type TCountryCode } from "countries-list"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select"

export interface Country {
  code: string
  name: string
  dialCode: string
  flag: string
}

const defaultCountries: Country[] = Object.entries(countriesData)
  .map(([code, data]) => ({
    code,
    name: data.name,
    dialCode: `+${data.phone[0]}`,
    flag: getEmojiFlag(code as TCountryCode),
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

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
      disabled,
      ...props
    },
    ref
  ) => {
    const [selectedCountry, setSelectedCountry] = React.useState<Country>(
      countries.find((c) => c.code === defaultCountry) || countries[0]
    )
    const [phoneNumber, setPhoneNumber] = React.useState(value || "")

    React.useEffect(() => {
      if (value !== undefined) {
        setPhoneNumber(value)
      }
    }, [value])

    const handleCountryChange = (code: string) => {
      const country = countries.find((c) => c.code === code)
      if (country) {
        setSelectedCountry(country)
        onCountryChange?.(country)
        onChange?.(phoneNumber, country)
      }
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/[^\d\s\-()]/g, "")
      setPhoneNumber(newValue)
      onChange?.(newValue, selectedCountry)
    }

    return (
      <div className="flex">
        <Select
          value={selectedCountry.code}
          onValueChange={handleCountryChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-auto min-w-24 shrink-0 rounded-r-none gap-[var(--spacing-xxs)]">
            <span className="flex items-center gap-[var(--spacing-xxs)]">
              <span>{selectedCountry.flag}</span>
              <span className="text-[color:var(--interactive-fg-alt)]">{selectedCountry.dialCode}</span>
            </span>
          </SelectTrigger>
          <SelectContent className={cn("min-w-[280px]", "[&_[role=listbox]]:min-w-0 [&_[role=listbox]]:w-auto")}>
            {countries.map((country) => (
              <SelectItem
                key={country.code}
                value={country.code}
                textValue={`${country.name} ${country.dialCode}`}
              >
                <span className="flex items-center gap-[var(--spacing-sm)]">
                  <span>{country.flag}</span>
                  <span className="flex-1">{country.name}</span>
                  <span className="text-[color:var(--interactive-fg-alt)]">{country.dialCode}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="tel"
          icon={null}
          ref={ref}
          className={cn("flex-1 [&_input]:rounded-l-none [&_input]:border-l-0", className)}
          value={phoneNumber}
          onChange={handlePhoneChange}
          disabled={disabled}
          {...props}
        />
      </div>
    )
  }
)
PhoneInput.displayName = "PhoneInput"

export { PhoneInput, defaultCountries }
