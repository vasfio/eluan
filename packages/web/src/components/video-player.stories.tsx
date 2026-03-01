import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  VideoPlayer,
  YouTubeEmbed,
  VimeoEmbed,
  VideoModal,
} from "./video-player"
import { Button } from "@ragnar/core"

const meta: Meta<typeof VideoPlayer> = {
  title: "Web/VideoPlayer",
  component: VideoPlayer,
  // Disable autodocs - video embeds cause memory issues when pre-rendered
}

export default meta
type Story = StoryObj<typeof meta>

// Using a sample video URL (Big Buck Bunny - open source)
const sampleVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
const samplePoster = "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"

export const Default: Story = {
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
  render: () => (
    <div className="max-w-3xl mx-auto">
      <YouTubeEmbed videoId="dQw4w9WgXcQ" />
    </div>
  ),
}

export const Vimeo: Story = {
  render: () => (
    <div className="max-w-3xl mx-auto">
      <VimeoEmbed videoId="824804225" />
    </div>
  ),
}

export const AspectRatios: Story = {
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
