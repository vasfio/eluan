import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@eluan/core";

export type SectionTabsProps = {
  /** Panel shown for the Overview tab, which is selected by default. */
  overview: ReactNode;
  /** Panel shown for the Activity tab. */
  activity: ReactNode;
  /** Panel shown for the Settings tab. */
  settings: ReactNode;
  /** Accessible name for the tab list, e.g. "Project sections". */
  label?: string;
};

/**
 * Switches between the Overview, Activity and Settings views of one subject.
 * Render it directly under the heading of the thing it switches.
 *
 * Inactive panels unmount, so state that must survive a tab switch (such as an
 * unsaved settings form) belongs above this component.
 */
export default function SectionTabs({
  overview,
  activity,
  settings,
  label = "Sections",
}: SectionTabsProps) {
  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label={label}>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">{overview}</TabsContent>
      <TabsContent value="activity">{activity}</TabsContent>
      <TabsContent value="settings">{settings}</TabsContent>
    </Tabs>
  );
}
