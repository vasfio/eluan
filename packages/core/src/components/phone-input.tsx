import * as React from "react"
import { countries as countriesData, getEmojiFlag, type TCountryCode } from "countries-list"
import * as stylex from "@stylexjs/stylex"

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
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "size" | "style" | "type" | "value" | "onChange"> {
  countries?: Country[]
  defaultCountry?: string
  value?: string
  onValueChange?: (value: string, country: Country) => void
  onCountryChange?: (country: Country) => void
}

const styles = stylex.create({
  root: {
    display: "flex",
  },
  triggerContent: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-xxs)",
  },
  countryRow: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-sm)",
  },
  countryName: {
    flex: 1,
  },
  dialCode: {
    color: "var(--interactive-fg-alt)",
  },
})

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      countries = defaultCountries,
      defaultCountry = "US",
      value,
      onValueChange,
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
        onValueChange?.(phoneNumber, country)
      }
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/[^\d\s\-()]/g, "")
      setPhoneNumber(newValue)
      onValueChange?.(newValue, selectedCountry)
    }

    return (
      <div {...stylex.props(styles.root)}>
        <Select
          value={selectedCountry.code}
          onValueChange={handleCountryChange}
          disabled={disabled}
        >
          <SelectTrigger
            variant="countryCode"
            aria-label={`Country calling code, currently ${selectedCountry.name} ${selectedCountry.dialCode}`}
          >
            <span {...stylex.props(styles.triggerContent)}>
              <span aria-hidden="true">{selectedCountry.flag}</span>
              <span {...stylex.props(styles.dialCode)}>{selectedCountry.dialCode}</span>
            </span>
          </SelectTrigger>
          <SelectContent layout="country">
            {countries.map((country) => (
              <SelectItem
                key={country.code}
                value={country.code}
                textValue={`${country.name} ${country.dialCode}`}
              >
                <span {...stylex.props(styles.countryRow)}>
                  <span>{country.flag}</span>
                  <span {...stylex.props(styles.countryName)}>{country.name}</span>
                  <span {...stylex.props(styles.dialCode)}>{country.dialCode}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="tel"
          icon={null}
          aria-label="Phone number"
          ref={ref}
          attachment="start"
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
