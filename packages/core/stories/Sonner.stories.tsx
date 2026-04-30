import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Sonner } from "@/components/sonner";
import { Button } from "@/components/button";

const meta: Meta = {
  title: "Components/Sonner",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Sonner />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })
      }
    >
      Show Toast
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.success("Success!", {
          description: "Your changes have been saved.",
        })
      }
    >
      Show Success Toast
    </Button>
  ),
};

export const Error: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.error("Error", {
          description: "Something went wrong. Please try again.",
        })
      }
    >
      Show Error Toast
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.warning("Warning", {
          description: "Please review your input before proceeding.",
        })
      }
    >
      Show Warning Toast
    </Button>
  ),
};

export const Info: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.info("Information", {
          description: "A new version is available for download.",
        })
      }
    >
      Show Info Toast
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast with Action
    </Button>
  ),
};

export const PromiseToast: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        const promiseFn = (): Promise<{ name: string }> =>
          new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 2000));

        toast.promise(promiseFn, {
          loading: "Loading...",
          success: () => "Data loaded successfully!",
          error: "Error loading data",
        });
      }}
    >
      Show Promise Toast
    </Button>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Default toast message")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Successfully completed!")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("An error occurred")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning("Warning message")}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("Informational message")}
      >
        Info
      </Button>
    </div>
  ),
};

export const CustomDuration: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast("Quick toast", {
            duration: 1000,
          })
        }
      >
        1 second
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Normal toast", {
            duration: 4000,
          })
        }
      >
        4 seconds
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Long toast", {
            duration: 10000,
          })
        }
      >
        10 seconds
      </Button>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast("This toast can be dismissed", {
          description: "Click the X button or swipe to dismiss",
          cancel: {
            label: "Cancel",
            onClick: () => console.log("Cancelled"),
          },
        })
      }
    >
      Dismissible Toast
    </Button>
  ),
};
