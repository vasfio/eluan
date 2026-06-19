import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Textarea } from "../textarea";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("accepts typed text", async () => {
    render(<Textarea />);
    await userEvent.type(screen.getByRole("textbox"), "Hello world");
    expect(screen.getByRole("textbox")).toHaveValue("Hello world");
  });

  it("renders with placeholder", () => {
    render(<Textarea placeholder="Write something..." />);
    expect(screen.getByPlaceholderText("Write something...")).toBeInTheDocument();
  });

  it("is disabled when disabled prop set", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("fires onChange", async () => {
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "x");
    expect(onChange).toHaveBeenCalled();
  });

  it("does not forward className overrides", () => {
    render(<Textarea {...({ className: "custom" } as never)} />);
    expect(screen.getByRole("textbox")).not.toHaveClass("custom");
  });

  it("renders with rows attribute", () => {
    render(<Textarea rows={6} data-testid="ta" />);
    expect(screen.getByTestId("ta")).toHaveAttribute("rows", "6");
  });
});
