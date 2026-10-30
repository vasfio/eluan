"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { Header, SearchInput } from "@eluan/core";
import type { NavItem } from "@eluan/core";

const styles = stylex.create({
  // Eluan components are closed to className/style, so the field is sized
  // through a wrapper. It prefers 18rem but may shrink, so the bar never
  // overflows when space runs out on narrower viewports.
  search: {
    width: "18rem",
    maxWidth: "100%",
    minWidth: 0,
    flexShrink: 1,
  },
});

export interface NavSearchProps {
  /** Called with the trimmed query when the user presses Enter. */
  onSearch: (query: string) => void;
  placeholder?: string;
  /** Accessible name for the field (the placeholder is not a label). */
  label?: string;
}

/**
 * The top-nav search field. Submits on Enter instead of searching as the user
 * types, since a global nav search usually navigates to a results page.
 */
export function NavSearch({
  onSearch,
  placeholder = "Search",
  label = "Search",
}: NavSearchProps) {
  const [query, setQuery] = React.useState("");

  const handleSearch = React.useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (trimmed) onSearch(trimmed);
    },
    [onSearch],
  );

  const handleClear = React.useCallback(() => setQuery(""), []);

  return (
    <div role="search" {...stylex.props(styles.search)}>
      <SearchInput
        value={query}
        onValueChange={setQuery}
        onClear={handleClear}
        onSearch={handleSearch}
        searchOnEnter
        placeholder={placeholder}
        aria-label={label}
      />
    </div>
  );
}

export interface TopNavProps {
  logo: React.ReactNode;
  items: NavItem[];
  /** Rendered after the search field, e.g. account or auth buttons. */
  actions?: React.ReactNode;
  onSearch: (query: string) => void;
  searchPlaceholder?: string;
  sticky?: boolean;
}

export default function TopNav({
  logo,
  items,
  actions,
  onSearch,
  searchPlaceholder,
  sticky,
}: TopNavProps) {
  return (
    <Header
      sticky={sticky}
      logo={logo}
      items={items}
      actions={
        <>
          <NavSearch onSearch={onSearch} placeholder={searchPlaceholder} />
          {actions}
        </>
      }
    />
  );
}
