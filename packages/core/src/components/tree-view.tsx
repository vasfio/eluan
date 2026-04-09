import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react"

import { cn } from "@/lib/utils"

export interface TreeNode {
  id: string
  name: string
  icon?: React.ReactNode
  children?: TreeNode[]
  data?: unknown
}

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
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
      className,
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
            className={cn(
              "flex w-full items-center gap-[var(--spacing-sm)] rounded-md px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[var(--font-size-sm)] hover:bg-[var(--interactive-bg-hover)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)]",
              isSelected && "bg-[var(--interactive-bg-selected)] text-[var(--interactive-fg-selected)] hover:text-[var(--interactive-fg)]"
            )}
            style={{ paddingLeft: `${depth * indentSize + 8}px` }}
          >
            {showIcons && (
              <span className={cn("shrink-0 text-[var(--interactive-fg-alt)]", isSelected && "text-[var(--interactive-fg-selected)]")}>
                {node.icon ?? <File className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />}
              </span>
            )}
            <span className="truncate">{node.name}</span>
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
              className={cn(
                "flex w-full items-center gap-[var(--spacing-sm)] rounded-[var(--curves-md)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[var(--font-size-sm)] hover:bg-[var(--interactive-bg-hover)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-border)]",
              isSelected && "bg-[var(--interactive-bg-selected)] text-[var(--interactive-fg-selected)] hover:text-[var(--interactive-fg)]"
              )}
              style={{ paddingLeft: `${depth * indentSize + 8}px` }}
            >
              <ChevronRight
                className={cn(
                  "h-[var(--size-xxs)] w-[var(--size-xxs)] shrink-0 text-[var(--interactive-fg-alt)] transition-transform",
                  isExpanded && "rotate-90",
                  isSelected && "text-[var(--interactive-fg-selected)]"
                )}
              />
              {showIcons && (
                <span className={cn("shrink-0 text-[var(--interactive-fg-alt)]", isSelected && "text-[var(--interactive-fg-selected)]")}>
                  {node.icon ??
                    (isExpanded ? (
                      <FolderOpen className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
                    ) : (
                      <Folder className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />
                    ))}
                </span>
              )}
              <span className="truncate">{node.name}</span>
            </button>
          </CollapsiblePrimitive.Trigger>
          <CollapsiblePrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            {node.children?.map((child) => renderNode(child, depth + 1))}
          </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
      )
    }

    return (
      <div ref={ref} className={cn("space-y-1", className)} {...props}>
        {data.map((node) => renderNode(node))}
      </div>
    )
  }
)
TreeView.displayName = "TreeView"

export { TreeView }
