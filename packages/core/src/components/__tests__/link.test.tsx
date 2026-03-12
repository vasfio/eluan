import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Link } from "../link";

describe("Link", () => {
  it("renders an anchor element", () => {
    render(<Link href="/about">About</Link>);
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  it("has correct href", () => {
    render(<Link href="/contact">Contact</Link>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/contact");
  });

  it("renders with external target", () => {
    render(<Link href="https://example.com" target="_blank">External</Link>);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  it("forwards className", () => {
    render(<Link href="/" className="custom-link">Home</Link>);
    expect(screen.getByRole("link")).toHaveClass("custom-link");
  });
});
