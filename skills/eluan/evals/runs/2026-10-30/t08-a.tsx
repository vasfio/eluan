"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from "@eluan/core";

/**
 * Overview / Activity / Settings tabs.
 *
 * Built on Eluan's Tabs (Radix Tabs underneath), so roving focus, arrow-key
 * navigation and the tab/tabpanel ARIA wiring come from the component.
 * Uncontrolled: Tabs owns the active value and opens on Overview.
 */
export default function SectionTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <OverviewPanel />
      </TabsContent>
      <TabsContent value="activity">
        <ActivityPanel />
      </TabsContent>
      <TabsContent value="settings">
        <SettingsPanel />
      </TabsContent>
    </Tabs>
  );
}

function OverviewPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>A summary of key details and status.</CardDescription>
      </CardHeader>
      <CardContent>
        <Typography tone="muted">Nothing to summarize yet.</Typography>
      </CardContent>
    </Card>
  );
}

function ActivityPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Recent events and changes, newest first.</CardDescription>
      </CardHeader>
      <CardContent>
        <Typography tone="muted">No activity yet.</Typography>
      </CardContent>
    </Card>
  );
}

function SettingsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage preferences and configuration.</CardDescription>
      </CardHeader>
      <CardContent>
        <Typography tone="muted">No settings to configure yet.</Typography>
      </CardContent>
    </Card>
  );
}
