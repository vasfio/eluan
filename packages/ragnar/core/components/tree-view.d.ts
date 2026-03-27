import * as React from "react";
export interface TreeNode {
    id: string;
    name: string;
    icon?: React.ReactNode;
    children?: TreeNode[];
    data?: unknown;
}
export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    data: TreeNode[];
    selectedId?: string;
    onSelect?: (node: TreeNode) => void;
    expandedIds?: string[];
    onExpandChange?: (ids: string[]) => void;
    showIcons?: boolean;
    indentSize?: number;
}
declare const TreeView: React.ForwardRefExoticComponent<TreeViewProps & React.RefAttributes<HTMLDivElement>>;
export { TreeView };
