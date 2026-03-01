import type { Meta, StoryObj } from "@storybook/react"
import { DecimalInput, CurrencyInput, PercentageInput, UnitInput } from "./decimal-input"

const meta: Meta<typeof DecimalInput> = {
  title: "Core/DecimalInput",
  component: DecimalInput,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[200px]">
      <DecimalInput placeholder="0.00" onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const Currency: Story = {
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
  render: () => (
    <div className="w-[150px] space-y-3">
      <PercentageInput placeholder="0.0" onChange={(value) => console.log("Percentage:", value)} />
      <PercentageInput value={75.5} onChange={(value) => console.log("Percentage:", value)} />
    </div>
  ),
}

export const Units: Story = {
  render: () => (
    <div className="w-[200px] space-y-3">
      <UnitInput unit="kg" placeholder="0.00" onChange={(value) => console.log("Weight:", value)} />
      <UnitInput unit="cm" placeholder="0.00" onChange={(value) => console.log("Length:", value)} />
      <UnitInput unit="$" unitPosition="prefix" placeholder="0.00" onChange={(value) => console.log("Price:", value)} />
    </div>
  ),
}

export const CustomDecimals: Story = {
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
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">Range: 0 to 1000</p>
      <CurrencyInput currency="USD" min={0} max={1000} onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const AllowNegative: Story = {
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">Allows negative values</p>
      <CurrencyInput currency="USD" allowNegative onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[200px]">
      <CurrencyInput currency="USD" value={99.99} disabled />
    </div>
  ),
}
