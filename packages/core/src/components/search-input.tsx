import * as React from "react"
import { Search, Delete, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "./input"

function assignRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value)
  } else if (ref) {
    ;(ref as React.MutableRefObject<T | null>).current = value
  }
}

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

    const trailingEl = loading ? (
      <Loader2 className="h-[var(--size-xxs)] w-[var(--size-xxs)] animate-spin text-[color:var(--interactive-fg-alt)]" />
    ) : showClear ? (
      <button
        type="button"
        className="p-0.5 hover:bg-[var(--interactive-bg-hover)] rounded"
        onClick={handleClear}
        tabIndex={-1}
      >
        <Delete className="h-[var(--size-xxs)] w-[var(--size-xxs)] text-[color:var(--interactive-fg-alt)]" />
      </button>
    ) : undefined

    return (
      <Input
        type="search"
        className={cn(
          "[&_input]:[&::-webkit-search-cancel-button]:hidden [&_input]:[&::-webkit-search-decoration]:hidden",
          className
        )}
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

// Command palette style search
export interface CommandSearchProps extends SearchInputProps {
  shortcutKey?: string
  showShortcut?: boolean
}

const CommandSearch = React.forwardRef<HTMLInputElement, CommandSearchProps>(
  ({ shortcutKey = "K", showShortcut = true, className, onChange: _onChange, ...props }, ref) => {
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

    const combinedRef = (node: HTMLInputElement) => {
      inputRef.current = node
      assignRef(ref, node)
    }

    const shortcutEl = showShortcut ? (
      <kbd className="pointer-events-none h-[var(--size-xs)] select-none items-center gap-[var(--spacing-xs)] rounded border bg-[var(--interactive-bg-alt)] px-[var(--spacing-xs)] font-mono text-[10px] font-medium text-[color:var(--interactive-fg-alt)] inline-flex">
        <span className="text-[length:var(--font-size-xs)]">⌘</span>{shortcutKey}
      </kbd>
    ) : undefined

    return (
      <Input
        type="search"
        className={cn(
          "[&_input]:[&::-webkit-search-cancel-button]:hidden [&_input]:[&::-webkit-search-decoration]:hidden",
          className
        )}
        ref={combinedRef}
        trailing={shortcutEl}
        {...props}
      />
    )
  }
)
CommandSearch.displayName = "CommandSearch"

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
    const inputRef = React.useRef<HTMLInputElement | null>(null)
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
      assignRef(ref, node)
    }

    const renderOption = (option: AutocompleteOption, index: number) => (
      <button
        key={option.value}
        type="button"
        data-option
        className={cn(
          "flex w-full items-center gap-[var(--spacing-sm)] rounded-[var(--curves-sm)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-[length:var(--font-size-sm)] text-left",
          highlightedIndex === index && "bg-[var(--interactive-bg-hover)]",
          option.disabled && "bg-[var(--interactive-bg-disabled)] text-[color:var(--interactive-fg-disabled)] cursor-not-allowed",
          !option.disabled && "hover:bg-[var(--interactive-bg-hover)] cursor-pointer"
        )}
        onClick={() => handleSelect(option)}
        onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
        disabled={option.disabled}
      >
        {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
        <div className="flex-1 min-w-0">
          <div className="truncate font-medium">{option.label}</div>
          {option.description && (
            <div className="truncate text-[length:var(--font-size-xs)] text-[color:var(--interactive-fg-alt)]">
              {option.description}
            </div>
          )}
        </div>
      </button>
    )

    const showDropdown = isOpen && (filteredOptions.length > 0 || loading || internalValue.length >= minChars)

    const trailingEl = loading ? (
      <Loader2 className="h-[var(--size-xxs)] w-[var(--size-xxs)] animate-spin text-[color:var(--interactive-fg)]" />
    ) : internalValue ? (
      <button
        type="button"
        className="p-0.5 hover:bg-[var(--interactive-bg-hover)] rounded"
        onClick={handleClear}
        tabIndex={-1}
      >
        <Delete className="h-[var(--size-xxs)] w-[var(--size-xxs)] text-[color:var(--interactive-fg)]" />
      </button>
    ) : undefined

    return (
      <div ref={containerRef} className={cn("relative", className)}>
        <Input
          type="text"
          icon={<Search className="h-[var(--size-xxs)] w-[var(--size-xxs)]" />}
          trailing={trailingEl}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
          autoComplete="off"
          className="[&_input]:placeholder:text-[color:var(--interactive-fg)]"
          ref={combinedRef}
          value={internalValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          {...props}
        />

        {showDropdown && (
          <div
            id="autocomplete-list"
            ref={listRef}
            className="absolute z-50 mt-[var(--spacing-xs)] w-full rounded-[var(--curves-md)] border bg-[var(--container-bg)] shadow-md max-h-[300px] overflow-y-auto"
          >
            {loading ? (
              <div className="flex items-center justify-center py-[var(--spacing-md)]">
                <Loader2 className="h-[var(--size-xs)] w-[var(--size-xs)] animate-spin text-[color:var(--interactive-fg)]" />
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-[length:var(--font-size-sm)] text-center text-[color:var(--interactive-fg)]">
                {emptyMessage}
              </div>
            ) : groupedOptions ? (
              <div className="p-1">
                {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                  <div key={groupName}>
                    <div className="px-[var(--spacing-md)] py-[var(--spacing-xs)] text-[length:var(--font-size-xs)] font-semibold text-[color:var(--interactive-fg)]">
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

export { SearchInput, CommandSearch, AutocompleteSearch }
