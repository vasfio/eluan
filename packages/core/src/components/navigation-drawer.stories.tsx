import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  NavigationDrawer,
  NavigationDrawerLayout,
  NavigationDrawerHeader,
  NavigationDrawerContent,
  NavigationDrawerFooter,
  NavigationDrawerItem,
  NavigationDrawerGroup,
} from "./navigation-drawer"
import { Home, Settings, Users, FileText, HelpCircle, LogOut } from "lucide-react"

const meta: Meta<typeof NavigationDrawer> = {
  title: "Components/Navigation Drawer",
  component: NavigationDrawer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A collapsible sidebar navigation drawer with support for grouped items, active states, icons, and a mobile-responsive sheet variant.

Use \`NavigationDrawerLayout\` to render the sidebar next to your page content. It manages the provider and places the collapse/expand toggle in a bar above the content — outside the sidebar — so it stays visible in both states. The sidebar fills the height of the layout's parent, so give that parent a bounded height.

**Import**
\`\`\`tsx
import {
  NavigationDrawerLayout,
  NavigationDrawerHeader,
  NavigationDrawerContent,
  NavigationDrawerFooter,
  NavigationDrawerItem,
  NavigationDrawerGroup,
} from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<div style={{ height: 480 }}>
  <NavigationDrawerLayout
    sidebar={
      <>
        <NavigationDrawerHeader>My App</NavigationDrawerHeader>
        <NavigationDrawerContent>
          <NavigationDrawerGroup>
            <NavigationDrawerItem icon={<Home />} active>Dashboard</NavigationDrawerItem>
          </NavigationDrawerGroup>
        </NavigationDrawerContent>
      </>
    }
  >
    <main>Page content</main>
  </NavigationDrawerLayout>
</div>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Bounded wrapper so the layout has a height to fill; the border makes the
// sidebar's full-height fill visible.
const wrapperStyle: React.CSSProperties = {
  height: "480px",
  border: "1px solid var(--container-border)",
  borderRadius: "var(--curves-md)",
  overflow: "hidden",
}

const brandStyle: React.CSSProperties = {
  fontWeight: 600,
  color: "var(--container-fg)",
}

const PageContent = ({ title }: { title: string }) => (
  <div style={{ padding: "var(--spacing-lg)" }}>
    <h1
      style={{
        margin: 0,
        fontSize: "var(--font-size-base)",
        fontWeight: 600,
        color: "var(--container-fg)",
      }}
    >
      {title}
    </h1>
    <p style={{ color: "var(--container-fg-alt)" }}>
      Toggle the sidebar with the control above. It collapses to icons and
      expands back to full labels.
    </p>
  </div>
)

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A full navigation drawer with header, navigation items, and footer actions. The collapse toggle sits in the bar above the content, outside the sidebar.",
      },
    },
  },
  render: () => (
    <div style={wrapperStyle}>
      <NavigationDrawerLayout
        sidebar={
          <>
            <NavigationDrawerHeader>
              <span style={brandStyle}>My App</span>
            </NavigationDrawerHeader>
            <NavigationDrawerContent>
              <NavigationDrawerGroup>
                <NavigationDrawerItem icon={<Home />} active>
                  Dashboard
                </NavigationDrawerItem>
                <NavigationDrawerItem icon={<Users />}>Users</NavigationDrawerItem>
                <NavigationDrawerItem icon={<FileText />}>
                  Documents
                </NavigationDrawerItem>
                <NavigationDrawerItem icon={<Settings />}>
                  Settings
                </NavigationDrawerItem>
              </NavigationDrawerGroup>
            </NavigationDrawerContent>
            <NavigationDrawerFooter>
              <NavigationDrawerItem icon={<HelpCircle />}>Help</NavigationDrawerItem>
              <NavigationDrawerItem icon={<LogOut />}>Logout</NavigationDrawerItem>
            </NavigationDrawerFooter>
          </>
        }
      >
        <PageContent title="Dashboard" />
      </NavigationDrawerLayout>
    </div>
  ),
}

export const WithGroups: Story = {
  parameters: {
    docs: {
      description: {
        story: "Navigation items organized into labeled groups (Main, Management).",
      },
    },
  },
  render: () => (
    <div style={wrapperStyle}>
      <NavigationDrawerLayout
        sidebar={
          <>
            <NavigationDrawerHeader>
              <span style={brandStyle}>Dashboard</span>
            </NavigationDrawerHeader>
            <NavigationDrawerContent>
              <NavigationDrawerGroup label="Main">
                <NavigationDrawerItem icon={<Home />} active>
                  Home
                </NavigationDrawerItem>
                <NavigationDrawerItem icon={<Users />}>Team</NavigationDrawerItem>
              </NavigationDrawerGroup>
              <NavigationDrawerGroup label="Management">
                <NavigationDrawerItem icon={<FileText />}>
                  Projects
                </NavigationDrawerItem>
                <NavigationDrawerItem icon={<Settings />}>
                  Settings
                </NavigationDrawerItem>
              </NavigationDrawerGroup>
            </NavigationDrawerContent>
          </>
        }
      >
        <PageContent title="Team" />
      </NavigationDrawerLayout>
    </div>
  ),
}

export const Collapsed: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Navigation drawer starting in its collapsed, icon-only state. Each icon button has equal space on both sides. Use the toggle above the content to expand it.",
      },
    },
  },
  render: () => (
    <div style={wrapperStyle}>
      <NavigationDrawerLayout
        defaultCollapsed
        sidebar={
          <>
            <NavigationDrawerHeader>
              <span style={brandStyle}>A</span>
            </NavigationDrawerHeader>
            <NavigationDrawerContent>
              <NavigationDrawerGroup>
                <NavigationDrawerItem icon={<Home />} active>
                  Dashboard
                </NavigationDrawerItem>
                <NavigationDrawerItem icon={<Users />}>Users</NavigationDrawerItem>
                <NavigationDrawerItem icon={<FileText />}>
                  Documents
                </NavigationDrawerItem>
                <NavigationDrawerItem icon={<Settings />}>
                  Settings
                </NavigationDrawerItem>
              </NavigationDrawerGroup>
            </NavigationDrawerContent>
          </>
        }
      >
        <PageContent title="Dashboard" />
      </NavigationDrawerLayout>
    </div>
  ),
}
