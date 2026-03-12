import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrollArea } from "../scroll-area";

describe("ScrollArea", () => {
  it("renders children", () => {
    render(<ScrollArea><p>Scrollable content</p></ScrollArea>);
    expect(screen.getByText("Scrollable content")).toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(<ScrollArea className="h-64"><p>Content</p></ScrollArea>);
    expect(container.firstChild).toHaveClass("h-64");
  });
});
