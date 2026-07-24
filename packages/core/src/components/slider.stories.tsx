import type { Meta, StoryObj } from "@storybook/react"
import { Slider } from "./slider"

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
An input control for selecting a numeric value or range from a bounded interval by dragging a thumb along a track.

**Import**
\`\`\`tsx
import { Slider } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Slider defaultValue={[50]} max={100} step={1} />
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
        story: "Basic single-thumb slider with a default value of 50.",
      },
    },
  },
  render: () => (
    <div style={{ width: "60%" }}>
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
}

export const Range: Story = {
  parameters: {
    docs: {
      description: {
        story: "Range slider with two thumbs for selecting a value range. Pass an array with two values to `defaultValue`.",
      },
    },
  },
  render: () => (
    <div style={{ width: "60%" }}>
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  ),
}

export const WithSteps: Story = {
  parameters: {
    docs: {
      description: {
        story: "Slider with a larger `step` value of 10, snapping the thumb to discrete increments.",
      },
    },
  },
  render: () => (
    <div style={{ width: "60%" }}>
      <Slider defaultValue={[50]} max={100} step={10} />
    </div>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Disabled slider that cannot be interacted with.",
      },
    },
  },
  render: () => (
    <div style={{ width: "60%" }}>
      <Slider defaultValue={[50]} max={100} step={1} disabled />
    </div>
  ),
}
