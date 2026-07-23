import type { Meta, StoryObj } from "@storybook/react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./input-otp"
import { Label } from "./form-label"

const meta: Meta<typeof InputOTP> = {
  title: "Components/Input OTP",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A one-time password input with individual digit slots, keyboard navigation, paste support, and an optional separator for grouping digits.

**Import**
\`\`\`tsx
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<InputOTP maxLength={6} onComplete={(value) => console.log(value)}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
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
        story: "A 6-digit OTP input with all slots in a single group.",
      },
    },
  },
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const WithSeparator: Story = {
  parameters: {
    docs: {
      description: {
        story: "OTP input split into two groups of 3 digits with a separator in between.",
      },
    },
  },
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const FourDigits: Story = {
  parameters: {
    docs: {
      description: {
        story: "A 4-digit OTP input for shorter verification codes.",
      },
    },
  },
  render: () => (
    <InputOTP maxLength={4}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: "OTP input with a label and helper text for verification code entry.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        <Label>Enter verification code</Label>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <p
        style={{
          color: "var(--container-fg-alt)",
          fontSize: "var(--font-size-xs)",
          margin: 0,
        }}
      >
        Enter the 6-digit code sent to your email.
      </p>
    </div>
  ),
}
