import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "./box"
import { Button } from "./button"
import { Row } from "./row"
import { Typography } from "./typography"

const spacing = ["none", "xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]

// Story-only outline, so the padding is visible.
const frame = {
  border: "1px dashed var(--container-border)",
  borderRadius: "var(--curves-sm)",
} as const

const meta: Meta<typeof Box> = {
  title: "Components/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    pad: { control: "select", options: [undefined, ...spacing] },
    padX: { control: "select", options: [undefined, ...spacing] },
    padY: { control: "select", options: [undefined, ...spacing] },
    grow: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component: `
A plain block with token padding (\`pad\`, or \`padX\` / \`padY\` per axis, which override \`pad\`) and \`grow\` to take the remaining space in a flex parent. It has no display of its own.

\`\`\`tsx
import { Box } from "@eluan/core"

<Row>
  <Box grow><Input … /></Box>
  <Button>Search</Button>
</Row>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { pad: "lg" },
  render: (args) => (
    <div style={frame}>
      <Box {...args}>
        <Typography>Padded content</Typography>
      </Box>
    </div>
  ),
}

/** `grow` takes what the other children leave. */
export const Grow: Story = {
  render: () => (
    <Row>
      <Box grow padY="sm">
        <Typography truncate>
          A long class description that would otherwise push the button off the edge of the row.
        </Typography>
      </Box>
      <Button>Book</Button>
    </Row>
  ),
}
