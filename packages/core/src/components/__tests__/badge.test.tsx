import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "../badge";

// Class-name assertions are intentionally avoided here — the badge uses
// CSS-variable tokens (e.g. `bg-[var(--action-primary-bg)]`) that change with
// theme/refactors. Tests instead assert structural / variant behaviour that
// is stable across the design-token system.

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders the default variant", () => {
    render(<Badge>Label</Badge>);
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("renders secondary, destructive, and outline variants", () => {
    const { rerender } = render(<Badge variant="secondary">Beta</Badge>);
    expect(screen.getByText("Beta")).toBeInTheDocument();

    rerender(<Badge variant="destructive">Error</Badge>);
    expect(screen.getByText("Error")).toBeInTheDocument();

    rerender(<Badge variant="outline">Draft</Badge>);
    expect(screen.getByText("Draft")).toBeInTheDocument();
  });

  it("forwards className", () => {
    render(<Badge className="custom-class">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveClass("custom-class");
  });
});
