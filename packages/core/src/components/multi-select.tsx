"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { ChevronDown, Delete, X } from "lucide-react"

import { Badge } from "./badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

export interface MultiSelectOption {
  disabled?: boolean
  label: string
  value: string
}

export interface MultiSelectProps {
  disabled?: boolean
  emptyMessage?: string
  maxDisplayedItems?: number
  onChange?: (value: string[]) => void
  options: MultiSelectOption[]
  placeholder?: string
  searchPlaceholder?: string
  value?: string[]
}

const styles = stylex.create({
  trigger: {
    alignItems: "center",
    backgroundColor: "var(--interactive-bg)",
    borderColor: "var(--interactive-border-alt)",
    borderRadius: "var(--curves-md)",
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    fontSize: "var(--font-size-sm)",
    justifyContent: "space-between",
    minHeight: "var(--size-lg)",
    paddingBlock: "var(--spacing-sm)",
    paddingInline: "var(--spacing-md)",
    transitionDuration: "150ms",
    transitionProperty: "color, background-color, border-color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "100%",
    ":disabled": {
      backgroundColor: "var(--interactive-bg-disabled)",
      color: "var(--interactive-fg-disabled)",
      cursor: "not-allowed",
    },
    ":focus": {
      outlineStyle: "none",
    },
    ":focus-visible": {
      borderColor: "var(--interactive-border)",
      outlineColor: "var(--interactive-border)",
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
  },
  selectedWrap: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    gap: "var(--spacing-xxs)",
    minHeight: "var(--size-sm)",
  },
  placeholder: {
    color: "var(--interactive-fg-alt)",
  },
  chipContent: {
    alignItems: "center",
    display: "inline-flex",
    fontSize: "calc(var(--font-size-xs) - 0.0625rem)",
    fontWeight: 400,
    gap: "var(--spacing-xxs)",
    lineHeight: 1.25,
  },
  chipRemove: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--radius-radius-full)",
    color: "inherit",
    cursor: "pointer",
    opacity: 0.6,
    padding: 0,
    transitionDuration: "150ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      opacity: 1,
    },
    ":focus": {
      outlineStyle: "none",
    },
  },
  removeIcon: {
    height: "calc(var(--spacing-sm) + var(--spacing-xxs))",
    width: "calc(var(--spacing-sm) + var(--spacing-xxs))",
  },
  controls: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    gap: "var(--spacing-xs)",
    marginLeft: "var(--spacing-sm)",
  },
  clear: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--curves-sm)",
    color: "inherit",
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
    ":focus": {
      outlineStyle: "none",
    },
  },
  clearIcon: {
    color: "var(--interactive-fg-alt)",
    height: "calc(var(--spacing-md) + var(--spacing-xxs))",
    width: "calc(var(--spacing-md) + var(--spacing-xxs))",
  },
  chevron: {
    height: "var(--size-xxs)",
    opacity: 0.5,
    transitionDuration: "150ms",
    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "var(--size-xxs)",
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  selectedIcon: {
    color: "var(--interactive-fg-alt)",
    flexShrink: 0,
    height: "calc(var(--spacing-md) + var(--spacing-xxs))",
    width: "calc(var(--spacing-md) + var(--spacing-xxs))",
  },
})

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = "Select items…",
      searchPlaceholder = "Search…",
      emptyMessage = "No items found.",
      disabled = false,
      maxDisplayedItems = 4,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    const handleSelect = (optionValue: string) => {
      const next = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue]
      onChange?.(next)
    }

    const handleRemove = (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation()
      onChange?.(value.filter((v) => v !== optionValue))
    }

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange?.([])
    }

    const selectedOptions = options.filter((opt) => value.includes(opt.value))
    const displayedOptions = selectedOptions.slice(0, maxDisplayedItems)
    const remaining = selectedOptions.length - maxDisplayedItems

    const sortedOptions = [
      ...options.filter((o) => value.includes(o.value)),
      ...options.filter((o) => !value.includes(o.value)),
    ]

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            {...stylex.props(styles.trigger)}
          >
            <div {...stylex.props(styles.selectedWrap)}>
              {selectedOptions.length === 0 ? (
                <span {...stylex.props(styles.placeholder)}>{placeholder}</span>
              ) : (
                <>
                  {displayedOptions.map((option) => (
                    <Badge key={option.value} variant="secondary">
                      <span {...stylex.props(styles.chipContent)}>
                        {option.label}
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={(e) => handleRemove(option.value, e)}
                          aria-label={`Remove ${option.label}`}
                          {...stylex.props(styles.chipRemove)}
                        >
                          <X {...stylex.props(styles.removeIcon)} />
                        </button>
                      </span>
                    </Badge>
                  ))}
                  {remaining > 0 && (
                    <Badge variant="secondary">
                      <span {...stylex.props(styles.chipContent)}>+{remaining}</span>
                    </Badge>
                  )}
                </>
              )}
            </div>
            <div {...stylex.props(styles.controls)}>
              {selectedOptions.length > 0 && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleClearAll}
                  aria-label="Clear all selections"
                  {...stylex.props(styles.clear)}
                >
                  <Delete {...stylex.props(styles.clearIcon)} />
                </button>
              )}
              <ChevronDown {...stylex.props(styles.chevron, open && styles.chevronOpen)} />
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent
          layout="matchTrigger"
          align="start"
          sideOffset={4}
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} density="compact" />
            <CommandList>
              <CommandEmpty tone="muted">{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {sortedOptions.map((option) => {
                  const isSelected = value.includes(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      keywords={[option.value]}
                      disabled={option.disabled}
                      onSelect={() => handleSelect(option.value)}
                      selected={isSelected}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <X
                          {...stylex.props(styles.selectedIcon)}
                          onClick={(e) => { e.stopPropagation(); handleSelect(option.value) }}
                        />
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)
MultiSelect.displayName = "MultiSelect"

export { MultiSelect }
