"use client";

import { useId, type CSSProperties } from "react";
import { FolderPlus, Plus } from "lucide-react";
import { Button, Typography } from "@eluan/core";

export interface ProjectsEmptyStateProps {
  /** Starts the create-project flow (open a dialog, navigate to /projects/new, ...). */
  onCreateProject: () => void;
  /** Optional link to docs or a guide about projects. The secondary action is hidden without it. */
  learnMoreHref?: string;
}

/*
 * Layout only. Eluan components are closed to className/style, so the frame
 * around them is plain markup reading Eluan's semantic (layer 3) tokens:
 * --container-* for colour, --spacing-* for rhythm (re-indexes with the
 * data-spacing axis), --curves-* for corners (follows data-curves). Nothing
 * here hard-codes a colour, so light / dim / dark and custom themes all apply.
 */
const styles = {
  region: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--spacing-xl)",
    minHeight: "20rem",
    paddingBlock: "var(--spacing-4xl)",
    paddingInline: "var(--spacing-2xl)",
    borderWidth: "1px",
    borderStyle: "dashed",
    borderColor: "var(--container-border-alt)",
    borderRadius: "var(--curves-lg)",
    backgroundColor: "var(--container-bg)",
    color: "var(--container-fg)",
  },
  // Nested inside the region's --curves-lg, so it curves less than its parent.
  iconTile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "var(--sizing-size-48)",
    height: "var(--sizing-size-48)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--container-border)",
    borderRadius: "var(--curves-md)",
    backgroundColor: "var(--container-bg-alt)",
    color: "var(--container-fg-alt)",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    maxWidth: "28rem",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--spacing-sm)",
  },
} satisfies Record<string, CSSProperties>;

/**
 * Shown in the dashboard's main content area when the account has no projects.
 * Render it in place of the project list, below the page's own <h1>.
 */
export default function ProjectsEmptyState({
  onCreateProject,
  learnMoreHref,
}: ProjectsEmptyStateProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} style={styles.region}>
      <div style={styles.iconTile} aria-hidden="true">
        <FolderPlus size={24} strokeWidth={1.75} />
      </div>

      <div style={styles.copy}>
        <Typography id={headingId} variant="subheading" as="h2" align="center">
          No projects yet
        </Typography>
        <Typography variant="body" tone="muted" align="center">
          Projects keep related work, files and teammates together. Create your
          first one to start filling this dashboard.
        </Typography>
      </div>

      <div style={styles.actions}>
        <Button onClick={onCreateProject}>
          <Plus size={16} aria-hidden="true" />
          New project
        </Button>
        {learnMoreHref ? (
          <Button asChild variant="outline">
            <a href={learnMoreHref}>Learn about projects</a>
          </Button>
        ) : null}
      </div>
    </section>
  );
}
