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

  it("renders trigger as a combobox", () => {
    render(<MultiSelect options={options} onValueChange={vi.fn()} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("opens options on trigger click", async () => {
    render(<MultiSelect options={options} onValueChange={vi.fn()} />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);
    // After click, the dropdown is in the DOM. Use findByText to wait for
    // any open animation. We don't assert visibility because happy-dom
    // doesn't fully simulate the transitions.
    expect(await screen.findByText("React")).toBeInTheDocument();
  });

  it("renders preselected values as chips without nesting buttons in the trigger", () => {
    render(
      <MultiSelect
        options={options}
        defaultValue={["react", "vue"]}
        onValueChange={vi.fn()}
      />
    );
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
    // Chip remove and clear-all controls live inside the trigger. If the
    // trigger is a <button>, they nest interactive buttons — invalid HTML
    // that breaks hydration in SSR apps (browsers re-parent nested buttons).
    expect(document.querySelector("button button")).toBeNull();
    expect(
      screen.getByRole("combobox").closest("button")
    ).toBeNull();
  });

  it("removes a chip via its remove control without toggling the popover", async () => {
    const onValueChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        defaultValue={["react", "vue"]}
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Remove React" }));
    expect(onValueChange).toHaveBeenCalledWith(["vue"]);
    // Removing a chip must not open the dropdown.
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("clears all selections via the clear control", async () => {
    const onValueChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        defaultValue={["react", "vue"]}
        onValueChange={onValueChange}
      />
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Clear all selections" })
    );
    expect(onValueChange).toHaveBeenCalledWith([]);
  });

  it("opens the dropdown from the keyboard", async () => {
    render(<MultiSelect options={options} onValueChange={vi.fn()} />);
    const trigger = screen.getByRole("combobox");
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("does not open when disabled", async () => {
    render(<MultiSelect options={options} disabled onValueChange={vi.fn()} />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
