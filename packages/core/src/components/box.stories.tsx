import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "./box"
import { Button } from "./button"
import { Row } from "./row"
import { Stack } from "./stack"
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
    shrink: { control: "inline-radio", options: [undefined, true, false] },
    height: { control: "inline-radio", options: [undefined, "full", "screen"] },
    minHeight: { control: "inline-radio", options: [undefined, "full", "screen"] },
    position: { control: "inline-radio", options: [undefined, "relative", "absolute"] },
    inset: { control: "inline-radio", options: [undefined, "fill", "top", "bottom"] },
    overflow: { control: "inline-radio", options: [undefined, "hidden", "auto"] },
  },
  parameters: {
    docs: {
      description: {
        component: `
A plain block with token padding (\`pad\`, or \`padX\` / \`padY\` per axis, which override \`pad\`) and \`grow\` to take the remaining space in a flex parent. It has no display of its own.

The same props work on \`Stack\`, \`Row\` and \`Grid\`:

- \`shrink={false}\` holds an element at its content size in a flex parent.
- \`height\` and \`minHeight\` take \`"full"\` (the parent's height) or \`"screen"\` (the viewport's).
- \`position="relative"\` makes an anchor; \`inset\` pins a child to it (\`"fill"\`, \`"top"\` or \`"bottom"\`) and positions it absolutely.
- \`overflow\` clips (\`"hidden"\`) or scrolls (\`"auto"\`).

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
          A long project description that would otherwise push the button off the edge of the row.
        </Typography>
      </Box>
      <Button>Open</Button>
    </Row>
  ),
}

/** `height="full"` fills the parent; with `align` and `justify` it centres an empty state. */
export const FullHeight: Story = {
  render: () => (
    <div style={{ ...frame, height: 240, width: 360, maxWidth: "100%" }}>
      <Stack height="full" align="center" justify="center" gap="md">
        <Typography tone="muted">No invoices yet</Typography>
        <Button size="sm">New invoice</Button>
      </Stack>
    </div>
  ),
}

/** `overflow="auto"` scrolls what doesn't fit in the height the box is given. */
export const Scrolling: Story = {
  render: () => (
    <div style={{ ...frame, height: 160, width: 360, maxWidth: "100%" }}>
      <Box height="full" overflow="auto" pad="md">
        <Stack gap="sm">
          {["Website redesign", "Mobile app", "Quarterly report", "Billing migration", "Onboarding emails", "Design tokens", "Support portal", "Annual review"].map((project) => (
            <Typography key={project}>{project}</Typography>
          ))}
        </Stack>
      </Box>
    </div>
  ),
}

/**
 * `position="relative"` makes the anchor; `inset` pins children to it.
 * `inset="fill"` covers it, `inset="bottom"` runs along its bottom edge.
 * The bar's background is your own element, through `asChild`.
 */
export const Overlay: Story = {
  render: () => (
    <Box position="relative" overflow="hidden" asChild>
      <div style={{ ...frame, height: 200, width: 360, maxWidth: "100%", background: "var(--container-bg-alt)" }}>
        <Stack inset="fill" align="center" justify="center">
          <Typography size="sm" tone="muted">
            Uploading cover image…
          </Typography>
        </Stack>
        <Box inset="bottom" padX="md" padY="sm" asChild>
          <div style={{ background: "var(--container-bg-inverse)" }}>
            <Typography size="sm" tone="inverse" truncate>
              Website redesign · cover
            </Typography>
          </div>
        </Box>
      </div>
    </Box>
  ),
}
