import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A set of layered content sections (tab panels) that are displayed one at a time, controlled by a row of tab triggers, built on Radix UI Tabs primitive.

**Sub-components:** \`TabsList\`, \`TabsTrigger\`, \`TabsContent\`

**Import**
\`\`\`tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for tab 1</TabsContent>
  <TabsContent value="tab2">Content for tab 2</TabsContent>
</Tabs>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "A basic two-tab layout with Account and Password panels.",
      },
    },
  },
  render: () => (
    <div style={{ width: 400 }}>
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)" }}>
          Make changes to your account here. Click save when you&apos;re done.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)" }}>
          Change your password here. After saving, you&apos;ll be logged out.
        </p>
      </TabsContent>
    </Tabs>
    </div>
  ),
}

export const MultipleTabs: Story = {
  parameters: {
    docs: {
      description: {
        story: "A tab group with four tabs demonstrating a wider navigation layout.",
      },
    },
  },
  render: () => (
    <div style={{ width: 600 }}>
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div style={{ padding: "var(--spacing-lg)" }}>
        <h3 style={{ fontWeight: 500 }}>Overview</h3>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)", marginTop: "var(--spacing-sm)" }}>
          Your project overview and quick stats.
        </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div style={{ padding: "var(--spacing-lg)" }}>
        <h3 style={{ fontWeight: 500 }}>Analytics</h3>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)", marginTop: "var(--spacing-sm)" }}>
          View your analytics and insights.
        </p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div style={{ padding: "var(--spacing-lg)" }}>
        <h3 style={{ fontWeight: 500 }}>Reports</h3>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)", marginTop: "var(--spacing-sm)" }}>
          Generate and download reports.
        </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div style={{ padding: "var(--spacing-lg)" }}>
        <h3 style={{ fontWeight: 500 }}>Notifications</h3>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)", marginTop: "var(--spacing-sm)" }}>
          Manage your notification preferences.
        </p>
        </div>
      </TabsContent>
    </Tabs>
    </div>
  ),
}

export const DisabledTab: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstrates a tab trigger in the disabled state that cannot be selected.",
      },
    },
  },
  render: () => (
    <div style={{ width: 400 }}>
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="other">Other</TabsTrigger>
      </TabsList>
      <TabsContent value="active">Active tab content</TabsContent>
      <TabsContent value="disabled">Disabled tab content</TabsContent>
      <TabsContent value="other">Other tab content</TabsContent>
    </Tabs>
    </div>
  ),
}
