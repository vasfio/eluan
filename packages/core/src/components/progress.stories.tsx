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
import { Progress } from "@eluan/core"
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
    <div style={{ width: "60%" }}>
      <Progress />
    </div>
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
  render: () => {
    const rows: { label: string; value: number }[] = [
      { label: "0%", value: 0 },
      { label: "25%", value: 25 },
      { label: "50%", value: 50 },
      { label: "75%", value: 75 },
      { label: "100%", value: 100 },
    ]
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-lg)",
        }}
      >
        {rows.map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-xs)",
            }}
          >
            <p
              style={{
                color: "var(--container-fg-alt)",
                fontSize: "var(--font-size-sm)",
                margin: 0,
              }}
            >
              {row.label}
            </p>
            <Progress value={row.value} />
          </div>
        ))}
      </div>
    )
  },
}
