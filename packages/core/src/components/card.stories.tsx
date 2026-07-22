import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card"
import { Button } from "./button"
import { Input } from "./input"

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    clickable: {
      control: "boolean",
      description: "Makes the card interactive with hover elevation and cursor pointer.",
    },
    elevation: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Controls the shadow depth of the card. Defaults to `sm`.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A versatile container component used to group and display content in a visually distinct section with optional elevation and interactivity.

**Sub-components:** \`CardHeader\`, \`CardTitle\`, \`CardDescription\`, \`CardContent\`, \`CardFooter\`

**Import**
\`\`\`tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Card elevation="sm">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content goes here.</CardContent>
  <CardFooter>Footer actions</CardFooter>
</Card>
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
        story: "A basic card with header, title, description, content, and footer sub-components.",
      },
    },
  },
  render: () => (
    <div style={{ width: 350 }}>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content goes here.</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  ),
}

export const WithActions: Story = {
  parameters: {
    docs: {
      description: {
        story: "A card containing a form with input fields and action buttons in the footer.",
      },
    },
  },
  render: () => (
    <div style={{ width: 350 }}>
      <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
              <label htmlFor="name" style={{ fontSize: "var(--font-size-sm)", fontWeight: 500 }}>
                Name
              </label>
              <Input id="name" placeholder="Name of your project" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  ),
}

export const Simple: Story = {
  parameters: {
    docs: {
      description: {
        story: "A minimal card with only a header and content section, no footer.",
      },
    },
  },
  render: () => (
    <div style={{ width: 350 }}>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            style={{
              border: "1px solid var(--container-border)",
              borderRadius: "var(--curves-md)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-xxs)",
              padding: "var(--spacing-md)",
            }}
          >
            <p style={{ fontSize: "var(--font-size-sm)", fontWeight: 500 }}>Push Notifications</p>
            <p style={{ fontSize: "var(--font-size-sm)", color: "var(--container-fg-alt)" }}>
              Send push notifications to device.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}
