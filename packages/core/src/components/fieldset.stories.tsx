import type { Meta, StoryObj } from "@storybook/react"
import { Fieldset, FieldsetLegend } from "./fieldset"
import { Input } from "./input"
import { Checkbox } from "./checkbox"

const meta: Meta<typeof Fieldset> = {
  title: "Components/Fieldset",
  component: Fieldset,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A styled container for grouping related form controls with an optional legend and description, rendered as a div to avoid native fieldset border quirks.

**Import**
\`\`\`tsx
import { Fieldset, FieldsetLegend, FieldsetDescription } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Fieldset>
  <FieldsetLegend>Personal Information</FieldsetLegend>
  <FieldsetDescription>Fill in the details below.</FieldsetDescription>
  <Input placeholder="Name" />
</Fieldset>
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
        story: "Fieldset grouping text inputs for personal information with a legend label.",
      },
    },
  },
  render: () => (
    <Fieldset>
      <FieldsetLegend>Personal Information</FieldsetLegend>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input placeholder="Enter your name" />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input type="email" placeholder="Enter your email" />
        </div>
      </div>
    </Fieldset>
  ),
}

export const WithCheckboxes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Fieldset containing a group of checkbox controls for notification preferences.",
      },
    },
  },
  render: () => (
    <Fieldset>
      <FieldsetLegend>Notification Preferences</FieldsetLegend>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="email-notif" />
          <label htmlFor="email-notif" className="text-sm">Email notifications</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="sms-notif" />
          <label htmlFor="sms-notif" className="text-sm">SMS notifications</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="push-notif" />
          <label htmlFor="push-notif" className="text-sm">Push notifications</label>
        </div>
      </div>
    </Fieldset>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Fieldset with reduced opacity and disabled pointer events to represent a non-interactive state.",
      },
    },
  },
  render: () => (
    <Fieldset className="opacity-50 pointer-events-none">
      <FieldsetLegend>Disabled Fieldset</FieldsetLegend>
      <div className="space-y-4">
        <Input placeholder="This input is disabled" />
        <Input placeholder="This one too" />
      </div>
    </Fieldset>
  ),
}
