import type { Meta, StoryObj } from "@storybook/react"
import { NumberInput } from "./number-input"

const meta: Meta<typeof NumberInput> = {
  title: "Components/Number Input",
  component: NumberInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A numeric input with optional increment/decrement buttons, min/max clamping, configurable step size, and keyboard arrow key support.

**Import**
\`\`\`tsx
import { NumberInput } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<NumberInput
  min={0}
  max={100}
  step={5}
  value={50}
  onChange={(value) => console.log(value)}
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
        story: "Basic number input with increment/decrement controls.",
      },
    },
  },
  render: () => (
    <div className="w-[200px]">
      <NumberInput placeholder="Enter number" onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const WithMinMax: Story = {
  parameters: {
    docs: {
      description: {
        story: "Number input clamped to a 0-100 range.",
      },
    },
  },
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">Range: 0 to 100</p>
      <NumberInput min={0} max={100} value={50} onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const WithStep: Story = {
  parameters: {
    docs: {
      description: {
        story: "Number input that increments and decrements by 5.",
      },
    },
  },
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">Step: 5</p>
      <NumberInput step={5} value={0} onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const WithoutControls: Story = {
  parameters: {
    docs: {
      description: {
        story: "Plain number input without the increment/decrement buttons.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Number input restricted to positive values only with allowNegative set to false.",
      },
    },
  },
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">Positive numbers only</p>
      <NumberInput allowNegative={false} min={0} onChange={(value) => console.log("Value:", value)} />
    </div>
  ),
}

export const Quantity: Story = {
  parameters: {
    docs: {
      description: {
        story: "Compact quantity selector clamped between 1 and 99.",
      },
    },
  },
  render: () => (
    <div className="w-[150px] space-y-2">
      <p className="text-sm text-muted-foreground">Quantity selector</p>
      <NumberInput min={1} max={99} value={1} onChange={(value) => console.log("Quantity:", value)} />
    </div>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Number input in a disabled state with controls grayed out.",
      },
    },
  },
  render: () => (
    <div className="w-[200px]">
      <NumberInput value={42} disabled />
    </div>
  ),
}
