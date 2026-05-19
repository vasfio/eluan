import type { Meta, StoryObj } from "@storybook/react"
import { toast } from "sonner"
import { Toast } from "./toast"
import { Button } from "./button"

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toast />
      </>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
A toast notification system built on the \`sonner\` library, providing styled success, error, warning, info, and default toasts with theme-aware styling.

**Import**
\`\`\`tsx
import { Toast } from "@vasf/ragnar-core"
import { toast } from "sonner"
\`\`\`

**Usage**
\`\`\`tsx
// Mount the Toast once at the app root
<Toast />

// Trigger toasts from anywhere
toast("Default notification")
toast.success("Saved!")
toast.error("Something went wrong")
toast.warning("Warning")
toast.info("FYI")
\`\`\`
        `,
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "A basic toast notification triggered by a button click.",
      },
    },
  },
}

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstrates all toast variants: default, success, error, warning, and info.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "A toast with a description and an action button (Undo) for user interaction.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "A promise-based toast that shows loading, success, and error states automatically.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Toasts with varying display durations: 1 second, 4 seconds, and infinite (manual dismiss).",
      },
    },
  },
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
