"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import * as stylex from "@stylexjs/stylex"

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface DrawerContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DrawerContext = React.createContext<DrawerContextValue | undefined>(
  undefined
)

function useDrawer() {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer")
  }
  return context
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DrawerProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

type DrawerButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> & {
  asChild?: boolean
}

type DrawerDivProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
>

type DrawerHeadingProps = Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  "className" | "style"
>

type DrawerParagraphProps = Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  "className" | "style"
>

type DrawerSide = "left" | "right"

type DrawerContentProps = DrawerDivProps & {
  side?: DrawerSide
  /** Panel width when open. Number is treated as px. Defaults to 320px. */
  width?: number | string
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = stylex.create({
  layout: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  panel: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border)",
    borderStyle: "solid",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flexShrink: 0,
    height: "100%",
    overflow: "hidden",
    transitionDuration: "300ms",
    transitionProperty: "width",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  panelLeft: {
    borderLeftWidth: 0,
    borderRightWidth: 1,
    order: -1,
  },
  panelRight: {
    borderLeftWidth: 1,
    borderRightWidth: 0,
    order: 1,
  },
  panelClosed: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: 0,
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  innerClosed: {
    visibility: "hidden",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    padding: "var(--spacing-md)",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    marginTop: "auto",
    padding: "var(--spacing-md)",
  },
  title: {
    color: "var(--container-fg)",
    fontFamily: "var(--font-heading)",
    fontSize: "var(--font-size-lg)",
    fontWeight: 600,
  },
  description: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-sm)",
  },
})

const dynamicStyles = stylex.create({
  width: (value: string) => ({ width: value }),
})

function resolveWidth(width: number | string | undefined): string {
  if (width == null) return "320px"
  return typeof width === "number" ? `${width}px` : width
}

// ---------------------------------------------------------------------------
// Drawer (root / provider)
// ---------------------------------------------------------------------------

function Drawer({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: DrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const value = React.useMemo(
    () => ({ open, onOpenChange: setOpen }),
    [open, setOpen]
  )

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

/**
 * Flex-row container that places the main content and the inline
 * {@link DrawerContent} panel side by side. Render it inside a `<Drawer>`.
 * The panel collapses/expands within this row, so the main content reclaims
 * the freed space automatically.
 */
const DrawerLayout = React.forwardRef<HTMLDivElement, DrawerDivProps>(
  ({ ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.layout)} />
  )
)
DrawerLayout.displayName = "DrawerLayout"

// ---------------------------------------------------------------------------
// Trigger / Close
// ---------------------------------------------------------------------------

const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerButtonProps>(
  ({ asChild = false, onClick, ...props }, ref) => {
    const { open, onOpenChange } = useDrawer()
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        aria-expanded={open}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          onOpenChange(!open)
          onClick?.(e)
        }}
        {...props}
      />
    )
  }
)
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerButtonProps>(
  ({ asChild = false, onClick, ...props }, ref) => {
    const { onOpenChange } = useDrawer()
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          onOpenChange(false)
          onClick?.(e)
        }}
        {...props}
      />
    )
  }
)
DrawerClose.displayName = "DrawerClose"

// ---------------------------------------------------------------------------
// Content (inline collapsible panel)
// ---------------------------------------------------------------------------

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ side = "right", width, children, ...props }, ref) => {
    const { open, onOpenChange } = useDrawer()
    const resolvedWidth = resolveWidth(width)

    // Merge the forwarded ref with a local one so the effect below can test
    // whether focus currently lives inside the collapsing panel.
    const panelRef = React.useRef<HTMLDivElement | null>(null)
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        panelRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      },
      [ref]
    )

    // Remember what had focus before opening; restore it when the panel closes
    // if focus was left inside the panel. Without this, focus would be stranded
    // on the now `aria-hidden`, visually-hidden close button (the panel is
    // inline and collapses rather than unmounting).
    const previouslyFocused = React.useRef<HTMLElement | null>(null)
    const wasOpen = React.useRef(open)

    React.useEffect(() => {
      if (open && !wasOpen.current) {
        previouslyFocused.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null
      } else if (!open && wasOpen.current) {
        const active = document.activeElement
        if (
          panelRef.current &&
          active instanceof Node &&
          panelRef.current.contains(active)
        ) {
          previouslyFocused.current?.focus?.()
        }
      }
      wasOpen.current = open
    }, [open])

    React.useEffect(() => {
      if (!open) return
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onOpenChange(false)
      }
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }, [open, onOpenChange])

    return (
      <div
        ref={setRefs}
        data-state={open ? "open" : "closed"}
        aria-hidden={!open}
        {...props}
        {...stylex.props(
          styles.panel,
          side === "left" ? styles.panelLeft : styles.panelRight,
          open ? dynamicStyles.width(resolvedWidth) : styles.panelClosed
        )}
      >
        <div
          {...stylex.props(
            styles.inner,
            dynamicStyles.width(resolvedWidth),
            !open && styles.innerClosed
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)
DrawerContent.displayName = "DrawerContent"

// ---------------------------------------------------------------------------
// Header / Footer / Title / Description
// ---------------------------------------------------------------------------

const DrawerHeader = ({ ...props }: DrawerDivProps) => (
  <div {...props} {...stylex.props(styles.header)} />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({ ...props }: DrawerDivProps) => (
  <div {...props} {...stylex.props(styles.footer)} />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerHeadingProps>(
  ({ ...props }, ref) => (
    <h2 ref={ref} {...props} {...stylex.props(styles.title)} />
  )
)
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  DrawerParagraphProps
>(({ ...props }, ref) => (
  <p ref={ref} {...props} {...stylex.props(styles.description)} />
))
DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer,
  DrawerLayout,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
