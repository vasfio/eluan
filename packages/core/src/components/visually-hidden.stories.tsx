import type { Meta, StoryObj } from "@storybook/react"
import { Trash2 } from "lucide-react"
import { Button } from "./button"
import { Icon } from "./icon"
import { VisuallyHidden } from "./visually-hidden"

const meta: Meta<typeof VisuallyHidden> = {
  title: "Components/VisuallyHidden",
  component: VisuallyHidden,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Content for screen readers only: out of view, still in the accessibility tree. Use it for an icon button's label or a heading a sighted user infers from layout.

\`\`\`tsx
import { VisuallyHidden } from "@eluan/core"

<Button size="icon" variant="ghost">
  <Icon><Trash2 /></Icon>
  <VisuallyHidden>Delete class</VisuallyHidden>
</Button>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** The button's accessible name is "Delete class", though only the icon shows. */
export const IconButtonLabel: Story = {
  render: () => (
    <Button size="icon" variant="ghost">
      <Icon size="xs">
        <Trash2 />
      </Icon>
      <VisuallyHidden>Delete class</VisuallyHidden>
    </Button>
  ),
}
