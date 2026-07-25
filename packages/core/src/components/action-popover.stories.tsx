import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Edit, Trash2, Copy, Share, Download, Archive } from "lucide-react"
import { ActionPopover } from "./action-popover"

const meta: Meta<typeof ActionPopover> = {
  title: "Components/Action Popover",
  component: ActionPopover,
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description:
        "Horizontal alignment of the dropdown menu relative to the trigger button.",
    },
    side: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Which side of the trigger the dropdown menu appears on.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A button with an ellipsis (MoreHorizontal) icon that opens a dropdown menu of actions.

**Import**
\`\`\`tsx
import { ActionPopover } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<ActionPopover
  items={[
    { label: "Edit", onClick: () => {} },
    { label: "Delete", destructive: true, onClick: () => {} },
  ]}
/>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ActionPopover
      items={[
        { label: "Edit", onClick: action("Edit") },
        { label: "Duplicate", onClick: action("Duplicate") },
        { label: "Share", onClick: action("Share") },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "A basic action popover with simple text menu items.",
      },
    },
  },
}

export const WithIcons: Story = {
  render: () => (
    <ActionPopover
      items={[
        { label: "Edit", icon: <Edit />, onClick: action("Edit") },
        { label: "Copy", icon: <Copy />, onClick: action("Copy") },
        {
          label: "Share",
          icon: <Share />,
          onClick: action("Share"),
        },
        {
          label: "Download",
          icon: <Download />,
          onClick: action("Download"),
        },
        {
          label: "Archive",
          icon: <Archive />,
          onClick: action("Archive"),
        },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Action popover items with leading icons for visual clarity.",
      },
    },
  },
}

export const WithDestructiveItem: Story = {
  render: () => (
    <ActionPopover
      items={[
        { label: "Edit", icon: <Edit />, onClick: action("Edit") },
        { label: "Copy", icon: <Copy />, onClick: action("Copy") },
        {
          label: "Delete",
          icon: <Trash2 />,
          destructive: true,
          onClick: action("Delete"),
        },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "An action popover with a destructive item styled to warn the user.",
      },
    },
  },
}

export const WithDisabledItems: Story = {
  render: () => (
    <ActionPopover
      items={[
        { label: "Edit", icon: <Edit />, onClick: action("Edit") },
        { label: "Copy", icon: <Copy />, disabled: true },
        {
          label: "Delete",
          icon: <Trash2 />,
          destructive: true,
          disabled: true,
        },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Action popover with some items disabled to prevent interaction.",
      },
    },
  },
}

export const AlignStart: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ActionPopover
        align="start"
        items={[
          {
            label: "Edit",
            icon: <Edit />,
            onClick: action("Edit"),
          },
          {
            label: "Copy",
            icon: <Copy />,
            onClick: action("Copy"),
          },
          {
            label: "Share",
            icon: <Share />,
            onClick: action("Share"),
          },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "The dropdown menu aligned to the start (left) of the trigger.",
      },
    },
  },
}

export const SideRight: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ActionPopover
        side="right"
        items={[
          {
            label: "Edit",
            icon: <Edit />,
            onClick: action("Edit"),
          },
          {
            label: "Copy",
            icon: <Copy />,
            onClick: action("Copy"),
          },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The dropdown menu opens to the right side of the trigger button.",
      },
    },
  },
}
