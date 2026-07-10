import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import { ChevronDown, ChevronRight, Filter, Settings } from "lucide-react"

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A component that toggles the visibility of its content section, allowing users to expand or collapse additional information.

**Import**
\`\`\`tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@eluan/core"
\`\`\`

**Usage**
\`\`\`tsx
<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A release notes collapsible that expands to reveal version details and changelog entries.",
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[400px] rounded-[var(--curves-md)] border border-[var(--container-border-alt)] bg-[var(--container-bg)]"
      >
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between gap-[var(--spacing-sm)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-left">
            <div className="flex flex-col gap-[var(--spacing-xxs)]">
              <span className="text-[length:var(--font-size-sm)] font-semibold text-[var(--container-fg)]">
                Release Notes
              </span>
              <span className="text-[length:var(--font-size-xs)] text-[var(--container-fg-alt)]">
                v2.4.0 — April 2026
              </span>
            </div>
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-[var(--container-fg-alt)]" />
            ) : (
              <ChevronRight className="h-4 w-4 text-[var(--container-fg-alt)]" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t border-[var(--container-border-alt)] px-[var(--spacing-md)] py-[var(--spacing-sm)]">
            <ul className="flex flex-col gap-[var(--spacing-xs)]">
              <li className="flex items-start gap-[var(--spacing-xs)]">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--positive-bg)]" />
                <span className="text-[length:var(--font-size-sm)] text-[var(--container-fg)]">
                  Added new Collapsible component with animation support
                </span>
              </li>
              <li className="flex items-start gap-[var(--spacing-xs)]">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--informative-bg)]" />
                <span className="text-[length:var(--font-size-sm)] text-[var(--container-fg)]">
                  Improved theme token coverage across all primitives
                </span>
              </li>
              <li className="flex items-start gap-[var(--spacing-xs)]">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cautionary-bg)]" />
                <span className="text-[length:var(--font-size-sm)] text-[var(--container-fg)]">
                  Fixed checkbox border-radius in sweeping curve scale
                </span>
              </li>
              <li className="flex items-start gap-[var(--spacing-xs)]">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--destructive-bg)]" />
                <span className="text-[length:var(--font-size-sm)] text-[var(--container-fg)]">
                  Deprecated legacy color tokens (see migration guide)
                </span>
              </li>
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}

export const FilterPanel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A collapsible filter section with checkboxes, useful for search or catalog interfaces.",
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true)
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[280px] rounded-[var(--curves-md)] border border-[var(--container-border-alt)] bg-[var(--container-bg)]"
      >
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between gap-[var(--spacing-sm)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-left">
            <div className="flex items-center gap-[var(--spacing-xs)]">
              <Filter className="h-4 w-4 text-[var(--container-fg-alt)]" />
              <span className="text-[length:var(--font-size-sm)] font-semibold text-[var(--container-fg)]">
                Filters
              </span>
            </div>
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-[var(--container-fg-alt)]" />
            ) : (
              <ChevronRight className="h-4 w-4 text-[var(--container-fg-alt)]" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col gap-[var(--spacing-sm)] border-t border-[var(--container-border-alt)] px-[var(--spacing-md)] py-[var(--spacing-sm)]">
            <p className="text-[length:var(--font-size-xs)] font-medium text-[var(--container-fg-alt)]">
              Category
            </p>
            {["Components", "Hooks", "Utilities", "Tokens"].map((label) => (
              <div key={label} className="flex items-center gap-[var(--spacing-xs)]">
                <Checkbox id={`filter-${label}`} />
                <label
                  htmlFor={`filter-${label}`}
                  className="text-[length:var(--font-size-sm)] text-[var(--container-fg)]"
                >
                  {label}
                </label>
              </div>
            ))}
            <div className="pt-[var(--spacing-xs)]">
              <Button variant="outline" size="sm" className="w-full">
                Apply Filters
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}

export const Nested: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Nested collapsibles representing a settings panel with expandable sub-sections.",
      },
    },
  },
  render: () => {
    const [generalOpen, setGeneralOpen] = React.useState(true)
    const [appearanceOpen, setAppearanceOpen] = React.useState(false)
    const [notificationsOpen, setNotificationsOpen] = React.useState(false)

    const SettingsSection = ({
      title,
      description,
      open,
      onOpenChange,
      children,
    }: {
      title: string
      description: string
      open: boolean
      onOpenChange: (open: boolean) => void
      children: React.ReactNode
    }) => (
      <Collapsible open={open} onOpenChange={onOpenChange}>
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between gap-[var(--spacing-sm)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-left hover:bg-[var(--container-bg-hover)] transition-colors">
            <div className="flex items-center gap-[var(--spacing-sm)]">
              <Settings className="h-4 w-4 text-[var(--container-fg-alt)]" />
              <div className="flex flex-col">
                <span className="text-[length:var(--font-size-sm)] font-medium text-[var(--container-fg)]">
                  {title}
                </span>
                <span className="text-[length:var(--font-size-xs)] text-[var(--container-fg-alt)]">
                  {description}
                </span>
              </div>
            </div>
            {open ? (
              <ChevronDown className="h-4 w-4 text-[var(--container-fg-alt)]" />
            ) : (
              <ChevronRight className="h-4 w-4 text-[var(--container-fg-alt)]" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col gap-[var(--spacing-xs)] border-t border-[var(--container-border-alt)] px-[var(--spacing-md)] py-[var(--spacing-sm)] ml-[var(--spacing-lg)]">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )

    return (
      <div className="w-[380px] rounded-[var(--curves-md)] border border-[var(--container-border-alt)] bg-[var(--container-bg)] divide-y divide-[var(--container-border-alt)]">
        <SettingsSection
          title="General"
          description="Language, region, and defaults"
          open={generalOpen}
          onOpenChange={setGeneralOpen}
        >
          <div className="flex items-center gap-[var(--spacing-xs)]">
            <Checkbox id="settings-autosave" defaultChecked />
            <label
              htmlFor="settings-autosave"
              className="text-[length:var(--font-size-sm)] text-[var(--container-fg)]"
            >
              Enable autosave
            </label>
          </div>
          <div className="flex items-center gap-[var(--spacing-xs)]">
            <Checkbox id="settings-analytics" />
            <label
              htmlFor="settings-analytics"
              className="text-[length:var(--font-size-sm)] text-[var(--container-fg)]"
            >
              Send usage analytics
            </label>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Appearance"
          description="Theme, density, and layout"
          open={appearanceOpen}
          onOpenChange={setAppearanceOpen}
        >
          <div className="flex items-center gap-[var(--spacing-xs)]">
            <Checkbox id="settings-animations" defaultChecked />
            <label
              htmlFor="settings-animations"
              className="text-[length:var(--font-size-sm)] text-[var(--container-fg)]"
            >
              Enable animations
            </label>
          </div>
          <div className="flex items-center gap-[var(--spacing-xs)]">
            <Checkbox id="settings-compact" />
            <label
              htmlFor="settings-compact"
              className="text-[length:var(--font-size-sm)] text-[var(--container-fg)]"
            >
              Compact mode
            </label>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Notifications"
          description="Email, push, and alerts"
          open={notificationsOpen}
          onOpenChange={setNotificationsOpen}
        >
          <div className="flex items-center gap-[var(--spacing-xs)]">
            <Checkbox id="settings-email" defaultChecked />
            <label
              htmlFor="settings-email"
              className="text-[length:var(--font-size-sm)] text-[var(--container-fg)]"
            >
              Email notifications
            </label>
          </div>
          <div className="flex items-center gap-[var(--spacing-xs)]">
            <Checkbox id="settings-push" defaultChecked />
            <label
              htmlFor="settings-push"
              className="text-[length:var(--font-size-sm)] text-[var(--container-fg)]"
            >
              Push notifications
            </label>
          </div>
        </SettingsSection>
      </div>
    )
  },
}
