import type { Meta, StoryObj } from "@storybook/react"
import { PhoneInput } from "./phone-input"

const meta: Meta<typeof PhoneInput> = {
  title: "Components/Phone Input",
  component: PhoneInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A phone number input with an integrated country code selector, searchable dropdown, and automatic formatting.

**Import**
\`\`\`tsx
import { PhoneInput } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<PhoneInput
  placeholder="Phone number"
  defaultCountry="US"
  onChange={(value, country) => console.log(value, country)}
/>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Basic phone input with the default US country code selected.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 288 }}>
      <PhoneInput placeholder="Phone number" />
    </div>
  ),
}

export const WithDefaultCountry: Story = {
  parameters: {
    docs: {
      description: {
        story: "Phone input pre-set with United Kingdom as the default country.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 288 }}>
      <PhoneInput placeholder="Phone number" defaultCountry="GB" />
    </div>
  ),
}

export const WithCallback: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstrates the onChange and onCountryChange callback handlers.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 288 }}>
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
  parameters: {
    docs: {
      description: {
        story: "Phone input with a restricted set of countries (US, Canada, Mexico).",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 288 }}>
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
  parameters: {
    docs: {
      description: {
        story: "Phone input in a disabled state where interaction is prevented.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 288 }}>
      <PhoneInput placeholder="Phone number" disabled />
    </div>
  ),
}
