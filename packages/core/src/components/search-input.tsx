import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Delete, Loader2, Search } from "lucide-react"

import { Input } from "./input"
import { composeRefs } from "../utils"

export interface SearchInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className" | "size" | "style" | "type" | "onChange"
  > {
  value?: string
  onValueChange?: (value: string) => void
  onSearch?: (value: string) => void
  onClear?: () => void
  loading?: boolean
  showClearButton?: boolean
  searchOnEnter?: boolean
  debounceMs?: number
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onValueChange,
      onSearch,
      onClear,
      loading = false,
      showClearButton = true,
      searchOnEnter = true,
      debounceMs,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value || "")
    const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    const handleClear = React.useCallback(() => {
      setInternalValue("")
      onValueChange?.("")
      onClear?.()
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }, [onValueChange, onClear])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInternalValue(newValue)
      onValueChange?.(newValue)

      if (debounceMs && onSearch) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current)
        }
        debounceRef.current = setTimeout(() => {
          onSearch(newValue)
        }, debounceMs)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && searchOnEnter && onSearch) {
        e.preventDefault()
        if (debounceRef.current) {
          clearTimeout(debounceRef.current)
        }
        onSearch(internalValue)
      }
      if (e.key === "Escape" && internalValue) {
        handleClear()
      }
    }

    React.useEffect(() => {
      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current)
        }
      }
    }, [])

    const showClear = showClearButton && internalValue && !loading

    const trailingEl = loading ? (
      <Loader2 aria-hidden="true" {...stylex.props(styles.loadingIcon)} />
    ) : showClear ? (
      <button
        type="button"
        onClick={handleClear}
        tabIndex={-1}
        aria-label="Clear search"
        {...stylex.props(styles.clearButton)}
      >
        <Delete aria-hidden="true" {...stylex.props(styles.trailingIcon)} />
      </button>
    ) : undefined

    return (
      <Input
        type="search"
        ref={ref}
        value={internalValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled || loading}
        trailing={trailingEl}
        {...props}
      />
    )
  }
)
SearchInput.displayName = "SearchInput"

export interface CommandSearchProps extends SearchInputProps {
  shortcutKey?: string
  showShortcut?: boolean
}

const CommandSearch = React.forwardRef<HTMLInputElement, CommandSearchProps>(
  ({ shortcutKey = "K", showShortcut = true, onValueChange: _onChange, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null)

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === shortcutKey.toLowerCase()) {
          e.preventDefault()
          inputRef.current?.focus()
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }, [shortcutKey])

    const combinedRef = composeRefs(inputRef, ref)

    const shortcutEl = showShortcut ? (
      <kbd {...stylex.props(styles.shortcut)}>
        <span {...stylex.props(styles.shortcutModifier)}>⌘</span>
        {shortcutKey}
      </kbd>
    ) : undefined

    return <Input type="search" ref={combinedRef} trailing={shortcutEl} {...props} />
  }
)
CommandSearch.displayName = "CommandSearch"

export interface AutocompleteOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface AutocompleteSearchProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className" | "size" | "style" | "type" | "onChange" | "onSelect"
  > {
  value?: string
  onValueChange?: (value: string) => void
  options: AutocompleteOption[]
  onSelect?: (option: AutocompleteOption) => void
  loading?: boolean
  emptyMessage?: string
  filterFn?: (option: AutocompleteOption, query: string) => boolean
  minChars?: number
  maxResults?: number
  showAllOnFocus?: boolean
  groupBy?: (option: AutocompleteOption) => string
}

const defaultFilterFn = (option: AutocompleteOption, query: string): boolean => {
  const lowerQuery = query.toLowerCase()
  return (
    option.label.toLowerCase().includes(lowerQuery) ||
    option.value.toLowerCase().includes(lowerQuery) ||
    (option.description?.toLowerCase().includes(lowerQuery) ?? false)
  )
}

const AutocompleteSearch = React.forwardRef<HTMLInputElement, AutocompleteSearchProps>(
  (
    {
      value,
      onValueChange,
      options,
      onSelect,
      loading = false,
      emptyMessage = "No results found",
      filterFn = defaultFilterFn,
      minChars = 0,
      maxResults = 10,
      showAllOnFocus = true,
      groupBy,
      disabled,
      placeholder = "Search...",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(value || "")
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const listRef = React.useRef<HTMLDivElement>(null)
    const listboxId = React.useId()
    const optionId = (index: number) => `${listboxId}-option-${index}`

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setHighlightedIndex(-1)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const filteredOptions = React.useMemo(() => {
      if (internalValue.length < minChars && !showAllOnFocus) {
        return []
      }

      const filtered = internalValue.length >= minChars
        ? options.filter((opt) => filterFn(opt, internalValue))
        : options

      return filtered.slice(0, maxResults)
    }, [options, internalValue, filterFn, minChars, maxResults, showAllOnFocus])

    const groupedOptions = React.useMemo(() => {
      if (!groupBy) return null

      const groups: Record<string, AutocompleteOption[]> = {}
      filteredOptions.forEach((opt) => {
        const groupName = groupBy(opt)
        if (!groups[groupName]) {
          groups[groupName] = []
        }
        groups[groupName].push(opt)
      })
      return groups
    }, [filteredOptions, groupBy])

    const scrollToOption = (index: number) => {
      if (listRef.current) {
        const optionElements = listRef.current.querySelectorAll("[data-option]")
        const element = optionElements[index] as HTMLElement
        if (element) {
          element.scrollIntoView({ block: "nearest" })
        }
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInternalValue(newValue)
      onValueChange?.(newValue)
      setIsOpen(true)
      setHighlightedIndex(-1)
    }

    const handleFocus = () => {
      if (showAllOnFocus || internalValue.length >= minChars) {
        setIsOpen(true)
      }
    }

    const handleSelect = (option: AutocompleteOption) => {
      if (option.disabled) return
      setInternalValue(option.label)
      onValueChange?.(option.label)
      onSelect?.(option)
      setIsOpen(false)
      setHighlightedIndex(-1)
      inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        setIsOpen(true)
        return
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setHighlightedIndex((prev) => {
            const next = prev < filteredOptions.length - 1 ? prev + 1 : 0
            scrollToOption(next)
            return next
          })
          break
        case "ArrowUp":
          e.preventDefault()
          setHighlightedIndex((prev) => {
            const next = prev > 0 ? prev - 1 : filteredOptions.length - 1
            scrollToOption(next)
            return next
          })
          break
        case "Enter":
          e.preventDefault()
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex])
          }
          break
        case "Escape":
          setIsOpen(false)
          setHighlightedIndex(-1)
          break
        case "Tab":
          setIsOpen(false)
          setHighlightedIndex(-1)
          break
      }
    }

    const handleClear = () => {
      setInternalValue("")
      onValueChange?.("")
      setIsOpen(false)
      inputRef.current?.focus()
    }

    const combinedRef = composeRefs(inputRef, ref)

    const renderOption = (option: AutocompleteOption, index: number) => (
      <button
        key={option.value}
        type="button"
        data-option
        id={optionId(index)}
        role="option"
        aria-selected={highlightedIndex === index}
        aria-disabled={option.disabled || undefined}
        onClick={() => handleSelect(option)}
        onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
        disabled={option.disabled}
        {...stylex.props(
          styles.option,
          highlightedIndex === index && styles.optionHighlighted,
          option.disabled && styles.optionDisabled,
          !option.disabled && styles.optionEnabled
        )}
      >
        {option.icon && (
          <span aria-hidden="true" {...stylex.props(styles.optionIcon)}>
            {React.isValidElement(option.icon)
              ? React.cloneElement(
                  option.icon as React.ReactElement<{ width?: string; height?: string }>,
                  { width: "100%", height: "100%" }
                )
              : option.icon}
          </span>
        )}
        <div {...stylex.props(styles.optionText)}>
          <div {...stylex.props(styles.optionLabel)}>{option.label}</div>
          {option.description && (
            <div {...stylex.props(styles.optionDescription)}>
              {option.description}
            </div>
          )}
        </div>
      </button>
    )

    const showDropdown = isOpen && (filteredOptions.length > 0 || loading || internalValue.length >= minChars)

    const trailingEl = loading ? (
      <Loader2 aria-hidden="true" {...stylex.props(styles.loadingIconStrong)} />
    ) : internalValue ? (
      <button
        type="button"
        onClick={handleClear}
        tabIndex={-1}
        aria-label="Clear search"
        {...stylex.props(styles.clearButton)}
      >
        <Delete aria-hidden="true" {...stylex.props(styles.trailingIconStrong)} />
      </button>
    ) : undefined

    const activeDescendant =
      isOpen && highlightedIndex >= 0 ? optionId(highlightedIndex) : undefined

    const statusMessage = !isOpen
      ? ""
      : loading
        ? "Loading results"
        : filteredOptions.length === 0
          ? emptyMessage
          : `${filteredOptions.length} result${filteredOptions.length === 1 ? "" : "s"} available`

    return (
      <div ref={containerRef} {...stylex.props(styles.autocompleteRoot)}>
        <Input
          type="text"
          icon={<Search aria-hidden="true" {...stylex.props(styles.searchIcon)} />}
          trailing={trailingEl}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={activeDescendant}
          autoComplete="off"
          ref={combinedRef}
          value={internalValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          {...props}
        />

        <span role="status" aria-live="polite" {...stylex.props(styles.srOnly)}>
          {statusMessage}
        </span>

        {showDropdown && (
          <div
            id={listboxId}
            role="listbox"
            aria-label="Suggestions"
            ref={listRef}
            {...stylex.props(styles.dropdown)}
          >
            {loading ? (
              <div {...stylex.props(styles.dropdownLoading)}>
                <Loader2 aria-hidden="true" {...stylex.props(styles.dropdownLoader)} />
              </div>
            ) : filteredOptions.length === 0 ? (
              <div {...stylex.props(styles.emptyMessage)}>{emptyMessage}</div>
            ) : groupedOptions ? (
              <div {...stylex.props(styles.optionList)}>
                {Object.entries(groupedOptions).map(([groupName, groupOptions], groupIndex, groups) => (
                  <div key={groupName}>
                    <div {...stylex.props(styles.groupHeading)}>{groupName}</div>
                    {groupOptions.map((opt) => {
                      const globalIndex = filteredOptions.indexOf(opt)
                      return renderOption(opt, globalIndex)
                    })}
                    {groupIndex < groups.length - 1 && (
                      <div {...stylex.props(styles.groupSeparator)} />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div {...stylex.props(styles.optionList)}>
                {filteredOptions.map((opt, idx) => renderOption(opt, idx))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)
AutocompleteSearch.displayName = "AutocompleteSearch"

const spin = stylex.keyframes({
  to: {
    transform: "rotate(360deg)",
  },
})

const styles = stylex.create({
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
  loadingIcon: {
    animationDuration: {
      default: "1s",
      "@media (prefers-reduced-motion: reduce)": "0.01ms",
    },
    animationIterationCount: {
      default: "infinite",
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    animationName: spin,
    animationTimingFunction: "linear",
    color: "var(--interactive-fg-alt)",
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  loadingIconStrong: {
    animationDuration: {
      default: "1s",
      "@media (prefers-reduced-motion: reduce)": "0.01ms",
    },
    animationIterationCount: {
      default: "infinite",
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    animationName: spin,
    animationTimingFunction: "linear",
    color: "var(--interactive-fg)",
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  clearButton: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--curves-sm)",
    cursor: "pointer",
    display: "inline-flex",
    height: "var(--size-sm)",
    justifyContent: "center",
    minWidth: "var(--size-sm)",
    padding: 0,
    transitionDuration: "150ms",
    transitionProperty: "background-color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  trailingIcon: {
    color: "var(--interactive-fg-alt)",
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  trailingIconStrong: {
    color: "var(--interactive-fg)",
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  shortcut: {
    alignItems: "center",
    backgroundColor: "var(--interactive-bg-alt)",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-sm)",
    borderStyle: "solid",
    borderWidth: 1,
    color: "var(--interactive-fg-alt)",
    display: "inline-flex",
    fontFamily: "var(--font-mono)",
    fontSize: "calc(var(--font-size-xs) * 0.8333)",
    fontWeight: 500,
    gap: "var(--spacing-xs)",
    height: "var(--size-xs)",
    paddingInline: "var(--spacing-xs)",
    pointerEvents: "none",
    userSelect: "none",
  },
  shortcutModifier: {
    fontSize: "var(--font-size-xs)",
  },
  autocompleteRoot: {
    position: "relative",
  },
  searchIcon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  dropdown: {
    backgroundColor: "var(--container-bg)",
    borderColor: "var(--container-border-alt)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    marginTop: "var(--spacing-xs)",
    maxHeight: 300,
    overflowY: "auto",
    position: "absolute",
    width: "100%",
    zIndex: 50,
  },
  dropdownLoading: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    paddingBlock: "var(--spacing-md)",
  },
  dropdownLoader: {
    animationDuration: {
      default: "1s",
      "@media (prefers-reduced-motion: reduce)": "0.01ms",
    },
    animationIterationCount: {
      default: "infinite",
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    animationName: spin,
    animationTimingFunction: "linear",
    color: "var(--interactive-fg)",
    height: "var(--size-xs)",
    width: "var(--size-xs)",
  },
  emptyMessage: {
    color: "var(--interactive-fg)",
    fontSize: "var(--font-size-sm)",
    padding: "var(--spacing-md)",
    textAlign: "center",
  },
  optionList: {
    padding: "var(--spacing-xxs)",
  },
  groupHeading: {
    color: "var(--container-fg-alt)",
    fontSize: "var(--font-size-xs)",
    fontWeight: 400,
    letterSpacing: "0.04em",
    paddingBlock: "var(--spacing-xs)",
    paddingInline: "var(--spacing-md)",
    textTransform: "uppercase",
  },
  groupSeparator: {
    borderBottomColor: "var(--container-border)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    marginBlock: "var(--spacing-xxs)",
  },
  option: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--curves-sm)",
    color: "var(--interactive-fg)",
    display: "flex",
    fontSize: "var(--font-size-sm)",
    gap: "var(--spacing-sm)",
    paddingBlock: "var(--spacing-sm)",
    paddingInline: "var(--spacing-md)",
    textAlign: "left",
    width: "100%",
  },
  optionEnabled: {
    cursor: "pointer",
    ":hover": {
      backgroundColor: "var(--interactive-bg-hover)",
    },
  },
  optionHighlighted: {
    backgroundColor: "var(--interactive-bg-hover)",
  },
  optionDisabled: {
    backgroundColor: "var(--interactive-bg-disabled)",
    color: "var(--interactive-fg-disabled)",
    cursor: "not-allowed",
  },
  optionIcon: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  optionText: {
    flex: 1,
    minWidth: 0,
  },
  optionLabel: {
    fontWeight: 500,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  optionDescription: {
    color: "var(--interactive-fg-alt)",
    fontSize: "var(--font-size-xs)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
})

export { SearchInput, CommandSearch, AutocompleteSearch }
