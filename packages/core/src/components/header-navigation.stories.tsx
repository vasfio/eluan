import type { Meta, StoryObj } from "@storybook/react"
import { HeaderNavigation } from "./header-navigation"
import { Button } from "@vasf/ragnar-core"

const meta: Meta<typeof HeaderNavigation> = {
  title: "Web/HeaderNavigation",
  component: HeaderNavigation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A responsive header navigation with logo, nav items, action buttons, and a mobile sheet menu that opens at a configurable breakpoint.

**Import**
\`\`\`tsx
import { HeaderNavigation } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<HeaderNavigation
  logo={<span>Logo</span>}
  items={[{ label: "Home", href: "/" }]}
  actions={<Button>Sign Up</Button>}
  sticky
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    logo: {
      description: "React node for the logo area.",
    },
    items: {
      description: "Array of NavItem objects with label, href, onClick, active, and children.",
    },
    actions: {
      description: "React node for action buttons (e.g. Sign In, Get Started).",
    },
    sticky: {
      description: "Whether the header sticks to the top on scroll.",
    },
    transparent: {
      description: "Whether the header has a transparent background.",
    },
    mobileBreakpoint: {
      description: "Breakpoint at which to show the mobile menu: sm, md, or lg.",
    },
  },
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
  parameters: { docs: { description: { story: "Standard header with logo, 5 nav items, and sign-in/get-started actions." } } },
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
  parameters: { docs: { description: { story: "Sticky header that remains fixed at the top when scrolling." } } },
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
  parameters: { docs: { description: { story: "Demonstrates the active state highlight on the Home nav item." } } },
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
  parameters: { docs: { description: { story: "Transparent header over a gradient background." } } },
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
