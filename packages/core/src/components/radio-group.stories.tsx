import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Label } from "./form-label"

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Radio Group",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A set of mutually exclusive radio buttons that allows users to select a single option from a group.

**Import**
\`\`\`tsx
import { RadioGroup, RadioGroupItem } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<RadioGroup defaultValue="option-one">
  <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "A basic vertical radio group with three options and a default selection.",
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div style={row}>
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div style={row}>
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div style={row}>
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
}

const row: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: "var(--spacing-sm)",
}

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story: "Radio group items arranged horizontally using flex layout.",
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="small" orientation="horizontal">
      <div style={row}>
        <RadioGroupItem value="small" id="small" />
        <Label htmlFor="small">Small</Label>
      </div>
      <div style={row}>
        <RadioGroupItem value="medium" id="medium" />
        <Label htmlFor="medium">Medium</Label>
      </div>
      <div style={row}>
        <RadioGroupItem value="large" id="large" />
        <Label htmlFor="large">Large</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithDescriptions: Story = {
  parameters: {
    docs: {
      description: {
        story: "Radio group items with secondary description text beneath each label.",
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div style={descRow}>
        <RadioGroupItem value="default" id="r1" />
        <div style={descCopy}>
          <span style={descLabelWrap}>
            <Label htmlFor="r1">Default</Label>
          </span>
          <p style={descText}>The default system setting.</p>
        </div>
      </div>
      <div style={descRow}>
        <RadioGroupItem value="comfortable" id="r2" />
        <div style={descCopy}>
          <span style={descLabelWrap}>
            <Label htmlFor="r2">Comfortable</Label>
          </span>
          <p style={descText}>More spacing for readability.</p>
        </div>
      </div>
      <div style={descRow}>
        <RadioGroupItem value="compact" id="r3" />
        <div style={descCopy}>
          <span style={descLabelWrap}>
            <Label htmlFor="r3">Compact</Label>
          </span>
          <p style={descText}>Reduced spacing for density.</p>
        </div>
      </div>
    </RadioGroup>
  ),
}

const descRow: React.CSSProperties = {
  alignItems: "flex-start",
  display: "flex",
  gap: "var(--spacing-sm)",
}

const descCopy: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-xxs)",
}

const descLabelWrap: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  minHeight: "var(--size-xxs)",
}

const descText: React.CSSProperties = {
  color: "var(--container-fg-alt)",
  fontSize: "var(--font-size-xs)",
  margin: 0,
}
