import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "./progress"

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "The current progress value from 0 to 100. Omit for an indeterminate state.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A horizontal bar that indicates the completion progress of a task, built on Radix UI Progress primitive.

**Import**
\`\`\`tsx
import { Progress } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<Progress value={60} />
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 60,
  },
}

export const Empty: Story = {
  args: {
    value: 0,
  },
}

export const Full: Story = {
  args: {
    value: 100,
  },
}

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story: "A progress bar without a value, representing an indeterminate loading state.",
      },
    },
  },
  render: () => (
    <Progress className="w-[60%]" />
  ),
}

export const AllValues: Story = {
  parameters: {
    docs: {
      description: {
        story: "Displays progress bars at 0%, 25%, 50%, 75%, and 100% to show the visual range.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">0%</p>
        <Progress value={0} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">25%</p>
        <Progress value={25} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">50%</p>
        <Progress value={50} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">75%</p>
        <Progress value={75} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">100%</p>
        <Progress value={100} />
      </div>
    </div>
  ),
}
