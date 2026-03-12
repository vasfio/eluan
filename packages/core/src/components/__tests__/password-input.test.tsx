import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { PasswordInput } from "../password-input";

describe("PasswordInput", () => {
  it("renders a password input", () => {
    render(<PasswordInput data-testid="pw" />);
    expect(screen.getByTestId("pw")).toHaveAttribute("type", "password");
  });

  it("toggles visibility on eye button click", async () => {
    render(<PasswordInput data-testid="pw" />);
    const input = screen.getByTestId("pw");
    expect(input).toHaveAttribute("type", "password");

    const toggleBtn = screen.getByRole("button");
    await userEvent.click(toggleBtn);
    expect(input).toHaveAttribute("type", "text");

    await userEvent.click(toggleBtn);
    expect(input).toHaveAttribute("type", "password");
  });

  it("renders disabled", () => {
    render(<PasswordInput disabled data-testid="pw" />);
    expect(screen.getByTestId("pw")).toBeDisabled();
  });
});
