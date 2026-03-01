import type { Meta, StoryObj } from "@storybook/react"
import { NumberInput } from "./number-input"

const meta: Meta<typeof NumberInput> = {
  title: "Core/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[200px]">
      <NumberInput placeholder="Enter number" onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const WithMinMax: Story = {
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">Range: 0 to 100</p>
      <NumberInput min={0} max={100} value={50} onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const WithStep: Story = {
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">Step: 5</p>
      <NumberInput step={5} value={0} onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const WithoutControls: Story = {
  render: () => (
    <div className="w-[200px]">
      <NumberInput
        showControls={false}
        placeholder="Enter number"
        onChange={(value) => console.log("Value:", value)}
      />
    </div>
  ),
}

export const PositiveOnly: Story = {
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">Positive numbers only</p>
      <NumberInput allowNegative={false} min={0} onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const Quantity: Story = {
  render: () => (
    <div className="w-[150px] space-y-2">
      <p className="text-sm text-muted-foreground">Quantity selector</p>
      <NumberInput min={1} max={99} value={1} onChange={(value) => console.log("Quantity:", value)} />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[200px]">
      <NumberInput value={42} disabled />
    </div>
  ),
}
