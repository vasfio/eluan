import type { Meta, StoryObj } from "@storybook/react"
import { AspectRatio } from "./aspect-ratio"

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1} className="bg-muted">
        <div className="flex items-center justify-center w-full h-full text-muted-foreground">
          1:1 Ratio
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Portrait: Story = {
  render: () => (
    <div className="w-[200px]">
      <AspectRatio ratio={3 / 4} className="bg-muted">
        <div className="flex items-center justify-center w-full h-full text-muted-foreground">
          3:4 Ratio
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Ratios: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-[200px]">
        <p className="text-sm mb-2">16:9</p>
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-md" />
      </div>
      <div className="w-[200px]">
        <p className="text-sm mb-2">4:3</p>
        <AspectRatio ratio={4 / 3} className="bg-muted rounded-md" />
      </div>
      <div className="w-[200px]">
        <p className="text-sm mb-2">1:1</p>
        <AspectRatio ratio={1} className="bg-muted rounded-md" />
      </div>
    </div>
  ),
}
