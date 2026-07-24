import type { Meta, StoryObj } from "@storybook/react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "./menubar"

const meta: Meta<typeof Menubar> = {
  title: "Components/Menubar",
  component: Menubar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A horizontal menu bar with dropdown menus, typically used for application-level navigation and actions.

**Sub-components:** \`MenubarMenu\`, \`MenubarTrigger\`, \`MenubarContent\`, \`MenubarItem\`, \`MenubarSeparator\`, \`MenubarLabel\`, \`MenubarCheckboxItem\`, \`MenubarRadioGroup\`, \`MenubarRadioItem\`, \`MenubarSub\`, \`MenubarSubTrigger\`, \`MenubarSubContent\`, \`MenubarShortcut\`, \`MenubarGroup\`, \`MenubarPortal\`

**Import**
\`\`\`tsx
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
} from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
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
        story: "A full menubar with File, Edit, and View menus demonstrating items, shortcuts, separators, checkbox items, and radio groups.",
      },
    },
  },
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Cut <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Paste <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Show Toolbar</MenubarCheckboxItem>
          <MenubarCheckboxItem>Show Statusbar</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value="small">
            <MenubarRadioItem value="small">Small</MenubarRadioItem>
            <MenubarRadioItem value="medium">Medium</MenubarRadioItem>
            <MenubarRadioItem value="large">Large</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}
