import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { SearchInput } from "../search-input";

describe("SearchInput", () => {
  it("renders a search input", () => {
    render(<SearchInput />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("accepts typed text", async () => {
    render(<SearchInput />);
    await userEvent.type(screen.getByRole("searchbox"), "query");
    expect(screen.getByRole("searchbox")).toHaveValue("query");
  });

  it("renders with placeholder", () => {
    render(<SearchInput placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("fires onChange", async () => {
    const onChange = vi.fn();
    render(<SearchInput onChange={onChange} />);
    await userEvent.type(screen.getByRole("searchbox"), "x");
    expect(onChange).toHaveBeenCalled();
  });
});
