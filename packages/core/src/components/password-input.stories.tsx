import type { Meta, StoryObj } from "@storybook/react"
import { PasswordInput } from "./password-input"

const meta: Meta<typeof PasswordInput> = {
  title: "Components/Password Input",
  component: PasswordInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A password input with a visibility toggle and an optional strength indicator that checks configurable requirements (length, uppercase, lowercase, numbers, special characters).

**Import**
\`\`\`tsx
import { PasswordInput } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<PasswordInput
  placeholder="Enter password"
  showStrengthIndicator
  strengthRequirements={{ minLength: 8, requireUppercase: true }}
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
        story: "Basic password input with a visibility toggle button.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 288 }}>
      <PasswordInput placeholder="Enter password" />
    </div>
  ),
}

export const WithStrengthIndicator: Story = {
  parameters: {
    docs: {
      description: {
        story: "Password input with a strength progress bar and requirement checklist using default settings.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 288 }}>
      <PasswordInput
        placeholder="Create a strong password"
        showStrengthIndicator
        onStrengthChange={(strength) => console.log("Strength:", strength)}
      />
    </div>
  ),
}

export const CustomRequirements: Story = {
  parameters: {
    docs: {
      description: {
        story: "Strength indicator with custom requirements including a 12-character minimum length.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 288 }}>
      <PasswordInput
        placeholder="Enter password"
        showStrengthIndicator
        strengthRequirements={{
          minLength: 12,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
        }}
      />
    </div>
  ),
}

export const MinimalRequirements: Story = {
  parameters: {
    docs: {
      description: {
        story: "Strength indicator with only a 6-character minimum and no other requirements.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 288 }}>
      <PasswordInput
        placeholder="Simple password"
        showStrengthIndicator
        strengthRequirements={{
          minLength: 6,
          requireUppercase: false,
          requireLowercase: false,
          requireNumbers: false,
          requireSpecialChars: false,
        }}
      />
    </div>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Password input in a disabled state.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 288 }}>
      <PasswordInput placeholder="Disabled" disabled />
    </div>
  ),
}
