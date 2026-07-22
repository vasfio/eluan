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

const meta: Meta<typeof Command> = {
  title: "Components/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A command palette / search interface built on \`cmdk\` for fast, keyboard-driven item selection and filtering.

**Sub-components:** \`CommandDialog\`, \`CommandInput\`, \`CommandList\`, \`CommandEmpty\`, \`CommandGroup\`, \`CommandItem\`, \`CommandShortcut\`, \`CommandSeparator\`

**Import**
\`\`\`tsx
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem>Profile</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
        story: "A command palette with grouped suggestions, a settings group with keyboard shortcuts, and a separator.",
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
        story: "A minimal command list with a search input and a flat list of options.",
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

const DialogDemo = () => {
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)", alignItems: "flex-start" }}>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open command palette
      </Button>
      <p style={{ color: "var(--container-fg-alt)", fontSize: "var(--font-size-sm)", margin: 0 }}>
        Or press <kbd>⌘</kbd> + <kbd>K</kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => setOpen(false)}>Calendar</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Search Emoji</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => setOpen(false)}>
              Profile <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              Billing <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              Settings <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

export const Dialog: Story = {
  render: () => <DialogDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "The command palette rendered inside a portalled dialog via `CommandDialog`. Open it with the button or ⌘/Ctrl+K, then type to filter across groups.",
      },
    },
  },
}
