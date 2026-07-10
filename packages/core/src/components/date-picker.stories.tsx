import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DatePicker } from "./date-picker"

const meta: Meta<typeof DatePicker> = {
  title: "Components/Date Picker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "The currently selected date.",
    },
    onChange: {
      description: "Callback fired when a date is selected or cleared.",
    },
    placeholder: {
      description: "Placeholder text shown when no date is selected.",
    },
    disabled: {
      description: "Whether the date picker trigger button is disabled.",
    },
    dateFormat: {
      description: "A date-fns format string for displaying the selected date (defaults to \"PPP\").",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A popover-based date picker that lets users select a single date from a calendar.

**Import**
\`\`\`tsx
import { DatePicker } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<DatePicker value={date} onChange={setDate} />
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
        story: "A date picker with no initial value, showing the default placeholder.",
      },
    },
  },
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>()
    return <DatePicker value={date} onChange={setDate} />
  },
}

export const WithPreselected: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A date picker initialized with today's date already selected.",
      },
    },
  },
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return <DatePicker value={date} onChange={setDate} />
  },
}

export const WithPlaceholder: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A date picker with a custom placeholder string.",
      },
    },
  },
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>()
    return <DatePicker value={date} onChange={setDate} placeholder="Select a date..." />
  },
}

export const Disabled: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "A date picker in the disabled state, preventing user interaction.",
      },
    },
  },
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>()
    return <DatePicker value={date} onChange={setDate} disabled />
  },
}
