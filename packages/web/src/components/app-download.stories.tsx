import type { Meta, StoryObj } from "@storybook/react"
import {
  AppDownloadSection,
  AppDownloadContent,
  AppDownloadInfo,
  AppDownloadTitle,
  AppDownloadDescription,
  AppDownloadButtons,
  AppStoreBadge,
  GooglePlayBadge,
  AppDownloadMockup,
  PhoneMockup,
  AppQRCode,
} from "./app-download"

const meta: Meta<typeof AppDownloadSection> = {
  title: "Web/AppDownload",
  component: AppDownloadSection,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A section for promoting mobile app downloads with App Store and Google Play badges, phone mockups, and optional QR codes.

**Import**
\`\`\`tsx
import { AppDownloadSection, AppDownloadContent, AppDownloadInfo, AppDownloadTitle, AppDownloadDescription, AppDownloadButtons, AppStoreBadge, GooglePlayBadge, AppDownloadMockup, PhoneMockup, AppQRCode } from "@vasf/ragnar-web"
\`\`\`

**Usage**
\`\`\`tsx
<AppDownloadSection>
  <AppDownloadContent>
    <AppDownloadInfo>
      <AppDownloadTitle>Get the app</AppDownloadTitle>
      <AppDownloadButtons>
        <AppStoreBadge href="#" />
        <GooglePlayBadge href="#" />
      </AppDownloadButtons>
    </AppDownloadInfo>
    <AppDownloadMockup>
      <PhoneMockup />
    </AppDownloadMockup>
  </AppDownloadContent>
</AppDownloadSection>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "Background style: default, muted, dark, or gradient.",
    },
    size: {
      description: "Vertical padding: sm, default, or lg.",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: "Default layout with store badges and a phone mockup." } } },
  render: () => (
    <AppDownloadSection>
      <AppDownloadContent>
        <AppDownloadInfo>
          <AppDownloadTitle>Get the app</AppDownloadTitle>
          <AppDownloadDescription>
            Download our mobile app for iOS and Android to access your account
            on the go. Stay connected wherever you are.
          </AppDownloadDescription>
          <AppDownloadButtons>
            <AppStoreBadge href="#" />
            <GooglePlayBadge href="#" />
          </AppDownloadButtons>
        </AppDownloadInfo>
        <AppDownloadMockup>
          <PhoneMockup>
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-muted-foreground">
              App Screenshot
            </div>
          </PhoneMockup>
        </AppDownloadMockup>
      </AppDownloadContent>
    </AppDownloadSection>
  ),
}

export const Dark: Story = {
  parameters: { docs: { description: { story: "Dark background variant." } } },
  render: () => (
    <AppDownloadSection variant="dark">
      <AppDownloadContent>
        <AppDownloadInfo>
          <AppDownloadTitle>Download now</AppDownloadTitle>
          <AppDownloadDescription>
            Experience our app on your mobile device. Available for free on
            all major platforms.
          </AppDownloadDescription>
          <AppDownloadButtons>
            <AppStoreBadge href="#" />
            <GooglePlayBadge href="#" />
          </AppDownloadButtons>
        </AppDownloadInfo>
        <AppDownloadMockup>
          <PhoneMockup>
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-white to-gray-100 text-muted-foreground">
              App Preview
            </div>
          </PhoneMockup>
        </AppDownloadMockup>
      </AppDownloadContent>
    </AppDownloadSection>
  ),
}

export const Gradient: Story = {
  parameters: { docs: { description: { story: "Gradient background with inverted badge colors." } } },
  render: () => (
    <AppDownloadSection variant="gradient">
      <AppDownloadContent>
        <AppDownloadInfo>
          <AppDownloadTitle>Take it with you</AppDownloadTitle>
          <AppDownloadDescription>
            Our mobile app lets you manage everything from your pocket.
            Download today and start your journey.
          </AppDownloadDescription>
          <AppDownloadButtons>
            <AppStoreBadge href="#" className="bg-white text-black" />
            <GooglePlayBadge href="#" className="bg-white text-black" />
          </AppDownloadButtons>
        </AppDownloadInfo>
        <AppDownloadMockup>
          <PhoneMockup>
            <div className="flex h-full items-center justify-center bg-white text-muted-foreground">
              Preview
            </div>
          </PhoneMockup>
        </AppDownloadMockup>
      </AppDownloadContent>
    </AppDownloadSection>
  ),
}

export const WithQRCode: Story = {
  parameters: { docs: { description: { story: "Muted variant with a QR code for direct mobile download." } } },
  render: () => (
    <AppDownloadSection variant="muted">
      <AppDownloadContent>
        <AppDownloadInfo>
          <AppDownloadTitle>Scan to download</AppDownloadTitle>
          <AppDownloadDescription>
            Point your camera at the QR code to download the app instantly.
          </AppDownloadDescription>
          <AppQRCode>
            <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground border-2 border-dashed">
              QR Code
            </div>
          </AppQRCode>
        </AppDownloadInfo>
        <AppDownloadMockup>
          <PhoneMockup>
            <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
              App Screen
            </div>
          </PhoneMockup>
        </AppDownloadMockup>
      </AppDownloadContent>
    </AppDownloadSection>
  ),
}

export const SimpleBadges: Story = {
  parameters: { docs: { description: { story: "Standalone App Store and Google Play badges without a section wrapper." } } },
  render: () => (
    <div className="p-8 flex flex-wrap gap-4 justify-center">
      <AppStoreBadge href="#" />
      <GooglePlayBadge href="#" />
    </div>
  ),
}
