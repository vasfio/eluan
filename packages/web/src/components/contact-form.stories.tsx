import type { Meta, StoryObj } from "@storybook/react"
import {
  ContactSection,
  ContactContent,
  ContactInfo,
  ContactHeader,
  ContactTitle,
  ContactDescription,
  ContactDetails,
  ContactDetailItem,
  ContactSocials,
  ContactSocialLink,
  ContactForm,
  ContactFormRow,
  ContactFormField,
  ContactFormLabel,
  ContactFormInput,
  ContactFormTextarea,
  ContactFormSelect,
} from "./contact-form"
import { Button } from "@vasf/ragnar-core"
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react"

const meta: Meta<typeof ContactSection> = {
  title: "Web/ContactForm",
  component: ContactSection,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ContactSection>
      <ContactContent>
        <ContactInfo>
          <ContactHeader>
            <ContactTitle>Get in touch</ContactTitle>
            <ContactDescription>
              Have questions? We'd love to hear from you. Send us a message
              and we'll respond as soon as possible.
            </ContactDescription>
          </ContactHeader>
          <ContactDetails>
            <ContactDetailItem
              icon={<Mail className="h-5 w-5" />}
              label="Email"
              value="hello@example.com"
              href="mailto:hello@example.com"
            />
            <ContactDetailItem
              icon={<Phone className="h-5 w-5" />}
              label="Phone"
              value="+1 (555) 123-4567"
              href="tel:+15551234567"
            />
            <ContactDetailItem
              icon={<MapPin className="h-5 w-5" />}
              label="Office"
              value="123 Main Street, San Francisco, CA 94102"
            />
          </ContactDetails>
          <ContactSocials>
            <ContactSocialLink href="#" label="Twitter">
              <Twitter className="h-5 w-5" />
            </ContactSocialLink>
            <ContactSocialLink href="#" label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </ContactSocialLink>
            <ContactSocialLink href="#" label="GitHub">
              <Github className="h-5 w-5" />
            </ContactSocialLink>
          </ContactSocials>
        </ContactInfo>
        <ContactForm variant="card">
          <ContactFormRow>
            <ContactFormField>
              <ContactFormLabel required>First name</ContactFormLabel>
              <ContactFormInput placeholder="John" />
            </ContactFormField>
            <ContactFormField>
              <ContactFormLabel required>Last name</ContactFormLabel>
              <ContactFormInput placeholder="Doe" />
            </ContactFormField>
          </ContactFormRow>
          <ContactFormField>
            <ContactFormLabel required>Email</ContactFormLabel>
            <ContactFormInput type="email" placeholder="john@example.com" />
          </ContactFormField>
          <ContactFormField>
            <ContactFormLabel>Subject</ContactFormLabel>
            <ContactFormSelect>
              <option value="">Select a topic</option>
              <option value="general">General inquiry</option>
              <option value="support">Technical support</option>
              <option value="sales">Sales</option>
              <option value="other">Other</option>
            </ContactFormSelect>
          </ContactFormField>
          <ContactFormField>
            <ContactFormLabel required>Message</ContactFormLabel>
            <ContactFormTextarea placeholder="Your message..." />
          </ContactFormField>
          <Button type="submit" className="w-full">Send Message</Button>
        </ContactForm>
      </ContactContent>
    </ContactSection>
  ),
}

export const SimpleForm: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-8">
      <ContactForm>
        <ContactFormField>
          <ContactFormLabel required>Name</ContactFormLabel>
          <ContactFormInput placeholder="Your name" />
        </ContactFormField>
        <ContactFormField>
          <ContactFormLabel required>Email</ContactFormLabel>
          <ContactFormInput type="email" placeholder="you@example.com" />
        </ContactFormField>
        <ContactFormField>
          <ContactFormLabel required>Message</ContactFormLabel>
          <ContactFormTextarea placeholder="How can we help?" />
        </ContactFormField>
        <Button type="submit" className="w-full">Submit</Button>
      </ContactForm>
    </div>
  ),
}

export const CardForm: Story = {
  render: () => (
    <div className="max-w-lg mx-auto p-8">
      <ContactForm variant="card">
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        <ContactFormRow>
          <ContactFormField>
            <ContactFormLabel>First name</ContactFormLabel>
            <ContactFormInput placeholder="First" />
          </ContactFormField>
          <ContactFormField>
            <ContactFormLabel>Last name</ContactFormLabel>
            <ContactFormInput placeholder="Last" />
          </ContactFormField>
        </ContactFormRow>
        <ContactFormField>
          <ContactFormLabel required>Email</ContactFormLabel>
          <ContactFormInput type="email" placeholder="email@example.com" />
        </ContactFormField>
        <ContactFormField>
          <ContactFormLabel>Company</ContactFormLabel>
          <ContactFormInput placeholder="Your company" />
        </ContactFormField>
        <ContactFormField>
          <ContactFormLabel required>Message</ContactFormLabel>
          <ContactFormTextarea placeholder="Tell us about your project..." />
        </ContactFormField>
        <Button type="submit" className="w-full">Send Message</Button>
      </ContactForm>
    </div>
  ),
}
