import type { Meta, StoryObj } from "@storybook/react"
import { CalendarDays, Plus } from "lucide-react"
import { Badge } from "./badge"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Grid } from "./grid"
import { Icon } from "./icon"
import { Input } from "./input"
import { Row } from "./row"
import { Stack } from "./stack"
import { Typography } from "./typography"

// A whole page laid out with the layout primitives and Eluan components
// only: no utility classes, no CSS file, no hand-written spacing values.

const meta: Meta = {
  title: "Components/Layout",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Stack, Row, Grid and Box lay out a page from the spacing tokens, so switching \`data-spacing\` re-flows the page and the components together. The rule: an Eluan component first; layout primitives for the space between them; tokens only.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const stats = [
  ["Revenue", "$48,210"],
  ["Active users", "2,318"],
  ["Open invoices", "14"],
  ["Projects", "36"],
] as const

const invoices = [
  ["INV001 · Acme Corp", "Due 4 Mar", "Paid", "positive"],
  ["INV002 · Globex", "Due 11 Mar", "Pending", "caution"],
  ["INV003 · Initech", "Due 18 Mar", "Overdue", "destructive"],
  ["INV004 · Umbrella", "Due 25 Mar", "Paid", "positive"],
] as const

function DashboardPage() {
  return (
    <Stack as="main" gap="2xl" pad="xl">
      <Row justify="between" align="end" wrap gap="lg">
        <Stack gap="xxs">
          <Typography variant="title">Dashboard</Typography>
          <Typography tone="muted">Your workspace this month.</Typography>
        </Stack>
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

      <Grid cols={{ base: 2, l: 4 }} gap="lg">
        {stats.map(([label, value]) => (
          <Card key={label}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle>{value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </Grid>

      <Grid cols={{ base: 1, l: "minmax(0, 2fr) minmax(0, 1fr)" }} gap="xl" align="start">
        <Card>
          <CardHeader>
            <CardTitle>Recent invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack gap="md">
              {invoices.map(([name, due, status, tone]) => (
                <Row key={name} justify="between" gap="md">
                  <Stack gap="xxs">
                    <Typography variant="label">{name}</Typography>
                    <Typography variant="caption" tone="muted">
                      <Icon size="xxs" after="xxs">
                        <CalendarDays />
                      </Icon>
                      {due}
                    </Typography>
                  </Stack>
                  <Badge variant={tone}>{status}</Badge>
                </Row>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invite a teammate</CardTitle>
            <CardDescription>They get an email with a sign-up link.</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack as="form" gap="md" onSubmit={(event) => event.preventDefault()}>
              <Input type="email" placeholder="name@company.com" aria-label="Email" />
              <Button type="submit">Send invite</Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Stack>
  )
}

/** Follows the spacing toolbar. */
export const PageLayout: Story = {
  render: () => <DashboardPage />,
}

/** The same page in compact, standard and wide, stacked. Every gap comes from the density. */
export const AllSpacingModes: Story = {
  render: () => (
    <Stack gap="none">
      {(["compact", "standard", "wide"] as const).map((density) => (
        <section key={density} data-spacing={density} aria-label={`${density} spacing`}>
          <Stack gap="none">
            <Row padX="xl" padY="sm">
              <Badge variant="outline">data-spacing="{density}"</Badge>
            </Row>
            <DashboardPage />
          </Stack>
        </section>
      ))}
    </Stack>
  ),
}
