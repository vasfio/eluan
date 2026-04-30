import type { Meta, StoryObj } from "@storybook/react"
import { EmailForm } from "./email-form"

const meta: Meta<typeof EmailForm> = {
  title: "Web/EmailForm",
  component: EmailForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A self-contained email capture form with inline or stacked layouts, loading state, and success/error messages.

**Import**
\`\`\`tsx
import { EmailForm } from "@vasf/ragnar-web"
\`\`\`

**Usage**
\`\`\`tsx
<EmailForm
  layout="inline"
  size="default"
  buttonText="Subscribe"
  placeholder="Enter your email"
  onSubmit={async (email) => { /* handle */ }}
  successMessage="Thanks!"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    layout: {
      description: "Form layout: inline (side-by-side) or stacked.",
    },
    size: {
      description: "Max width: sm, default, lg, or full.",
    },
    buttonText: {
      description: "Label for the submit button.",
    },
    placeholder: {
      description: "Placeholder text for the email input.",
    },
    loading: {
      description: "Whether to show the loading spinner.",
    },
    disabled: {
      description: "Whether the form is disabled.",
    },
    helperText: {
      description: "Helper text shown below the form when idle.",
    },
    successMessage: {
      description: "Message shown after successful submission.",
    },
    errorMessage: {
      description: "Message shown when submission fails.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: "Default inline email form with success and error messages." } } },
  render: () => (
    <div className="max-w-md mx-auto">
      <EmailForm
        onSubmit={async (email) => {
          console.log("Submitted:", email)
          await new Promise((r) => setTimeout(r, 1000))
        }}
        successMessage="Thanks for subscribing!"
        errorMessage="Something went wrong. Please try again."
      />
    </div>
  ),
}

export const Stacked: Story = {
  parameters: { docs: { description: { story: "Stacked layout with helper text below the input." } } },
  render: () => (
    <div className="max-w-sm mx-auto">
      <EmailForm
        layout="stacked"
        buttonText="Join Waitlist"
        placeholder="you@example.com"
        helperText="We'll never share your email."
        onSubmit={async (email) => {
          console.log("Submitted:", email)
          await new Promise((r) => setTimeout(r, 1000))
        }}
        successMessage="You're on the list!"
      />
    </div>
  ),
}

export const Large: Story = {
  parameters: { docs: { description: { story: "Large size variant with wider max-width." } } },
  render: () => (
    <div className="max-w-lg mx-auto">
      <EmailForm
        size="lg"
        buttonText="Get Early Access"
        placeholder="Enter your email address"
        helperText="Be the first to know when we launch."
        onSubmit={async (email) => {
          console.log("Submitted:", email)
          await new Promise((r) => setTimeout(r, 1000))
        }}
        successMessage="Thanks! We'll be in touch."
      />
    </div>
  ),
}

export const FullWidth: Story = {
  parameters: { docs: { description: { story: "Full-width form spanning the entire container." } } },
  render: () => (
    <EmailForm
      size="full"
      buttonText="Subscribe"
      onSubmit={async (email) => {
        console.log("Submitted:", email)
        await new Promise((r) => setTimeout(r, 1000))
      }}
      successMessage="Subscribed successfully!"
    />
  ),
}
