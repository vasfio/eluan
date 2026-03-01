import type { Meta, StoryObj } from "@storybook/react"
import { Media, MediaImage, MediaVideo, MediaFigure, MediaCaption } from "./media"

const meta: Meta<typeof Media> = {
  title: "Components/Media",
  component: Media,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Image: Story = {
  render: () => (
    <Media className="max-w-md">
      <MediaImage
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Sample image"
      />
    </Media>
  ),
}

export const WithCaption: Story = {
  render: () => (
    <MediaFigure className="max-w-md">
      <MediaImage
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Sample image"
      />
      <MediaCaption>Photo by Drew Beamer on Unsplash</MediaCaption>
    </MediaFigure>
  ),
}

export const Video: Story = {
  render: () => (
    <Media className="max-w-md">
      <MediaVideo
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
      />
    </Media>
  ),
}

export const Rounded: Story = {
  render: () => (
    <Media className="max-w-md">
      <MediaImage
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Sample image"
        className="rounded-lg"
      />
    </Media>
  ),
}
