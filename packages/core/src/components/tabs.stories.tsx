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
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">
          Make changes to your account here. Click save when you&apos;re done.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">
          Change your password here. After saving, you&apos;ll be logged out.
        </p>
      </TabsContent>
    </Tabs>
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
    <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="p-4">
        <h3 className="font-medium">Overview</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Your project overview and quick stats.
        </p>
      </TabsContent>
      <TabsContent value="analytics" className="p-4">
        <h3 className="font-medium">Analytics</h3>
        <p className="text-sm text-muted-foreground mt-2">
          View your analytics and insights.
        </p>
      </TabsContent>
      <TabsContent value="reports" className="p-4">
        <h3 className="font-medium">Reports</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Generate and download reports.
        </p>
      </TabsContent>
      <TabsContent value="notifications" className="p-4">
        <h3 className="font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Manage your notification preferences.
        </p>
      </TabsContent>
    </Tabs>
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
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="other">Other</TabsTrigger>
      </TabsList>
      <TabsContent value="active">Active tab content</TabsContent>
      <TabsContent value="disabled">Disabled tab content</TabsContent>
      <TabsContent value="other">Other tab content</TabsContent>
    </Tabs>
  ),
}
