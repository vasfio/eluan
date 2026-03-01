import type { Meta, StoryObj } from "@storybook/react"
import { PhoneInput } from "./phone-input"

const meta: Meta<typeof PhoneInput> = {
  title: "Core/PhoneInput",
  component: PhoneInput,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <PhoneInput placeholder="Phone number" />
    </div>
  ),
}

export const WithDefaultCountry: Story = {
  render: () => (
    <div className="w-[300px]">
      <PhoneInput placeholder="Phone number" defaultCountry="GB" />
    </div>
  ),
}

export const WithCallback: Story = {
  render: () => (
    <div className="w-[300px]">
      <PhoneInput
        placeholder="Phone number"
        onChange={(value, country) => {
          console.log("Phone:", value)
          console.log("Country:", country)
        }}
        onCountryChange={(country) => {
          console.log("Country changed:", country)
        }}
      />
    </div>
  ),
}

export const LimitedCountries: Story = {
  render: () => (
    <div className="w-[300px]">
      <PhoneInput
        placeholder="Phone number"
        countries={[
          { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
          { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
          { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
        ]}
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <PhoneInput placeholder="Phone number" disabled />
    </div>
  ),
}
