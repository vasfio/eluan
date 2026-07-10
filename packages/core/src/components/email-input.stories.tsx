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
    <div className="w-[300px]">
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
    <div className="w-[300px] space-y-2">
      <EmailInput
        placeholder="Enter your email"
        showValidation
        onValidationChange={(isValid) => console.log("Valid:", isValid)}
      />
      <p className="text-sm text-muted-foreground">
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
    <div className="w-[300px]">
      <EmailInput placeholder="Disabled" disabled />
    </div>
  ),
}
