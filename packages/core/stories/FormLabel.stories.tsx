import type { Meta, StoryObj } from "@storybook/react";
import { FormLabel, FormDescription, FormMessage } from "@/components/form-label";

const meta: Meta<typeof FormLabel> = {
  title: "Components/FormLabel",
  component: FormLabel,
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: "boolean",
    },
    optional: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormLabel>;

export const Default: Story = {
  render: () => (
    <div className="space-y-2">
      <FormLabel htmlFor="name">Name</FormLabel>
      <input
        id="name"
        type="text"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        placeholder="Enter your name"
      />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="space-y-2">
      <FormLabel htmlFor="email" required>
        Email
      </FormLabel>
      <input
        id="email"
        type="email"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        placeholder="Enter your email"
      />
    </div>
  ),
};

export const Optional: Story = {
  render: () => (
    <div className="space-y-2">
      <FormLabel htmlFor="phone" optional>
        Phone Number
      </FormLabel>
      <input
        id="phone"
        type="tel"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        placeholder="Enter your phone number"
      />
    </div>
  ),
};

export const WithHint: Story = {
  render: () => (
    <div className="space-y-2">
      <FormLabel htmlFor="password" hint="Min 8 characters">
        Password
      </FormLabel>
      <input
        id="password"
        type="password"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        placeholder="Enter your password"
      />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-2">
      <FormLabel htmlFor="username">Username</FormLabel>
      <input
        id="username"
        type="text"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        placeholder="Enter your username"
      />
      <FormDescription>
        Your username will be visible to other users.
      </FormDescription>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="space-y-2">
      <FormLabel htmlFor="email-error" required>
        Email
      </FormLabel>
      <input
        id="email-error"
        type="email"
        className="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
        placeholder="Enter your email"
        aria-invalid="true"
      />
      <FormMessage>Please enter a valid email address.</FormMessage>
    </div>
  ),
};

export const FullExample: Story = {
  render: () => (
    <div className="w-[350px] space-y-6">
      <div className="space-y-2">
        <FormLabel htmlFor="full-name" required>
          Full Name
        </FormLabel>
        <input
          id="full-name"
          type="text"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <FormDescription>
          Enter your first and last name.
        </FormDescription>
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="full-email" required>
          Email Address
        </FormLabel>
        <input
          id="full-email"
          type="email"
          className="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
        />
        <FormMessage>This email is already registered.</FormMessage>
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="full-bio" optional>
          Bio
        </FormLabel>
        <textarea
          id="full-bio"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <FormDescription>
          Write a short bio about yourself. Max 200 characters.
        </FormDescription>
      </div>
    </div>
  ),
};
