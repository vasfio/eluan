import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  NavigationDrawerProvider,
  NavigationDrawer,
  NavigationDrawerHeader,
  NavigationDrawerContent,
  NavigationDrawerFooter,
  NavigationDrawerToggle,
  NavigationDrawerItem,
  NavigationDrawerGroup,
} from "./navigation-drawer"
import { Home, Settings, Users, FileText, HelpCircle, LogOut } from "lucide-react"

const meta: Meta<typeof NavigationDrawer> = {
  title: "Components/NavigationDrawer",
  component: NavigationDrawer,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NavigationDrawerProvider>
        <Story />
      </NavigationDrawerProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NavigationDrawerProvider>
      <NavigationDrawer>
        <NavigationDrawerHeader>
          <span className="font-semibold">My App</span>
          <NavigationDrawerToggle className="ml-auto" />
        </NavigationDrawerHeader>
        <NavigationDrawerContent>
          <NavigationDrawerGroup>
            <NavigationDrawerItem icon={<Home className="h-4 w-4" />} active>
              Dashboard
            </NavigationDrawerItem>
            <NavigationDrawerItem icon={<Users className="h-4 w-4" />}>
              Users
            </NavigationDrawerItem>
            <NavigationDrawerItem icon={<FileText className="h-4 w-4" />}>
              Documents
            </NavigationDrawerItem>
            <NavigationDrawerItem icon={<Settings className="h-4 w-4" />}>
              Settings
            </NavigationDrawerItem>
          </NavigationDrawerGroup>
        </NavigationDrawerContent>
        <NavigationDrawerFooter>
          <NavigationDrawerItem icon={<HelpCircle className="h-4 w-4" />}>
            Help
          </NavigationDrawerItem>
          <NavigationDrawerItem icon={<LogOut className="h-4 w-4" />}>
            Logout
          </NavigationDrawerItem>
        </NavigationDrawerFooter>
      </NavigationDrawer>
    </NavigationDrawerProvider>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <NavigationDrawerProvider>
      <NavigationDrawer>
        <NavigationDrawerHeader>
          <span className="font-semibold">Dashboard</span>
          <NavigationDrawerToggle className="ml-auto" />
        </NavigationDrawerHeader>
        <NavigationDrawerContent>
          <NavigationDrawerGroup label="Main">
            <NavigationDrawerItem icon={<Home className="h-4 w-4" />} active>
              Home
            </NavigationDrawerItem>
            <NavigationDrawerItem icon={<Users className="h-4 w-4" />}>
              Team
            </NavigationDrawerItem>
          </NavigationDrawerGroup>
          <NavigationDrawerGroup label="Management">
            <NavigationDrawerItem icon={<FileText className="h-4 w-4" />}>
              Projects
            </NavigationDrawerItem>
            <NavigationDrawerItem icon={<Settings className="h-4 w-4" />}>
              Settings
            </NavigationDrawerItem>
          </NavigationDrawerGroup>
        </NavigationDrawerContent>
      </NavigationDrawer>
    </NavigationDrawerProvider>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <NavigationDrawerProvider defaultCollapsed>
      <NavigationDrawer>
        <NavigationDrawerHeader>
          <NavigationDrawerToggle />
        </NavigationDrawerHeader>
        <NavigationDrawerContent>
          <NavigationDrawerGroup>
            <NavigationDrawerItem icon={<Home className="h-4 w-4" />} active>
              Dashboard
            </NavigationDrawerItem>
            <NavigationDrawerItem icon={<Users className="h-4 w-4" />}>
              Users
            </NavigationDrawerItem>
            <NavigationDrawerItem icon={<FileText className="h-4 w-4" />}>
              Documents
            </NavigationDrawerItem>
            <NavigationDrawerItem icon={<Settings className="h-4 w-4" />}>
              Settings
            </NavigationDrawerItem>
          </NavigationDrawerGroup>
        </NavigationDrawerContent>
      </NavigationDrawer>
    </NavigationDrawerProvider>
  ),
}
