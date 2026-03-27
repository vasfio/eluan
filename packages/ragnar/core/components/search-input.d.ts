import * as React from "react";
export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    onClear?: () => void;
    loading?: boolean;
    showClearButton?: boolean;
    searchOnEnter?: boolean;
    debounceMs?: number;
}
declare const SearchInput: React.ForwardRefExoticComponent<SearchInputProps & React.RefAttributes<HTMLInputElement>>;
export interface CommandSearchProps extends SearchInputProps {
    shortcutKey?: string;
    showShortcut?: boolean;
}
declare const CommandSearch: React.ForwardRefExoticComponent<CommandSearchProps & React.RefAttributes<HTMLInputElement>>;
export interface ExpandableSearchProps extends SearchInputProps {
    collapsedWidth?: string;
    expandedWidth?: string;
}
declare const ExpandableSearch: React.ForwardRefExoticComponent<ExpandableSearchProps & React.RefAttributes<HTMLInputElement>>;
export interface AutocompleteOption {
    value: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}
export interface AutocompleteSearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "onSelect"> {
    value?: string;
    onChange?: (value: string) => void;
    options: AutocompleteOption[];
    onSelect?: (option: AutocompleteOption) => void;
    loading?: boolean;
    emptyMessage?: string;
    filterFn?: (option: AutocompleteOption, query: string) => boolean;
    minChars?: number;
    maxResults?: number;
    showAllOnFocus?: boolean;
    groupBy?: (option: AutocompleteOption) => string;
}
declare const AutocompleteSearch: React.ForwardRefExoticComponent<AutocompleteSearchProps & React.RefAttributes<HTMLInputElement>>;
export { SearchInput, CommandSearch, ExpandableSearch, AutocompleteSearch };
