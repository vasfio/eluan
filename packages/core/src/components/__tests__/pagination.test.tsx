import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../pagination";

describe("Pagination", () => {
  it("renders pagination nav", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#1" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#2">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2" })).toBeInTheDocument();
  });

  it("active page link has aria-current", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#1" isActive>1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(screen.getByRole("link", { name: "1" })).toHaveAttribute("aria-current", "page");
  });
});
