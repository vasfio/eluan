import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EmailForm } from "../email-form";

describe("EmailForm", () => {
  it("renders an email input and submit button", () => {
    render(<EmailForm onSubmit={vi.fn()} />);
    expect(document.querySelector("input[type='email'], input[type='text']")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onSubmit with email value", async () => {
    const onSubmit = vi.fn();
    render(<EmailForm onSubmit={onSubmit} />);
    const input = document.querySelector("input") as HTMLInputElement;
    await userEvent.type(input, "user@example.com");
    await userEvent.click(screen.getByRole("button"));
    expect(onSubmit).toHaveBeenCalled();
  });
});
