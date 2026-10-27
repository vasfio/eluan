---
name: TreeView
use_when: Showing hierarchical data the user expands and picks from, such as a file explorer, a folder picker or a category tree.
instead_of: Accordion for stacked content sections; NavigationDrawer for app navigation; nested lists you build yourself.
source: packages/core/src/components/tree-view.tsx
---

# TreeView

## 1. Overview

TreeView renders nested data as an expandable tree. You pass an array of `TreeNode` objects; parents expand and collapse, any node can be selected, and folder and file icons are added for you. Selection is always controlled by you; expansion can be controlled or left to the component.

## 2. When to use

- File and folder structures: a project explorer, an asset library.
- Picking one node from a hierarchy: a category, a folder to move items into.
- Org charts or taxonomies the user browses level by level.

### When not to use

- Stacked sections of content → use [Accordion](./accordion.md).
- App or site navigation → use [NavigationDrawer](./navigation-drawer.md) or [NavigationMenu](./navigation-menu.md); see [navigation.md](../patterns/navigation.md).
- Flat records with the same fields → use [Table](./table.md).
- Picking several items from a flat list → use [MultiSelect](./multi-select.md) or [CheckboxGroup](./checkbox-group.md).
- A single show/hide region → use [Collapsible](./collapsible.md).

## 3. Anatomy

1. **Tree**: the root `<div>`, a column of rows with a `--spacing-xxs` gap.
2. **Row**: one `<button>` per node, full width, `--font-size-sm`, `--curves-md` corners.
3. **Chevron**: on parent rows, points right when collapsed and down when expanded. Leaf rows reserve the same space so icons line up.
4. **Icon** (optional): a folder (closed or open) for parents, a file for leaves, or the node's own `icon`. Fills a `--size-xxs` box.
5. **Label**: the node's `name`, on one line with an ellipsis when it doesn't fit.
6. **Group**: the container for a parent's children, indented one chevron slot plus the row gap per level.

## 4. Variants

TreeView has no `variant` prop. `showIcons={false}` hides the folder, file and custom icons; chevrons stay.

## 5. Sizes

TreeView has no size prop. Rows use `--font-size-sm` and `--spacing-xs` vertical padding, and the indent is built from `--size-xxs` and `--spacing-sm`, so everything follows density. `indentSize` replaces the indent with a raw pixel value; leave it unset.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Transparent row, `--interactive-fg` text, muted icons | |
| Hover | `--interactive-bg-hover` row background | |
| Focus | 1px ring in `--interactive-border`, drawn with a shadow | Never remove or restyle the focus ring. The ring currently measures below 3:1. <!-- REVIEW: W1 (fix/focus-ring-token). This ring is a box-shadow, not outlineColor, so W1's mechanical outlineColor swap will miss it. --> |
| Selected | `--interactive-bg-selected` background, `--interactive-fg-selected` text and icons | A near-black row in the default theme. <!-- REVIEW: same row-scale question as the Table selected row in the fix plan's "Decide before coding". --> |
| Expanded | Chevron points down; parent icon becomes an open folder; children slide open | |

## 7. Content guidelines

- Use the item's real name as `name`: file names keep their extension and case ("README.md").
- Keep names short; long names are cut with an ellipsis and the full text isn't shown on hover.
- Order children the way users expect to scan them, for example folders first, then files, each alphabetical. <!-- REVIEW: ordering guidance drafted. -->

| Do | Don't |
| --- | --- |
| `components` | `Components Folder` |
| `button.tsx` | `button` (extension dropped) |

## 8. Rules

1. Give TreeView an `aria-label` that says what the tree holds: "Project files".
2. Keep `selectedId` in your state and update it from `onSelect`. TreeView has no internal selection, so without this nothing looks selected.
3. To open nodes on first render, control expansion with `expandedIds` and `onExpandChange`; there's no default-expanded prop.
4. Give every node a unique, stable `id`. Put your own payload in `data`; it comes back in `onSelect`.
5. An empty folder (`children: []`) renders as a leaf with a file icon. Pass `icon={<Folder />}` for it.
6. Pass custom icons as Lucide elements without sizing; TreeView sizes them to its icon box.
7. Leave `indentSize` unset. It's raw pixels and breaks density scaling.
8. Never pass `className` or `style`; they're dropped. Size and frame the tree with a wrapper.

## 9. Dos and don'ts

**Do:** control selection and name the tree.

```tsx
const [selectedId, setSelectedId] = React.useState<string>();

<TreeView aria-label="Project files" data={files} selectedId={selectedId} onSelect={(node) => setSelectedId(node.id)} />
```

**Don't:** expect clicks to select on their own, or leave the tree unnamed.

```tsx
<TreeView data={files} />
```

**Do:** let TreeView size custom icons.

```tsx
const files: TreeNode[] = [{ id: "logo", name: "logo.svg", icon: <FileImage /> }];
```

**Don't:** size icons or the indent in pixels.

```tsx
const files: TreeNode[] = [{ id: "logo", name: "logo.svg", icon: <FileImage size={16} /> }];

<TreeView data={files} indentSize={24} />
```

## 10. Accessibility

- Role: the root is a `tree`, each row a `treeitem` with `aria-selected`, and each children container a `group`. Parent rows also get `aria-expanded` and `aria-controls`.
- Label: pass `aria-label` (or `aria-labelledby`) to TreeView; it has no name by default. Each row is named by its `name`; icons are `aria-hidden`.
- Keyboard: every visible row is a button in the Tab order. Enter or Space selects the row, and on a parent also toggles it. There's no arrow-key movement, roving focus or typeahead, which the WAI-ARIA tree pattern expects. <!-- REVIEW: not in the fix plan; rows are separate tab stops, so a large tree is slow to cross by keyboard. -->
- Focus: stays on the row after selecting or toggling. Collapsing a parent hides its children, so focus never sits on a hidden row.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Clicking a parent selects it and toggles it in one action. If parents shouldn't be selectable, ignore parent nodes in `onSelect` (check `node.children?.length`). <!-- REVIEW: workaround drafted; the source always calls onSelect for parents. -->
- Responsive: TreeView fills its parent's width. Put it in a fixed-width panel and wrap that in [ScrollArea](./scroll-area.md) for long trees.
- Overflow and truncation: labels stay on one line and truncate with an ellipsis; there's no tooltip with the full name.
- Motion: chevrons turn over 150ms and children expand and collapse over 200ms; both animations drop to near zero under reduced motion. Don't add your own.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `TreeNode[]` | | Required. The nodes to render. `TreeNode` is `{ id: string; name: string; icon?: ReactNode; children?: TreeNode[]; data?: unknown }`. |
| `selectedId` | `string` | | The selected node's id. Controlled only. |
| `onSelect` | `(node: TreeNode) => void` | | Called when any row is clicked, parents included. |
| `expandedIds` | `string[]` | | Expanded node ids (controlled). Uncontrolled trees start fully collapsed. |
| `onExpandChange` | `(ids: string[]) => void` | | Called with the new list when a parent opens or closes. |
| `showIcons` | `boolean` | `true` | Shows folder, file and custom icons. |
| `indentSize` | `number` | | Pixel indent per level, replacing the token-based default. Avoid. |
| `aria-label` | `string` | | Names the tree. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style`, `onSelect` | | Native div attributes on the root. |
<!-- api:end -->

## 13. Examples

A project file explorer with a folder open on first render.

```tsx
import * as React from "react";
import { TreeView, Typography, type TreeNode } from "@eluan/core";
import { FileCode, FileJson, FileText, Folder } from "lucide-react";

const files: TreeNode[] = [
  {
    id: "src",
    name: "src",
    children: [
      {
        id: "src/components",
        name: "components",
        children: [
          { id: "src/components/button.tsx", name: "button.tsx", icon: <FileCode /> },
          { id: "src/components/card.tsx", name: "card.tsx", icon: <FileCode /> },
        ],
      },
      { id: "src/hooks", name: "hooks", children: [], icon: <Folder /> },
      { id: "src/index.ts", name: "index.ts", icon: <FileCode /> },
    ],
  },
  { id: "package.json", name: "package.json", icon: <FileJson /> },
  { id: "README.md", name: "README.md", icon: <FileText /> },
];

export function ProjectExplorer({ onOpenFile }: { onOpenFile: (path: string) => void }) {
  const [selectedId, setSelectedId] = React.useState<string>("src/components/button.tsx");
  const [expandedIds, setExpandedIds] = React.useState<string[]>(["src", "src/components"]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-sm)",
        padding: "var(--spacing-sm)",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "var(--container-border)",
        borderRadius: "var(--curves-lg)",
      }}
    >
      <Typography id="explorer-heading" variant="label" tone="muted">
        Files
      </Typography>
      <TreeView
        aria-labelledby="explorer-heading"
        data={files}
        selectedId={selectedId}
        onSelect={(node) => {
          setSelectedId(node.id);
          if (!node.children) onOpenFile(node.id);
        }}
        expandedIds={expandedIds}
        onExpandChange={setExpandedIds}
      />
    </div>
  );
}
```

## 14. Related components

- [Accordion](./accordion.md): expandable content sections rather than data.
- [Collapsible](./collapsible.md): the primitive TreeView uses for each parent.
- [ScrollArea](./scroll-area.md): scroll a long tree inside a fixed panel.
- [Table](./table.md): flat records with the same fields.

## 15. Common agent mistakes

_Filled from evals._
