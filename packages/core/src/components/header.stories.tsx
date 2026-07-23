import type { Meta, StoryObj } from "@storybook/react"
import { Header } from "./header"
import { Button } from "@eluan/core"

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A responsive header with logo, nav items, action buttons, and a mobile sheet menu that opens at a configurable breakpoint. Nav links render as ghost buttons; the main calls to action are passed via \`actions\`.

**Import**
\`\`\`tsx
import { Header } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Header
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

const logoMark = (
  <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--font-size-lg)", fontWeight: 600 }}>
    Eluan
  </span>
)

const defaultItems = [
  { label: "Products", href: "#products" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export const Default: Story = {
  parameters: { docs: { description: { story: "Standard header with logo, 5 ghost-button nav links, and sign-in/get-started actions." } } },
  render: () => (
    <Header
      logo={logoMark}
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
  parameters: {
    docs: {
      story: { inline: false, height: "360px" },
      description: { story: "Sticky header that stays pinned to the top of its scrolling container. Scroll the panel to see it in action." },
    },
  },
  render: () => (
    <div style={{ height: 360, overflow: "auto", border: "1px solid var(--container-border-alt)", borderRadius: "var(--curves-md)" }}>
      <Header
        sticky
        logo={logoMark}
        items={defaultItems}
        actions={<Button>Sign Up</Button>}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)", padding: "var(--spacing-lg)" }}>
        <p style={{ color: "var(--container-fg-alt)", margin: 0 }}>Scroll down — the header stays pinned to the top.</p>
        {Array.from({ length: 12 }).map((_, i) => (
          <p key={i} style={{ color: "var(--container-fg-alt)", margin: 0 }}>
            Section {i + 1} — the quick brown fox jumps over the lazy dog. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
        ))}
      </div>
    </div>
  ),
}

export const WithActiveItem: Story = {
  parameters: { docs: { description: { story: "Demonstrates the active-state highlight on the Home nav item." } } },
  render: () => (
    <Header
      logo={logoMark}
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
