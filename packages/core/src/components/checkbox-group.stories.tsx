import type { Meta, StoryObj } from "@storybook/react"
import { CheckboxGroup, CheckboxGroupItem } from "./checkbox-group"

const meta: Meta<typeof CheckboxGroup> = {
  title: "Components/Checkbox Group",
  component: CheckboxGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A group of checkboxes with managed state for selecting multiple options from a list.

**Import**
\`\`\`tsx
import { CheckboxGroup, CheckboxGroupItem } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<CheckboxGroup defaultValue={["option1"]} onValueChange={(values) => console.log(values)}>
  <CheckboxGroupItem value="option1" label="Option 1" />
  <CheckboxGroupItem value="option2" label="Option 2" />
  <CheckboxGroupItem value="option3" label="Option 3" />
</CheckboxGroup>
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
    <CheckboxGroup defaultValue={["option1"]}>
      <CheckboxGroupItem value="option1" label="Option 1" />
      <CheckboxGroupItem value="option2" label="Option 2" />
      <CheckboxGroupItem value="option3" label="Option 3" />
    </CheckboxGroup>
  ),
}

export const WithDescriptions: Story = {
  parameters: {
    docs: {
      description: {
        story: "Checkbox group items with secondary description text beneath each label.",
      },
    },
  },
  render: () => (
    <CheckboxGroup defaultValue={["emails"]}>
      <CheckboxGroupItem
        value="emails"
        label="Email notifications"
        description="Receive updates about your account via email."
      />
      <CheckboxGroupItem
        value="sms"
        label="SMS notifications"
        description="Get text messages for important alerts."
      />
      <CheckboxGroupItem
        value="push"
        label="Push notifications"
        description="Receive push notifications on your devices."
      />
    </CheckboxGroup>
  ),
}

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story: "Checkbox group items arranged horizontally.",
      },
    },
  },
  render: () => (
    <CheckboxGroup orientation="horizontal" defaultValue={["small"]}>
      <CheckboxGroupItem value="small" label="Small" />
      <CheckboxGroupItem value="medium" label="Medium" />
      <CheckboxGroupItem value="large" label="Large" />
    </CheckboxGroup>
  ),
}

export const WithDisabledItems: Story = {
  parameters: {
    docs: {
      description: {
        story: "Individual items can be disabled while others remain interactive.",
      },
    },
  },
  render: () => (
    <CheckboxGroup defaultValue={["read"]}>
      <CheckboxGroupItem value="read" label="Read" />
      <CheckboxGroupItem value="write" label="Write" />
      <CheckboxGroupItem value="admin" label="Admin" disabled />
    </CheckboxGroup>
  ),
}

export const AllDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "The entire group can be disabled via a single prop.",
      },
    },
  },
  render: () => (
    <CheckboxGroup disabled defaultValue={["option1", "option3"]}>
      <CheckboxGroupItem value="option1" label="Option 1" />
      <CheckboxGroupItem value="option2" label="Option 2" />
      <CheckboxGroupItem value="option3" label="Option 3" />
    </CheckboxGroup>
  ),
}
