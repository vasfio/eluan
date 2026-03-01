import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <label htmlFor="r1" className="text-sm font-medium">
          Default
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <label htmlFor="r2" className="text-sm font-medium">
          Comfortable
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <label htmlFor="r3" className="text-sm font-medium">
          Compact
        </label>
      </div>
    </RadioGroup>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="card" className="grid gap-4">
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="card" id="card" className="mt-1" />
        <div className="grid gap-1.5">
          <label htmlFor="card" className="text-sm font-medium">
            Card
          </label>
          <p className="text-sm text-muted-foreground">
            Pay with your credit or debit card.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
        <div className="grid gap-1.5">
          <label htmlFor="paypal" className="text-sm font-medium">
            PayPal
          </label>
          <p className="text-sm text-muted-foreground">
            Pay with your PayPal account.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="apple" id="apple" className="mt-1" />
        <div className="grid gap-1.5">
          <label htmlFor="apple" className="text-sm font-medium">
            Apple Pay
          </label>
          <p className="text-sm text-muted-foreground">
            Pay with Apple Pay on supported devices.
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one" className="flex gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <label htmlFor="option-one" className="text-sm">
          Option One
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <label htmlFor="option-two" className="text-sm">
          Option Two
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <label htmlFor="option-three" className="text-sm">
          Option Three
        </label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="d1" />
        <label htmlFor="d1" className="text-sm">
          Available
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="d2" disabled />
        <label htmlFor="d2" className="text-sm opacity-50">
          Disabled
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="d3" />
        <label htmlFor="d3" className="text-sm">
          Available
        </label>
      </div>
    </RadioGroup>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium">Notify me about...</h4>
        <p className="text-sm text-muted-foreground">
          Select how you&apos;d like to be notified.
        </p>
      </div>
      <RadioGroup defaultValue="all">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="all" />
          <label htmlFor="all" className="text-sm font-medium">
            All new messages
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mentions" id="mentions" />
          <label htmlFor="mentions" className="text-sm font-medium">
            Direct messages and mentions
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="none" />
          <label htmlFor="none" className="text-sm font-medium">
            Nothing
          </label>
        </div>
      </RadioGroup>
    </div>
  ),
};
