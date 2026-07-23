import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DateTimePicker } from "./datetime-picker"

const meta: Meta<typeof DateTimePicker> = {
  title: "Components/Datetime Picker",
  component: DateTimePicker,
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "The currently selected date and time.",
    },
    onChange: {
      description: "Callback fired when the date or time changes.",
    },
    placeholder: {
      description: "Placeholder text shown when no date/time is selected.",
    },
    disabled: {
      description: "Whether the picker trigger button is disabled.",
    },
    showSeconds: {
      description: "Whether to display a seconds input in the time selector.",
    },
    use24Hour: {
      description: "Whether to use 24-hour format instead of 12-hour AM/PM.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A combined date and time picker that lets users select a date from a calendar and set a time using input fields.

**Import**
\`\`\`tsx
import { DateTimePicker } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<DateTimePicker value={dateTime} onChange={setDateTime} />
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A datetime picker with no initial value, showing the default placeholder.",
      },
    },
  },
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>()
    return (
      <div style={{ maxWidth: 288 }}>
        <DateTimePicker value={dateTime} onChange={setDateTime} />
      </div>
    )
  },
}

export const WithPreselected: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A datetime picker initialized with the current date and time.",
      },
    },
  },
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>(new Date())
    return (
      <div style={{ maxWidth: 288 }}>
        <DateTimePicker value={dateTime} onChange={setDateTime} />
      </div>
    )
  },
}

export const WithLabel: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A datetime picker paired with an external label element.",
      },
    },
  },
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>()
    return (
      <div style={{ maxWidth: 288, display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <label style={{ fontSize: "var(--font-size-sm)", fontWeight: 500 }}>Event Date & Time</label>
        <DateTimePicker value={dateTime} onChange={setDateTime} />
      </div>
    )
  },
}

export const WithSeconds: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "A datetime picker showing seconds. The time row is the shared TimeInput component (with its two-digit entry fix), extended with a seconds segment.",
      },
    },
  },
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>(new Date())
    return (
      <div style={{ maxWidth: 288 }}>
        <DateTimePicker value={dateTime} onChange={setDateTime} showSeconds use24Hour />
      </div>
    )
  },
}

export const WideTrigger: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "The popover matches the trigger width, so a wider trigger stretches the fluid calendar grid and each day cell to fill it.",
      },
    },
  },
  render: () => {
    const [dateTime, setDateTime] = React.useState<Date | undefined>()
    return (
      <div style={{ maxWidth: 440 }}>
        <DateTimePicker value={dateTime} onChange={setDateTime} />
      </div>
    )
  },
}
