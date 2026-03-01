import type { Meta, StoryObj } from "@storybook/react";
import { Fieldset, FieldsetLegend, FieldsetDescription } from "@/components/fieldset";
import { Checkbox } from "@/components/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";

const meta: Meta<typeof Fieldset> = {
  title: "Components/Fieldset",
  component: Fieldset,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Default: Story = {
  render: () => (
    <Fieldset>
      <FieldsetLegend>Personal Information</FieldsetLegend>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="john@example.com"
          />
        </div>
      </div>
    </Fieldset>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Fieldset>
      <FieldsetLegend>Notification Preferences</FieldsetLegend>
      <FieldsetDescription>
        Choose how you want to receive notifications.
      </FieldsetDescription>
      <div className="space-y-3 mt-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="email-notif" />
          <label htmlFor="email-notif" className="text-sm">
            Email notifications
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="sms-notif" />
          <label htmlFor="sms-notif" className="text-sm">
            SMS notifications
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="push-notif" />
          <label htmlFor="push-notif" className="text-sm">
            Push notifications
          </label>
        </div>
      </div>
    </Fieldset>
  ),
};

export const WithRadioGroup: Story = {
  render: () => (
    <Fieldset>
      <FieldsetLegend>Shipping Method</FieldsetLegend>
      <FieldsetDescription>
        Select your preferred shipping option.
      </FieldsetDescription>
      <RadioGroup defaultValue="standard" className="mt-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="standard" id="standard" />
          <label htmlFor="standard" className="text-sm">
            Standard (5-7 business days) - Free
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="express" id="express" />
          <label htmlFor="express" className="text-sm">
            Express (2-3 business days) - $9.99
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="overnight" id="overnight" />
          <label htmlFor="overnight" className="text-sm">
            Overnight (Next day) - $19.99
          </label>
        </div>
      </RadioGroup>
    </Fieldset>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Fieldset disabled className="opacity-60">
      <FieldsetLegend>Disabled Fieldset</FieldsetLegend>
      <FieldsetDescription>
        This fieldset is disabled and cannot be interacted with.
      </FieldsetDescription>
      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="John Doe"
            disabled
          />
        </div>
      </div>
    </Fieldset>
  ),
};

export const MultipleFieldsets: Story = {
  render: () => (
    <div className="space-y-6">
      <Fieldset>
        <FieldsetLegend>Account Information</FieldsetLegend>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
      </Fieldset>
      <Fieldset>
        <FieldsetLegend>Profile Information</FieldsetLegend>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </Fieldset>
    </div>
  ),
};
