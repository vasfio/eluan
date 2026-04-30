import * as React from "react"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-json"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-go"
import "prismjs/components/prism-rust"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-yaml"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

type Language =
  | "javascript"
  | "typescript"
  | "jsx"
  | "tsx"
  | "css"
  | "json"
  | "bash"
  | "python"
  | "java"
  | "go"
  | "rust"
  | "sql"
  | "markdown"
  | "yaml"
  | "text"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: Language
  showLineNumbers?: boolean
  showCopyButton?: boolean
  filename?: string
  highlightLines?: number[]
  /** Supply multiple language variants of the same snippet. Renders a language switcher in the header. */
  languages?: { language: Language; code: string; label?: string }[]
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      className,
      code: codeProp,
      language: languageProp = "text",
      showLineNumbers = false,
      showCopyButton = true,
      filename,
      highlightLines = [],
      languages,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false)
    const [highlightedCode, setHighlightedCode] = React.useState("")
    const [activeLangIndex, setActiveLangIndex] = React.useState(0)

    // Resolve the active code and language from either the languages array or the single props
    const activeCode = languages ? languages[activeLangIndex].code : codeProp
    const activeLanguage = languages ? languages[activeLangIndex].language : languageProp

    React.useEffect(() => {
      if (activeLanguage !== "text") {
        const grammar = Prism.languages[activeLanguage]
        if (grammar) {
          setHighlightedCode(Prism.highlight(activeCode, grammar, activeLanguage))
        } else {
          setHighlightedCode(activeCode)
        }
      } else {
        setHighlightedCode(activeCode)
      }
    }, [activeCode, activeLanguage])

    const handleCopy = async () => {
      await navigator.clipboard.writeText(activeCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    const lines = highlightedCode.split("\n")
    const showHeader = filename || showCopyButton || (languages && languages.length > 1)

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-lg border bg-muted/50 text-[length:var(--font-size-sm)]",
          className
        )}
        {...props}
      >
        {showHeader && (
          <div className="flex items-center justify-between border-b px-4 py-2 gap-2">
            <div className="flex items-center gap-2 overflow-x-auto">
              {filename && (
                <span className="text-[length:var(--font-size-xs)] text-muted-foreground shrink-0">{filename}</span>
              )}
              {languages && languages.length > 1 && (
                <div className="flex items-center gap-0.5 rounded-md bg-muted p-0.5">
                  {languages.map((lang, idx) => (
                    <button
                      key={lang.language + idx}
                      type="button"
                      onClick={() => setActiveLangIndex(idx)}
                      className={cn(
                        "rounded px-2 py-0.5 text-[length:var(--font-size-xs)] font-medium transition-colors",
                        idx === activeLangIndex
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {lang.label ?? lang.language}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {showCopyButton && (
              <button
                type="button"
                onClick={handleCopy}
                className="ml-auto flex items-center gap-1 rounded px-2 py-1 text-[length:var(--font-size-xs)] text-muted-foreground hover:bg-muted hover:text-foreground shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
        )}
        <div className="overflow-x-auto p-4">
          <pre className={cn("font-mono text-[length:var(--font-size-sm)]", `language-${activeLanguage}`)}>
            <code className={`language-${activeLanguage}`}>
              {lines.map((line, index) => (
                <div
                  key={index}
                  className={cn(
                    "leading-6",
                    highlightLines.includes(index + 1) &&
                      "bg-yellow-500/20 -mx-4 px-4"
                  )}
                >
                  {showLineNumbers && (
                    <span className="mr-4 inline-block w-8 select-none text-right text-muted-foreground">
                      {index + 1}
                    </span>
                  )}
                  <span dangerouslySetInnerHTML={{ __html: line || " " }} />
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
