import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "../switch";

describe("Switch", () => {
  it("renders a switch", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("toggles on click", async () => {
    render(<Switch />);
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("data-state", "unchecked");
    await userEvent.click(sw);
    expect(sw).toHaveAttribute("data-state", "checked");
  });

  it("calls onCheckedChange", async () => {
    const handler = vi.fn();
    render(<Switch onCheckedChange={handler} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(handler).toHaveBeenCalledWith(true);
  });

  it("renders disabled", () => {
    render(<Switch disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("renders checked by default when defaultChecked", () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked");
  });

  it("forwards className", () => {
    render(<Switch className="custom" />);
    expect(screen.getByRole("switch")).toHaveClass("custom");
  });
});
