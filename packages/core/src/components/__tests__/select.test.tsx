import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../select";

const TestSelect = () => (
  <Select>
    <SelectTrigger aria-label="Choose an option">
      <SelectValue placeholder="Select..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="cherry">Cherry</SelectItem>
    </SelectContent>
  </Select>
);

describe("Select", () => {
  it("renders the trigger", () => {
    render(<TestSelect />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows placeholder text", () => {
    render(<TestSelect />);
    expect(screen.getByText("Select...")).toBeInTheDocument();
  });

  it("opens the dropdown on click", async () => {
    render(<TestSelect />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("selects an item", async () => {
    render(<TestSelect />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Banana"));
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });
});
