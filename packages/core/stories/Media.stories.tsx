import type { Meta, StoryObj } from "@storybook/react";
import { Image, Video } from "@/components/media";

const meta: Meta<typeof Image> = {
  title: "Components/Media",
  component: Image,
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: "select",
      options: ["auto", "square", "video", "portrait", "wide"],
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const ImageDefault: Story = {
  render: () => (
    <Image
      src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800"
      alt="Beautiful landscape"
      className="w-[400px]"
    />
  ),
};

export const ImageRatios: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[600px]">
      <div>
        <p className="text-sm mb-2">Square</p>
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400"
          alt="Square"
          ratio="square"
        />
      </div>
      <div>
        <p className="text-sm mb-2">Video (16:9)</p>
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400"
          alt="Video ratio"
          ratio="video"
        />
      </div>
      <div>
        <p className="text-sm mb-2">Portrait (3:4)</p>
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400"
          alt="Portrait"
          ratio="portrait"
          className="w-[200px]"
        />
      </div>
      <div>
        <p className="text-sm mb-2">Wide (21:9)</p>
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400"
          alt="Wide"
          ratio="wide"
        />
      </div>
    </div>
  ),
};

export const ImageRounded: Story = {
  render: () => (
    <div className="flex gap-4">
      <Image
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=200"
        alt="None"
        ratio="square"
        rounded="none"
        className="w-24"
      />
      <Image
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=200"
        alt="Small"
        ratio="square"
        rounded="sm"
        className="w-24"
      />
      <Image
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=200"
        alt="Medium"
        ratio="square"
        rounded="md"
        className="w-24"
      />
      <Image
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=200"
        alt="Large"
        ratio="square"
        rounded="lg"
        className="w-24"
      />
      <Image
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=200"
        alt="Full"
        ratio="square"
        rounded="full"
        className="w-24"
      />
    </div>
  ),
};

export const ImageWithFallback: Story = {
  render: () => (
    <Image
      src="/broken-image.jpg"
      alt="Broken image"
      ratio="video"
      className="w-[400px]"
      fallback={
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <span className="text-sm">Image not found</span>
        </div>
      }
    />
  ),
};

export const VideoDefault: Story = {
  render: () => (
    <Video
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
      className="w-[500px]"
    />
  ),
};

export const VideoAutoplay: Story = {
  render: () => (
    <Video
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
      className="w-[500px]"
      autoPlay
      muted
      loop
    />
  ),
};

export const VideoNoControls: Story = {
  render: () => (
    <Video
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
      className="w-[500px]"
      showControls={false}
      autoPlay
      muted
      loop
    />
  ),
};

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[600px]">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Image
          key={i}
          src={`https://picsum.photos/seed/${i}/300/300`}
          alt={`Gallery image ${i}`}
          ratio="square"
          rounded="lg"
          className="cursor-pointer transition-transform hover:scale-105"
        />
      ))}
    </div>
  ),
};
