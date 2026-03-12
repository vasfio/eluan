import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "../checkbox";

describe("Checkbox", () => {
  it("renders a checkbox", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("toggles checked state on click", async () => {
    render(<Checkbox />);
    const cb = screen.getByRole("checkbox");
    expect(cb).toHaveAttribute("data-state", "unchecked");
    await userEvent.click(cb);
    expect(cb).toHaveAttribute("data-state", "checked");
  });

  it("calls onCheckedChange when toggled", async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("renders in disabled state", () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("renders in checked state by default", () => {
    render(<Checkbox checked />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-state", "checked");
  });

  it("forwards className", () => {
    render(<Checkbox className="custom" />);
    expect(screen.getByRole("checkbox")).toHaveClass("custom");
  });
});
