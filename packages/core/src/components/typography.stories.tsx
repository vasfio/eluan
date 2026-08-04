import type { Meta, StoryObj } from "@storybook/react"
import { Typography } from "./typography"

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "display",
        "title",
        "heading",
        "subheading",
        "lead",
        "body",
        "label",
        "caption",
      ],
    },
    step: {
      control: "select",
      options: ["6", "5", "4", "3", "2", "1", "0", "neg1", "neg2", "neg3"],
    },
    as: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "div",
        "blockquote",
        "figcaption",
      ],
    },
    family: { control: "inline-radio", options: ["heading", "body", "mono"] },
    weight: { control: "inline-radio", options: ["normal", "medium"] },
    tone: { control: "inline-radio", options: ["default", "muted", "inverse"] },
    align: { control: "inline-radio", options: ["start", "center", "end"] },
    truncate: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const stack = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-lg)",
} as const

export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
  },
}

/** Headings share the heading family at medium weight; tracking tightens as they grow. */
export const Headings: Story = {
  render: () => (
    <div style={stack}>
      <Typography variant="display">Display — step 5</Typography>
      <Typography variant="title">Title — step 4</Typography>
      <Typography variant="heading">Heading — step 3</Typography>
      <Typography variant="subheading">Subheading — step 2</Typography>
    </div>
  ),
}

/** Body copy variants sit on the body family at normal weight (label is medium). */
export const BodyText: Story = {
  render: () => (
    <div style={stack}>
      <Typography variant="lead">
        Lead — step 1. Slightly larger than body, for the opening paragraph of a
        section.
      </Typography>
      <Typography variant="body">
        Body — step 0. The default. Everything is sized in rem off the fluid
        typeset, so this paragraph grows between the 480px and 1024px viewport
        anchors without a single media query in your app.
      </Typography>
      <Typography variant="label">Label — step neg1</Typography>
      <Typography variant="caption" tone="muted">
        Caption — step neg2, usually muted.
      </Typography>
    </div>
  ),
}

/** All ten typeset steps. Resize the canvas to watch every one interpolate. */
export const ScaleShowcase: Story = {
  render: () => (
    <div style={stack}>
      {(["6", "5", "4", "3", "2", "1", "0", "neg1", "neg2", "neg3"] as const).map(
        (step) => (
          <div
            key={step}
            style={{ display: "flex", alignItems: "baseline", gap: "var(--spacing-md)" }}
          >
            <Typography
              variant="caption"
              family="mono"
              tone="muted"
              as="span"
              // fixed width so the specimens line up
            >
              step-{step}
            </Typography>
            <Typography step={step} as="span" family="heading" weight="medium">
              Grumpy wizards make toxic brew
            </Typography>
          </div>
        )
      )}
    </div>
  ),
}

/** Tone maps to the container foreground tokens. */
export const Tones: Story = {
  render: () => (
    <div style={stack}>
      <Typography tone="default">Default — var(--container-fg)</Typography>
      <Typography tone="muted">Muted — var(--container-fg-alt)</Typography>
      <div
        style={{
          backgroundColor: "var(--container-bg-inverse)",
          padding: "var(--spacing-md)",
          borderRadius: "var(--curves-md)",
        }}
      >
        <Typography tone="inverse">Inverse — var(--container-fg-inverse)</Typography>
      </div>
    </div>
  ),
}

/** Family override — mono uses Paper Mono. */
export const Families: Story = {
  render: () => (
    <div style={stack}>
      <Typography family="heading">Heading family — var(--font-heading)</Typography>
      <Typography family="body">Body family — var(--font-body)</Typography>
      <Typography family="mono">Mono family — var(--font-mono)</Typography>
    </div>
  ),
}

/** `step` re-sizes a variant without changing its family, weight, or element. */
export const StepOverride: Story = {
  render: () => (
    <div style={stack}>
      <Typography variant="label">Label at its own step (neg1)</Typography>
      <Typography variant="label" step="2">
        Same label variant, bumped to step 2
      </Typography>
      <Typography variant="display" step="1">
        Display variant pulled down to step 1
      </Typography>
    </div>
  ),
}

export const Truncated: Story = {
  render: () => (
    <div style={{ ...stack, maxWidth: "20rem" }}>
      <Typography truncate>
        This sentence is much too long for its container and gets an ellipsis.
      </Typography>
      <Typography>
        This one wraps instead, because truncate is off.
      </Typography>
    </div>
  ),
}

export const Alignment: Story = {
  render: () => (
    <div style={stack}>
      <Typography align="start">Start aligned</Typography>
      <Typography align="center">Center aligned</Typography>
      <Typography align="end">End aligned</Typography>
    </div>
  ),
}

/** `asChild` renders your element with the typography styling applied. */
export const AsChild: Story = {
  render: () => (
    <Typography variant="heading" asChild>
      <a href="#typography">A link styled as a heading</a>
    </Typography>
  ),
}
