import * as React from "react";
interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Direction of the panel group */
    direction?: "horizontal" | "vertical";
    /** Auto save layout to localStorage with this key */
    autoSaveId?: string;
    /** Called when layout changes */
    onLayout?: (sizes: number[]) => void;
}
declare const ResizablePanelGroup: React.ForwardRefExoticComponent<ResizablePanelGroupProps & React.RefAttributes<HTMLDivElement>>;
interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Unique identifier for the panel */
    id?: string;
    /** Default size as percentage */
    defaultSize?: number;
    /** Minimum size as percentage */
    minSize?: number;
    /** Maximum size as percentage */
    maxSize?: number;
    /** Whether the panel can be collapsed */
    collapsible?: boolean;
}
declare const ResizablePanel: React.ForwardRefExoticComponent<ResizablePanelProps & React.RefAttributes<HTMLDivElement>>;
interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Whether to show the grip icon */
    withHandle?: boolean;
}
declare const ResizableHandle: React.ForwardRefExoticComponent<ResizableHandleProps & {
    index?: number;
} & React.RefAttributes<HTMLDivElement>>;
export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
