import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/button";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg", "xl"],
      description: "The size of the spinner",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Spinner size="sm" />
        <p className="text-xs mt-2">Small</p>
      </div>
      <div className="text-center">
        <Spinner size="default" />
        <p className="text-xs mt-2">Default</p>
      </div>
      <div className="text-center">
        <Spinner size="lg" />
        <p className="text-xs mt-2">Large</p>
      </div>
      <div className="text-center">
        <Spinner size="xl" />
        <p className="text-xs mt-2">XL</p>
      </div>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner size="sm" />
      <span className="text-sm">Loading...</span>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>
        <Spinner size="sm" className="mr-2" />
        Loading
      </Button>
      <Button variant="secondary" disabled>
        <Spinner size="sm" className="mr-2" />
        Please wait
      </Button>
    </div>
  ),
};

export const Centered: Story = {
  render: () => (
    <div className="flex items-center justify-center h-[200px] border rounded-lg">
      <div className="text-center">
        <Spinner size="lg" className="mx-auto" />
        <p className="text-sm text-muted-foreground mt-4">Loading content...</p>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="text-primary" />
      <Spinner className="text-secondary" />
      <Spinner className="text-destructive" />
      <Spinner className="text-green-500" />
      <Spinner className="text-blue-500" />
    </div>
  ),
};
