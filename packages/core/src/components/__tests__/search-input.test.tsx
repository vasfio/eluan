import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { SearchInput, AutocompleteSearch } from "../search-input";

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

  it("fires onValueChange", async () => {
    const onValueChange = vi.fn();
    render(<SearchInput onValueChange={onValueChange} />);
    await userEvent.type(screen.getByRole("searchbox"), "x");
    expect(onValueChange).toHaveBeenCalled();
  });
});

describe("AutocompleteSearch", () => {
  const options = [
    { value: "a", label: "Apple" },
    { value: "b", label: "Banana" },
  ];

  it("exposes the dropdown as a listbox of options", async () => {
    render(<AutocompleteSearch options={options} />);
    await userEvent.click(screen.getByRole("combobox"));

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("wires aria-activedescendant to the highlighted option", async () => {
    render(<AutocompleteSearch options={options} />);
    const input = screen.getByRole("combobox");
    await userEvent.click(input);

    // No active option until the user navigates.
    expect(input).not.toHaveAttribute("aria-activedescendant");

    await userEvent.keyboard("{ArrowDown}");
    const first = screen.getByRole("option", { name: /Apple/ });
    expect(first).toHaveAttribute("aria-selected", "true");
    expect(input).toHaveAttribute("aria-activedescendant", first.id);
  });
});
