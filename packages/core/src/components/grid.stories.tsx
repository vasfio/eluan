import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Grid } from "./grid"
import { Stack } from "./stack"
import { Typography } from "./typography"

// Story-only swatch, so the tracks are visible.
const swatch = {
  backgroundColor: "var(--container-bg-alt)",
  border: "1px solid var(--container-border)",
  borderRadius: "var(--curves-sm)",
  padding: "var(--spacing-sm)",
} as const

const cells = (n: number) =>
  Array.from({ length: n }, (_, i) => (
    <div key={i} style={swatch}>
      {i + 1}
    </div>
  ))

const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    cols: { control: "object" },
    gap: { control: "select", options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] },
    align: { control: "inline-radio", options: [undefined, "start", "center", "end", "stretch", "baseline"] },
  },
  parameters: {
    docs: {
      description: {
        component: `
CSS grid with a \`--spacing-*\` gap. \`cols\` takes a count (1–12 equal \`minmax(0, 1fr)\` tracks), a raw \`grid-template-columns\` value, or an object per breakpoint, mobile first, keyed by Eluan's breakpoint names (\`xxs\` 320, \`xs\` 414, \`s\` 480, \`m\` 748, \`l\` 1024, \`xl\` 1280, \`2xl\` 1440, \`3xl\` 1920, \`4xl\` 2580). Children get \`min-width: 0\`.

\`\`\`tsx
import { Grid } from "@eluan/core"

<Grid cols={{ base: 1, m: 2, l: 4 }} gap="lg">
  <StatCard … />
</Grid>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { cols: 3, gap: "md" },
  render: (args) => <Grid {...args}>{cells(6)}</Grid>,
}

/** One column on phones, two from `m`, four from `l`. Resize the canvas to see it change. */
export const Responsive: Story = {
  render: () => (
    <Grid cols={{ base: 1, m: 2, l: 4 }} gap="lg">
      {["Revenue", "Subscriptions", "Active users", "Churn"].map((label, i) => (
        <Card key={label}>
          <CardHeader>
            <CardDescription>{label}</CardDescription>
            <CardTitle>{["$48,210", "1,380", "2,318", "1.8%"][i]}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </Grid>
  ),
}

/** A raw template for uneven tracks: a fixed-content column and a flexible one. */
export const Template: Story = {
  render: () => (
    <Grid cols={{ base: 1, m: "auto minmax(0, 1fr)" }} gap="lg" align="start">
      <Typography variant="label">Display name</Typography>
      <Typography tone="muted">Shown to your team and on invoices.</Typography>
      <Typography variant="label">Email</Typography>
      <Typography tone="muted">Where invoices and notifications go.</Typography>
    </Grid>
  ),
}

/** Every count from 1 to 12. */
export const Counts: Story = {
  render: () => (
    <Stack gap="lg">
      {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const).map((n) => (
        <Grid key={n} cols={n} gap="xs">
          {cells(n)}
        </Grid>
      ))}
    </Stack>
  ),
}

/** A grid inside a grid keeps its own columns; the parent's don't leak in. */
export const Nested: Story = {
  render: () => (
    <Grid cols={{ base: 1, m: 2 }} gap="lg">
      <Card>
        <CardContent>
          <Grid cols={3} gap="xs">
            {cells(6)}
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Grid gap="xs">{cells(2)}</Grid>
        </CardContent>
      </Card>
    </Grid>
  ),
}
