import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  VideoPlayer,
  YouTubeEmbed,
  VimeoEmbed,
  VideoModal,
} from "./video-player"
import { Button } from "@vasf/ragnar-core"

const meta: Meta<typeof VideoPlayer> = {
  title: "Web/VideoPlayer",
  component: VideoPlayer,
  // Disable autodocs - video embeds cause memory issues when pre-rendered
  parameters: {
    docs: {
      description: {
        component: `
A video player component with play overlay, custom controls, and embed support for YouTube and Vimeo, plus a fullscreen video modal.

**Import**
\`\`\`tsx
import { VideoPlayer, YouTubeEmbed, VimeoEmbed, VideoModal } from "@vasf/ragnar-web"
\`\`\`

**Usage**
\`\`\`tsx
<VideoPlayer src="/video.mp4" poster="/poster.jpg" aspectRatio="video" rounded="lg" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    src: {
      description: "Video source URL.",
    },
    poster: {
      description: "Poster image URL shown before playback.",
    },
    showControls: {
      description: "Whether to show native video controls during playback.",
    },
    showPlayButton: {
      description: "Whether to show the play button overlay.",
    },
    rounded: {
      description: "Corner radius: none, sm, md, lg, xl, or 2xl.",
    },
    aspectRatio: {
      description: "Aspect ratio: video, square, 4/3, 21/9, or auto.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Using a sample video URL (Big Buck Bunny - open source)
const sampleVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
const samplePoster = "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"

export const Default: Story = {
  parameters: { docs: { description: { story: "Default video player with a poster image and play button overlay." } } },
  render: () => (
    <div className="max-w-3xl mx-auto">
      <VideoPlayer
        src={sampleVideoUrl}
        poster={samplePoster}
      />
    </div>
  ),
}

export const AutoPlay: Story = {
  parameters: { docs: { description: { story: "Auto-playing muted video in a loop without the play button overlay." } } },
  render: () => (
    <div className="max-w-3xl mx-auto">
      <VideoPlayer
        src={sampleVideoUrl}
        autoPlay
        muted
        loop
        showPlayButton={false}
      />
    </div>
  ),
}

export const YouTube: Story = {
  parameters: { docs: { description: { story: "YouTube video embed with lazy loading and thumbnail preview." } } },
  render: () => (
    <div className="max-w-3xl mx-auto">
      <YouTubeEmbed videoId="dQw4w9WgXcQ" />
    </div>
  ),
}

export const Vimeo: Story = {
  parameters: { docs: { description: { story: "Vimeo video embed." } } },
  render: () => (
    <div className="max-w-3xl mx-auto">
      <VimeoEmbed videoId="824804225" />
    </div>
  ),
}

export const AspectRatios: Story = {
  parameters: { docs: { description: { story: "Comparing video, square, and cinematic (21:9) aspect ratios." } } },
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Video (16:9)</p>
        <VideoPlayer src={sampleVideoUrl} poster={samplePoster} aspectRatio="video" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Square</p>
        <div className="max-w-sm">
          <VideoPlayer src={sampleVideoUrl} poster={samplePoster} aspectRatio="square" />
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Cinematic (21:9)</p>
        <VideoPlayer src={sampleVideoUrl} poster={samplePoster} aspectRatio="21/9" />
      </div>
    </div>
  ),
}

export const RoundedVariants: Story = {
  parameters: { docs: { description: { story: "Corner radius variants from none to 2xl." } } },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">None</p>
        <VideoPlayer src={sampleVideoUrl} poster={samplePoster} rounded="none" aspectRatio="square" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Large</p>
        <VideoPlayer src={sampleVideoUrl} poster={samplePoster} rounded="lg" aspectRatio="square" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">2XL</p>
        <VideoPlayer src={sampleVideoUrl} poster={samplePoster} rounded="2xl" aspectRatio="square" />
      </div>
    </div>
  ),
}

export const Modal: Story = {
  parameters: { docs: { description: { story: "A button that opens a fullscreen video modal with escape-to-close." } } },
  render: function ModalStory() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Video Modal</Button>
        <VideoModal
          src={sampleVideoUrl}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Sample Video"
        />
      </div>
    )
  },
}

export const BackgroundVideo: Story = {
  parameters: { docs: { description: { story: "Video used as a background behind a hero overlay." } } },
  render: () => (
    <div className="relative h-[400px] overflow-hidden rounded-xl">
      <VideoPlayer
        src={sampleVideoUrl}
        autoPlay
        muted
        loop
        showPlayButton={false}
        showControls={false}
        rounded="none"
        aspectRatio="auto"
        className="absolute inset-0 h-full w-full object-cover"
        containerClassName="absolute inset-0"
      />
      <div className="relative z-10 flex h-full items-center justify-center bg-black/40">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Hero Section</h2>
          <p className="mt-2 text-lg opacity-80">With background video</p>
        </div>
      </div>
    </div>
  ),
}
