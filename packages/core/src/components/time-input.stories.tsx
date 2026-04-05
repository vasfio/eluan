import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { TimeInput } from "./time-input"

const meta: Meta<typeof TimeInput> = {
  title: "Components/TimeInput",
  component: TimeInput,
  tags: ["autodocs"],
  argTypes: {
    format: {
      control: "select",
      options: ["12", "24"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    showIcon: {
      control: "boolean",
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

export const Small: Story = {
  args: {
    value: "09:15",
    size: "sm",
  },
}

export const Large: Story = {
  args: {
    value: "09:15",
    size: "lg",
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
  render: () => {
    const [value, setValue] = useState("09:30 AM")
    return (
      <div className="space-y-2">
        <TimeInput value={value} onChange={setValue} format="12" />
        <p className="text-sm text-muted-foreground">
          Current value: <code>{value}</code>
        </p>
      </div>
    )
  },
}
