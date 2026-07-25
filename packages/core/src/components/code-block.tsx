import * as React from "react"
import * as stylex from "@stylexjs/stylex"
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

export interface CodeBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
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
    const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    React.useEffect(
      () => () => {
        if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
      },
      []
    )

    const activeCode = languages ? languages[activeLangIndex].code : codeProp
    const activeLanguage = languages ? languages[activeLangIndex].language : languageProp

    React.useEffect(() => {
      if (activeLanguage !== "text") {
        const grammar = Prism.languages[activeLanguage]
        // Prism.highlight escapes the source before tokenizing, so its output is
        // safe to inject. The fallbacks (plain "text", or a missing grammar) pass
        // the raw code straight to dangerouslySetInnerHTML below, so escape them.
        setHighlightedCode(
          grammar
            ? Prism.highlight(activeCode, grammar, activeLanguage)
            : escapeHtml(activeCode)
        )
      } else {
        setHighlightedCode(escapeHtml(activeCode))
      }
    }, [activeCode, activeLanguage])

    const handleCopy = async () => {
      await navigator.clipboard.writeText(activeCode)
      setCopied(true)
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000)
    }

    const lines = highlightedCode.split("\n")
    const showHeader = filename || showCopyButton || (languages && languages.length > 1)

    return (
      <div
        ref={ref}
        {...props}
        {...stylex.props(styles.root)}
      >
        {showHeader && (
          <div {...stylex.props(styles.header)}>
            <div {...stylex.props(styles.headerMeta)}>
              {filename && (
                <span {...stylex.props(styles.filename)}>{filename}</span>
              )}
              {languages && languages.length > 1 && (
                <div {...stylex.props(styles.languageTabs)}>
                  {languages.map((lang, idx) => (
                    <button
                      key={lang.language + idx}
                      type="button"
                      onClick={() => setActiveLangIndex(idx)}
                      {...stylex.props(
                        styles.languageButton,
                        idx === activeLangIndex ? styles.languageButtonActive : styles.languageButtonInactive
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
                {...stylex.props(styles.copyButton)}
              >
                {copied ? (
                  <>
                    <Check aria-hidden="true" {...stylex.props(styles.buttonIcon)} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy aria-hidden="true" {...stylex.props(styles.buttonIcon)} />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
        )}
        <div {...stylex.props(styles.scroller)}>
          <pre className={`${sx(styles.pre)} language-${activeLanguage}`}>
            <code className={`language-${activeLanguage}`}>
              {lines.map((line, index) => (
                <div
                  key={index}
                  {...stylex.props(
                    styles.line,
                    highlightLines.includes(index + 1) && styles.highlightedLine
                  )}
                >
                  {showLineNumbers && (
                    <span {...stylex.props(styles.lineNumber)}>
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

function sx(...stylesToApply: stylex.StyleXStyles[]) {
  return stylex.props(...stylesToApply).className ?? ""
}

/** Escape HTML special characters so raw (unhighlighted) code cannot inject
 *  markup when it reaches `dangerouslySetInnerHTML`. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

const styles = stylex.create({
  root: {
    backgroundColor: "var(--container-bg-alt)",
    borderColor: "var(--container-border)",
    borderRadius: "var(--curves-lg)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--container-fg)",
    fontSize: "var(--font-size-sm)",
    position: "relative",
  },
  header: {
    alignItems: "center",
    borderBottomColor: "var(--container-border)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    display: "flex",
    gap: "var(--spacing-sm)",
    justifyContent: "space-between",
    paddingBlock: "var(--spacing-sm)",
    paddingInline: "var(--spacing-md)",
  },
  headerMeta: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-sm)",
    overflowX: "auto",
  },
  filename: {
    color: "var(--container-fg-alt)",
    flexShrink: 0,
    fontSize: "var(--font-size-xs)",
  },
  languageTabs: {
    alignItems: "center",
    backgroundColor: "var(--interactive-bg-alt)",
    borderRadius: "var(--curves-md)",
    display: "flex",
    gap: "var(--spacing-xxs)",
    padding: "var(--spacing-xxs)",
  },
  languageButton: {
    borderWidth: 0,
    borderRadius: "var(--curves-sm)",
    cursor: "pointer",
    fontSize: "var(--font-size-xs)",
    fontWeight: 500,
    paddingBlock: "var(--spacing-xxs)",
    paddingInline: "var(--spacing-sm)",
    transitionDuration: "150ms",
    transitionProperty: "background-color, color, box-shadow",
    transitionTimingFunction: "ease",
  },
  languageButtonActive: {
    backgroundColor: "var(--interactive-bg-selected)",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    color: "var(--interactive-fg-selected)",
  },
  languageButtonInactive: {
    backgroundColor: "transparent",
    color: "var(--interactive-fg-alt)",
    ":hover": {
      color: "var(--interactive-fg)",
    },
  },
  copyButton: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: "var(--curves-sm)",
    borderWidth: 0,
    color: "var(--interactive-fg-alt)",
    cursor: "pointer",
    display: "flex",
    flexShrink: 0,
    fontSize: "var(--font-size-xs)",
    gap: "var(--spacing-xxs)",
    marginLeft: "auto",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-sm)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
      color: "var(--interactive-fg)",
    },
  },
  buttonIcon: {
    height: 12,
    width: 12,
  },
  scroller: {
    overflowX: "auto",
    padding: "var(--spacing-md)",
  },
  pre: {
    fontFamily: "var(--font-mono)",
    fontSize: "var(--font-size-sm)",
    marginBlock: 0,
  },
  line: {
    lineHeight: "1.5rem",
  },
  highlightedLine: {
    backgroundColor: "var(--cautionary-bg-alt)",
    marginInline: "calc(var(--spacing-md) * -1)",
    paddingInline: "var(--spacing-md)",
  },
  lineNumber: {
    color: "var(--container-fg-alt)",
    display: "inline-block",
    marginRight: "var(--spacing-md)",
    textAlign: "right",
    userSelect: "none",
    width: "var(--size-xl)",
  },
})

export { CodeBlock }
