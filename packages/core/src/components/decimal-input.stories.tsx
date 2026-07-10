import type { Meta, StoryObj } from "@storybook/react"
import { DecimalInput, CurrencyInput, PercentageInput, UnitInput } from "./decimal-input"

const meta: Meta<typeof DecimalInput> = {
  title: "Components/Decimal Input",
  component: DecimalInput,
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "The controlled numeric value.",
    },
    onChange: {
      description: "Callback fired when the numeric value changes.",
    },
    decimals: {
      description: "Number of decimal places allowed (default 2).",
    },
    min: {
      description: "Minimum allowed value.",
    },
    max: {
      description: "Maximum allowed value.",
    },
    prefix: {
      description: "A string displayed before the input value (e.g. a currency symbol).",
    },
    suffix: {
      description: "A string displayed after the input value (e.g. a unit).",
    },
    allowNegative: {
      description: "Whether negative values are permitted.",
    },
    disabled: {
      description: "Whether the input is disabled.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A numeric input for decimal values with formatting, min/max clamping, and optional prefix/suffix adornments. Includes specialized variants: CurrencyInput, PercentageInput, and UnitInput.

**Import**
\`\`\`tsx
import { DecimalInput, CurrencyInput, PercentageInput, UnitInput } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<DecimalInput placeholder="0.00" onChange={(value) => console.log(value)} />
<CurrencyInput currency="USD" placeholder="0.00" />
<PercentageInput placeholder="0.0" />
<UnitInput unit="kg" placeholder="0.00" />
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
        story: "A basic decimal input with default 2 decimal places.",
      },
    },
  },
  render: () => (
    <div className="w-[200px]">
      <DecimalInput placeholder="0.00" onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const Currency: Story = {
  parameters: {
    docs: {
      description: {
        story: "CurrencyInput variants for USD, EUR, GBP, and JPY showing automatic currency symbol prefixes and decimal precision.",
      },
    },
  },
  render: () => (
    <div className="w-[200px] space-y-3">
      <CurrencyInput currency="USD" placeholder="0.00" onChange={(value) => console.log("USD:", value)} />
      <CurrencyInput currency="EUR" placeholder="0.00" onChange={(value) => console.log("EUR:", value)} />
      <CurrencyInput currency="GBP" placeholder="0.00" onChange={(value) => console.log("GBP:", value)} />
      <CurrencyInput currency="JPY" placeholder="0" onChange={(value) => console.log("JPY:", value)} />
    </div>
  ),
}

export const Percentage: Story = {
  parameters: {
    docs: {
      description: {
        story: "PercentageInput with a \"%\" suffix, defaulting to 0-100 range and 1 decimal place.",
      },
    },
  },
  render: () => (
    <div className="w-[150px] space-y-3">
      <PercentageInput placeholder="0.0" onChange={(value) => console.log("Percentage:", value)} />
      <PercentageInput value={75.5} onChange={(value) => console.log("Percentage:", value)} />
    </div>
  ),
}

export const Units: Story = {
  parameters: {
    docs: {
      description: {
        story: "UnitInput examples with suffix units (kg, cm) and a prefix unit ($).",
      },
    },
  },
  render: () => (
    <div className="w-[200px] space-y-3">
      <UnitInput unit="kg" placeholder="0.00" onChange={(value) => console.log("Weight:", value)} />
      <UnitInput unit="cm" placeholder="0.00" onChange={(value) => console.log("Length:", value)} />
      <UnitInput unit="$" unitPosition="prefix" placeholder="0.00" onChange={(value) => console.log("Price:", value)} />
    </div>
  ),
}

export const CustomDecimals: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstrates configuring different decimal precision: 2, 4, and 0 decimal places.",
      },
    },
  },
  render: () => (
    <div className="w-[200px] space-y-3">
      <div>
        <p className="text-sm text-muted-foreground mb-1">2 decimals</p>
        <DecimalInput decimals={2} placeholder="0.00" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">4 decimals</p>
        <DecimalInput decimals={4} placeholder="0.0000" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">No decimals</p>
        <DecimalInput decimals={0} placeholder="0" />
      </div>
    </div>
  ),
}

export const WithMinMax: Story = {
  parameters: {
    docs: {
      description: {
        story: "A currency input clamped to a 0-1000 range.",
      },
    },
  },
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">Range: 0 to 1000</p>
      <CurrencyInput currency="USD" min={0} max={1000} onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const AllowNegative: Story = {
  parameters: {
    docs: {
      description: {
        story: "A currency input that permits negative values.",
      },
    },
  },
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">Allows negative values</p>
      <CurrencyInput currency="USD" allowNegative onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "A currency input in the disabled state with a pre-filled value.",
      },
    },
  },
  render: () => (
    <div className="w-[200px]">
      <CurrencyInput currency="USD" value={99.99} disabled />
    </div>
  ),
}
