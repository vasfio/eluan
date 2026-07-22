import type { Meta, StoryObj } from "@storybook/react"
import { CreditCardInput } from "./credit-card-input"

const meta: Meta<typeof CreditCardInput> = {
  title: "Components/Credit Card Input",
  component: CreditCardInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A credit card payment form with automatic card type detection (Visa, Mastercard, Amex, Discover, JCB, Diners, UnionPay), formatted number input, expiry date input, and CVV input with card-type-aware length validation.

**Import**
\`\`\`tsx
import {
  CreditCardInput,
  CreditCardNumberInput,
  CreditCardExpiryInput,
  CreditCardCVVInput,
} from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<CreditCardInput onCardChange={(data) => console.log(data)} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    onCardChange: {
      description: "Callback fired on every change, receiving an object with number, expiry, cvv, cardType, and isValid fields.",
    },
    disabled: {
      description: "When `true`, all sub-inputs are disabled. Defaults to `false`.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Complete credit card input form with card number, expiry, and CVV fields composed together.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <CreditCardInput onCardChange={(data) => console.log("Card data:", data)} />
    </div>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Credit card input in a disabled state where all fields are non-interactive.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <CreditCardInput disabled />
    </div>
  ),
}
