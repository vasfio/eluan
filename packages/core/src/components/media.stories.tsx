import type { Meta, StoryObj } from "@storybook/react"
import { Image, Video } from "./media"

const meta: Meta<typeof Image> = {
  title: "Components/Media",
  component: Image,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const ImageDefault: Story = {
  render: () => (
    <Image
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      alt="Sample image"
      ratio="video"
      className="max-w-md"
    />
  ),
}

export const ImageRounded: Story = {
  render: () => (
    <Image
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      alt="Sample image"
      ratio="square"
      rounded="xl"
      className="max-w-xs"
    />
  ),
}

export const ImageWithFallback: Story = {
  render: () => (
    <Image
      src="https://broken-url.invalid/image.jpg"
      alt="Broken image"
      ratio="video"
      fallback={<span className="text-muted-foreground text-sm">Image unavailable</span>}
      className="max-w-md"
    />
  ),
}

export const VideoDefault: Story = {
  render: () => (
    <Video
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      ratio="video"
      className="max-w-md"
    />
  ),
}
