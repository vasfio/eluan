import type { Meta, StoryObj } from "@storybook/react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer"
import { Button } from "./button"

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A slide-in panel that appears from the left or right edge of the viewport, used for secondary navigation, forms, or detail views without leaving the current page.

On large screens (>=1024px), the drawer renders inline in push mode. On small screens, it renders as a sheet overlay with a backdrop.

**Import**
\`\`\`tsx
import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader,
  DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose,
} from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description text.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose>Close</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
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
          "Right-side drawer with a settings panel containing form fields. On large screens it pushes content inline; on small screens it overlays.",
      },
    },
  },
  render: () => (
    <Drawer>
      <div className="flex min-h-[400px] w-full">
        <div className="flex flex-1 flex-col gap-[var(--spacing-lg)] p-[var(--spacing-lg)]">
          <div className="flex flex-col gap-[var(--spacing-sm)]">
            <h1 className="text-[length:var(--font-size-2xl)] font-semibold text-[color:var(--foregrounds-primary)]">
              Dashboard
            </h1>
            <p className="text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-secondary)]">
              Welcome back. Here is an overview of your workspace. Open the
              settings drawer to manage your account preferences and application
              configuration.
            </p>
          </div>

          <div className="flex gap-[var(--spacing-sm)]">
            <Button>Create Project</Button>
            <Button variant="outline">View Analytics</Button>
          </div>

          <DrawerTrigger className="inline-flex w-fit items-center justify-center rounded-[var(--curves-md)] border border-[var(--container-border-alt)] bg-[var(--container-bg)] px-[var(--spacing-md)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-primary)] transition-colors hover:bg-[var(--interactive-bg-hover)]">
            Open Settings
          </DrawerTrigger>
        </div>

        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>
              Manage your account preferences and application settings.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-[var(--spacing-md)] p-[var(--spacing-md)]">
            <div className="flex flex-col gap-[var(--spacing-xs)]">
              <label className="text-[length:var(--font-size-sm)] font-medium text-[color:var(--foregrounds-primary)]">
                Display name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="rounded-[var(--curves-md)] border border-[var(--container-border-alt)] bg-[var(--container-bg)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-primary)] placeholder:text-[color:var(--foregrounds-tertiary)]"
                defaultValue="Jane Cooper"
              />
            </div>

            <div className="flex flex-col gap-[var(--spacing-xs)]">
              <label className="text-[length:var(--font-size-sm)] font-medium text-[color:var(--foregrounds-primary)]">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="rounded-[var(--curves-md)] border border-[var(--container-border-alt)] bg-[var(--container-bg)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-primary)] placeholder:text-[color:var(--foregrounds-tertiary)]"
                defaultValue="jane@example.com"
              />
            </div>

            <div className="flex flex-col gap-[var(--spacing-xs)]">
              <label className="text-[length:var(--font-size-sm)] font-medium text-[color:var(--foregrounds-primary)]">
                Language
              </label>
              <select className="rounded-[var(--curves-md)] border border-[var(--container-border-alt)] bg-[var(--container-bg)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-primary)]">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

            <div className="flex items-center gap-[var(--spacing-sm)]">
              <input type="checkbox" id="notifications" defaultChecked />
              <label
                htmlFor="notifications"
                className="text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-secondary)]"
              >
                Enable email notifications
              </label>
            </div>
          </div>

          <DrawerFooter>
            <Button>Save changes</Button>
            <DrawerClose className="inline-flex items-center justify-center rounded-[var(--curves-md)] border border-[var(--container-border-alt)] bg-[var(--container-bg)] px-[var(--spacing-md)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-primary)] transition-colors hover:bg-[var(--interactive-bg-hover)]">
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </div>
    </Drawer>
  ),
}

export const FromLeft: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Left-side drawer with navigation links, simulating a sidebar menu.",
      },
    },
  },
  render: () => {
    const navItems = [
      { label: "Dashboard", active: true },
      { label: "Projects", active: false },
      { label: "Team Members", active: false },
      { label: "Analytics", active: false },
      { label: "Integrations", active: false },
      { label: "Billing", active: false },
    ]

    return (
      <Drawer>
        <div className="flex min-h-[400px] w-full">
          <DrawerContent side="left">
            <DrawerHeader>
              <DrawerTitle>Navigation</DrawerTitle>
              <DrawerDescription>
                Browse sections of the application.
              </DrawerDescription>
            </DrawerHeader>

            <nav className="flex flex-col gap-[var(--spacing-xxs)] p-[var(--spacing-md)]">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={`rounded-[var(--curves-md)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)] transition-colors ${
                    item.active
                      ? "bg-[var(--interactive-bg-hover)] text-[color:var(--foregrounds-primary)] font-medium"
                      : "text-[color:var(--foregrounds-secondary)] hover:bg-[var(--interactive-bg-hover)] hover:text-[color:var(--foregrounds-primary)]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <DrawerFooter>
              <div className="flex flex-col gap-[var(--spacing-xs)] border-t border-[var(--container-border-alt)] pt-[var(--spacing-md)]">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-tertiary)] hover:text-[color:var(--foregrounds-primary)]"
                >
                  Help &amp; Support
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-tertiary)] hover:text-[color:var(--foregrounds-primary)]"
                >
                  Sign out
                </a>
              </div>
            </DrawerFooter>
          </DrawerContent>

          <div className="flex flex-1 flex-col gap-[var(--spacing-lg)] p-[var(--spacing-lg)]">
            <div className="flex flex-col gap-[var(--spacing-sm)]">
              <h1 className="text-[length:var(--font-size-2xl)] font-semibold text-[color:var(--foregrounds-primary)]">
                Dashboard
              </h1>
              <p className="text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-secondary)]">
                Your project hub at a glance. Toggle the navigation drawer on the
                left to browse different sections of the application.
              </p>
            </div>

            <div className="flex gap-[var(--spacing-sm)]">
              <Button>Create Project</Button>
              <Button variant="outline">View Analytics</Button>
            </div>

            <DrawerTrigger className="inline-flex w-fit items-center justify-center rounded-[var(--curves-md)] border border-[var(--container-border-alt)] bg-[var(--container-bg)] px-[var(--spacing-md)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-primary)] transition-colors hover:bg-[var(--interactive-bg-hover)]">
              Open Navigation
            </DrawerTrigger>
          </div>
        </div>
      </Drawer>
    )
  },
}

export const MobileOverlay: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the overlay behavior that activates on narrow viewports (below 1024px). Resize your browser window below 1024px to see the drawer appear as a sheet overlay with a backdrop, instead of pushing content inline.",
      },
    },
  },
  render: () => (
    <Drawer>
      <div className="flex min-h-[400px] w-full">
        <div className="flex flex-1 flex-col gap-[var(--spacing-lg)] p-[var(--spacing-lg)]">
          <div className="flex flex-col gap-[var(--spacing-sm)]">
            <h1 className="text-[length:var(--font-size-2xl)] font-semibold text-[color:var(--foregrounds-primary)]">
              Dashboard
            </h1>
            <p className="text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-secondary)]">
              This story demonstrates the mobile overlay behavior. On viewports
              narrower than 1024px, the Drawer renders as a sheet overlay with a
              semi-transparent backdrop. On wider viewports, it renders inline
              and pushes adjacent content. Resize your browser to see the
              difference.
            </p>
          </div>

          <div className="flex gap-[var(--spacing-sm)]">
            <Button>Create Project</Button>
            <Button variant="outline">View Analytics</Button>
          </div>

          <DrawerTrigger className="inline-flex w-fit items-center justify-center rounded-[var(--curves-md)] border border-[var(--container-border-alt)] bg-[var(--container-bg)] px-[var(--spacing-md)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-primary)] transition-colors hover:bg-[var(--interactive-bg-hover)]">
            Open Drawer
          </DrawerTrigger>
        </div>

        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Quick Actions</DrawerTitle>
            <DrawerDescription>
              Frequently used actions at your fingertips.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-[var(--spacing-sm)] p-[var(--spacing-md)]">
            {["Create new project", "Invite team member", "Upload file", "Generate report"].map(
              (action) => (
                <button
                  key={action}
                  className="rounded-[var(--curves-md)] border border-[var(--container-border-alt)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-left text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-primary)] transition-colors hover:bg-[var(--interactive-bg-hover)]"
                >
                  {action}
                </button>
              )
            )}
          </div>

          <DrawerFooter>
            <DrawerClose className="inline-flex items-center justify-center rounded-[var(--curves-md)] border border-[var(--container-border-alt)] bg-[var(--container-bg)] px-[var(--spacing-md)] py-[var(--spacing-xs)] text-[length:var(--font-size-sm)] text-[color:var(--foregrounds-primary)] transition-colors hover:bg-[var(--interactive-bg-hover)]">
              Close
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </div>
    </Drawer>
  ),
}
