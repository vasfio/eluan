import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
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
import { NumberInput } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<NumberInput
  min={0}
  max={100}
  step={5}
  value={50}
  onValueChange={(value) => console.log(value)}
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
    <div style={{ maxWidth: 200 }}>
      <NumberInput placeholder="Enter number" onValueChange={action("onValueChange")} />
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
    <div style={{ maxWidth: 200, display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <p style={{ margin: 0, fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)" }}>Range: 0 to 100</p>
      <NumberInput min={0} max={100} value={50} onValueChange={action("onValueChange")} />
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
    <div style={{ maxWidth: 200, display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <p style={{ margin: 0, fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)" }}>Step: 5</p>
      <NumberInput step={5} value={0} onValueChange={action("onValueChange")} />
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
    <div style={{ maxWidth: 200 }}>
      <NumberInput
        showControls={false}
        placeholder="Enter number"
        onValueChange={action("onValueChange")}
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
    <div style={{ maxWidth: 200, display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <p style={{ margin: 0, fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)" }}>Positive numbers only</p>
      <NumberInput allowNegative={false} min={0} onValueChange={action("onValueChange")} />
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
    <div style={{ maxWidth: 200, display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <p style={{ margin: 0, fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)" }}>Quantity selector</p>
      <NumberInput min={1} max={99} value={1} onValueChange={action("onValueChange")} />
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
    <div style={{ maxWidth: 200 }}>
      <NumberInput value={42} disabled />
    </div>
  ),
}
