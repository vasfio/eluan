import type { Meta, StoryObj } from "@storybook/react"
import { EmailInput } from "./email-input"

const meta: Meta<typeof EmailInput> = {
  title: "Components/Email Input",
  component: EmailInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
An email input with a mail icon and optional inline validation that shows a success or error icon after the field is blurred.

**Import**
\`\`\`tsx
import { EmailInput } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<EmailInput
  placeholder="Enter your email"
  showValidation
  onValidationChange={(isValid) => console.log(isValid)}
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
  parameters: {
    docs: {
      description: {
        story: "Basic email input with a mail icon and no validation feedback.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 288 }}>
      <EmailInput placeholder="Enter your email" />
    </div>
  ),
}

export const WithValidation: Story = {
  parameters: {
    docs: {
      description: {
        story: "Email input with inline validation that shows a check or error icon after blur.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 288, display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <EmailInput
        placeholder="Enter your email"
        showValidation
        onValidationChange={(isValid) => console.log("Valid:", isValid)}
      />
      <p style={{ margin: 0, fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)" }}>
        Type an email and click outside to see validation
      </p>
    </div>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Email input in a disabled state.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 288 }}>
      <EmailInput placeholder="Disabled" disabled />
    </div>
  ),
}
