import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@/components/checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked />
      <label htmlFor="checked" className="text-sm font-medium leading-none">
        Checked by default
      </label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <label
          htmlFor="disabled"
          className="text-sm font-medium leading-none opacity-50"
        >
          Disabled unchecked
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <label
          htmlFor="disabled-checked"
          className="text-sm font-medium leading-none opacity-50"
        >
          Disabled checked
        </label>
      </div>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">Select your interests:</p>
        {[
          { id: "tech", label: "Technology" },
          { id: "design", label: "Design" },
          { id: "marketing", label: "Marketing" },
          { id: "business", label: "Business" },
        ].map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox id={item.id} />
            <label htmlFor={item.id} className="text-sm font-medium leading-none">
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-[350px]">
      <div className="space-y-2">
        <p className="text-lg font-semibold">Email Preferences</p>
        <p className="text-sm text-muted-foreground">
          Manage your email notification settings.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox id="marketing" defaultChecked />
          <div className="grid gap-1.5 leading-none">
            <label htmlFor="marketing" className="text-sm font-medium leading-none">
              Marketing emails
            </label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new products, features, and more.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox id="security" defaultChecked />
          <div className="grid gap-1.5 leading-none">
            <label htmlFor="security" className="text-sm font-medium leading-none">
              Security emails
            </label>
            <p className="text-sm text-muted-foreground">
              Receive emails about your account security.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox id="updates" />
          <div className="grid gap-1.5 leading-none">
            <label htmlFor="updates" className="text-sm font-medium leading-none">
              Product updates
            </label>
            <p className="text-sm text-muted-foreground">
              Receive emails about product updates and changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex items-center space-x-2">
        <Checkbox id="unchecked" />
        <label htmlFor="unchecked" className="text-sm">Unchecked</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="checked-state" defaultChecked />
        <label htmlFor="checked-state" className="text-sm">Checked</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-state" disabled />
        <label htmlFor="disabled-state" className="text-sm opacity-50">Disabled</label>
      </div>
    </div>
  ),
};
