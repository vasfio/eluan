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
  FooterBrand,
  FooterModernLink,
  FooterModernSocialLink,
  FooterStagger,
} from "./footer"
import { Twitter, Github, Linkedin } from "lucide-react"

const meta: Meta<typeof Footer> = {
  title: "Web/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A composable footer with link sections, social icons, copyright, and a modern dark variant with brand wordmark and animated links.

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
            <Twitter className="h-5 w-5" />
          </FooterSocialLink>
          <FooterSocialLink href="#" label="GitHub">
            <Github className="h-5 w-5" />
          </FooterSocialLink>
          <FooterSocialLink href="#" label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </FooterSocialLink>
        </FooterSocial>
      </FooterBottom>
    </Footer>
  ),
}

export const Modern: Story = {
  parameters: { docs: { description: { story: "Dark modern variant with a large brand wordmark, animated hover links, and staggered fade-in." } } },
  render: () => (
    <Footer variant="modern" size="lg">
      <FooterBrand />
      <div className="mt-10">
        <FooterStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" delayMs={100}>
          <FooterSection>
            <FooterTitle className="text-zinc-300">Product</FooterTitle>
            <FooterLinks>
              <FooterModernLink href="#">Features</FooterModernLink>
              <FooterModernLink href="#">Pricing</FooterModernLink>
              <FooterModernLink href="#">Documentation</FooterModernLink>
              <FooterModernLink href="#">Changelog</FooterModernLink>
            </FooterLinks>
          </FooterSection>
          <FooterSection>
            <FooterTitle className="text-zinc-300">Company</FooterTitle>
            <FooterLinks>
              <FooterModernLink href="#">About</FooterModernLink>
              <FooterModernLink href="#">Blog</FooterModernLink>
              <FooterModernLink href="#">Careers</FooterModernLink>
              <FooterModernLink href="#">Press</FooterModernLink>
            </FooterLinks>
          </FooterSection>
          <FooterSection>
            <FooterTitle className="text-zinc-300">Resources</FooterTitle>
            <FooterLinks>
              <FooterModernLink href="#">Community</FooterModernLink>
              <FooterModernLink href="#">Help Center</FooterModernLink>
              <FooterModernLink href="#">Partners</FooterModernLink>
              <FooterModernLink href="#">Status</FooterModernLink>
            </FooterLinks>
          </FooterSection>
          <FooterSection>
            <FooterTitle className="text-zinc-300">Legal</FooterTitle>
            <FooterLinks>
              <FooterModernLink href="#">Privacy</FooterModernLink>
              <FooterModernLink href="#">Terms</FooterModernLink>
              <FooterModernLink href="#">Cookie Policy</FooterModernLink>
              <FooterModernLink href="#">Licenses</FooterModernLink>
            </FooterLinks>
          </FooterSection>
        </FooterStagger>
      </div>
      <FooterBottom className="border-zinc-800">
        <FooterCopyright className="text-zinc-500">
          © 2024 Eluan. All rights reserved.
        </FooterCopyright>
        <div className="flex items-center gap-3">
          <FooterModernSocialLink href="#" label="Twitter">
            <Twitter className="h-4 w-4" />
          </FooterModernSocialLink>
          <FooterModernSocialLink href="#" label="GitHub">
            <Github className="h-4 w-4" />
          </FooterModernSocialLink>
          <FooterModernSocialLink href="#" label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </FooterModernSocialLink>
        </div>
      </FooterBottom>
    </Footer>
  ),
}

export const Small: Story = {
  parameters: { docs: { description: { story: "Compact footer with only copyright and inline links." } } },
  render: () => (
    <Footer size="sm">
      <FooterBottom className="mt-0 border-0 pt-0">
        <FooterCopyright>
          © 2024 Eluan. All rights reserved.
        </FooterCopyright>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </FooterBottom>
    </Footer>
  ),
}
