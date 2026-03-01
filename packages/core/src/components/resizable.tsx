"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"

import { cn } from "@/lib/utils"

interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of the panel group */
  direction?: "horizontal" | "vertical"
  /** Auto save layout to localStorage with this key */
  autoSaveId?: string
  /** Called when layout changes */
  onLayout?: (sizes: number[]) => void
}

const ResizablePanelGroupContext = React.createContext<{
  direction: "horizontal" | "vertical"
  registerPanel: (id: string, minSize?: number, maxSize?: number, defaultSize?: number) => void
  unregisterPanel: (id: string) => void
  getPanelSize: (id: string) => number
  startResize: (handleIndex: number) => void
  isResizing: boolean
}>({
  direction: "horizontal",
  registerPanel: () => {},
  unregisterPanel: () => {},
  getPanelSize: () => 50,
  startResize: () => {},
  isResizing: false,
})

const ResizablePanelGroup = React.forwardRef<
  HTMLDivElement,
  ResizablePanelGroupProps
>(
  (
    {
      className,
      direction = "horizontal",
      autoSaveId,
      onLayout,
      children,
      ...props
    },
    ref
  ) => {
    const [panels, setPanels] = React.useState<
      Map<string, { minSize: number; maxSize: number; size: number }>
    >(new Map())
    const [isResizing, setIsResizing] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const resizeIndexRef = React.useRef<number>(-1)
    const startSizesRef = React.useRef<number[]>([])

    const panelIds = React.useMemo(() => {
      const ids: string[] = []
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === ResizablePanel) {
          ids.push(child.props.id || `panel-${ids.length}`)
        }
      })
      return ids
    }, [children])

    const registerPanel = React.useCallback(
      (id: string, minSize = 10, maxSize = 100, defaultSize = 50) => {
        setPanels((prev) => {
          const next = new Map(prev)
          if (!next.has(id)) {
            next.set(id, { minSize, maxSize, size: defaultSize })
          }
          return next
        })
      },
      []
    )

    const unregisterPanel = React.useCallback((id: string) => {
      setPanels((prev) => {
        const next = new Map(prev)
        next.delete(id)
        return next
      })
    }, [])

    const getPanelSize = React.useCallback(
      (id: string) => panels.get(id)?.size ?? 50,
      [panels]
    )

    const startResize = React.useCallback(
      (handleIndex: number) => {
        setIsResizing(true)
        resizeIndexRef.current = handleIndex
        startSizesRef.current = panelIds.map((id) => getPanelSize(id))
      },
      [panelIds, getPanelSize]
    )

    React.useEffect(() => {
      if (!isResizing) return

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current || resizeIndexRef.current < 0) return

        const rect = containerRef.current.getBoundingClientRect()
        const containerSize = direction === "horizontal" ? rect.width : rect.height
        const pos = direction === "horizontal" ? e.clientX - rect.left : e.clientY - rect.top
        const percentage = (pos / containerSize) * 100

        const idx = resizeIndexRef.current
        const leftId = panelIds[idx]
        const rightId = panelIds[idx + 1]
        const leftPanel = panels.get(leftId)
        const rightPanel = panels.get(rightId)

        if (!leftPanel || !rightPanel) return

        // Calculate cumulative size up to this handle
        let cumulativeSize = 0
        for (let i = 0; i < idx; i++) {
          cumulativeSize += getPanelSize(panelIds[i])
        }

        const totalSize = leftPanel.size + rightPanel.size
        let newLeftSize = percentage - cumulativeSize
        newLeftSize = Math.max(leftPanel.minSize, Math.min(leftPanel.maxSize, newLeftSize))
        let newRightSize = totalSize - newLeftSize
        newRightSize = Math.max(rightPanel.minSize, Math.min(rightPanel.maxSize, newRightSize))
        newLeftSize = totalSize - newRightSize

        setPanels((prev) => {
          const next = new Map(prev)
          next.set(leftId, { ...leftPanel, size: newLeftSize })
          next.set(rightId, { ...rightPanel, size: newRightSize })
          return next
        })
      }

      const handleMouseUp = () => {
        setIsResizing(false)
        resizeIndexRef.current = -1
        onLayout?.(panelIds.map((id) => getPanelSize(id)))
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }, [isResizing, direction, panels, panelIds, getPanelSize, onLayout])

    // Load from localStorage
    React.useEffect(() => {
      if (!autoSaveId) return
      const saved = localStorage.getItem(`resizable-${autoSaveId}`)
      if (saved) {
        try {
          const sizes = JSON.parse(saved) as Record<string, number>
          setPanels((prev) => {
            const next = new Map(prev)
            for (const [id, size] of Object.entries(sizes)) {
              const panel = next.get(id)
              if (panel) {
                next.set(id, { ...panel, size })
              }
            }
            return next
          })
        } catch {}
      }
    }, [autoSaveId])

    // Save to localStorage
    React.useEffect(() => {
      if (!autoSaveId || isResizing) return
      const sizes: Record<string, number> = {}
      panels.forEach((panel, id) => {
        sizes[id] = panel.size
      })
      localStorage.setItem(`resizable-${autoSaveId}`, JSON.stringify(sizes))
    }, [autoSaveId, panels, isResizing])

    return (
      <ResizablePanelGroupContext.Provider
        value={{
          direction,
          registerPanel,
          unregisterPanel,
          getPanelSize,
          startResize,
          isResizing,
        }}
      >
        <div
          ref={(node) => {
            (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            if (typeof ref === "function") ref(node)
            else if (ref) ref.current = node
          }}
          className={cn(
            "flex h-full w-full",
            direction === "vertical" && "flex-col",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </ResizablePanelGroupContext.Provider>
    )
  }
)
ResizablePanelGroup.displayName = "ResizablePanelGroup"

interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique identifier for the panel */
  id?: string
  /** Default size as percentage */
  defaultSize?: number
  /** Minimum size as percentage */
  minSize?: number
  /** Maximum size as percentage */
  maxSize?: number
  /** Whether the panel can be collapsed */
  collapsible?: boolean
}

const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  (
    {
      className,
      id,
      defaultSize = 50,
      minSize = 10,
      maxSize = 100,
      children,
      ...props
    },
    ref
  ) => {
    const panelId = React.useId()
    const resolvedId = id || panelId
    const { direction, registerPanel, unregisterPanel, getPanelSize } =
      React.useContext(ResizablePanelGroupContext)

    React.useEffect(() => {
      registerPanel(resolvedId, minSize, maxSize, defaultSize)
      return () => unregisterPanel(resolvedId)
    }, [resolvedId, minSize, maxSize, defaultSize, registerPanel, unregisterPanel])

    const size = getPanelSize(resolvedId)

    return (
      <div
        ref={ref}
        className={cn("overflow-hidden", className)}
        style={{
          [direction === "horizontal" ? "width" : "height"]: `${size}%`,
          flexShrink: 0,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ResizablePanel.displayName = "ResizablePanel"

interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to show the grip icon */
  withHandle?: boolean
}

const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ className, withHandle = false, ...props }, ref) => {
    const { direction, startResize, isResizing } = React.useContext(
      ResizablePanelGroupContext
    )
    const indexRef = React.useRef<number>(-1)

    // Determine handle index based on DOM position
    React.useEffect(() => {
      const el = (ref as React.RefObject<HTMLDivElement>)?.current
      if (!el) return
      const parent = el.parentElement
      if (!parent) return
      const handles = Array.from(parent.querySelectorAll("[data-resizable-handle]"))
      indexRef.current = handles.indexOf(el)
    }, [ref])

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault()
      if (indexRef.current >= 0) {
        startResize(indexRef.current)
      }
    }

    return (
      <div
        ref={ref}
        data-resizable-handle
        className={cn(
          "relative flex items-center justify-center bg-border",
          direction === "horizontal"
            ? "w-px cursor-col-resize"
            : "h-px cursor-row-resize",
          "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
          isResizing && "bg-primary",
          className
        )}
        onMouseDown={handleMouseDown}
        {...props}
      >
        {withHandle && (
          <div
            className={cn(
              "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border",
              direction === "vertical" && "h-3 w-4 rotate-90"
            )}
          >
            <GripVertical className="h-2.5 w-2.5" />
          </div>
        )}
      </div>
    )
  }
)
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
