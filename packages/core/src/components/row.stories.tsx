import type { Meta, StoryObj } from "@storybook/react"
import { Plus } from "lucide-react"
import { Badge } from "./badge"
import { Box } from "./box"
import { Button } from "./button"
import { Icon } from "./icon"
import { Input } from "./input"
import { Row, type LayoutSpacing } from "./row"
import { Stack } from "./stack"
import { Typography } from "./typography"

const spacing: LayoutSpacing[] = ["none", "xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]

const meta: Meta<typeof Row> = {
  title: "Components/Row",
  component: Row,
  tags: ["autodocs"],
  argTypes: {
    gap: { control: "select", options: spacing },
    align: { control: "inline-radio", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "inline-radio", options: [undefined, "start", "center", "end", "between"] },
    wrap: { control: "boolean" },
    inline: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component: `
Horizontal flow, vertically centred by default, with a \`--spacing-*\` gap (\`md\` unless set). \`justify="between"\` pushes the ends apart, \`wrap\` lets children flow onto further lines, \`inline\` sits the row in running text. Takes the \`Box\` props, plus \`as\` and \`asChild\`.

\`\`\`tsx
import { Row } from "@eluan/core"

<Row justify="between">
  <Typography variant="heading">Members</Typography>
  <Button>Invite</Button>
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
  args: { gap: "md" },
  render: (args) => (
    <Row {...args}>
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </Row>
  ),
}

/** A page header: title on one end, actions on the other. */
export const Toolbar: Story = {
  render: () => (
    <Row justify="between" gap="lg">
      <Typography variant="heading">Projects</Typography>
      <Row gap="sm">
        <Button variant="outline">Export</Button>
        <Button>
          <Icon size="xs">
            <Plus />
          </Icon>
          New project
        </Button>
      </Row>
    </Row>
  ),
}

/** `Box grow` takes the space the other children leave. */
export const GrowingChild: Story = {
  render: () => (
    <Row gap="sm">
      <Box grow>
        <Input type="search" placeholder="Search users" />
      </Box>
      <Button variant="outline">Filters</Button>
    </Row>
  ),
}

/** With `wrap`, the gap applies between lines as well as between items. */
export const Wrapping: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Row wrap gap="xs">
        {["Design", "Engineering", "Marketing", "Sales", "Support", "Finance", "Operations"].map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </Row>
    </div>
  ),
}

/**
 * Flex children shrink by default, so a short label can wrap when its
 * neighbour needs the room. `shrink={false}` holds it at its content size.
 */
export const NoShrink: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Stack gap="lg">
        {[undefined, false].map((shrink) => (
          <Stack key={String(shrink)} gap="xs">
            <Typography variant="label" tone="muted">
              {shrink === false ? "shrink={false}" : "default"}
            </Typography>
            <Row gap="md">
              <Typography>A project name long enough to fill the row</Typography>
              <Row gap="xs" shrink={shrink}>
                <Badge variant="secondary">Pending</Badge>
                <Typography size="sm" tone="muted">
                  Due 4 Mar
                </Typography>
              </Row>
            </Row>
          </Stack>
        ))}
      </Stack>
    </div>
  ),
}
