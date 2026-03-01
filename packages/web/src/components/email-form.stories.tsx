import type { Meta, StoryObj } from "@storybook/react"
import { EmailForm } from "./email-form"

const meta: Meta<typeof EmailForm> = {
  title: "Web/EmailForm",
  component: EmailForm,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
