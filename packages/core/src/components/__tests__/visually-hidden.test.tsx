import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VisuallyHidden } from "../visually-hidden";

describe("VisuallyHidden", () => {
  it("renders a span that stays in the accessibility tree", () => {
    render(
      <button type="button">
        <VisuallyHidden>Close dialog</VisuallyHidden>
      </button>,
    );
    expect(screen.getByRole("button", { name: "Close dialog" })).toBeInTheDocument();
    expect(screen.getByText("Close dialog").tagName).toBe("SPAN");
  });

  it("honours the `as` override", () => {
    render(<VisuallyHidden as="h2">Filters</VisuallyHidden>);
    expect(screen.getByRole("heading", { level: 2, name: "Filters" })).toBeInTheDocument();
  });

  it("hides the child element with asChild", () => {
    render(
      <VisuallyHidden asChild>
        <a href="#main">Skip to content</a>
      </VisuallyHidden>,
    );
    const link = screen.getByRole("link", { name: "Skip to content" });
    expect(link.className).not.toBe("");
  });

  it("forwards refs and attributes", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <VisuallyHidden ref={ref} id="hint" data-testid="hint">
        Hint
      </VisuallyHidden>,
    );
    expect(ref.current).toBe(screen.getByTestId("hint"));
    expect(ref.current).toHaveAttribute("id", "hint");
  });

  it("drops className and style", () => {
    const props = { className: "override", style: { color: "red" } } as Record<string, unknown>;
    render(<VisuallyHidden {...props}>Hidden</VisuallyHidden>);
    const el = screen.getByText("Hidden");
    expect(el).not.toHaveClass("override");
    expect(el).not.toHaveAttribute("style");
  });
});
