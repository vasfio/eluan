import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import * as stylex from "@stylexjs/stylex"
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react"

import { useControllableState } from "../utils"

export interface TreeNode {
  id: string
  name: string
  icon?: React.ReactNode
  children?: TreeNode[]
  data?: unknown
}

// Custom icons may arrive at any intrinsic size (e.g. Lucide defaults to 24px).
// Clone valid elements to fill the fixed-size icon slot so they match text height.
const renderIcon = (icon: React.ReactNode): React.ReactNode =>
  React.isValidElement(icon)
    ? React.cloneElement(
        icon as React.ReactElement<{ width?: string; height?: string }>,
        { width: "100%", height: "100%" }
      )
    : icon

export interface TreeViewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style" | "onSelect"> {
  data: TreeNode[]
  selectedId?: string
  onSelect?: (node: TreeNode) => void
  expandedIds?: string[]
  onExpandChange?: (ids: string[]) => void
  showIcons?: boolean
  /**
   * Indent per depth level, in px. Overrides the token-based default
   * (one chevron slot plus the row gap), which keeps a child's icon aligned
   * under its parent's label across every spacing density.
   */
  indentSize?: number
}

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      data,
      selectedId,
      onSelect,
      expandedIds: controlledExpandedIds,
      onExpandChange,
      showIcons = true,
      indentSize,
      ...props
    },
    ref
  ) => {
    const [expandedIds, setExpandedIds] = useControllableState<string[]>({
      value: controlledExpandedIds,
      defaultValue: [],
      onChange: onExpandChange,
    })

    const handleExpand = (id: string) => {
      const newIds = expandedIds.includes(id)
        ? expandedIds.filter((i) => i !== id)
        : [...expandedIds, id]
      setExpandedIds(newIds)
    }

    // Each level indents by one chevron slot plus the row gap, so a child's
    // icon starts where its parent's label does. An explicit `indentSize`
    // opts out of the token scale and uses raw px.
    const paddingLeft = (depth: number) =>
      indentSize === undefined
        ? `calc(var(--spacing-sm) + ${depth} * (var(--size-xxs) + var(--spacing-sm)))`
        : `${depth * indentSize + 8}px`

    const renderNode = (node: TreeNode, depth: number = 0) => {
      const hasChildren = node.children && node.children.length > 0
      const isExpanded = expandedIds.includes(node.id)
      const isSelected = selectedId === node.id

      if (!hasChildren) {
        return (
          <button
            key={node.id}
            type="button"
            role="treeitem"
            aria-selected={isSelected}
            onClick={() => onSelect?.(node)}
            {...stylex.props(styles.node, isSelected && styles.nodeSelected)}
            style={{ paddingLeft: paddingLeft(depth) }}
          >
            <span aria-hidden="true" {...stylex.props(styles.chevronSpacer)} />
            {showIcons && (
              <span aria-hidden="true" {...stylex.props(styles.iconWrap, isSelected && styles.iconSelected)}>
                {node.icon ? (
                  renderIcon(node.icon)
                ) : (
                  <File {...stylex.props(styles.icon)} />
                )}
              </span>
            )}
            <span {...stylex.props(styles.label)}>{node.name}</span>
          </button>
        )
      }

      return (
        <CollapsiblePrimitive.Root
          key={node.id}
          open={isExpanded}
          onOpenChange={() => handleExpand(node.id)}
        >
          <CollapsiblePrimitive.Trigger asChild>
            <button
              type="button"
              role="treeitem"
              aria-selected={isSelected}
              onClick={() => onSelect?.(node)}
              {...stylex.props(styles.node, isSelected && styles.nodeSelected)}
              style={{ paddingLeft: paddingLeft(depth) }}
            >
              <ChevronRight
                aria-hidden="true"
                {...stylex.props(
                  styles.chevron,
                  isExpanded && styles.chevronExpanded,
                  isSelected && styles.iconSelected
                )}
              />
              {showIcons && (
                <span aria-hidden="true" {...stylex.props(styles.iconWrap, isSelected && styles.iconSelected)}>
                  {node.icon ? (
                    renderIcon(node.icon)
                  ) : isExpanded ? (
                    <FolderOpen {...stylex.props(styles.icon)} />
                  ) : (
                    <Folder {...stylex.props(styles.icon)} />
                  )}
                </span>
              )}
              <span {...stylex.props(styles.label)}>{node.name}</span>
            </button>
          </CollapsiblePrimitive.Trigger>
          <CollapsiblePrimitive.Content role="group" {...stylex.props(styles.content)}>
            {node.children?.map((child) => renderNode(child, depth + 1))}
          </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
      )
    }

    return (
      <div ref={ref} role="tree" {...props} {...stylex.props(styles.root)}>
        {data.map((node) => renderNode(node))}
      </div>
    )
  }
)
TreeView.displayName = "TreeView"

const accordionDown = stylex.keyframes({
  from: {
    height: 0,
  },
  to: {
    height: "var(--radix-collapsible-content-height)",
  },
})

const accordionUp = stylex.keyframes({
  from: {
    height: "var(--radix-collapsible-content-height)",
  },
  to: {
    height: 0,
  },
})

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xxs)",
  },
  node: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--curves-md)",
    color: "var(--interactive-fg)",
    display: "flex",
    fontSize: "var(--font-size-sm)",
    gap: "var(--spacing-sm)",
    paddingBlock: "var(--spacing-xs)",
    paddingRight: "var(--spacing-sm)",
    textAlign: "left",
    width: "100%",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
    ":focus": {
      outlineStyle: "none",
    },
    ":focus-visible": {
      boxShadow: "0 0 0 1px var(--interactive-border)",
    },
  },
  nodeSelected: {
    backgroundColor: "var(--interactive-bg-selected)",
    color: "var(--interactive-fg-selected)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-selected)",
      color: "var(--interactive-fg-selected)",
    },
  },
  iconWrap: {
    alignItems: "center",
    color: "var(--interactive-fg-alt)",
    display: "flex",
    flexShrink: 0,
    height: "var(--size-xxs)",
    justifyContent: "center",
    width: "var(--size-xxs)",
  },
  iconSelected: {
    color: "var(--interactive-fg-selected)",
  },
  icon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  chevron: {
    color: "var(--interactive-fg-alt)",
    flexShrink: 0,
    height: "var(--size-xxs)",
    transitionDuration: "150ms",
    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--size-xxs)",
  },
  chevronExpanded: {
    transform: "rotate(90deg)",
  },
  // Reserves the chevron column on leaf rows so icons line up with siblings.
  chevronSpacer: {
    flexShrink: 0,
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  label: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  content: {
    overflow: "hidden",
    "[data-state=open]": {
      animationDuration: {
        default: "200ms",
        "@media (prefers-reduced-motion: reduce)": "0.01ms",
      },
      animationName: accordionDown,
      animationTimingFunction: "ease-out",
    },
    "[data-state=closed]": {
      animationDuration: {
        default: "200ms",
        "@media (prefers-reduced-motion: reduce)": "0.01ms",
      },
      animationName: accordionUp,
      animationTimingFunction: "ease-out",
    },
  },
})

export { TreeView }
