import type { Meta, StoryObj } from "@storybook/react"
import { HeaderNavigation } from "./header-navigation"
import { Button } from "@ragnar/core"

const meta: Meta<typeof HeaderNavigation> = {
  title: "Web/HeaderNavigation",
  component: HeaderNavigation,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const defaultItems = [
  { label: "Products", href: "#products" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export const Default: Story = {
  render: () => (
    <HeaderNavigation
      logo={<span className="text-xl font-bold">Ragnar</span>}
      items={defaultItems}
      actions={
        <>
          <Button variant="ghost">Sign In</Button>
          <Button>Get Started</Button>
        </>
      }
    />
  ),
}

export const Sticky: Story = {
  render: () => (
    <div className="h-[200vh]">
      <HeaderNavigation
        sticky
        logo={<span className="text-xl font-bold">Ragnar</span>}
        items={defaultItems}
        actions={<Button>Sign Up</Button>}
      />
      <div className="container mx-auto p-8">
        <p className="text-muted-foreground">Scroll down to see sticky header</p>
      </div>
    </div>
  ),
}

export const WithActiveItem: Story = {
  render: () => (
    <HeaderNavigation
      logo={<span className="text-xl font-bold">Ragnar</span>}
      items={[
        { label: "Home", href: "#", active: true },
        { label: "Products", href: "#products" },
        { label: "Pricing", href: "#pricing" },
        { label: "Blog", href: "#blog" },
      ]}
      actions={<Button>Contact</Button>}
    />
  ),
}

export const Transparent: Story = {
  render: () => (
    <div className="bg-gradient-to-r from-primary to-primary/80 min-h-[300px]">
      <HeaderNavigation
        transparent
        logo={<span className="text-xl font-bold text-primary-foreground">Ragnar</span>}
        items={defaultItems.map(item => ({
          ...item,
          className: "text-primary-foreground/80 hover:text-primary-foreground"
        }))}
        actions={<Button variant="secondary">Get Started</Button>}
      />
    </div>
  ),
}
