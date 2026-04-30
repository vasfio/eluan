import type { Meta, StoryObj } from "@storybook/react"
import { LogoCloud, LogoCloudItem } from "./logo-cloud"

const meta: Meta<typeof LogoCloud> = {
  title: "Web/LogoCloud",
  component: LogoCloud,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A logo cloud section for displaying partner or client logos in flex, grid, or marquee layouts with optional grayscale effect.

**Import**
\`\`\`tsx
import { LogoCloud, LogoCloudItem } from "@vasf/ragnar-web"
\`\`\`

**Usage**
\`\`\`tsx
<LogoCloud title="Trusted by" layout="flex">
  <LogoCloudItem name="Acme" grayscale>
    <img src="/logo.svg" alt="Acme" />
  </LogoCloudItem>
</LogoCloud>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "Background style: default, muted, or bordered.",
    },
    size: {
      description: "Vertical padding: sm, default, or lg.",
    },
    layout: {
      description: "Layout mode: flex (row), grid, or marquee (auto-scrolling).",
    },
    columns: {
      description: "Number of grid columns when layout is grid: 3, 4, 5, 6, or 8.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="flex h-8 w-24 items-center justify-center rounded bg-muted text-xs font-medium text-muted-foreground">
    {name}
  </div>
)

export const Default: Story = {
  parameters: { docs: { description: { story: "Default flex layout with grayscale logo items." } } },
  render: () => (
    <LogoCloud title="Trusted by leading companies">
      <LogoCloudItem name="Company A">
        <LogoPlaceholder name="Company A" />
      </LogoCloudItem>
      <LogoCloudItem name="Company B">
        <LogoPlaceholder name="Company B" />
      </LogoCloudItem>
      <LogoCloudItem name="Company C">
        <LogoPlaceholder name="Company C" />
      </LogoCloudItem>
      <LogoCloudItem name="Company D">
        <LogoPlaceholder name="Company D" />
      </LogoCloudItem>
      <LogoCloudItem name="Company E">
        <LogoPlaceholder name="Company E" />
      </LogoCloudItem>
    </LogoCloud>
  ),
}

export const Muted: Story = {
  parameters: { docs: { description: { story: "Muted background variant." } } },
  render: () => (
    <LogoCloud variant="muted" title="Our partners">
      <LogoCloudItem name="Partner 1">
        <LogoPlaceholder name="Partner 1" />
      </LogoCloudItem>
      <LogoCloudItem name="Partner 2">
        <LogoPlaceholder name="Partner 2" />
      </LogoCloudItem>
      <LogoCloudItem name="Partner 3">
        <LogoPlaceholder name="Partner 3" />
      </LogoCloudItem>
      <LogoCloudItem name="Partner 4">
        <LogoPlaceholder name="Partner 4" />
      </LogoCloudItem>
    </LogoCloud>
  ),
}

export const Bordered: Story = {
  parameters: { docs: { description: { story: "Bordered variant with full-color logos (grayscale disabled)." } } },
  render: () => (
    <LogoCloud variant="bordered" size="lg">
      <LogoCloudItem name="Brand A" grayscale={false}>
        <LogoPlaceholder name="Brand A" />
      </LogoCloudItem>
      <LogoCloudItem name="Brand B" grayscale={false}>
        <LogoPlaceholder name="Brand B" />
      </LogoCloudItem>
      <LogoCloudItem name="Brand C" grayscale={false}>
        <LogoPlaceholder name="Brand C" />
      </LogoCloudItem>
    </LogoCloud>
  ),
}

export const WithLinks: Story = {
  parameters: { docs: { description: { story: "Logo items with href links that open in a new tab." } } },
  render: () => (
    <LogoCloud title="Featured in">
      <LogoCloudItem name="TechCrunch" href="https://techcrunch.com">
        <LogoPlaceholder name="TechCrunch" />
      </LogoCloudItem>
      <LogoCloudItem name="Forbes" href="https://forbes.com">
        <LogoPlaceholder name="Forbes" />
      </LogoCloudItem>
      <LogoCloudItem name="Wired" href="https://wired.com">
        <LogoPlaceholder name="Wired" />
      </LogoCloudItem>
    </LogoCloud>
  ),
}
