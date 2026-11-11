import type { Meta, StoryObj } from "@storybook/react"
import { Stack, type LayoutSpacing } from "./stack"
import { Typography } from "./typography"

const spacing: LayoutSpacing[] = ["none", "xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]

// Story-only swatch, so the gaps are visible.
const swatch = {
  backgroundColor: "var(--container-bg-alt)",
  border: "1px solid var(--container-border)",
  borderRadius: "var(--curves-sm)",
  padding: "var(--spacing-sm)",
} as const

const meta: Meta<typeof Stack> = {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    gap: { control: "select", options: spacing },
    pad: { control: "select", options: [undefined, ...spacing] },
    align: { control: "inline-radio", options: [undefined, "start", "center", "end", "stretch", "baseline"] },
    justify: { control: "inline-radio", options: [undefined, "start", "center", "end", "between"] },
    grow: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component: `
Vertical flow: children stacked with a \`--spacing-*\` gap. Defaults to \`gap="md"\`; unset \`align\` stretches children to the stack's width. Takes the \`Box\` props (\`pad\`, \`padX\`, \`padY\`, \`grow\`), plus \`as\` and \`asChild\`.

\`\`\`tsx
import { Stack } from "@eluan/core"

<Stack as="form" gap="lg" onSubmit={save}>
  <Input … />
  <Button type="submit">Save</Button>
</Stack>
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
    <Stack {...args}>
      <div style={swatch}>One</div>
      <div style={swatch}>Two</div>
      <div style={swatch}>Three</div>
    </Stack>
  ),
}

/** Every step of the spacing scale. Switch the spacing toolbar to see them re-flow. */
export const Gaps: Story = {
  render: () => (
    <Stack gap="xl">
      {spacing.map((gap) => (
        <Stack key={gap} gap="xs">
          <Typography variant="caption" tone="muted">
            gap="{gap}"
          </Typography>
          <Stack gap={gap}>
            <div style={swatch} />
            <div style={swatch} />
          </Stack>
        </Stack>
      ))}
    </Stack>
  ),
}
