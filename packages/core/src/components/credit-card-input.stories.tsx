import type { Meta, StoryObj } from "@storybook/react"
import {
  CreditCardInput,
  CreditCardNumberInput,
  CreditCardExpiryInput,
  CreditCardCVVInput,
} from "./credit-card-input"

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
} from "@vasf/ragnar-core"
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
    <div className="w-[350px]">
      <CreditCardInput onCardChange={(data) => console.log("Card data:", data)} />
    </div>
  ),
}

export const IndividualInputs: Story = {
  parameters: {
    docs: {
      description: {
        story: "Individual sub-components (CreditCardNumberInput, CreditCardExpiryInput, CreditCardCVVInput) used separately for custom layouts.",
      },
    },
  },
  render: () => (
    <div className="w-[350px] space-y-3">
      <CreditCardNumberInput
        onChange={(value, type) => console.log("Number:", value, "Type:", type)}
      />
      <div className="grid grid-cols-2 gap-3">
        <CreditCardExpiryInput onChange={(value) => console.log("Expiry:", value)} />
        <CreditCardCVVInput onChange={(value) => console.log("CVV:", value)} />
      </div>
    </div>
  ),
}

export const AmexCVV: Story = {
  parameters: {
    docs: {
      description: {
        story: "CVV input configured for American Express cards, which require a 4-digit security code instead of 3.",
      },
    },
  },
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">American Express (4 digit CVV)</p>
      <CreditCardCVVInput cardType="amex" />
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
    <div className="w-[350px]">
      <CreditCardInput disabled />
    </div>
  ),
}
