import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Input } from "../input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("accepts and displays typed text", async () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("renders with a placeholder", () => {
    render(<Input placeholder="Enter email" />);
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("fires onChange handler", async () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("renders with a specific type", () => {
    render(<Input type="email" data-testid="email-input" />);
    expect(screen.getByTestId("email-input")).toHaveAttribute("type", "email");
  });

  it("forwards className to the wrapper", () => {
    // Input wraps the <input> in a <div> for icons/trailing — className lands
    // on the wrapper. Assert via DOM query rather than the textbox role.
    const { container } = render(<Input className="custom" />);
    expect(container.querySelector(".custom")).not.toBeNull();
  });

  it("forwards defaultValue", () => {
    render(<Input defaultValue="prefilled" />);
    expect(screen.getByRole("textbox")).toHaveValue("prefilled");
  });
});
