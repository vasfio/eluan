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
} from "./footer"
import { Twitter, Github, Linkedin } from "lucide-react"

const meta: Meta<typeof Footer> = {
  title: "Web/Footer",
  component: Footer,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
          © 2024 Ragnar. All rights reserved.
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

export const Small: Story = {
  render: () => (
    <Footer size="sm">
      <FooterBottom className="mt-0 border-0 pt-0">
        <FooterCopyright>
          © 2024 Ragnar. All rights reserved.
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
