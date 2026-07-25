import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as stylex from "@stylexjs/stylex"
import { X } from "lucide-react"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

export type DialogOverlayProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
  "className" | "style"
>

export type DialogContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  "className" | "style"
> & {
  layout?: "default" | "command"
}

export type DialogDivProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
>

export type DialogTitleProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>,
  "className" | "style"
>

export type DialogDescriptionProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>,
  "className" | "style"
>

const styles = stylex.create({
  overlay: {
    backgroundColor: "var(--container-fg)",
    inset: 0,
    opacity: 0.8,
    position: "fixed",
    zIndex: 50,
  },
  content: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border)",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: "var(--curves-lg)",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    display: "grid",
    gap: "var(--spacing-md)",
    left: "50%",
    maxWidth: "32rem",
    padding: "var(--spacing-lg)",
    position: "fixed",
    top: "50%",
    transform: "translate(-50%, -50%)",
    transitionDuration: "200ms",
    width: "calc(100% - var(--spacing-2xl))",
    zIndex: 50,
  },
  contentCommand: {
    overflow: "hidden",
    padding: 0,
  },
  close: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--curves-sm)",
    color: "inherit",
    opacity: 0.7,
    padding: 0,
    position: "absolute",
    right: "var(--spacing-md)",
    top: "var(--spacing-md)",
    transitionDuration: "150ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      opacity: 1,
    },
    ":focus": {
      outlineStyle: "none",
    },
    ":focus-visible": {
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    ":disabled": {
      pointerEvents: "none",
    },
    "[data-state=open]": {
      backgroundColor: "var(--interactive-bg-hover)",
      color: "var(--interactive-fg-alt)",
    },
  },
  closeIcon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  visuallyHidden: {
    borderWidth: 0,
    clip: "rect(0, 0, 0, 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    textAlign: "center",
    "@media (min-width: 640px)": {
      textAlign: "left",
    },
  },
  footer: {
    display: "flex",
    flexDirection: "column-reverse",
    gap: "var(--spacing-xs)",
    "@media (min-width: 640px)": {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
  },
  title: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--font-size-lg)",
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: 1,
  },
  description: {
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-sm)",
  },
})

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    {...props}
    {...stylex.props(styles.overlay)}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ children, layout = "default", ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      {...props}
      {...stylex.props(
        styles.content,
        layout === "command" && styles.contentCommand
      )}
    >
      {children}
      {/* Command palettes close via Escape/overlay; the X would overlap the
          search input row. */}
      {layout !== "command" && (
        <DialogPrimitive.Close {...stylex.props(styles.close)}>
          <X aria-hidden="true" {...stylex.props(styles.closeIcon)} />
          <span {...stylex.props(styles.visuallyHidden)}>Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  ...props
}: DialogDivProps) => (
  <div
    {...props}
    {...stylex.props(styles.header)}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  ...props
}: DialogDivProps) => (
  <div
    {...props}
    {...stylex.props(styles.footer)}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    {...props}
    {...stylex.props(styles.title)}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    {...props}
    {...stylex.props(styles.description)}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

export type DialogProps = React.ComponentProps<typeof Dialog>
