import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem } from "./radio-group"

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <label htmlFor="option-one" className="text-sm font-medium">Option One</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <label htmlFor="option-two" className="text-sm font-medium">Option Two</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <label htmlFor="option-three" className="text-sm font-medium">Option Three</label>
      </div>
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="small" className="flex gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="small" id="small" />
        <label htmlFor="small" className="text-sm font-medium">Small</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="medium" id="medium" />
        <label htmlFor="medium" className="text-sm font-medium">Medium</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="large" id="large" />
        <label htmlFor="large" className="text-sm font-medium">Large</label>
      </div>
    </RadioGroup>
  ),
}

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="default" id="r1" className="mt-1" />
        <div>
          <label htmlFor="r1" className="text-sm font-medium">Default</label>
          <p className="text-sm text-muted-foreground">The default system setting.</p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="comfortable" id="r2" className="mt-1" />
        <div>
          <label htmlFor="r2" className="text-sm font-medium">Comfortable</label>
          <p className="text-sm text-muted-foreground">More spacing for readability.</p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="compact" id="r3" className="mt-1" />
        <div>
          <label htmlFor="r3" className="text-sm font-medium">Compact</label>
          <p className="text-sm text-muted-foreground">Reduced spacing for density.</p>
        </div>
      </div>
    </RadioGroup>
  ),
}
