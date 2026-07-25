import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { SegmentedControl, SegmentedControlItem } from "./segmented-control"

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/Segmented Control",
  component: SegmentedControl,
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: "Size of the segments.",
    },
    fullWidth: {
      description:
        "Stretch the control to fill its container, with equal-width segments.",
    },
    disabled: {
      description: "Whether the entire control is disabled.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A single-select control that lets users choose exactly one option from a small set, rendered as a recessed track of raised-cap segments. Built on the Radix UI Tabs primitive (the picker only — no content panel).

**Import**
\`\`\`tsx
import { SegmentedControl, SegmentedControlItem } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<SegmentedControl defaultValue="week">
  <SegmentedControlItem value="day">Day</SegmentedControlItem>
  <SegmentedControlItem value="week">Week</SegmentedControlItem>
  <SegmentedControlItem value="month">Month</SegmentedControlItem>
</SegmentedControl>
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
        story:
          "An uncontrolled control with three segments and a default selection.",
      },
    },
  },
  render: () => (
    <SegmentedControl defaultValue="week">
      <SegmentedControlItem value="day">Day</SegmentedControlItem>
      <SegmentedControlItem value="week">Week</SegmentedControlItem>
      <SegmentedControlItem value="month">Month</SegmentedControlItem>
    </SegmentedControl>
  ),
}

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A controlled control that reflects and updates external state.",
      },
    },
  },
  render: function ControlledDemo() {
    const [value, setValue] = React.useState("list")
    return (
      <div style={column}>
        <SegmentedControl value={value} onValueChange={setValue}>
          <SegmentedControlItem value="list">List</SegmentedControlItem>
          <SegmentedControlItem value="board">Board</SegmentedControlItem>
          <SegmentedControlItem value="calendar">Calendar</SegmentedControlItem>
        </SegmentedControl>
        <p style={caption}>
          Current view: <strong>{value}</strong>
        </p>
      </div>
    )
  },
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "The default and small sizes stacked for comparison.",
      },
    },
  },
  render: () => (
    <div style={column}>
      <SegmentedControl defaultValue="week">
        <SegmentedControlItem value="day">Day</SegmentedControlItem>
        <SegmentedControlItem value="week">Week</SegmentedControlItem>
        <SegmentedControlItem value="month">Month</SegmentedControlItem>
      </SegmentedControl>
      <SegmentedControl size="sm" defaultValue="week">
        <SegmentedControlItem value="day">Day</SegmentedControlItem>
        <SegmentedControlItem value="week">Week</SegmentedControlItem>
        <SegmentedControlItem value="month">Month</SegmentedControlItem>
      </SegmentedControl>
    </div>
  ),
}

export const FullWidth: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Stretched to fill its container with equal-width segments.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <SegmentedControl fullWidth defaultValue="all">
        <SegmentedControlItem value="all">All</SegmentedControlItem>
        <SegmentedControlItem value="active">Active</SegmentedControlItem>
        <SegmentedControlItem value="archived">Archived</SegmentedControlItem>
      </SegmentedControl>
    </div>
  ),
}

export const WithDisabledSegment: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A control with one segment disabled, preventing its selection.",
      },
    },
  },
  render: () => (
    <SegmentedControl defaultValue="standard">
      <SegmentedControlItem value="standard">Standard</SegmentedControlItem>
      <SegmentedControlItem value="express">Express</SegmentedControlItem>
      <SegmentedControlItem value="overnight" disabled>
        Overnight
      </SegmentedControlItem>
    </SegmentedControl>
  ),
}

const column: React.CSSProperties = {
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-md)",
}

const caption: React.CSSProperties = {
  color: "var(--container-fg-alt)",
  fontSize: "var(--font-size-sm)",
  margin: 0,
}
