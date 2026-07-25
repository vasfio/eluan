import type { Meta, StoryObj } from "@storybook/react"
import {
  Footer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLinks,
  FooterLink,
  FooterBottom,
  FooterCopyright,
} from "../index"

const meta: Meta<typeof Footer> = {
  title: "Web/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
\`Footer\` and its composable sub-parts are re-exported from \`@eluan/core\` through the
\`@eluan/web\` compatibility facade. Compose \`FooterContent\` → \`FooterSection\` →
\`FooterTitle\` / \`FooterLinks\` / \`FooterLink\`, with a \`FooterBottom\` row for copyright.

**Import**
\`\`\`tsx
import {
  Footer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLinks,
  FooterLink,
  FooterBottom,
  FooterCopyright,
} from "@eluan/web"
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "Visual style: default (bordered top) or modern (dark inverse).",
    },
    size: { description: "Vertical padding: sm, default, or lg." },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const columns = (
  <FooterContent>
    <FooterSection>
      <FooterTitle>Product</FooterTitle>
      <FooterLinks>
        <FooterLink href="#">Features</FooterLink>
        <FooterLink href="#">Pricing</FooterLink>
        <FooterLink href="#">Documentation</FooterLink>
        <FooterLink href="#">Changelog</FooterLink>
      </FooterLinks>
    </FooterSection>
    <FooterSection>
      <FooterTitle>Company</FooterTitle>
      <FooterLinks>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Blog</FooterLink>
        <FooterLink href="#">Careers</FooterLink>
      </FooterLinks>
    </FooterSection>
    <FooterSection>
      <FooterTitle>Resources</FooterTitle>
      <FooterLinks>
        <FooterLink href="#">Support</FooterLink>
        <FooterLink href="#">Community</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinks>
    </FooterSection>
  </FooterContent>
)

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Multi-column footer with link sections and a copyright row.",
      },
    },
  },
  render: () => (
    <Footer>
      {columns}
      <FooterBottom>
        <FooterCopyright>© 2026 Eluan</FooterCopyright>
      </FooterBottom>
    </Footer>
  ),
}

export const Modern: Story = {
  parameters: {
    docs: {
      description: {
        story: "The dark `modern` variant with a full-bleed brand wordmark.",
      },
    },
  },
  render: () => (
    <Footer variant="modern" wordmark="ELUAN">
      {columns}
      <FooterBottom>
        <FooterCopyright>© 2026 Eluan</FooterCopyright>
      </FooterBottom>
    </Footer>
  ),
}
