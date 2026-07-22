import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel"
import { Card, CardContent } from "./card"

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      description:
        'The scroll direction of the carousel. Options: `"horizontal"` (default) or `"vertical"`.',
    },
    opts: {
      description: "Embla Carousel options forwarded to the underlying carousel engine.",
    },
    plugins: {
      description: "Embla Carousel plugins for autoplay, drag-free scrolling, etc.",
    },
    setApi: {
      description: "Callback that receives the Embla Carousel API instance for external control.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A scrollable content carousel powered by Embla Carousel with previous/next navigation controls.

**Sub-components:** \`CarouselContent\`, \`CarouselItem\`, \`CarouselPrevious\`, \`CarouselNext\`

**Import**
\`\`\`tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const slideStyle: React.CSSProperties = {
  alignItems: "center",
  aspectRatio: "1 / 1",
  display: "flex",
  fontSize: "var(--font-size-3xl)",
  fontWeight: 600,
  justifyContent: "center",
}


export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 320, marginInline: "var(--size-xl)" }}>
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent>
                  <div style={slideStyle}>{index + 1}</div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A horizontal carousel showing one card per slide with previous/next controls.",
      },
    },
  },
}

export const MultipleItems: Story = {
  render: () => (
    <div style={{ maxWidth: 384, marginInline: "var(--size-xl)" }}>
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} basis="third">
              <Card>
                <CardContent>
                  <div style={slideStyle}>{index + 1}</div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A carousel displaying multiple items per viewport using the CarouselItem basis prop.",
      },
    },
  },
}

export const Vertical: Story = {
  render: () => (
    <div style={{ maxWidth: 320, marginBlock: "var(--size-xl)", marginInline: "auto" }}>
      <Carousel orientation="vertical">
        <CarouselContent viewportHeight={200}>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} basis="half">
              <Card>
                <CardContent>
                  <div style={{ ...slideStyle, aspectRatio: "auto" }}>{index + 1}</div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A vertically-oriented carousel that scrolls slides along the y-axis.",
      },
    },
  },
}
