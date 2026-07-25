import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@eluan/core"
import { Header, type NavItem } from "../index"

const meta: Meta<typeof Header> = {
  title: "Web/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
\`Header\` is re-exported from \`@eluan/core\` through the \`@eluan/web\` compatibility
facade. It renders a responsive top bar with a logo slot, ghost-button nav links,
an actions slot, and a mobile sheet menu that opens below \`mobileBreakpoint\`.

**Import**
\`\`\`tsx
import { Header } from "@eluan/web"
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    sticky: { description: "Pin the header to the top of its scroll container." },
    transparent: { description: "Render with a transparent background." },
    mobileBreakpoint: {
      description: "Breakpoint below which the mobile sheet menu is shown.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const logoMark = (
  <span
    style={{
      fontFamily: "var(--font-heading)",
      fontSize: "var(--font-size-lg)",
      fontWeight: 600,
    }}
  >
    Eluan
  </span>
)

const navItems: NavItem[] = [
  { label: "Products", href: "#products" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
]

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Logo, nav links, and sign-in / get-started actions.",
      },
    },
  },
  render: () => (
    <Header
      logo={logoMark}
      items={navItems}
      actions={
        <>
          <Button variant="ghost">Sign In</Button>
          <Button>Get Started</Button>
        </>
      }
    />
  ),
}

export const WithActiveItem: Story = {
  parameters: {
    docs: {
      description: {
        story: "The active nav item is highlighted with the secondary variant.",
      },
    },
  },
  render: () => (
    <Header
      logo={logoMark}
      items={[
        { label: "Home", href: "#", active: true },
        { label: "Products", href: "#products" },
        { label: "Pricing", href: "#pricing" },
      ]}
      actions={<Button>Contact</Button>}
    />
  ),
}

export const Transparent: Story = {
  parameters: {
    docs: {
      description: {
        story: "Transparent background for use over a hero section.",
      },
    },
  },
  render: () => (
    <div style={{ background: "var(--container-bg-alt)", padding: "var(--spacing-2xl)" }}>
      <Header
        transparent
        logo={logoMark}
        items={navItems}
        actions={<Button>Get Started</Button>}
      />
    </div>
  ),
}
