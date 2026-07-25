import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import * as stylex from "@stylexjs/stylex"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./dialog"
import { Separator } from "./separator"

type CommandScale = "default" | "dialog"

export type CommandProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>,
  "className" | "style"
>

export type CommandDialogProps = DialogProps & {
  title?: string
  description?: string
}

export type CommandInputProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
  "className" | "size" | "style"
> & {
  density?: "default" | "compact"
}

export type CommandListProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>,
  "className" | "style"
>

export type CommandEmptyProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>,
  "className" | "style"
> & {
  tone?: "default" | "muted"
}

export type CommandGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>,
  "className" | "style"
>

export type CommandItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
  "className" | "style"
> & {
  selected?: boolean
}

export type CommandShortcutProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "className" | "style"
>

const CommandScaleContext = React.createContext<CommandScale>("default")

const styles = stylex.create({
  command: {
    backgroundColor: "var(--container-bg)",
    borderRadius: "var(--curves-md)",
    color: "var(--container-fg)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  // Standalone (inline) palettes own their surface: a bordered, elevated card.
  // The dialog variant suppresses this because `DialogContent` already supplies
  // the border + shadow, avoiding a doubled outline.
  commandSurface: {
    borderColor: "var(--container-border)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  srOnly: {
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
  inputWrapper: {
    alignItems: "center",
    borderBottomColor: "var(--container-border)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    display: "flex",
    paddingInline: "var(--spacing-sm)",
  },
  searchIcon: {
    flexShrink: 0,
    height: "var(--size-xxs)",
    marginRight: "var(--spacing-xs)",
    opacity: 0.5,
    width: "var(--size-xxs)",
  },
  searchIconDialog: {
    height: "var(--size-xs)",
    width: "var(--size-xs)",
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--curves-md)",
    color: "var(--interactive-fg)",
    display: "flex",
    fontSize: "var(--font-size-sm)",
    height: "var(--size-xl)",
    outlineStyle: "none",
    paddingBlock: "var(--spacing-md)",
    width: "100%",
    "::placeholder": {
      color: "var(--interactive-fg-alt)",
    },
    ":disabled": {
      backgroundColor: "var(--interactive-bg-disabled)",
      color: "var(--interactive-fg-disabled)",
      cursor: "not-allowed",
    },
  },
  inputCompact: {
    height: "var(--size-lg)",
  },
  list: {
    maxHeight: "18.75rem",
    overflowX: "hidden",
    overflowY: "auto",
  },
  empty: {
    fontSize: "var(--font-size-sm)",
    paddingBlock: "var(--spacing-lg)",
    textAlign: "center",
  },
  emptyMuted: {
    color: "var(--interactive-fg-alt)",
    paddingBlock: "var(--spacing-md)",
  },
  group: {
    color: "var(--interactive-fg)",
    overflow: "hidden",
    padding: "var(--spacing-xs)",
  },
  item: {
    alignItems: "center",
    borderRadius: "var(--curves-sm)",
    cursor: "default",
    display: "flex",
    fontSize: "var(--font-size-sm)",
    gap: "var(--spacing-xs)",
    outlineStyle: "none",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-xs)",
    position: "relative",
    userSelect: "none",
    "[data-disabled=true]": {
      backgroundColor: "var(--interactive-bg-disabled)",
      color: "var(--interactive-fg-disabled)",
      pointerEvents: "none",
    },
    "[data-selected=true]": {
      backgroundColor: "var(--interactive-bg-selected)",
      color: "var(--interactive-fg-selected)",
    },
  },
  itemDialog: {
    paddingBlock: "var(--spacing-sm)",
    paddingInline: "var(--spacing-sm)",
  },
  itemSelected: {
    color: "var(--interactive-fg)",
    fontWeight: 500,
  },
  shortcut: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
    letterSpacing: "0.1em",
    marginLeft: "auto",
  },
})

// cmdk renders the group heading itself (an internal `[cmdk-group-heading]`
// element we never author), so StyleX cannot reach it. This raw rule — scoped
// to a literal `.eluan-command` class on the root, mirroring the calendar.tsx
// pattern — restyles that heading with design tokens. Without it, headings
// render as unstyled, full-size body text.
const commandStyles = `
.eluan-command [cmdk-group-heading] {
  color: var(--container-fg-alt);
  font-size: var(--font-size-xs);
  font-weight: 500;
  padding-block: var(--spacing-xs);
  padding-inline: var(--spacing-xs);
}
`

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(({ children, ...props }, ref) => {
  const scale = React.useContext(CommandScaleContext)
  const { className, style } = stylex.props(
    styles.command,
    scale === "default" && styles.commandSurface
  )

  return (
    <CommandPrimitive
      ref={ref}
      {...props}
      className={`${className ?? ""} eluan-command`}
      style={style}
    >
      <style>{commandStyles}</style>
      {children}
    </CommandPrimitive>
  )
})
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({
  children,
  title = "Command Menu",
  description = "Search for a command to run.",
  ...props
}: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent layout="command">
        {/* Radix requires a title/description on dialog content for a11y;
            keep them present but visually hidden for the command palette. */}
        <div {...stylex.props(styles.srOnly)}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </div>
        <CommandScaleContext.Provider value="dialog">
          <Command>{children}</Command>
        </CommandScaleContext.Provider>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ density = "default", ...props }, ref) => {
  const scale = React.useContext(CommandScaleContext)

  return (
    <div {...stylex.props(styles.inputWrapper)} cmdk-input-wrapper="">
      <Search
        aria-hidden="true"
        {...stylex.props(
          styles.searchIcon,
          scale === "dialog" && styles.searchIconDialog
        )}
      />
      <CommandPrimitive.Input
        ref={ref}
        {...props}
        {...stylex.props(styles.input, density === "compact" && styles.inputCompact)}
      />
    </div>
  )
})
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(({ ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    {...props}
    {...stylex.props(styles.list)}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>(({ tone = "default", ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    {...props}
    {...stylex.props(styles.empty, tone === "muted" && styles.emptyMuted)}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(({ ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    {...props}
    {...stylex.props(styles.group)}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

// Render the design system `Separator` underneath cmdk's filtering wrapper so
// the divider styling is consistent across the codebase, while preserving
// cmdk's auto-hide-on-search behavior.
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ ...props }, ref) => (
  <CommandPrimitive.Separator asChild {...props}>
    <Separator
      ref={ref}
      variant="command"
    />
  </CommandPrimitive.Separator>
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ selected = false, ...props }, ref) => {
  const scale = React.useContext(CommandScaleContext)

  return (
    <CommandPrimitive.Item
      ref={ref}
      {...props}
      {...stylex.props(
        styles.item,
        scale === "dialog" && styles.itemDialog,
        selected && styles.itemSelected
      )}
    />
  )
})
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({ ...props }: CommandShortcutProps) => {
  return (
    <span
      {...props}
      {...stylex.props(styles.shortcut)}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
