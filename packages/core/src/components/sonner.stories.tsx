import type { Meta, StoryObj } from "@storybook/react"
import { toast } from "sonner"
import { Toaster } from "./sonner"
import { Button } from "./button"

const meta: Meta<typeof Toaster> = {
  title: "Components/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button onClick={() => toast("This is a default toast")}>
        Show Toast
      </Button>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant="outline"
        onClick={() => toast("Event has been created")}
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Successfully saved!", {
            description: "Your changes have been saved.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Something went wrong", {
            description: "There was an error processing your request.",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Warning!", {
            description: "Please review your input.",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Did you know?", {
            description: "You can customize these toasts.",
          })
        }
      >
        Info
      </Button>
    </div>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast("Meeting scheduled", {
          description: "Friday, February 10, 2025 at 5:57 PM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo clicked"),
          },
        })
      }
    >
      Show Toast with Action
    </Button>
  ),
}

export const WithPromise: Story = {
  render: () => (
    <Button
      onClick={() => {
        const promise = new Promise((resolve) => setTimeout(resolve, 2000))
        toast.promise(promise, {
          loading: "Loading...",
          success: "Data loaded successfully!",
          error: "Failed to load data",
        })
      }}
    >
      Show Promise Toast
    </Button>
  ),
}

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
          toast("Standard toast", {
            duration: 4000,
          })
        }
      >
        4 seconds
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Persistent toast", {
            duration: Infinity,
          })
        }
      >
        Infinite
      </Button>
    </div>
  ),
}
