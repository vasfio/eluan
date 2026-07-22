import type { Meta, StoryObj } from "@storybook/react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
} from "./context-menu"
import { Button } from "./button"

const meta: Meta<typeof ContextMenu> = {
  title: "Components/Context Menu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A right-click menu that displays a list of actions or options relevant to the clicked area.

**Import**
\`\`\`tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuShortcut,
  ContextMenuGroup,
} from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Cut</ContextMenuItem>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
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
        story: "A full-featured context menu with sub-menus, checkbox items, radio items, labels, and separators.",
      },
    },
  },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button variant="ghost">Right click here</Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem disabled>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Save Page As...</ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Show Bookmarks Bar</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="alex">
          <ContextMenuLabel>Assignee</ContextMenuLabel>
          <ContextMenuRadioItem value="alex">Alex Morgan</ContextMenuRadioItem>
          <ContextMenuRadioItem value="sarah">Sarah Chen</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const Simple: Story = {
  parameters: {
    docs: {
      description: {
        story: "A minimal context menu with basic menu items for common clipboard actions.",
      },
    },
  },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button variant="ghost">Right click me</Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Cut</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
