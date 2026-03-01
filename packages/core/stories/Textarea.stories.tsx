import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@/components/textarea";
import { Button } from "@/components/button";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here.",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <label htmlFor="message" className="text-sm font-medium">
        Your message
      </label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <label htmlFor="message-2" className="text-sm font-medium">
        Your Message
      </label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p className="text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled.",
    disabled: true,
  },
};

export const WithButton: Story = {
  render: () => (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <div>
        <label className="text-sm mb-1 block">Small</label>
        <Textarea placeholder="Small textarea" className="min-h-[60px]" />
      </div>
      <div>
        <label className="text-sm mb-1 block">Default</label>
        <Textarea placeholder="Default textarea" />
      </div>
      <div>
        <label className="text-sm mb-1 block">Large</label>
        <Textarea placeholder="Large textarea" className="min-h-[150px]" />
      </div>
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: function Render() {
    const maxLength = 280;
    return (
      <div className="grid w-full gap-1.5">
        <label htmlFor="bio" className="text-sm font-medium">
          Bio
        </label>
        <Textarea
          placeholder="Tell us a little bit about yourself"
          id="bio"
          maxLength={maxLength}
        />
        <p className="text-sm text-muted-foreground text-right">0/{maxLength}</p>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium">Send us a message</h4>
        <p className="text-sm text-muted-foreground">
          Fill out the form below and we&apos;ll get back to you.
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">First name</label>
            <input
              placeholder="John"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last name</label>
            <input
              placeholder="Doe"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <Textarea placeholder="Your message..." className="min-h-[100px]" />
        </div>
        <Button className="w-full">Send Message</Button>
      </div>
    </div>
  ),
};
