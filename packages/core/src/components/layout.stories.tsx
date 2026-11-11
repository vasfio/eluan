import type { Meta, StoryObj } from "@storybook/react"
import { Clock, Plus } from "lucide-react"
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
  ["Members", "214"],
  ["Bookings this week", "1,380"],
  ["Revenue", "€18.2k"],
  ["Classes", "46"],
] as const

const classes = [
  ["Morning Vinyasa", "07:00", "Full", "caution"],
  ["Yin & Breathwork", "12:30", "6 spots", "positive"],
  ["Restorative", "18:00", "11 spots", "positive"],
  ["Ashtanga Mysore", "19:30", "Cancelled", "destructive"],
] as const

function StudioPage() {
  return (
    <Stack as="main" gap="2xl" pad="xl">
      <Row justify="between" align="end" wrap gap="lg">
        <Stack gap="xxs">
          <Typography variant="title">Studio</Typography>
          <Typography tone="muted">This week at a glance.</Typography>
        </Stack>
        <Row gap="sm">
          <Button variant="outline">Export</Button>
          <Button>
            <Icon size="xs">
              <Plus />
            </Icon>
            New class
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
            <CardTitle>Today</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack gap="md">
              {classes.map(([name, time, spots, tone]) => (
                <Row key={name} justify="between" gap="md">
                  <Stack gap="xxs">
                    <Typography variant="label">{name}</Typography>
                    <Typography variant="caption" tone="muted">
                      <Icon size="xxs" after="xxs">
                        <Clock />
                      </Icon>
                      {time}
                    </Typography>
                  </Stack>
                  <Badge variant={tone}>{spots}</Badge>
                </Row>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invite a teacher</CardTitle>
            <CardDescription>They get an email with a sign-up link.</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack as="form" gap="md" onSubmit={(event) => event.preventDefault()}>
              <Input type="email" placeholder="name@studio.com" aria-label="Email" />
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
  render: () => <StudioPage />,
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
            <StudioPage />
          </Stack>
        </section>
      ))}
    </Stack>
  ),
}
