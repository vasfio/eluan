import type { Meta, StoryObj } from "@storybook/react"
import { Spinner } from "./spinner"

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      description:
        'Controls the spinner dimensions. Options: `"default"`, `"sm"`, `"lg"`, `"xl"`.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A circular loading indicator used to communicate that an action is in progress.

**Import**
\`\`\`tsx
import { Spinner } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Spinner size="default" />
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Spinner />,
  parameters: {
    docs: {
      description: {
        story: "The default spinner at the standard size.",
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="default" />
      <Spinner size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows the available size variants side by side: sm, default, and lg.",
      },
    },
  },
}

export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner size="sm" />
      <span className="text-sm text-muted-foreground">Loading...</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A spinner paired with a text label to provide additional loading context.",
      },
    },
  },
}

export const InButton: Story = {
  render: () => (
    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground" disabled>
      <Spinner size="sm" className="text-primary-foreground" />
      Processing...
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story: "A spinner embedded inside a disabled button to indicate an in-progress action.",
      },
    },
  },
}
