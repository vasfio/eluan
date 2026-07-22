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

const panelStyle: React.CSSProperties = {
  backgroundColor: "var(--container-bg)",
  border: "1px solid var(--container-border-alt)",
  borderRadius: "var(--curves-md)",
}

const triggerStyle: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: "var(--spacing-sm)",
  justifyContent: "space-between",
  padding: "var(--spacing-sm) var(--spacing-md)",
  textAlign: "left",
  width: "100%",
}

const titleStyle: React.CSSProperties = {
  color: "var(--container-fg)",
  fontSize: "var(--font-size-sm)",
  fontWeight: 600,
}

const subtitleStyle: React.CSSProperties = {
  color: "var(--container-fg-alt)",
  fontSize: "var(--font-size-xs)",
}

const contentStyle: React.CSSProperties = {
  borderTop: "1px solid var(--container-border-alt)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-sm)",
  padding: "var(--spacing-sm) var(--spacing-md)",
}

const iconStyle: React.CSSProperties = {
  color: "var(--container-fg-alt)",
  flexShrink: 0,
  height: 16,
  width: 16,
}

const rowTextStyle: React.CSSProperties = {
  color: "var(--container-fg)",
  fontSize: "var(--font-size-sm)",
}

const checkRowStyle: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: "var(--spacing-sm)",
}

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
    const bullets: [string, string][] = [
      ["var(--positive-fg)", "Added new Collapsible component with animation support"],
      ["var(--informative-fg)", "Improved theme token coverage across all primitives"],
      ["var(--cautionary-fg)", "Fixed checkbox border-radius in sweeping curve scale"],
      ["var(--destructive-fg)", "Deprecated legacy color tokens (see migration guide)"],
    ]
    return (
      <div style={{ ...panelStyle, width: 400 }}>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <button style={triggerStyle}>
              <span style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)" }}>
                <span style={titleStyle}>Release Notes</span>
                <span style={subtitleStyle}>v2.4.0 — April 2026</span>
              </span>
              {isOpen ? <ChevronDown style={iconStyle} /> : <ChevronRight style={iconStyle} />}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul style={{ ...contentStyle, gap: "var(--spacing-xs)", margin: 0 }}>
              {bullets.map(([color, text]) => (
                <li key={text} style={{ alignItems: "flex-start", display: "flex", gap: "var(--spacing-xs)" }}>
                  <span
                    style={{
                      backgroundColor: color,
                      borderRadius: "var(--radius-radius-full)",
                      flexShrink: 0,
                      height: 6,
                      marginTop: 6,
                      width: 6,
                    }}
                  />
                  <span style={rowTextStyle}>{text}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </div>
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
      <div style={{ ...panelStyle, width: 280 }}>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <button style={triggerStyle}>
              <span style={{ alignItems: "center", display: "flex", gap: "var(--spacing-xs)" }}>
                <Filter style={iconStyle} />
                <span style={titleStyle}>Filters</span>
              </span>
              {isOpen ? <ChevronDown style={iconStyle} /> : <ChevronRight style={iconStyle} />}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div style={contentStyle}>
              <p style={{ ...subtitleStyle, fontWeight: 500, margin: 0 }}>Category</p>
              {["Components", "Hooks", "Utilities", "Tokens"].map((label) => (
                <div key={label} style={checkRowStyle}>
                  <Checkbox id={`filter-${label}`} />
                  <label htmlFor={`filter-${label}`} style={rowTextStyle}>
                    {label}
                  </label>
                </div>
              ))}
              <div style={{ paddingTop: "var(--spacing-xs)" }}>
                <Button variant="outline" size="sm" fullWidth>
                  Apply Filters
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
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
          <button style={triggerStyle}>
            <span style={{ alignItems: "center", display: "flex", gap: "var(--spacing-sm)" }}>
              <Settings style={iconStyle} />
              <span style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)" }}>
                <span style={{ ...titleStyle, fontWeight: 500 }}>{title}</span>
                <span style={subtitleStyle}>{description}</span>
              </span>
            </span>
            {open ? <ChevronDown style={iconStyle} /> : <ChevronRight style={iconStyle} />}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div style={{ ...contentStyle, gap: "var(--spacing-xs)", marginLeft: "var(--spacing-lg)" }}>
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )

    const sections: {
      title: string
      description: string
      open: boolean
      onOpenChange: (open: boolean) => void
      rows: [string, boolean][]
    }[] = [
      {
        title: "General",
        description: "Language, region, and defaults",
        open: generalOpen,
        onOpenChange: setGeneralOpen,
        rows: [
          ["Enable autosave", true],
          ["Send usage analytics", false],
        ],
      },
      {
        title: "Appearance",
        description: "Theme, density, and layout",
        open: appearanceOpen,
        onOpenChange: setAppearanceOpen,
        rows: [
          ["Enable animations", true],
          ["Compact mode", false],
        ],
      },
      {
        title: "Notifications",
        description: "Email, push, and alerts",
        open: notificationsOpen,
        onOpenChange: setNotificationsOpen,
        rows: [
          ["Email notifications", true],
          ["Push notifications", true],
        ],
      },
    ]

    return (
      <div style={{ ...panelStyle, width: 380 }}>
        {sections.map((section, i) => (
          <div
            key={section.title}
            style={i > 0 ? { borderTop: "1px solid var(--container-border-alt)" } : undefined}
          >
            <SettingsSection
              title={section.title}
              description={section.description}
              open={section.open}
              onOpenChange={section.onOpenChange}
            >
              {section.rows.map(([label, checked]) => {
                const id = `settings-${section.title}-${label}`.replace(/\s+/g, "-").toLowerCase()
                return (
                  <div key={id} style={checkRowStyle}>
                    <Checkbox id={id} defaultChecked={checked || undefined} />
                    <label htmlFor={id} style={rowTextStyle}>
                      {label}
                    </label>
                  </div>
                )
              })}
            </SettingsSection>
          </div>
        ))}
      </div>
    )
  },
}
