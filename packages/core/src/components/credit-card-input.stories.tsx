import type { Meta, StoryObj } from "@storybook/react"
import {
  CreditCardInput,
  CreditCardNumberInput,
  CreditCardExpiryInput,
  CreditCardCVVInput,
} from "./credit-card-input"

const meta: Meta<typeof CreditCardInput> = {
  title: "Core/CreditCardInput",
  component: CreditCardInput,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[350px]">
      <CreditCardInput onCardChange={(data) => console.log("Card data:", data)} />
    </div>
  ),
}

export const IndividualInputs: Story = {
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
  render: () => (
    <div className="w-[200px] space-y-2">
      <p className="text-sm text-muted-foreground">American Express (4 digit CVV)</p>
      <CreditCardCVVInput cardType="amex" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[350px]">
      <CreditCardInput disabled />
    </div>
  ),
}
