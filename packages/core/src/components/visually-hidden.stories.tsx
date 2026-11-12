import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { Row } from "./row"
import { Stack } from "./stack"
import { Typography } from "./typography"
import { VisuallyHidden } from "./visually-hidden"

const meta: Meta<typeof VisuallyHidden> = {
  title: "Components/VisuallyHidden",
  component: VisuallyHidden,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Content for screen readers only: out of view, still in the accessibility tree. Use it for a heading sighted users infer from the layout, or context appended to a link or button label. An icon-only Button takes \`aria-label\` instead.

\`\`\`tsx
import { VisuallyHidden } from "@eluan/core"

<Button variant="outline">
  Edit<VisuallyHidden> Morning Vinyasa</VisuallyHidden>
</Button>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const classes = ["Morning Vinyasa", "Yin & Breathwork", "Restorative"]

/**
 * The region has a heading screen readers can jump to, and each button's
 * accessible name says which class it edits, though both read "Edit" on screen.
 */
export const RegionHeadingAndContext: Story = {
  render: () => (
    <Stack as="section" gap="md" aria-labelledby="classes-heading">
      <VisuallyHidden as="h2" id="classes-heading">
        Today's classes
      </VisuallyHidden>
      {classes.map((name) => (
        <Row key={name} justify="between">
          <Typography>{name}</Typography>
          <Button variant="outline" size="sm">
            Edit<VisuallyHidden> {name}</VisuallyHidden>
          </Button>
        </Row>
      ))}
    </Stack>
  ),
}
