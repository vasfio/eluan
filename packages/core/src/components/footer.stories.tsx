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
  FooterSocial,
  FooterSocialLink,
  FooterModernLink,
  FooterModernSocialLink,
  FooterStagger,
} from "./footer"
import { Button } from "@eluan/core"
import { Twitter, Github, Linkedin } from "lucide-react"

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A composable footer with link sections, social icons, copyright, and a modern dark variant with a full-bleed brand wordmark and staggered fade-in. Link items render as Button \`variant="link"\`.

**Import**
\`\`\`tsx
import { Footer, FooterContent, FooterSection, FooterTitle, FooterLinks, FooterLink, FooterBottom, FooterCopyright, FooterSocial, FooterSocialLink, FooterBrand, FooterModernLink, FooterModernSocialLink, FooterStagger } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Footer variant="default">
  <FooterContent>
    <FooterSection>
      <FooterTitle>Product</FooterTitle>
      <FooterLinks>
        <FooterLink href="#">Features</FooterLink>
      </FooterLinks>
    </FooterSection>
  </FooterContent>
  <FooterBottom>
    <FooterCopyright>© 2024 Acme</FooterCopyright>
  </FooterBottom>
</Footer>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "Visual style: default (bordered top) or modern (dark inverse).",
    },
    size: {
      description: "Vertical padding: sm, default, or lg.",
    },
    wordmark: {
      description: "Full-bleed brand wordmark rendered at the bottom edge with its lower half clipped.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: "Standard 4-column footer with link sections, copyright, and social icons." } } },
  render: () => (
    <Footer>
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
            <FooterLink href="#">Press</FooterLink>
          </FooterLinks>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLinks>
            <FooterLink href="#">Community</FooterLink>
            <FooterLink href="#">Help Center</FooterLink>
            <FooterLink href="#">Partners</FooterLink>
            <FooterLink href="#">Status</FooterLink>
          </FooterLinks>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLinks>
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Terms</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
            <FooterLink href="#">Licenses</FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>
      <FooterBottom>
        <FooterCopyright>
          © 2024 Eluan. All rights reserved.
        </FooterCopyright>
        <FooterSocial>
          <FooterSocialLink href="#" label="Twitter">
            <Twitter size={20} />
          </FooterSocialLink>
          <FooterSocialLink href="#" label="GitHub">
            <Github size={20} />
          </FooterSocialLink>
          <FooterSocialLink href="#" label="LinkedIn">
            <Linkedin size={20} />
          </FooterSocialLink>
        </FooterSocial>
      </FooterBottom>
    </Footer>
  ),
}

export const Modern: Story = {
  parameters: { docs: { description: { story: "Dark modern variant with a giant full-bleed brand wordmark clipped at the bottom edge, link-variant buttons, and a staggered fade-in." } } },
  render: () => (
    <Footer variant="modern" size="lg" wordmark="Eluan">
      <FooterStagger delayMs={100}>
        <FooterSection>
          <FooterTitle>Product</FooterTitle>
          <FooterLinks>
            <FooterModernLink href="#">Features</FooterModernLink>
            <FooterModernLink href="#">Pricing</FooterModernLink>
            <FooterModernLink href="#">Documentation</FooterModernLink>
            <FooterModernLink href="#">Changelog</FooterModernLink>
          </FooterLinks>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Company</FooterTitle>
          <FooterLinks>
            <FooterModernLink href="#">About</FooterModernLink>
            <FooterModernLink href="#">Blog</FooterModernLink>
            <FooterModernLink href="#">Careers</FooterModernLink>
            <FooterModernLink href="#">Press</FooterModernLink>
          </FooterLinks>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLinks>
            <FooterModernLink href="#">Community</FooterModernLink>
            <FooterModernLink href="#">Help Center</FooterModernLink>
            <FooterModernLink href="#">Partners</FooterModernLink>
            <FooterModernLink href="#">Status</FooterModernLink>
          </FooterLinks>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLinks>
            <FooterModernLink href="#">Privacy</FooterModernLink>
            <FooterModernLink href="#">Terms</FooterModernLink>
            <FooterModernLink href="#">Cookie Policy</FooterModernLink>
            <FooterModernLink href="#">Licenses</FooterModernLink>
          </FooterLinks>
        </FooterSection>
      </FooterStagger>
      <FooterBottom>
        <FooterCopyright>
          © 2024 Eluan. All rights reserved.
        </FooterCopyright>
        <FooterSocial>
          <FooterModernSocialLink href="#" label="Twitter">
            <Twitter size={16} />
          </FooterModernSocialLink>
          <FooterModernSocialLink href="#" label="GitHub">
            <Github size={16} />
          </FooterModernSocialLink>
          <FooterModernSocialLink href="#" label="LinkedIn">
            <Linkedin size={16} />
          </FooterModernSocialLink>
        </FooterSocial>
      </FooterBottom>
    </Footer>
  ),
}

export const Small: Story = {
  parameters: { docs: { description: { story: "Compact footer with only copyright and inline link-variant buttons." } } },
  render: () => (
    <Footer size="sm">
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--spacing-md)",
          justifyContent: "space-between",
        }}
      >
        <FooterCopyright>
          © 2024 Eluan. All rights reserved.
        </FooterCopyright>
        <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
          <Button asChild variant="link">
            <a href="#">Privacy</a>
          </Button>
          <Button asChild variant="link">
            <a href="#">Terms</a>
          </Button>
          <Button asChild variant="link">
            <a href="#">Contact</a>
          </Button>
        </div>
      </div>
    </Footer>
  ),
}
