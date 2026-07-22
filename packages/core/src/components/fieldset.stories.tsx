import type { Meta, StoryObj } from "@storybook/react"
import { Fieldset, FieldsetLegend } from "./fieldset"
import { Input } from "./input"

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
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
          <label style={{ fontSize: "var(--font-size-sm)", fontWeight: 500 }}>Name</label>
          <Input placeholder="Enter your name" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
          <label style={{ fontSize: "var(--font-size-sm)", fontWeight: 500 }}>Email</label>
          <Input type="email" placeholder="Enter your email" />
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
    <div style={{ opacity: 0.5, pointerEvents: "none" }}>
      <Fieldset>
        <FieldsetLegend>Disabled Fieldset</FieldsetLegend>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
          <Input placeholder="This input is disabled" disabled />
          <Input placeholder="This one too" disabled />
        </div>
      </Fieldset>
    </div>
  ),
}
