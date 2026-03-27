import { Editor } from '@tiptap/react';
import * as React from "react";
interface RichTextToolbarProps {
    editor: Editor | null;
}
declare const RichTextToolbar: ({ editor }: RichTextToolbarProps) => import("react/jsx-runtime").JSX.Element | null;
export interface RichTextProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    minHeight?: string;
}
declare const RichText: React.ForwardRefExoticComponent<RichTextProps & React.RefAttributes<HTMLDivElement>>;
export { RichText, RichTextToolbar };
