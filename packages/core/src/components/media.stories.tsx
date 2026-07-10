import type { Meta, StoryObj } from "@storybook/react"
import { Image, Video } from "./media"

const meta: Meta<typeof Image> = {
  title: "Components/Media",
  component: Image,
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      description:
        'Aspect ratio preset for the media container. Options: `"auto"` (default), `"square"`, `"video"`, `"portrait"`, `"wide"`.',
    },
    rounded: {
      description:
        'Border radius variant. Options: `"none"`, `"sm"`, `"md"` (default), `"lg"`, `"xl"`, `"full"`.',
    },
    fallback: {
      description: "React node displayed when the image fails to load.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Media components for displaying images and videos with built-in aspect ratios, loading states, fallback support, and custom video controls.

**Components:** \`Image\`, \`Video\`

**Import**
\`\`\`tsx
import { Image, Video } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Image src="/photo.jpg" alt="Description" ratio="video" rounded="md" />
<Video src="/clip.mp4" ratio="video" showControls />
\`\`\`
        `,
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "An image rendered with the video aspect ratio and default medium border radius.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "A square image with extra-large border radius for a rounded card look.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Demonstrates the fallback slot rendered when an image source fails to load.",
      },
    },
  },
}

export const VideoDefault: Story = {
  render: () => (
    <Video
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      ratio="video"
      className="max-w-md"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "A video player with custom overlay controls (play/pause, mute, fullscreen) shown on hover.",
      },
    },
  },
}
