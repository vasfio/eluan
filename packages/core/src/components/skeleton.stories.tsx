import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "./skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A placeholder animation component used to indicate loading content before data is available.

**Import**
\`\`\`tsx
import { Skeleton } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<Skeleton className="h-4 w-[200px]" />
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
        story: "A single skeleton line element with rounded-full shape.",
      },
    },
  },
  render: () => <Skeleton className="w-[100px] h-[20px] rounded-full" />,
}

export const Card: Story = {
  parameters: {
    docs: {
      description: {
        story: "A skeleton layout mimicking a card with an image area and two text lines.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}

export const Profile: Story = {
  parameters: {
    docs: {
      description: {
        story: "A skeleton layout mimicking a user profile with a circular avatar and text lines.",
      },
    },
  },
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}

export const TextBlock: Story = {
  parameters: {
    docs: {
      description: {
        story: "A skeleton representing a block of text with three lines of varying width.",
      },
    },
  },
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
}

export const ListItems: Story = {
  parameters: {
    docs: {
      description: {
        story: "A skeleton layout for a list with circular avatars and text placeholders per row.",
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Table: Story = {
  parameters: {
    docs: {
      description: {
        story: "A skeleton layout for a data table with a header row and four body rows.",
      },
    },
  },
  render: () => (
    <div className="space-y-3">
      <div className="flex gap-4">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-8 w-1/4" />
        </div>
      ))}
    </div>
  ),
}
