import type { Meta, StoryObj } from "@storybook/react"
import { AlertCircle, Calendar, Check, CheckCircle2, Clock, MapPin } from "lucide-react"
import { Button } from "./button"
import { Icon, type IconTone, type LayoutSize } from "./icon"
import { Row } from "./row"
import { Stack } from "./stack"
import { Typography } from "./typography"

const sizes: LayoutSize[] = ["xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: sizes },
    after: { control: "select", options: [undefined, "none", "xxs", "xs", "sm", "md", "lg"] },
    tone: {
      control: "select",
      options: [
        "inherit",
        "default",
        "muted",
        "inverse",
        "positive",
        "destructive",
        "interactive",
        "interactive-muted",
      ] satisfies IconTone[],
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Sizes an svg child (a lucide icon or any inline svg) to a \`--size-*\` token, so icons follow the spacing density. \`tone\` colours it from the same tones as Typography; the default, \`inherit\`, matches the text around it. Decorative by default (\`aria-hidden\`). \`after\` adds a trailing gap for an icon followed by a label outside a gapped \`Row\`; \`asChild\` sizes the svg itself with no wrapping span.

\`\`\`tsx
import { Icon } from "@eluan/core"
import { Check } from "lucide-react"

<Icon size="xs" after="sm"><Check /></Icon>Saved
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { size: "md" },
  render: (args) => (
    <Icon {...args}>
      <Calendar />
    </Icon>
  ),
}

/** Every step of the size scale. */
export const Sizes: Story = {
  render: () => (
    <Row gap="lg" align="end" wrap>
      {sizes.map((size) => (
        <Stack key={size} gap="xs" align="center">
          <Icon size={size}>
            <MapPin />
          </Icon>
          <Typography variant="caption" tone="muted">
            {size}
          </Typography>
        </Stack>
      ))}
    </Row>
  ),
}

/** Inline with text, using `after` for the gap; and inside a Button. */
export const WithLabel: Story = {
  render: () => (
    <Stack gap="lg" align="start">
      <Typography>
        <Icon size="xxs" after="xs">
          <Check />
        </Icon>
        Payment received
      </Typography>
      <Button variant="outline">
        <Icon size="xs">
          <Calendar />
        </Icon>
        Add to calendar
      </Button>
    </Stack>
  ),
}

/** `tone` takes Typography's tones. Give the label the same tone, or leave the icon to inherit the text colour. */
export const Tones: Story = {
  render: () => (
    <Stack gap="sm">
      <Row gap="sm">
        <Icon tone="positive">
          <CheckCircle2 />
        </Icon>
        <Typography size="sm" tone="positive">
          Payment received
        </Typography>
      </Row>
      <Row gap="sm">
        <Icon tone="destructive">
          <AlertCircle />
        </Icon>
        <Typography size="sm" tone="destructive">
          Payment failed
        </Typography>
      </Row>
      <Row gap="sm">
        <Icon tone="muted">
          <Clock />
        </Icon>
        <Typography size="sm">Due in 3 days</Typography>
      </Row>
    </Stack>
  ),
}
