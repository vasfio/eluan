import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./dropdown-menu"
import { Button } from "./button"

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/Dropdown Menu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A versatile dropdown menu with support for standard items, checkbox items, radio items, sub-menus, separators, labels, and keyboard shortcuts.

**Import**
\`\`\`tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
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
        story: "A basic dropdown menu with labeled sections and standard menu items.",
      },
    },
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

const CheckboxesDemo = () => {
  const [statusBar, setStatusBar] = React.useState(true)
  const [activityBar, setActivityBar] = React.useState(false)
  const [panel, setPanel] = React.useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={statusBar}
          onCheckedChange={setStatusBar}
          onSelect={(event) => event.preventDefault()}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={activityBar}
          onCheckedChange={setActivityBar}
          onSelect={(event) => event.preventDefault()}
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={panel}
          onCheckedChange={setPanel}
          onSelect={(event) => event.preventDefault()}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const WithCheckboxes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Dropdown menu with checkbox items for toggling visibility of UI panels. Toggling persists via component state and the menu stays open.",
      },
    },
  },
  render: () => <CheckboxesDemo />,
}

const RadioItemsDemo = () => {
  const [theme, setTheme] = React.useState("light")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Theme</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem
            value="light"
            onSelect={(event) => event.preventDefault()}
          >
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="dark"
            onSelect={(event) => event.preventDefault()}
          >
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="system"
            onSelect={(event) => event.preventDefault()}
          >
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const WithRadioItems: Story = {
  parameters: {
    docs: {
      description: {
        story: "Dropdown menu with radio items for single-selection (theme picker). Selection persists via component state and the menu stays open.",
      },
    },
  },
  render: () => <RadioItemsDemo />,
}

export const WithSubmenu: Story = {
  parameters: {
    docs: {
      description: {
        story: "Dropdown menu with a nested sub-menu for additional actions.",
      },
    },
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">More</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>New Tab</DropdownMenuItem>
        <DropdownMenuItem>New Window</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Save Page As...</DropdownMenuItem>
            <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
            <DropdownMenuItem>Name Window...</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Developer Tools</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
