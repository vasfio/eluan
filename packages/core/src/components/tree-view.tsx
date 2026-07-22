import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import * as stylex from "@stylexjs/stylex"
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react"

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
      indentSize = 20,
      ...props
    },
    ref
  ) => {
    const [internalExpandedIds, setInternalExpandedIds] = React.useState<
      string[]
    >([])

    const expandedIds = controlledExpandedIds ?? internalExpandedIds

    const handleExpand = (id: string) => {
      const newIds = expandedIds.includes(id)
        ? expandedIds.filter((i) => i !== id)
        : [...expandedIds, id]

      if (onExpandChange) {
        onExpandChange(newIds)
      } else {
        setInternalExpandedIds(newIds)
      }
    }

    const renderNode = (node: TreeNode, depth: number = 0) => {
      const hasChildren = node.children && node.children.length > 0
      const isExpanded = expandedIds.includes(node.id)
      const isSelected = selectedId === node.id

      if (!hasChildren) {
        return (
          <button
            key={node.id}
            type="button"
            onClick={() => onSelect?.(node)}
            {...stylex.props(styles.node, isSelected && styles.nodeSelected)}
            style={{ paddingLeft: `${depth * indentSize + 8}px` }}
          >
            {showIcons && (
              <span {...stylex.props(styles.iconWrap, isSelected && styles.iconSelected)}>
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
              onClick={() => onSelect?.(node)}
              {...stylex.props(styles.node, isSelected && styles.nodeSelected)}
              style={{ paddingLeft: `${depth * indentSize + 8}px` }}
            >
              <ChevronRight
                {...stylex.props(
                  styles.chevron,
                  isExpanded && styles.chevronExpanded,
                  isSelected && styles.iconSelected
                )}
              />
              {showIcons && (
                <span {...stylex.props(styles.iconWrap, isSelected && styles.iconSelected)}>
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
          <CollapsiblePrimitive.Content {...stylex.props(styles.content)}>
            {node.children?.map((child) => renderNode(child, depth + 1))}
          </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
      )
    }

    return (
      <div ref={ref} {...props} {...stylex.props(styles.root)}>
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
  label: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  content: {
    overflow: "hidden",
    "[data-state=open]": {
      animationDuration: "200ms",
      animationName: accordionDown,
      animationTimingFunction: "ease-out",
    },
    "[data-state=closed]": {
      animationDuration: "200ms",
      animationName: accordionUp,
      animationTimingFunction: "ease-out",
    },
  },
})

export { TreeView }
