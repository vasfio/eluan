---
name: Pagination
use_when: A long list or table is split into numbered pages and the user moves between them.
instead_of: Tabs to switch views of the same page; Stepper for ordered steps; a "Load more" Button for feeds; Carousel for slides.
source: packages/core/src/components/pagination.tsx
---

# Pagination

## 1. Overview

Pagination is a row of page links inside a `<nav aria-label="pagination">`: numbered pages, Previous and Next, and an ellipsis for skipped ranges. It's stateless. Your code decides the current page and which numbers to show, and gives every link an `href`.

## 2. When to use

- Below a [Table](./table.md) or list of results that is split into pages: invoices, search results, audit logs.
- When users need to reach a specific page, or share and bookmark a page by URL.

### When not to use

- Switching between views of the same content → use [Tabs](./tabs.md) or [SegmentedControl](./segmented-control.md).
- Steps in a flow → use [Stepper](./stepper.md).
- An activity feed or timeline read top to bottom → use a [Button](./button.md) ("Load more") under the list.
- Slides or images → use [Carousel](./carousel.md).
- Fewer items than fit on one page → leave Pagination out.

<!-- REVIEW: usage boundaries drafted; docs describe it only as "navigation between pages of paginated data". -->

## 3. Anatomy

1. **Nav** (`Pagination`): a `<nav>` landmark named "pagination". Takes the full width and centres its content.
2. **Content** (`PaginationContent`): a `<ul>` laid out as a row, `--spacing-xxs` apart.
3. **Item** (`PaginationItem`): an `<li>` holding one link or ellipsis.
4. **Link** (`PaginationLink`): an `<a>` drawn like a ghost button, `--curves-md` radius, `--font-size-sm`. A `--size-lg` square by default, for page numbers. `isActive` marks the current page.
5. **Previous and next** (`PaginationPrevious`, `PaginationNext`): links with a chevron and the fixed text "Previous" or "Next".
6. **Ellipsis** (`PaginationEllipsis`): a decorative "…" for a gap, or, with `pages`, a ghost icon Button that opens a [DropdownMenu](./dropdown-menu.md) of the hidden pages.

## 4. Variants

Pagination has no variants. `isActive` on a `PaginationLink` marks the current page.

## 5. Sizes

`PaginationLink` takes a `size`:

| Size | Use in |
| --- | --- |
| `icon` | Page numbers (default): a `--size-lg` square. |
| `default` | Text links, `--size-lg` tall. Previous and Next use it. |
| `sm` | Dense toolbars under compact tables (`--size-md`, `--font-size-xs`). |
| `lg` | Rarely; a `--size-xl` tall link with `--font-size-base`. |

<!-- REVIEW: "Use in" for sm and lg drafted; source gives no guidance. -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | No fill, `--interactive-fg` text | |
| Hover | `--interactive-bg-hover` fill | The hover text colour points at an undefined token (`interactive-fg-hover`), so the text keeps its inherited colour. No action needed. <!-- REVIEW: W3 (fix/dead-rules): pagination.tsx hover color uses an undefined token; likely meant --interactive-fg. --> |
| Focus | 1px outline in `--interactive-border`, 1px offset | Never remove or restyle the focus ring. |
| Active | `--interactive-bg-selected` fill and border, `--interactive-fg-selected` text | Sets `aria-current="page"`. |
| Disabled | No disabled state | On the first page, leave out `PaginationPrevious`; on the last, leave out `PaginationNext`. <!-- REVIEW: drafted; source has no disabled styling and stories always render both. --> |

## 7. Content guidelines

- Show page numbers as plain digits: "1", "2", "10".
- Show the first page, the last page, the current page and one page either side; replace each gap with an ellipsis. <!-- REVIEW: range rule drafted from the ManyPages story. -->
- Previous and Next read "Previous" and "Next" and can't be relabelled; only their `aria-label` can change.

| Do | Don't |
| --- | --- |
| 1 … 4 5 6 … 20 | 1 2 3 4 5 6 7 8 9 10 11 12 … |
| 5 | Page 5 of 20 (inside the link) |

## 8. Rules

1. Give every `PaginationLink`, `PaginationPrevious` and `PaginationNext` an `href` for its page, such as `?page=3`. An `<a>` without `href` can't be focused and isn't a link. With a client-side router, keep the `href` and handle the click in `onClick`.
2. Set `isActive` on the current page's link, and only that one.
3. Put each link or ellipsis in its own `PaginationItem` inside `PaginationContent`.
4. Leave `size` at its default for page numbers. Previous and Next set their own size.
5. `PaginationEllipsis` menu entries aren't links; they call `onPageClick(page)`. Navigate there, and keep real links for the pages you show.
6. Never pass `className` or `style` to any part. Pagination centres itself in its container's full width.

## 9. Dos and don'ts

**Do:** give each page a real URL and mark the current one.

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="?page=4" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=5" isActive>5</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="?page=6" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

**Don't:** drop the `href` and page with click handlers only.

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink onClick={() => setPage(5)} isActive={page === 5}>5</PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

**Do:** leave out Previous on the first page.

```tsx
<PaginationContent>
  <PaginationItem>
    <PaginationLink href="?page=1" isActive>1</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationNext href="?page=2" />
  </PaginationItem>
</PaginationContent>
```

**Don't:** render a Previous link that goes nowhere.

```tsx
<PaginationContent>
  <PaginationItem>
    <PaginationPrevious href="#" />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="?page=1" isActive>1</PaginationLink>
  </PaginationItem>
</PaginationContent>
```

## 10. Accessibility

- Role: a `navigation` landmark named "pagination"; page controls are links. The current page carries `aria-current="page"`.
- Label: page links are named by their number. Previous and Next are named "Go to previous page" and "Go to next page"; pass `aria-label` to localise them. Give page links an `aria-label` such as "Page 5" if your screen-reader testing calls for it. <!-- REVIEW: page-number labelling drafted; tests assert links named by the bare number. -->
- Keyboard: Tab moves through the links; Enter follows one. The ellipsis menu, when it has `pages`, opens from a Button named "Show more pages" and uses DropdownMenu keys.
- Focus: links show the focus outline.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per link. <!-- REVIEW: system-wide focus-ring contrast issue, see foundations/colour.md. -->

## 11. Behaviour

- Responsive: no breakpoint behaviour. The row doesn't wrap, so on narrow screens show fewer numbers (Previous, the current page, Next). <!-- REVIEW: small-screen range drafted; source has no responsive handling. -->
- Overflow and truncation: link labels don't wrap.
- State: Pagination stores nothing. Read the current page from the URL or your data layer and render the links from it.
- Motion: link colours transition over 150ms. Don't add more.

## 12. API

<!-- api:start -->
### Pagination

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | `string` | `"pagination"` | Name of the navigation landmark. |
| `...props` | `ComponentProps<"nav">` without `className`, `style` | | |

### PaginationContent, PaginationItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `ComponentProps<"ul">` / `ComponentProps<"li">` without `className`, `style` | | |

### PaginationLink

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `href` | `string` | | The page's URL. Always set it. |
| `isActive` | `boolean` | `false` | Marks the current page: selected fill and `aria-current="page"`. |
| `size` | `"icon" \| "default" \| "sm" \| "lg"` | `"icon"` | Square for numbers, or text sizes. |
| `edge` | `boolean` | `false` | Tighter gap and start padding for links with a leading chevron. Previous and Next set it. |
| `...props` | `ComponentProps<"a">` without `className`, `style` | | `onClick`, `aria-label`. |

### PaginationPrevious, PaginationNext

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `href` | `string` | | The previous or next page's URL. |
| `aria-label` | `string` | `"Go to previous page"` / `"Go to next page"` | Accessible name. The visible text is fixed. |
| `...props` | `PaginationLink` props | | `size` defaults to `"default"` and `edge` to `true`. Children are ignored. |

### PaginationEllipsis

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `pages` | `number[]` | | Hidden page numbers. When set, the ellipsis becomes a menu of "Page N" entries. |
| `onPageClick` | `(page: number) => void` | | Called when a page is chosen from the menu. |
<!-- api:end -->

## 13. Examples

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@eluan/core";

function pageRange(current: number, total: number): (number | "gap")[] {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
  return sorted.flatMap((page, index) => (index > 0 && page - sorted[index - 1] > 1 ? ["gap", page] : [page]));
}

export function InvoicePagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const href = (page: number) => `/invoices?page=${page}`;

  return (
    <div style={{ paddingBlock: "var(--spacing-lg)" }}>
      <Pagination aria-label="Invoice pages">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={href(currentPage - 1)} />
            </PaginationItem>
          )}
          {pageRange(currentPage, totalPages).map((page, index) =>
            page === "gap" ? (
              <PaginationItem key={`gap-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink href={href(page)} isActive={page === currentPage}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={href(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
```

## 14. Related components

- [Table](./table.md): the content Pagination usually sits under.
- [DropdownMenu](./dropdown-menu.md): what the ellipsis opens when it has `pages`.
- [Button](./button.md): "Load more" for feeds.
- [Tabs](./tabs.md): views of one page, not pages of a list.
- See [navigation patterns](../patterns/navigation.md).

## 15. Common agent mistakes

_Filled from evals._
