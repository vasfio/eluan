import type { Meta, StoryObj } from "@storybook/react";
import { HeaderNavigation } from "@/components/header-navigation";
import { Button } from "@/components/button";

const meta: Meta<typeof HeaderNavigation> = {
  title: "Marketing/HeaderNavigation",
  component: HeaderNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof HeaderNavigation>;

const defaultItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const Default: Story = {
  args: {
    logo: (
      <a href="/" className="text-xl font-bold">
        Acme Inc
      </a>
    ),
    items: defaultItems,
    actions: (
      <>
        <Button variant="ghost">Sign In</Button>
        <Button>Get Started</Button>
      </>
    ),
  },
};

export const Sticky: Story = {
  render: () => (
    <div className="h-[200vh]">
      <HeaderNavigation
        sticky
        logo={
          <a href="/" className="text-xl font-bold">
            Acme Inc
          </a>
        }
        items={defaultItems}
        actions={
          <>
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </>
        }
      />
      <div className="container mx-auto p-8">
        <p className="text-muted-foreground">
          Scroll down to see the sticky header in action...
        </p>
        <div className="mt-8 h-[150vh] rounded-lg bg-muted" />
      </div>
    </div>
  ),
};

export const WithActiveItem: Story = {
  args: {
    logo: (
      <a href="/" className="text-xl font-bold">
        Acme Inc
      </a>
    ),
    items: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing", active: true },
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
    ],
    actions: <Button>Get Started</Button>,
  },
};

export const LogoOnly: Story = {
  args: {
    logo: (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary" />
        <span className="text-xl font-bold">Brand</span>
      </div>
    ),
    items: defaultItems,
  },
};

export const MinimalActions: Story = {
  args: {
    logo: (
      <a href="/" className="text-xl font-bold">
        Acme
      </a>
    ),
    items: [
      { label: "Docs", href: "/docs" },
      { label: "Pricing", href: "/pricing" },
    ],
    actions: <Button size="sm">Sign Up</Button>,
  },
};

export const MobileBreakpointLg: Story = {
  args: {
    logo: (
      <a href="/" className="text-xl font-bold">
        Acme Inc
      </a>
    ),
    items: defaultItems,
    actions: (
      <>
        <Button variant="ghost">Sign In</Button>
        <Button>Get Started</Button>
      </>
    ),
    mobileBreakpoint: "lg",
  },
};
