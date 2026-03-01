import type { Meta, StoryObj } from "@storybook/react"
import { LogoCloud, LogoCloudItem } from "./logo-cloud"

const meta: Meta<typeof LogoCloud> = {
  title: "Web/LogoCloud",
  component: LogoCloud,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="flex h-8 w-24 items-center justify-center rounded bg-muted text-xs font-medium text-muted-foreground">
    {name}
  </div>
)

export const Default: Story = {
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
