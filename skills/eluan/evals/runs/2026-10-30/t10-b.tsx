import { useState, type FormEvent } from "react";
import { Header, SearchInput, Typography, type NavItem } from "@eluan/core";

const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "Reports", href: "/reports" },
  { label: "Team", href: "/team" },
  { label: "Settings", href: "/settings" },
] as const;

const SEARCH_LABEL = "Search projects";

function isCurrentSection(href: string, currentPath: string): boolean {
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export interface TopNavProps {
  /** Path of the page being shown, used to mark the active nav link. */
  currentPath: string;
  /** Runs with the trimmed query when the user submits a non-empty search. */
  onSearch: (query: string) => void;
}

export default function TopNav({ currentPath, onSearch }: TopNavProps) {
  // Header renders `actions` twice (in the bar and in the mobile menu while it's
  // open), so the field is controlled to keep both copies in sync.
  const [query, setQuery] = useState("");

  const items: NavItem[] = NAV_LINKS.map((link) => ({
    ...link,
    active: isCurrentSection(link.href, currentPath),
  }));

  function runSearch(value: string) {
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  }

  // SearchInput handles Enter itself (via onSearch) and stops native submission;
  // this covers any other submit path so the page never reloads.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runSearch(query);
  }

  return (
    <Header
      // A search field in `actions` needs the wider breakpoint so the row doesn't overflow.
      mobileBreakpoint="lg"
      logo={
        <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
          <Typography as="span" variant="lead" weight="semibold">
            Northwind
          </Typography>
        </a>
      }
      items={items}
      actions={
        <form role="search" onSubmit={handleSubmit}>
          <SearchInput
            aria-label={SEARCH_LABEL}
            placeholder={SEARCH_LABEL}
            value={query}
            onValueChange={setQuery}
            onSearch={runSearch}
          />
        </form>
      }
    />
  );
}
