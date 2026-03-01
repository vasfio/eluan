import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "@/components/banner";
import { Button } from "@/components/button";

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "warning", "success", "info"],
    },
    position: {
      control: "select",
      options: ["top", "bottom", "inline"],
    },
    dismissible: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  render: () => (
    <Banner>
      This is a default banner message.
    </Banner>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Banner variant="default">Default banner</Banner>
      <Banner variant="secondary">Secondary banner</Banner>
      <Banner variant="destructive">Destructive banner</Banner>
      <Banner variant="warning">Warning banner</Banner>
      <Banner variant="success">Success banner</Banner>
      <Banner variant="info">Info banner</Banner>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Banner
      variant="info"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      }
    >
      New features are now available! Check out what&apos;s new.
    </Banner>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Banner
      variant="warning"
      action={
        <Button size="sm" variant="secondary">
          Update now
        </Button>
      }
    >
      A new version is available. Please update to get the latest features.
    </Banner>
  ),
};

export const Dismissible: Story = {
  render: function Render() {
    const [visible, setVisible] = React.useState(true);

    if (!visible) {
      return (
        <Button onClick={() => setVisible(true)}>Show Banner</Button>
      );
    }

    return (
      <Banner
        variant="success"
        dismissible
        onDismiss={() => setVisible(false)}
      >
        Your changes have been saved successfully!
      </Banner>
    );
  },
};

export const FullExample: Story = {
  render: function Render() {
    const [visible, setVisible] = React.useState(true);

    if (!visible) {
      return (
        <Button onClick={() => setVisible(true)}>Show Banner</Button>
      );
    }

    return (
      <Banner
        variant="info"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        }
        action={
          <Button size="sm" variant="secondary">
            Learn more
          </Button>
        }
        dismissible
        onDismiss={() => setVisible(false)}
      >
        We&apos;ve updated our privacy policy. Please review the changes.
      </Banner>
    );
  },
};
