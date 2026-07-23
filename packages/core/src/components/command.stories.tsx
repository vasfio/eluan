import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command"
import { Button } from "./button"
import { Kbd } from "./kbd"

const meta: Meta<typeof Command> = {
  title: "Components/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A command palette / search interface built on \`cmdk\` for fast, keyboard-driven item selection and filtering.

Reach for it the way the original component intended: a trigger button opens the palette inside a portalled dialog (\`CommandDialog\`). An inline, bordered variant is also available for embedding the palette directly on a surface.

**Sub-components:** \`CommandDialog\`, \`CommandInput\`, \`CommandList\`, \`CommandEmpty\`, \`CommandGroup\`, \`CommandItem\`, \`CommandShortcut\`, \`CommandSeparator\`

**Import**
\`\`\`tsx
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@eluan/core"
\`\`\`

**Usage (dialog)**
\`\`\`tsx
const [open, setOpen] = React.useState(false)

<>
  <Button variant="ghost" onClick={() => setOpen(true)}>Open command palette</Button>
  <CommandDialog open={open} onOpenChange={setOpen}>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem onSelect={() => setOpen(false)}>Calendar</CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const CommandDialogDemo = () => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const close = () => setOpen(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)", alignItems: "flex-start" }}>
      <Button variant="ghost" onClick={() => setOpen(true)}>
        Open command palette
        <Kbd keys="cmd+k" size="sm" variant="default" />
      </Button>
      <p style={{ color: "var(--container-fg-alt)", fontSize: "var(--font-size-sm)", margin: 0 }}>
        Press the button or hit <Kbd keys="cmd+k" size="sm" variant="ghost" /> to open the palette.
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={close}>Calendar</CommandItem>
            <CommandItem onSelect={close}>Search Emoji</CommandItem>
            <CommandItem onSelect={close}>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={close}>
              Profile <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={close}>
              Billing <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={close}>
              Settings <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

export const Default: Story = {
  render: () => <CommandDialogDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "The command palette the way it is meant to be used: a ghost `Button` trigger opens the full palette inside a portalled `CommandDialog`. Open it with the button or ⌘/Ctrl+K, type to filter across groups, and close with Escape, an overlay click, or selecting an item.",
      },
    },
  },
}

export const Inline: Story = {
  render: () => (
    <div style={{ maxWidth: "28rem" }}>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile <CommandShortcut>⌘P</CommandShortcut></CommandItem>
            <CommandItem>Billing <CommandShortcut>⌘B</CommandShortcut></CommandItem>
            <CommandItem>Settings <CommandShortcut>⌘S</CommandShortcut></CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The palette embedded directly on a surface (bordered, elevated card) rather than in a dialog. Use this when the command list is a permanent part of the layout.",
      },
    },
  },
}

export const Simple: Story = {
  render: () => (
    <div style={{ maxWidth: "28rem" }}>
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem>Option 1</CommandItem>
            <CommandItem>Option 2</CommandItem>
            <CommandItem>Option 3</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A minimal inline command list with a search input and a flat list of options.",
      },
    },
  },
}

export const WithShortcuts: Story = {
  render: () => (
    <div style={{ maxWidth: "28rem" }}>
      <Command>
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem>
              New File
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Open File
              <CommandShortcut>⌘O</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Save
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Close
              <CommandShortcut>⌘W</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Command items with trailing keyboard shortcut hints displayed via CommandShortcut.",
      },
    },
  },
}
