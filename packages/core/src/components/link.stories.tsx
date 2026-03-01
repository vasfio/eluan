import type { Meta, StoryObj } from "@storybook/react"
import { Link } from "./link"

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Link href="#">Click me</Link>,
}

export const External: Story = {
  render: () => (
    <Link href="https://example.com" external>
      External link
    </Link>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Link href="#" variant="default">Default</Link>
      <Link href="#" variant="muted">Muted</Link>
      <Link href="#" variant="destructive">Destructive</Link>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Link href="#" size="sm">Small</Link>
      <Link href="#" size="default">Default</Link>
      <Link href="#" size="lg">Large</Link>
    </div>
  ),
}

export const InParagraph: Story = {
  render: () => (
    <p className="text-sm">
      This is a paragraph with a <Link href="#">link inside</Link> it. The link should blend naturally with the text.
    </p>
  ),
}
