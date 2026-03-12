import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { RadioGroup, RadioGroupItem } from "../radio-group";

const TestRadioGroup = ({ onValueChange }: { onValueChange?: (v: string) => void }) => (
  <RadioGroup onValueChange={onValueChange}>
    <RadioGroupItem value="a" id="a" aria-label="Option A" />
    <RadioGroupItem value="b" id="b" aria-label="Option B" />
    <RadioGroupItem value="c" id="c" aria-label="Option C" />
  </RadioGroup>
);

describe("RadioGroup", () => {
  it("renders radio buttons", () => {
    render(<TestRadioGroup />);
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("selects a radio on click", async () => {
    render(<TestRadioGroup />);
    await userEvent.click(screen.getByRole("radio", { name: "Option A" }));
    expect(screen.getByRole("radio", { name: "Option A" })).toBeChecked();
  });

  it("calls onValueChange with selected value", async () => {
    const handler = vi.fn();
    render(<TestRadioGroup onValueChange={handler} />);
    await userEvent.click(screen.getByRole("radio", { name: "Option B" }));
    expect(handler).toHaveBeenCalledWith("b");
  });

  it("only one item selected at a time", async () => {
    render(<TestRadioGroup />);
    await userEvent.click(screen.getByRole("radio", { name: "Option A" }));
    await userEvent.click(screen.getByRole("radio", { name: "Option B" }));
    expect(screen.getByRole("radio", { name: "Option A" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "Option B" })).toBeChecked();
  });
});
