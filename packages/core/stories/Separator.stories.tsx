import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@/components/separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="rounded-lg border p-4 w-[300px]">
      <div className="font-medium">Account Settings</div>
      <Separator className="my-4" />
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm">Email</span>
          <span className="text-sm text-muted-foreground">john@example.com</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-sm">Plan</span>
          <span className="text-sm text-muted-foreground">Pro</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-sm">Status</span>
          <span className="text-sm text-muted-foreground">Active</span>
        </div>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </div>
  ),
};

export const Navigation: Story = {
  render: () => (
    <div className="flex items-center space-x-2 text-sm">
      <a href="#" className="text-primary hover:underline">
        Home
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="text-primary hover:underline">
        Products
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="text-primary hover:underline">
        About
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="text-primary hover:underline">
        Contact
      </a>
    </div>
  ),
};
