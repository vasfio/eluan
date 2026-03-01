import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "@/components/link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "muted", "nav", "destructive", "unstyled"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    external: {
      control: "boolean",
    },
    showExternalIcon: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  render: () => <Link href="#">Default link</Link>,
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link href="#" variant="default">Default link</Link>
      <Link href="#" variant="muted">Muted link</Link>
      <Link href="#" variant="nav">Navigation link</Link>
      <Link href="#" variant="destructive">Destructive link</Link>
      <Link href="#" variant="unstyled">Unstyled link</Link>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link href="#" size="sm">Small link</Link>
      <Link href="#" size="default">Default link</Link>
      <Link href="#" size="lg">Large link</Link>
    </div>
  ),
};

export const ExternalLink: Story = {
  render: () => (
    <Link href="https://example.com" external>
      External link
    </Link>
  ),
};

export const ExternalWithoutIcon: Story = {
  render: () => (
    <Link href="https://example.com" external showExternalIcon={false}>
      External link without icon
    </Link>
  ),
};

export const InParagraph: Story = {
  render: () => (
    <p className="text-sm">
      This is a paragraph with a{" "}
      <Link href="#">link in the middle</Link> of the text.
      You can also have{" "}
      <Link href="https://example.com" external>
        external links
      </Link>{" "}
      within paragraphs.
    </p>
  ),
};

export const Navigation: Story = {
  render: () => (
    <nav className="flex gap-6">
      <Link href="#" variant="nav">Home</Link>
      <Link href="#" variant="nav">About</Link>
      <Link href="#" variant="nav">Products</Link>
      <Link href="#" variant="nav">Contact</Link>
    </nav>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link href="#" className="gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
        GitHub Repository
      </Link>
      <Link href="#" className="gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
        Documentation
      </Link>
    </div>
  ),
};
