import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const kbdVariants = cva(
  "inline-flex items-center justify-center rounded border font-mono text-sm font-medium",
  {
    variants: {
      variant: {
        default:
          "border-border bg-muted text-muted-foreground shadow-[0_2px_0_0] shadow-border",
        outline: "border-border bg-background text-foreground",
        ghost: "border-transparent bg-transparent text-muted-foreground",
      },
      size: {
        sm: "h-5 min-w-5 px-1 text-xs",
        default: "h-6 min-w-6 px-1.5",
        lg: "h-7 min-w-7 px-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  /** The key or key combination to display */
  keys?: string | string[]
}

// Map of key names to their display symbols
const KEY_SYMBOLS: Record<string, string> = {
  // Modifiers
  cmd: "⌘",
  command: "⌘",
  ctrl: "⌃",
  control: "⌃",
  alt: "⌥",
  option: "⌥",
  opt: "⌥",
  shift: "⇧",
  meta: "⌘",
  super: "⌘",
  win: "⊞",
  windows: "⊞",

  // Navigation
  enter: "↵",
  return: "↵",
  tab: "⇥",
  escape: "⎋",
  esc: "⎋",
  backspace: "⌫",
  delete: "⌦",
  del: "⌦",
  space: "␣",
  spacebar: "␣",

  // Arrows
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
  arrowup: "↑",
  arrowdown: "↓",
  arrowleft: "←",
  arrowright: "→",

  // Other
  capslock: "⇪",
  caps: "⇪",
  pageup: "⇞",
  pagedown: "⇟",
  home: "↖",
  end: "↘",
  insert: "⎀",
}

function formatKey(key: string): string {
  const lowercaseKey = key.toLowerCase().trim()
  return KEY_SYMBOLS[lowercaseKey] || key.toUpperCase()
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, keys, children, ...props }, ref) => {
    // If keys prop is provided, format it
    let content: React.ReactNode = children

    if (keys) {
      const keyArray = Array.isArray(keys) ? keys : keys.split("+")
      content = keyArray.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="mx-0.5 text-muted-foreground/50">+</span>
          )}
          <span>{formatKey(key)}</span>
        </React.Fragment>
      ))
    }

    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ variant, size }), className)}
        {...props}
      >
        {content}
      </kbd>
    )
  }
)
Kbd.displayName = "Kbd"

// Compound component for key combinations
export interface KbdGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const KbdGroup = React.forwardRef<HTMLDivElement, KbdGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
)
KbdGroup.displayName = "KbdGroup"

// Helper component for common shortcuts
export interface ShortcutProps
  extends Omit<KbdProps, "keys">,
    VariantProps<typeof kbdVariants> {
  /** Shortcut type */
  shortcut:
    | "copy"
    | "paste"
    | "cut"
    | "undo"
    | "redo"
    | "save"
    | "selectAll"
    | "find"
    | "new"
    | "open"
    | "close"
    | "refresh"
    | "print"
    | "bold"
    | "italic"
    | "underline"
  /** Use Ctrl instead of Cmd on all platforms */
  forceCtrl?: boolean
}

// Common shortcuts mapping
const SHORTCUTS: Record<ShortcutProps["shortcut"], string[]> = {
  copy: ["cmd", "c"],
  paste: ["cmd", "v"],
  cut: ["cmd", "x"],
  undo: ["cmd", "z"],
  redo: ["cmd", "shift", "z"],
  save: ["cmd", "s"],
  selectAll: ["cmd", "a"],
  find: ["cmd", "f"],
  new: ["cmd", "n"],
  open: ["cmd", "o"],
  close: ["cmd", "w"],
  refresh: ["cmd", "r"],
  print: ["cmd", "p"],
  bold: ["cmd", "b"],
  italic: ["cmd", "i"],
  underline: ["cmd", "u"],
}

const Shortcut = React.forwardRef<HTMLElement, ShortcutProps>(
  ({ shortcut, forceCtrl, variant, size, className, ...props }, ref) => {
    const keys = SHORTCUTS[shortcut]

    // Check if we're on Mac (for SSR safety, default to showing Cmd)
    const isMac =
      typeof navigator !== "undefined"
        ? navigator.platform.toLowerCase().includes("mac")
        : true

    const displayKeys = keys.map((key) => {
      if ((key === "cmd" || key === "command" || key === "meta") && !isMac) {
        return "ctrl"
      }
      if (forceCtrl && (key === "cmd" || key === "command" || key === "meta")) {
        return "ctrl"
      }
      return key
    })

    return (
      <Kbd
        ref={ref}
        keys={displayKeys}
        variant={variant}
        size={size}
        className={className}
        {...props}
      />
    )
  }
)
Shortcut.displayName = "Shortcut"

export { Kbd, KbdGroup, Shortcut, kbdVariants, KEY_SYMBOLS, formatKey }
