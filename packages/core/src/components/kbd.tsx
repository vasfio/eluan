import * as React from "react"
import * as stylex from "@stylexjs/stylex"

type KbdVariant = "default" | "outline" | "ghost"
type KbdSize = "sm" | "default" | "lg"

const kbdVariants = () => ""

export interface KbdProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "style"> {
  keys?: string | string[]
  size?: KbdSize
  variant?: KbdVariant
}

export type KbdGroupProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
>

export interface ShortcutProps extends Omit<KbdProps, "keys"> {
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
  forceCtrl?: boolean
}

const KEY_SYMBOLS: Record<string, string> = {
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
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
  arrowup: "↑",
  arrowdown: "↓",
  arrowleft: "←",
  arrowright: "→",
  capslock: "⇪",
  caps: "⇪",
  pageup: "⇞",
  pagedown: "⇟",
  home: "↖",
  end: "↘",
  insert: "⎀",
}

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

const styles = stylex.create({
  root: {
    alignItems: "center",
    borderRadius: "var(--curves-sm)",
    borderStyle: "solid",
    borderWidth: 1,
    display: "inline-flex",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    justifyContent: "center",
  },
  default: {
    backgroundColor: "var(--container-bg-alt)",
    borderColor: "var(--container-border-alt)",
    boxShadow: "0 2px 0 0 var(--container-border-alt)",
    color: "var(--container-fg-alt)",
  },
  outline: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border-alt)",
    color: "var(--container-fg)",
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: "var(--container-fg-alt)",
  },
  sm: {
    fontSize: "var(--font-size-xs)",
    height: "var(--size-xs)",
    minWidth: "var(--size-xs)",
    paddingInline: "var(--spacing-xs)",
  },
  md: {
    height: "var(--size-sm)",
    minWidth: "var(--size-sm)",
    paddingInline: "var(--spacing-xs)",
  },
  lg: {
    fontSize: "var(--font-size-base)",
    height: "var(--size-md)",
    minWidth: "var(--size-md)",
    paddingInline: "var(--spacing-sm)",
  },
  plus: {
    color: "var(--interactive-fg-disabled)",
    marginInline: "var(--spacing-xxs)",
  },
  group: {
    alignItems: "center",
    display: "inline-flex",
    gap: "var(--spacing-xxs)",
  },
})

function formatKey(key: string): string {
  const lowercaseKey = key.toLowerCase().trim()
  return KEY_SYMBOLS[lowercaseKey] || key.toUpperCase()
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ variant = "default", size = "default", keys, children, ...props }, ref) => {
    let content: React.ReactNode = children

    if (keys) {
      const keyArray = Array.isArray(keys) ? keys : keys.split("+")
      content = keyArray.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span {...stylex.props(styles.plus)}>+</span>}
          <span>{formatKey(key)}</span>
        </React.Fragment>
      ))
    }

    return (
      <kbd
        ref={ref}
        {...props}
        {...stylex.props(
          styles.root,
          variant === "default" && styles.default,
          variant === "outline" && styles.outline,
          variant === "ghost" && styles.ghost,
          size === "sm" && styles.sm,
          size === "default" && styles.md,
          size === "lg" && styles.lg
        )}
      >
        {content}
      </kbd>
    )
  }
)
Kbd.displayName = "Kbd"

const KbdGroup = React.forwardRef<HTMLDivElement, KbdGroupProps>(
  ({ ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.group)} />
  )
)
KbdGroup.displayName = "KbdGroup"

const Shortcut = React.forwardRef<HTMLElement, ShortcutProps>(
  ({ shortcut, forceCtrl, variant, size, ...props }, ref) => {
    const keys = SHORTCUTS[shortcut]

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
        {...props}
      />
    )
  }
)
Shortcut.displayName = "Shortcut"

export { Kbd, KbdGroup, Shortcut, kbdVariants, KEY_SYMBOLS, formatKey }
