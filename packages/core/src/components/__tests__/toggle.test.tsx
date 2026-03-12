import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Toggle } from "../toggle";

describe("Toggle", () => {
  it("renders a toggle button", () => {
    render(<Toggle>Bold</Toggle>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("toggles pressed state on click", async () => {
    render(<Toggle>B</Toggle>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("data-state", "off");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("data-state", "on");
  });

  it("calls onPressedChange handler", async () => {
    const handler = vi.fn();
    render(<Toggle onPressedChange={handler}>I</Toggle>);
    await userEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledWith(true);
  });

  it("renders disabled", () => {
    render(<Toggle disabled>U</Toggle>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies variant classes", () => {
    const { rerender } = render(<Toggle variant="outline">O</Toggle>);
    expect(screen.getByRole("button")).toHaveClass("border");
    rerender(<Toggle variant="default">D</Toggle>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
