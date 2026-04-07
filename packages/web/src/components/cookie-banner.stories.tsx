import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  CookieBanner,
  CookieBannerContent,
  CookieBannerText,
  CookieBannerTitle,
  CookieBannerDescription,
  CookieBannerActions,
  CookieBannerLink,
  CookiePreferences,
  CookiePreferencesHeader,
  CookiePreferencesTitle,
  CookiePreferencesDescription,
  CookiePreferencesList,
  CookiePreferenceItem,
  CookiePreferencesFooter,
} from "./cookie-banner"
import { Button } from "@vasf/ragnar-core"

const meta: Meta<typeof CookieBanner> = {
  title: "Web/CookieBanner",
  component: CookieBanner,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="relative min-h-[200px]">
      <CookieBanner isVisible>
        <CookieBannerContent>
          <CookieBannerText>
            <CookieBannerDescription>
              We use cookies to enhance your browsing experience, serve personalized
              content, and analyze our traffic. By clicking "Accept All", you consent
              to our use of cookies.{" "}
              <CookieBannerLink href="#">Learn more</CookieBannerLink>
            </CookieBannerDescription>
          </CookieBannerText>
          <CookieBannerActions>
            <Button variant="outline" size="sm">Preferences</Button>
            <Button variant="outline" size="sm">Reject All</Button>
            <Button size="sm">Accept All</Button>
          </CookieBannerActions>
        </CookieBannerContent>
      </CookieBanner>
    </div>
  ),
}

export const WithTitle: Story = {
  render: () => (
    <div className="relative min-h-[200px]">
      <CookieBanner isVisible>
        <CookieBannerContent>
          <CookieBannerText>
            <CookieBannerTitle>Cookie Consent</CookieBannerTitle>
            <CookieBannerDescription>
              We use cookies to provide you with the best experience on our website.
            </CookieBannerDescription>
          </CookieBannerText>
          <CookieBannerActions>
            <Button variant="outline" size="sm">Decline</Button>
            <Button size="sm">Accept</Button>
          </CookieBannerActions>
        </CookieBannerContent>
      </CookieBanner>
    </div>
  ),
}

export const Corner: Story = {
  render: () => (
    <div className="relative min-h-[400px]">
      <CookieBanner isVisible position="bottom-right" variant="card">
        <CookieBannerText>
          <CookieBannerTitle>Cookies</CookieBannerTitle>
          <CookieBannerDescription>
            We use cookies to improve your experience. By continuing, you agree to
            our cookie policy.
          </CookieBannerDescription>
        </CookieBannerText>
        <CookieBannerActions className="mt-4">
          <Button variant="outline" size="sm" className="flex-1">Decline</Button>
          <Button size="sm" className="flex-1">Accept</Button>
        </CookieBannerActions>
      </CookieBanner>
    </div>
  ),
}

export const Dark: Story = {
  render: () => (
    <div className="relative min-h-[200px]">
      <CookieBanner isVisible variant="dark">
        <CookieBannerContent>
          <CookieBannerText>
            <CookieBannerDescription>
              This website uses cookies to ensure you get the best experience.
            </CookieBannerDescription>
          </CookieBannerText>
          <CookieBannerActions>
            <Button variant="secondary" size="sm">Got it</Button>
          </CookieBannerActions>
        </CookieBannerContent>
      </CookieBanner>
    </div>
  ),
}

export const Preferences: Story = {
  render: function PreferencesStory() {
    const [isOpen, setIsOpen] = React.useState(true)
    const [analytics, setAnalytics] = React.useState(false)
    const [marketing, setMarketing] = React.useState(false)

    return (
      <CookiePreferences isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CookiePreferencesHeader>
          <CookiePreferencesTitle>Cookie Preferences</CookiePreferencesTitle>
          <CookiePreferencesDescription>
            Manage your cookie preferences below. Some cookies are essential for
            the website to function properly.
          </CookiePreferencesDescription>
        </CookiePreferencesHeader>
        <CookiePreferencesList>
          <CookiePreferenceItem
            name="Essential Cookies"
            description="Required for the website to function. Cannot be disabled."
            required
            checked
          />
          <CookiePreferenceItem
            name="Analytics Cookies"
            description="Help us understand how visitors interact with our website."
            checked={analytics}
            onChange={setAnalytics}
          />
          <CookiePreferenceItem
            name="Marketing Cookies"
            description="Used to deliver personalized advertisements."
            checked={marketing}
            onChange={setMarketing}
          />
        </CookiePreferencesList>
        <CookiePreferencesFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsOpen(false)}>Save Preferences</Button>
        </CookiePreferencesFooter>
      </CookiePreferences>
    )
  },
}
