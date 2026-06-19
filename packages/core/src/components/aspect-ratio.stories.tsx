import type { Meta, StoryObj } from "@storybook/react"
import { AspectRatio } from "./aspect-ratio"

const MeshGradient = () => (
  <div
    style={{
      borderRadius: "var(--curves-md)",
      background: `
        radial-gradient(at 40% 20%, var(--action-primary-bg) 0px, transparent 50%),
        radial-gradient(at 80% 0%, var(--informative-bg) 0px, transparent 50%),
        radial-gradient(at 0% 50%, var(--positive-bg) 0px, transparent 50%),
        radial-gradient(at 80% 50%, var(--cautionary-bg) 0px, transparent 50%),
        radial-gradient(at 0% 100%, var(--action-primary-bg) 0px, transparent 50%),
        var(--backgrounds-secondary)
      `,
      height: "100%",
      width: "100%",
    }}
  />
)

const meta: Meta<typeof AspectRatio> = {
  title: "Components/Aspect Ratio",
  component: AspectRatio,
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      description: "The desired width-to-height ratio (e.g. 16/9, 4/3, 1).",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A layout primitive that enforces a consistent width-to-height ratio for its child content.

**Import**
\`\`\`tsx
import { AspectRatio } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<AspectRatio ratio={16 / 9}>
  <img src="photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>
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
        story: "A 16:9 aspect ratio container displaying a mesh gradient using theme colors.",
      },
    },
  },
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <MeshGradient />
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  parameters: {
    docs: {
      description: {
        story: "A 1:1 square aspect ratio container.",
      },
    },
  },
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1}>
        <MeshGradient />
      </AspectRatio>
    </div>
  ),
}

export const Portrait: Story = {
  parameters: {
    docs: {
      description: {
        story: "A 3:4 portrait aspect ratio container.",
      },
    },
  },
  render: () => (
    <div className="w-[200px]">
      <AspectRatio ratio={3 / 4}>
        <MeshGradient />
      </AspectRatio>
    </div>
  ),
}

export const Ratios: Story = {
  parameters: {
    docs: {
      description: {
        story: "A side-by-side comparison of 16:9, 4:3, and 1:1 aspect ratios.",
      },
    },
  },
  render: () => (
    <div className="flex gap-[var(--spacing-md)]">
      <div className="w-[200px]">
        <p className="text-[length:var(--font-size-sm)] mb-[var(--spacing-xs)]">16:9</p>
        <AspectRatio ratio={16 / 9}>
          <MeshGradient />
        </AspectRatio>
      </div>
      <div className="w-[200px]">
        <p className="text-[length:var(--font-size-sm)] mb-[var(--spacing-xs)]">4:3</p>
        <AspectRatio ratio={4 / 3}>
          <MeshGradient />
        </AspectRatio>
      </div>
      <div className="w-[200px]">
        <p className="text-[length:var(--font-size-sm)] mb-[var(--spacing-xs)]">1:1</p>
        <AspectRatio ratio={1}>
          <MeshGradient />
        </AspectRatio>
      </div>
    </div>
  ),
}
