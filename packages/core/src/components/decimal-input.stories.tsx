import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { DecimalInput, CurrencyInput, PercentageInput, UnitInput } from "./decimal-input"
import { Label } from "./form-label"

const meta: Meta<typeof DecimalInput> = {
  title: "Components/Decimal Input",
  component: DecimalInput,
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "The controlled numeric value.",
    },
    onValueChange: {
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
<DecimalInput placeholder="0.00" onValueChange={(value) => console.log(value)} />
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
    <div style={{ maxWidth: 288 }}>
      <DecimalInput placeholder="0.00" onValueChange={action("onValueChange")} />
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
    <div style={{ maxWidth: 288, display: "flex", flexDirection: "column", gap: 16 }}>
      <CurrencyInput currency="USD" placeholder="0.00" onValueChange={action("onValueChange")} />
      <CurrencyInput currency="EUR" placeholder="0.00" onValueChange={action("onValueChange")} />
      <CurrencyInput currency="GBP" placeholder="0.00" onValueChange={action("onValueChange")} />
      <CurrencyInput currency="JPY" placeholder="0" onValueChange={action("onValueChange")} />
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
    <div style={{ maxWidth: 288, display: "flex", flexDirection: "column", gap: 16 }}>
      <PercentageInput placeholder="0.0" onValueChange={action("onValueChange")} />
      <PercentageInput value={75.5} onValueChange={action("onValueChange")} />
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
    <div style={{ maxWidth: 288, display: "flex", flexDirection: "column", gap: 16 }}>
      <UnitInput unit="kg" placeholder="0.00" onValueChange={action("onValueChange")} />
      <UnitInput unit="cm" placeholder="0.00" onValueChange={action("onValueChange")} />
      <UnitInput unit="$" unitPosition="prefix" placeholder="0.00" onValueChange={action("onValueChange")} />
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
    <div style={{ maxWidth: 288, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        <Label htmlFor="decimals-2">2 decimals</Label>
        <DecimalInput id="decimals-2" decimals={2} placeholder="0.00" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        <Label htmlFor="decimals-4">4 decimals</Label>
        <DecimalInput id="decimals-4" decimals={4} placeholder="0.0000" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        <Label htmlFor="decimals-0">No decimals</Label>
        <DecimalInput id="decimals-0" decimals={0} placeholder="0" />
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
    <div style={{ maxWidth: 288, display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
      <Label htmlFor="decimal-range">Range: 0 to 1000</Label>
      <CurrencyInput id="decimal-range" currency="USD" min={0} max={1000} onValueChange={action("onValueChange")} />
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
    <div style={{ maxWidth: 288, display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
      <Label htmlFor="decimal-negative">Allows negative values</Label>
      <CurrencyInput id="decimal-negative" currency="USD" allowNegative onValueChange={action("onValueChange")} />
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
    <div style={{ maxWidth: 288 }}>
      <CurrencyInput currency="USD" value={99.99} disabled />
    </div>
  ),
}
