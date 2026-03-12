import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MultiSelect } from "../multi-select";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

describe("MultiSelect", () => {
  it("renders without crashing", () => {
    render(<MultiSelect options={options} onValueChange={vi.fn()} />);
    expect(document.body).toBeInTheDocument();
  });

  it("opens options on click", async () => {
    render(<MultiSelect options={options} onValueChange={vi.fn()} />);
    const trigger = screen.getByRole("button");
    await userEvent.click(trigger);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("calls onValueChange when option selected", async () => {
    const onValueChange = vi.fn();
    render(<MultiSelect options={options} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("React"));
    expect(onValueChange).toHaveBeenCalled();
  });
});
