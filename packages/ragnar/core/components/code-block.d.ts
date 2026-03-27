import * as React from "react";
type Language = "javascript" | "typescript" | "jsx" | "tsx" | "css" | "json" | "bash" | "python" | "java" | "go" | "rust" | "sql" | "markdown" | "yaml" | "text";
export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string;
    language?: Language;
    showLineNumbers?: boolean;
    showCopyButton?: boolean;
    filename?: string;
    highlightLines?: number[];
}
declare const CodeBlock: React.ForwardRefExoticComponent<CodeBlockProps & React.RefAttributes<HTMLDivElement>>;
export { CodeBlock };
