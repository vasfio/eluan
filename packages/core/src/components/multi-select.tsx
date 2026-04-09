"use client"

import * as React from "react"
import { ChevronDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
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
  value: string
  label: string
  disabled?: boolean
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
  maxDisplayedItems?: number
}

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
      className,
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

    const selectedOptions = options.filter((opt) => value.includes(opt.value))
    const displayedOptions = selectedOptions.slice(0, maxDisplayedItems)
    const remaining = selectedOptions.length - maxDisplayedItems

    // Split list: selected first, then unselected
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
            className={cn(
              "flex min-h-[var(--size-lg)] w-full items-center justify-between rounded-[var(--curves-md)] border border-[var(--interactive-border-alt)] bg-[var(--interactive-bg)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-[var(--font-size-sm)]",
              "ring-offset-background focus:outline-none focus:ring-1 focus:ring-[var(--interactive-border)] focus:border-[var(--interactive-border)]",
              "disabled:cursor-not-allowed disabled:bg-[var(--interactive-bg-disabled)] disabled:text-[var(--interactive-fg-disabled)] transition-colors",
              className
            )}
          >
            <div className="flex flex-1 flex-wrap gap-1">
              {selectedOptions.length === 0 ? (
                <span className="text-[var(--interactive-fg-alt)]">{placeholder}</span>
              ) : (
                <>
                  {displayedOptions.map((option) => (
                    <Badge
                      key={option.value}
                      variant="secondary"
                      className="gap-[var(--spacing-xxs)] pr-[var(--spacing-xxs)] text-[var(--font-size-xs)]"
                    >
                      {option.label}
                      <button
                        type="button"
                        className="rounded-full opacity-60 hover:opacity-100 transition-opacity outline-none"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => handleRemove(option.value, e)}
                        aria-label={`Remove ${option.label}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {remaining > 0 && (
                    <Badge variant="secondary" className="text-[var(--font-size-xs)]">+{remaining}</Badge>
                  )}
                </>
              )}
            </div>
            <ChevronDown className={cn("ml-2 h-[var(--size-xxs)] w-[var(--size-xxs)] shrink-0 opacity-50 transition-transform", open && "rotate-180")} />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)]"
          align="start"
          sideOffset={4}
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} className="h-[var(--size-lg)]" />
            <CommandList>
              <CommandEmpty className="py-[var(--spacing-md)] text-center text-[var(--font-size-sm)] text-[var(--interactive-fg-alt)]">{emptyMessage}</CommandEmpty>
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
                      className={cn(
                        "flex items-center justify-between gap-[var(--spacing-sm)] cursor-pointer",
                        isSelected && "text-[var(--interactive-fg)] font-medium"
                      )}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <X
                          className="h-3.5 w-3.5 shrink-0 text-[var(--interactive-fg-alt)]"
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
