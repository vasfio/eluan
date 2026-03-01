import * as React from "react"
import { Search, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: string
  onChange?: (value: string) => void
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
      className,
      value,
      onChange,
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
    const debounceRef = React.useRef<NodeJS.Timeout | null>(null)

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInternalValue(newValue)
      onChange?.(newValue)

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

    const handleClear = () => {
      setInternalValue("")
      onChange?.("")
      onClear?.()
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
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

    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
            className
          )}
          ref={ref}
          value={internalValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
          {...props}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : showClear ? (
            <button
              type="button"
              className="p-0.5 hover:bg-accent rounded"
              onClick={handleClear}
              tabIndex={-1}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          ) : null}
        </div>
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

// Command palette style search
export interface CommandSearchProps extends SearchInputProps {
  shortcutKey?: string
  showShortcut?: boolean
}

const CommandSearch = React.forwardRef<HTMLInputElement, CommandSearchProps>(
  ({ shortcutKey = "K", showShortcut = true, className, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

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

    const combinedRef = (node: HTMLInputElement) => {
      inputRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
            showShortcut ? "pr-16" : "pr-10",
            className
          )}
          ref={combinedRef}
          {...props}
        />
        {showShortcut && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground inline-flex">
              <span className="text-xs">⌘</span>{shortcutKey}
            </kbd>
          </div>
        )}
      </div>
    )
  }
)
CommandSearch.displayName = "CommandSearch"

// Expandable search that grows on focus
export interface ExpandableSearchProps extends SearchInputProps {
  collapsedWidth?: string
  expandedWidth?: string
}

const ExpandableSearch = React.forwardRef<HTMLInputElement, ExpandableSearchProps>(
  (
    {
      collapsedWidth = "40px",
      expandedWidth = "250px",
      className,
      placeholder = "Search...",
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(props.value || "")
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleFocus = () => setIsExpanded(true)

    const handleBlur = () => {
      if (!internalValue) {
        setIsExpanded(false)
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
      props.onChange?.(e.target.value)
    }

    const handleIconClick = () => {
      setIsExpanded(true)
      setTimeout(() => inputRef.current?.focus(), 100)
    }

    const combinedRef = (node: HTMLInputElement) => {
      inputRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    return (
      <div
        className={cn(
          "relative flex items-center transition-all duration-200 ease-in-out",
          className
        )}
        style={{ width: isExpanded ? expandedWidth : collapsedWidth }}
      >
        <button
          type="button"
          className={cn(
            "absolute left-0 flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-accent transition-colors",
            isExpanded && "border-transparent hover:bg-transparent"
          )}
          onClick={handleIconClick}
          tabIndex={isExpanded ? -1 : 0}
        >
          <Search className="h-4 w-4 text-muted-foreground" />
        </button>
        <input
          type="search"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
            !isExpanded && "opacity-0 pointer-events-none"
          )}
          ref={combinedRef}
          value={internalValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          {...props}
        />
      </div>
    )
  }
)
ExpandableSearch.displayName = "ExpandableSearch"

// Autocomplete search with filterable dropdown
export interface AutocompleteOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface AutocompleteSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "onSelect"> {
  value?: string
  onChange?: (value: string) => void
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
      className,
      value,
      onChange,
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
    const inputRef = React.useRef<HTMLInputElement>(null)
    const listRef = React.useRef<HTMLDivElement>(null)

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInternalValue(newValue)
      onChange?.(newValue)
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
      onChange?.(option.label)
      onSelect?.(option)
      setIsOpen(false)
      setHighlightedIndex(-1)
      inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          setIsOpen(true)
          return
        }
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

    const scrollToOption = (index: number) => {
      if (listRef.current) {
        const optionElements = listRef.current.querySelectorAll("[data-option]")
        const element = optionElements[index] as HTMLElement
        if (element) {
          element.scrollIntoView({ block: "nearest" })
        }
      }
    }

    const handleClear = () => {
      setInternalValue("")
      onChange?.("")
      setIsOpen(false)
      inputRef.current?.focus()
    }

    const combinedRef = (node: HTMLInputElement) => {
      inputRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    const renderOption = (option: AutocompleteOption, index: number) => (
      <button
        key={option.value}
        type="button"
        data-option
        className={cn(
          "flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-left",
          highlightedIndex === index && "bg-accent",
          option.disabled && "opacity-50 cursor-not-allowed",
          !option.disabled && "hover:bg-accent cursor-pointer"
        )}
        onClick={() => handleSelect(option)}
        onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
        disabled={option.disabled}
      >
        {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
        <div className="flex-1 min-w-0">
          <div className="truncate font-medium">{option.label}</div>
          {option.description && (
            <div className="truncate text-xs text-muted-foreground">
              {option.description}
            </div>
          )}
        </div>
      </button>
    )

    const showDropdown = isOpen && (filteredOptions.length > 0 || loading || internalValue.length >= minChars)

    return (
      <div ref={containerRef} className={cn("relative", className)}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
        <input
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
          autoComplete="off"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          )}
          ref={combinedRef}
          value={internalValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          {...props}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : internalValue ? (
            <button
              type="button"
              className="p-0.5 hover:bg-accent rounded"
              onClick={handleClear}
              tabIndex={-1}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          ) : null}
        </div>

        {showDropdown && (
          <div
            id="autocomplete-list"
            ref={listRef}
            className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md max-h-[300px] overflow-y-auto"
          >
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-sm text-center text-muted-foreground">
                {emptyMessage}
              </div>
            ) : groupedOptions ? (
              <div className="p-1">
                {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                  <div key={groupName}>
                    <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                      {groupName}
                    </div>
                    {groupOptions.map((opt) => {
                      const globalIndex = filteredOptions.indexOf(opt)
                      return renderOption(opt, globalIndex)
                    })}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-1">
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

export { SearchInput, CommandSearch, ExpandableSearch, AutocompleteSearch }
