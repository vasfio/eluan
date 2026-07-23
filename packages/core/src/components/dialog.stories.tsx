import type { Meta, StoryObj } from "@storybook/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Button } from "./button"
import { Input } from "./input"

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A modal overlay that focuses the user's attention on a single task or piece of information, built on Radix UI Dialog primitive.

**Sub-components:** \`DialogTrigger\`, \`DialogContent\`, \`DialogHeader\`, \`DialogFooter\`, \`DialogTitle\`, \`DialogDescription\`, \`DialogClose\`, \`DialogPortal\`, \`DialogOverlay\`

**Import**
\`\`\`tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description text.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
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
        story: "A dialog with a form containing input fields and a save action in the footer.",
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-lg)",
            paddingBlock: "var(--spacing-lg)",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "grid",
              gap: "var(--spacing-lg)",
              gridTemplateColumns: "1fr 3fr",
            }}
          >
            <label htmlFor="name" style={{ fontSize: "var(--font-size-sm)", textAlign: "right" }}>
              Name
            </label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div
            style={{
              alignItems: "center",
              display: "grid",
              gap: "var(--spacing-lg)",
              gridTemplateColumns: "1fr 3fr",
            }}
          >
            <label htmlFor="username" style={{ fontSize: "var(--font-size-sm)", textAlign: "right" }}>
              Username
            </label>
            <Input id="username" defaultValue="@johndoe" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const SimpleDialog: Story = {
  parameters: {
    docs: {
      description: {
        story: "A confirmation dialog with cancel and destructive delete actions.",
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
