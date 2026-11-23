---
name: empty-states
---

# Empty states

## When this applies

A view has nothing to show: no projects yet, no search results, a cleared inbox, a filter that matches nothing. The router sends "Show that there's nothing yet" here.

Eluan has no EmptyState component. Compose one from Typography, an optional Lucide icon and one Button, and mark it `// eluan: composed, no component for empty state`.

## Choosing components

| Situation | Use | Not |
| --- | --- | --- |
| First use: nothing created yet | heading, one line of explanation, one primary [Button](../components/button.md) that creates the first item | an empty Table with headers |
| No results for a search or filter | heading, a line naming the query, an `outline` Button to clear filters | a Toast saying "No results" |
| Everything done (cleared inbox) | heading and one line; no action needed | a primary Button with nothing to do |
| Still loading | [Skeleton](../components/skeleton.md), not an empty state | "No items" flashing before data arrives |
| Failed to load | [Banner](../components/banner.md) `variant="destructive"` with a retry action | an empty state that hides the error |

## Structure

A centred column inside the area that would hold the content:

1. Optional icon, decorative, `aria-hidden="true"`, sized `--size-md`, coloured `--container-fg-alt`.
2. Heading: `Typography variant="subheading"` with the right heading level for the page.
3. One line of body text: `Typography variant="body" tone="muted"`.
4. One action, or none.

Gap between parts `--spacing-sm`, and `--spacing-lg` before the action. Pad the region with `--spacing-3xl` so it doesn't hug the edges. <!-- REVIEW: no empty-state source in the repo; structure and spacing are drafted. -->

## Rules

1. Say what's missing and what to do next, in plain words: "No projects yet", "Create a project to get started."
2. Offer one action at most. Make it primary only on first use; use `outline` for "Clear filters".
3. Keep the empty state inside the region it replaces, so the page's header and navigation stay.
4. Don't use an empty state while data is loading; show Skeleton.
5. Don't add illustrations, colours or fonts that aren't in the theme. A Lucide icon is enough.

## Example

```tsx
// eluan: composed, no component for empty state
import { Button, Typography } from "@eluan/core";
import { FolderPlus } from "lucide-react";

export function ProjectsEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "var(--spacing-sm)",
        padding: "var(--spacing-3xl)",
      }}
    >
      <FolderPlus aria-hidden="true" style={{ width: "var(--size-md)", height: "var(--size-md)", color: "var(--container-fg-alt)" }} />
      <Typography variant="subheading" as="h2">No projects yet</Typography>
      <Typography variant="body" tone="muted">Create a project to start tracking work.</Typography>
      <div style={{ marginTop: "var(--spacing-lg)" }}>
        <Button type="button" onClick={onCreate}>Create project</Button>
      </div>
    </div>
  );
}
```

## Dos and don'ts

**Do:** give a first-use empty state one clear primary action.

**Don't:** offer three buttons ("Import", "Create", "Learn more") of equal weight.

**Do:** show Skeleton while loading, then the empty state only if the result is empty.

**Don't:** render an empty Table with column headers and no rows.

## Common agent mistakes

_Filled from evals._
