import type { Meta, StoryObj } from "@storybook/react"
import {
  ShaderGradient,
  ShaderAurora,
  ShaderBlob,
  ShaderNoise,
  ShaderWave,
  ShaderMesh,
  ShaderParticles,
  ShaderBackground,
  ShaderHero,
  ShaderCard,
} from "./shader-presets"
import { Button } from "@vasf/ragnar-core"

const meta: Meta<typeof ShaderGradient> = {
  title: "Web/Shaders",
  component: ShaderGradient,
  parameters: {
    layout: "fullscreen",
    // No autodocs — rendering many WebGL contexts on one page exceeds browser limits
    docs: { disable: true },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ============================================
// Individual Shader Presets
// ============================================

export const Gradient: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ShaderGradient />
    </div>
  ),
}

export const GradientCustomColors: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ShaderGradient colors={["#ff6b6b", "#feca57", "#48dbfb"]} />
    </div>
  ),
}

export const Aurora: Story = {
  render: () => (
    <div className="h-[400px] w-full bg-black">
      <ShaderAurora />
    </div>
  ),
}

export const AuroraCustomColors: Story = {
  render: () => (
    <div className="h-[400px] w-full bg-black">
      <ShaderAurora colors={["#f093fb", "#f5576c", "#4facfe"]} />
    </div>
  ),
}

export const Blob: Story = {
  render: () => (
    <div className="h-[400px] w-full bg-black">
      <ShaderBlob />
    </div>
  ),
}

export const BlobCustomColors: Story = {
  render: () => (
    <div className="h-[400px] w-full bg-black">
      <ShaderBlob colors={["#00ff87", "#7928ca", "#ff0080"]} />
    </div>
  ),
}

export const Noise: Story = {
  render: () => (
    <div className="h-[400px] w-full bg-black">
      <ShaderNoise />
    </div>
  ),
}

export const NoiseIntense: Story = {
  render: () => (
    <div className="h-[400px] w-full bg-black">
      <ShaderNoise color="#60efff" intensity={0.5} />
    </div>
  ),
}

export const Wave: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ShaderWave />
    </div>
  ),
}

export const WaveCustomColors: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ShaderWave colors={["#00ff87", "#7b2dff"]} />
    </div>
  ),
}

export const MeshGradient: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ShaderMesh />
    </div>
  ),
}

export const MeshGradientCustomColors: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ShaderMesh colors={["#ff0080", "#7928ca", "#0070f3", "#00ff87"]} />
    </div>
  ),
}

export const Particles: Story = {
  render: () => (
    <div className="h-[400px] w-full bg-black">
      <ShaderParticles />
    </div>
  ),
}

export const ParticlesCustomColors: Story = {
  render: () => (
    <div className="h-[400px] w-full bg-black">
      <ShaderParticles colors={["#ff6b6b", "#feca57"]} />
    </div>
  ),
}

// ============================================
// All Presets Gallery
// ============================================

export const AllPresets: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-3">
      {[
        { label: "Gradient", el: <ShaderGradient /> },
        { label: "Aurora", el: <ShaderAurora />, bg: "bg-black" },
        { label: "Blob", el: <ShaderBlob />, bg: "bg-black" },
        { label: "Noise", el: <ShaderNoise />, bg: "bg-black" },
        { label: "Wave", el: <ShaderWave /> },
        { label: "Mesh", el: <ShaderMesh /> },
        { label: "Particles", el: <ShaderParticles />, bg: "bg-black" },
      ].map(({ label, el, bg }) => (
        <div key={label} className="flex flex-col gap-2">
          <span className="text-sm font-medium">{label}</span>
          <div className={`h-[200px] w-full overflow-hidden rounded-lg ${bg ?? ""}`}>
            {el}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ============================================
// Shader Properties
// ============================================

export const SlowSpeed: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ShaderGradient speed={0.2} />
    </div>
  ),
}

export const FastSpeed: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ShaderGradient speed={3} />
    </div>
  ),
}

export const LowIntensity: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ShaderMesh intensity={0.2} />
    </div>
  ),
}

export const HighIntensity: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ShaderMesh intensity={1.0} />
    </div>
  ),
}

export const NonInteractive: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ShaderGradient interactive={false} />
    </div>
  ),
}

export const LowQuality: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ShaderMesh quality="low" />
    </div>
  ),
}

export const HighQuality: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ShaderMesh quality="high" />
    </div>
  ),
}

// ============================================
// ShaderBackground
// ============================================

export const Background: Story = {
  render: () => (
    <ShaderBackground shader="gradient" className="h-[400px]">
      <div className="flex h-full items-center justify-center">
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">
          Shader Background
        </h2>
      </div>
    </ShaderBackground>
  ),
}

export const BackgroundWithOverlay: Story = {
  render: () => (
    <ShaderBackground shader="aurora" overlay={0.4} className="h-[400px]">
      <div className="flex h-full items-center justify-center">
        <h2 className="text-4xl font-bold text-white">
          With Dark Overlay
        </h2>
      </div>
    </ShaderBackground>
  ),
}

export const BackgroundMesh: Story = {
  render: () => (
    <ShaderBackground shader="mesh" overlay={0.2} className="h-[400px]">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-bold text-white">Mesh Background</h2>
        <p className="text-lg text-white/80">Beautiful animated mesh gradient</p>
      </div>
    </ShaderBackground>
  ),
}

// ============================================
// ShaderHero
// ============================================

export const HeroDefault: Story = {
  render: () => (
    <ShaderHero
      shader="gradient"
      title="Build the future"
      subtitle="Create stunning interfaces with animated shader backgrounds."
    />
  ),
}

export const HeroAurora: Story = {
  render: () => (
    <ShaderHero
      shader="aurora"
      title="Northern Lights"
      subtitle="Immersive aurora borealis effect for hero sections."
      size="lg"
    />
  ),
}

export const HeroMesh: Story = {
  render: () => (
    <ShaderHero
      shader="mesh"
      title="Mesh Gradients"
      subtitle="Smooth four-corner gradient animation."
      overlay={0.4}
    />
  ),
}

export const HeroLeftAligned: Story = {
  render: () => (
    <ShaderHero
      shader="wave"
      title="Wave Motion"
      subtitle="Dynamic wave animation with customizable colors."
      align="left"
      size="sm"
    />
  ),
}

export const HeroFullScreen: Story = {
  render: () => (
    <ShaderHero
      shader="gradient"
      title="Full Screen Hero"
      subtitle="Takes up the entire viewport height."
      size="full"
      colors={["#ff0080", "#7928ca", "#0070f3"]}
    >
      <div className="mt-8 flex gap-4">
        <Button size="lg" className="bg-white text-black hover:bg-white/90">
          Get Started
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-white text-white hover:bg-white/10"
        >
          Learn More
        </Button>
      </div>
    </ShaderHero>
  ),
}

export const HeroWithActions: Story = {
  render: () => (
    <ShaderHero
      shader="blob"
      title="Interactive Blobs"
      subtitle="Move your mouse to interact with the shader."
      overlay={0.5}
    >
      <div className="mt-8 flex gap-4">
        <Button size="lg" className="bg-white text-black hover:bg-white/90">
          Try it Now
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-white text-white hover:bg-white/10"
        >
          View Source
        </Button>
      </div>
    </ShaderHero>
  ),
}

// ============================================
// ShaderCard
// ============================================

export const CardDefault: Story = {
  render: () => (
    <div className="p-8">
      <ShaderCard shader="mesh" className="max-w-md">
        <h3 className="text-2xl font-bold text-white">Shader Card</h3>
        <p className="mt-2 text-white/80">
          A card with an animated shader background. Great for feature
          highlights or premium content sections.
        </p>
      </ShaderCard>
    </div>
  ),
}

export const CardGradient: Story = {
  render: () => (
    <div className="p-8">
      <ShaderCard shader="gradient" overlay={0.3} className="max-w-md">
        <h3 className="text-2xl font-bold text-white">Gradient Card</h3>
        <p className="mt-2 text-white/80">
          Smooth animated gradient as a card background.
        </p>
      </ShaderCard>
    </div>
  ),
}

export const CardWave: Story = {
  render: () => (
    <div className="p-8">
      <ShaderCard shader="wave" overlay={0.4} className="max-w-md">
        <h3 className="text-2xl font-bold text-white">Wave Card</h3>
        <p className="mt-2 text-white/80">
          Dynamic wave animation as the card background.
        </p>
      </ShaderCard>
    </div>
  ),
}

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-3">
      <ShaderCard shader="gradient" overlay={0.4}>
        <h3 className="text-xl font-bold text-white">Performance</h3>
        <p className="mt-2 text-sm text-white/70">
          Optimized WebGL shaders running at 60fps.
        </p>
      </ShaderCard>
      <ShaderCard shader="mesh" overlay={0.4}>
        <h3 className="text-xl font-bold text-white">Customizable</h3>
        <p className="mt-2 text-sm text-white/70">
          Custom colors, speed, intensity, and more.
        </p>
      </ShaderCard>
      <ShaderCard shader="aurora" overlay={0.4}>
        <h3 className="text-xl font-bold text-white">Interactive</h3>
        <p className="mt-2 text-sm text-white/70">
          Mouse-reactive animations out of the box.
        </p>
      </ShaderCard>
    </div>
  ),
}

export const CardLargePadding: Story = {
  render: () => (
    <div className="p-8">
      <ShaderCard shader="mesh" padding="lg" overlay={0.5} className="max-w-lg">
        <h3 className="text-3xl font-bold text-white">Extra Padding</h3>
        <p className="mt-3 text-lg text-white/80">
          More breathing room for the content inside the card.
        </p>
        <div className="mt-6">
          <Button className="bg-white text-black hover:bg-white/90">
            Learn More
          </Button>
        </div>
      </ShaderCard>
    </div>
  ),
}

export const CardRounded: Story = {
  render: () => (
    <div className="flex gap-6 p-8">
      <ShaderCard shader="gradient" rounded="sm" className="w-48 h-48" overlay={0.3}>
        <p className="text-sm text-white">Small radius</p>
      </ShaderCard>
      <ShaderCard shader="gradient" rounded="xl" className="w-48 h-48" overlay={0.3}>
        <p className="text-sm text-white">XL radius</p>
      </ShaderCard>
      <ShaderCard shader="gradient" rounded="full" className="w-48 h-48 flex items-center justify-center" overlay={0.3}>
        <p className="text-sm text-white text-center">Full radius</p>
      </ShaderCard>
    </div>
  ),
}
