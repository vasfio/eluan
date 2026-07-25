import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { TimeInput } from "./time-input"

const meta: Meta<typeof TimeInput> = {
  title: "Components/Time Input",
  component: TimeInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A segmented time input supporting 12-hour and 24-hour formats with keyboard navigation (arrow keys, colon to advance), AM/PM toggle, and size variants.

**Import**
\`\`\`tsx
import { TimeInput } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<TimeInput value="14:30" onValueChange={setValue} format="24" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    format: {
      control: "select",
      options: ["12", "24"],
      description: "Whether to use 12-hour or 24-hour time format.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the time input is disabled.",
    },
    showIcon: {
      control: "boolean",
      description: "Whether to show the clock icon.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "14:30",
    format: "24",
  },
}

export const TwelveHour: Story = {
  args: {
    value: "02:30 PM",
    format: "12",
  },
}

export const NoIcon: Story = {
  args: {
    value: "10:00",
    showIcon: false,
  },
}

export const Disabled: Story = {
  args: {
    value: "08:00",
    disabled: true,
  },
}

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: "A controlled time input in 12-hour format that displays the current value below.",
      },
    },
  },
  render: function ControlledStory() {
    const [value, setValue] = useState("09:30 AM")
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <TimeInput value={value} onValueChange={setValue} format="12" />
        <p style={{ margin: 0, fontSize: "var(--font-size-xs)", color: "var(--container-fg-alt)" }}>
          Current value: <code>{value}</code>
        </p>
      </div>
    )
  },
}
