import type { Meta, StoryObj } from "@storybook/react"
import { Banner } from "./banner"

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Banner>
      This is a default banner message.
    </Banner>
  ),
}

export const Info: Story = {
  render: () => (
    <Banner variant="info">
      This is an informational banner.
    </Banner>
  ),
}

export const Success: Story = {
  render: () => (
    <Banner variant="success">
      Operation completed successfully!
    </Banner>
  ),
}

export const Warning: Story = {
  render: () => (
    <Banner variant="warning">
      Please be aware of this warning.
    </Banner>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Banner variant="destructive">
      An error occurred. Please try again.
    </Banner>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-2">
      <Banner>Default banner</Banner>
      <Banner variant="info">Info banner</Banner>
      <Banner variant="success">Success banner</Banner>
      <Banner variant="warning">Warning banner</Banner>
      <Banner variant="destructive">Destructive banner</Banner>
    </div>
  ),
}
