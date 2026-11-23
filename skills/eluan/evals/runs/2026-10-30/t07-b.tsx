// eluan: composed, no component for empty state
import type { CSSProperties } from "react";
import { Button, Typography } from "@eluan/core";
import { FolderPlus } from "lucide-react";

export interface ProjectsEmptyStateProps {
  /** Called when the user chooses to create their first project. */
  onCreateProject: () => void;
  /**
   * Heading level for "No projects yet". Pick the level that follows the
   * dashboard's own outline: `h2` when the page title is the `h1`, `h3` when
   * the projects area sits under its own `h2`.
   */
  headingLevel?: "h2" | "h3" | "h4";
}

/**
 * First-use empty state for the dashboard's projects area.
 *
 * Render it in place of the projects list so the page header and navigation
 * stay put, and only once projects have loaded and the result is empty.
 * While loading, show Skeleton; if loading fails, show a destructive Banner
 * with a retry action instead of this component.
 */
export default function ProjectsEmptyState({
  onCreateProject,
  headingLevel = "h2",
}: ProjectsEmptyStateProps) {
  return (
    <div style={styles.root}>
      <div style={styles.message}>
        <span style={styles.icon}>
          <FolderPlus aria-hidden="true" style={styles.iconGlyph} />
        </span>
        <Typography variant="subheading" as={headingLevel} align="center">
          No projects yet
        </Typography>
        <Typography variant="body" tone="muted" align="center">
          Create your first project to get started.
        </Typography>
      </div>
      <Button type="button" onClick={onCreateProject}>
        Create project
      </Button>
    </div>
  );
}

const styles = {
  // Padded so the empty state doesn't hug the edges of the region it replaces;
  // the outer gap is the space before the action.
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--spacing-lg)",
    padding: "var(--spacing-3xl)",
  },
  // Icon, heading and explanation, spaced as one group.
  message: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--spacing-sm)",
  },
  // The icon draws with currentColor, so its colour is set on this parent.
  icon: {
    display: "flex",
    color: "var(--container-fg-alt)",
  },
  iconGlyph: {
    width: "var(--size-md)",
    height: "var(--size-md)",
  },
} satisfies Record<string, CSSProperties>;
