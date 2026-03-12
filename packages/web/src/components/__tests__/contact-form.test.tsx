import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ContactForm } from "../contact-form";

describe("ContactForm", () => {
  it("renders form fields", () => {
    render(<ContactForm onSubmit={vi.fn()} />);
    expect(document.querySelectorAll("input, textarea").length).toBeGreaterThan(0);
  });

  it("renders a submit button", () => {
    render(<ContactForm onSubmit={vi.fn()} />);
    expect(screen.getByRole("button", { name: /send|submit/i })).toBeInTheDocument();
  });
});
