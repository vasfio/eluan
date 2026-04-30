import type { Meta, StoryObj } from "@storybook/react"
import {
  GoogleMapEmbed,
  OpenStreetMapEmbed,
  MapWithInfo,
} from "./map-embed"

const meta: Meta<typeof GoogleMapEmbed> = {
  title: "Web/MapEmbed",
  component: GoogleMapEmbed,
  // Disable autodocs - map iframes cause memory issues when pre-rendered
  parameters: {
    docs: {
      description: {
        component: `
Embeddable map components for Google Maps and OpenStreetMap with configurable aspect ratios, rounded corners, and an optional info card overlay.

**Import**
\`\`\`tsx
import { GoogleMapEmbed, OpenStreetMapEmbed, MapWithInfo } from "@vasf/ragnar-web"
\`\`\`

**Usage**
\`\`\`tsx
<GoogleMapEmbed query="Empire State Building, New York" zoom={15} aspectRatio="video" rounded="lg" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    query: {
      description: "Place query (address or place name) for the map embed.",
    },
    zoom: {
      description: "Zoom level from 1 to 21 (default: 15).",
    },
    mapType: {
      description: "Map type: roadmap or satellite.",
    },
    rounded: {
      description: "Corner radius: none, sm, md, lg, xl, or 2xl.",
    },
    aspectRatio: {
      description: "Aspect ratio: auto, video, square, 4/3, or 3/2.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Google: Story = {
  parameters: { docs: { description: { story: "Google Maps embed of a specific location." } } },
  render: () => (
    <div className="max-w-3xl mx-auto">
      <GoogleMapEmbed
        query="Empire State Building, New York"
        zoom={15}
      />
    </div>
  ),
}

export const OpenStreetMap: Story = {
  parameters: { docs: { description: { story: "OpenStreetMap embed using latitude/longitude coordinates with a marker." } } },
  render: () => (
    <div className="max-w-3xl mx-auto">
      <OpenStreetMapEmbed
        lat={40.7484}
        lng={-73.9857}
        zoom={15}
        marker="Empire State Building"
      />
    </div>
  ),
}

export const WithInfoCard: Story = {
  parameters: { docs: { description: { story: "MapWithInfo overlay displaying address, phone, email, hours, and directions." } } },
  render: () => (
    <div className="max-w-3xl mx-auto">
      <MapWithInfo
        address="350 5th Ave, New York, NY 10118"
        phone="+1 (212) 736-3100"
        email="info@example.com"
        hours="Mon-Sun: 8 AM - 2 AM"
        directionsUrl="https://maps.google.com"
      >
        <GoogleMapEmbed
          query="Empire State Building, New York"
          zoom={16}
          aspectRatio="4/3"
        />
      </MapWithInfo>
    </div>
  ),
}

export const AspectRatios: Story = {
  parameters: { docs: { description: { story: "Comparing different aspect ratio options: video, square, and 4:3." } } },
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Video (16:9)</p>
        <GoogleMapEmbed query="Central Park, New York" aspectRatio="video" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Square (1:1)</p>
        <div className="max-w-sm">
          <GoogleMapEmbed query="Central Park, New York" aspectRatio="square" />
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">4:3</p>
        <GoogleMapEmbed query="Central Park, New York" aspectRatio="4/3" />
      </div>
    </div>
  ),
}

export const RoundedVariants: Story = {
  parameters: { docs: { description: { story: "Comparing corner radius options from none to 2xl." } } },
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-3xl">
      <div>
        <p className="text-sm text-muted-foreground mb-2">None</p>
        <GoogleMapEmbed query="NYC" rounded="none" aspectRatio="square" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Medium</p>
        <GoogleMapEmbed query="NYC" rounded="md" aspectRatio="square" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">2XL</p>
        <GoogleMapEmbed query="NYC" rounded="2xl" aspectRatio="square" />
      </div>
    </div>
  ),
}

export const SatelliteView: Story = {
  parameters: { docs: { description: { story: "Satellite map type for aerial imagery." } } },
  render: () => (
    <div className="max-w-3xl mx-auto">
      <GoogleMapEmbed
        query="Grand Canyon, Arizona"
        zoom={12}
        mapType="satellite"
      />
    </div>
  ),
}
