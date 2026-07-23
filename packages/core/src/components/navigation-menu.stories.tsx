import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu"
import { Button } from "./button"

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/Navigation Menu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A horizontal navigation menu with dropdown content panels, animated transitions, and support for trigger items and direct links. Built on Radix; the open trigger's chevron rotates to point up.

**Import**
\`\`\`tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Clothing</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* megamenu grid of NavigationMenuLink items */}
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
        Sale
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * A single megamenu link. Hover/focus state is handled in JS because Storybook
 * stories use inline styles (which cannot express `:hover`); all values are
 * pulled from design tokens.
 */
const MegaLink = ({
  children,
  href = "#",
}: {
  children: React.ReactNode
  href?: string
}) => {
  const [active, setActive] = React.useState(false)
  return (
    <NavigationMenuLink asChild>
      <a
        href={href}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        style={{
          backgroundColor: active ? "var(--interactive-bg-hover)" : "transparent",
          borderRadius: "var(--curves-md)",
          color: active ? "var(--interactive-fg)" : "var(--container-fg)",
          display: "block",
          fontSize: "var(--font-size-sm)",
          padding: "var(--spacing-sm) var(--spacing-md)",
          textDecoration: "none",
          transitionDuration: "150ms",
          transitionProperty: "background-color, color",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {children}
      </a>
    </NavigationMenuLink>
  )
}

/** A labelled column of megamenu links. */
const MegaColumn = ({
  heading,
  links,
}: {
  heading: string
  links: string[]
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "var(--spacing-xxs)",
    }}
  >
    <div
      style={{
        color: "var(--container-fg-alt)",
        fontSize: "var(--font-size-xs)",
        fontWeight: 400,
        marginBottom: "var(--spacing-xxs)",
        padding: "0 var(--spacing-md)",
      }}
    >
      {heading}
    </div>
    {links.map((label) => (
      <MegaLink key={label}>{label}</MegaLink>
    ))}
  </div>
)

/**
 * Top-left wrapper so the menu bar sits at the top of the frame and its panels
 * open anchored beneath it. The bottom room reserves space for the tallest open
 * panel (the Clothing megamenu) so it is never clipped.
 */
const StoryFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      paddingTop: "var(--spacing-lg)",
      paddingInline: "var(--spacing-lg)",
      paddingBottom: 340,
    }}
  >
    {children}
  </div>
)

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "An e-commerce megamenu: category triggers open multi-column panels of links, one with a featured card, alongside a plain Sale link.",
      },
    },
  },
  render: () => (
    <StoryFrame>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Clothing</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div
                style={{
                  display: "grid",
                  gap: "var(--spacing-lg)",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr)) 15rem",
                  width: 720,
                }}
              >
                <MegaColumn
                  heading="Men"
                  links={["T-Shirts", "Shirts", "Jeans", "Jackets", "Shoes"]}
                />
                <MegaColumn
                  heading="Women"
                  links={["Dresses", "Tops", "Skirts", "Knitwear", "Shoes"]}
                />
                <MegaColumn
                  heading="Kids"
                  links={["Tops", "Bottoms", "Outerwear", "Footwear"]}
                />
                <div
                  style={{
                    backgroundColor: "var(--container-bg-alt)",
                    borderRadius: "var(--curves-md)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-sm)",
                    padding: "var(--spacing-lg)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--container-fg)",
                      fontSize: "var(--font-size-base)",
                      fontWeight: 500,
                    }}
                  >
                    Summer Collection
                  </div>
                  <p
                    style={{
                      color: "var(--container-fg-alt)",
                      fontSize: "var(--font-size-sm)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    Lightweight linens and breezy essentials, just in for the
                    season.
                  </p>
                  <div style={{ marginTop: "var(--spacing-xs)" }}>
                    <Button variant="link">Shop now</Button>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Electronics</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div
                style={{
                  display: "grid",
                  gap: "var(--spacing-lg)",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  width: 600,
                }}
              >
                <MegaColumn
                  heading="Computing"
                  links={[
                    "Laptops",
                    "Desktops",
                    "Monitors",
                    "Keyboards",
                    "Storage",
                  ]}
                />
                <MegaColumn
                  heading="Audio"
                  links={["Headphones", "Earbuds", "Speakers", "Turntables"]}
                />
                <MegaColumn
                  heading="Mobile"
                  links={[
                    "Smartphones",
                    "Tablets",
                    "Smartwatches",
                    "Chargers",
                  ]}
                />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Home &amp; Living</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div
                style={{
                  display: "grid",
                  gap: "var(--spacing-lg)",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  width: 600,
                }}
              >
                <MegaColumn
                  heading="Kitchen"
                  links={["Cookware", "Utensils", "Appliances", "Storage"]}
                />
                <MegaColumn
                  heading="Bedroom"
                  links={["Bedding", "Pillows", "Mattresses", "Lighting"]}
                />
                <MegaColumn
                  heading="Decor"
                  links={["Wall Art", "Rugs", "Plants", "Candles"]}
                />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="#"
            >
              Sale
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </StoryFrame>
  ),
}

export const Simple: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A simple navigation menu with direct links and no dropdown content.",
      },
    },
  },
  render: () => (
    <StoryFrame>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="#"
            >
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="#"
            >
              Shop
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="#"
            >
              Sale
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="#"
            >
              Contact
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </StoryFrame>
  ),
}
