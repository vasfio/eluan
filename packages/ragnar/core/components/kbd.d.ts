import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const kbdVariants: (props?: ({
    variant?: "default" | "outline" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface KbdProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof kbdVariants> {
    /** The key or key combination to display */
    keys?: string | string[];
}
declare const KEY_SYMBOLS: Record<string, string>;
declare function formatKey(key: string): string;
declare const Kbd: React.ForwardRefExoticComponent<KbdProps & React.RefAttributes<HTMLElement>>;
export interface KbdGroupProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const KbdGroup: React.ForwardRefExoticComponent<KbdGroupProps & React.RefAttributes<HTMLDivElement>>;
export interface ShortcutProps extends Omit<KbdProps, "keys">, VariantProps<typeof kbdVariants> {
    /** Shortcut type */
    shortcut: "copy" | "paste" | "cut" | "undo" | "redo" | "save" | "selectAll" | "find" | "new" | "open" | "close" | "refresh" | "print" | "bold" | "italic" | "underline";
    /** Use Ctrl instead of Cmd on all platforms */
    forceCtrl?: boolean;
}
declare const Shortcut: React.ForwardRefExoticComponent<ShortcutProps & React.RefAttributes<HTMLElement>>;
export { Kbd, KbdGroup, Shortcut, kbdVariants, KEY_SYMBOLS, formatKey };
