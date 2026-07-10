import type { Meta, StoryObj } from "@storybook/react"
import { Toggle } from "./toggle"

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Visual style of the toggle. Options: `\"default\"` (transparent background) or `\"outline\"` (with border).",
    },
    size: {
      description: "Size of the toggle.",
    },
    pressed: {
      description: "Controlled pressed state of the toggle.",
    },
    defaultPressed: {
      description: "The initial pressed state when uncontrolled.",
    },
    disabled: {
      description: "Whether the toggle is disabled.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A two-state button that can be toggled on or off, commonly used for formatting controls like bold or italic.

**Import**
\`\`\`tsx
import { Toggle } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Toggle aria-label="Toggle bold">B</Toggle>
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
        story: "Basic toggle with default variant and transparent background.",
      },
    },
  },
  render: () => <Toggle aria-label="Toggle italic">B</Toggle>,
}

export const Outline: Story = {
  parameters: {
    docs: {
      description: {
        story: "Toggle with `variant=\"outline\"` showing a visible border.",
      },
    },
  },
  render: () => <Toggle variant="outline" aria-label="Toggle italic">B</Toggle>,
}

export const WithText: Story = {
  parameters: {
    docs: {
      description: {
        story: "Toggle with a text label instead of a single character.",
      },
    },
  },
  render: () => <Toggle aria-label="Toggle bold">Bold</Toggle>,
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Disabled toggle that cannot be interacted with.",
      },
    },
  },
  render: () => <Toggle disabled aria-label="Toggle">Disabled</Toggle>,
}

export const Pressed: Story = {
  parameters: {
    docs: {
      description: {
        story: "Toggle initialized in the pressed state using `defaultPressed`.",
      },
    },
  },
  render: () => <Toggle defaultPressed aria-label="Toggle pressed">Pressed</Toggle>,
}
