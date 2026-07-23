import type { Meta, StoryObj } from "@storybook/react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerLayout,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer"
import { Button } from "./button"
import { Input } from "./input"

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
An inline, collapsible side panel that lives next to the main content. Toggling
it expands or collapses the panel **within the layout**, so the main content
reclaims the freed space — it does not overlay the page.

Compose it with \`DrawerLayout\` (a flex row) so the panel and the main content
sit side by side. The panel animates its width between its open size and zero.

**Import**
\`\`\`tsx
import {
  Drawer, DrawerLayout, DrawerTrigger, DrawerContent, DrawerHeader,
  DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose,
} from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Drawer>
  <DrawerLayout>
    <main>
      <DrawerTrigger asChild>
        <Button>Open settings</Button>
      </DrawerTrigger>
    </main>
    <DrawerContent side="right">
      <DrawerHeader>
        <DrawerTitle>Settings</DrawerTitle>
        <DrawerDescription>Description text.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="ghost">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </DrawerLayout>
</Drawer>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "A settings panel that collapses inline. Toggling 'Open settings' expands the panel on the right and shrinks the main content to fit; closing it releases the space back.",
      },
    },
  },
  render: () => (
    <div
      style={{
        height: "400px",
        overflow: "hidden",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--container-border)",
        borderRadius: "var(--curves-md)",
      }}
    >
      <Drawer>
        <DrawerLayout>
          <main
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-md)",
              flex: 1,
              minWidth: 0,
              padding: "var(--spacing-2xl)",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-2xl)",
                fontWeight: 600,
                color: "var(--container-fg)",
              }}
            >
              Dashboard
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-sm)",
                color: "var(--container-fg-alt)",
              }}
            >
              Welcome back. Open the settings panel to manage your account
              preferences. It expands beside this content instead of covering it.
            </p>
            <div style={{ marginTop: "var(--spacing-md)" }}>
              <DrawerTrigger asChild>
                <Button>Open settings</Button>
              </DrawerTrigger>
            </div>
          </main>

          <DrawerContent side="right">
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
              <DrawerDescription>
                Manage your account preferences.
              </DrawerDescription>
            </DrawerHeader>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-md)",
                flex: 1,
                padding: "var(--spacing-md)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--spacing-xs)",
                }}
              >
                <label
                  htmlFor="drawer-name"
                  style={{
                    fontSize: "var(--font-size-sm)",
                    fontWeight: 500,
                    color: "var(--container-fg)",
                  }}
                >
                  Display name
                </label>
                <Input id="drawer-name" defaultValue="Jane Cooper" />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--spacing-xs)",
                }}
              >
                <label
                  htmlFor="drawer-email"
                  style={{
                    fontSize: "var(--font-size-sm)",
                    fontWeight: 500,
                    color: "var(--container-fg)",
                  }}
                >
                  Email
                </label>
                <Input
                  id="drawer-email"
                  type="email"
                  defaultValue="jane@example.com"
                />
              </div>

              <label
                htmlFor="drawer-notifications"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-sm)",
                  fontSize: "var(--font-size-sm)",
                  color: "var(--container-fg-alt)",
                }}
              >
                <input
                  id="drawer-notifications"
                  type="checkbox"
                  defaultChecked
                />
                Enable email notifications
              </label>
            </div>

            <DrawerFooter>
              <Button fullWidth>Save changes</Button>
              <DrawerClose asChild>
                <Button variant="ghost" fullWidth>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </DrawerLayout>
      </Drawer>
    </div>
  ),
}

export const FromLeft: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'A left-side panel using `side="left"`. It collapses inline from the left edge, pushing the main content to the right when open.',
      },
    },
  },
  render: () => {
    const sections = ["Dashboard", "Projects", "Team", "Analytics", "Billing"]

    return (
      <div
        style={{
          height: "400px",
          overflow: "hidden",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "var(--container-border)",
          borderRadius: "var(--curves-md)",
        }}
      >
        <Drawer defaultOpen>
          <DrawerLayout>
            <DrawerContent side="left" width={240}>
              <DrawerHeader>
                <DrawerTitle>Navigation</DrawerTitle>
                <DrawerDescription>Browse sections.</DrawerDescription>
              </DrawerHeader>

              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--spacing-xxs)",
                  flex: 1,
                  padding: "var(--spacing-md)",
                }}
              >
                {sections.map((section) => (
                  <a
                    key={section}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      padding: "var(--spacing-xs) var(--spacing-sm)",
                      borderRadius: "var(--curves-md)",
                      fontSize: "var(--font-size-sm)",
                      color: "var(--interactive-fg-alt)",
                      textDecoration: "none",
                    }}
                  >
                    {section}
                  </a>
                ))}
              </nav>
            </DrawerContent>

            <main
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-md)",
                flex: 1,
                minWidth: 0,
                padding: "var(--spacing-2xl)",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-2xl)",
                  fontWeight: 600,
                  color: "var(--container-fg)",
                }}
              >
                Dashboard
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: "var(--font-size-sm)",
                  color: "var(--container-fg-alt)",
                }}
              >
                Toggle the navigation panel to collapse it into the left edge and
                give this content the full width.
              </p>
              <div style={{ marginTop: "var(--spacing-md)" }}>
                <DrawerTrigger asChild>
                  <Button variant="ghost">Toggle navigation</Button>
                </DrawerTrigger>
              </div>
            </main>
          </DrawerLayout>
        </Drawer>
      </div>
    )
  },
}
