import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EmailInput } from "../email-input";

describe("EmailInput", () => {
  it("renders an email input", () => {
    render(<EmailInput />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("accepts email input", async () => {
    render(<EmailInput />);
    await userEvent.type(screen.getByRole("textbox"), "test@example.com");
    expect(screen.getByRole("textbox")).toHaveValue("test@example.com");
  });

  it("renders disabled", () => {
    render(<EmailInput disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("fires onChange", async () => {
    const onChange = vi.fn();
    render(<EmailInput onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });
});
