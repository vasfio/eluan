import type { Meta, StoryObj } from "@storybook/react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb"

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {
    separator: {
      description:
        "Custom separator element rendered between breadcrumb items. Defaults to a `ChevronRight` icon.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A navigation aid that displays the user's current location within a hierarchical page structure.

**Sub-components:** \`BreadcrumbList\`, \`BreadcrumbItem\`, \`BreadcrumbLink\`, \`BreadcrumbPage\`, \`BreadcrumbSeparator\`, \`BreadcrumbEllipsis\`

**Import**
\`\`\`tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  parameters: {
    docs: {
      description: {
        story: "A three-level breadcrumb trail with links and a current page indicator.",
      },
    },
  },
}

export const WithCollapsedItems: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis
            items={[
              { label: "Documentation", href: "/docs" },
              { label: "Guides", href: "/docs/guides" },
              { label: "Design System", href: "/docs/design-system" },
            ]}
          />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A breadcrumb with collapsed intermediate levels that open in a dropdown menu when the ellipsis is clicked.",
      },
    },
  },
}

export const Simple: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Current Page</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  parameters: {
    docs: {
      description: {
        story: "A minimal two-level breadcrumb with just a home link and the current page.",
      },
    },
  },
}
