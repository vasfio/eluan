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
    render(<MultiSelect options={options} onChange={vi.fn()} />);
    expect(document.body).toBeInTheDocument();
  });

  it("renders trigger as a combobox", () => {
    render(<MultiSelect options={options} onChange={vi.fn()} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("opens options on trigger click", async () => {
    render(<MultiSelect options={options} onChange={vi.fn()} />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);
    // After click, the dropdown is in the DOM. Use findByText to wait for
    // any open animation. We don't assert visibility because happy-dom
    // doesn't fully simulate the transitions.
    expect(await screen.findByText("React")).toBeInTheDocument();
  });
});
